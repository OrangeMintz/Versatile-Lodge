const express = require('express');
const router = express.Router();
const { loginAdmin, getProfile, createAdmin } = require('../controllers/adminController');

const authenticateUser = require('../middleware/authMiddleware');


router.post('/register', createAdmin)
router.post('/login', loginAdmin)
router.get('/profile/', getProfile)




router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
});



module.exports = router