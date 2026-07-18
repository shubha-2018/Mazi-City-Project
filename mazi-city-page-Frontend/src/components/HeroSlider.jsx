// src/components/HeroSlider.jsx

import { useState, useEffect } from "react";
import ii1 from "../assets/ii1.png";
import i2 from "../assets/i2.png";
import i3 from "../assets/i3.png";

const slides = [ii1, i2, i3];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-wrapper">
        <div className="hero-container">

          {slides.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Slide ${i + 1}`}
              className={`hero-img ${current === i ? "active" : ""}`}
            />
          ))}

          <div className="hero-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className={`hero-dot ${current === i ? "active" : ""}`}
              />
            ))}
          </div>

        </div>
      </div>

      <style>{`
        .hero-section {
          width: 100%;
          padding: 12px 16px;
          background-color: #ffffff;
          box-sizing: border-box;
        }

        .hero-wrapper {
          max-width: 1100px;
          width: 100%;
          margin: 0 auto;
        }

        /*
          KEY CHANGE: single fixed ratio (your image's natural ratio 731/2140 ≈ 34.2%)
          stays consistent on ALL screen sizes — no breakpoint overrides that
          squash it into a square or portrait shape.
        */
        .hero-container {
          position: relative;
          width: 100%;
          padding-bottom: 34.2%;
          height: 0;
          overflow: hidden;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
          background-color: #eef2f6;
        }

        .hero-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          opacity: 0;
          transition: opacity 0.4s ease-in-out;
        }

        .hero-img.active {
          opacity: 1;
        }

        .hero-dots {
          position: absolute;
          bottom: 14px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 10;
        }

        .hero-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          border: none;
          background: rgba(255,255,255,0.6);
          cursor: pointer;
          padding: 0;
          transition: all 0.3s;
        }

        .hero-dot.active {
          width: 24px;
          background: #3b82f6;
        }

        /* Only adjust padding/radius on small screens — NOT the aspect ratio */
        @media (max-width: 768px) {
          .hero-section { padding: 8px 12px; }
          .hero-container { border-radius: 12px; }
        }

        @media (max-width: 480px) {
          .hero-section { padding: 6px 8px; }
          .hero-container { border-radius: 10px; }
          .hero-dots { bottom: 10px; }
          .hero-dot { width: 7px; height: 7px; }
          .hero-dot.active { width: 20px; }
        }

        @media (max-width: 360px) {
          .hero-container { border-radius: 8px; }
          .hero-dots { bottom: 8px; }
        }
      `}</style>
    </section>
  );
}