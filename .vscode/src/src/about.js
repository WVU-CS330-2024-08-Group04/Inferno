import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './App.css';


function About(){
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (darkMode) {
          document.body.classList.add('dark-mode');
        } else {
          document.body.classList.remove('dark-mode');
        }
      }, [darkMode]);


return (
    <div className="account-settings">
    <div className="banner">
      <div className="banner-back">
        <Link to="/welcome">
          <img src="Inferno wildfire full logo cropped.png" alt="logo" />
        </Link>
      </div>
      <div className="banner-content">
        <div className="left-banner-content">
          <Link to="/about" className="about-link">About</Link>
        </div>
        <input
          type="image"
          src="Profile Icon.png"
          onClick={() => navigate('/accountSettings')}
          className="user-icon"
          alt="Profile Icon"
        />
      </div>
    </div>
        
        <div class="about-content">
            
        <div className="sidebar">
          <button onClick={() => navigate('/mapPage')}>Home</button>
          <button onClick={() => navigate('/wildfire')}>Wildfire Afflicted Area</button>
          <button onClick={() => navigate('/accountSettings')}>Settings</button>
          <button onClick={() => navigate('/donationTab')}>Donation Tab</button>
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
                    <span>we should put our names here ok ill start: Shannon Seiler</span>
                </div>
            </div>
        </div>
        

        <script src="dark_mode.js"></script>    
        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    </div>
    );
}

export default About;