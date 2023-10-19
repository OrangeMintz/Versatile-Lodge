const express = require('express');
const { createBranch, deleteBranch, updateBranch, getBranch, getBranches} = require('../controllers/branchContr.js');

const Branch = require("../models/Branch.js");
const { verifyAdmin } = require('../utils/verifyToken.js');

//const createError = require('../utils/error.js');

const router = express.Router();

//Create
router.post("/", verifyAdmin,  createBranch);

//Delete
router.delete("/:id", verifyAdmin, deleteBranch);

//Update
router.put("/:id", verifyAdmin, updateBranch)

//Get
router.get("/:id", getBranch);

//GetAll
router.get("/", getBranches);

module.exports = router;