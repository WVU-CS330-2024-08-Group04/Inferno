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
// import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
 import { useNavigate, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import MapComponent from "./mapComponents";
import DateSelector from "./dateselector";
import axios from "axios";
import setError from "react";

const MapPage = () => {
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false); // State for showing filters 
  const [setSelectedFilters] = useState({
      'Active Fires': false,
      'Fire Prediction': false,
    }); 
  const navigate = useNavigate();
  //const locationInfo = getLocationInfo();

  useEffect(() => {
      // Check localStorage for saved theme on component mount
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    });


  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);  // Update date state
  };

  const fetchData = async () => {
    const API_URL = process.env.REACT_APP_API_URL || '';
    if (!date) {
      alert("Please enter a date");
      return;
    }

    setIsLoading(true);
    console.log(`fetching temperature data for date: ${date}`);

    try {
      const response = await axios.get(`http://localhost:5000/api/temperature/data`, {
        params: { date },
      });
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
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

  return (
    <div>
      {isLoading && <ClipLoader color="#123abc" loading={isLoading} size={50} />}
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
            <div className="main-container">
            <div className="map-container">
            {!isLoading && <MapComponent temperatures={data} />}
            </div>
          
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
<DateSelector onDateChange={handleDateChange} fetchData={fetchData} />


{/*Information Section*/}
{/*{locationInfo && (
<div className="info-block">
<strong>Temperature:</strong> {locationInfo.temperature}°F<br />
<strong>Wind Speed:</strong> {locationInfo.windSpeed} mph<br />
<strong>Humidity:</strong> {locationInfo.humidity}%<br />
<strong>Precipitation:</strong> {locationInfo.precipitation}"<br />
{/*<strong>Active Fires:</strong> {locationInfo.activeFires}<br />
<strong>Prediction:</strong> {locationInfo.risk} 
</div>
)}*/}

</div>
    </div>
    </div>
  );
}

export default MapPage;