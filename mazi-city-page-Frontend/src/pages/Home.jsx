/**
 * Home.jsx
 * Homepage: HeroSlider → Browse Categories → Popular Shops → Why Mazi City
 */

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import HeroSlider from "../components/HeroSlider.jsx";
import CategoryCard from "../components/CategoryCard.jsx";
import ShopCard from "../components/ShopCard.jsx";
import Features from "../components/Features.jsx";

import { categoriesData } from "../data/categoriesData.js";



export default function Home() {
  const [popularShops, setPopularShops] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const city = searchParams.get('city') || '';

  useEffect(() => {
    // Fetch Popular Shops
    fetch("https://mazi-city-project-1.onrender.com/api/popular-shops")
      .then(res => res.json())
      .then(res => {
        const savedShops = res.data || [];
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
        setPopularShops(transformedData);
      })
      .catch(err => console.error("Failed to fetch popular shops", err));

    // Fetch Categories
    fetch("https://mazi-city-project-1.onrender.com/api/categories")
      .then(res => res.json())
      .then(res => {
        const fetchedCats = res.data || [];
        const getCategoryIcon = (name) => {
          const n = (name || '').toLowerCase();
          if (n.includes('grocer')) return '🛒';
          if (n.includes('electronic')) return '💻';
          if (n.includes('cloth')) return '👕';
          if (n.includes('furniture')) return '🛋️';
          if (n.includes('restaurant') || n.includes('food')) return '🍔';
          if (n.includes('medical') || n.includes('pharmacy')) return '💊';
          if (n.includes('education') || n.includes('school')) return '🎓';
          if (n.includes('hotel')) return '🏨';
          if (n.includes('gym')) return '🏋️';
          if (n.includes('salon') || n.includes('beauty')) return '✂️';
          return '🛍️';
        };

        const getCategoryColor = (name) => {
          const n = (name || '').toLowerCase();
          if (n.includes('grocer')) return '#e8f5e9';
          if (n.includes('electronic')) return '#e3f2fd';
          if (n.includes('cloth')) return '#fce4ec';
          if (n.includes('furniture')) return '#fff3e0';
          if (n.includes('restaurant') || n.includes('food')) return '#ffebee';
          if (n.includes('medical') || n.includes('pharmacy')) return '#e0f7fa';
          return '#f3f4f6';
        };

        const transformedCats = fetchedCats.map(cat => ({
          id: cat.id,
          label: cat.name || 'Category',
          image: cat.image ? (cat.image.startsWith('http') ? cat.image : `https://mazi-city-project-1.onrender.com/uploads/${cat.image}`) : null,
          icon: getCategoryIcon(cat.name),
          color: getCategoryColor(cat.name),
          route: (cat.name || '').toLowerCase()
        }));
        setCategories(transformedCats);
      })
      .catch(err => console.error("Failed to fetch categories", err));
  }, []);

  const scrollStrip = (direction) => {
    const strip = document.getElementById("popular-strip");
    if (strip) {
      strip.scrollBy({ left: direction * 220, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSlider />

      <div className="container">

        {/* Categories Section */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Browse Categories</h2>
            <Link to="/categories" className="section-link">
              View All <FiChevronRight size={15} />
            </Link>
          </div>

          <div className="home-cat-grid">
            {categories.length > 0 ? categories.map((category) => (
              <CategoryCard
                key={category.id}
                icon={category.icon}
                image={category.image}
                label={category.label}
                color={category.color}
                onClick={() => navigate(`/shops?cat=${category.route}`)}
              />
            )) : (
              categoriesData.map((category) => (
                <CategoryCard
                  key={category.id}
                  icon={category.icon}
                  label={category.label}
                  color={category.color}
                  onClick={() => navigate(`/shops?cat=${category.route}`)}
                />
              ))
            )}
          </div>
        </section>

        {/* Popular Shops Section */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Popular Shops</h2>
            <div className="shop-controls">
              <Link to="/shops" className="section-link">View All</Link>
              <button className="scroll-arrow" onClick={() => scrollStrip(-1)}>
                <FiChevronLeft size={18} />
              </button>
              <button className="scroll-arrow" onClick={() => scrollStrip(1)}>
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="popular-strip" id="popular-strip">
            {popularShops.length > 0 ? (
              popularShops
                .filter(shop => !city || shop.city?.toLowerCase().includes(city.toLowerCase()))
                .map((shop) => (
                  <ShopCard key={shop.id} shop={shop} variant="vertical" />
                ))
            ) : (
              <p>Loading popular shops...</p>
            )}
          </div>
        </section>

      </div>

      {/* Why Choose Mazi City — full-width section */}
      <Features />

      <style>{`
        .home-cat-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 14px;
        }

        .popular-strip {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding-bottom: 8px;
          scrollbar-width: none;
        }

        .popular-strip::-webkit-scrollbar { display: none; }

        .popular-strip > * {
          flex-shrink: 0;
          width: 200px;
        }

        .shop-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .scroll-arrow {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-secondary);
        }

        .scroll-arrow:hover {
          color: var(--primary);
          border-color: var(--primary);
        }

        @media (max-width: 1024px) {
          .home-cat-grid { grid-template-columns: repeat(4, 1fr); }
        }

        @media (max-width: 600px) {
          .home-cat-grid { grid-template-columns: repeat(4, 1fr); gap: 8px; }
        }

        @media (max-width: 400px) {
          .home-cat-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </>
  );
}