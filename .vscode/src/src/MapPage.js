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
import React, { useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import MapComponent from "./mapComponents";
import DateSelector from "./dateselector";
import axios from "axios";
import setError from "react";

const MapPage = () => {
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();


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

  return (
    <div>
      <h1>Temperature Map</h1>

      <DateSelector onDateChange={handleDateChange} fetchData={fetchData} />

      {isLoading && <ClipLoader color="#123abc" loading={isLoading} size={50} />}

      {!isLoading && <MapComponent temperatures={data} />}

    </div>
  );
}

export default MapPage;