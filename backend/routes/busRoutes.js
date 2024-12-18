const express = require("express");
const multer = require("multer");
const router = express.Router();
const { getAllBuses, addBus, getBusById,getBusesByDriver,deleteBus } = require("../controllers/busController");

// Route to get all buses
router.get("/", getAllBuses);



// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  });
  const upload = multer({ storage });


// Route to add a new bus
router.post("/", upload.single("image"),addBus);


// Route to get a specific bus by ID
router.get("/:id", getBusById);

// Route to fetch buses for a specific driver
router.get("/driver/:driverId", getBusesByDriver);

// Delete a bus (admin or specific driver access)
router.delete("/:id", deleteBus);

module.exports = router;

