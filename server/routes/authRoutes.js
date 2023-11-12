const express = require('express');
const router = express.Router();
const cors = require('cors')
const { registerUser, loginUser, getProfile, updateUser, getUser, updateUserInformation } = require('../controllers/authController');
const authenticateUser = require('../middleware/authMiddleware');

//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
)


router.post('/register/customer', registerUser)
router.put('/update/:id', authenticateUser, updateUser)
router.post('/login/customer', loginUser)
router.get('/profile/', getProfile)

router.get('/information/:id', authenticateUser, getUser)
router.put('/update/user/:id', authenticateUser, updateUserInformation)



router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
});



module.exports = router