const express = require('express');
const { createTest } = require('../controllers/testingContr.js');

const Testing = require("../models/Testing.js");
const router = express.Router();

//Create
router.post("/", createTest);

module.exports = router;