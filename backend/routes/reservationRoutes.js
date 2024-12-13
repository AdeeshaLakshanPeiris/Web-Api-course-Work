const express = require("express");
const Reservation = require("../models/Reservation");
const router = express.Router();

// Get reservations for a bus
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

// Create a new reservation
router.post("/", async (req, res) => {
  try {
    const { busId, seatNumber, passengerName, date } = req.body;

    // Check if the seat is already reserved
    const existingReservation = await Reservation.findOne({ busId, seatNumber });
    if (existingReservation) {
      return res.status(400).json({ message: "Seat already reserved" });
    }

    const reservation = new Reservation({ busId, seatNumber, passengerName, date });
    await reservation.save();
    res.status(201).json({ message: "Reservation successful", reservation });
  } catch (err) {
    res.status(500).json({ message: "Failed to create reservation" });
  }
});

module.exports = router;
