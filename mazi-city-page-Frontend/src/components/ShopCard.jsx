/**
 * ShopCard.jsx
 */

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiPhone, FiBookmark, FiMapPin } from 'react-icons/fi'
import { MdVerified } from 'react-icons/md'
import { BsBookmarkFill, BsWhatsapp } from 'react-icons/bs'

export default function ShopCard({ shop, variant = 'horizontal', onSave }) {

  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)

  const handleSave = (e) => { e.stopPropagation(); setSaved(s => !s); onSave?.(shop) }
  const handleWhatsApp = (e) => { e.stopPropagation(); window.open(`https://wa.me/${shop.whatsapp}`, '_blank') }
  const handleCall = (e) => { e.stopPropagation(); window.location.href = `tel:${shop.phone}` }
  const goDetail = () => navigate(`/shops/${shop.id}`)

  const imageError = (e) => {
    e.currentTarget.onerror = null
    e.currentTarget.src = "data:image/svg+xml;utf8," + encodeURIComponent(`
      <svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>
        <rect width='100%' height='100%' fill='#eef1f5'/>
        <g fill='none' stroke='#9aa3af' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'>
          <path d='M120 130 L120 95 a40 40 0 0 1 80 0 L200 130'/>
          <rect x='100' y='130' width='120' height='90' rx='10'/>
        </g>
      </svg>
    `)
  }

  /* ── Vertical card ── */
  if (variant === 'vertical') {
    return (
      <div className="sc-v" onClick={goDetail}>
        <div className="sc-v-img-wrap">
          {shop.image ? (
            <img src={shop.image} alt={shop.name} onError={imageError} loading="lazy" />
          ) : (
            <img src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23eef1f5'/%3E%3Cg fill='none' stroke='%239aa3af' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M120 130 L120 95 a40 40 0 0 1 80 0 L200 130'/%3E%3Crect x='100' y='130' width='120' height='90' rx='10'/%3E%3C/g%3E%3C/svg%3E" alt={shop.name} loading="lazy" />
          )}
          {shop.discount && <span className="sc-discount">{shop.discount}</span>}
        </div>
        <div className="sc-v-body">
          <div className="sc-v-name">{shop.name}</div>
          <div className="sc-v-cat">{shop.category}</div>
          <div className="sc-v-rating">
            <span className="star">★</span>
            {shop.rating}
            <span className="sc-v-reviews">({shop.reviews})</span>
          </div>
        </div>
        <button className="sc-wa-badge" onClick={handleWhatsApp} title="WhatsApp">
          <BsWhatsapp size={15} />
        </button>

        <style>{`
          .sc-v {
            background: var(--white);
            border: 1.5px solid var(--border);
            border-radius: var(--radius-md);
            overflow: hidden;
            cursor: pointer;
            position: relative;
            min-width: 180px;
            max-width: 220px;
            transition: all .2s;
          }
          .sc-v:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }

          .sc-v-img-wrap {
            position: relative;
            width: 100%;
            height: 140px;
            overflow: hidden;
            background: #eef1f5;
          }
          .sc-v-img-wrap img {
            width: 100%; height: 100%;
            object-fit: cover; object-position: center;
            display: block;
          }

          .sc-discount {
            position: absolute;
            top: 8px; left: 8px;
            background: #ff6b00;
            color: #fff;
            font-size: 11px;
            font-weight: 700;
            padding: 4px 9px;
            border-radius: 999px;
            z-index: 2;
            letter-spacing: 0.2px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.18);
          }

          .sc-v-body { padding: 10px 12px 36px; }
          .sc-v-name { font-size: 14px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .sc-v-cat { font-size: 12px; color: var(--text-secondary); margin: 2px 0 4px; }
          .sc-v-rating { display: flex; gap: 4px; font-size: 13px; align-items: center; }
          .sc-v-reviews { color: var(--text-secondary); }
          .sc-wa-badge {
            position: absolute; bottom: 10px; right: 10px;
            background: #25d366; color: #fff;
            width: 30px; height: 30px;
            border-radius: 50%; border: none; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          }
          .star { color: #f59e0b; }
        `}</style>
      </div>
    )
  }

  /* ── Horizontal card ── */
  return (
    <>
      <div className="sc-h" onClick={goDetail}>

        {/* Image */}
        <div className="sc-h-img-wrap">
          {shop.image ? (
            <img src={shop.image} alt={shop.name} onError={imageError} loading="lazy" />
          ) : (
            <img src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23eef1f5'/%3E%3Cg fill='none' stroke='%239aa3af' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M120 130 L120 95 a40 40 0 0 1 80 0 L200 130'/%3E%3Crect x='100' y='130' width='120' height='90' rx='10'/%3E%3C/g%3E%3C/svg%3E" alt={shop.name} loading="lazy" />
          )}
          {shop.discount && <span className="sc-discount">{shop.discount}</span>}
        </div>

        {/* Info */}
        <div className="sc-h-body">
          <div className="sc-h-name-row">
            <span className="sc-h-name">{shop.name}</span>
            {shop.isVerified && <MdVerified className="verified-icon" size={17} />}
          </div>
          <div className="sc-h-type">{shop.category}</div>
          <div className="sc-h-addr">
            <FiMapPin size={12} style={{ flexShrink: 0 }} />
            <span>{shop.address}</span>
          </div>
          <div className="sc-h-rating">
            <span className="star">★</span>
            <strong>{shop.rating}</strong>
            <span className="sc-h-reviews">({shop.reviews})</span>
            <span className="sc-h-dot">•</span>
            <span className={shop.isOpen ? 'open-badge' : 'closed-badge'}>
              {shop.isOpen ? 'Open' : 'Closed'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="sc-h-actions">
          <button className="sc-icon-btn bookmark" onClick={handleSave} title="Save">
            {saved ? <BsBookmarkFill size={16} /> : <FiBookmark size={16} />}
          </button>
          <button className="sc-icon-btn call" onClick={handleCall} title="Call">
            <FiPhone size={16} />
          </button>
          <button className="sc-icon-btn wa" onClick={handleWhatsApp} title="WhatsApp">
            <BsWhatsapp size={16} />
          </button>
        </div>

      </div>

      <style>{`

        .sc-discount {
          position: absolute;
          top: 8px; left: 8px;
          background: #ff6b00;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 9px;
          border-radius: 999px;
          z-index: 2;
          letter-spacing: 0.2px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.18);
        }

        .sc-h {
          display: flex;
          align-items: stretch;
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          transition: box-shadow 0.2s, transform 0.2s;
          width: 100%;
          min-height: 120px;
        }

        .sc-h:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.10);
          transform: translateY(-1px);
        }

        /* ── Image ── */
        .sc-h-img-wrap {
          position: relative;
          flex-shrink: 0;
          width: 180px;
          min-height: 120px;
          overflow: hidden;
          background: #eef1f5;
        }

        .sc-h-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        /* ── Body ── */
        .sc-h-body {
          flex: 1;
          padding: 14px 16px;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
        }

        .sc-h-name-row {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .sc-h-name {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .verified-icon { color: #1877f2; flex-shrink: 0; }

        .sc-h-type {
          font-size: 13px;
          color: var(--text-secondary);
        }

        .sc-h-addr {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: var(--text-secondary);
        }

        .sc-h-addr span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .sc-h-rating {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          color: var(--text-secondary);
          flex-wrap: wrap;
        }

        .sc-h-reviews { color: var(--text-secondary); }
        .sc-h-dot { color: #ccc; }
        .star { color: #f59e0b; }
        .open-badge  { color: #16a34a; font-weight: 600; font-size: 12px; }
        .closed-badge { color: #dc2626; font-weight: 600; font-size: 12px; }

        /* ── Actions ── */
        .sc-h-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 14px;
          flex-shrink: 0;
          border-left: 1px solid var(--border);
        }

        .sc-icon-btn {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1.5px solid var(--border);
          background: var(--white);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          color: var(--text-secondary);
        }

        .sc-icon-btn.bookmark:hover { border-color: #f59e0b; color: #f59e0b; background: #fffbeb; }
        .sc-icon-btn.call  { border-color: #1877f2; color: #1877f2; }
        .sc-icon-btn.call:hover  { background: #1877f2; color: #fff; }
        .sc-icon-btn.wa   { border-color: #25d366; color: #25d366; }
        .sc-icon-btn.wa:hover   { background: #25d366; color: #fff; }

        /* ── Tablet ── */
        @media (max-width: 768px) {
          .sc-h { border-radius: 12px; }
          .sc-h-img-wrap { width: 150px; min-height: 110px; }
          .sc-h-name { font-size: 14px; }
          .sc-h-body { padding: 12px 12px; }
          .sc-h-actions { padding: 10px 12px; gap: 7px; }
          .sc-icon-btn { width: 33px; height: 33px; }
        }

        /* ── Mobile ── */
        @media (max-width: 540px) {
          .sc-h { border-radius: 10px; min-height: 100px; }
          .sc-h-img-wrap { width: 120px; min-height: 100px; }
          .sc-h-name { font-size: 13px; }
          .sc-h-type { font-size: 11px; }
          .sc-h-addr { font-size: 11px; }
          .sc-h-rating { font-size: 11px; gap: 3px; }
          .sc-h-body { padding: 10px 10px; gap: 3px; }
          .sc-h-actions { padding: 8px 10px; gap: 6px; border-left: none; }
          .sc-icon-btn { width: 30px; height: 30px; }
        }

        /* ── Small mobile ── */
        @media (max-width: 380px) {
          .sc-h-img-wrap { width: 95px; min-height: 95px; }
          .sc-h-name { font-size: 12px; }
          .sc-h-body { padding: 8px 8px; }
          .sc-h-actions { padding: 6px 8px; gap: 5px; }
          .sc-icon-btn { width: 28px; height: 28px; }
          .sc-discount { font-size: 9px; padding: 3px 7px; }
        }

      `}</style>
    </>
  )
}