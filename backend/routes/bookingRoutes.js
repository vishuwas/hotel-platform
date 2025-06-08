const express = require("express");
const {
  createBooking,
  createDraftBooking,
  getMyBookings,
  getAllBookings,
} = require("../controllers/bookingController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/draft", authMiddleware, createDraftBooking);

// Authenticated user routes
router.post("/", authMiddleware, createBooking);
router.get("/me", authMiddleware, getMyBookings);

// ✅ Admin route to fetch all bookings
router.get("/admin/bookings", adminMiddleware, getAllBookings);

module.exports = router;
