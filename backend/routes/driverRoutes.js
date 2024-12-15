const express = require("express");
const { getAllDrivers, deleteDriver } = require("../controllers/driverController");

const router = express.Router();

// Get all drivers
router.get("/", getAllDrivers);

// Delete a specific driver
router.delete("/:id", deleteDriver);

module.exports = router;
