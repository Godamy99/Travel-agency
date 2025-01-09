const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
  bookingDate: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Booking", bookingSchema);
