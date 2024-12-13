const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema({
  number: String,
  route: String,
  seats: Number,
  departureTime: String,
  arrivalTime: String,
});

module.exports = mongoose.model("Bus", BusSchema);
