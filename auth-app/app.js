//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose")
const encrypt = require("mongoose-encryption")
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    //js obj - num of properties
    secret: "A special little secret!",
    resave: false,
    saveUninitialized: false
})); //use session - then use passport package & use passport to deal with session

app.use(passport.initialize());
app.use(passport.session());

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/userDB"); 

const userSchema = new mongoose.Schema ({
    username: String,
    password: String
}); //obj - created from mongoose schema class

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res){
    res.render("home");
})
app.get("/login", function(req, res){
    res.render("login");
})

app.get("/register", function(req, res){
    res.render("register");
});

app.get("/secrets", function(req, res){
    if(req.isAuthenticated()){
        res.render("secrets");
    }
    else {
        res.render("login");
    }
});

app.post("/register", function(req, res){
    User.register({username: req.body.username}, req.body.password, function(err, newUser){
        if(err){
            console.log(err);
            res.redirect("/register");
        }
        else {
            passport.authenticate("local")(req,res, function(){
                res.redirect("/secrets");
            })
        }

})});


app.post("/login", function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({email: username}, function(err, foundUser){
        if(err){
            console.log(err);
        }
        else {
            if(foundUser.password === password) {
                res.render("secrets");
            }
        }
    })
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});