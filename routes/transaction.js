const express = require('express');
const { createTransaction, updateTransaction, deleteTransaction, getTransaction, getTransactions } = require('../controllers/transactionContr.js');

const Transaction = require("../models/Transaction.js");
const { verifyAdmin, verifyUser } = require('../utils/verifyToken.js');

const router = express.Router();

//Create
router.post("/", createTransaction);

//Update
router.put("/:id", updateTransaction);

//Delete
router.delete("/:id", deleteTransaction);

//Get
router.get("/:id", getTransaction);

//Get All
router.get("/", getTransactions);

module.exports = router;