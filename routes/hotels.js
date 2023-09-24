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
})
//Delete
//Update
//Get
//GetAll


module.exports = router;