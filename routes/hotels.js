const express = require('express');
const Hotel = require("../models/Hotel.js")

const router = express.Router();

//Create
router.post("/", async (req, res) => {

    const newHotel = new Hotel(req.body)
    try{
        const savedHotel = await newHotel.save();
        req.status(200).json(savedHotel)
    }catch(err){
        res.status(500).json(err)
    }
});


//Delete
//Update
router.put("/:id", async (req, res) => {
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body});
        req.status(200).json(updatedHotel)
    }catch(err){
        res.status(500).json(err)
    }
})
//Get
router.get("/:id", async (req, res) => {
    try{
        const hotel = await Hotel.findById(req.params.id);
        req.status(200).json(hotel)
    }catch(err){
        res.status(500).json(err)
    }
})
//GetAll
router.get("/", async (req, res) => {
    try{
        const hotels = await Hotel.find();
        req.status(200).json(hotels)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;