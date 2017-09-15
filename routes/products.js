var express = require("express"),
    router  = express.Router(),
    Product  = require("../models/product"),
    middlewareObj = require("../middleware/index");
    
router.get("/", function(req, res){
    Product.find({}, function(err, foundedProducts){
       if (err) {
           console.log(err);
       } else {
            res.render("products/index", {products: foundedProducts});     
       }
    });
});

router.post("/", middlewareObj.isLoggedIn, function(req, res){
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var product = req.body.product;
    product.author = author;
    
    Product.create(product, function(err, createdProduct){
        if (err) {
            console.log(err);
        } else {
            console.log(createdProduct);
            res.redirect("/products");
        }
    });
});

router.get("/new", middlewareObj.isLoggedIn, function(req, res){
    res.render("products/new");
});

router.get("/:id", function(req, res){
    Product.findById(req.params.id).populate("comments").exec(function(err, foundedProduct){
        if (err) {
            console.log(err);
        } else {
            console.log(foundedProduct);
            res.render("products/show", {product: foundedProduct});
        }
    });
});

router.put("/:id", middlewareObj.checkProductOwnership, function(req, res){
    Product.findByIdAndUpdate(req.params.id, req.body.product, function(err, updatedProduct){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/products/" + req.params.id);
        }
    });
});

router.delete("/:id", middlewareObj.checkProductOwnership, function(req, res){
    Product.findByIdAndRemove(req.params.id, function(err){
       if (err) {
           res.redirect("/products");
       } else {
           res.redirect("/products");
       }
    });
});

router.get("/:id/edit", middlewareObj.checkProductOwnership, function(req, res){
    Product.findById(req.params.id, function(err, foundedProducts){
        if (err) {
            console.log("err");
        } else {
            res.render("products/edit", {product: foundedProducts});
        }
    });
});
    
module.exports = router;