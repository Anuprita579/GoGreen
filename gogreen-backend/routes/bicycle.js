const express = require('express');
const { getBicyclesByLocation, calculateCost } = require('../controllers/bicycle');

const router = express.Router();

router.get('/availability', getBicyclesByLocation);
router.post('/calculate-cost', calculateCost);

module.exports = router;
