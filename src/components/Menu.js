// Menu.js
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div>
      <h2>Menú Principal</h2>
      <nav>
        <ul>
          <li>
            <Link to="/catalogs/products">Productos</Link>
          </li>
          <li>
            <Link to="/catalogs/product-families">Familia de Productos</Link>
          </li>
          <li>
            <Link to="/documents/invoice">Factura</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
