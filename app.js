var express = require("express"),
    app     = express(),
    borderParser = require("body-parser");

var seed = require("./seeds"),
    defaultData = seed();
    
var productRoutes = require("./routes/products");

app.set("view engine", "ejs");
app.use(borderParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.use("/products", productRoutes);

app.get("/", function(req, res){
    res.render("index");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Server starting!");
});

