import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './WinnerSelection.css';

const WinnerSelection = () => {
  const { roomId } = useParams();
  const [participantCount, setParticipantCount] = useState(0);
  const [winner, setWinner] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [displayNumber, setDisplayNumber] = useState('0000000');

  useEffect(() => {
    const fetchParticipantCount = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/giveaway-participants/${roomId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setParticipantCount(response.data.count);
      } catch (err) {
        console.error('Error fetching participants count:', err);
      }
    };

    fetchParticipantCount();
  }, [roomId]);

  const selectWinner = async () => {
    setIsSelecting(true);
    setDisplayNumber('0000000'); // Reset the display number before the animation
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/random-participant/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Simulate number scrolling animation with random numbers
      const interval = setInterval(() => {
        const randomNumber = Math.floor(1000000 + Math.random() * 9000000).toString();
        setDisplayNumber(randomNumber);
      }, 100);

      // Stop the animation after 3 seconds and display the winner
      setTimeout(() => {
        clearInterval(interval);
        setWinner(response.data);
        setDisplayNumber(response.data.user_id.toString().padStart(7, '0'));
        setIsSelecting(false);
      }, 3000);
    } catch (err) {
      console.error('Error selecting winner:', err);
      setIsSelecting(false);
    }
  };

  return (
    <div>
      <h1>Winner Selection</h1>
      <p>Number of participants: {participantCount}</p>
      <div className="number-display">
        {displayNumber.split('').map((digit, index) => (
          <span key={index} className="digit">{digit}</span>
        ))}
      </div>
      <button onClick={selectWinner}>Select Winner</button>
      {winner && (
        <div>
          <p>Winner: {winner.username}</p>
          <p>Email: {winner.email}</p>
          <p>Phone: {winner.phone}</p>
          <p>
            Instagram: <a href={`http://instagram.com/${winner.insta_name}`} target="_blank" rel="noopener noreferrer">{winner.insta_name}</a>
          </p>
          <iframe
            src={`https://www.instagram.com/${winner.insta_name}/embed`}
            width="400"
            height="500"
            frameBorder="0"
            scrolling="no"
            allowTransparency="true"
            style={{ border: 'none', overflow: 'hidden', marginTop: '10px' }}
            title='example'
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default WinnerSelection;
