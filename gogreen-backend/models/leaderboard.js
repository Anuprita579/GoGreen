const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    username: String,
    carbonFootprint: Number,
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
