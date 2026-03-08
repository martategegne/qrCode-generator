const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema({
  data: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  scans: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("QR", qrSchema);