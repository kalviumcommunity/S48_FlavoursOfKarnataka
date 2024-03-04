import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function CreateUser(){
    const [name, setName] = useState()
    const [location, setlocation] = useState()
    const [speciality, setspeciality] = useState()
    const [payment, setpayment] = useState()
    const navigate = useNavigate()

    const Submit = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:3000/createUser", {name, location, speciality, payment})
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
                        <label htmlFor="">resturant_name </label>
                        <input type="text" placeholder="Enter Name" className="form-control"
                        onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">location </label>
                        <input type="text" placeholder="Enter location" className="form-control"
                        onChange={(e)=>setlocation(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">speciality </label>
                        <input type="text" placeholder="Enter speciality" className="form-control"
                        onChange={(e)=>setspeciality(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">payment </label>
                        <input type="text" placeholder="Enter payment" className="form-control"
                        onChange={(e)=>setpayment(e.target.value)}/>
                    </div>
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateUser;