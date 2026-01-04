const router = require("express").Router();
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");

// User booking
router.post("/", async (req, res) => {
  const booking = await Booking.create(req.body);
 res.redirect("/success");
});

// Admin view bookings
router.get("/", auth, async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
});

module.exports = router;
