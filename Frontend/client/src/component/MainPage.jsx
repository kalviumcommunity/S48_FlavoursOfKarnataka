import React from 'react';
import './MainPage.css'; 
import { Routes, Route, Link } from 'react-router-dom'; 
import SignUp from './SignUp'; 

function RestaurantWebsite() {
  return (
    <div>
      <div className="header">
        <div className="title">
          <h1>Spices with mixed masala: List of NON-VEG restaurants</h1>
        </div>
      </div>
      <div className="logo">
      <Link to="/login" className="login-signup-btn">Login</Link>
      <Link to="/SignUp" className="button">Sign Up</Link>
      <Link to="/UserData" className="button">data</Link> 
      </div>
      <div className="content">
        <div className="description">
          <p>"Dive into a flavor-packed journey! Non-vegetarians, rejoice in the sizzle of tandoori, the aroma of chicken curry, and the spice of biryani.<br/>
           Let your taste buds dance and your cravings be satisfied!"</p>
        </div>
      </div>
      <Routes><Route path='/SignUp' element={<SignUp />}/></Routes> 
    </div>
  );
}

export default RestaurantWebsite;
