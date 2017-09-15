var express = require("express"),
    app     = express(),
    borderParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    flash = require("connect-flash"),
    Product = require("./models/product"),
    Comment = require("./models/comment"),
    User    = require("./models/user");

// var seed = require("./seeds"),
//     defaultData = seed();
    
var productRoutes = require("./routes/products"),
    commentRoutes = require("./routes/comments"),
    indexRoutes  = require("./routes/index");

mongoose.connect("mongodb://localhost/shopping", {useMongoClient: true});
app.set("view engine", "ejs");
app.use(borderParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// passport configuration
app.use(require("express-session")({
    secret: "yege daigou",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use("/", indexRoutes);
app.use("/products", productRoutes);
app.use("/products/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Server starting!");
});

