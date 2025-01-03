import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; //Removed Link from the list
import Login from './Login';
import './App.css';
import Register from './Register';
import MapPage from './MapPage';
import Welcome from './welcome';
import About from './about';
import AccountSettings from './accountSettings';

/**
 * Main application component that manages routes and authentication state.
 * @returns {JSX.Element} The rendered application with routes.
 */
function App() {
  // Initialize authenticated state from local storage
  // Removed setAuthenticated from the below line
  const [authenticated] = useState(
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
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/MapPage" element={<MapPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/accountSettings" element={<AccountSettings />} />

       
      </Routes>
    </Router>
  );
}

export default App; 
