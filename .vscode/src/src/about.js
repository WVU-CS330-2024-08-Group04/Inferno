/**
 * about.js
 * 
 * This file handles the about page functionality of the application. 
 * Accesible from the "About" button on banner on all pages excluding the welcome page.
 * 
 * Responsibilities:
 * -access to Welcome page, reload About page, go to user settings, and display user name in banner of page
 * -contains information about our app and links for NOAA data
 * -lists all contributors on the application
 * -button across bottom to go back to map
 * 
 * Group 4
 */

//import statements, react
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './App.css'; // Imported styles

function About() {
  //set const variables
  // Removed setTheme from the theme below
  const [theme] = useState(localStorage.getItem('theme') || 'light'); // sets light mode use state
  const navigate = useNavigate();

  //dark mode/light mode, handle use state change
  useEffect(() => {
    // Update theme and UI elements based on the current theme
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
          <div className="helloName">Hello!</div>
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

        {/*About section*/}
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

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button style={{ flex: '1', backgroundColor: 'rgba(244, 144, 12, 1)', padding: '5px', border: 'none', borderRadius: '5px' }} onClick={() => window.location.href = 'https://www.emc.ncep.noaa.gov/emc/pages/numerical_forecast_systems/gfs.php'}>NOAA GFS</button>
              <button style={{ flex: '1', backgroundColor: 'rgba(244, 144, 12, 1)', padding: '10px', border: 'none', borderRadius: '5px' }} onClick={() => window.location.href = 'https://www.nesdis.noaa.gov/our-satellites/currently-flying/joint-polar-satellite-system'}>NOAA JPSS</button>
            </div>
          </div>

        {/* Contributors section */}
          <h2>CONTRIBUTORS</h2>
          <div className="contributors">
            <span>
          Austin Brown<br />
          Jeremy Davis<br />
          Alexis DePue<br />
          Tanner Forbes<br />
          Shannon Seiler<br />
          Julia Van Albert<br />
          Seth Weese<br />
          Matthew Welch<br />
            </span>
          </div>
        </div>
      </div>

      {/* Options for continuing to map and visiting about page */}
      <nav className="navbar">
      <ul>
        <li><Link to="/mappage" className="button-link">Continue to Map</Link></li>
      </ul>
    </nav>
    </div>
  );
}

export default About;
