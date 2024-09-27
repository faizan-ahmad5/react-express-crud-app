import { useState } from 'react'
import axios from 'axios'

function App() {
  const [users, setUsers] = useState([])  
  const API_URL = 'http://localhost:3000/api/users'

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log(response);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center bg-blue-50 p-4 rounded-md">CRUD Using React and Express</h1>
      <button 
        onClick={fetchUsers} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Fetch Users
      </button>
      <ul className="mt-4">
        <li className="grid grid-cols-4 gap-4 font-bold">
          <span>ID</span>
          <span>Name</span>
          <span>Email</span>
          <span>Age</span>
        </li>
        {users.map((user) => (
          <li key={user.id} className="grid grid-cols-4 gap-4 border-b py-2">
            <span>{user.id}</span>
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span>{user.age}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
