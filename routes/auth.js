const express = require("express");
const {
  register,
  getUser,
  login,
  registerCust,
} = require("../controllers/authContr.js");
const router = express.Router();

router.post("/register", register);
router.post("/register/customer", registerCust);
router.post("/login", login);
router.get("/user/:id", getUser);

module.exports = router;
