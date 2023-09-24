const Hotel = require("../models/Hotel.js");

// Define the createHotel function
const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (err) {
        next(err);
    }
};

// Define the deleteHotel function
const deleteHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json(req.body.name + " Hotel Has Been Deleted");
    } catch (err) {
        next(err);
    }
};

const updateHotel = async (req, res, next) => {
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json(updatedHotel)
    }catch(err){
        next(err);
    }
};

const getHotel = async (req, res, next) => {
    // Validation and Authentication
    // const failed = true;
    // if (failed){
    //     return next(createError(401, "You're not Authenticated"));
    // }
 
    try{
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel)
    }catch(err){
        next(err)
    }
};

const getHotels = async (req, res, next) => {
    try{
        const hotels = await Hotel.find();
        res.status(200).json(hotels)
    }catch(err){
        next(err)
    }
};

// Export the createHotel and deleteHotel functions
module.exports = {
    createHotel,
    deleteHotel,
    updateHotel,
    getHotel,
    getHotels
};