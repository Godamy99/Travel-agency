const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  message: { type: String, required: true },
  sentDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", notificationSchema);
