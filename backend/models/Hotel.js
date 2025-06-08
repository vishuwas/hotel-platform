const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, default: 0 },
  amenities: [String],
  pricePerNight: { type: Number, required: true },
  category: {
    type: String,
    enum: ["Budget", "Standard", "Luxury"],
    default: "Standard",
  },
  visits: { type: Number, default: 0 }, // ✅ Track how many times a hotel has been visited
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
