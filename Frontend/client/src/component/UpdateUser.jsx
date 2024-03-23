import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
    const { id } = useParams();
    const [restaurant_name, setrestaurant_name] = useState('');
    const [Location, setLocation] = useState('');
    const [Specialities, setSpecialities] = useState('');
    const [Fresh_seafood, setFresh_seafood] = useState('');
    const [Ambience, setAmbience] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/getFlavours/${id}`)
            .then(response => {
                setrestaurant_name(response.data.restaurant_name);
                setLocation(response.data.Location);
                setSpecialities(response.data.Specialities);
                setFresh_seafood(response.data.Fresh_seafood);
                setAmbience(response.data.Ambience);
            })
            .catch(error => console.log(error));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedUser = {
            restaurant_name: restaurant_name,
            Location: Location,
            Specialities: Specialities,
            Fresh_seafood: Fresh_seafood,
            Ambience: Ambience
        };
        axios.put(`http://localhost:3000/updateUser/${id}`, updatedUser)
            .then(response => {
                console.log(response);
                navigate('/userList');
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="d-flex vh-100 bg-black justify-content-center align-items-center">
            <div className='w-200 bg-white rounded p-3'>
                <form onSubmit={handleUpdate}>
                    <h2>Update Users</h2>
                    <div className="mb-2">
                        <label htmlFor="">restaurant_name </label>
                        <input type="text" placeholder="Enter restaurant_name" className="form-control"
                            value={restaurant_name} onChange={(e) => setrestaurant_name(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Location </label>
                        <input type="text" placeholder="Enter Location" className="form-control"
                            value={Location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Specialities </label>
                        <input type="text" placeholder="Enter Specialities name" className="form-control"
                            value={Specialities} onChange={(e) => setSpecialities(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Fresh_seafood </label>
                        <input type="text" placeholder="Enter Fresh_seafood" className="form-control"
                            value={Fresh_seafood} onChange={(e) => setFresh_seafood(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Ambience </label>
                        <input type="text" placeholder="Enter Ambience" className="form-control"
                            value={Ambience} onChange={(e) => setAmbience(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-success">Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
