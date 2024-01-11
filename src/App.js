// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Menu from './components/Menu';
import Product from './components/Catalogs/Product';
import ProductFamily from './components/Catalogs/ProductFamily';
import Invoice from './components/Documents/Invoice';  // Cambiado a Invoice
import InvoiceDetails from './components/Documents/InvoiceDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/catalogs/products" element={<Product />} />
        <Route path="/catalogs/product-families" element={<ProductFamily />} />
        <Route path="/documents/invoice" element={<Invoice />} />
        <Route path="/documents/invoiceDetails" element={<InvoiceDetails   />} />
        {/* Redirige a /login por defecto */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
