const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user").populate("hotel");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch all bookings" });
  }
};

// POST /api/bookings
const createBooking = async (req, res) => {
  const { hotelId, status } = req.body;

  try {
    const booking = new Booking({
      hotel: hotelId,
      user: req.user.userId,
      status: status || "draft", // Allow "draft" or default to "completed"
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: "Booking failed" });
  }
};

// GET /api/bookings/me
const getMyBookings = async (req, res) => {
  const query = { user: req.user.userId };
  if (req.query.status) query.status = req.query.status;

  try {
    const bookings = await Booking.find(query).populate("hotel");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

const createDraftBooking = async (req, res) => {
  try {
    const { hotelId, checkIn, checkOut } = req.body;
    const userId = req.user.userId; // pulled from token

    if (!hotelId || !checkIn || !checkOut) {
      return res.status(400).json({ error: "Missing booking details" });
    }

    const booking = new Booking({
      hotel: hotelId,
      user: userId,
      checkIn,
      checkOut,
      status: "draft",
    });

    await booking.save();

    res.status(201).json({
      message: "Draft booking created successfully",
      booking,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create draft booking" });
  }
};

module.exports = {
  createBooking,
  createDraftBooking,
  getMyBookings,
  getAllBookings,
};
