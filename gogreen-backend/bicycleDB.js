require("dotenv").config();
const connectDB = require("./database/connect");
const Bicycle = require("./models/bicycle");
const bicycleData = require("./bicycle.json");

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        await Bicycle.deleteMany(); // Remove existing data to avoid duplicates
        await Bicycle.create(bicycleData); // Add data from bicycle.json
        console.log("Database seeded successfully with bicycle data.");
    } catch (error) {
        console.log("Error seeding the database:", error);
    }
    process.exit(); // Exit the process after seeding is done
};

start();
