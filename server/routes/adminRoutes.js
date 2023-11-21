const express = require('express');
const router = express.Router();
const { loginAdmin, getProfile, createAdmin, getUser, getUsers, updateUser } = require('../controllers/adminController');

const authenticateUser = require('../middleware/authMiddleware');


router.post('/register', createAdmin)
router.post('/login', loginAdmin)
router.get('/user/:id', getUser)
router.get('/user', getUsers)
router.get('/profile/', getProfile)

router.put('/user/:id', updateUser)






router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
});



module.exports = router