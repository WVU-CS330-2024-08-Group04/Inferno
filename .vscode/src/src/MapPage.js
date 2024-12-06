import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './mapStyles.css';
import { Link, useNavigate } from 'react-router-dom';

function MapPage() {
  const [savedLocations, setSavedLocations] = useState([]);
  const [lastSearchedLocation, setLastSearchedLocation] = useState(null);
  const [selectedDates, setSelectedDates] = useState('');
  const [showDateFields, setShowDateFields] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showFilters, setShowFilters] = useState(false); // State for showing filters
  const [selectedFilters, setSelectedFilters] = useState({
    'Smoke': false,
    'Active Fires': false,
    'Fire Prediction': false,
    'Elevation': false,
  });

  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map(mapContainerRef.current).setView([39.8283, -98.5795], 4); // Center on US
    mapRef.current = map;

    // US Bounding box: [north, south, east, west]
    const US_BOUNDS = [
      [24.396308, -125.0], // southwest corner
      [49.3457868, -66.93457] // northeast corner
    ];

    // Set bounds for map (restrict zooming and panning to US)
    map.setMaxBounds(US_BOUNDS);
    map.on('drag', function () { map.panInsideBounds(US_BOUNDS); });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 4,
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
    const location = document.getElementById('locationInput').value.trim();
    if (!location) {
      alert('Please enter a location.');
      return;
    }
  
    const geocodeURL = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
  
    fetch(geocodeURL)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const { lat, lon, display_name } = data[0];
          const latitude = parseFloat(lat);
          const longitude = parseFloat(lon);
  
          // Define US bounding box
          const US_BOUNDS = {
            north: 49.3457868,
            south: 24.396308,
            west: -125.0,
            east: -66.93457
          };
  
          // Check if the location is within the US
          if (
            latitude >= US_BOUNDS.south &&
            latitude <= US_BOUNDS.north &&
            longitude >= US_BOUNDS.west &&
            longitude <= US_BOUNDS.east
          ) {
            // First, add the marker
            const marker = L.marker([latitude, longitude])
              .addTo(mapRef.current)
              .bindPopup(display_name)
              .openPopup();
  
            // Set the view but with a locked zoom level
            mapRef.current.setView([latitude, longitude], 13); // Ensure zoom is set at 13 (or higher if needed)
  
            // Optionally, restrict zoom level after setting the view
            mapRef.current.setMaxZoom(13);
  
            // Save the last searched location
            setLastSearchedLocation({ name: display_name, lat: latitude, lon: longitude });
  
            const saveButton = document.getElementById('saveLocationBtn');
            if (saveButton) saveButton.style.display = 'inline-block';
          } else {
            alert('Location is out of bounds.');
          }
        } else {
          alert('Location not found. Please try again.');
        }
      })
      .catch((error) => console.error('Error fetching location data:', error));
  };

  const saveLocation = () => {
    if (!lastSearchedLocation) return;

    const { name, lat, lon } = lastSearchedLocation;
    if (!savedLocations.some((loc) => loc.name === name)) {
      setSavedLocations((prev) => [...prev, { name, lat, lon }]);
    } else {
      alert('Location is already saved.');
    }
  };

  const navigate = useNavigate();

  const jumpToSavedLocation = (event) => {
    const value = event.target.value;
    if (value) {
      const location = JSON.parse(value);
      mapRef.current.setView([location.lat, location.lon], 13);
    }
  };

  const handleDateChange = (e) => {
    // Check if the event target exists and has a value
    if (e.target && e.target.value) {
      setSelectedDates(`Start Date: ${e.target.value}`);
    }
  };

  const toggleDateFields = () => {
    setShowDateFields(!showDateFields); // Toggle the state
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Handles the change in checkbox values
  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchLocation();
    }
  };

  return (
    <div>
      {/* Banner Section */}
      <div className="banner">
        <div className="banner-back">
          <input
            type="image"
            src="Inferno wildfire full logo cropped.png"
            onClick={() => navigate('/welcome')}
            alt="Logo Image"
          />
        </div>
        <div className="banner-content">
          <div className="left-banner-content">
            <Link to="/about" className="about-link">About</Link>
          </div>
          <div className="helloName">Hello,</div>
          <input
            type="image"
            src="Profile Icon.png"
            onClick={() => navigate('/accountSettings')}
            className="user-icon"
            alt="Profile Icon"
          />
        </div>
      </div>
  
      {/* Search Section */}
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          id="locationInput"
          placeholder="Search a location..."
          onKeyDown={handleKeyDown}
        />
        <button className="search-button" onClick={searchLocation}>
          Search
        </button>
        <button id="saveLocationBtn" style={{ display: 'none' }} onClick={saveLocation}>
          Save Location
        </button>
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
  
      {/* Main Container */}
      <div className="main-container">
        {/* Map Section */}
        <div id="map" ref={mapContainerRef}></div>
  
        {/* Side Container */}
        <div className="side-container">
  
          {/* Filters */}
          <div className="filters-container">
            <button className="filter-dropdown-trigger" onClick={toggleFilters}>Filters</button>
            {showFilters && (
            <div className="dropdown-content">
              <label><input type="checkbox" name="Smoke" value="Smoke" /> Smoke</label>
              <label><input type="checkbox" name="Active Fires" value="Active Fires" /> Active Fires</label>
              <label><input type="checkbox" name="Fire Prediction" value="Fire Prediction" /> Fire Prediction</label>
              <label><input type="checkbox" name="Elevation" value="Elevation" /> Elevation</label>
              <button className="apply-filters">Apply Filters</button>
            </div>
            )}
          </div>
  
          {/* Date Selection */}
          <button className = "Time-button" onClick={toggleDateFields}>Select Time Range</button>
          {showDateFields && (
          <div className="date-container">
              <label htmlFor="startDate">Start Date:</label>
              <input type="date" id="startDate" onChange={handleDateChange} />
              <label htmlFor="endDate">End Date:</label>
              <input type="date" id="endDate" onChange={handleDateChange} />
              <div id="selected-dates">{selectedDates}</div>
              <button className="apply-time">Apply Time Range</button>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MapPage;
