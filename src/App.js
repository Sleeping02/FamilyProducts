// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Menu from './components/Menu';
import Product from './components/Catalogs/Product';
import ProductFamily from './components/Catalogs/ProductFamily';
import Invoice from './components/Documents/Invoice';
import InvoiceDetails from './components/Documents/InvoiceDetails';
import styles from './App.css';

const App = () => {
  return (
    <Router>
      <div className={styles.appContainer}>
        <Menu />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalogs/products" element={<Product />} />
          <Route path="/catalogs/product-families" element={<ProductFamily />} />
          <Route path="/documents/invoice" element={<Invoice />} />
          <Route path="/documents/invoiceDetails" element={<InvoiceDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
