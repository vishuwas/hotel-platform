const Hotel = require("../models/Hotel");

// GET /api/hotels
const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({});
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
};

// POST /api/hotels/:id/visit
const Activity = require("../models/Activity"); // 👈 Add this line

const trackVisit = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    // Increment visit count in hotel
    hotel.visits += 1;
    await hotel.save();

    // Log visit as user activity (if authenticated)
    if (req.user?.userId) {
      const activity = new Activity({
        user: req.user.userId,
        hotel: hotel._id,
        type: "visit",
      });
      await activity.save();
    }

    res.json({ message: "Visit recorded", visits: hotel.visits });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to track visit" });
  }
};

const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ error: "Hotel not found" });
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch hotel" });
  }
};

module.exports = {
  getAllHotels,
  getHotelById,
  trackVisit,
};
