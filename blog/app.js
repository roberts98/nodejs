const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport  = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/user.js");
const middleware = require("./middleware");
const postsRoute = require("./routes/posts");
const adminRoute = require("./routes/admin");
const indexRoute = require("./routes/index");
const profileRoute = require("./routes/profile");
const session = require("express-session");
const methodOverride = require("method-override");

mongoose.connect("mongodb://localhost/blog", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));

app.use(require("express-session")({
    secret: "Nodejs is so powerful tool",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/post", postsRoute);
app.use("/admin", adminRoute);
app.use("/profile", profileRoute);
app.use("/", indexRoute);

app.listen(process.env.PORT, process.env.ID);