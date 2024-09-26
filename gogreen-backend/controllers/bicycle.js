// const Bicycle = require('../models/bicycle');

// const getBicyclesByLocation = async (req, res) => {
//     const { location } = req.query;
//     try {
//         const bicycles = await Bicycle.find({ location, isAvailable: true });
//         res.status(200).json(bicycles);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching bicycles", error });
//     }
// };

// module.exports = { getBicyclesByLocation, calculateCost };


const Bicycle = require('../models/bicycle');

// Simulate city mapping logic (you can use external APIs like Google Maps for real geocoding)
const getCityFromCoordinates = (lat, lon) => {
    if (lat > 19 && lat < 20 && lon > 72 && lon < 73) {
        return 'Mumbai';
    } else if (lat > 19.1 && lat < 19.3 && lon > 72.9 && lon < 73.1) {
        return 'Thane';
    }
    return 'Unknown City';
};

const getBicyclesByLocation = async (req, res) => {
    const { lat, lon } = req.query;
    const city = getCityFromCoordinates(lat, lon);
    console.log(`Detected city: ${city}`); // Debugging log

    if (city === 'Unknown City') {
        return res.status(404).json({ message: 'Bicycles not available in this city' });
    }

    try {
        const bicycles = await Bicycle.find({ location: city, isAvailable: true });
        console.log(`Bicycles for ${city}:`, bicycles); // Debugging log
        res.status(200).json(bicycles);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bicycles", error });
    }
};

const calculateCost = (req, res) => {
    const { distance, pricePerKm } = req.body;
    const estimatedCost = distance * pricePerKm;
    res.status(200).json({ estimatedCost });
};

module.exports = { getBicyclesByLocation, calculateCost };
