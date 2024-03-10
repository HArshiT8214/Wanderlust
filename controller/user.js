const User = require("../models/user");

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newuser = new User({ email, username });
        const registereduser = await User.register(newuser, password);
        console.log(registereduser);
        req.login(registereduser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to WanderLust");
            res.redirect("/listings");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderSignupform = (req, res) => {
    res.render("user/signup.ejs");
};
module.exports.renderLoginform = (req, res) => {
    res.render("user/login.ejs");
};
module.exports.login = async (req, res) => {
    req.flash("success", "Wlecome back to WanderLust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};
module.exports.logout =(req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are loged out!");
        res.redirect("/listings");
    });
};