const Feedback = require("../models/Feedback"); // Import the Feedback model

// Controller to handle feedback submission
const feedbackController = {
    async storeFeedback(req, res) {
        try {
            const {name, email, busNumber, complaint, submittedAt} = req.body;

            // Validate required fields
            if (!name || !email || !busNumber || !complaint || !submittedAt) {
                return res.status(400).json({message: "All fields, including submittedAt, are required."});
            }

            // Create a new feedback entry
            const newFeedback = new Feedback({
                name,
                email,
                busNumber,
                complaint,
                submittedAt: new Date(submittedAt), // Convert to Date object for database storage
            });

            // Save the feedback to the database
            await newFeedback.save();

            return res.status(201).json({message: "Feedback submitted successfully."});
        } catch (error) {
            console.error("Error saving feedback:", error);
            return res.status(500).json({message: "An error occurred while submitting feedback."});
        }
    },


    async getFeedbacks(req, res) {
        try {
            // Fetch all feedbacks from the database
            const feedbacks = await Feedback.find();

            // Return feedbacks in response
            return res.status(200).json({feedbacks});
        } catch (error) {
            console.error("Error fetching feedbacks:", error);
            return res.status(500).json({message: "An error occurred while fetching feedbacks."});
        }
    },


    async deleteFeedback(req, res) {
        try {
            const {id} = req.params;

            // Validate the ID
            if (!id) {
                return res.status(400).json({message: "Feedback ID is required."});
            }

            // Find and delete the feedback
            const deletedFeedback = await Feedback.findByIdAndDelete(id);

            // Check if feedback was found and deleted
            if (!deletedFeedback) {
                return res.status(404).json({message: "Feedback not found."});
            }

            return res.status(200).json({message: "Feedback deleted successfully."});
        } catch (error) {
            console.error("Error deleting feedback:", error);
            return res.status(500).json({message: "An error occurred while deleting feedback."});
        }
    },
};

module.exports = feedbackController;
