const express = require("express");
const feedbackController = require("../controllers/feedbackController");

const router = express.Router();

router.post("/add", feedbackController.storeFeedback);

module.exports = router;
