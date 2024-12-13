const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  busId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Bus", 
    required: true 
  },
  seatNumber: { 
    type: Number, 
    required: true 
  },
  passengerName: { 
    type: String, 
    required: true 
  }, // Save passenger's name
  passengerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }, // Save passenger's ID
  date: { 
    type: String, 
    required: true 
  },
});

module.exports = mongoose.model("Reservation", ReservationSchema);
