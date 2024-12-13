const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus" },
  seatNumber: Number,
  passengerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: String,
});

module.exports = mongoose.model("Reservation", ReservationSchema);
