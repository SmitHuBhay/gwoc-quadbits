const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const path = require("path");

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.get("/", (req, res) => {
  res.render("index");
});
const Booking = require("./models/Booking");

// Home (booking form)
app.get("/", (req, res) => {
  res.render("index");
});

// After booking success
app.get("/success", (req, res) => {
  res.render("success");
});

// View bookings (admin UI)
app.get("/bookings", async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.render("bookings", { bookings });
});

// Admin login UI
app.get("/admin-ui", (req, res) => {
  res.render("admin");
});



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
