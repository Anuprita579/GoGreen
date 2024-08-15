require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 5000
const connectDB  = require("../database/connect")
const products_routes = require("../routes/products") 

const app = express();

app.get("/", (req, res) => {
    res.send("Hi, I am live")
})

app.use("/api/products", products_routes);

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