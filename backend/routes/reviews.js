const express = require("express");
const Review = require("../models/review");
const router = express.Router();

// Get all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().populate("clientId tripId");
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new review
router.post("/", async (req, res) => {
  const { clientId, tripId, rating, comment } = req.body;

  try {
    const review = new Review({ clientId, tripId, rating, comment });
    await review.save();
    res.status(201).json({ message: "Review added successfully", review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
