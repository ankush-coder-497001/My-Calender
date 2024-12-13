import React, { useState } from 'react';

const Signup = ({ onSignup, onShowLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[email]) {
      alert('Email already exists');
      return;
    }
    users[email] = { name, password };
    localStorage.setItem('users', JSON.stringify(users));
    onSignup({ email, name });
  };

  return (
    <div>
      <div className="auth-header">
        <h2>Sign Up</h2>
      </div>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <div className="auth-links">
        <a href="#" onClick={onShowLogin}>Already have an account? Login</a>
      </div>
    </div>
  );
};

export default Signup;

