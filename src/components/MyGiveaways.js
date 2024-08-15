import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyGiveaways = () => {
  const [giveawayDetails, setGiveawayDetails] = useState([]);

  useEffect(() => {
    const fetchGiveawayDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://pumped-platinum-digit.glitch.me/my-giveaways', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGiveawayDetails(response.data);
      } catch (err) {
        console.error('Error fetching giveaway details:', err);
      }
    };

    fetchGiveawayDetails();
  }, []);

  return (
    <div>
      <h2>My Giveaway Details</h2>
      <ul>
        {giveawayDetails.map((detail, index) => (
          <li key={index}>
            Room ID: {detail.room_id}, Giveaway Name: {detail.giveaway_name}, Start Date: {detail.start_date}, End Date: {detail.end_date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyGiveaways;
