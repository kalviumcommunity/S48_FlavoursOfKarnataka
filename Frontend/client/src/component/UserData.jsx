import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './UserData.css'; 
import { useNavigate } from "react-router-dom";
export default function UserList() {
  const [users, setUsers] = useState([]);
  const [uusers, setUusers] = useState([]);


  const [data,setData]=useState([])
  
  
  const navigate = useNavigate()
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    
    axios.get('http://localhost:3000/getFlavours')
    .then(result => setUusers(result.data),console.log(uusers,"all data"))
    .catch(err => console.log(err));

    axios.get('http://localhost:3000/getUsers')
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

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
    console.log(e.target.value,"valueeee")
    console.log("datattata",uusers)
     let x=uusers.filter((elem)=>{
           return elem.UserName==e.target.value
     })
     setData(x);
  

  };
console.log(data,"filter")
  const handleLogout = ()=>{
    document.cookie = 'username=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
    document.cookie = 'accesstoken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';

    navigate('/')
  }


  useEffect( () => {

    async function getData(){
      let x=await axios.get('http://localhost:3000/getFlavours').then((res)=>{
        setUusers(res.data)
      console.log(res.data)
  })
    }

    getData();

    console.log("value",uusers)
    
   

  },[]);

  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center text-align-center">
      <div className="w-50">
        <Link to="/create" className='btn btn-success'> Add +</Link>
        <button onClick={handleLogout}>Logout</button>
        {/* <table className="table">
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
        </table> */}
        <select onChange={handleUserChange} value={selectedUser}>
          <option value="">All users</option>
        {users.map((user) => (
           <option key={user._id} value={user.UserName}>
              {user.UserName}
            </option>
 ))}
        </select>
        <div>
          {
            uusers.filter(item=>item.UserName===selectedUser).map((uuser)=>(
              <div key={uuser._id}>
                <p>{uuser.restaurant_name}</p>
                <p>{uuser.Location}</p>
                <p>{uuser.Specialities}</p>
                <p>{uuser.fresh_seafood}</p>
                <p>{uuser.variety_of_meat_preparation}</p>
                <p>{uuser.ambience}</p>
              </div>
            ))
          }
        </div>
      </div>

         {/* {
             data.length==0 ? <h1>No data Found</h1> :
              <div>
                  {
                      data.map((elem)=>{
                       return <div key={elem._id}>
                        <p>{elem.restaurant_name}</p>
                        <p>{elem.Location}</p>
                        <p>{elem.Specialities}</p>
                        <p>{elem.fresh_seafood}</p>
                        <p>{elem.variety_of_meat_preparation}</p>
                        <p>{elem.ambience}</p>
                      </div>
                      })
                  }
                </div>
         } */}

    </div>
  );
}