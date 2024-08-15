import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SelectWinner = () => {
  const [roomId, setRoomId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/validate-room',
        { roomId, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If validation is successful, check if the user is the creator of the giveaway
      const creatorResponse = await axios.get(`http://localhost:5000/giveaway-details/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (creatorResponse.data.created_by === token.userId) {
        navigate(`/select-winner/${roomId}`);
      } else {
        setMessage('You are not authorized to select the winner for this giveaway.');
      }
    } catch (err) {
      setMessage('Invalid room ID or password');
    }
  };

  return (
    <div>
      <h1>Select Winner</h1>
      {message && <p>{message}</p>}
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

export default SelectWinner;
