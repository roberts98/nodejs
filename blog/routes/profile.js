const User = require("../models/user");
const express = require("express");
const router  = express.Router();
const middleware = require("../middleware");

router.get("/", middleware.isUser, function(req, res) {
    res.render("profile/edit");
});

router.post("/:id/edit", middleware.isUser, function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            
        }
    });
});

module.exports = router;