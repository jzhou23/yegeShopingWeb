var express = require("express"),
    router = express.Router({mergeParams: true}),
    Comment = require("../models/comment"),
    Product = require("../models/product"),
    middlewareObj = require("../middleware/index");
    
// create a comment
router.post("/", middlewareObj.isLoggedIn, function(req, res){
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var comment = req.body.comment;
    comment.author = author;
    Comment.create(comment, function(err, createdComment){
        if (err) {
            res.redirect("/products/" + req.params.id);
        } else {
            Product.findById(req.params.id, function(err, foundedProduct){
                if (err) {
                    console.log(err);
                } else {
                    foundedProduct.comments.push(createdComment);
                    foundedProduct.save();
                }
            });
            res.redirect("/products/" + req.params.id);
        }
    });
});  
    
// get comment create form
router.get("/new",  middlewareObj.isLoggedIn, function(req, res){
    Product.findById(req.params.id, function(err, foundedProduct){
        if (err) {
            console.log(err);
        } else {
            // console.log(foundedProduct);
            res.render("comments/new", {product: foundedProduct});      
        }
    })
});

// update comment
router.put("/:comment_id",  middlewareObj.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/products/" + req.params.id);
        }
    });
});

// delete comment
router.delete("/:comment_id",  middlewareObj.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err) {
           res.redirect("back");
        } else {
           res.redirect("/products/" + req.params.id);
        }
    });
});

// get comment edit form
router.get("/:comment_id/edit",  middlewareObj.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundedComment){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/edit", {product_id: req.params.id, comment: foundedComment});     
        }
    });
});



module.exports = router;