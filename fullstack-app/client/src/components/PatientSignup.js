import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPatient = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;  // Adjust the regex for the phone format you expect
    return phoneRegex.test(phone);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validatePhone(phone)) {
      setError('Invalid phone number format.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/auth/signup-patient', { 
        name, 
        phone, 
        password, 
        dob, 
        bloodGroup, 
        gender, 
        role: 'patient' 
      });
      navigate('/login-patient');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Signup failed');
    }
  };

  return (
    <div>
      <h1>Signup as Patient</h1>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} required />
        <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required>
          <option value="">Blood Group</option>
          <option value="A+">A+</option>
          <option value="B+">B+</option>
          <option value="O+">O+</option>
          <option value="AB+">AB+</option>
          <option value="A-">A-</option>
          <option value="B-">B-</option>
          <option value="O-">O-</option>
          <option value="AB-">AB-</option>
        </select>
        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? <a href="/login-patient">Login</a></p>
    </div>
  );
};

export default SignupPatient;
