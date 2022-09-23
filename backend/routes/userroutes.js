const express = require("express");
// const { loginUser } = require('../controller/userController');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controller/userController");

const {protect}=require('../middleware/authmiddle')

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect,getMe);

module.exports = router;
