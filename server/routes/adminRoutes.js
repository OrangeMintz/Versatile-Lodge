const express = require('express');
const router = express.Router();
const { loginAdmin, createAdmin, getUser, getUsers, updateUser, updateAccount, archiveUser } = require('../controllers/adminController');
const { verifyAdmin, verifyUser } = require('../utils/verifyToken.js');

//Create
router.post('/register', verifyAdmin, createAdmin)

//Login
router.post('/login', loginAdmin)

//Update Profile
router.put('/profile/:id', verifyUser, updateAccount)

//Get Specific
router.get('/user/:id', verifyUser, getUser)

//Get All
router.get('/user', verifyUser, getUsers)

//Update User
router.put('/user/:id', verifyUser, updateUser)

//Archive
router.post('/user/:id/archive', verifyAdmin, archiveUser); // New route for archiving a user

//Logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
});



module.exports = router