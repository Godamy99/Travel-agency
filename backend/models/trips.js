const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Trip", tripSchema);
