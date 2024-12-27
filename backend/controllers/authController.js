const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmailDriverPassword = require("../utils/emailSendDriverPassUtil");
const generateEmailTemplateforDriver = require("../simulation/emailSendPassword");

const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "JWT secret is not configured" });
        }
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

// Send email with login credentials
const sendPasswordEmail = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Prepare Email Content
        const emailHtml = generateEmailTemplateforDriver({
            email: email,
            password: password,

        });

        // Send Email with QR Code
        await sendEmailDriverPassword(email, "Reservation Confirmation", emailHtml);

        res.status(200).json({ message: "Email sent successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to send email" });
    }
};

module.exports = { register, login, sendPasswordEmail };
