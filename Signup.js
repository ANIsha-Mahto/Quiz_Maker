import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ onSwitch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
      });
      alert('✅ Signup successful! You can now log in.');
      onSwitch(); // Go to login screen
    } catch (err) {
      console.error('Signup error:', err);
      alert('❌ Signup failed. Try a different username.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required /><br /><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br /><br />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <button onClick={onSwitch}>Login</button></p>
    </div>
  );
};

export default Signup;
