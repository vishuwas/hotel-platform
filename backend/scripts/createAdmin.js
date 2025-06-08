const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = new User({
    name: "Admin User",
    email: "admin@example.com",
    password: hashedPassword,
    isAdmin: true,
  });

  await admin.save();
  console.log("✅ Admin user created");
  mongoose.disconnect();
};

createAdmin();
