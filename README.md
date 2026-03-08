# qrCode-generator
This is a full-stack QR Code Generator built with React (frontend) and Node.js + Express + MongoDB (backend). Users can generate QR codes from text or URLs, view them, download them as images, and track how many times a QR code has been scanned.

**Features**

enerate QR codes for any type of content: email, text, website, app, or social media links.

Display QR codes instantly in the browser.

Download QR codes as PNG images.

Track how many times a QR code has been scanned (stored in MongoDB).

Quick, responsive, and user-friendly interface.

Backend includes validation, rate-limiting, and security headers.
**Tech Stack**

Frontend: React, JavaScript, Axios

Backend: Node.js, Express, Mongoose, Validator, Helmet, Rate Limiter, CORS

Database: MongoDB

QR Generation: qrcode npm package

**Users can generate QR codes for:**

Email addresses

Text messages

Website URLs

Links to apps

Social media profiles

…all in just a few seconds, with the QR code ready to view or download instantly.

**How It Works**

1, User enters an email, text, website URL, app link, or social media profile in the input field.

2, The frontend sends a POST request to the backend API (/api/qr/generate).

3, The backend validates the input, generates a QR code (Data URL), and stores the data in MongoDB.

5, The frontend displays the QR code immediately and provides a download link.

6, Each time a QR code is accessed via its scan URL, the scan count is incremented.

**Purpose / Motivation**

Most QR code generators today are premium or require technical knowledge, which can be a barrier for people in countries with limited internet access or for new tech learners.

The current systems often do not support inclusive technology learning, making advanced tools available only to professionals.

This QR Code Generator was developed to:

Encourage new tech learners to experiment with digital tools.

Promote tech development globally, making software accessible to everyone.

Include all parts of the community in the digital and tech ecosystem, regardless of location or technical experience.

By providing a fast, simple, and free QR generator, this project aims to bridge the gap and make modern technology usable and understandable by a wider audience.
