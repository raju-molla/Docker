import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [usernames, setUsernames] = useState([]);
  const [message, setMessage] = useState('');

  const fetchUsernames = async () => {
    try {
      const res = await axios.get('http://localhost:5000/usernames');
      setUsernames(res.data.usernames);
    } catch (err) {
      console.error('Error fetching usernames', err);
    }
  };

  const handleAddUsername = async () => {
    if (!username.trim()) {
      setMessage('Username is required');
      return;
    }

    try {
      await axios.post('http://localhost:5000/addUsername', { username });
      setMessage('Username added successfully');
      setUsername('');
      fetchUsernames();
    } catch (err) {
      console.error('Error adding username', err);
      setMessage('Failed to add username');
    }
  };

  useEffect(() => {
    fetchUsernames();
  }, []);

  return (
    <div className="container">
      <h2>Username Manager</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleAddUsername}>Add Username</button>
      {message && <p className="message">{message}</p>}

      <h3>Username List</h3>
      <ul>
        {usernames.map((u, idx) => (
          <li key={idx}>{u}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
