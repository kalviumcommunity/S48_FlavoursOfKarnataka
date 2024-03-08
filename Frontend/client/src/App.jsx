import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./component/MainPage";
import SignUp from "./component/SignUp";
import UserData from "./component/UserData";
import Createuser from "./component/Createuser";
import UpdateUser from "./component/UpdateUser";

function App(){

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/UserData" element={<UserData />} />
        <Route path="/create" element={<Createuser/>}/>
        <Route path="/update/:id" element={<UpdateUser/>}/>
      </Routes>
    </Router>
  );
}

export default App;