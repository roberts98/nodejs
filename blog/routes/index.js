const express = require("express");
const router  = express.Router();
const middleware = require("../middleware");
var passport = require("passport");
const User = require("../models/user");

router.get("/", function(req, res) {
    res.redirect("/post");
});



router.get("/register", function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/post");
    } else {
        res.render("register");
    }
});

router.post("/register", function(req, res) {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/post");
            });
        }
    });
});

router.get("/login", function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/post");
    } else {
        res.render("login");    
    }
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/post",
    failureRedirect: "/login"
}));

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/post");
});

module.exports = router;