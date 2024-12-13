const express = require("express");
const Reservation = require("../models/Reservation");
const router = express.Router();

// Get reservations for a bus
router.get("/:busId", async (req, res) => {
  try {
    const reservations = await Reservation.find({ busId: req.params.busId });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reservations" });
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
