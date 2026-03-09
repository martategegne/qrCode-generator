import axios from "axios";

// Use localhost for development, Render backend for production
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://qrcode-generator-free.onrender.com";

// --- Generate QR Function ---
export const generateQR = (data) => {
  return axios.post(`${BASE_URL}/api/qr/generate`, { data });
};