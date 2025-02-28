import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPatient = () => {
  const [phone, setPhone] = useState(localStorage.getItem('patientPhone') || '');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('patientPhone')) {
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login-patient', { phone, password });

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);

      // Remember phone number if checked
      if (rememberMe) {
        localStorage.setItem('patientPhone', phone);
      } else {
        localStorage.removeItem('patientPhone');
      }

      navigate('/patient-dashboard');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Invalid phone number or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Patient Login</h1>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Phone Number" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
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
      <p>Don't have an account? <a href="/signup-patient">Sign up as Patient</a></p>
    </div>
  );
};

export default LoginPatient;
