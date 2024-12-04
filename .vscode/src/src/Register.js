/**
 * Register.js
 * 
 * This component provides a registration form for new users. It sends 
 * the registration details to the backend, and if successful, redirects to the login page.
 */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PasswordChecklist from "react-password-checklist";

/**
 * Register component allows new users to create an account.
 * @returns {JSX.Element} The registration form.
 */
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  /**
   * Handles form submission by sending registration details to the backend.
   * @param {Object} e - Event object from the form submission.
   */
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (username.trim() === '' || password.trim() === '') {
      alert('Username and password cannot be empty.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5001/auth/register',
        { username, password },
        { withCredentials: true }
      );

      if (response.data.message === 'User registered successfully') {
        alert('Registration successful');
        navigate('/'); // Navigate to login page after registration
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Error registering user');
    }
  };

  return (
    <div className="register-form" style={{display: 'flex', justifyContent: 'center', alighnItems: 'center', height: '55vh'}}>
      <form
        onSubmit={handleRegister}
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
      <h2 style={{ textAlign: 'center' }}>Create Account</h2>
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
       <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{
            marginBottom: '20px',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        <PasswordChecklist
              rules={[
                "minlength",
                "specialChar",
                "number",
                "capital",
                "match",
              ]}
              minlength={5}
              value={password}
              valueAgain={confirmPassword}
          />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#FF5722',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#E64A19')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#FF5722')}
        >Register</button>
    </form>
    </div>
  );
};

export default Register;