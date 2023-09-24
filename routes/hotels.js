const express = require('express');
const Hotel = require("../models/Hotel.js")
const router = express.Router();

//Create
router.post("/", async (req, res) => {

    const newHotel = new Hotel(req.body)
    try{
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel)
    }catch(err){
        res.status(500).json(err)
    }
});

//Delete
router.delete("/:id", async (req, res) => {
    try{
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json(req.body.name + " Hotel Has Been Deleted")
    }catch(err){
        res.status(500).json(err)
    }
})

//Update
router.put("/:id", async (req, res) => {
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json(updatedHotel)
    }catch(err){
        res.status(500).json(err)
    }
})

//Get
router.get("/:id", async (req, res, next) => {
    const failed = true;
    const err = new Error();
    err.status = 404;
    err.message = "Object ID not found"
    if (failed){
        return next(err);
    }
 
    try{
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel)
    }catch(err){
        next(err)
    }
})
//GetAll
router.get("/", async (req, res, next) => {

    try{
        const hotels = await Hotel.find();
        res.status(200).json(hotels)
    }catch(err){
        next(err)
    }
})

module.exports = router;