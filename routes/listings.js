const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapasync = require("../utils/wrapasync.js");
const expresserror = require("../utils/expresserror.js");
const { listingSchema } = require("../schema.js");
const { islogin, isOwner, validatelisting } = require("../middleware.js");
const listingcontroller = require("../controller/listings.js");
const multer = require('multer');
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });


router.route("/")
    .get(wrapasync(listingcontroller.index))//index route ==================================
    .post(islogin, upload.single("listing[image]"), validatelisting, wrapasync(listingcontroller.createNewListing));// create route ======================

//new route
router.get("/new", islogin, listingcontroller.renderNewForm);

router.route("/:id")
    .get(wrapasync(listingcontroller.showListing))// show route =====================
    .put(islogin, isOwner, upload.single("listing[image]"),validatelisting, wrapasync(listingcontroller.updateListings))//update route =============
    .delete(islogin, isOwner, wrapasync(listingcontroller.deleteListing));// delete the route ===============


// edit route =====================
router.get("/:id/edit", islogin, isOwner, wrapasync(listingcontroller.editRoute));




module.exports = router;