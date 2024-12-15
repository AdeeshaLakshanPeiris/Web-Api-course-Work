const express = require("express");
const router = express.Router();
const { getAllBuses, addBus, getBusById,getBusesByDriver,deleteBus } = require("../controllers/busController");

// Route to get all buses
router.get("/", getAllBuses);

// Route to add a new bus
router.post("/", addBus);

// Route to get a specific bus by ID
router.get("/:id", getBusById);

// Route to fetch buses for a specific driver
router.get("/driver/:driverId", getBusesByDriver);

// Delete a bus (admin or specific driver access)
router.delete("/:id", deleteBus);

module.exports = router;

