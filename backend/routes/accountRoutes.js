
const express = require("express");
const { getAllAccounts, deleteAccount } = require("../controllers/accountController");

const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");

// Get all accounts
router.get("/",     verifyToken, getAllAccounts);

// Delete a specific account
router.delete("/:id", verifyToken, deleteAccount);

module.exports = router;
