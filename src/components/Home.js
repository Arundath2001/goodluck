import React, { useEffect, useState } from 'react';
import { useNavigate, Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import GiveawayForm from './CreateGiveaway';
import GiveawayPreview from './GiveawayPreview';
import Participate from './Participate';
import ParticipateForm from './ParticipateForm';
import SelectWinner from './SelectWinner';
import WinnerSelection from './WinnerSelection';
import ParticipatePreview from './ParticipatePreview';
import MyParticipationDetails from './MyParticipationDetails';
import MyGiveaways from './MyGiveaways';
import './Home.css';
import create from '../assets/create.jpg';
import participate from '../assets/participate.jpg';
import select from '../assets/select.jpg';

const Home = () => {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://pumped-platinum-digit.glitch.me/user-details', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (err) {
        console.error('Error fetching user details:', err);
      }
    };

    const fetchMessage = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://pumped-platinum-digit.glitch.me/home', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(response.data.message);
      } catch (err) {
        setMessage('Error fetching message');
      }
    };

    fetchUserDetails();
    fetchMessage();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const linkStyle1 = {
    backgroundImage: `url(${create})`,
  }
  const linkStyle2 = {
    backgroundImage: `url(${participate})`,
  }
  const linkStyle3 = {
    backgroundImage: `url(${select})`,
  }
  
  return (
    <div className='home'>
      <h3>Welcome to <br /> GoodLuck...!</h3>

      <p>Our giveaway app not only sparks excitement but ensures fairness as it selects the lucky winner, turning aspirations into reality with a simple click.</p>

      {/* <a onClick={handleLogout}>Logout</a> */}

      <Link to="/create-giveaway">
        <div style={linkStyle1} className='link'>
          <div className='link_top'>
            Create Giveaway
          </div>

          <div className='link_down'>
            <h5>2000+</h5>

            <p className='link_para'>Created Giveaways</p>
          </div>
        </div>
      </Link>

      <Link to="/participate">
      <div style={linkStyle2} className='link'>
          <div className='link_top'>
          Participate in Giveaway
          </div>

          <div className='link_down'>
            <h5>1.2L+</h5>

            <p className='link_para'>People Participated</p>
          </div>
        </div>
      </Link>

      <Link to="/select-winner">
      <div style={linkStyle3} className='link'>
          <div className='link_top'>
          Select Winner
          </div>

          <div className='link_down'>
            <h5>600+</h5>

            <p className='link_para'>Winners get selectd</p>
          </div>
        </div>
      </Link>

      {/* <Routes>
        <Route path="/create-giveaway" element={<GiveawayForm />} />
        <Route path="/giveaway-preview/:roomId" element={<GiveawayPreview />} />
        <Route path="/participate" element={<Participate />} />
        <Route
          path="/participate-form/:roomId"
          element={<ParticipateForm />}
        />
        <Route path="/select-winner" element={<SelectWinner />} />
        <Route path="/select-winner/:roomId" element={<WinnerSelection />} />
        <Route path="/participation-preview/user/:userId/:roomId" component={ParticipatePreview} />
        <Route path="/my-giveaways" element={<MyGiveaways />} />
        <Route path="/my-participation" element={<MyParticipationDetails />} />
        </Routes> */}
    </div>
  );
};

export default Home;
