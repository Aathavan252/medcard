import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupDoctor = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    uniqueId: '',
    dob: '',
    admin: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    licenseImage: null,
    termsAccepted: false
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!formData.termsAccepted) {
      setError("You must accept the terms and conditions.");
      return;
    }

    const signupData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      signupData.append(key, value);
    });

    try {
      await axios.post('http://localhost:8080/api/auth/signup-doctor', signupData);
      navigate('/login-doctor');
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div>
      <h1>Doctor Signup</h1>
      <form onSubmit={handleSignup}>
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input type="text" name="uniqueId" placeholder="Unique ID" value={formData.uniqueId} onChange={handleChange} required />
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        <input type="text" name="admin" placeholder="Hospital Name" value={formData.admin} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <input type="file" name="licenseImage" accept="image/*" onChange={handleChange} required />
        <label>
          <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} /> I accept the terms and conditions
        </label>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupDoctor;
