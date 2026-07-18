/**
 * FilterBar.jsx
 * "Business Owner" CTA banner + results count/sort row.
 * Used at the top of the ShopListing page.
 */
import React from 'react'

function FilterBar({ count, sort, onSort }) {
  return (
    <div>

      {/* Business Owner CTA Banner */}
      <div className="biz-banner">
        <div className="biz-banner-icon">🏪</div>
        <div className="biz-banner-text">
          <h3>Are you a Business Owner?</h3>
          <p>List your shop and reach more customers.</p>
        </div>
        <button className="biz-banner-btn">List Your Shop</button>
      </div>

      {/* Results Meta Row */}
      <div className="results-meta">
        <h2 className="section-title">Shops Near You</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            Sort by:
          </span>
          <select
            value={sort}
            onChange={e => onSort(e.target.value)}
            className="sort-select"
          >
            <option value="popular">Popular</option>
            <option value="rating">Rating</option>
            <option value="newest">Newest</option>
            <option value="offers">Offers</option>
          </select>
        </div>
      </div>

      <style>{`
        .biz-banner {
          background: var(--primary-light);
          border: 1.5px solid #c5d8fb;
          border-radius: var(--radius-md);
          padding: 14px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }
        .biz-banner-icon {
          background: var(--primary);
          color: #fff;
          width: 46px;
          height: 46px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }
        .biz-banner-text h3 {
          font-size: 15px;
          font-weight: 700;
        }
        .biz-banner-text p {
          font-size: 13px;
          color: var(--text-secondary);
        }
        .biz-banner-btn {
          margin-left: auto;
          background: var(--white);
          color: var(--primary);
          border: 1.5px solid var(--primary);
          border-radius: var(--radius-sm);
          padding: 8px 18px;
          font-size: 13px;
          font-weight: 600;
          flex-shrink: 0;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s;
        }
        .biz-banner-btn:hover {
          background: var(--primary);
          color: #fff;
        }
        .results-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .sort-select {
          font-size: 13px;
          color: var(--text-secondary);
          background: transparent;
          border: none;
          font-family: inherit;
          cursor: pointer;
          font-weight: 500;
          outline: none;
        }

        @media (max-width: 480px) {
          .biz-banner { flex-wrap: wrap; }
          .biz-banner-btn { margin-left: 0; width: 100%; text-align: center; }
        }
      `}</style>

    </div>
  )
}

export default FilterBar