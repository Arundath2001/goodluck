import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyParticipationDetails = () => {
  const [participationDetails, setParticipationDetails] = useState([]);

  useEffect(() => {
    const fetchParticipationDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/my-participation', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setParticipationDetails(response.data);
      } catch (err) {
        console.error('Error fetching participation details:', err);
      }
    };

    fetchParticipationDetails();
  }, []);

  return (
    <div>
      <h2>My Participation Details</h2>
      <ul>
        {participationDetails.map((detail, index) => (
          <li key={index}>
            Room ID: {detail.room_id}, Phone: {detail.phone}, Instagram: {detail.insta_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyParticipationDetails;
