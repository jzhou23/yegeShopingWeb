var express = require("express"),
    router  = express.Router();
    
router.get("/", function(req, res){
    res.render("products/index");
});

router.post("/", function(req, res){
    console.log(req.body.product);
    res.redirect("/products");
});

router.get("/new", function(req, res){
    res.render("products/new");
});
    
module.exports = router;