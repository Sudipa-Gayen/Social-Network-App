const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const postController = require('../controllers/postController');

router.post('/', authenticateToken, postController.createPost);
router.get('/:postId', postController.getPostDetails);
router.put('/:postId', authenticateToken, postController.updatePost);
router.delete('/:postId', authenticateToken, postController.deletePost);

module.exports = router;
