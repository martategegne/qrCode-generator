import React, { useState, useEffect } from "react";
import { generateQR } from "./api";
import "./QRGenerator.css";

function QRGenerator() {
  const [text, setText] = useState("");
  const [qr, setQr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("qr-theme");
    if (saved) return saved;
    return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("qr-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    setError("");
    try {
      const res = await generateQR(text);
      setQr(res.data.qrImage);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate QR code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    setQr("");
    setText("");
    setError("");
  };

  return (
    <div className="qr-generator">
      <button
        type="button"
        onClick={toggleTheme}
        className="qr-generator__theme-toggle"
        aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        title={theme === "light" ? "Dark mode" : "Light mode"}
      >
        <span className="qr-generator__theme-icon" aria-hidden="true">
          {theme === "light" ? "☀" : "☾"}
        </span>
        <span className="qr-generator__theme-label">{theme === "light" ? "Dark" : "Light"}</span>
      </button>

      <header className="qr-generator__header">
        <h1 className="qr-generator__title">
          <span className="qr-generator__icon" aria-hidden="true">▣</span>
          QR Code Generator
        </h1>
      </header>

      {!qr ? (
        <section className="qr-generator__input-section" aria-labelledby="input-heading">
          <h2 id="input-heading" className="qr-generator__section-title">
            Step 1 — Enter text or URL
          </h2>
          <div className="qr-generator__input-group">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder="e.g. https://example.com or Hello World"
              className="qr-generator__input"
              aria-label="Enter URL or text for QR code"
              autoFocus
            />
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isLoading || !text.trim()}
              className="qr-generator__btn qr-generator__btn--primary"
              aria-label={isLoading ? "Generating" : "Generate QR code"}
            >
              <span className="qr-generator__btn-text">
                {isLoading ? "Generating…" : "Generate"}
              </span>
              <span className="qr-generator__btn-shape" aria-hidden="true">▶</span>
            </button>
          </div>
          {error && (
            <p className="qr-generator__error" role="alert">
              <span className="qr-generator__error-icon" aria-hidden="true">⚠</span>
              {error}
            </p>
          )}
        </section>
      ) : (
        <section className="qr-generator__result-section" aria-labelledby="result-heading">
          <h2 id="result-heading" className="qr-generator__section-title">
            Step 2 — Your QR code
          </h2>
          <div className="qr-generator__result-card">
            <div className="qr-generator__qr-wrapper">
              <img src={qr} alt="Generated QR code" className="qr-generator__qr-image" />
            </div>
            <div className="qr-generator__actions">
              <a
                href={qr}
                download="qrcode.png"
                className="qr-generator__btn qr-generator__btn--download"
                aria-label="Download QR code as PNG"
              >
                <span className="qr-generator__btn-icon" aria-hidden="true">⬇</span>
                Download PNG
              </a>
              <button
                type="button"
                onClick={handleGoBack}
                className="qr-generator__btn qr-generator__btn--secondary"
                aria-label="Go back to create another QR code"
              >
                <span className="qr-generator__btn-icon" aria-hidden="true">↩</span>
                Create another
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default QRGenerator;
