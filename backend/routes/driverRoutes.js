const express = require("express");
const { getAllDrivers, deleteDriver, updateBus } = require("../controllers/driverController");
const verifyToken = require("../middlewares/authMiddleware");
const multer = require("multer");

const router = express.Router();

// Get all drivers
router.get("/", verifyToken, getAllDrivers);

// Delete a specific driver
router.delete("/:id", verifyToken, deleteDriver);

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
router.put("/:id", upload.single("image"), updateBus);


module.exports = router;
