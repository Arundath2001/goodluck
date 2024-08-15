import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GiveawayCredentialsPage = () => {
  const { roomId } = useParams();
  const [giveaway, setGiveaway] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGiveaway = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/giveaway-details/${roomId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGiveaway(response.data);
      } catch (err) {
        setError('Error fetching giveaway details');
      }
    };

    fetchGiveaway();
  }, [roomId]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Copied to clipboard!'))
      .catch(() => alert('Failed to copy'));
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!giveaway) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Giveaway Credentials</h1>
      <p>Room ID: {giveaway.roomId}</p>
      <button onClick={() => handleCopy(giveaway.roomId)}>Copy Room ID</button>
      <p>Password: {giveaway.password}</p>
      <button onClick={() => handleCopy(giveaway.password)}>Copy Password</button>
    </div>
  );
};

export default GiveawayCredentialsPage;
