import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Registration.css'; // Import CSS file for styling
import registerImage from '../../src/images/registerimage.png';

function Registration() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    password:''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log('Submitting form data:', formData);
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      console.log('Response received:', response);
      // Handle success response here
      alert('Registration successful!');
    } catch (error) {
      // Handle error here
      console.error('There was a problem with your registration:', error.message);
    }
  };
  
  return (
    <div className="registration-container">
      <div className="registration-form-container">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <input type="text" name="role" value={formData.role} onChange={handleChange} />
          </div>
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/Login">Login</Link></p> {/* Link to the login page */}
      </div>
      <div className="registration-image-container">
        <img src={registerImage} alt="Registration" />
      </div>
    </div>
  );
}

export default Registration;
