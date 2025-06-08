const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");

const getRecommendations = async (req, res) => {
  const userId = req.user.userId; // Authenticated user's ID from JWT

  try {
    // Step 1: Get all bookings of user (draft + completed)
    const userBookings = await Booking.find({ user: userId }).populate("hotel");

    // If no bookings found, fallback to most visited hotels overall
    if (!userBookings.length) {
      const fallbackHotels = await Hotel.find()
        .sort({ visits: -1 }) // Assuming 'visits' field counts popularity
        .limit(5);

      return res.json({
        message: "No activity found.",
        recommendedHotels: fallbackHotels,
      });
    }

    // Step 2: Extract unique locations and categories from past bookings
    const visitedCities = new Set();
    const categories = new Set();
    const bookedHotelIds = new Set();

    userBookings.forEach((booking) => {
      if (booking.hotel) {
        visitedCities.add(booking.hotel.location);
        categories.add(booking.hotel.category);
        bookedHotelIds.add(booking.hotel._id.toString());
      }
    });

    // Step 3: Find hotels NOT already booked by user but matching location or category
    let recommendedHotels = await Hotel.find({
      _id: { $nin: Array.from(bookedHotelIds) },
      $or: [
        { location: { $in: Array.from(visitedCities) } },
        { category: { $in: Array.from(categories) } },
      ],
    }).sort({ visits: -1 }); // Sort by popularity

    // Step 4: Fallback to highly rated hotels if no direct matches found
    if (recommendedHotels.length === 0) {
      recommendedHotels = await Hotel.find({
        _id: { $nin: Array.from(bookedHotelIds) },
      })
        .sort({ rating: -1 })
        .limit(5);

      return res.json({
        message: "No direct matches found. Here are some highly-rated options:",
        recommendedHotels,
      });
    }

    // Return recommended hotels
    res.json({ recommendedHotels });
  } catch (err) {
    console.error("Error in getRecommendations:", err);
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
};

module.exports = { getRecommendations };
