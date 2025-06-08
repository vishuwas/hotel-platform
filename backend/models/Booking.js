const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  status: { type: String, enum: ["draft", "completed"], default: "draft" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
