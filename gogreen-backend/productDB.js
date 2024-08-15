require("dotenv").config();
const connectDB = require("./database/connect")
const Product = require("./models/product")
const ProductJSON = require("./products.json")

const start = async() => {
    try{
        await connectDB(process.env.MONGODB_URL);
        await Product.deleteMany();
        await Product.create(ProductJSON);
        console.log("Success");

    }
    catch(error){
        console.log(error);
    }

}

start();