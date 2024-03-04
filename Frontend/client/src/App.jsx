// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./component/MainPage";
import SignUp from "./component/SignUp";
import UserList from "./component/UserData";
import Users from "./component/Users";
import Createuser from "./component/Createuser";

function App(){
  // const [count, setCount]=useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/UserList" element={<UserList />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/create" element={<Createuser/>}/>
      </Routes>
    </Router>
  );
}

export default App;