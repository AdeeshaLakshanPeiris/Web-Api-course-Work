const express = require("express");
const { register, login, sendPasswordEmail, sendResetLink, resetPassword } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Route to send password email
router.post("/send-password-email", sendPasswordEmail);

// Route to send reset password link
router.post("/forgot-password", sendResetLink);

// Route to reset password
router.post("/reset-password", resetPassword);

module.exports = router;
