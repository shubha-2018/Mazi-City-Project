import React from 'react'

const FEATURES = [
  {
    icon: '🛡️',
    title: 'Trusted & Verified',
    desc: 'Every shop on Mazi City is verified and trusted by our local community team.',
  },
  {
    icon: '🏷️',
    title: 'Best Offers',
    desc: 'Discover exclusive daily deals and savings from shops near you.',
  },
  {
    icon: '🎧',
    title: '24/7 Support',
    desc: 'Our customer support team is always ready to help you via chat or call.',
  },
  {
    icon: '👥',
    title: 'Community First',
    desc: 'We support local businesses and help them grow within their community.',
  },
  {
    icon: '📍',
    title: 'Wide City Coverage',
    desc: 'Covering Pune, Mumbai, Nagpur, Nashik, Kolhapur, Solapur and more cities.',
  },
  {
    icon: '⚡',
    title: 'Fast & Easy Discovery',
    desc: 'Find the right shop in seconds with smart search and category filters.',
  },
]

export default function Features() {
  return (
    <section className="features-section">
      <div className="container">

        <div className="features-header">
          <h2 className="features-heading">Why Choose Mazi City?</h2>
          <p className="features-sub">Your local marketplace — all in one place.</p>
        </div>

        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon-wrap">
                <span className="feature-icon">{f.icon}</span>
              </div>
              <h4 className="feature-title">{f.title}</h4>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .features-section {
          background: #fff;
          padding: 64px 16px;
          margin-top: 32px;
        }

        .features-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .features-heading {
          font-size: 28px;
          font-weight: 800;
          color: #3a5bbf;
          margin: 0 0 10px;
        }

        .features-sub {
          font-size: 14px;
          color: #777;
          margin: 0;
        }

        /* 3-column grid */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 1000px;
          margin: 0 auto;
        }

        /* Card */
        .feature-card {
          background: #fff;
          border: 1.5px solid #e2e6f3;
          border-radius: 14px;
          padding: 36px 24px 28px;
          text-align: center;
          transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s;
          cursor: default;
        }

        .feature-card:hover {
          box-shadow: 0 6px 28px rgba(58, 91, 191, 0.12);
          border-color: #3a5bbf;
          transform: translateY(-3px);
        }

        /* First card gets the active/highlighted style like in the image */
        .feature-card:first-child {
          border-color: #3a5bbf;
          box-shadow: 0 4px 20px rgba(58, 91, 191, 0.1);
        }

        /* Icon circle */
        .feature-icon-wrap {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: #3a5bbf;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }

        .feature-icon {
          font-size: 28px;
          line-height: 1;
        }

        /* Title */
        .feature-title {
          font-size: 15px;
          font-weight: 700;
          color: #3a5bbf;
          margin: 0 0 10px;
        }

        /* Desc */
        .feature-desc {
          font-size: 13.5px;
          color: #666;
          line-height: 1.65;
          margin: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 560px) {
          .features-section {
            padding: 48px 12px;
          }
          .features-heading {
            font-size: 22px;
          }
          .features-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .feature-card {
            padding: 28px 20px 22px;
          }
        }
      `}</style>
    </section>
  )
}