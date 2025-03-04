import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginDoctor = () => {
  const [email, setEmail] = useState(localStorage.getItem('doctorEmail') || '');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('doctorEmail')) {
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login-doctor', { email, password });

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);

      // Remember email if checked
      if (rememberMe) {
        localStorage.setItem('doctorEmail', email);
      } else {
        localStorage.removeItem('doctorEmail');
      }

      navigate('/doctor-dashboard');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Doctor Login</h1>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />

        <div style={{ position: 'relative' }}>
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)} 
            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <label>
          <input 
            type="checkbox" 
            checked={rememberMe} 
            onChange={(e) => setRememberMe(e.target.checked)} 
          /> 
          Remember Me
        </label>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p>Forgot your password? <a href="/reset-password">Reset here</a></p>
      <p>Don't have an account? <a href="/signup-doctor">Sign up as Doctor</a></p>
    </div>
  );
};

export default LoginDoctor;
