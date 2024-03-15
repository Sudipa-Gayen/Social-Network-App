const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  username: { type: String, required: true },
  bio: String,
  profilePictureUrl: String,
});

module.exports = mongoose.model('User', userSchema);
