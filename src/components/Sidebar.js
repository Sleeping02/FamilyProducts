// Sidebar.js
import React from 'react';
import './Sidebar.css'; // Importa tus estilos de Sidebar.css

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button onClick={onClose} className="close-button">
        &times;
      </button>
      {/* Contenido del Sidebar */}
      <div className="sidebar-content">
        <p>Contenido del Sidebar</p>
      </div>
    </div>
  );
};

export default Sidebar;
