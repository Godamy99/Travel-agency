const express = require("express");
const Notification = require("../models/notification");
const router = express.Router();

// Get all notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find().populate("clientId");
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new notification
router.post("/", async (req, res) => {
  const { clientId, message } = req.body;

  try {
    const notification = new Notification({ clientId, message });
    await notification.save();
    res
      .status(201)
      .json({ message: "Notification added successfully", notification });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
