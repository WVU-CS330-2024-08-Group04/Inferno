import logo from './logo.svg';
import './App.css';
// import sheet from './style.css' with { type: 'css' };
// document.adoptedStyleSheets = [sheet];

// const link = document.createElement('link');
// link.rel = 'stylesheet';
// link.href = 'style.css';
// document.head.appendChild(link);

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

<body>
    <img id="image" src="Inferno_wildfire_full_logo_cropped_upscaled.png" class="center" alt="logo"></img>
    <div class="content-container">
    <div class="container">
        <h1>Welcome to <strong class="orange-text">Inferno</strong></h1>
        <h2>Please Login or Create an Account</h2>
   
        <div class="account-options">
            <div>
                <h3>Have an Account?</h3>
                <p><a href="Login.js" class="button-link">Login</a></p>
            </div>
            <div>
                <h3>First Time User?</h3>
                <p><a href="AccCreate.html" class="button-link">Create an Account</a></p>
            </div>
        </div>
    </div>


    <div class="video">
    <video width="320" height="240" autoplay muted loop>
        <source src="Untitled video - Made with Clipchamp.mp4" type="video/mp4"></source>
      </video>
    </div>
    </div>

    <button id="clickMe" onclick="darkMode()">
        <span id="clickMeText">Dark Mode</span>
        <span class="button_icon">
            <ion-icon name="moon"></ion-icon>
        </span>
    </button>

    <nav class="navbar">
        <ul>
            <li><a href="map.html" class="guest-link">Continue to Map</a></li>
            <li><a href="about.html" class="about-link">About</a></li>
        </ul>
    </nav>


    <script src="dark_mode.js"></script> 
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</body>
  );
} 


export default App;
