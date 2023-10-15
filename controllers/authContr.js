const User = require('../models/User.js')
const bcrypt = require('bcryptjs');
const createError = require('../utils/error.js')


const register = async(req, res, next) =>{
    try{
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            password: hash,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            address: req.body.address,
            birthday: req.body.birthday,
            isAdmin: req.body.isAdmin,
            isEmployee: req.body.isEmployee,
            sex: req.body.sex
        })

        const regUser = await newUser.save()
        res.status(200).json(regUser);
        
    }catch(err){
        next(err)
    }
}


const login = async(req, res, next) =>{
    try{
    const user = await User.findOne({
        username: req.body.username
    })
    if(!user) 
    return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    if(!isPasswordCorrect) 
    return next(createError (400, "Wrong Password or Username!"));

    const {password, isAdmin, ...otherDetails} = user._doc;
    res.status(200).json({otherDetails});
        
    }catch(err){
        next(err);
    }
} 



const getUser = async(req, res, next) =>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user)
    }catch(err){
        next(err)
    }
} 

module.exports = {register, getUser, login}