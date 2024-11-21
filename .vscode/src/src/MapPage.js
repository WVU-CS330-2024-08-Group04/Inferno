import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './mapStyles.css';

function MapPage() {
  const [savedLocations, setSavedLocations] = useState([]);
  const [lastSearchedLocation, setLastSearchedLocation] = useState(null);
  const [selectedDates, setSelectedDates] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null); // Reference to map container

  useEffect(() => {
    // Check if map is already initialized
    if (mapRef.current) {
      return;
    }

    // Initialize the map only once
    const map = L.map(mapContainerRef.current).setView([39.8283, -98.5795], 4);
    mapRef.current = map;

    // Add base layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(map);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      document.body.classList.toggle('dark-mode', newMode);
      localStorage.setItem('darkMode', newMode ? 'enabled' : 'disabled');
      return newMode;
    });
  };

  const searchLocation = () => {
    const location = document.getElementById('locationInput').value;
    const geocodeURL = `https://nominatim.openstreetmap.org/search?format=json&q=${location}`;

    fetch(geocodeURL)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          const displayName = data[0].display_name;

          mapRef.current.setView([lat, lon], 13);

          L.marker([lat, lon])
            .addTo(mapRef.current)
            .bindPopup(displayName)
            .openPopup();

          setLastSearchedLocation({ name: displayName, lat, lon });
        } else {
          alert('Location not found. Please try again.');
        }
      })
      .catch((error) => console.error('Error fetching location data:', error));
  };

  const saveLocation = () => {
    if (lastSearchedLocation) {
      const { name, lat, lon } = lastSearchedLocation;
      if (!savedLocations.some((loc) => loc.name === name)) {
        setSavedLocations((prev) => [...prev, { name, lat, lon }]);
      } else {
        alert('Location is already saved.');
      }
    }
  };

  const jumpToSavedLocation = (event) => {
    const value = event.target.value;
    if (value) {
      const location = JSON.parse(value);
      mapRef.current.setView([location.lat, location.lon], 13);
    }
  };

  const handleDateChange = () => {
    const start = document.getElementById('startDate').value;
    const end = document.getElementById('endDate').value;
    if (start && end) {
      setSelectedDates(`Selected Dates: ${start} to ${end}`);
    }
  };

  return (
    <div>
      {/* Banner Section */}
      <div className="banner">
        <div className="banner-back">
          <a href="welcome.html">
            <img src="Inferno wildfire full logo cropped.png" alt="logo" />
          </a>
        </div>
        <input
          type="image"
          src="Profile Icon.png"
          onClick={() => (window.location.href = 'accountSettings.html')}
          className="user-icon"
        />
        <a href="about.html" className="about-link">
          About
        </a>
        <button id="clickMe" onClick={toggleDarkMode} className="dark-button">
          <span id="clickMeText">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          <span className="button_icon">
            <ion-icon name="moon"></ion-icon>
          </span>
        </button>
      </div>

      {/* Search Section */}
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          id="locationInput"
          placeholder="Search a location..."
        />
        <button className="search-button" onClick={searchLocation}>
          Search
        </button>
        <button id="saveLocationBtn" style={{ display: 'none' }} onClick={saveLocation}>
          Save Location
        </button>

        {/* Saved Locations Dropdown */}
        <label htmlFor="savedLocations">Saved Locations:</label>
        <select id="savedLocations" onChange={jumpToSavedLocation}>
          <option value="">--Select a saved location--</option>
          {savedLocations.map((loc, index) => (
            <option key={index} value={JSON.stringify(loc)}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      {/* Map Section */}
      <div
        id="map"
        ref={mapContainerRef} // Attach the container to the ref
        style={{ width: '80%', height: '600px' }}
      ></div>

      {/* Toggle Layers */}
      <div>
        <input type="checkbox" id="toggleDEM" defaultChecked />
        <label htmlFor="toggleDEM">Elevation</label>
      </div>
      <div>
        <input type="checkbox" id="mapLegend" defaultChecked />
        <label htmlFor="mapLegend">Map Legend</label>
      </div>

      {/* Side Buttons */}
      <div className="side-buttons">
        <a href="welcome.html">
          <button>Home</button>
        </a>
        <a href="accountSettings.html">
          <button>Account</button>
        </a>

        {/* Date Range Selection */}
        <div className="date-container">
          <label htmlFor="startDate">Start Date:</label>
          <input type="date" id="startDate" onChange={handleDateChange} />
          <br />
          <label htmlFor="endDate">End Date:</label>
          <input type="date" id="endDate" onChange={handleDateChange} />
          <button onClick={handleDateChange}>Select Time Range</button>
          <div id="selected-dates">{selectedDates}</div>
        </div>

        {/* Filters */}
        <button className="dropdown-trigger">Filters</button>
        <div className="dropdown-content">
          <label>
            <input type="checkbox" name="Smoke" value="Smoke" /> Smoke
          </label>
          <br />
          <label>
            <input type="checkbox" name="Active Fires" value="Active Fires" /> Active Fires
          </label>
          <br />
          <label>
            <input type="checkbox" name="Fire Prediction" value="Fire Prediction" /> Fire Prediction
          </label>
          <br />
          <label>
            <input type="checkbox" name="Elevation" value="Elevation" /> Elevation
          </label>
          <br />
          <button className="apply-filters">Apply Filters</button>
        </div>
      </div>
    </div>
  );
}

export default MapPage;
