const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    name: String,
    content: String,
    comments: [
            {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Comment"
        }
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    created: {type: Date, default: Date.now},
    image: String
});

module.exports = mongoose.model("Post", postSchema);