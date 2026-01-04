const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const auth = require("../middleware/auth");

// Login
router.post("/login", async (req, res) => {
  const admin = await Admin.findOne({ username: req.body.username });
  if (!admin) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(req.body.password, admin.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  req.session.admin = true;
  res.json({ message: "Login successful" });
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
});

module.exports = router;
