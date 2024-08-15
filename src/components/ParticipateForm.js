import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ParticipateForm = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [phone, setPhone] = useState('');
  const [instaName, setInstaName] = useState('');
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/user-details', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsername(response.data.username);
        setEmail(response.data.email);
        setUserId(response.data.userId); // Ensure this is set correctly
      } catch (err) {
        setError('Failed to fetch user details');
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  
    Promise.all(files.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result);
      });
    })).then(previewResults => {
      setPreviewImages(previewResults);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setError('User ID is missing');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const base64Images = await Promise.all(images.map(file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise(resolve => {
          reader.onloadend = () => resolve(reader.result);
        });
      }));

      await axios.post('http://localhost:5000/participate', {
        roomId,
        phone,
        instaName,
        images: base64Images,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate(`/participation-preview/user/${userId}/${roomId}`);
    } catch (err) {
      setError('Failed to participate in giveaway');
    }
  };

  return (
    <div>
      <h1>Participate in Giveaway</h1>
      <p>Name: {username}</p>
      <p>Email: {email}</p>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Instagram Name"
          value={instaName}
          onChange={(e) => setInstaName(e.target.value)}
          required
        />
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          required
        />
        {previewImages.length > 0 && (
          <div>
            <h2>Previews:</h2>
            {previewImages.map((src, index) => (
              <img key={index} src={src} alt={`Preview ${index}`} style={{ maxWidth: '100%', maxHeight: '200px' }} />
            ))}
          </div>
        )}
        {error && <p>{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ParticipateForm;
