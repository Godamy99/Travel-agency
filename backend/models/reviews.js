const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
});

module.exports = mongoose.model("Review", reviewSchema);
