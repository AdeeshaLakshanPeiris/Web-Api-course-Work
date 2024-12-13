const express = require("express");
const Bus = require("../models/Bus");
const router = express.Router();

// Get all buses
router.get("/", async (req, res) => {
  const buses = await Bus.find();
  res.json(buses);
});

// Add a bus
router.post("/", async (req, res) => {
  const { number, route, seats, departureTime, arrivalTime } = req.body;
  const bus = new Bus({ number, route, seats, departureTime, arrivalTime });
  await bus.save();
  res.json({ message: "Bus added", bus });
});

router.get("/:id", async (req, res) => {
    try {
      const bus = await Bus.findById(req.params.id);
      if (!bus) {
        return res.status(404).json({ message: "Bus not found" });
      }
      res.json(bus);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch bus details" });
    }
  });

module.exports = router;
