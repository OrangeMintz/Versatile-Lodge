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
    const newHotel = new Hotel(req.body)
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body});
        req.status(200).json(updatedHotel)
    }catch(err){
        res.status(500).json(err)
    }
})
//Get
//GetAll


module.exports = router;