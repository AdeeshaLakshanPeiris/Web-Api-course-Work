const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the role is valid
    if (!['admin', 'driver', 'passenger'].includes(role)) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    // Create and save the user
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    // Handle duplicate email error
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Return user details
    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

module.exports = router;
