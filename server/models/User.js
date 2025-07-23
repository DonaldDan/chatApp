const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  socketId: { type: String, required: true, unique: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = { User }; // ✅ This matches your current import
