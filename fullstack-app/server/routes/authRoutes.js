const express = require('express');
const multer = require('multer');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Signup route for doctors
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

module.exports = router;
