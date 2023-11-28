const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, updateUser, updatePassword, getUser, getUsers } = require('../controllers/authController');
const authenticateUser = require('../middleware/authMiddleware');


router.post('/register/customer', registerUser)
router.put('/update/:id', authenticateUser, updateUser)
router.put('/updatepassword/:id', authenticateUser, updatePassword)
router.post('/login/customer', loginUser)
router.get('/profile/', getProfile)

router.get("/customer/:id", getUser);
router.get("/customer/", getUsers);




router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
});



module.exports = router