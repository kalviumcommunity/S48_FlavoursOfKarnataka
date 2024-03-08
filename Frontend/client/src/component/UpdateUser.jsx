import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

function UpdateUser() {
    const { id } = useParams();
    const [restaurant_name, setrestaurant_name] = useState('');
    const [location, setlocation] = useState('');
    const [specialities, setspecialities] = useState('');
    const [fresh_seafood, setfresh_seafood] = useState('');
    const [variety_of_meal_preparation, setvariety_of_meal_preparation] = useState('');
    const [ambience, setambience] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/getUser/${id}`)
            .then(response => {
                const { restaurant_name, location, specialities, fresh_seafood, variety_of_meal_preparation, ambience } = response.data;
                setrestaurant_name(restaurant_name);
                setlocation(location);
                setspecialities(specialities);
                setfresh_seafood(fresh_seafood);
                setvariety_of_meal_preparation(variety_of_meal_preparation)
                setambience(ambience);
            })
            .catch(error => console.log(error));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/UpdateUser/${id}`, { restaurant_name, location, specialities, fresh_seafood, variety_of_meal_preparation, ambience })
            .then(response => {
                console.log(response)
                navigate('/UserData');
            })
            .catch(error => console.log(error));
            
    }

    return (
        <div className="d-flex vh-100 bg-black justify-content-center align-items-center">
            <div className='w-200 bg-white rounded p-3'>
                <form onSubmit={handleUpdate}>
                    <h2>Update Users</h2>
                    <div className="mb-2">
                        <label htmlFor=""> restaurant_name </label>
                        <input type="text" placeholder="Enter restaurant_name" className="form-control"
                            value={restaurant_name} onChange={(e) => setrestaurant_name(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">location </label>
                        <input type="text" placeholder="Enter location" className="form-control"
                            value={location} onChange={(e) => setlocation(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">specialities </label>
                        <input type="text" placeholder="Enter specialities name" className="form-control"
                            value={specialities} onChange={(e) => setspecialities(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">fresh_seafood </label>
                        <input type="text" placeholder="Enter fresh_seafood" className="form-control"
                            value={fresh_seafood} onChange={(e) => setfresh_seafood(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">variety_of_meal_preparation </label>
                        <input type="text" placeholder="Enter variety_of_meal_preparation" className="form-control"
                            value={variety_of_meal_preparation} onChange={(e) => setvariety_of_meal_preparation(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-success">Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;