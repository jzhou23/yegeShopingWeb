var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    title: String,
    image: String,
    price: Number,
    discounter: Number,
    stock: Number,
    description: String
});


var Product = mongoose.model("Product", productSchema);
module.exports = Product;