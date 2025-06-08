const Booking = require("../models/Booking");

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user hotel");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

module.exports = { getAllBookings };
