const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { toggleLike , getLikeInfo } = require('../controllers/likeController');

router.post('/:postId/like', auth, toggleLike);
router.get("/:postId/like-info", auth, getLikeInfo);


module.exports = router;
