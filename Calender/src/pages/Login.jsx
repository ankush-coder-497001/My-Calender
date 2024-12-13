import React, { useState } from 'react';
import '../App.css'
const Login = ({ onLogin, onShowSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[email] && users[email].password === password) {
      onLogin({ email, name: users[email].name });
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div>
      <div className="auth-header">
        <h2>Login</h2>
      </div>
      <form onSubmit={handleSubmit} className="auth-form">
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
        <button type="submit">Login</button>
      </form>
      <div className="auth-links">
        <a href="#" onClick={onShowSignup}>Don't have an account? Sign up</a>
      </div>
    </div>
  );
};

export default Login;

