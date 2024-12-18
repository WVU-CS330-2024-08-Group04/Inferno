/**
 * accountSettings.js
 * 
 * This file handles the user settings page functionality of the application, 
 * always accessible by clicking the user icon in the top right of all pages excluding the welcome page.
 * 
 * Responsibilities:
 * -display the date and current account information
 * -access to Welcome page, About page, and display user name in banner of page
 * -button options to change username, passwords, and delete account
 * 
 * Group 4
 */

//import statements, react
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './accountSettings.css'; // import styles


function AccountSettings() {

  //set const variables, popups
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light'); // sets light mode use state
  const [showUsernamePopup, setShowUsernamePopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showDeleteAccountPopup, setShowDeleteAccountPopup] = useState(false);
  const [showSignOutPopup, setShowSignOutPopup] = useState(false);
  const [showFirePreventionPopup, setShowFirePreventionPopup] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  //dark mode/light mode, handle use state change
  useEffect(() => {
    // Update theme and UI elements based on the current theme
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [theme]);

  //current date use state updates to local date
  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setCurrentDate(formattedDate);
  }, []);

  //dark mode, local storage set theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const navigate = useNavigate();

  return (
    <div className="account-settings">
      {/* banner content */}
      <div className="banner">

        {/* logo */}
        <div className="banner-back">
          <input
            type="image"
            src="Inferno wildfire full logo cropped.png"
            onClick={() => navigate('/welcome')}
            alt="Logo"
          />
        </div>
        <div className="banner-content">

          {/* About page link using user icon as button */}
          <Link to="/about" className="about-link">About</Link>
          <input
            type="image"
            src="Profile Icon.png"
            onClick={() => navigate('/accountSettings')}
            className="user-icon"
            alt="Profile Icon"
          />
        </div>
      </div>

      <div className="content">
        {/* Contains change username, password, and delete account button options, all popups */}
        <div className="side-buttons left">
          <button onClick={() => setShowUsernamePopup(true)}>Change Username</button>
          <button onClick={() => setShowPasswordPopup(true)}>Change Password</button>
          <button onClick={() => setShowDeleteAccountPopup(true)}>Delete Account</button>
        </div>

        {/* Displays current date and current account infomration */}
        <div className="account-info">
          <p>Current Account Information</p>
          <p>Date: {currentDate}</p>
        </div>

        {/* Contains sign out popup button, dark mode toggle button, and fire prevention tips popup button */}
        <div className="side-buttons right">
          <button onClick={() => setShowSignOutPopup(true)}>Sign Out</button>
          <button onClick={toggleTheme}>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</button>
          <button onClick={() => setShowFirePreventionPopup(true)}>Fire Prevention Tips</button>
        </div>
      </div>

      {/* popup for changing username, triggered by Change Username button  */}
      {showUsernamePopup && (
        <div className="popUp">
          <div className="popUp-content">
            <h2>Change Username</h2>
            <input type="text" placeholder="Enter old username" />
            <input type="text" placeholder="Enter new username" />
            <input type="text" placeholder="Confirm new username" />
            <button>Submit</button>
            <button onClick={() => setShowUsernamePopup(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* popup for changing password, triggered by Change Password button */}
      {showPasswordPopup && (
        <div className="popUp">
          <div className="popUp-content">
            <h2>Change Password</h2>
            <input type="password" placeholder="Enter old password" />
            <input type="password" placeholder="Enter new password" />
            <input type="password" placeholder="Confirm new password" />
            <button>Submit</button>
            <button onClick={() => setShowPasswordPopup(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* popup for deleting account, triggered by Delete Account button */}
      {showDeleteAccountPopup && (
        <div className="popUp">
          <div className="popUp-content">
            <h2>Delete Account</h2>
            <p className="warning">Warning: This action is irreversible!</p>
            <p>Are you sure you want to delete your account?</p>
            <button>Yes, Delete</button>
            <button onClick={() => setShowDeleteAccountPopup(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* popup for signing out of account, triggered by Sign Out button */}
      {showSignOutPopup && (
        <div className="popUp">
          <div className="popUp-content">
            <h2>Sign Out</h2>
            <h3>Are you sure you want to sign out?</h3>
            <button onClick={() => setShowSignOutPopup(false)}>Cancel</button>
            <button>Sign Out</button>
          </div>
        </div>
      )}

      {/* popup for fire prevention tips, triggered by Fire Prevention Tips button */}
      {showFirePreventionPopup && (
        <div className="popUp">
          <div className="popUp-content">
            <h2>Fire Prevention Tips</h2>
            <p>Tip 1: Learn how to properly use outdoor equipment.</p>
            <p>Tip 2: Burn debris safely.</p>
            <p>Tip 3: Start, maintain, and extinguish a campfire safely.</p>
            <p>Tip 4: Practice fire-safe target shooting.</p>
            <button onClick={() => setShowFirePreventionPopup(false)}>Exit</button>
          </div>
        </div>
      )}

      {/* Options for continuing to map and visiting about page */}
      <nav className="navbar">
      <ul>
        <li><Link to="/mappage" className="button-link">Continue to Map</Link></li>
      </ul>
    </nav>
    </div>
  );
}

export default AccountSettings;
