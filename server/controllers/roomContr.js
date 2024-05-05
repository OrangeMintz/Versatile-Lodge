const Room2 = require('../models/Room2.js');
const Room = require('../models/Room.js');
const BookingHistory = require('../models/BookingHistory.js');
const ArchiveRooms = require('../models/ArchiveRooms.js')
const upload = require('../middleware/multerConfig');
const cloudinary = require('../cloudinary/cloudinary')

const createRoom = async (req, res) => {
    try {
        const { name, branch, price, imageurls, maxPeople, desc } = req.body;
        let uploadedImage;
        if (imageurls) {
            // If image is provided, upload the image to Cloudinary
            uploadedImage = await cloudinary.uploader.upload(imageurls, {
                upload_preset: 'unsigned_upload',
                public_id: `${name}avatar`,
                allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp']
            }, function (error, result) {
                if (error) {
                    console.log("GANA NA PLEASE");
                }
                console.log(result);
            });
        } else {
            // If image is not provided, use a default image URL
            uploadedImage = {
                public_id: 'User_Avatar/asmdztviq7ovtidsdrcy',
                secure_url: 'https://res.cloudinary.com/dl0qncxjh/image/upload/v1714846588/User_Avatar/asmdztviq7ovtidsdrcy.jpg'
            };
        }

        const room = await Room2.create({
            name,
            branch,
            price,
            maxPeople,
            desc,
            imageurls: `https://res.cloudinary.com/dl0qncxjh/image/upload/${uploadedImage.public_id}`,
            unavailable: false,
            currentbookings: []
        });

        const imageUrl = `https://res.cloudinary.com/dl0qncxjh/image/upload/${room.imageurls}`;
        const roomWithImage = { ...room.toObject(), imageUrl };

        return res.json(roomWithImage);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
}


const deleteRoom = async (req, res, next) => {
    const branchId = req.params.branchId;

    try {
        const room = await Room2.findByIdAndDelete(req.params.id);

        res.status(200).json("Room Has Been Deleted");
    } catch (err) {
        next(err);
    }
};


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
        const room = await Room2.findById(req.params.id);
        res.send(room)
        // res.status(200).json(room)
    } catch (err) {
        next(err)
    }
};

const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room2.find({})
        const roomsCount = Room2.length;

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