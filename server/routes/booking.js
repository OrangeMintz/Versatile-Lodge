const express = require('express');
const { createBooking, deleteBooking, getBooking, getSpecificBooking, aggregateBookingsByMonth, convertToCsv } = require('../controllers/bookingContr.js');
const { verifyAdmin, verifyUser } = require('../utils/verifyToken.js');
const router = express.Router();


// CSV Export Endpoint
router.get("/export-bookings", async (req, res, next) => {
    try {
        // Aggregate bookings by month
        const aggregatedData = await aggregateBookingsByMonth();

        // Convert aggregated data to CSV
        await convertToCsv(aggregatedData);

        // Send success response
        res.status(200).json({ success: true, message: "CSV file generated successfully." });
    } catch (error) {
        next(error);
    }
});

//Create
router.post("/", createBooking);

//Delete
router.delete("/:id", deleteBooking);

//Get All
router.get("/", getBooking);



//Get Specific
router.get("/:id", getSpecificBooking);

module.exports = router;