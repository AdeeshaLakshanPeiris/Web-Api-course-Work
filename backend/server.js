const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/authRoutes");
const busRoutes = require("./routes/busRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/reservations", reservationRoutes);

require('dotenv').config();

// MongoDB Connection

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/busReservation";


mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
    });

// Start Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
