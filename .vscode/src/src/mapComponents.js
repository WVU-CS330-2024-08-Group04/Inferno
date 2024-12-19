import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './mapStyles.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { calculateRisk } from './wildfirePredictor.js'; // Ensure this function is implemented correctly.

/**
 * Component to reset the map view when bounds or center change.
 * @param {Object} position - Map position to center.
 * @param {number} zoom - Zoom level.
 */
function ResetMapView({ position, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, zoom, { animate: true }); // Reset view without affecting the marker.
    }
  }, [position, zoom, map]);
  return null;
}

/**
 * Main MapComponent to render a map with wildfire risk markers.
 */
function MapComponent() {
  const [locationInfo, setLocationInfo] = useState(null); // Info about the location.
  const [markerPosition, setMarkerPosition] = useState(null); // Marker position.
  const [mapCenter, setMapCenter] = useState([39.8283, -98.5795]); // Default US center.
  const [zoomLevel, setZoomLevel] = useState(4); // Default zoom level.
  const [savedLocations, setSavedLocations] = useState([]);
  const [lastSearchedLocation, setLastSearchedLocation] = useState(null);
  const [circleColor, setCircleColor] = useState(null);
  const mapRef = useRef(null);

  // Handle location search and marker placement.
  const searchLocation = async () => {
    const location = document.getElementById('locationInput').value.trim();
    if (!location) {
      alert('Please enter a location.');
      return;
    }

    const geocodeURL = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      location
    )}`;

    try {
      const response = await fetch(geocodeURL);
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lon);

        // Simulate wildfire risk calculation input
        const inputData = {
          temperature: 90,
          relativeHumidity: 0.5,
          windSpeed: 15,
          precipitation: 0.2,
        };
        const prediction = calculateRisk(inputData);

        setLocationInfo({
          name: display_name,
          temperature: inputData.temperature,
          windSpeed: inputData.windSpeed,
          humidity: inputData.relativeHumidity,
          precipitation: inputData.precipitation,
          risk: prediction.risk,
        });

        setMarkerPosition([latitude, longitude]); // Update marker position
        setMapCenter([latitude, longitude]); // Center the map on the new location
        setZoomLevel(10); // Zoom closer to the marker
        setCircleColor(prediction.color);

        // Save the last searched location
        setLastSearchedLocation({ name: display_name, lat: latitude, lon: longitude });

        // Show the save button for the newly searched location
        const saveButton = document.getElementById('saveLocationBtn');
        if (saveButton) saveButton.style.display = 'inline-block';
      } else {
        alert('Location not found.');
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  // Save location and last searched location 
  const saveLocation = () => { 
    if (!lastSearchedLocation) return; 
    const { name, lat, lon } = lastSearchedLocation; 
    if (!savedLocations.some((loc) => loc.name === name)) { 
      setSavedLocations((prev) => [...prev, { name, lat, lon }]); 
    } else { 
      alert('Location is already saved.'); 
    } 
  };

  // Allows you to access your saved locations
  const jumpToSavedLocation = (event) => {
    const value = event.target.value;
    if (value) {
      const location = JSON.parse(value); // Parse the saved location object
      if (mapRef.current) {
        mapRef.current.setView([location.lat, location.lon], 10); // Set zoom level
        setMapCenter([location.lat, location.lon]); // Update the map center
  
        // Update locationInfo based on the new location, similar to searchLocation logic
        const inputData = {
          temperature: 90, // Replace with actual data if needed
          relativeHumidity: 0.5, // Replace with actual data if needed
          windSpeed: 15, // Replace with actual data if needed
          precipitation: 0.2, // Replace with actual data if needed
        };
        const prediction = calculateRisk(inputData);
  
        setLocationInfo({
          name: location.name,
          temperature: inputData.temperature,
          windSpeed: inputData.windSpeed,
          humidity: inputData.relativeHumidity,
          precipitation: inputData.precipitation,
          risk: prediction.risk,
        });
  
        setMarkerPosition([location.lat, location.lon]); // Update marker position
        setZoomLevel(10); // Set zoom level
        setCircleColor(prediction.color); // Update circle color
      }
    }
  };

  // Allows you to press enter and that does the same function as pressing the search button
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchLocation();
    }
  };

  return (
    <div>
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

      <div className="main-container">
        <MapContainer
          id="map"
          center={mapCenter}
          zoom={zoomLevel}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {markerPosition && (
            <Marker
              position={markerPosition}
              icon={new L.Icon({
                iconUrl: markerIconPng,
                iconSize: [30, 40],
                iconAnchor: [15, 40],
              })}
            >
              <Popup>
                <strong>Location:</strong> {locationInfo?.name} <br />
                <strong>Risk:</strong> {locationInfo?.risk}
              </Popup>
            </Marker>
          )}
          {markerPosition && circleColor && (
            <Circle
              center={markerPosition}
              radius={16093.4} // 10 miles in meters
              color={circleColor}
              fillColor={circleColor}
              fillOpacity={0.4}
            />
          )}
          <ResetMapView position={mapCenter} zoom={zoomLevel} />
        </MapContainer>
        
      </div>
    </div>
  );
}

export default MapComponent;
