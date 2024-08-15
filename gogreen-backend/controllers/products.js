const Product = require("../models/product")
const getAllProducts = async(req, res) => {
    const { category, name, sort, select } = req.query;
    const queryObject = {};
    if (category){
        queryObject.category = category;
    }
    if (name){
        queryObject.name = {$regex: name, $options: "i"};
    }
    let apiData = Product.find(queryObject);
    if (sort){
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix);
    }
    if(select){
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    const myData = await apiData;
    res.status(200).json({myData});
}

const getAllProductsTesting = async(req, res) => {
    const myData = await Product.find(req.query).sort("name");
    console.log(req.query);
    res.status(200).json({myData});
}


module.exports = {getAllProducts, getAllProductsTesting}