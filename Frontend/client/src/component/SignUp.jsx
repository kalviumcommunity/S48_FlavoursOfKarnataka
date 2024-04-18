import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SignUp.css'
import axios from 'axios';
function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    UserName: "",
    email: "",
    password: "",
  });

  function setCookie(name, value, daysToExpire) {
    let date = new Date();
    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    document.cookie =
      name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/Createuser", {UserName:formData.UserName,email:formData.email,password:formData.password});
      if (response.data.success) {
        // Login successful, redirect to home page or dashboard
        navigate("/UserData");
        setCookie('username',formData.UserName)
        setCookie('accesstoken',response.data.accessToken)
      } else {
        // Login failed, handle error or show error message
        console.error("Login failed:", response.data.message);
        // Display error message to the user
      }
    } catch (error) {
      console.error('Error creating user:', error.message);
      // Handle error, show error message to user, etc.
    }
  };


  return (
    <div className="container">
      <div className="signup-page">
        <form onSubmit={handleSubmit}>
          <label htmlFor="UserName">Username:</label>
          <input
            type="text"
            id="UserName"
            name="UserName"
            placeholder="Enter your username"
            value={formData.UserName}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button className="SignUpBtn" type="submit">
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;