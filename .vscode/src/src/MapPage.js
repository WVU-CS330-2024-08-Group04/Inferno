import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MapPage() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <div>
      {/* Start of banner */}
      <div className="banner">
        <div className="banner-back">
          <Link to="/welcome">
            <img src="Inferno wildfire full logo cropped.png" alt="logo" />
          </Link>
        </div>
        <input
          type="image"
          src="Profile Icon.png"
          className="user-icon"
          onClick={() => (window.location.href = 'accountSettings.html')}
        />
        <Link to="/about" className="about-link">
          About
        </Link>
        <button id="clickMe" onClick={toggleDarkMode} className="dark-button">
          <span id="clickMeText">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
      {/* End of banner */}

      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          id="locationInput"
          placeholder="Search a location..."
        />
        <button className="search-button">Search</button>
      </div>

      <div id="map" style={{ width: '80%', height: '600px' }}></div>

      <div className="side-buttons">
        <Link to="/welcome">
          <button>Home</button>
        </Link>
        <Link to="/accountSettings">
          <button>Account</button>
        </Link>
      </div>
    </div>
  );
}

export default MapPage;
