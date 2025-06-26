const express = require('express');
const router = express.Router();
const { createPost, getAllPosts } = require('../controllers/postController');
const auth = require('../middleware/authMiddleware');


router.post('/', auth, createPost);
router.get('/', getAllPosts);

module.exports = router;
