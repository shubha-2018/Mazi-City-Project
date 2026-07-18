/**
 * CategoryCard.jsx
 * Single category tile used in the Browse Categories grid.
 * Props: icon (emoji), label (string), color (bg hex), onClick
 */
import React from 'react'

export default function CategoryCard({ icon, image, label, color, onClick }) {
  return (
    <button className="cat-card" onClick={onClick}>
      <div className="cat-icon-wrap" style={{ background: color || '#f1f3f4' }}>
        {image ? (
          <img 
            src={image} 
            alt={label} 
            className="cat-image" 
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'inline-block'; }} 
          />
        ) : null}
        <span className="cat-emoji" style={{ display: image ? 'none' : 'inline-block' }}>{icon}</span>
      </div>
      <span className="cat-label">{label}</span>

      <style>{`
        .cat-card {
          display: flex; flex-direction: column;
          align-items: center; gap: 8px;
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: var(--radius-md);
          padding: 20px 8px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
          width: 100%;
        }
        .cat-card:hover {
          border-color: var(--primary);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        .cat-icon-wrap {
          width: 52px; height: 52px;
          border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
        }
        .cat-emoji { font-size: 26px; line-height: 1; }
        .cat-image {
          width: 32px; height: 32px; object-fit: contain;
        }
        .cat-label {
          font-size: 11px; font-weight: 600;
          color: var(--text-secondary); line-height: 1.3;
        }
      `}</style>
    </button>
  )
}