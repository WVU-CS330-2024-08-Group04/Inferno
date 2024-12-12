import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './App.css'; // Import your styles

function About() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [theme]);

  return (
    <div className="account-settings">
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

      <div className="about-content">
        <div className="sidebar">
          <button onClick={() => navigate('/mapPage')}>Home</button>
          <button onClick={() => navigate('/wildfire')}>Wildfire Afflicted Area</button>
          <button onClick={() => navigate('/accountSettings')}>Settings</button>
          <button onClick={() => navigate('/donationTab')}>Donation Tab</button>
        </div>

        <div className="content-area">
          <h2>ABOUT</h2>
          <div className="main-content">
            <p>
              Inferno: Wildfire Control & Tracking is an application that predicts the possibility of 
              wildfires in the user selected area. It uses a location's temperature, wind speeds, relative humidity, and soil 
              moisture and then tests it against medium and high risk thresholds. The results are then displayed back to the 
              user as a color overlay. The data utilized in this application is from National Oceanic and Atmospheric Administration (NOAA).
            </p>
            <p>
              The specific NOAA content utilized was the Global Forecast System and the Joint Polar Satellite System.
              To find more information about these tools, click the buttons below:
            </p>
            <button onClick={() => window.location.href = 'https://www.emc.ncep.noaa.gov/emc/pages/numerical_forecast_systems/gfs.php'}>NOAA GFS</button>
            <button onClick={() => window.location.href = 'https://www.nesdis.noaa.gov/our-satellites/currently-flying/joint-polar-satellite-system'}>NOAA JPSS</button>
          </div>

          <h2>CONTRIBUTORS</h2>
          <div className="contributors">
            <span>
          SHANNON SEILER<br></br>
          JULIA VAN ALBERT<br></br>
          SETH WEESE<br></br>
          TANNER FORBES<br></br>
          JEREMY DAVIS<br></br>
          ALEXIS DEPUE<br></br>
          AUSTIN BROWN<br></br>
          MATTHEW WELCH<br></br>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
