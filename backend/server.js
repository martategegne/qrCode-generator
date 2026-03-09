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

// --- CORS Setup ---
// Allow requests from local frontend (ports 3000 & 5173) and deployed Netlify frontend
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://qrcode-generator-freeweb.netlify.app" // your real Netlify URL
    ],
  })
);

// --- Rate Limiter ---
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
});
app.use(limiter);

// --- Database Connection ---
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/qrcodeDB";

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// --- Routes ---
app.use("/api/qr", qrRoutes);

// --- Default Route (Optional) ---
// Visiting backend root shows a simple message
app.get("/", (req, res) => {
  res.send("QR Code Backend is running!");
});

// --- Server Startup ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});