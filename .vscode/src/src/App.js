import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './logo.svg';
import Login from './Login';
import './App.css';
import Register from './Register';

// import sheet from './style.css' with { type: 'css' };
// document.adoptedStyleSheets = [sheet];

// const link = document.createElement('link');
// link.rel = 'stylesheet';
// link.href = 'style.css';
// document.head.appendChild(link);

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

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Inferno is here
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    // <head>
    // <meta charset="utf-8"></meta>
    // <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
    // <title>Welcome To Inferno </title>
    // <meta name="description" content="welcome page"></meta>
    // <meta name="viewport" content="width=device-width, initial-scale=1">
    // <link rel="stylesheet" href="WelcomeStyles.css">

<Router>
    <div>
    
    <img src={logo} className="App-logo" alt="logo" />
    <img id="image" src="Inferno_wildfire_full_logo_cropped_upscaled.png" class="center" alt="logo"></img>
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
                <p><Link to="/create-account" className="button-link">Create an Account</Link></p>
              </div>
            </div>
          </div>

          <div className="video">
            <video width="320" height="240" autoPlay muted loop>
              <source src="Untitled video - Made with Clipchamp.mp4" type="video/mp4"></source>
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
            <li><a href="map.html" className="guest-link">Continue to Map</a></li>
            <li><a href="about.html" className="about-link">About</a></li>
          </ul>
        </nav>
      </div>

     
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<Register />} />
      </Routes>
    </Router> 
  );
} 


export default App;
