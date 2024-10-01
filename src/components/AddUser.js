import React, { useState } from 'react';
import axios from 'axios';

const AddUser = ({ onAddUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send POST request to backend to add new user
    axios.post('http://localhost:3001/api/users', { name, email, age })
      .then((response) => {
        alert('User added successfully');
        // Use the response data to add the user to the list
        onAddUser({ id: response.data.id, name, email, age }); // Ensure you get the correct ID from response
        // Clear the form
        setName('');
        setEmail('');
        setAge('');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add User</h2>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '500px' }}>
        <div className="form-group mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
