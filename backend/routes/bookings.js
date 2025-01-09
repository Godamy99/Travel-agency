const express = require("express");
const Booking = require("../models/booking");
const router = express.Router();

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("clientId tripId");
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new booking
router.post("/", async (req, res) => {
  const { clientId, tripId, bookingDate } = req.body;

  try {
    const booking = new Booking({ clientId, tripId, bookingDate });
    await booking.save();
    res.status(201).json({ message: "Booking added successfully", booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
