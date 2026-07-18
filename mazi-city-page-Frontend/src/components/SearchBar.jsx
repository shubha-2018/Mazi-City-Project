import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'

function SearchBar({
  className = '',
  placeholder = 'Search Shops, Services, Offers...'
}) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (query.trim()) {
      navigate(`/shops?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <>
      <form
        className={`searchbar ${className}`}
        onSubmit={handleSubmit}
      >
        <FiSearch 
          className="searchbar-icon" 
          size={19} 
        />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="searchbar-input"
        />

        <button 
          type="submit" 
          className="searchbar-btn"
        >
          <FiSearch size={17} />
        </button>
      </form>

      <style>{`
        .searchbar {
          display: flex;
          align-items: center;
          background: var(--gray-100);
          border: 1.5px solid var(--border);
          border-radius: var(--radius-full);
          padding: 0 6px 0 14px;
          height: 42px;
          gap: 8px;
        }

        .searchbar:focus-within {
          border-color: var(--primary);
          background: var(--white);
        }

        .searchbar-icon {
          color: var(--gray-500);
          flex-shrink: 0;
        }

        .searchbar-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-size: 14px;
          color: var(--text-primary);
          min-width: 0;
        }

        .searchbar-input::placeholder {
          color: var(--gray-500);
        }

        .searchbar-btn {
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 50%;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .searchbar-btn:hover {
          background: var(--primary-dark);
        }
      `}</style>
    </>
  )
}

export default SearchBar