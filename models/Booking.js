const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  service: String,
  date: String,
  timeSlot: String,
  name: String,
  phone: String,
  email: String,
  paymentMode: String
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
