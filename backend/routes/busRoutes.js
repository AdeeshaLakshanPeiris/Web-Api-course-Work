const express = require("express");
const router = express.Router();
const { getAllBuses, addBus, getBusById } = require("../controllers/busController");

// Route to get all buses
router.get("/", getAllBuses);

// Route to add a new bus
router.post("/", addBus);

// Route to get a specific bus by ID
router.get("/:id", getBusById);

module.exports = router;