const router = require("express").Router();
const Service = require("../models/Service");
const Combo = require("../models/Combo");
const auth = require("../middleware/auth");

// Public
router.get("/", async (req, res) => {
  const services = await Service.find();
  const combos = await Combo.find();
  res.json({ services, combos });
});

// Admin
router.post("/", auth, async (req, res) => {
  const service = await Service.create(req.body);
  res.json(service);
});

router.post("/combo", auth, async (req, res) => {
  const combo = await Combo.create(req.body);
  res.json(combo);
});

module.exports = router;
