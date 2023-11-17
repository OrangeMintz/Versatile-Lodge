const BookingHistory = require("../models/BookingHistory.js");

const createError = require('../utils/error.js');

const createBookingHistory = async (req, res, next) => {
    const { user_id, reservation_id, fromDate, toDate, roomName, branch, price } = req.body;

    try {
        const newHistory = new BookingHistory({
            userId: user_id,
            reservationId: reservation_id,
            checkInDate: new Date(fromDate),
            checkOutDate: new Date(toDate),
            roomName: roomName,
            branch: branch,
            price: price,
        });

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

const getBookHistoryByUserId = async (req, res, next) => {
    const user_id = req.params.id; // Assuming you are passing the user_id as a parameter in the URL

    try {
        const history = await BookingHistory.find({ userId: user_id });
        res.status(200).json(history);
    } catch (err) {
        next(err);
    }
};




module.exports = {
    createBookingHistory,
    deleteBookHistory,
    getBookHistory,
    getBookHistoryByUserId
};