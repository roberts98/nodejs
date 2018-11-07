const express = require("express");
const router  = express.Router();
const Post = require("../models/post");
const Comment = require("../models/comment");
const middleware = require("../middleware");

router.post("/", middleware.isUser,  function(req, res) {
    let newPost = {
            name: req.body.name,
            content: req.body.content,
            author: {
                id: req.user._id,
                username: req.user.username
            },
            image: req.body.image
        };
    Post.create(newPost, function(err, newPost) {
        if (err) {
            console.log(err);
            } else {
                newPost.save();
                res.redirect("/post");
            }
        });
});

router.get("/", function(req, res) {
    
    Post.find({}, function(err, post) {
        if (err) {
            console.log(err);
        } else {
            Comment.find({}, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("posts/post", {post: post, comment: comment});
                }
            }).sort({created: -1});
        }
    }).sort({created: -1});
});

router.get("/new", middleware.isUser, function(req, res) {
    res.render("posts/new");
});

router.get("/:id", function(req, res) {
    Post.findById(req.params.id).populate("comments").exec(function(err, post){
        if (err) {
            console.log(err);
        } else {
            res.render("posts/show", {post: post});
        }
    });
});

router.post("/:id", middleware.isUser,  function(req, res) {
    Post.findById(req.params.id, function(err, post) {
        if (err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                    res.redirect("/post");
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    post.comments.push(comment);
                    post.save();
                    res.redirect("/post/" + post._id);
                }
            });
        }
    });
});

router.get("/:id/edit", function(req, res) {
    Post.findById(req.params.id, function(err, post) {
        if (err) {
            console.log(err);
        } else {
            if (req.user && post.author.id.equals(req.user._id) || req.user.isSuperUser) {
                res.render("posts/edit", {post: post});
            } else {
                res.redirect("back");
            }
        }
    });
});

router.put("/:id", function(req, res) {
    Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, post) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/post/" + req.params.id);
        }
    });
});

router.delete("/:id", function(req, res) {
    Post.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/post");
        } else {
            res.redirect("/post");
        }
    });
});

module.exports = router;