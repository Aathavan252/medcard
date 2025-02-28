import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleDoctorLogin = () => {
    navigate('/login-doctor');
  };

  const handlePatientLogin = () => {
    navigate('/login-patient');
  };

  return (
    <div>
      <div>
        <h2>For Doctors</h2>
        <p>We are the market-leading technical interview platform to identify and hire developers with the right skills.</p>
        <button onClick={handleDoctorLogin}>Login</button>
        <p>Don't have an account? <a href="/signup-doctor">Sign up as Doctor</a>.</p>
      </div>
      <div>
        <h2>For Patients</h2>
        <p>Join over 21 million patients, book appointments, access medical records, and consult doctors online.</p>
        <button onClick={handlePatientLogin}>Login</button>
        <p>Don't have an account? <a href="/signup-patient">Sign up as Patient</a>.</p>
      </div>
    </div>
  );
};

export default LoginPage;
