import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import the icons from react-icons
import './App.css';

function Welcome() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const clickMeTextRef = useRef(null);
  const imageRef = useRef(null);
  const [icon, setIcon] = useState(<FaMoon />); // Default icon is the moon (light mode)

  useEffect(() => {
    // Update theme and UI elements based on the current theme
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
      if (clickMeTextRef.current) clickMeTextRef.current.textContent = 'Light Mode';
      if (imageRef.current) imageRef.current.src = '/Dark Mode Inferno Full Logo cropped.png';
      setIcon(<FaSun />);  // Set the icon to the sun (for dark mode)
    } else {
      document.body.classList.remove('dark-mode');
      if (clickMeTextRef.current) clickMeTextRef.current.textContent = 'Dark Mode';
      if (imageRef.current) imageRef.current.src = '/Inferno wildfire full logo cropped.png';
      setIcon(<FaMoon />);  // Set the icon to the moon (for light mode)
    }
  }, [theme]);  // Re-run when the theme changes

  const darkMode = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div>
      <div>
        <img ref={imageRef} id="image" src="/Inferno_wildfire_full_logo_cropped_upscaled.png" className="center" alt="logo" />
        <div className="content-container">
          <div className="container">
            <h1>Welcome to <strong className="orange-text">Inferno</strong></h1>
            <h2>Please Login or Create an Account</h2>

            <div className="account-options">
              <div>
                <h3>Have an Account?</h3>
                <p><Link to="/login" className="button-link">Login</Link></p>
              </div>
              <div>
                <h3>First Time User?</h3>
                <p><Link to="/Register" className="button-link">Create an Account</Link></p>
              </div>
            </div>
          </div>

          <div className="video">
            <video width="320" height="240" autoPlay muted loop>
              <source src="/welcomeVideo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <button className="dark-mode-toggle" id="clickMe" onClick={darkMode}>
          <span ref={clickMeTextRef} id="clickMeText">Dark Mode</span>
          <span className="button_icon">
            {icon} {/* Render the dynamic icon based on theme */}
          </span>
        </button>

        <nav className="navbar">
          <ul>
            <li><Link to="/mappage" className="button-link">Continue to Map</Link></li>
            <li><Link to="/about" className="button-link">About</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Welcome;
