const express = require("express");
const Trip = require("../models/trip");
const router = express.Router();

// Get all trips
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new trip
router.post("/", async (req, res) => {
  const { destination, date, price, description } = req.body;

  try {
    const trip = new Trip({ destination, date, price, description });
    await trip.save();
    res.status(201).json({ message: "Trip added successfully", trip });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
