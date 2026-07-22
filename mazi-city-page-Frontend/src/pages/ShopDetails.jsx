/**
 * ShopDetails.jsx
 * Full detail view for a single shop.
 * Reads :id param, finds shop from shopsData.
 */
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiPhone, FiMapPin, FiArrowLeft } from 'react-icons/fi'
import { MdVerified } from 'react-icons/md'

function ShopDetails() {
  const { id } = useParams()
  const [shop, setShop] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`https://mazi-city-project-1.onrender.com/api/businesses/${id}`)
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          const s = res.data;
          setShop({
            id: s.id,
            name: s.businessTitle,
            category: s.category || s.storeName,
            city: s.location,
            address: s.location,
            rating: parseFloat(s.rating) || 0,
            reviews: parseInt(s.review) || 0,
            isOpen: true,
            isVerified: true,
            discount: null,
            phone: s.mobileNumber,
            whatsapp: s.whatsappNumber,
            image: s.image ? `https://mazi-city-project-1.onrender.com/uploads/${s.image}` : null,
            description: s.description,
            tags: [s.category?.toLowerCase() || s.storeName?.toLowerCase() || 'retail'],
          });
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch shop details", err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '60px 24px', textAlign: 'center' }}>
        <h2>Loading...</h2>
      </div>
    )
  }

  if (error || !shop) {
    return (
      <div
        className="container"
        style={{ padding: '60px 24px', textAlign: 'center' }}
      >
        <h2>Shop not found</h2>
        <Link
          to="/shops"
          style={{
            color: 'var(--primary)',
            marginTop: 12,
            display: 'inline-block',
          }}
        >
          Back to shops
        </Link>
      </div>
    )
  }

  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: 40 }}>
      <Link to="/shops" className="back-link">
        <FiArrowLeft size={16} />
        Back to Shops
      </Link>

      <div className="detail-layout">
        {/* Left: Image */}
        <div className="detail-img-wrap">
          {shop.discount && (
            <span className="discount-tag">{shop.discount}</span>
          )}

          {shop.image ? (
            <img
              src={shop.image}
              alt={shop.name}
              onError={(e) => {
                e.target.src =
                  'https://via.placeholder.com/600x300?text=Shop'
              }}
            />
          ) : (
            <img
              src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23eef1f5'/%3E%3Cg fill='none' stroke='%239aa3af' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M250 170 L250 110 a60 60 0 0 1 120 0 L370 170'/%3E%3Crect x='220' y='170' width='180' height='120' rx='15'/%3E%3C/g%3E%3C/svg%3E"
              alt={shop.name}
            />
          )}
        </div>

        {/* Right: Info */}
        <div className="detail-info">
          <div className="detail-name-row">
            <h1 className="detail-name">{shop.name}</h1>

            {shop.isVerified && (
              <MdVerified className="verified" size={22} />
            )}
          </div>

          <p className="detail-cat">{shop.category}</p>

          <div className="detail-rating">
            <span className="star">★</span>

            <strong>{shop.rating}</strong>

            <span style={{ color: 'var(--gray-500)' }}>
              ({shop.reviews} reviews)
            </span>

            <span style={{ color: 'var(--gray-300)' }}>•</span>

            <span
              className={shop.isOpen ? 'open-badge' : 'closed-badge'}
            >
              {shop.isOpen ? '● Open Now' : '● Closed'}
            </span>
          </div>

          <div className="detail-addr">
            <FiMapPin size={15} color="var(--primary)" />
            {shop.address}
          </div>

          <p className="detail-desc">{shop.description}</p>

          <div className="detail-actions">
            <a
              href={`tel:${shop.phone}`}
              className="detail-btn primary"
            >
              <FiPhone size={17} />
              Call Now
            </a>

            <a
              href={`https://wa.me/${shop.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="detail-btn wa"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--primary);
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 20px;
          text-decoration: none;
        }

        .back-link:hover {
          text-decoration: underline;
        }

        .detail-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .detail-img-wrap {
          position: relative;
        }

        .detail-img-wrap img {
          width: 100%;
          height: 320px;
          object-fit: cover;
          border-radius: var(--radius-lg);
        }

        .detail-name-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .detail-name {
          font-size: 26px;
          font-weight: 800;
        }

        .detail-cat {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 10px;
        }

        .detail-rating {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 12px;
        }

        .detail-addr {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .detail-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 24px;
        }

        .detail-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .detail-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 22px;
          border-radius: var(--radius-full);
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }

        .detail-btn.primary {
          background: var(--primary);
          color: #fff;
        }

        .detail-btn.primary:hover {
          background: var(--primary-dark);
        }

        .detail-btn.wa {
          background: #25d366;
          color: #fff;
        }

        .detail-btn.wa:hover {
          background: #1da855;
        }

        .closed-badge {
          color: var(--danger);
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .detail-layout {
            grid-template-columns: 1fr;
          }

          .detail-img-wrap img {
            height: 220px;
          }

          .detail-name {
            font-size: 22px;
          }
        }

        @media (max-width: 480px) {
          .detail-actions {
            flex-direction: column;
          }

          .detail-btn {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

export default ShopDetails