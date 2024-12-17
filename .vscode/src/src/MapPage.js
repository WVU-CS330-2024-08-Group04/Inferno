/**
 * MapPage.js
 * 
 * This file handles the map page functionality of the application. 
 * 
 * Responsibilities:
 * -access to Welcome page, reload About page, go to user settings, and display user name in banner of page
 * -interactive leaflet map
 * -search bar to find locations in bounds, save location and access saved locations
 * -filters and select date drop down/options to assist in fire/prediciton search
 * 
 * Group 4
 */

//import statements, react and leaflet
import React, { useState, useEffect, useRef } from 'react';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
//import {Icon} from 'leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './mapStyles.css'; //import styles
import { Link, useNavigate } from 'react-router-dom';
import { calculateRisk } from './mapComponents.js'; //import risk calculation function from mapComponents.js

function MapPage() {

  //set const variables for locations, dates, and filters functions
  const [savedLocations, setSavedLocations] = useState([]);
  const [lastSearchedLocation, setLastSearchedLocation] = useState(null);
  const [selectedDates, setSelectedDates] = useState('');
  const [showDateFields, setShowDateFields] = useState(false);
  const [showFilters, setShowFilters] = useState(false); // State for showing filters
  // Removed selectedFilters from the list
  const [setSelectedFilters] = useState({
    //'Smoke': false,
    'Active Fires': false,
    'Fire Prediction': false,
    //'Elevation': false,
  });

  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [showLegend, setShowLegend] = useState(true); // State to control legend visibility

  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();  // Forces the map to recalculate its size
      }
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

  //dark mode/light mode, handle use state change
  useEffect(() => {
    // Check localStorage for saved theme on component mount
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

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
      minZoom:4,
      attribution: '© OpenStreetMap',
    }).addTo(map);

     // Create the Legend
     const legend = L.control({ position: 'bottomleft' });

     legend.onAdd = function () {
       const div = L.DomUtil.create('div', 'info legend');
       const labels = ['No Risk','Low Risk', 'Medium Risk', 'High Risk'];
       const colors = ['#26c454','#f0e300', '#faa064', '#e30808']; // Color codes for different risk levels
 
  // Add each label with a color circle
  labels.forEach((label, index) => {
    div.innerHTML += `
      <div class="legend-item">
        <span class="legend-color" style="background:${colors[index]}"></span>
        ${label}
      </div>
    `;
  });
 
       return div;
      };
      // Add legend to map if showLegend is true
      if (showLegend) {
        legend.addTo(map);
      }
  
      // Function to toggle the legend visibility
      const toggleLegend = () => {
        if (showLegend) {
          map.removeControl(legend);
        } else {
          legend.addTo(map);
        }
        setShowLegend(!showLegend);
      };
  
      // Create a button to toggle the legend
      const legendButton = L.DomUtil.create('button', 'legend-toggle-button');
      legendButton.innerHTML = showLegend ? 'Hide Legend' : 'Show Legend';
      legendButton.onclick = toggleLegend;
  
      // Add the button to the map (it will appear on top-right of the map)
      L.DomUtil.addClass(legendButton, 'leaflet-bar');
      L.DomUtil.create('div').appendChild(legendButton);
  
    }, [showLegend]);
   

  //popup for when a user presses enter/search and the search bar is empty
  const searchLocation = () => {
    const location = document.getElementById('locationInput').value.trim();
    if (!location) {
      alert('Please enter a location.');
      return;
    }

    const geocodeURL = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;

    //map functionality
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

            //hard coded data until we're able to pull data from server
            const inputData = {
              temperature: 90,
              relativeHumidity: 0.30/100,
              windSpeed: 15,
              soilMoisture: 0.05/100,
              activeFires: false,
            };

            const prediction = calculateRisk(inputData);

            //Removed const marker = from below
            L.marker([latitude, longitude], {
              icon: new L.Icon({
                iconUrl: markerIconPng,  // Path to your custom icon
                iconSize: [30, 40],      // Size of the icon
                iconAnchor: [20, 40],    // Anchor point where the icon will align with the marker's position
                popupAnchor: [-5, -30]    // Point where the popup will open relative to the icon
              })
            })
              .addTo(mapRef.current) // Add marker to map
              .bindPopup(`
                <strong>Location:</strong> ${display_name}<br>
                <strong>Temperature:</strong> ${inputData.temperature}°F<br>
                <strong>Wind Speed:</strong> ${inputData.windSpeed} mph<br>
                <strong>Humidity:</strong> ${(inputData.relativeHumidity * 100).toFixed(1)}%<br>
                <strong>Soil Moisture:</strong> ${(inputData.soilMoisture * 100).toFixed(1)}%<br>
                <strong>Active Fires:</strong> ${inputData.activeFires ? 'Yes' : 'No'}<br>
                <strong>Prediction:</strong> ${prediction.risk} (${prediction.color.toUpperCase()})
              `)
              .openPopup();  

            // Add a 10-mile radius circle around the marker
            const radius = 10 * 1609.34; // 10 miles in meters
            L.circle([latitude, longitude], {
              color: prediction.color, // Use the color based on the risk level
              fillColor: prediction.color,
              fillOpacity: 0.7,
              radius: radius
            }).addTo(mapRef.current);

            // Set the view but with a locked zoom level
            mapRef.current.setView([latitude, longitude], 13); // Ensure zoom is set at 13 (or higher if needed)

            // Save the last searched location
            setLastSearchedLocation({ name: display_name, lat: latitude, lon: longitude });

            //save location button and popups for location that is not found or out of the set bounds
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

  //save locatoin and last searched location
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

  //allows you to access your saved locations
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

  //function to toggle state of dates
  const toggleDateFields = () => {
    setShowDateFields(!showDateFields); // Toggle the state
  };

  //function to toggle the filters button
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

  //allows you to press enter and that does the same funciton as pressing the search button
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchLocation();
    }
  };

  return (
    <div>
      {/* Banner Section */}
      <div className="banner">

        {/* logo */}
        <div className="banner-back">
          <input
            type="image"
            src="Inferno wildfire full logo cropped.png"
            onClick={() => navigate('/welcome')}
            alt="Logo Image"
          />
        </div>
        <div className="banner-content">

          {/* About page link using user icon as button */}
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
              {/*<label><input type="checkbox" name="Smoke" value="Smoke" /> Smoke</label>*/}
              <label><input type="checkbox" name="Active Fires" value="Active Fires" /> Active Fires</label>
              <label><input type="checkbox" name="Fire Prediction" value="Fire Prediction" /> Fire Prediction</label>
              {/*<label><input type="checkbox" name="Elevation" value="Elevation" /> Elevation</label>*/}
              <button className="apply-filters">Apply Filters</button>
            </div>
            )}
          </div>

          {/* Date Selection */}
          <button className = "Time-button" onClick={toggleDateFields}>Select Date</button>
          {showDateFields && (
          <div className="date-container">
              <label htmlFor="startDate">Date:</label>
              <input type="date" id="startDate" onChange={handleDateChange} />
              <div id="selected-dates">{selectedDates}</div>
              <button className="apply-time">Display Date Data</button>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MapPage;
