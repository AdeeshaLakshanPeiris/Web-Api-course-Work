const Feedback = require("../models/feedback"); // Import the Feedback model

// Controller to handle feedback submission
const feedbackController = {
    async storeFeedback(req, res) {
        try {
            const { name, email, busNumber, complaint } = req.body;

            // Validate required fields
            if (!name || !email || !busNumber || !complaint) {
                return res.status(400).json({ message: "All fields are required." });
            }

            // Create a new feedback entry
            const newFeedback = new Feedback({
                name,
                email,
                busNumber,
                complaint
            });

            // Save the feedback to the database
            await newFeedback.save();

            return res.status(201).json({ message: "Feedback submitted successfully." });
        } catch (error) {
            console.error("Error saving feedback:", error);
            return res.status(500).json({ message: "An error occurred while submitting feedback." });
        }
    }
};

module.exports = feedbackController;
