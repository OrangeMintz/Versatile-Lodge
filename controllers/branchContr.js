const Branch = require("../models/Branch.js");

const createBranch = async (req, res, next) => {
    const newBranch = new Branch(req.body);
    try {
        const savedBranch = await newBranch.save();
        res.status(200).json(savedBranch);
    } catch (err) {
        next(err);
    }
};

const deleteBranch = async (req, res, next) => {
    try {
        const branch = await Branch.findByIdAndDelete(req.params.id);
        res.status(200).json(req.body.name + " Branch Has Been Deleted");
    } catch (err) {
        next(err);
    }
};

const updateBranch = async (req, res, next) => {
    try{
        const updatedBranch = await Branch.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json(updatedBranch)
    }catch(err){
        next(err);
    }
};  

const getBranch = async (req, res, next) => {
    try{
        const branch = await Branch.findById(req.params.id);
        res.status(200).json(branch)
    }catch(err){
        next(err)
    }
};

const getBranches = async (req, res, next) => {
    try{
        const branches = await Branch.find();
        res.status(200).json(branches)
    }catch(err){
        next(err)
    }
};

module.exports = {
    createBranch,
    deleteBranch,
    updateBranch,
    getBranch,
    getBranches
};