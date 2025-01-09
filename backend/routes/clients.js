const express = require("express");
const Client = require("../models/client");
const router = express.Router();

// Get all clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new client
router.post("/", async (req, res) => {
  const { name, email, phone, address } = req.body;

  try {
    const client = new Client({ name, email, phone, address });
    await client.save();
    res.status(201).json({ message: "Client added successfully", client });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
