import { BrowserRouter as Router, Link } from 'react-router-dom';
import React from 'react';
import './App.css';

function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    var clickMeText = document.getElementById("clickMeText");
    var buttonIcon = document.querySelector(".button_icon ion-icon");

    // Check if dark mode is enabled
    if (element.classList.contains("dark-mode")) {
        clickMeText.textContent = "Light Mode";
        buttonIcon.setAttribute("name", "sunny");
        document.getElementById('image').src ='Dark Mode Inferno Full Logo cropped.png';
        localStorage.setItem('theme', 'dark'); // Save preference
    } else {
        clickMeText.textContent = "Dark Mode";
        buttonIcon.setAttribute("name", "moon");
        document.getElementById('image').src ='Inferno wildfire full logo cropped.png';
        localStorage.setItem('theme', 'light'); // Save preference
    }

}
    function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById("clickMeText").textContent = "Light Mode";
        document.querySelector(".button_icon ion-icon").setAttribute("name", "sunny");
        document.getElementById('image').src ='Dark Mode Inferno Full Logo cropped.png';
        }
    }
    
    window.onload = setInitialTheme;

function Welcome(){

return (

        <div>
    
        <div>
        
        <img src="/Inferno_wildfire_full_logo_cropped_upscaled.png" class="center" alt="logo"></img>
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
    
            <button id="clickMe" onClick={() => darkMode()} className="dark-mode-toggle">
              <span id="clickMeText">Dark Mode</span>
              <span className="button_icon">
                <ion-icon name="moon"></ion-icon>
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