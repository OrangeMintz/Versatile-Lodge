const Transaction = require("../models/Transaction.js");

const createError = require('../utils/error.js');


const createTransaction = async (req, res, next) => {
    const newTransaction = new Transaction(req.body);
    try {
        const savedTransaction = await newTransaction.save();
        res.status(200).json(savedTransaction);
    } catch (err) {
        next(err);
    }
};

const deleteTransaction = async (req, res, next) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.status(200).json("Transaction Has Been Deleted");
    } catch (err) {
        next(err);
    }
};



const updateTransaction = async (req, res, next) => {
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json(updatedTransaction)
    } catch (err) {
        next(err);
    }
};

const getTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        res.status(200).json(transaction)
    } catch (err) {
        next(err)
    }
};

const getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions)
    } catch (err) {
        next(err)
    }
};

// Export the createHotel and deleteHotel functions
module.exports = {
    createTransaction,
    deleteTransaction,
    updateTransaction,
    getTransaction,
    getTransactions
};