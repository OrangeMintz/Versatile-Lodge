const Booking = require("../models/Booking.js");
const Room = require('../models/Room.js')
const createError = require('../utils/error.js');
const { createObjectCsvWriter } = require('csv-writer');
const os = require('os'); // Import the 'os' module


const createBooking = async (req, res, next) => {
    const newBooking = new Booking(req.body);
    try {
        const savedBooking = await newBooking.save();
        res.status(200).json(savedBooking);

        const room_id = savedBooking.room_id
        // console.log(room_id)
        const roomTemp = await Room.findOne({ _id: room_id })

        roomTemp.currentbookings.push({
            bookingid: savedBooking._id,
            fromDate: savedBooking.fromDate,
            toDate: savedBooking.toDate,
            userId: savedBooking.user_id,
            status: savedBooking.status,
            totalAmount: savedBooking.totalAmount,
            bookedBy: savedBooking.bookedBy,
            transactionId: savedBooking.transactionId,
            isManual: savedBooking.isManual

        });

        await roomTemp.save()

        // console.log(roomTemp);
        // console.log(savedBooking)

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
        const { user_id } = req.query;
        let query = {};

        // If user_id is provided, filter bookings by user_id
        if (user_id) {
            query.user_id = user_id;
        }

        const bookings = await Booking.find(query);
        res.status(200).json(bookings);
    } catch (err) {
        next(err);
    }
};

const getSpecificBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);
        res.status(200).json(booking)
    } catch (err) {
        next(err)
    }
};

const aggregateBookingsByMonth = async () => {
    try {
        const bookings = await Booking.find();
        const aggregatedData = {};

        bookings.forEach(booking => {
            const createdAt = new Date(booking.createdAt);
            const month = createdAt.toLocaleString('en-US', { month: 'long' });

            if (!aggregatedData[month]) {
                aggregatedData[month] = { totalBookings: 0, totalEarnings: 0, receptionists: {} };
            }

            aggregatedData[month].totalBookings++;
            aggregatedData[month].totalEarnings += booking.totalAmount;

        });

        return aggregatedData;
    } catch (err) {
        throw err;
    }
};

const convertToCsv = async (aggregatedData) => {
    try {
        const currencySymbol = 'Pesos'; // Currency symbol for Philippine Peso
        const desktopPath = os.homedir() + '/Desktop/'; // Get the user's desktop path
        const csvWriter = createObjectCsvWriter({
            path: desktopPath + 'bookings.csv', // Specify the path as the user's desktop path
            delimiter: '\t', // Try using tabs instead of commas
            header: [
                { id: 'Month', title: 'Month' },
                { id: 'Monthly Bookings', title: 'Monthly Bookings' },
                { id: 'Monthly Profit', title: 'Monthly Profit' },
            ],
        });

        const records = [];

        // Add an empty row before the month data
        records.push({ Month: '', 'Monthly Bookings': '', 'Monthly Profit': '' });

        // Add data for each month
        Object.entries(aggregatedData).forEach(([month, data]) => {
            records.push({
                Month: month,
                'Monthly Bookings': data.totalBookings,
                'Monthly Profit': data.totalEarnings + " " + currencySymbol,
                // Format receptionists' reservations
                Receptionists: Object.keys(data.receptionists).join('\n'),
                Reservations: Object.values(data.receptionists).join('\n')
            });
        });

        // Add five empty rows after the month data
        for (let i = 0; i < 3; i++) {
            records.push({ Month: '', 'Monthly Bookings': '', 'Monthly Profit': '' });
        }

        // Add data for Total Profit row
        const totalProfit = Object.values(aggregatedData).reduce((acc, data) => acc + data.totalEarnings, 0);
        records.push({ Month: 'Total Profit:', 'Monthly Bookings': '', 'Monthly Profit': totalProfit + ' ' + currencySymbol });

        await csvWriter.writeRecords(records);
    } catch (err) {
        throw err;
    }
};






module.exports = {
    createBooking,
    deleteBooking,
    getBooking,
    getSpecificBooking,
    aggregateBookingsByMonth,
    convertToCsv,
};