var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    title: String,
    image: String,
    price: Number,
    stock: Number,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});


var Product = mongoose.model("Product", productSchema);
module.exports = Product;