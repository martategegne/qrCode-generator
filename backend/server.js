const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const qrRoutes = require("./routes/QRroute");

const app = express();

// --- Middleware ---
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"]
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// --- Database Connection ---
mongoose.connect("mongodb://127.0.0.1:27017/qrcodeDB")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB:", err));

// --- Routes ---
app.use("/api/qr", qrRoutes);

// --- Server Startup ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});