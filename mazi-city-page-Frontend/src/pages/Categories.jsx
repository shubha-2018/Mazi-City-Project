/**
 * Categories.jsx
 * Full grid of all categories.
 */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard.jsx'
import { categoriesData } from '../data/categoriesData.js'

export default function Categories() {
  const navigate = useNavigate()

  return (
    <div className="container" style={{ paddingTop: 28, paddingBottom: 32 }}>
      <h1 className="section-title" style={{ marginBottom: 24 }}>All Categories</h1>
      <div className="all-cat-grid">
        {categoriesData.map(cat => (
          <CategoryCard
            key={cat.id}
            icon={cat.icon}
            label={cat.label}
            color={cat.color}
            onClick={() => navigate(`/shops?cat=${cat.route}`)}
          />
        ))}
      </div>
      <style>{`
        .all-cat-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px)  { .all-cat-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 600px)  { .all-cat-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 380px)  { .all-cat-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </div>
  )
}