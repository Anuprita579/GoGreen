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

// app.use(cors({
//     origin: ['https://go-green-frontend.vercel.app', 'http://localhost:3001'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
//     credentials: true 
// }));

app.use((req, res, next) => {
    const allowedOrigins = ['https://go-green-frontend.vercel.app', 'https://gogreen-app.vercel.app/', 'http://localhost:3001'];
    const origin = req.headers.origin;
    
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
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