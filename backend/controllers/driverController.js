
const Driver = require("../models/User"); // Assuming User model has a role field
const mongoose = require("mongoose");

// Fetch all drivers
const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({ role: "driver" }); // Filter by role
    res.status(200).json(drivers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch drivers", error: err.message });
  }
};

// Delete a specific driver
const deleteDriver = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid driver ID" });
  }

  try {
    const deletedDriver = await Driver.findByIdAndDelete(id);

    if (!deletedDriver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.status(200).json({ message: "Driver deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete driver", error: err.message });
  }
};

module.exports = { getAllDrivers, deleteDriver };
