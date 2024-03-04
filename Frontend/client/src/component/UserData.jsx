import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../component/UserData.css'; 

export default function UserList() {
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    axios.get('http://localhost:3000')
    .then(result => setUsers(result.data))
    .catch(err => console.log(err))
  },[])

  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center text-align-center">
      <div className="w-50">
      <Link to="/create" className='btn btn-success' > Add +</Link>
        <table className="table">
          <thead>
            <tr>
              <th>restaurant_name</th>
              <th>location</th>
              <th>specialities</th>
              <th>fresh_seafood</th>
              <th>variety_of_meat_preparation</th>
              <th>ambience</th>
            </tr>
          </thead>
          <tbody>
            {users.map(data => (
              <tr key={data._id}>
                <td>{data.restaurant_name}</td>
                <td>{data.location}</td>
                <td>{data.specialities}</td>
                <td>{data.fresh_seafood}</td>
                <td>{data.variety_of_meat_preparation}</td>
                <td>{data.ambience}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}