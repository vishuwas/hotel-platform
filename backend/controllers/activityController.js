const Booking = require("../models/Booking");
const Activity = require("../models/Activity");

const createDraftBooking = async (req, res) => {
  const { userId, hotelId } = req.body;

  try {
    const draft = new Booking({
      user: userId,
      hotel: hotelId,
      status: "draft",
    });
    await draft.save();
    res.status(201).json({ message: "Draft booking created", draft });
  } catch (err) {
    res.status(500).json({ error: "Error creating draft booking" });
  }
};

const completeBooking = async (req, res) => {
  const { bookingId } = req.body;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking || booking.status === "completed") {
      return res
        .status(404)
        .json({ error: "Booking not found or already completed" });
    }

    booking.status = "completed";
    await booking.save();

    res.json({ message: "Booking completed", booking });
  } catch (err) {
    res.status(500).json({ error: "Error completing booking" });
  }
};

const getHotelActivityStats = async (req, res) => {
  const hotelId = req.params.hotelId;

  try {
    const drafts = await Booking.countDocuments({
      hotel: hotelId,
      status: "draft",
    });

    const completed = await Booking.countDocuments({
      hotel: hotelId,
      status: "completed",
    });

    const visits = await Activity.countDocuments({
      hotel: hotelId,
      type: "visit",
    });

    res.json({
      hotelId,
      visits,
      draftBookings: drafts,
      completedBookings: completed,
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching activity stats" });
  }
};

const logVisit = async (req, res) => {
  const { hotelId } = req.body;
  const userId = req.user?.userId || req.body.userId; // If using auth middleware

  if (!hotelId || !userId) {
    return res.status(400).json({ error: "Missing hotelId or userId" });
  }

  try {
    const visit = new Activity({ user: userId, hotel: hotelId, type: "visit" });
    await visit.save();
    res.status(201).json({ message: "Visit logged successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to log visit" });
  }
};

module.exports = {
  createDraftBooking,
  completeBooking,
  getHotelActivityStats,
  logVisit,
};
