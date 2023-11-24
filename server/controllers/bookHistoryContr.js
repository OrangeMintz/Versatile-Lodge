const BookingHistory = require("../models/BookingHistory.js");
const Room = require("../models/Room.js");
const Booking = require("../models/Booking.js");

const createError = require('../utils/error.js');

const createBookingHistory = async (req, res, next) => {
    const { user_id, reservation_id, fromDate, toDate, roomName, branch, price, room_id } = req.body;

    try {
        const newHistory = new BookingHistory({
            userId: user_id,
            reservationId: reservation_id,
            roomId: room_id,
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
    const bookingId = req.params.id;

    try {
        // Find the booking history entry
        const bookingHistory = await BookingHistory.findById(bookingId);

        if (!bookingHistory) {
            return res.status(404).json({ error: 'Booking History not found' });
        }

        // Extract the room ID from the booking history entry
        const roomId = bookingHistory.roomId;
        const reservationId = bookingHistory.reservationId;

        // console.log("roomId:", roomId);

        // Delete the booking history entry
        await BookingHistory.findByIdAndDelete(bookingId);

        // Update the current bookings of the room
        await Room.findByIdAndUpdate(roomId, {
            $pull: { 'currentbookings': { 'bookingid': reservationId } }
        });


        res.status(200).json("Booking History Has Been Deleted");
    } catch (err) {
        console.error(err);
        next(err);
    }
};



// const deleteBookHistory = async (req, res, next) => {
//     const bookingId = req.params.id;

//     try {
//         // Find the booking history entry
//         const bookingHistory = await BookingHistory.findById(bookingId);

//         if (!bookingHistory) {
//             return res.status(404).json({ error: 'Booking History not found' });
//         }

//         // Extract the room ID from the booking history entry
//         const roomId = bookingHistory.roomId;

//         // Delete the booking history entry
//         await BookingHistory.findByIdAndDelete(bookingId);

//         // Update the current bookings of the room
//         await Room.findByIdAndUpdate(roomId, {
//             $pull: { currentbookings: { bookingid: bookingId } }
//         });

//         res.status(200).json("Booking History Has Been Deleted");
//     } catch (err) {
//         next(err);
//     }
// };

// const deleteBookHistory = async (req, res, next) => {
//     try {
//         const history = await BookingHistory.findByIdAndDelete(req.params.id);
//         res.status(200).json("Booking History Has Been Deleted");
//     } catch (err) {
//         next(err);
//     }
// };

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

const updateBookingHistory = async (req, res, next) => {
    try {
        const updatedBookingHistory = await BookingHistory.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json(updatedBookingHistory)
    } catch (err) {
        next(err);
    }
};

const acceptBooking = async (req, res) => {
    try {
        const { userId, bookingId } = req.params;

        // Update user's booking history status to "Accepted"
        await BookingHistory.findOneAndUpdate(
            { userId, reservationId: bookingId },
            { $set: { status: 'Accepted' } }
        );

        res.status(200).json({ message: 'Booking accepted successfully' });
    } catch (error) {
        console.error('Error accepting booking:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};






module.exports = {
    createBookingHistory,
    deleteBookHistory,
    getBookHistory,
    getBookHistoryByUserId,
    updateBookingHistory,
    acceptBooking
};