const BookingHistory = require("../models/BookingHistory.js");

const createError = require('../utils/error.js');

const createBookHistory = async (req, res, next) => {
    const newHistory = new BookingHistory(req.body);
    try {
        const savedHistory = await newHistory.save();
        res.status(200).json(savedHistory);
    } catch (err) {
        next(err);
    }
};

const deleteBookHistory = async (req, res, next) => {
    try {
        const history = await BookingHistory.findByIdAndDelete(req.params.id);
        res.status(200).json("Booking History Has Been Deleted");
    } catch (err) {
        next(err);
    }
};

const getBookHistory = async (req, res, next) => {
    try {
        const history = await BookingHistory.find();
        res.status(200).json(history)
    } catch (err) {
        next(err)
    }
};




module.exports = {
    createBookHistory,
    deleteBookHistory,
    getBookHistory,
};