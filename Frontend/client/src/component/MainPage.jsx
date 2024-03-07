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
      <Link to="/SignUp" className="button">Sign Up</Link>
      <Link to="/UserData" className="button">data</Link> 
      </div>
      <div className="content">
        <div className="description">
          <h2>Description of NON-VEG:</h2>
          <p>Food is for living but for non-vegetarian it is one of the best feeling to have a spicy and delicious tandoori, chicken curry, biryani
            <br /> and all those make an non-vegetarian a satisfactory feel...
          </p>
        </div>
      </div>
      <Routes><Route path='/SignUp' element={<SignUp />}/></Routes> 
    </div>
  );
}

export default RestaurantWebsite;
