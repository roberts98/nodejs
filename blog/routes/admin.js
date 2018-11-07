const express = require("express");
const router  = express.Router();
const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
const middleware = require("../middleware");

router.get("/", middleware.isUser, middleware.isAdmin, function(req, res) {
    res.redirect("/admin/users");
});

router.get("/users", middleware.isUser, middleware.isAdmin, function(req, res) {
    User.find({}, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            res.render("admin/users", { user: user });
        }
    });
});

router.delete("/users/:id/remove", middleware.isUser, middleware.isAdmin, function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            if (user.isSuperUser) {
                res.redirect("/admin");
            } else {
                user.remove();
                res.redirect("/admin");
            }
        }
    });
});

router.get("/posts", middleware.isUser, middleware.isAdmin, function(req, res) {
    Post.find({}, function(err, post) {
        if (err) {
            console.log(err);
        } else {
            res.render ("admin/posts", {post: post});
        }
    });
});

router.delete("/posts/:id/remove", middleware.isUser, middleware.isAdmin, function(req, res) {
    Post.findById(req.params.id, function(err, post) {
        if (err) {
            console.log(err);
        } else {
            post.remove();
            res.redirect("/admin/posts");
        }
    });
});

router.get("/comments", middleware.isUser, middleware.isAdmin, function(req, res) {
    Comment.find({}, function(err, comment) {
        if (err) {
            console.log(err);
        } else {
            res.render("admin/comments", {comment: comment});
        }
    });
});

router.delete("/comments/:id/remove", middleware.isUser, middleware.isAdmin, function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) {
            console.log(err);
        } else {
            comment.remove();
            res.redirect("/admin/comments");
        }
    });
});

module.exports = router;