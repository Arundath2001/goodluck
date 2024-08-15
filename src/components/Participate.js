import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Participate = (props) => {
  const [roomId, setRoomId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://pumped-platinum-digit.glitch.me/validate-room', { roomId, password }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      navigate(`/giveaway-details/${roomId}`);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        alert('You have already participated in this giveaway');
      } else {
        setError('Invalid room ID or password');
      }
    }
  };
  

  return (
    <div>
      <h1>Participate in Giveaway</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Participate;
