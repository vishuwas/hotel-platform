const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("✅ Connected to MongoDB");

  const sampleUsers = [
    {
      name: "Vishwas Sharma",
      email: "vishwas@example.com",
      password: "password123", // hash via pre-save hook
      role: "admin",
      isAdmin: true,
    },
    {
      name: "Jane Doe",
      email: "jane@example.com",
      password: "password123",
    },
    {
      name: "John Smith",
      email: "john@example.com",
      password: "password123",
    },
  ];

  try {
    await User.deleteMany(); // Remove previous users
    const insertedUsers = await User.insertMany(sampleUsers);
    console.log("✅ Users seeded:");
    console.log(insertedUsers);
    process.exit();
  } catch (err) {
    console.error("❌ Failed to seed users:", err.message);
    process.exit(1);
  }
});
