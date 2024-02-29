const Reception = require("../models/Receptions.js");
const Room = require("../models/Room.js");
const cron = require('node-cron');


const createReception = async (req, res, next) => {
    try {
        const existingReception = await Reception.findOne({ userId: req.body.userId });

        if (existingReception) {
            // Receptionist data already exists, update totalTransactions
            existingReception.totalTransactions += 1;
            const updatedReception = await existingReception.save();
            return res.status(200).json(updatedReception);
        }

        // Receptionist data does not exist, create a new entry
        const newReception = new Reception(req.body);
        const savedReception = await newReception.save();

        res.status(200).json(savedReception);
    } catch (err) {
        next(err);
    }
};


const updateReception = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const reception = await Reception.findById(userId);

        if (!reception) {
            return res.status(404).json({ message: 'Receptionist not found' });
        }

        // Increment totalTransactions
        reception.totalTransactions += 1;
        const updatedReception = await reception.save();

        res.status(200).json(updatedReception);
    } catch (err) {
        next(err);
    }
};

// Controller to delete all receptions
const deleteAllReceptions = async () => {
    try {
        await Reception.deleteMany({}); // Assuming Reception is your Mongoose model
        console.log("All receptions deleted successfully.");
    } catch (error) {
        console.error("Error deleting receptions:", error);
    }
};

// Schedule the task to run every day at midnight (00:00)
cron.schedule('0 0 * * *', async () => {
    console.log('Running daily task to delete all receptions...');
    await deleteAllReceptions();
});


// const deleteAllReceptions = async (req, res, next) => {
//     try {
//         await Reception.deleteMany({}); // Assuming Reception is your Mongoose model
//         res.status(200).json({ message: "All receptions deleted successfully." });
//     } catch (error) {
//         next(error);
//     }
// };

// const deleteReception = async (req, res, next) => {
//     try {
//         const receptions = await Reception.findByIdAndDelete(req.params.id);
//         res.status(200).json("Reception Has Been Deleted");
//     } catch (err) {
//         next(err);
//     }
// };

const getReception = async (req, res, next) => {
    try {
        const reception = await Reception.findById(req.params.id);
        res.status(200).json(reception)
    } catch (err) {
        next(err)
    }
};

const getReceptions = async (req, res, next) => {
    try {
        const receptions = await Reception.find({});
        res.status(200).json(receptions)
    } catch (err) {
        next(err)
    }
};


module.exports = {
    createReception,
    updateReception,
    deleteAllReceptions,
    getReception,
    getReceptions
};