import { useEffect, useState } from "react"
import axios from 'axios'
import 'tailwindcss/tailwind.css' // Ensure Tailwind CSS is imported

const API_URL = 'http://localhost:3000/api/users'

function App() {
 const [users, setUsers]  = useState([])
 const [newUser, setNewUser] = useState('');
 const [updateUser, setUpdateUser] = useState({ id: '', name: '' });

 async function fetchUsers(){
    const response = await axios.get(API_URL)
    const content = response.data
    
    setUsers(content.data)
 }

 useEffect(()=>{
  fetchUsers()
 },[])


 // Add a user (CREATE)
  const addUser = () => {
    axios.post(API_URL, { name: newUser })
      .then(response => {
        setUsers([...users, response.data]);
        setNewUser(''); // Reset input
        fetchUsers()
      })
      .catch(err => console.error(err));
  };

  const updateUserById = (id) => {
    axios.put(`${API_URL}/${id}`, { name: updateUser.name })
      .then(response => {
        setUsers(users.map(user => (user.id === id ? response.data : user)));
        setUpdateUser({ id: '', name: '' }); // Reset input
        fetchUsers()
      })
      .catch(err => console.error(err));
  };

  // Delete a user (DELETE)
  const deleteUserById = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(err => console.error(err));
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CRUD Operations</h1>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          placeholder="Enter new user"
          className="border p-2 mr-2 flex-grow"
        />
        <button onClick={addUser} className="bg-blue-500 text-white p-2 rounded">Add User</button>
      </div>

      {/* Update User */}
      {updateUser.id && (
        <div className="mb-4 flex items-center">
          <input
            type="text"
            value={updateUser.name}
            onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
            placeholder="Update user name"
            className="border p-2 mr-2 flex-grow"
          />
          <button onClick={() => updateUserById(updateUser.id)} className="bg-green-500 text-white p-2 rounded">Update User</button>
        </div>
      )}

      <ul className="list-disc pl-5">
        {users.map(user => (
          <li key={user.id} className="mb-2 flex items-center">
            <span className="mr-2 flex-grow">{user.name}</span>
            <button onClick={() => setUpdateUser({ id: user.id, name: user.name })} className="bg-yellow-500 text-white p-1 rounded mr-2">Edit</button>
            <button onClick={() => deleteUserById(user.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default App