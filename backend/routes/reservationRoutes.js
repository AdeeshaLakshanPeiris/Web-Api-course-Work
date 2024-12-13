const express = require("express");
const Reservation = require("../models/Reservation");
const Bus = require("../models/Bus"); // Ensure the Bus model exists
const router = express.Router();

// Get reservations for a specific bus
router.get("/:busId", async (req, res) => {
  try {
    const { busId } = req.params;

    // Fetch reservations for the given bus ID
    const reservations = await Reservation.find({ busId });
    res.json(reservations);
  } catch (err) {
    console.error("Error fetching reservations:", err);
    res.status(500).json({ message: "Failed to fetch reservations" });
  }
});

// Create a new reservation
router.post("/", async (req, res) => {
  try {
    const { busId, seatNumber, passengerName, passengerId, date } = req.body;

    // Validate required fields
    if (!busId || !seatNumber || !passengerName || !passengerId || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the seat is already reserved
    const existingReservation = await Reservation.findOne({ busId, seatNumber });
    if (existingReservation) {
      return res.status(400).json({ message: "Seat already reserved" });
    }

    // Create and save the reservation
    const reservation = new Reservation({ busId, seatNumber, passengerName, passengerId, date });
    await reservation.save();
    res.status(201).json({ message: "Reservation successful", reservation });
  } catch (err) {
    console.error("Error creating reservation:", err);
    res.status(500).json({ message: "Failed to create reservation" });
  }
});

module.exports = router;
