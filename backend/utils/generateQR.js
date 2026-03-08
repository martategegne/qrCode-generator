const QRCode = require("qrcode");

async function generateQR(data) {
  return await QRCode.toDataURL(data, {
    errorCorrectionLevel: "H",
    width: 400
  });
}

module.exports = generateQR;