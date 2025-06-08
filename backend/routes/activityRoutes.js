const express = require("express");
const {
  createDraftBooking,
  completeBooking,
  getHotelActivityStats,
  logVisit,
} = require("../controllers/activityController");

const router = express.Router();

router.post("/visit", logVisit);
router.post("/draft", createDraftBooking);
router.post("/complete", completeBooking);

// 👇 Register the stats route only once
router.get("/stats/:hotelId", getHotelActivityStats);

module.exports = router;
