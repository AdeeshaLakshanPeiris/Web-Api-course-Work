const express = require("express");
const router = express.Router();
const {
  getReservationsByBusId,
  createReservation,
  verifyQRCode,
  getReservationBusDetails
} = require("../controllers/reservationController");
const verifyToken = require("../middlewares/authMiddleware");

// Route to get all reservations for a specific bus
router.get("/:busId", verifyToken, getReservationsByBusId);

// Route to create a new reservation
router.post("/", verifyToken,createReservation);

// Route to verify QR Code
router.post("/verify", verifyToken,verifyQRCode);

// Admin view of bus details
router.get("/bus-details/:busId",getReservationBusDetails); 

module.exports = router;
