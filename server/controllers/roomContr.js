const Room = require("../models/Room.js");
// const Branch = require("../models/Branch.js");
const BookingHistory = require('../models/BookingHistory.js');
const ArchiveRooms = require('../models/ArchiveRooms.js')


const mongoose = require('mongoose');
const createError = require('../utils/error.js');

const multer = require('multer');
const path = require('path');

const upload = require('../middleware/multerConfig');

const createRoom = async (req, res) => {
    try {
        // Multer middleware
        upload.array('imageurls', 20)(req, res, async (err) => {
            if (err) {
                console.error('Multer error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }


            try {
                const { body } = req;

                // Check if files were uploaded
                if (!req.files || req.files.length === 0) {
                    return res.status(400).json({ message: 'No files were uploaded.' });
                }

                const { name, branch, price, maxPeople, desc, unavailable } = body;

                // Process uploaded files
                const images = req.files.map((file) => `/uploads/${file.filename}`);

                // Assuming images are stored in a public/uploads directory

                const newRoom = new Room({
                    name,
                    branch,
                    price,
                    maxPeople,
                    desc,
                    imageurls: images,
                    unavailable,
                });

                const savedRoom = await newRoom.save();

                res.status(201).json(savedRoom);
            } catch (error) {
                console.error('Error creating room:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    } catch (error) {
        console.error('Error creating room:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// const createRoom = async (req, res) => {
//     try {
//         const { body } = req;

//         // Check if files were uploaded
//         if (!req.files || Object.keys(req.files).length === 0) {
//             return res.status(400).json({ message: 'No files were uploaded.' });
//         }

//         const { name, branch, price, maxPeople, desc } = body;

//         // Process uploaded files
//         const images = req.files.imageurls.map((file) => `/uploads/${file.filename}`);

//         // Assuming images are stored in a public/uploads directory

//         const newRoom = new Room({
//             name,
//             branch,
//             price,
//             maxPeople,
//             desc,
//             imageurls: images,
//         });

//         const savedRoom = await newRoom.save();

//         res.status(201).json(savedRoom);
//     } catch (error) {
//         console.error('Error creating room:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };




const deleteRoom = async (req, res, next) => {
    const branchId = req.params.branchId;

    try {
        const room = await Room.findByIdAndDelete(req.params.id);

        res.status(200).json("Room Has Been Deleted");
    } catch (err) {
        next(err);
    }
};


// const updateRoom = async (req, res, next) => {
//     try {
//         const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body });
//         res.status(200).json(updatedRoom)
//     } catch (err) {
//         next(err);
//     }
// };

const updateRoom = async (req, res, next) => {
    try {
        const roomId = req.params.id;

        // Fetch the existing room data from the database
        const existingRoom = await Room.findById(roomId);

        // Check if the room exists
        if (!existingRoom) {
            return res.status(404).json({ error: 'Room not found' });
        }

        // Extract the changed fields from the request body
        const changedFields = req.body;

        // Update the existing room with the changed fields
        Object.entries(changedFields).forEach(([key, value]) => {
            // Handle the "status" field to update the "unavailable" field
            if (key === 'status') {
                existingRoom.unavailable = value.toLowerCase() === 'maintenance'; // Convert to lowercase for case-insensitive comparison
            } else {
                existingRoom[key] = value;
            }
        });

        // Save the updated room to the database
        const updatedRoom = await existingRoom.save();

        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
};


const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.send(room)
        // res.status(200).json(room)
    } catch (err) {
        next(err)
    }
};

const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find({})
        const roomsCount = Room.length;

        res.send(rooms)
    } catch (err) {
        next(err)
    }
};


const confirmBooking = async (req, res) => {
    try {
        const { bookingId, roomId } = req.params;

        // console.log(bookingId)
        // console.log(roomId)

        // Update room status to "booked"
        const updatedRCB = await Room.findOneAndUpdate(
            { _id: roomId, 'currentbookings.bookingid': bookingId },
            { $set: { 'currentbookings.$.status': 'booked' } }

        );
        // console.log(`ROOM`, updatedRCB);
        // const foundRoomByBookingId = await Room.findOne({ 'currentbookings.bookingid': bookingId });
        // console.log('Found Room By Booking Id:', foundRoomByBookingId);


        // Update user's booking history status to "Accepted"
        const updatedBH = await BookingHistory.findOneAndUpdate(
            { reservationId: bookingId },
            { $set: { status: 'Accepted' } }
        );

        // console.log(`BH`, updatedBH)

        res.status(200).json({ message: 'Booking confirmed successfully' });
    } catch (error) {
        console.error('Error confirming booking:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const removeOverlappingBookings = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { bookingIds } = req.body;

        // Fetch the room
        const room = await Room.findById(roomId);

        // Remove overlapping bookings
        room.currentbookings = room.currentbookings.filter(booking => !bookingIds.includes(booking.bookingid));

        // Save the updated room
        await room.save();

        res.status(200).json({ message: 'Overlapping bookings removed successfully' });
    } catch (error) {
        console.error('Error removing overlapping bookings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const rejectBooking = async (req, res) => {
    try {
        const { bookingId, roomId } = req.params;

        // Remove the booking from the currentbookings array
        const updatedRCB = await Room.findOneAndUpdate(
            { _id: roomId },
            { $pull: { currentbookings: { bookingid: bookingId } } },
            { new: true }
        );

        // Update user's booking history status to "Declined"
        const updatedBH = await BookingHistory.findOneAndUpdate(
            { reservationId: bookingId },
            { $set: { status: 'Declined' } }
        );

        res.status(200).json({ message: 'Booking rejected successfully' });
    } catch (error) {
        console.error('Error rejecting booking:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const deleteBooking = async (req, res, next) => {
    const { roomId, bookingId } = req.params;

    try {
        const room = await Room.findById(roomId);

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        room.currentbookings = room.currentbookings.filter((booking) => booking.bookingid !== bookingId);

        await room.save();

        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        next(error);
    }
};


const archiveRoom = async (req, res, next) => {

    const newArchive = new ArchiveRooms(req.body);

    try {
        const savedArchive = await newArchive.save();
        res.status(200).json(savedArchive);
    } catch (err) {
        next(err)
    }
};

module.exports = {
    createRoom,
    deleteRoom,
    updateRoom,
    getRoom,
    getRooms,
    confirmBooking,
    removeOverlappingBookings,
    rejectBooking,
    deleteBooking,
    archiveRoom


};