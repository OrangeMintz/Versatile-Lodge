const express = require('express');
const { createUser, deleteUser, updateUser, getUsers, getUser } = require('../controllers/userContr.js');
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken.js');


const router = express.Router();


router.get("/checkauthentication", verifyToken, (req, res, next) =>{
    res.send('You are authenticated')

});

router.get("/checkUser/:id", verifyUser, (req, res, next) =>{
    res.send('verified user')
    
});

router.get("/checkAdmin/:id", verifyAdmin , (req, res, next) =>{
    res.send('verified admin')
    
});

//Create
router.post("/", createUser);

//Delete
router.delete("/:id", deleteUser);

//Update
router.put("/:id", updateUser)

//Get
router.get("/:id", getUser);

//GetAll
router.get("/", getUsers);

module.exports = router;