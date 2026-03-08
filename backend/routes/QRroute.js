const express = require("express");
const validator = require("validator");

const QR = require("../models/QR");
const generateQR = require("../utils/generateQR");

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !validator.isLength(data, { min: 1, max: 500 })) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const qrImage = await generateQR(data);

    const qr = new QR({ data });
    await qr.save();

    res.json({
      qrImage,
      id: qr._id
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/scan/:id", async (req, res) => {
  try {
    const qr = await QR.findById(req.params.id);

    if (!qr) return res.status(404).send("Not found");

    qr.scans += 1;
    await qr.save();

    // Validate redirect URL to prevent open redirect attacks (only allow http/https)
    const url = qr.data;
    if (!validator.isURL(url, { protocols: ["http", "https"], require_protocol: true })) {
      return res.status(400).send("Invalid redirect URL");
    }

    res.redirect(url);
  } catch (err) {
    console.error("GET /scan/:id error:", err);
    res.status(500).json({
      error: "Server error",
      message: process.env.NODE_ENV !== "production" ? err.message : undefined
    });
  }
});

module.exports = router;