import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { FiMapPin, FiChevronDown, FiUser, FiSearch, FiMenu, FiX } from 'react-icons/fi'
import { MdStorefront } from 'react-icons/md'
import { HiViewGrid } from 'react-icons/hi'
import SearchBar from './SearchBar.jsx'

const NAV_CATS = [
  { label: 'All Shops', slug: null },
  { label: 'Grocery', slug: 'grocery' },
  { label: 'Electronics', slug: 'electronics' },
  { label: 'Clothing', slug: 'clothing' },
  { label: 'Furniture', slug: 'furniture' },
  { label: 'More', slug: 'more' },
]

const TRENDING_SEARCHES = ['Grocery Store', 'Electronics', 'Restaurant', 'Pharmacy', 'Clothing Store']

function Navbar() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const location = useLocation()

  const [activeTab, setActiveTab] = useState(null)
  const [city, setCity] = useState('Jintur, Maharashtra')

  const [showLocation, setShowLocation] = useState(false)
  const [showSearchDrop, setShowSearchDrop] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [citySearch, setCitySearch] = useState('')

  const locationRef = useRef(null)
  const searchRef = useRef(null)
  
  const [CITIES, setCities] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/locations")
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          const fetchedCities = res.data.map(loc => `${loc.city}, ${loc.state}`);
          setCities(fetchedCities);
          if (fetchedCities.length > 0 && !city) {
             setCity(fetchedCities[0]);
          }
        }
      })
      .catch(err => console.error("Failed to fetch locations", err));
  }, []);

  // Preserve existing query params and update/add one key
  const buildParams = (key, value) => {
    const p = new URLSearchParams(searchParams)
    if (value) p.set(key, value)
    else p.delete(key)
    return p.toString()
  }

  const handleTab = (slug) => {
    setActiveTab(slug)
    setMobileMenuOpen(false)
    // Preserve city param when switching categories
    const params = buildParams('cat', slug)
    navigate(`/shops${params ? `?${params}` : ''}`)
  }

  const selectCity = (value) => {
    const cityName = value.split(',')[0].trim()
    setCity(value)
    setShowLocation(false)
    setCitySearch('')
    const p = new URLSearchParams(searchParams)
    p.set('city', cityName)
    navigate(`${location.pathname}?${p.toString()}`)
  }

  const filteredCities = CITIES.filter((c) =>
    c.toLowerCase().includes(citySearch.toLowerCase())
  )

  // close dropdowns on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setShowLocation(false)
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchDrop(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <header className="navbar-header">

      <div className="navbar-main">
        <div className="navbar-inner container">

          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-icon">
              <svg viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="10" fill="#1a73e8" />
                <path
                  d="M12 26 C12 20,20 14,20 14 C20 14,28 20,28 26"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="20" cy="24" r="3" fill="#f5a623" />
              </svg>
            </div>
            <span className="navbar-logo-text">
              MAZI <span>CITY</span>
            </span>
          </Link>

          {/* Search — inline, beside the logo, visible only on mobile/tablet (desktop has its own search below) */}
          <div className="navbar-search-wrap-mobile">
            <SearchBar className="navbar-search" />
          </div>

          {/* Location dropdown */}
          <div className="navbar-location-wrap" ref={locationRef}>
            <button
              className="navbar-location"
              onClick={() => setShowLocation((v) => !v)}
            >
              <FiMapPin className="pin-icon" />
              <span className="loc-text">{city.split(',')[0]}</span>
              <FiChevronDown className={`chev ${showLocation ? 'open' : ''}`} />
            </button>

            {showLocation && (
              <div className="location-dropdown">
                <div className="loc-search-box">
                  <FiSearch size={14} />
                  <input
                    autoFocus
                    placeholder="Search city..."
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                  />
                </div>
                <div className="loc-list">
                  {filteredCities.length === 0 && (
                    <div className="loc-empty">No city found</div>
                  )}
                  {filteredCities.map((c) => (
                    <button
                      key={c}
                      className={`loc-item ${c === city ? 'active' : ''}`}
                      onClick={() => selectCity(c)}
                    >
                      <FiMapPin size={14} />
                      <span>{c}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search with suggestion dropdown */}
          <div className="navbar-search-wrap" ref={searchRef}>
            <div onFocus={() => setShowSearchDrop(true)} onClick={() => setShowSearchDrop(true)}>
              <SearchBar className="navbar-search" />
            </div>

            {showSearchDrop && (
              <div className="search-dropdown">
                <div className="search-drop-title">Trending searches</div>
                {TRENDING_SEARCHES.map((t) => (
                  <button
                    key={t}
                    className="search-drop-item"
                    onClick={() => {
                      setShowSearchDrop(false)
                      // Preserve city when doing a trending search
                      const p = new URLSearchParams(searchParams)
                      p.set('q', t)
                      navigate(`/shops?${p.toString()}`)
                    }}
                  >
                    <FiSearch size={13} />
                    <span>{t}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop actions — bell icon removed */}
          <div className="navbar-actions">
            <Link to="/register" className="btn-list-shop">
              <MdStorefront size={18} />
              <span>List Your Shop</span>
            </Link>

            <a href="http://localhost:5173/" className="btn-login" target="_blank" rel="noopener noreferrer">
              <FiUser size={17} />
              <span>Login / Sign Up</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="navbar-burger"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

        </div>
      </div>

      {/* Category subnav (desktop/tablet) */}
      <nav className="navbar-subnav">
        <div className="container navbar-subnav-inner">
          <div className="cat-tabs">
            {NAV_CATS.map(({ label, slug }) => (
              <button
                key={label}
                className={`cat-tab ${activeTab === slug ? 'active' : ''}`}
                onClick={() => handleTab(slug)}
              >
                {slug === null && <HiViewGrid size={15} />}
                {label}
                {label === 'More' && <FiChevronDown size={14} />}
              </button>
            ))}
          </div>
          <button className="filters-btn">Filters</button>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <button
            className="mobile-location"
            onClick={() => {
              setMobileMenuOpen(false)
              setShowLocation(true)
            }}
          >
            <FiMapPin />
            <span>{city}</span>
            <FiChevronDown />
          </button>

          <div className="mobile-cats">
            {NAV_CATS.map(({ label, slug }) => (
              <button
                key={label}
                className={`mobile-cat-item ${activeTab === slug ? 'active' : ''}`}
                onClick={() => handleTab(slug)}
              >
                {label}
              </button>
            ))}
          </div>

          <Link to="/register" className="btn-list-shop mobile-full" onClick={() => setMobileMenuOpen(false)}>
            <MdStorefront size={18} />
            <span>List Your Shop</span>
          </Link>

          <a href="http://localhost:5173/" className="btn-login mobile-full" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>
            <FiUser size={17} />
            <span>Login / Sign Up</span>
          </a>
        </div>
      )}

      <style>{`

        .navbar-header{
          position:sticky;
          top:0;
          z-index:200;
          background:#fff;
        }

        .navbar-main{ border-bottom:1px solid var(--border); }

        .navbar-inner{
          height:68px;
          display:flex;
          align-items:center;
          gap:14px;
        }

        .navbar-logo{
          display:flex;
          align-items:center;
          gap:8px;
          text-decoration:none;
          flex-shrink:0;
        }
        .navbar-logo-icon{ width:36px; height:36px; }
        .navbar-logo-icon svg{ width:100%; height:100%; }
        .navbar-logo-text{ font-size:19px; font-weight:900; color:#111; white-space:nowrap; }
        .navbar-logo-text span{ color:#f5a623; }

        /* Location */
        .navbar-location-wrap{ position:relative; flex-shrink:0; }

        .navbar-location{
          display:flex;
          align-items:center;
          gap:6px;
          background:#f5f6f8;
          border:1px solid #e2e4e8;
          border-radius:30px;
          padding:9px 14px;
          cursor:pointer;
          font-size:13.5px;
          font-weight:600;
          color:#1f2430;
          transition:all .15s;
        }
        .navbar-location:hover{ border-color:#1a73e8; }
        .pin-icon{ color:#1a73e8; flex-shrink:0; }
        .loc-text{ max-width:110px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .chev{ transition:transform .2s; flex-shrink:0; }
        .chev.open{ transform:rotate(180deg); }

        .location-dropdown{
          position:absolute;
          top:calc(100% + 8px);
          left:0;
          width:260px;
          background:#fff;
          border:1px solid var(--border);
          border-radius:12px;
          box-shadow:0 10px 30px rgba(0,0,0,0.12);
          z-index:300;
          overflow:hidden;
        }
        .loc-search-box{
          display:flex;
          align-items:center;
          gap:8px;
          padding:10px 12px;
          border-bottom:1px solid var(--border);
          color:#888;
        }
        .loc-search-box input{
          border:none;
          outline:none;
          font-size:13.5px;
          flex:1;
          color:#111;
        }
        .loc-list{ max-height:260px; overflow-y:auto; padding:6px; }
        .loc-item{
          display:flex;
          align-items:center;
          gap:8px;
          width:100%;
          text-align:left;
          padding:9px 10px;
          border:none;
          background:none;
          border-radius:8px;
          cursor:pointer;
          font-size:13.5px;
          color:#1f2430;
        }
        .loc-item:hover{ background:#f0f4ff; }
        .loc-item.active{ background:#e8f0fe; color:#1a73e8; font-weight:600; }
        .loc-empty{ padding:14px; text-align:center; color:#999; font-size:13px; }

        /* Search */
        .navbar-search-wrap{ position:relative; flex:1; min-width:0; }
        .navbar-search{ width:100%; }

        .search-dropdown{
          position:absolute;
          top:calc(100% + 8px);
          left:0;
          right:0;
          background:#fff;
          border:1px solid var(--border);
          border-radius:12px;
          box-shadow:0 10px 30px rgba(0,0,0,0.12);
          z-index:300;
          padding:10px;
        }
        .search-drop-title{
          font-size:11.5px;
          font-weight:700;
          color:#999;
          text-transform:uppercase;
          letter-spacing:.4px;
          padding:4px 8px 8px;
        }
        .search-drop-item{
          display:flex;
          align-items:center;
          gap:8px;
          width:100%;
          text-align:left;
          padding:9px 10px;
          border:none;
          background:none;
          border-radius:8px;
          cursor:pointer;
          font-size:13.5px;
          color:#1f2430;
        }
        .search-drop-item:hover{ background:#f0f4ff; }

        /* Actions */
        .navbar-actions{
          display:flex;
          align-items:center;
          gap:10px;
          flex-shrink:0;
        }

        .btn-list-shop,
        .btn-login{
          display:flex;
          align-items:center;
          gap:6px;
          text-decoration:none;
          font-size:13.5px;
          font-weight:600;
          padding:9px 16px;
          border-radius:24px;
          white-space:nowrap;
          transition:all .15s;
        }

        .btn-list-shop{
          background:#fff7e8;
          color:#b9710a;
          border:1px solid #f3d99a;
        }
        .btn-list-shop:hover{ background:#fdebc8; }

        .btn-login{
          background:#1a73e8;
          color:#fff;
          border:1px solid #1a73e8;
        }
        .btn-login:hover{ background:#1558b0; }

        .navbar-burger{
          display:none;
          border:1px solid var(--border);
          background:#fff;
          width:38px;
          height:38px;
          border-radius:10px;
          align-items:center;
          justify-content:center;
          cursor:pointer;
          flex-shrink:0;
          color:#1f2430;
        }

        /* Inline mobile search — sits beside the logo, in the middle of the navbar row.
           Hidden on desktop (desktop uses .navbar-search-wrap instead). */
        .navbar-search-wrap-mobile{
          display:none;
          flex:1;
          min-width:0;
        }
        .navbar-search-wrap-mobile .navbar-search{ width:100%; }

        /* Subnav */
        .navbar-subnav{ border-bottom:1px solid var(--border); }
        .navbar-subnav-inner{
          height:48px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:10px;
        }
        .cat-tabs{
          display:flex;
          gap:5px;
          overflow-x:auto;
          scrollbar-width:none;
        }
        .cat-tabs::-webkit-scrollbar{ display:none; }
        .cat-tab{
          display:flex;
          align-items:center;
          gap:5px;
          border:none;
          background:none;
          padding:8px 14px;
          border-radius:20px;
          cursor:pointer;
          font-size:13.5px;
          font-weight:500;
          color:#444;
          white-space:nowrap;
        }
        .cat-tab:hover{ background:#f0f4ff; }
        .cat-tab.active{ background:#1a73e8; color:#fff; }
        .filters-btn{
          border:1px solid #ddd;
          background:#fff;
          padding:7px 16px;
          border-radius:8px;
          font-size:13px;
          font-weight:600;
          cursor:pointer;
          flex-shrink:0;
        }

        /* Mobile menu panel */
        .mobile-menu{
          display:none;
          flex-direction:column;
          gap:14px;
          padding:16px;
          border-bottom:1px solid var(--border);
          background:#fff;
        }
        .mobile-location{
          display:flex;
          align-items:center;
          gap:8px;
          background:#f5f6f8;
          border:1px solid #e2e4e8;
          border-radius:10px;
          padding:11px 14px;
          font-size:14px;
          font-weight:600;
          color:#1f2430;
          width:100%;
          cursor:pointer;
        }
        .mobile-location span{ flex:1; text-align:left; }
        .mobile-cats{
          display:flex;
          flex-wrap:wrap;
          gap:8px;
        }
        .mobile-cat-item{
          border:1px solid var(--border);
          background:#fff;
          padding:8px 14px;
          border-radius:20px;
          font-size:13px;
          font-weight:500;
          cursor:pointer;
          color:#444;
        }
        .mobile-cat-item.active{ background:#1a73e8; color:#fff; border-color:#1a73e8; }
        .mobile-full{ width:100%; justify-content:center; }

        /* ===== Responsive breakpoints ===== */

        /* Small laptops / large tablets (1025px and below): trim location text first */
        @media (max-width:1024px){
          .navbar-location .loc-text{ display:none; }
          .navbar-location{ padding:9px 11px; }
          .navbar-inner{ gap:10px; }
        }

        /* Tablets (768px–860px): still desktop-style layout but tighter spacing */
        @media (max-width:860px){
          .container{ padding:0 16px; }
          .navbar-actions .btn-list-shop span,
          .navbar-actions .btn-login span{ display:none; }
          .btn-list-shop,
          .btn-login{ padding:9px 11px; }
        }

        /* Mobile phones (max-width:768px): logo icon — search (middle) — burger, all in one row */
        @media (max-width:768px){
          .navbar-inner{ height:58px; gap:8px; }
          .navbar-location-wrap,
          .navbar-search-wrap,
          .navbar-actions{ display:none; }
          .navbar-search-wrap-mobile{ display:flex; }
          .navbar-burger{ display:flex; flex-shrink:0; }
          .navbar-subnav{ display:none; }
          .mobile-menu{ display:flex; }
          .navbar-logo-text{ display:none; }
          .navbar-logo{ flex-shrink:0; }
        }

        /* Small phones (max-width:480px) */
        @media (max-width:480px){
          .navbar-inner{ padding:0 12px; gap:6px; }
          .mobile-menu{ padding:12px; }
          .navbar-logo-icon{ width:32px; height:32px; }
          .navbar-burger{ width:34px; height:34px; }
        }

        /* Very small phones (max-width:360px) */
        @media (max-width:360px){
          .navbar-logo-icon{ width:28px; height:28px; }
          .navbar-inner{ height:54px; }
        }

      `}</style>

    </header>
  )
}

export default Navbar