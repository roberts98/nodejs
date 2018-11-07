module.exports = {
    isUser: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect("/login");
        }
    },
    isAdmin: function(req, res, next) {
        if (req.user.isSuperUser === 1) {
            return next();
        } else {
            res.redirect("/");
        }
    }
};