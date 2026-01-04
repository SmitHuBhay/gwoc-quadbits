const mongoose = require("mongoose");

const comboSchema = new mongoose.Schema({
  name: String,
  servicesIncluded: [String],
  originalPrice: Number,
  discountedPrice: Number,
  timeIncluded: String,
  badge: String
});

module.exports = mongoose.model("Combo", comboSchema);
