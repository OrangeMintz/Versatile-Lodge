const Booking = require("../models/Booking.js");

const createError = require('../utils/error.js');

const createBooking = async (req, res, next) => {
    const newBooking = new Booking(req.body);
    try {
        const savedBooking = await newBooking.save();
        res.status(200).json(savedBooking);
        console.log(savedBooking)
    } catch (err) {
        next(err);
    }
};

const deleteBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json("Booking Has Been Deleted");
    } catch (err) {
        next(err);
    }
};

const getBooking = async (req, res, next) => {
    try {
        const booking = await Booking.find();
        res.status(200).json(booking)
    } catch (err) {
        next(err)
    }
};




module.exports = {
    createBooking,
    deleteBooking,
    getBooking,
};