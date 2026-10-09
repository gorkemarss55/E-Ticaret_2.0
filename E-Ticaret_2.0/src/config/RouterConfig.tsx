import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ProductDetails from '../pages/ProductDetails';
function RouterConfig() {
  return (

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product-detail/:productId" element={<ProductDetails />} />
      </Routes>
    
  )
}

export default RouterConfig