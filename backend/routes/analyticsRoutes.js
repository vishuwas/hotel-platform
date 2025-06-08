const express = require("express");
const { getAnalytics } = require("../controllers/analyticsController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Protect this route by allowing only admin users
router.get("/", authMiddleware, adminMiddleware, getAnalytics);

module.exports = router;
