const Reviews = require("../models/Reviews.js");

const createError = require('../utils/error.js');

const createReviews = async (req, res, next) => {
    const newReviews = new Reviews(req.body);
    try {
        const savedReviews = await newReviews.save();
        res.status(200).json(savedReviews);
    } catch (err) {
        next(err);
    }
};

const deleteReviews = async (req, res, next) => {
    try {
        const reviews = await Reviews.findByIdAndDelete(req.params.id);
        res.status(200).json("Review Has Been Deleted");
    } catch (err) {
        next(err);
    }
};

const getReviews = async (req, res, next) => {
    try {
        const reviews = await Reviews.find();
        res.status(200).json(reviews)
    } catch (err) {
        next(err)
    }
};


module.exports = {
    createReviews,
    deleteReviews,
    getReviews,
};