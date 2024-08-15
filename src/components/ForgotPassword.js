import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await axios.post('https://pumped-platinum-digit.glitch.me/send-otp', { email });
      setOtpSent(true);
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            setOtpSent(false);
            return 60;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    } catch (err) {
      alert('Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('https://pumped-platinum-digit.glitch.me/verify-otp', { email, otp });
      if (response.data.success) {
        setOtpVerified(true);
      } else {
        alert('Invalid OTP');
      }
    } catch (err) {
      alert('Failed to verify OTP');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://pumped-platinum-digit.glitch.me/change-password', { email, newPassword });
      alert('Password changed successfully');
      navigate('/login');
    } catch (err) {
      alert('Failed to change password');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={otpSent} />
      </div>
      <button onClick={handleSendOtp} disabled={otpSent}>{otpSent ? `Resend OTP in ${countdown}s` : 'Send OTP'}</button>
      
      {otpSent && (
        <div>
          <label>OTP:</label>
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}

      {otpVerified && (
        <form onSubmit={handleChangePassword}>
          <div>
            <label>New Password:</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <button type="submit">Change Password</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
