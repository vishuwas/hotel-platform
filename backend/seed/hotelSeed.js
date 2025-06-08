const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Hotel = require("../models/Hotel");

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("✅ Connected to MongoDB for seeding");

  const sampleHotels = [
    {
      name: "Grand Palace Hotel",
      location: "New York",
      rating: 4.5,
      amenities: ["WiFi", "Pool", "Spa", "Gym"],
      pricePerNight: 150,
      category: "Luxury",
    },
    {
      name: "Budget Inn",
      location: "San Francisco",
      rating: 3.8,
      amenities: ["WiFi", "Breakfast"],
      pricePerNight: 70,
      category: "Budget",
    },
    {
      name: "Ocean View Resort",
      location: "Miami",
      rating: 4.7,
      amenities: ["WiFi", "Pool", "Beach Access"],
      pricePerNight: 180,
      category: "Luxury",
    },
  ];

  try {
    await Hotel.deleteMany(); // Clear existing data
    await Hotel.insertMany(sampleHotels);
    console.log("✅ Sample hotels seeded!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding hotels:", err.message);
    process.exit(1);
  }
});
