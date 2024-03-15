const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const followController = require('../controllers/followController');

router.post('/:userId', authenticateToken, followController.followUser);
router.delete('/:userId', authenticateToken, followController.unfollowUser);
router.get('/followers/:userId', followController.getFollowers);
router.get('/following/:userId', followController.getFollowing);

module.exports = router;
