import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './accountSettings.css'; // import styles 

function AccountSettings() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "enabled");
  const [showUsernamePopup, setShowUsernamePopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showDeleteAccountPopup, setShowDeleteAccountPopup] = useState(false);
  const [showSignOutPopup, setShowSignOutPopup] = useState(false);
  const [showFirePreventionPopup, setShowFirePreventionPopup] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode ? "enabled" : "disabled");
  };

  const getName = () => {
    return 'User Name';  // Replace with logic to get actual user name
  };

  const name = getName();

  const navigate = useNavigate();  // For navigation

  const goBack = () => {
    navigate(-1);  // Navigate back to the previous page
  };

  return (
    <div>
      {/* Banner */}
      <div className="banner">
        <div className="banner-back">
          <a href="welcome.html">
            <img src="logo.svg" alt="logo" /> {/* Use logo.svg */}
          </a>
        </div>
        <input
          type="image"
          src="Profile Icon.png"
          onClick={() => window.location.href = 'accountSettings.html'}
          className="user-icon"
          alt="Profile Icon"
        />
        <a href="about.html" className="about-link">About</a>
        <button onClick={toggleDarkMode} className="dark-button">
          <span id="clickMeText">Dark Mode</span>
          <span className="button_icon">
            <ion-icon name="moon"></ion-icon>
          </span>
        </button>
        <div className="helloName">Hello, {name}</div>
      </div>

      {/* Content */}
      <div className="content">
        <div className="side-buttons">
          <button onClick={() => setShowUsernamePopup(true)}>Change Username</button>
          <button onClick={() => setShowPasswordPopup(true)}>Change Password</button>
          <button onClick={() => setShowDeleteAccountPopup(true)}>Delete Account</button>
          <button>Time Zone</button>
        </div>

        <div className="account-info">
          <p>Current Account Information</p>
        </div>

        <div className="side-buttons">
          <button onClick={() => setShowSignOutPopup(true)}>Sign Out</button>
          <button onClick={toggleDarkMode}>Dark Mode</button>
          <button onClick={() => setShowFirePreventionPopup(true)}>Fire Prevention Tips</button>
          <button onClick={goBack}>Back</button> {/* Fix the back button */}
        </div>
      </div>

      {/* Popups */}
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

      {showSignOutPopup && (
        <div className="popUp">
          <div className="popUp-content">
            <h2>Sign Out</h2>
            <h3>Are You Sure you want to Sign Out?</h3>
            <button onClick={() => setShowSignOutPopup(false)}>Cancel</button>
            <button>Sign Out</button>
          </div>
        </div>
      )}

      {showFirePreventionPopup && (
        <div className="popUp">
          <div className="popUp-content">
            <h2>Tip 1: Learn how to properly use outdoor equipment</h2>
            <h2>Tip 2: Burn debris safely</h2>
            <h2>Tip 3: Start, maintain, and extinguish a campfire</h2>
            <h2>Tip 4: Practice fire-safe target shooting</h2>
            <h4>
              All tips from National Interagency Fire Center, find more information at{' '}
              <a href="https://www.nifc.gov/fire-information/fire-prevention-education-mitigation/wildfire-prevention#:~:text=Learn%20how%20to%20properly%20use,in%20your%20state%20or%20area.">
                NIFC
              </a>
            </h4>
            <button onClick={() => setShowFirePreventionPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountSettings;
