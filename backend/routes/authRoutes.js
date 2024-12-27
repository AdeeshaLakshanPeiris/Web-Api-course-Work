const express = require("express");
const { register, login, sendPasswordEmail } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Route to send password email
router.post("/send-password-email", sendPasswordEmail);

module.exports = router;
