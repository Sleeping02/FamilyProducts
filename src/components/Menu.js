// Menu.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './css/Menu.module.css';

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  // Ocultar el menú en la página de Login
  if (location.pathname === '/login') {
    return null;
  }

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={styles.menuContainer}>
      <button onClick={handleToggleMenu} className={styles.toggleButton}>
        ☰
      </button>

      <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/catalogs/products" onClick={() => setShowMenu(false)}>
              Productos
            </Nav.Link>
            <Nav.Link as={Link} to="/catalogs/product-families" onClick={() => setShowMenu(false)}>
              Familia de Productos
            </Nav.Link>
            <Nav.Link as={Link} to="/documents/invoice" onClick={() => setShowMenu(false)}>
              Factura
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Menu;
