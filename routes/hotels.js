const express = require('express');
const { createHotel, deleteHotel, updateHotel, getHotel, getHotels} = require('../controllers/hotelContr.js');

const Hotel = require("../models/Hotel.js");

//const createError = require('../utils/error.js');

const router = express.Router();

//Create
router.post("/", createHotel);

//Delete
router.delete("/:id", async (req, res) => {
    try{
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json(req.body.name + "Hotel Has Been Deleted")
    }catch(err){
        res.status(500).json(err)
    }
})
router.delete("/:id", deleteHotel);

//Update
router.put("/:id", updateHotel)

//Get
router.get("/:id", async (req, res) => {
    try{
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel)
    }catch(err){
        res.status(500).json(err)
    }
})
//GetAll
router.get("/", async (req, res) => {
    try{
        const hotels = await Hotel.find();
        res.status(200).json(hotels)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;