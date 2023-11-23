const Room = require("../models/Room.js");
const Branch = require("../models/Branch.js");

const createError = require('../utils/error.js');


const createRoom = async (req, res, next) => {

    // const branchId = req.params.branchId;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        res.status(200).json(savedRoom);
    } catch (err) {
        next(err)
    }
};



const deleteRoom = async (req, res, next) => {
    const branchId = req.params.branchId;

    try {
        const room = await Room.findByIdAndDelete(req.params.id);

        res.status(200).json("Room Has Been Deleted");
    } catch (err) {
        next(err);
    }
};


const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json(updatedRoom)
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





module.exports = {
    createRoom,
    deleteRoom,
    updateRoom,
    getRoom,
    getRooms
};