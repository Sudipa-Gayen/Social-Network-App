const Follow = require('../models/follow');
const User = require('../models/user');

const followUser = async (req, res) => {
  try {
    const followerUserId = req.user.userId; 
    const followingUserId = req.params.userId;
    const existingFollow = await Follow.findOne({ followerUserId, followingUserId });
    if (existingFollow) {
      return res.status(400).json({ error: 'You are already following this user' });
    }
    const newFollow = new Follow({ followerUserId, followingUserId });
    await newFollow.save();

    res.status(201).json({ message: 'User followed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const followerUserId = req.user.userId; 
    const followingUserId = req.params.userId;
    const existingFollow = await Follow.findOne({ followerUserId, followingUserId });
    if (!existingFollow) {
      return res.status(400).json({ error: 'You are not following this user' });
    }
    await Follow.findByIdAndDelete(existingFollow._id);

    res.json({ message: 'User unfollowed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getFollowers = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find followers
    const followers = await Follow.find({ followingUserId: userId });
    const followerIds = followers.map((follow) => follow.followerUserId);
    const followerProfiles = await User.find({ _id: { $in: followerIds } });

    res.json({
      followers: followerProfiles.map((user) => ({
        userId: user._id,
        username: user.username,
        bio: user.bio,
        profilePictureUrl: user.profilePictureUrl,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getFollowing = async (req, res) => {
  try {
    const userId = req.params.userId;

    const following = await Follow.find({ followerUserId: userId });
    const followingIds = following.map((follow) => follow.followingUserId);
    const followingProfiles = await User.find({ _id: { $in: followingIds } });

    res.json({
      following: followingProfiles.map((user) => ({
        userId: user._id,
        username: user.username,
        bio: user.bio,
        profilePictureUrl: user.profilePictureUrl,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { followUser, unfollowUser, getFollowers, getFollowing };
