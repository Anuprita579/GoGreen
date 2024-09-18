const Leaderboard = require('../models/leaderboard');

const submitScore = async (req, res) => {
    try {
        const { username, carbonFootprint } = req.body;
        
        if (!username || !carbonFootprint) {
            return res.status(400).json({ message: "Username and carbon footprint are required." });
        }

        const existingEntry = await Leaderboard.findOne({ username });
        if (existingEntry) {
            // Update existing entry
            existingEntry.carbonFootprint = carbonFootprint;
            await existingEntry.save();
        } else {
            // Create new entry
            const newEntry = new Leaderboard({ username, carbonFootprint });
            await newEntry.save();
        }

        res.status(200).json({ message: "Score submitted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while submitting score." });
    }
};

const getLeaderboard = async (req, res) => {
    try {
        const leaderboardEntries = await Leaderboard.find().sort({ carbonFootprint: 1 }).limit(10);
        res.status(200).json(leaderboardEntries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while fetching leaderboard." });
    }
};

module.exports = {submitScore, getLeaderboard}


