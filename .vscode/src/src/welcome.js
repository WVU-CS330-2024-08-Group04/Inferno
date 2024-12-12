/**
 * welcome.js
 * 
 * This file handles the welcome page functionality of the application.
 * 
 * Responsibilities:
 * -displays Inferno logo
 * -Dark Mode button in top right
 * -login/sign up options
 * -fire visual
 * -continue to map and about page options on bottom
 * 
 * Group 4
 */


//import statements, react
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import the icons from react-icons
import './App.css'; //imported styles


function Welcome() {

  //set const variables
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); // sets light mode use state
  const clickMeTextRef = useRef(null);
  const imageRef = useRef(null);
  const [icon, setIcon] = useState(<FaMoon />); // Default icon is the moon (light mode)

  //dark mode/light mode, handle use state change
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

  //dark mode, local storage set theme
  const darkMode = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  //returns the text, buttons, and visuals to be displayed  
  return (
    <div>
      <div>
        {/* logo */}
        <img ref={imageRef} id="image" src="/Inferno_wildfire_full_logo_cropped_upscaled.png" className="center" alt="logo" />
        
        {/* contains welcome text, login and create an account buttons, and fire visual */}
        <div className="content-container">

          {/* Welcome text */}
          <div className="container">
            <h1>Welcome to <strong className="orange-text">Inferno</strong></h1>
            <h2>Please Login or Create an Account</h2>

            {/* Login/create and account options with button links */}
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

          {/* Fire Visual */}
          <div className="video">
            <video width="320" height="240" autoPlay muted loop>
              <source src="/welcomeVideo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* dark mode toggle button */}
        <button className="dark-mode-toggle" id="clickMe" onClick={darkMode}>
          <span ref={clickMeTextRef} id="clickMeText">Dark Mode</span>
          <span className="button_icon">
            {icon} {/* Render the dynamic icon based on theme */}
          </span>
        </button>

        {/* Options for continuing to map and visiting about page */}
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
