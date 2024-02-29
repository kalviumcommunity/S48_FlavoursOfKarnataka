// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./component/MainPage";
import SignUp from "./component/SignUp";
import UserList from "./component/UserData";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/UserList" element={<UserList />} />
      </Routes>
    </Router>
  );
}

export default App;