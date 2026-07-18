import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import BottomNav from '../components/BottomNav.jsx'

function MainLayout() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="page-main">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}

export default MainLayout