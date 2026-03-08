import axios from "axios";

export const generateQR = (data) => {
  return axios.post("http://localhost:5000/api/qr/generate", {
    data
  });
};