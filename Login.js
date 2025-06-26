import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin, onSwitch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });
      alert('✅ Logged in!');
      localStorage.setItem('token', res.data.token);
      onLogin(res.data.username);
    } catch (err) {
      console.error('Login error:', err);
      alert('❌ Login failed. Check your credentials.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required /><br /><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br /><br />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <button onClick={onSwitch}>Sign Up</button></p>
    </div>
  );
};

export default Login;
