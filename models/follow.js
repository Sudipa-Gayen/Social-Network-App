const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
  followerUserId: { type: String, required: true },
  followingUserId: { type: String, required: true },
});

module.exports = mongoose.model('Follow', followSchema);
