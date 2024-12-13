import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Calendar from './pages/Home';
import './App.css'
const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setCurrentPage('calendar');
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentPage('calendar');
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleSignup = (user) => {
    setCurrentUser(user);
    setCurrentPage('calendar');
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
    localStorage.removeItem('currentUser');
  };

  return (
    <div className="container">
      {currentPage === 'login' && (
        <Login onLogin={handleLogin} onShowSignup={() => setCurrentPage('signup')} />
      )}
      {currentPage === 'signup' && (
        <Signup onSignup={handleSignup} onShowLogin={() => setCurrentPage('login')} />
      )}
      {currentPage === 'calendar' && currentUser && (
        <Calendar user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;

