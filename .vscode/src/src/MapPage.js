import React, { useState } from 'react';



function MapPage(){

return(

<body>
    {/* <!-- Start of banner --> */}
    <div class="banner">
        <div class="banner-back">
            <a href="welcome.html">
                <img src="Inferno wildfire full logo cropped.png" alt="logo" />
            </a>
        </div>
        <input type="image" src="Profile Icon.png" onclick="location.href='accountSettings.html'" class="user-icon" />
        <a href="about.html" class="about-link">About</a>
        <button id="clickMe" onclick="darkMode()" class="dark-button">
            <span id="clickMeText">Dark Mode</span>
            <span class="button_icon">
                <ion-icon name="moon"></ion-icon>
            </span>
        </button>
        <div class="helloName" id="helloName"></div>
    </div>
    {/* <!-- End of banner --> */}

    <div class="search-container">
        <input type="text" class="search-bar" id="locationInput" placeholder="Search a location..." />
        <button class="search-button" onclick="searchLocation()">Search</button>
        <button id="saveLocationBtn" style="display: none;" onclick="saveLocation()">Save Location</button>

        {/* <!-- Dropdown for Saved Locations --> */}
        <label for="savedLocations">Saved Locations:</label>
        <select id="savedLocations" onchange="jumpToSavedLocation()">
            <option value="">--Select a saved location--</option>
        </select>
    </div>
    {/* <!-- Map section --> */}
    <div id="map" style="width:80%; height: 600px;"></div>
    {/* <!-- Toggle for DEM Layer --> */}
    <div>
        <input type="checkbox" id="toggleDEM" checked></input>
        <label for="toggleDEM">Elevation</label>
    </div>
    <div>
        <input type="checkbox" id="mapLegend" checked></input>
        <label for="mapLegend">Map Legend</label>
    </div>
    {/* <!-- Side buttons --> */}
    <div class="side-buttons">
        <a href="welcome.html"><button>Home</button></a>
        <a href="accountSettings.html"><button>Account</button></a>

        {/* <!-- Date range selection --> */}
        <div class="date-container">
            <label for="startDate">Start Date:</label>
            <input type="date" id="startDate"></input><br></br>

            <label for="endDate">End Date:</label>
            <input type="date" id="endDate"></input>
            <button onclick="getDates()">Select Time Range</button>

            <div id="selected-dates"></div>
        </div>
        <button class="dropdown-trigger">Filters</button>
        <div class="dropdown-content">
            <label><input type="checkbox" name="Smoke" value="Smoke"> Smoke</input></label><br></br>
            <label><input type="checkbox" name="Active Fires" value="Active Fires"> Active Fires</input></label><br></br>
            <label><input type="checkbox" name="Fire Prediction" value="Fire Prediction"> Fire Prediction</input></label><br></br>
            <label><input type="checkbox" name="Elevation" value="Elevation">Elevation</input></label><br></br>
            <button class="apply-filters">Apply Filters</button>
        </div>
        <div id="selected-filters"></div>
    </div>

    
    <script src="mapScript.js"></script>
     <script src="dark_mode.js"></script> 
     <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
     <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</body>

    );
}

export default MapPage;