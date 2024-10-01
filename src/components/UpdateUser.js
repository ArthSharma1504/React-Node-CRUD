import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateUser = ({ userId, onUpdateUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    // Fetch the current user data
    axios.get(`http://localhost:3001/api/users/${userId}`)
      .then((response) => {
        const { name, email, age } = response.data;
        setName(name);
        setEmail(email);
        setAge(age);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send PUT request to update the user data
    axios.put(`http://localhost:3001/api/users/${userId}`, { name, email, age })
      .then(() => {
        alert('User updated successfully');
        // Call the onUpdateUser function to update the list in App.js
        onUpdateUser({ id: userId, name, email, age });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Update User</h2>
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
        <button type="submit" className="btn btn-success btn-block">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUser;
