/**
 * ShopListing.jsx
 */
import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ShopCard from '../components/ShopCard.jsx'
import FilterBar from '../components/FilterBar.jsx'

const PER_PAGE = 10

export default function ShopListing() {
  const [searchParams] = useSearchParams()
  const [sort, setSort] = useState('popular')
  const [page, setPage] = useState(1)
  const [shopsData, setShopsData] = useState([])
  const [loading, setLoading] = useState(true)

  const q = searchParams.get('q') || ''
  const cat = searchParams.get('cat') || ''
  const city = searchParams.get('city') || ''

  useEffect(() => {
    // Load shops from backend
    fetch("https://mazi-city-project-1.onrender.com/api/businesses")
      .then(res => res.json())
      .then(res => {
        const savedShops = res.data || [];
        // Transform backend data to match frontend format
        const transformedData = savedShops.map((shop) => ({
          id: shop.id,
          name: shop.businessTitle,
          category: shop.category || shop.storeName,
          city: shop.location,
          address: shop.location,
          rating: parseFloat(shop.rating) || 0,
          reviews: parseInt(shop.review) || 0,
          isOpen: true,
          isVerified: true,
          discount: null,
          phone: shop.mobileNumber,
          whatsapp: shop.whatsappNumber,
          image: shop.image ? `https://mazi-city-project-1.onrender.com/uploads/${shop.image}` : null,
          description: shop.description,
          tags: [shop.category?.toLowerCase() || shop.storeName?.toLowerCase() || 'retail'],
        }));

        setShopsData(transformedData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch shops", err);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    let list = [...shopsData]
    if (q) list = list.filter(s =>
      (s.name || '').toLowerCase().includes(q.toLowerCase()) ||
      (s.category || '').toLowerCase().includes(q.toLowerCase())
    )
    if (cat) list = list.filter(s => s.tags && s.tags.some(tag => tag && tag.includes(cat)))
    if (city) list = list.filter(s => s.city && s.city.toLowerCase().includes(city.toLowerCase()))

    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
    if (sort === 'newest') list.sort((a, b) => b.id - a.id)
    if (sort === 'offers') list = list.filter(s => s.discount)

    return list
  }, [q, cat, city, sort, shopsData])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleSort = (v) => { setSort(v); setPage(1) }

  const renderPages = () => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (page > 3) pages.push('...')
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i)
      if (page < totalPages - 2) pages.push('...')
      pages.push(totalPages)
    }
    return pages
  }

  return (
    <div className="container sl-wrap">

      <FilterBar count={filtered.length} sort={sort} onSort={handleSort} />

      {/* Results label */}
      {filtered.length > 0 && !loading && (
        <p className="sl-count">
          Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length} shops
        </p>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="empty-state">
          <div style={{ fontSize: 32 }}>⏳</div>
          <h3>Loading shops...</h3>
          <p>Please wait while we fetch the latest shops.</p>
        </div>
      ) : (
        <>
          {/* Shop list */}
          <div className="shop-list">
            {pageItems.length === 0 ? (
              <div className="empty-state">
                <span style={{ fontSize: 48 }}>🔍</span>
                <h3>No shops found</h3>
                <p>Try a different search or category.</p>
              </div>
            ) : (
              pageItems.map(shop => (
                <ShopCard key={shop.id} shop={shop} variant="horizontal" />
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination-row">
              <button
                className="page-btn arrow"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                ‹
              </button>

              {renderPages().map((n, i) =>
                n === '...'
                  ? <span key={`dot-${i}`} className="page-dots">…</span>
                  : <button
                    key={n}
                    className={`page-btn ${n === page ? 'active' : ''}`}
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </button>
              )}

              <button
                className="page-btn arrow"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                ›
              </button>
            </div>
          )}
        </>
      )}

      <style>{`
        .sl-wrap { padding-top: 20px; padding-bottom: 32px; }

        .sl-count {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 0 0 12px;
        }

        .shop-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .empty-state {
          display: flex; flex-direction: column;
          align-items: center; gap: 10px;
          padding: 60px 20px; text-align: center;
        }
        .empty-state h3 { font-size: 18px; font-weight: 700; }
        .empty-state p  { color: var(--text-secondary); }

        .pagination-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          flex-wrap: wrap;
          padding-bottom: 16px;
        }

        .page-btn {
          min-width: 36px; height: 36px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          background: var(--white);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          color: var(--text-primary);
          transition: all 0.2s;
          display: flex; align-items: center; justify-content: center;
          padding: 0 8px;
        }

        .page-btn:hover:not(:disabled) {
          border-color: var(--primary);
          color: var(--primary);
        }

        .page-btn.active {
          background: var(--primary);
          border-color: var(--primary);
          color: #fff;
          font-weight: 700;
        }

        .page-btn:disabled { opacity: 0.4; cursor: default; }

        .page-btn.arrow { font-size: 18px; }

        .page-dots {
          font-size: 14px;
          color: var(--text-secondary);
          padding: 0 4px;
          display: flex; align-items: center;
        }

        @media (max-width: 480px) {
          .shop-list { gap: 8px; }
          .page-btn { min-width: 32px; height: 32px; font-size: 13px; }
        }
      `}</style>
    </div>
  )
}