const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const userController = require('../controllers/userController');


router.get('/:userId', authenticateToken, userController.getUserProfile);
router.put('/:userId', authenticateToken, userController.updateUserProfile);
router.delete('/:userId', authenticateToken, userController.deleteUserProfile);

module.exports = router;
