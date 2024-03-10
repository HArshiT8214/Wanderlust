const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapasync = require("../utils/wrapasync.js");
const expresserror = require("../utils/expresserror.js");
const { reviewsSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Reviews = require("../models/reviews.js");
const { islogin,validateReview} = require("../middleware.js");


const reviewController =require("../controller/reviews.js");
const review=require("../models/reviews.js");

//reviews route ========================

router.post("/",islogin ,validateReview, wrapasync(reviewController.createReview));

//delete review route =====================================

router.delete("/:reviewID", wrapasync(reviewController.deleteReview));



module.exports = router;