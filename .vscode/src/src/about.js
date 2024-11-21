import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';




function About(){
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
      setDarkMode((prevMode) => !prevMode);
    };
  
    useEffect(() => {
      document.body.classList.toggle('dark-mode', darkMode);
    }, [darkMode]);
return (
        <body>

            {/* <!-- Start of banner --> */}
            <div class="banner">
                <div class="banner-back">
                    <a href="welcome.html">
                    <img src="Inferno wildfire full logo cropped.png" alt="logo" /> 
                </a>
                </div>
                <input type="image" src="Profile Icon.png" onclick="location.href='accountSettings.html'" class="user-icon"/>
                <a href="about.html" class="about-link">About</a>
                <button id="clickMe" onclick="darkMode()" class="dark-button">
                    <span id="clickMeText">Dark Mode</span>
                    <span class="button_icon">
                        <ion-icon name="moon"></ion-icon>
                    </span>
                </button>
                <div class="helloName" id="helloName"></div>
            </div>
            {/* <!--End of banner--> */}


                    {/* function getName(){
                        return "Shannon";
                    }

                    const name = document.getElementById("helloName");
                    name.textContent = "Hello, " + getName(); */}

        
            <div class="container">
                
                <div class="sidebar">
                    <button onclick="location.href='map';">Home</button>
                    <button onclick="location.href='...Wildfire...';">Wildfire Afflicted Area</button>
                    <button onclick="location.href='accountSettings.html';">Settings</button>
                    <button onclick="location.href='donationTab.html';">Donation Tab</button>
                </div>
                <div class="content-area">
                    <h2>ABOUT</h2>
                
                    <div class="main-content">
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;Inferno: Wildfire Control & Tracking is an application that predicts the possibility of 
                            wildfires in the user selected area. It uses a location's temperature, wind speeds, relative humidity, and soil 
                            moisture and then tests it against medium and high risk thresholds. The results are then displayed back to the 
                            user as a color overlay. The data utilized in this applicationis from National Oceanic and Atmospheric Administration(NOAA.)
                        </p>
                        <p>
                            The specific NOAA content utilized was the Global Forecast System and the Joint Polar Satellite System.
                            To find more information about these tools, click the buttons below:
                        </p>
                        <button onclick="location.href='https://www.emc.ncep.noaa.gov/emc/pages/numerical_forecast_systems/gfs.php';">NOAA GFS</button>
                        <button onclick="location.href='https://www.nesdis.noaa.gov/our-satellites/currently-flying/joint-polar-satellite-system';">NOAA JPSS</button>
                    </div>
                    <h2>CONTRIBUTORS</h2>
                    <div class="contributors">
                        <span>Contributors information</span>
                    </div>
                </div>
            </div>
            

            <script src="dark_mode.js"></script>    
            <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
            <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
        </body>
    );
}

export default About;