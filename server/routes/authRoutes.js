const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, getAdminProfile, updateUser, updatePassword, getUser, getUsers } = require('../controllers/authController');
const authenticateUser = require('../middleware/authMiddleware');

//Create
router.post('/register/customer', registerUser)

//Update User
router.put('/update/:id', authenticateUser, updateUser)

//Update Password
router.put('/updatepassword/:id', authenticateUser, updatePassword)

//Login User
router.post('/login/customer', loginUser)

//Get User Token 
router.get('/profile/', getProfile)

//Get Admin Token
router.get('/profile/admin', getAdminProfile)

//Get Specific
router.get("/customer/:id", getUser);

//Get All
router.get("/customer/", getUsers);

//Logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
});

router.get('/logout/admin', (req, res) => {
    res.clearCookie('aToken');
    res.status(200).json({ message: 'Logout successful' });
});



module.exports = router