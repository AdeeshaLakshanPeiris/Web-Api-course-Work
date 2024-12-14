const express = require("express");
const mongoose = require("mongoose");
const Reservation = require("../models/Reservation");
const router = express.Router();

// Get all reservations for a specific bus
router.get("/:busId", async (req, res) => {
  try {
    const { busId } = req.params;

    // Check if the bus ID is valid
    if (!mongoose.isValidObjectId(busId)) {
      return res.status(400).json({ message: "Invalid bus ID" });
    }

    const reservations = await Reservation.find({ busId });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reservations" });
  }
});

// Create a new reservation
router.post("/", async (req, res) => {
  try {
    const { busId, seatNumber, passengerName, date } = req.body;

    // Check if all fields are provided
    if (!busId || !seatNumber || !passengerName || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the bus ID is valid
    if (!mongoose.isValidObjectId(busId)) {
      return res.status(400).json({ message: "Invalid bus ID" });
    }

    // Check if the seat is already reserved
    const existingReservation = await Reservation.findOne({ busId, seatNumber });
    if (existingReservation) {
      return res.status(400).json({ message: "Seat already reserved" });
    }

    // Create and save the new reservation
    const reservation = new Reservation({ busId, seatNumber, passengerName, date });
    await reservation.save();
    res.status(201).json({ message: "Reservation successful", reservation });
  } catch (err) {
    res.status(500).json({ message: "Failed to create reservation" });
  }
});

module.exports = router;
