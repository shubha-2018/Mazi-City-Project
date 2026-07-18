/**
 * Login.jsx
 * Simple OTP/password login page (no layout chrome — standalone).
 */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiPhone, FiArrowRight } from 'react-icons/fi'

export default function Login() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [step, setStep]   = useState(1)  /* 1: phone, 2: OTP */
  const [otp, setOtp]     = useState('')

  const handleSendOtp = (e) => {
    e.preventDefault()
    if (phone.length === 10) setStep(2)
  }

  const handleVerify = (e) => {
    e.preventDefault()
    if (otp.length === 6) navigate('/')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Logo */}
        <div className="auth-logo">MAZI <span>CITY</span></div>
        <p className="auth-tagline">आपले शहर, आपली सेवा</p>

        {step === 1 ? (
          <>
            <h2 className="auth-title">Login / Sign Up</h2>
            <p className="auth-sub">Enter your mobile number to continue</p>
            <form onSubmit={handleSendOtp} className="auth-form">
              <div className="auth-input-wrap">
                <span className="auth-prefix">🇮🇳 +91</span>
                <input
                  type="tel" maxLength={10}
                  value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Mobile Number" required
                />
              </div>
              <button type="submit" className="auth-btn">
                Send OTP <FiArrowRight size={17} />
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="auth-title">Enter OTP</h2>
            <p className="auth-sub">Sent to +91 {phone} — <button className="auth-change" onClick={() => setStep(1)}>Change</button></p>
            <form onSubmit={handleVerify} className="auth-form">
              <div className="auth-input-wrap">
                <input
                  type="text" maxLength={6}
                  value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="6-digit OTP" required
                />
              </div>
              <button type="submit" className="auth-btn">
                Verify &amp; Login <FiArrowRight size={17} />
              </button>
            </form>
          </>
        )}

        <p className="auth-footer">
          New business? <Link to="/register">List your shop →</Link>
        </p>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh; background: var(--gray-50);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
        }
        .auth-card {
          background: var(--white);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          padding: 40px 36px;
          width: 100%; max-width: 400px;
          text-align: center;
        }
        .auth-logo {
          font-size: 26px; font-weight: 900; color: var(--gray-900);
          letter-spacing: -0.5px; margin-bottom: 4px;
        }
        .auth-logo span { color: var(--accent); }
        .auth-tagline { font-size: 13px; color: var(--text-secondary); margin-bottom: 28px; }
        .auth-title { font-size: 20px; font-weight: 800; margin-bottom: 6px; }
        .auth-sub { font-size: 13px; color: var(--text-secondary); margin-bottom: 24px; }
        .auth-form { display: flex; flex-direction: column; gap: 14px; }
        .auth-input-wrap {
          display: flex; align-items: center; gap: 10px;
          border: 1.5px solid var(--border); border-radius: var(--radius-md);
          padding: 12px 16px;
        }
        .auth-input-wrap:focus-within { border-color: var(--primary); }
        .auth-prefix { font-size: 14px; font-weight: 600; flex-shrink: 0; }
        .auth-input-wrap input { flex: 1; border: none; font-size: 15px; }
        .auth-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          background: var(--primary); color: #fff;
          padding: 13px; border-radius: var(--radius-md);
          font-size: 15px; font-weight: 700;
          cursor: pointer; transition: background 0.2s;
        }
        .auth-btn:hover { background: var(--primary-dark); }
        .auth-change { color: var(--primary); font-size: 13px; cursor: pointer; border: none; background: none; }
        .auth-footer { margin-top: 22px; font-size: 13px; color: var(--text-secondary); }
        .auth-footer a { color: var(--primary); font-weight: 600; }
      `}</style>
    </div>
  )
}