const express = require("express");
const router = express.Router();

// Import Controllers
const { getAllBookings } = require("../controllers/adminController");

// Import Middleware
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware"); // Verify if the user is an admin

// Route to get all bookings across users
router.get("/bookings/all", authMiddleware, adminMiddleware, getAllBookings);

module.exports = router;
