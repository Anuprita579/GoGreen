const express = require('express');
const router = express.Router();
const { submitScore, getLeaderboard } = require('../controllers/leaderboard');

router.post('/submitScore', submitScore);
router.get('/getScore', getLeaderboard);

module.exports = router;
