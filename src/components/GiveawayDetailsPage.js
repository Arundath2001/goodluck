import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const GiveawayDetailsPage = () => {
  const { roomId } = useParams();
  const [giveawayDetails, setGiveawayDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGiveawayDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/giveaway-details/${roomId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGiveawayDetails(response.data);
      } catch (err) {
        setError('Error fetching giveaway details');
      }
    };

    fetchGiveawayDetails();
  }, [roomId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!giveawayDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Giveaway Details</h1>
      <p>Giveaway Name: {giveawayDetails.giveawayName}</p>
      <p>Start Date: {giveawayDetails.startDate}</p>
      <p>End Date: {giveawayDetails.endDate}</p>
      <p>Number of Winners: {giveawayDetails.noOfWinners}</p>
      <p>Pages to Follow: {giveawayDetails.pagesToFollow}</p>
      <img src={giveawayDetails.image} alt="Giveaway" />
      
      <Link to={`/participate-form/${roomId}`}><button>Continue</button></Link>
    </div>
  );
};

export default GiveawayDetailsPage;
