const express = require("express");
const router = express.Router();
const { getAllHotels, trackVisit } = require("../controllers/hotelController");
const authMiddleware = require("../middleware/authMiddleware");
const { getHotelById } = require("../controllers/hotelController");

router.get("/", getAllHotels);
router.get("/:id", getHotelById);
router.post("/:id/visit", authMiddleware, trackVisit);

module.exports = router;
