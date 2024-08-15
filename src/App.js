import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import GiveawayForm from './components/CreateGiveaway';
import GiveawayPreview from './components/GiveawayPreview';
import Participate from './components/Participate';
import ParticipateForm from './components/ParticipateForm';
import GiveawayDetailsPage from './components/GiveawayDetailsPage';
import ParticipatePreview from './components/ParticipatePreview';
import SelectWinner from './components/SelectWinner';
import WinnerSelection from './components/WinnerSelection';
import GiveawayCredentialsPage from './components/GiveawayCredentialsPage';
import MyGiveaways from './components/MyGiveaways';
import MyParticipationDetails from './components/MyParticipationDetails';
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePassword';
import "./App.css";

const Navigation = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  if (isLoginPage || isRegisterPage) {
    return null; // Don't render navigation links on login and register pages
  }

  return (
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/my-participation">My Participation Details</Link>
      <Link to="/my-giveaways">My Giveaway Details</Link>
      <Link to="/change-password">Change Password</Link>

    </nav>
  );
};

const App = () => {
  const PrivateRoute = ({ element: Element }) => {
    const token = localStorage.getItem('token');
    return token ? <Element /> : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className='App'>
           <Navigation />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<PrivateRoute element={Home} />} />
        <Route path="/participate" element={<Participate />} />
        <Route path="/create-giveaway" element={<PrivateRoute element={GiveawayForm} />} />
        <Route path="/giveaway-preview/:roomId" element={<PrivateRoute element={GiveawayPreview} />} />
        <Route path="/participate-form/:roomId" element={<PrivateRoute element={ParticipateForm} />} />
        <Route path="/giveaway-details/:roomId" element={<GiveawayDetailsPage />} />
        <Route path="/participation-preview/user/:userId/:roomId" element={<PrivateRoute element={ParticipatePreview} />} />
        <Route path="/select-winner" element={<SelectWinner />} />
        <Route path="/select-winner/:roomId" element={<WinnerSelection />} />
        <Route path="/giveaway-credentials/:roomId" element={<PrivateRoute element={GiveawayCredentialsPage} />} />

        <Route path="/my-participation" element={<MyParticipationDetails />} />
        <Route path="/my-giveaways" element={<MyGiveaways />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<PrivateRoute element={ChangePassword} />} />
        
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;
