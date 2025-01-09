const express = require("express");
const auth = require("../middleware/auth");
const Admin = require("../models/admin");
const router = express.Router();

// Protected route (example)
router.get("/dashboard", auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);
    res.status(200).json({ message: "Welcome to the admin dashboard", admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
