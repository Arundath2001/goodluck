import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className='login'>
      <h3>Let's <br /> Sign In </h3>
      <form onSubmit={handleLogin}>

        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
        
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />

      <p>Don't have an account? <a href='/register'>Create</a></p>

      <Link to="/forgot-password">Forgot password?</Link>

      <button type="submit">Submit</button>

      </form>
    </div>
  );
};

export default Login;
