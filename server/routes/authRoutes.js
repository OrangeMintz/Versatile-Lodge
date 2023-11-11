const express = require('express');
const router = express.Router();
const cors = require('cors')
const { registerUser, loginUser, getProfile, updateUser } = require('../controllers/authController');
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

router.get('/logout', (req, res) => {
    // Clear the user session or remove the authentication cookie
    // You can also log the user out of your authentication system
    // Additionally, you can perform other cleanup actions if needed
    res.clearCookie('token'); // Clear the token cookie

    // Handle additional logout actions here, such as clearing user sessions
    // Send a response indicating a successful logout
    res.status(200).json({ message: 'Logout successful' });
});



module.exports = router