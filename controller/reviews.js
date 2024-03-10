const Listing = require("../models/listing.js");
const Reviews = require("../models/reviews.js");


module.exports.createReview = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Reviews(req.body.review);
    newReview.author = req.user._id;
    // console.log("newReview", newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    console.log("new review save");
    req.flash("success", "New Review Created")
    res.redirect(`/listings/${id}`);
}


module.exports.deleteReview = async (req, res) => {
    let { id, reviewID } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewID } })
    await Reviews.findByIdAndDelete(reviewID);
    req.flash("success", " Review Deleted !");

    res.redirect(`/listings/${id}`);
}