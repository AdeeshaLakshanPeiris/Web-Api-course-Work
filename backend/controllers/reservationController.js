const mongoose = require("mongoose");
const Reservation = require("../models/Reservation");
const { generateQRCode } = require("../utils/qrUtil");
const sendEmail = require("../utils/emailUtil");

const generateEmailTemplate = require("../simulation/emailTemplate");
// Get all reservations for a specific bus
const getReservationsByBusId = async (req, res) => {
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
};


// Create a new reservation
const createReservation = async (req, res) => {
    try {
      const { busId, seats, passengerDetails, userId, totalAmount, date } = req.body;
  
      // Validate input
      if (!busId || !seats || !passengerDetails || !userId || !totalAmount || !date) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Check if busId is valid
      if (!mongoose.isValidObjectId(busId)) {
        return res.status(400).json({ message: "Invalid bus ID" });
      }
  
      // Check for already reserved seats
      const existingReservations = await Reservation.find({
        busId,
        seatNumber: { $in: seats },
      });
  
      if (existingReservations.length > 0) {
        return res.status(400).json({
          message: `Seats ${existingReservations.map((r) => r.seatNumber).join(", ")} are already reserved.`,
        });
      }
  
      // Create reservations for all seats
      const reservations = seats.map((seat) => ({
        busId,
        seatNumber: seat,
        passengerName: passengerDetails.fullName,
        passengerEmail: passengerDetails.email,
        passengerPhone: passengerDetails.phone,
        userId,
        date,
        totalAmount: totalAmount / seats.length, // Split amount per seat
      }));
  
      const savedReservations = await Reservation.insertMany(reservations);
      const qrData = {
        reservationIds: savedReservations.map((r) => r._id),
        busDetails: { route: passengerDetails.route, number: passengerDetails.number }, // Ensure this comes from request or related logic
        seats,
        passenger: passengerDetails,
        totalAmount,
        date,
      };
  
      // Generate QR Code Buffer
    const qrCodeBuffer = await generateQRCode(qrData);

    // Prepare Email Content
    const emailHtml = generateEmailTemplate({
      fullName: passengerDetails.fullName,
      busDetails: qrData.busDetails,
      seats,
      totalAmount,
      qrCodeBase64: `cid:qrcode`, // Embed QR Code in the email
    });

    // Send Email with QR Code
    await sendEmail(passengerDetails.email, "Reservation Confirmation", emailHtml, qrCodeBuffer);

  
          // Respond to the client
    res.status(201).json({
        message: "Reservation successful! Confirmation email sent.",
        reservations: savedReservations,
        qrCode : `data:image/png;base64,${qrCodeBuffer.toString("base64")}`, // Pass QR code as Base64 for frontend
      });
    } catch (err) {
      console.error("Error creating reservation:", err);
      res.status(500).json({ message: "Failed to create reservation" });
    }
  };
  
// Verify QR Code
const verifyQRCode = async (req, res) => {
  try {
    const { reservationId } = req.params;

    const reservation = await Reservation.findOne({ _id: reservationId }).populate("busId");
    if (!reservation) {
      return res.status(404).json({ message: "Invalid QR Code or Reservation not found" });
    }

    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Error verifying QR Code", error });
  }
};

module.exports = {
  getReservationsByBusId,
  createReservation,
  verifyQRCode,
};
