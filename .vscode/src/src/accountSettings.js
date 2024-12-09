import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './accountSettings.css'; // import styles 

function AccountSettings() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "enabled");
  const [showUsernamePopup, setShowUsernamePopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showDeleteAccountPopup, setShowDeleteAccountPopup] = useState(false);
  const [showSignOutPopup, setShowSignOutPopup] = useState(false);
  const [showFirePreventionPopup, setShowFirePreventionPopup] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode ? "enabled" : "disabled");
  };

  const getName = () => 'User Name';
  const name = getName();
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/welcome');
    }
  };

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

      <div className="content">
        <div className="side-buttons left">
          <button onClick={() => setShowUsernamePopup(true)}>Change Username</button>
          <button onClick={() => setShowPasswordPopup(true)}>Change Password</button>
          <button onClick={() => setShowDeleteAccountPopup(true)}>Delete Account</button>
        </div>

        <div className="account-info">
          <p>Current Account Information</p>
          <p>Date: {currentDate}</p>
        </div>

        <div className="side-buttons right">
          <button onClick={() => setShowSignOutPopup(true)}>Sign Out</button>
          <button onClick={toggleDarkMode}>Dark Mode</button>
          <button onClick={() => setShowFirePreventionPopup(true)}>Fire Prevention Tips</button>
          <button onClick={goBack}>Back</button>
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
            <h3>Are you sure you want to sign out?</h3>
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
            <button onClick={() => setShowFirePreventionPopup(false)}>Exit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountSettings;
