var Product = require("../models/product"),
    Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to login first");
    res.redirect("/login");
}

middlewareObj.checkProductOwnership = function(req, res, next){
    if (req.isAuthenticated()) {
        Product.findById(req.params.id, function(err, foundedProduct){
            if (err) {
                res.redirect("back");
            } else {
                if (foundedProduct.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have the permission");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to login first");
        res.redirect("/login");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if (req.isAuthenticated()) {
        Product.findById(req.params.id, function(err, foundedComment){
            if (err) {
                res.redirect("back");
            } else {
                if (foundedComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have the permission");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to login first");
        res.redirect("/login");
    }
}

module.exports = middlewareObj;