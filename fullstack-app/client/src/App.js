import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import DoctorSignup from "./components/DoctorSignup";
import PatientSignup from "./components/PatientSignup";
import DoctorLogin from "./components/DoctorLogin";
import PatientLogin from "./components/PatientLogin";
import DoctorPage from "./components/DoctorPage";



function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect "/" to LoginPage by default  www.website.com/lohin */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login-doctor" element={<DoctorLogin />} />
        <Route path="/login-patient" element={<PatientLogin />} />
        <Route path="/doctor" element={<DoctorPage />} />
        <Route path="/signup-doctor" element={<DoctorSignup />} />
        <Route path="/signup-patient" element={<PatientSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
