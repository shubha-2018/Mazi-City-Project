import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout  from '../layouts/MainLayout.jsx'
import Home        from '../pages/Home.jsx'
import ShopListing from '../pages/ShopListing.jsx'
import ShopDetails from '../pages/ShopDetails.jsx'
import Categories  from '../pages/Categories.jsx'
import Login       from '../pages/Login.jsx'
import Register    from '../pages/Register.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/"           element={<Home />} />
        <Route path="/shops"      element={<ShopListing />} />
        <Route path="/shops/:id"  element={<ShopDetails />} />
        <Route path="/categories" element={<Categories />} />
      </Route>
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default AppRoutes