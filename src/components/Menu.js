// Menu.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de tener Bootstrap instalado y esta importación
import styles from './css/Menu.module.css';  // Importa los estilos desde un archivo separado

const Menu = () => {
  return (
    <Navbar bg="dark" variant="dark" className={styles.menuSidebar}>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/catalogs/products">
          Productos
        </Nav.Link>
        <Nav.Link as={Link} to="/catalogs/product-families">
          Familia de Productos
        </Nav.Link>
        <Nav.Link as={Link} to="/documents/invoice">
          Factura
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Menu;
