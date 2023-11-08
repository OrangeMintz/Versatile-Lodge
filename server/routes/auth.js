const express = require("express");
const {
  register,
  getUser,
  login,
  registerCust,
  loginCust
} = require("../controllers/authContr.js");
const router = express.Router();

router.post("/register", register);
router.post("/register/customer", registerCust);
router.post("/login/customer", loginCust);
router.post("/login/", login);

router.get("/user/:id", getUser);

module.exports = router;
