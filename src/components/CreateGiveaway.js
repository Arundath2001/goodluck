import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateGiveaway = () => {
  const [giveawayName, setGiveawayName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [noOfWinners, setNoOfWinners] = useState('');
  const [pagesToFollow, setPagesToFollow] = useState('');
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      const base64Image = reader.result;
      const giveawayData = {
        giveawayName,
        startDate,
        endDate,
        noOfWinners,
        pagesToFollow,
        image: base64Image,
        password,
      };

      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:5000/create-giveaway', giveawayData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate(`/giveaway-preview/${response.data.roomId}`);
      } catch (err) {
        console.error('Giveaway creation error:', err);
        setError('Giveaway creation failed');
      }
    };
  };

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Giveaway Name:</label>
          <input type="text" value={giveawayName} onChange={(e) => setGiveawayName(e.target.value)} required />
        </div>
        <div>
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>
        <div>
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>
        <div>
          <label>No of Winners:</label>
          <input type="number" value={noOfWinners} onChange={(e) => setNoOfWinners(e.target.value)} required />
        </div>
        <div>
          <label>Pages to Follow:</label>
          <textarea value={pagesToFollow} onChange={(e) => setPagesToFollow(e.target.value)} required />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Create Giveaway</button>
      </form>
    </div>
  );
};

export default CreateGiveaway;
