var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    created: {type: Date, default: Date.now()},
    isSuperUser: {type: Number, default: 0},
    isBanned: {type: Number, default: 0},
    email: {type: String, default: ''}, 
    about: {type: String, default: ''},
    age: {type: Number, default: 0},
    country: {type: String, default: ''},
    gender: {type: String, default: ''}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);