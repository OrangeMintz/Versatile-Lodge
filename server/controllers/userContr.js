const User = require("../models/User.js");


// Define the createUser function
const createUser = async (req, res, next) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        next(err);
    }
};

// Define the deleteUser function
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(req.body.name + " User Has Been Deleted");
    } catch (err) {
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json(updatedUser)
    }catch(err){
        next(err);
    }
};  

const getUser = async (req, res, next) => {
    // Validation and Authentication
    // const failed = true;
    // if (failed){
    //     return next(createError(401, "You're not Authenticated"));
    // }

    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user)
    }catch(err){
        next(err)
    }
};

const getUsers= async (req, res, next) => {
    try{
        const users = await User.find();
        res.status(200).json(users)
    }catch(err){
        next(err)
    }
};

// Export the createHotel and deleteHotel functions
module.exports = {
    createUser,
    deleteUser,
    updateUser,
    getUser,
    getUsers
};