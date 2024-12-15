const mongoose = require("mongoose");
const Bus = require("../models/Bus");

// Get all buses
const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch buses" });
  }
};

// Add a new bus
const addBus = async (req, res) => {
  try {
    const { number, route, seats, departureTime, arrivalTime } = req.body;

    const bus = new Bus({
      number,
      route,
      seats,
      departureTime,
      arrivalTime,
    });

    await bus.save();
    res.status(201).json({ message: "Bus added successfully", bus });
  } catch (err) {
    res.status(500).json({ message: "Failed to add bus" });
  }
};

// Get a specific bus by ID
const getBusById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ID is valid
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid bus ID" });
    }

    const bus = await Bus.findById(id);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.json(bus);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bus details" });
  }
};

module.exports = { getAllBuses, addBus, getBusById };