import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './Login';
import './App.css';
import Register from './Register';
import MapPage from './MapPage';
import Welcome from './welcome';

// import sheet from './style.css' with { type: 'css' };
// document.adoptedStyleSheets = [sheet];

// const link = document.createElement('link');
// link.rel = 'stylesheet';
// link.href = 'style.css';
// document.head.appendChild(link);



/**
 * Main application component that manages routes and authentication state.
 * @returns {JSX.Element} The rendered application with routes.
 */
function App() {
  // Initialize authenticated state from local storage
  const [authenticated, setAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem('authenticated')) || false
  );

  // Update local storage whenever `authenticated` state changes
  useEffect(() => {
    localStorage.setItem('authenticated', JSON.stringify(authenticated));
  }, [authenticated]);

  return (
     
    <Router>
      <Routes>
        {/* Redirect to /login if not authenticated; otherwise to /map */}
        <Route
          path="/"
          element={<Navigate to="/welcome" replace />}
        />

        {/* Login Route */}
        <Route
          path="/login"
          element={
            authenticated ? (
              <Navigate to="/mappage" replace />
            ) : (
              <Login setAuthenticated={setAuthenticated} />
            )
          }
        />

        {/* Register Route */}
        <Route
          path="/register"
          element={
            authenticated ? (
              <Navigate to="/mappage" replace />
            ) : (
              <Register />
            )
          }
        />

        {/* Map Page Route */}
        <Route
          path="/mappage"
          element={
            authenticated ? (
              <MapPage setAuthenticated={setAuthenticated} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App; 