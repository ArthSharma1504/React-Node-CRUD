import React, { useState, useEffect } from 'react';
import AddUser from './components/AddUser';
import UserList from './components/UserList';
import UpdateUser from './components/UpdateUser';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    // Fetch users from backend
    axios.get('http://localhost:3001/api/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleEditUser = (id) => {
    setSelectedUserId(id); // Set the selected user ID for editing
  };

  const handleAddUser = (newUser) => {
    // Add the new user to the users state
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleUpdateUser = (updatedUser) => {
    // Update the specific user in the users state
    setUsers((prevUsers) => 
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    // Clear the selected user ID after updating
    setSelectedUserId(null);
  };

  return (
    <div className="App">
      <AddUser onAddUser={handleAddUser} />
      <UserList users={users} onEdit={handleEditUser} />
      {/* Show UpdateUser component only when a user is selected */}
      {selectedUserId && <UpdateUser userId={selectedUserId} onUpdateUser={handleUpdateUser} />}
    </div>
  );
}

export default App;
