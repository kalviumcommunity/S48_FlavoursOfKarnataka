import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    axios.get('http://localhost:3000')
    .then(result => setUsers(result.data))
    .catch(err => console.log(err))
  },[])
  
    return (
    <div className="d-flex vh-100 bg-black justify-content-center align-items-center">
      <div className='w-100 bg-white rounded p-3'>
        <Link to="/create" className='btn btn-success' > Add +</Link>
        <table className="table">
          <thead>
            <tr>
              <th>resturant_name</th>
              <th>location</th>
              <th>specialities</th>
              <th>fresh_seafood</th>
              <th>variety_of_meal_preparation</th>
            </tr>
          </thead>
          <tbody>
            {users.map(data => {
              return <tr key={data._id}>
                <td>{data.resturant_name}</td>
                <td>{data.location}</td>
                <td>{data.specialities}</td>
                <td>{data.fresh_seafood}</td>
                <td>{data.variety_of_meal_preparation}</td>
                <td>{data.ambience}</td>
              </tr>
            })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;