const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapasync = require("../utils/wrapasync");
const { cache } = require("joi");
const passport = require("passport");
const { saveredirectURl } = require("../middleware.js");

const userConroller = require("../controller/user");

router.route("/signup")
    .get(userConroller.renderSignupform)
    .post(wrapasync(userConroller.signup));
router.route("/login")
    .get(userConroller.renderLoginform)
    .post(saveredirectURl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), userConroller.login);

router.get("/logout", userConroller.logout);

module.exports = router;