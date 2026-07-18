/**
 * Register.jsx
 * Business owner registration / "List Your Shop" form.
 */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', shop: '', category: '', phone: '', address: '' })

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Shop listed successfully! Our team will verify and publish your shop within 24 hours.')
    navigate('/')
  }

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: 480 }}>
        <div className="auth-logo">MAZI <span>CITY</span></div>
        <h2 className="auth-title" style={{ marginTop: 16 }}>List Your Shop</h2>
        <p className="auth-sub">Fill in your shop details to get started</p>

        <form onSubmit={handleSubmit} className="auth-form" style={{ textAlign: 'left' }}>
          {[
            { key: 'name',     placeholder: 'Your Full Name',    type: 'text' },
            { key: 'shop',     placeholder: 'Shop Name',         type: 'text' },
            { key: 'phone',    placeholder: 'Mobile Number',     type: 'tel'  },
            { key: 'address',  placeholder: 'Shop Address',      type: 'text' },
          ].map(f => (
            <div className="auth-input-wrap" key={f.key}>
              <input
                type={f.type} placeholder={f.placeholder}
                value={form[f.key]}
                onChange={e => update(f.key, e.target.value)}
                required
                style={{ flex: 1, border: 'none', fontSize: 14 }}
              />
            </div>
          ))}

          <select
            className="auth-input-wrap"
            style={{ width: '100%', border: 'none', fontSize: 14, color: 'var(--text-secondary)', appearance: 'none' }}
            value={form.category}
            onChange={e => update('category', e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option>Grocery</option>
            <option>Clothing</option>
            <option>Electronics</option>
            <option>Food & Restaurant</option>
            <option>Medical</option>
            <option>Education</option>
            <option>Home Services</option>
            <option>Other</option>
          </select>

          <button type="submit" className="auth-btn">
            Submit Listing <FiArrowRight size={17} />
          </button>
        </form>

        <p className="auth-footer" style={{ marginTop: 20 }}>
          Already have an account? <Link to="/login">Login →</Link>
        </p>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh; background: var(--gray-50);
          display: flex; align-items: center; justify-content: center; padding: 24px;
        }
        .auth-card {
          background: var(--white); border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg); padding: 40px 36px;
          width: 100%; text-align: center;
        }
        .auth-logo { font-size: 24px; font-weight: 900; }
        .auth-logo span { color: var(--accent); }
        .auth-title { font-size: 20px; font-weight: 800; margin-bottom: 6px; }
        .auth-sub   { font-size: 13px; color: var(--text-secondary); margin-bottom: 24px; }
        .auth-form  { display: flex; flex-direction: column; gap: 12px; }
        .auth-input-wrap {
          display: flex; align-items: center;
          border: 1.5px solid var(--border); border-radius: var(--radius-md);
          padding: 12px 16px;
        }
        .auth-input-wrap:focus-within { border-color: var(--primary); }
        .auth-input-wrap input { flex: 1; border: none; font-size: 14px; font-family: inherit; }
        .auth-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          background: var(--primary); color: #fff;
          padding: 13px; border-radius: var(--radius-md);
          font-size: 15px; font-weight: 700; cursor: pointer;
          transition: background 0.2s;
        }
        .auth-btn:hover { background: var(--primary-dark); }
        .auth-footer a { color: var(--primary); font-weight: 600; }
        @media (max-width: 480px) { .auth-card { padding: 28px 20px; } }
      `}</style>
    </div>
  )
}