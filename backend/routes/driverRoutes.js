const express = require("express");
const { getAllDrivers, deleteDriver } = require("../controllers/driverController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

// Get all drivers
router.get("/", verifyToken, getAllDrivers);

// Delete a specific driver
router.delete("/:id", verifyToken,deleteDriver);

module.exports = router;
