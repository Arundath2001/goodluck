import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const GiveawayPreview = ({ isCreator }) => {
  const { roomId } = useParams();
  const [giveaway, setGiveaway] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

  const handleContinue = () => {
    navigate(`/giveaway-credentials/${roomId}`);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!giveaway) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{giveaway.giveawayName}</h1>
      <p>Start Date: {giveaway.startDate}</p>
      <p>End Date: {giveaway.endDate}</p>
      <p>Number of Winners: {giveaway.noOfWinners}</p>
      <p>Pages to Follow: {giveaway.pagesToFollow}</p>
      <img src={giveaway.image} alt="Giveaway" />

      {!isCreator && <button onClick={handleContinue}>Continue</button>}
    </div>
  );
};

export default GiveawayPreview;
