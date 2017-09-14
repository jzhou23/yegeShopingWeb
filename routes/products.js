var express = require("express"),
    router  = express.Router(),
    Product  = require("../models/product");
    
router.get("/", function(req, res){
    Product.find({}, function(err, foundedProducts){
       if (err) {
           console.log(err);
       } else {
            res.render("products/index", {products: foundedProducts});     
       }
    });
});

router.post("/", function(req, res){
    Product.create(req.body.product, function(err, createdProduct){
        if (err) {
            console.log(err);
        } else {
            console.log(createdProduct);
        }
    });
    res.redirect("/products");
});

router.get("/new", function(req, res){
    res.render("products/new");
});

router.get("/:id", function(req, res){
    Product.findById(req.params.id, function(err, foundedProducts){
        if (err) {
            console.log(err);
        } else {
            res.render("products/show", {product: foundedProducts});
        }
    });
});

router.put("/:id", function(req, res){
   Product.findByIdAndUpdate(req.params.id, req.body.product, function(err, updatedProduct){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/products/" + req.params.id);
        }
   });
});

router.delete("/:id", function(req, res){
    Product.findByIdAndRemove(req.params.id, function(err){
       if (err) {
           res.redirect("/products");
       } else {
           res.redirect("/products");
       }
    });
});

router.get("/:id/edit", function(req, res){
    Product.findById(req.params.id, function(err, foundedProducts){
        if (err) {
            console.log("err");
        } else {
            res.render("products/edit", {product: foundedProducts});
        }
    });
});
    
module.exports = router;