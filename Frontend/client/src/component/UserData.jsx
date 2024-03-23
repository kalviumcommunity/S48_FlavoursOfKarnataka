import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './UserData.css'; 

export default function UserList() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:3000/getFlavours')
    .then(result => setUsers(result.data))
    .catch(err => console.log(err));
  },[]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/deleteFlavours/${id}`)
      .then(response => {
        window.location.reload();
        console.log(response)

      })
      .catch(error => {
        console.log(error);
      }); 
  };

  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center text-align-center">
      <div className="w-50">
        <Link to="/create" className='btn btn-success'> Add +</Link>
        <table className="table">
          <thead>
            <tr>
              <th>restaurant_name</th>
              <th>location</th>
              <th>specialities</th>
              <th>fresh_seafood</th>
              <th>variety_of_meat_preparation</th>
              <th>ambience</th>
              <th colSpan='2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(data => (
              <tr key={data._id}>
                <td>{data.restaurant_name}</td>
                <td>{data.Location}</td>
                <td>{data.Specialities}</td>
                <td>{data.fresh_seafood?"True":"False"}</td>
                <td>{data.variety_of_meat_preparation?"True":"False"}</td>
                <td>{data.ambience}</td>
                <td><Link to={`/update/${data._id}`}><button>Update</button></Link> </td>
                <td><button onClick={() => handleDelete(data._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
