
const express = require("express");
const { getAllAccounts, deleteAccount } = require("../controllers/accountController");

const router = express.Router();

// Get all accounts
router.get("/", getAllAccounts);

// Delete a specific account
router.delete("/:id", deleteAccount);

module.exports = router;
