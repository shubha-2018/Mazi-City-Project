import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-card">
        <div className="container">

          {/* Top grid */}
          <div className="footer-grid">

            {/* Brand col */}
            <div className="footer-brand">
              {/* Logo */}
              <div className="footer-logo">
                <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="52" height="52" rx="13" fill="#1a73e8"/>
                  <path
                    d="M16 34 C16 26,26 18,26 18 C26 18,36 26,36 34"
                    stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"
                  />
                  <circle cx="26" cy="31" r="4" fill="#f5a623"/>
                  <line x1="24" y1="31" x2="24" y2="33" stroke="#1a73e8" strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="26" y1="30" x2="26" y2="33" stroke="#1a73e8" strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="28" y1="31" x2="28" y2="33" stroke="#1a73e8" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <div className="logo-text">
                  MAZI <span>CITY</span>
                </div>
              </div>

              <p className="footer-tagline">
                Connecting local businesses with their community across Maharashtra.
              </p>

              {/* Social icons */}
              <div className="social-row">
                <a href="#" className="social-btn" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                </a>
                <a href="#" className="social-btn" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                <a href="#" className="social-btn" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#252525"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Company col */}
            <div className="footer-col">
              <h5>Company</h5>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/careers">Careers</Link></li>
              </ul>
            </div>

            {/* Services col */}
            <div className="footer-col">
              <h5>Services</h5>
              <ul>
                <li><Link to="/shops?cat=grocery">Grocery</Link></li>
                <li><Link to="/shops?cat=electronics">Electronics</Link></li>
                <li><Link to="/shops?cat=clothing">Clothing</Link></li>
                <li><Link to="/shops?cat=medical">Medical</Link></li>
                <li><Link to="/shops?cat=restaurant">Restaurants</Link></li>
              </ul>
            </div>

            {/* Cities col */}
            <div className="footer-col">
              <h5>Cities</h5>
              <ul>
                <li><Link to="/shops?city=Pune">Pune</Link></li>
                <li><Link to="/shops?city=Mumbai">Mumbai</Link></li>
                <li><Link to="/shops?city=Nagpur">Nagpur</Link></li>
                <li><Link to="/shops?city=Nashik">Nashik</Link></li>
                <li><Link to="/shops?city=Kolhapur">Kolhapur</Link></li>
                <li><Link to="/shops?city=Solapur">Solapur</Link></li>
              </ul>
            </div>

            {/* Legal col */}
            <div className="footer-col">
              <h5>Legal</h5>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms &amp; Conditions</a></li>
                <li><a href="#">Cookie Policy</a></li>
              </ul>
            </div>

          </div>

          {/* Divider */}
          <div className="footer-divider" />

          {/* Bottom bar */}
          <div className="footer-bottom">
            <p>© 2026 Mazi City. All Rights Reserved.</p>
            <div className="footer-credit">
              <span className="credit-label">Designed &amp; Developed by</span>
              <a href="#" className="credit-link">Wisdom Tech IT Services</a>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .footer {
          background: #1c1c1c;
          padding: 32px 16px;
          margin-top: 40px;
        }

        .footer-card {
          background: #252525;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 48px 40px 32px;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Logo */
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .footer-logo svg {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
        }
        .logo-text {
          font-size: 22px;
          font-weight: 900;
          color: #fff;
          letter-spacing: 1px;
          line-height: 1;
        }
        .logo-text span { color: #f5a623; }

        .footer-tagline {
          font-size: 13px;
          color: #999;
          line-height: 1.7;
          max-width: 220px;
          margin-bottom: 22px;
        }

        /* Social */
        .social-row { display: flex; gap: 10px; }
        .social-btn {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #aaa;
          transition: all 0.2s;
          text-decoration: none;
        }
        .social-btn svg { width: 17px; height: 17px; }
        .social-btn:hover {
          background: #1a73e8;
          border-color: #1a73e8;
          color: #fff;
        }

        /* Grid */
        .footer-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1fr 1fr;
          gap: 32px;
          margin-bottom: 40px;
        }

        /* Column headings — BLUE */
        .footer-col h5 {
          font-size: 13px;
          font-weight: 700;
          color: #4da6ff;
          letter-spacing: 0.3px;
          margin-bottom: 18px;
          text-transform: none;
        }
        .footer-col ul { list-style: none; padding: 0; margin: 0; }
        .footer-col ul li { margin-bottom: 11px; }
        .footer-col ul li a {
          font-size: 13.5px;
          color: #ccc;
          text-decoration: none;
          transition: color 0.18s;
        }
        .footer-col ul li a:hover { color: #fff; }

        /* Divider */
        .footer-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin-bottom: 24px;
        }

        /* Bottom bar */
        .footer-bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }
        .footer-bottom > p {
          font-size: 12.5px;
          color: #888;
        }

        /* Credit block — both lines left-aligned from same point */
        .footer-credit {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
        }
        .credit-label {
          font-size: 12.5px;
          color: #888;
        }
        .credit-link {
          font-size: 12.5px;
          font-weight: 700;
          color: #4da6ff;
          text-decoration: none;
          transition: color 0.18s;
        }
        .credit-link:hover { color: #fff; }

        /* Responsive */
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1.5fr 1fr 1fr 1fr; }
          .footer-col:last-child { grid-column: 2; }
        }

        @media (max-width: 768px) {
          .footer-card { padding: 36px 24px 28px; }
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
          .footer-brand { grid-column: 1 / -1; }
          .footer-col:last-child { grid-column: auto; }
          .footer-tagline { max-width: 100%; }
        }

        @media (max-width: 480px) {
          .footer { padding: 16px 10px; }
          .footer-card { padding: 28px 18px 22px; border-radius: 14px; }
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 24px; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 8px; }
          .logo-text { font-size: 19px; }
        }
      `}</style>
    </footer>
  )
}

export default Footer