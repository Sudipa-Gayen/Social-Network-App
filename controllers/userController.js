const User = require('../models/user');

const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      userId: user._id,
      username: user.username,
      bio: user.bio,
      profilePictureUrl: user.profilePictureUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { bio, profilePictureUrl } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.bio = bio;
    user.profilePictureUrl = profilePictureUrl;
    await user.save();

    res.json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);

    res.json({ message: 'User profile deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getUserProfile, updateUserProfile, deleteUserProfile };
