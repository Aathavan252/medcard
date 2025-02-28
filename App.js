import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import PatientPage from './components/PatientPage';
import DoctorPage from './components/DoctorPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/patient" component={PatientPage} />
        <Route path="/doctor" component={DoctorPage} />
        <Route path="/" exact component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default App;
