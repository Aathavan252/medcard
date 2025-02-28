const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  uniqueId: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  admin: { type: String, required: true }, // Hospital name
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  licenseImage: { type: String, default: null },
  role: { type: String, enum: ['doctor', 'admin'], required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
