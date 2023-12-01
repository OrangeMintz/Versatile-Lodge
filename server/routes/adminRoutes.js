const express = require('express');
const router = express.Router();
const { loginAdmin, createAdmin, getUser, getUsers, updateUser, updateAccount, archiveUser } = require('../controllers/adminController');


router.post('/register', createAdmin)
router.post('/login', loginAdmin)
router.put('/profile/:id', updateAccount)
router.get('/user/:id', getUser)
router.get('/user', getUsers)
router.put('/user/:id', updateUser)

router.post('/user/:id/archive', archiveUser); // New route for archiving a user


router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
});



module.exports = router