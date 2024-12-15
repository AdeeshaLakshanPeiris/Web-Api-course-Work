const express = require("express");
const router = express.Router();
const {
  getReservationsByBusId,
  createReservation,
  verifyQRCode,
} = require("../controllers/reservationController");

// Route to get all reservations for a specific bus
router.get("/:busId", getReservationsByBusId);

// Route to create a new reservation
router.post("/", createReservation);

// Route to verify QR Code
router.post("/verify", verifyQRCode);

module.exports = router;
