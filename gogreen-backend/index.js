require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000
const connectDB  = require("./database/connect")
const products_routes = require("./routes/products") 
const user_routes = require('./routes/users')
const leaderboard_routes = require('./routes/leaderboard');
const bicycle_routes = require('./routes/bicycle');

const app = express();

app.use(cors({
    // origin: 'http://localhost:3001', // Allow only your frontend
    origin: ['https://go-green-frontend.vercel.app', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    credentials: true                // Enable to allow cookies and credentials
}));

app.use((req, res, next) => {
    console.log('Request Origin:', req.headers.origin);
    console.log('Request Method:', req.method);
    console.log('Request Headers:', req.headers);
    next();
});


app.use(express.json()); // To parse JSON bodies

app.get("/", (req, res) => {
    res.send("Hi, I am live")
})

app.use("/api/products", products_routes);
app.use('/api/user', user_routes);
app.use('/api/leaderboard', leaderboard_routes);
app.use('/api/bicycle', bicycle_routes);

const start = async() => {
    try{
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, ()=>{
            console.log(`${PORT} yes i am connected`);
        })
    }
    catch(error){
        console.log(error);
    }
}
start();