const express = require("express");
const feedbackController = require("../controllers/feedbackController");

const router = express.Router();

router.post("/add", feedbackController.storeFeedback);
router.get("/feedbacks", feedbackController.getFeedbacks);
router.delete("/delete/:id", feedbackController.deleteFeedback);

module.exports = router;
