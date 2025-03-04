const express = require('express');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const SECRET_KEY = 'yourSecretKey'; // Change this to an environment variable

// Multer Storage Setup for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// **Doctor Signup Route**
router.post('/signup-doctor', upload.single('licenseImage'), async (req, res) => {
  try {
    const { firstName, lastName, uniqueId, dob, admin, email, phone, password, termsAccepted } = req.body;

    if (String(termsAccepted) !== "true") {
      return res.status(400).json({ message: "You must accept the terms and conditions." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: `${firstName} ${lastName}`,
      uniqueId,
      dob,
      admin,
      email,
      phone,
      password: hashedPassword,
      licenseImage: req.file ? req.file.path : null,
      role: 'doctor'
    });

    await newUser.save();
    res.status(201).json({ message: "Doctor registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
});

// **Doctor Login Route**
router.post('/login-doctor', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find doctor by email
    const user = await User.findOne({ email, role: 'doctor' });
    if (!user) {
      return res.status(400).json({ message: "Doctor not found" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: 'doctor' }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// **Patient Signup Route**
router.post('/signup-patient', async (req, res) => {
  try {
    const { name, phone, password, dob, bloodGroup, gender } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      phone,
      dob,
      password: hashedPassword,
      email: `${phone}@healthcare.com`, // Auto-generate an email
      role: 'patient'
    });

    await newUser.save();
    res.status(201).json({ message: "Patient registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
});

// **Patient Login Route**
router.post('/login-patient', async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Find patient by phone
    const user = await User.findOne({ phone, role: 'patient' });
    if (!user) {
      return res.status(400).json({ message: "Patient not found" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: 'patient' }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

module.exports = router;
