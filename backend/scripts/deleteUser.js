const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const deleted = await User.deleteOne({ email: "vishwas@example.com" });
  console.log("Deleted:", deleted);
  process.exit();
});
