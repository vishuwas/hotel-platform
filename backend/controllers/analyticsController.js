const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");

const getAnalytics = async (req, res) => {
  try {
    // 1. **Get Most Booked Hotels**
    const mostBookedHotels = await Booking.aggregate([
      { $match: { status: "completed" } },
      {
        $group: {
          _id: "$hotel",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "hotels",
          localField: "_id",
          foreignField: "_id",
          as: "hotel",
        },
      },
      { $unwind: "$hotel" },
      { $sort: { count: -1 } }, // Sort by the number of bookings, descending
      { $limit: 5 }, // Get top 5 most booked hotels
    ]);

    // 2. **Get Total Completed Bookings**
    const totalBookings = await Booking.countDocuments({ status: "completed" });

    // 3. **Get Popular Cities (based on hotel location)**
    const popularCities = await Booking.aggregate([
      { $match: { status: "completed" } },
      {
        $lookup: {
          from: "hotels",
          localField: "hotel",
          foreignField: "_id",
          as: "hotelDetails",
        },
      },
      { $unwind: "$hotelDetails" },
      {
        $group: {
          _id: "$hotelDetails.location", // Group by location
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } }, // Sort by number of bookings, descending
      { $limit: 5 }, // Get top 5 most popular cities
    ]);

    // 4. **Get Most Booked Hotel Categories**
    const mostBookedCategories = await Booking.aggregate([
      { $match: { status: "completed" } },
      {
        $lookup: {
          from: "hotels",
          localField: "hotel",
          foreignField: "_id",
          as: "hotelDetails",
        },
      },
      { $unwind: "$hotelDetails" },
      {
        $group: {
          _id: "$hotelDetails.category", // Group by hotel category
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } }, // Sort by number of bookings, descending
      { $limit: 5 }, // Get top 5 most booked categories
    ]);

    // Respond with analytics data
    res.json({
      mostBookedHotels,
      totalBookings,
      popularCities,
      mostBookedCategories,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
};

module.exports = { getAnalytics };
