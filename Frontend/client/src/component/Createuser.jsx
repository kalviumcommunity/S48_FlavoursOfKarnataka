import { useState } from "react";
import axios from 'axios'
import './Createuser.css';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

function CreateUser(){
    const [restaurant_name, setRestaurant_name] = useState("");
    const [Location, setLocation] = useState("");
    const [Specialities, setSpecialities] = useState("");
    const [Fresh_seafood, setFresh_seafood] = useState("");
    const [Variety_of_meal_preparation,setVariety_of_meal_preparation] = useState("");

    const navigate = useNavigate()

    const Submit = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:3000/createFlavours", {
            restaurant_name: restaurant_name,
            Location: Location,
            Specialities: Specialities,
            Fresh_seafood: Fresh_seafood,
            Variety_of_meal_preparation : Variety_of_meal_preparation,
            UserName: Cookies.get("username")
        })
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
                        <label htmlFor="">Name </label>
                        <input type="text" placeholder="Enter Name" className="form-control"
                        onChange={(e)=>setRestaurant_name(e.target.value)}/> {/* <-- Set restaurant_name state */}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Location </label>
                        <input type="text" placeholder="Enter Location" className="form-control"
                        onChange={(e)=>setLocation(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Specialities </label>
                        <input type="text" placeholder="Enter Specialities" className="form-control"
                        onChange={(e)=>setSpecialities(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Fresh_seafood </label>
                        <input type="text" placeholder="Enter Fresh_seafood" className="form-control"
                        onChange={(e)=>setFresh_seafood(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Variety_of_meal_preparation </label>
                        <input type="text" placeholder="Enter Variety_of_meal_preparation" className="form-control"
                        onChange={(e)=>setVariety_of_meal_preparation(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Ambience </label>
                        <input type="text" placeholder="Enter Ambience" className="form-control"
                        onChange={(e)=>setAmbience(e.target.value)}/>
                    </div>
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateUser;