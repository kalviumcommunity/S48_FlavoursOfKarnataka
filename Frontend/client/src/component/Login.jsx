import React, { useState } from "react";
import "./Login.css";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate()
  const [field, setField] = useState({
    UserName:"", 
    email:"",
    password:"" 
  });

  function setCookie(name, value, daysToExpire) {
    let date = new Date();
    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    document.cookie =
      name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/Login", {UserName:field.UserName,email:field.email,password:field.password});
      if (response.data.success) {
        // Login successful, redirect to home page or dashboard
        navigate("/UserData");
        setCookie('username',field.UserName)
        setCookie('accesstoken',response.data.accessToken)
      } else {
        // Login failed, handle error or show error message
        console.error("Login failed:", response.data.message);
        // Display error message to the user
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle error, show error message to the user, etc.
    }
  };


  return (
    <div className="center-container"> 
      <div className="form-container">
        <form className="register-form" onSubmit={(e)=>{e.preventDefault();
          if(field.UserName && field.email && field.password)setValidation(true);
          setSubmit(true)}}>

          

          <input
            id="UserName" 
            className="form-field"
            type="text"
            placeholder="UserName" 
            name="UserName" 
            value={field.UserName} 
            onChange={(e)=>{setField({...field, UserName:e.target.value})}} 
          />

        
          <input
            id="email"
            className="form-field"
            type="text"
            placeholder="Email"
            name="email"
            value={field.email}
            onChange={(e)=>{setField({...field, email:e.target.value})}}
          />


          <input
            id="password" 
            className="form-field"
            type="password" 
            placeholder="Password" 
            name="password" 
            value={field.password}
            onChange={(e)=>{setField({...field, password:e.target.value})}} 
          />


          <button className="form-field" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;