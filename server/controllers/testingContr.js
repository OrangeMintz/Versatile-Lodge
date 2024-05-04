const Testing = require("../models/Testing");


const createTest = async (req, res, next) => {
    try {
        const newTesting = new Testing(req.body);
        const savedTesting = await newTesting.save();

        res.status(200).json(savedTesting);
    } catch (err) {
        next(err);
    }
};


module.exports = {
    createTest,
};