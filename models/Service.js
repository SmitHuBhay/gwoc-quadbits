const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: String,
  description: String,
  benefits: [String],
  durationOptions: [String],
  price: Number
});

module.exports = mongoose.model("Service", serviceSchema);
