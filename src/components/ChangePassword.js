import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://pumped-platinum-digit.glitch.me/change-password-logged-in', { currentPassword, newPassword }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Password changed successfully');
      navigate('/home');
    } catch (err) {
      alert('Failed to change password');
    }
  };

  return (
    <form onSubmit={handleChangePassword}>
      <div>
        <label>Current Password:</label>
        <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
      </div>
      <div>
        <label>New Password:</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </div>
      <button type="submit">Change Password</button>
    </form>
  );
};

export default ChangePassword;
