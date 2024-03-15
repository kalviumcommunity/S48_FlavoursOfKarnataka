import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function CreateUser(){
    const [restaurant_name, setRestaurantName] = useState("");
    const [location, setLocation] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [fresh_seafood, setFreshSeafood] = useState("");
    const navigate = useNavigate();

    const Submit = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:3001/CreateUser", {restaurant_name, location, speciality, fresh_seafood})
        .then(result => {
            console.log(result)
            navigate('/')
        })
        .catch(err => console.log(err))
    }

    return(
        <div className="d-flex vh-100 bg-black justify-content-center align-items-center">
            <div className='w-100 bg-white rounded p-3'>
                <form onSubmit={Submit}>
                    <h2>Add Users</h2>
                    <div className="mb-2">
                        <label htmlFor="">Restaurant Name</label>
                        <input type="text" placeholder="Enter name" className="form-control"
                        onChange={(e)=>setRestaurantName(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Location</label>
                        <input type="text" placeholder="Enter location" className="form-control"
                        onChange={(e)=>setLocation(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Specialties</label>
                        <input type="text" placeholder="Enter specialties" className="form-control"
                        onChange={(e)=>setSpeciality(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Fresh Seafood</label>
                        <input type="text" placeholder="Enter fresh seafood" className="form-control"
                        onChange={(e)=>setFreshSeafood(e.target.value)}/>
                    </div>
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;
