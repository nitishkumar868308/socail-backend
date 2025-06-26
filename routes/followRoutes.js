const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { toggleFollow , getMyFollowersFollowing } = require('../controllers/followController');

router.post('/:userId/follow', auth, toggleFollow);
router.get('/followers-following', auth, getMyFollowersFollowing);

module.exports = router;
