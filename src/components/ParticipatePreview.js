import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ParticipatePreview = () => {
  const { userId, roomId } = useParams();
  const [phone, setPhone] = useState('');
  const [instaName, setInstaName] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchParticipationDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://pumped-platinum-digit.glitch.me/participation-preview/user/${userId}/${roomId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { phone, insta_name, images } = response.data;
        setPhone(phone);
        setInstaName(insta_name);
        setImages(images); // Assuming images is an array of base64 strings
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch participation details');
        setLoading(false);
      }
    };

    fetchParticipationDetails();
  }, [userId, roomId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Participation Preview</h1>
      <p>Phone Number: {phone}</p>
      <p>Instagram Name: {instaName}</p>
      <div>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Participation Image ${index}`} style={{ maxWidth: '100%', maxHeight: '200px' }} />
        ))}
      </div>
    </div>
  );
};

export default ParticipatePreview;
