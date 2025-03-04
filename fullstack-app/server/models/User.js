const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  uniqueId: { type: String, unique: true, sparse: true }, // Required only for doctors
  dob: { type: Date, required: true },
  admin: { type: String, default: null }, // Hospital name (only for doctors)
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  licenseImage: { type: String, default: null }, // Only for doctors
  role: { type: String, enum: ['doctor', 'patient', 'admin'], required: true }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
