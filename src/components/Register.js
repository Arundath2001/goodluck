import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpExpiry, setOtpExpiry] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    let timer;
    if (otpExpiry) {
      timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = otpExpiry - now;

        if (distance <= 0) {
          clearInterval(timer);
          setOtpSent(false);
          setTimeRemaining(null);
        } else {
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setTimeRemaining(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpExpiry]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/send-otp', { email });
      setOtpSent(true);
      setOtpExpiry(new Date().getTime() + 10 * 60 * 1000); // Set expiry time to 10 minutes
      alert('OTP sent to your email');
    } catch (err) {
      alert('Failed to send OTP');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/verify-otp', { email, otp });
      setOtpVerified(true);
      alert('OTP verified successfully');
    } catch (err) {
      alert('Invalid or expired OTP');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      alert('Please verify OTP first');
      return;
    }
    try {
      await axios.post('http://localhost:5000/register', { username, password, email, phone, otp });
      alert('Registration successful');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className='register'>
      <h3>Let’s <br />Create a<br/>Account</h3>
      <form>
        <input placeholder='Username' type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input placeholder='Email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input placeholder='Phone' type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <input placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input placeholder='OTP' type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
      <button type="button" onClick={handleSendOtp} disabled={otpSent}>Get OTP</button>
      {otpSent && <span>OTP expires in {timeRemaining}</span>}
      <button type="button" onClick={handleVerifyOtp} disabled={otpVerified}>Verify OTP</button>

      <p>Already have an account? <a href='/login'>Sign-in</a></p>

      <button type="button" onClick={handleRegister} disabled={!otpVerified}>Register</button>

      </form>
    </div>
  );
};

export default Register;
