const express = require("express");
const {
  createUser,
  deleteUser,
  updateUser,
  getUsers,
  getUser,
} = require("../controllers/userContr.js");
const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utils/verifyToken.js");

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("You are authenticated");
});

router.get("/checkUser/:id", verifyUser, (req, res, next) => {
  res.send("verified user");
});

router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
  res.send("verified admin");
});

//Create
router.post("/", verifyUser, createUser);

//Delete
router.delete("/:id", verifyUser, deleteUser);

//Update
router.put("/:id", verifyUser, updateUser);

//Get
router.get("/:id", verifyUser, getUser);

//GetAll
router.get("/", verifyAdmin, getUsers);

module.exports = router;
