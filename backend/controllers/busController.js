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
    const { number, route, seats, departureTime, arrivalTime, date, driverId } = req.body;

    if (!number || !route || !seats || !departureTime || !arrivalTime || !date || !driverId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const bus = new Bus({ number, route, seats, departureTime, arrivalTime, date, driverId });
    await bus.save();

    res.status(201).json({ message: "Bus added successfully", bus });
  } catch (error) {
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


// Fetch buses for a specific driver
const getBusesByDriver = async (req, res) => {
  const { driverId } = req.params; // Get driverId from URL params

  try {
    // Validate driverId
    if (!driverId) {
      return res.status(400).json({ message: "Driver ID is required" });
    }

    // Fetch buses assigned to the driver
    const buses = await Bus.find({ driverId });

    if (buses.length === 0) {
      return res.status(404).json({ message: "No buses found for this driver" });
    }

    res.status(200).json(buses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch buses for this driver", error: err.message });
  }
};
const deleteBus = async (req, res) => {
  try {
    const { id } = req.params;

    const bus = await Bus.findByIdAndDelete(id);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.status(200).json({ message: "Bus deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete bus", error: err.message });
  }
};


module.exports = { getAllBuses, addBus, getBusById ,getBusesByDriver , deleteBus};
