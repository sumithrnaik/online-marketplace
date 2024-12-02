import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage'
import ProductPage from './ProductPage'
import SellPage from './SellPage';

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/sell" element={<SellPage/>}/>
    </Routes>
  </Router>
  )
}

export default App
