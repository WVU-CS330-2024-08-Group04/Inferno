/**
 * Login.js
 * 
 * This component provides a login form that authenticates the user.
 * Upon successful login, it updates the authentication state and navigates to the map page.
 */

//import statements, react and axios
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Removed Link from the list

/**
 * Login component allows users to enter credentials to access the app.
 * @param {Function} setAuthenticated - Function to update the app's authentication state.
 * @returns {JSX.Element} The login form.
 */
// Removed { setAuthenticated } from the fuction 
function Login ()  {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [error, setError] = useState('');
  const navigate = useNavigate();

  /**
   * handleSubmit
   * 
   * Handles form submission by sending credentials to the backend for verification.
   * Updates authentication state and navigates to the map page upon success.
   * 
   * @param {Object} e - Event object from the form submission.
   * @async
   * @function
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      alert('Username and/or Password are incorrect or empty');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5001/auth/login',
        { username, password },
        { withCredentials: true }
      );

      if (response.data.message === 'Login successful') {
        // setAuthenticated(true);
        navigate('/MapPage'); // Redirect to main page
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid credentials');
    }
  };

  //contains inline css
  return (
    <div className="login-form" style={{display: 'flex', justifyContent: 'center', alighnItems: 'center', height: '44vh'}}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '400px',
          width: '100%',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: 'white',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          marginBottom: '10px',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          marginBottom: '10px',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: 'rgba(244, 144, 12, 1)',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = 'rgb(204, 121, 12)')}
          onFocus={(e) => (e.target.style.backgroundColor = 'rgb(204, 121, 12)')}
          onMouseOut={(e) => (e.target.style.backgroundColor = 'rgba(244, 144, 12, 1)')}
          onBlur={(e) => (e.target.style.backgroundColor = 'rgb(204, 121, 12)')}

        >Login</button>
        <button
          type="button"
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            backgroundColor: 'rgba(244, 144, 12, 1)',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = 'rgb(204, 121, 12)')}
          onFocus={(e) => (e.target.style.backgroundColor = 'rgb(204, 121, 12)')}
          onMouseOut={(e) => (e.target.style.backgroundColor = 'rgba(244, 144, 12, 1)')}
          onBlur={(e) => (e.target.style.backgroundColor = 'rgb(204, 121, 12)')}
        >
          Back to Home
        </button>
      </form>
    </div>
  );
};

export default Login;