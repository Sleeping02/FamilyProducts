import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const InvoiceHeader = ({ onSave }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [numBill, setNumBill] = useState('');
  const [rucCustomer, setRucCustomer] = useState('');
  const [razCustomer, setRazCustomer] = useState('');
  const [percIgv, setPercIgv] = useState('');

  const [productId, setProductId] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [details, setDetails] = useState([]);

  const openDetailsModal = () => {
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
  };

  const handleSave = () => {
    onSave({ numBill, rucCustomer, razCustomer, percIgv, details });
    // Puedes manejar el resultado como sea necesario
    // Por ejemplo, cerrar el formulario o limpiar los campos
    setNumBill('');
    setRucCustomer('');
    setRazCustomer('');
    setPercIgv('');
    setDetails([]);
  };

  const handleDetailsSave = () => {
    setDetails([...details, { productId, cantidad }]);
    setProductId('');
    setCantidad(1);
    closeDetailsModal();
  };

  return (
    <div>
      <h2>Crear Factura</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="numBill" className="form-label">Número de Factura</label>
          <input
            type="text"
            className="form-control"
            id="numBill"
            value={numBill}
            onChange={(e) => setNumBill(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rucCustomer" className="form-label">RUC del Cliente</label>
          <input
            type="text"
            className="form-control"
            id="rucCustomer"
            value={rucCustomer}
            onChange={(e) => setRucCustomer(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="razCustomer" className="form-label">Razón Social del Cliente</label>
          <input
            type="text"
            className="form-control"
            id="razCustomer"
            value={razCustomer}
            onChange={(e) => setRazCustomer(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="percIgv" className="form-label">Porcentaje de IGV</label>
          <input
            type="text"
            className="form-control"
            id="percIgv"
            value={percIgv}
            onChange={(e) => setPercIgv(e.target.value)}
          />
        </div>

        <button type="button" className="btn btn-secondary" onClick={openDetailsModal}>
          Agregar Detalles
        </button>

        <div className="mt-3">
          <h5>Detalles Agregados:</h5>
          <ul>
            {details.map((detail, index) => (
              <li key={index}>
                Producto ID: {detail.productId}, Cantidad: {detail.cantidad}
              </li>
            ))}
          </ul>
        </div>

        <Modal show={showDetailsModal} onHide={closeDetailsModal}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Detalle</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Producto ID:</label>
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
            <label>Cantidad:</label>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDetailsModal}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleDetailsSave}>
              Guardar Detalle
            </Button>
          </Modal.Footer>
        </Modal>

        <hr />

        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Guardar Factura
        </button>
      </form>
    </div>
  );
};

export default InvoiceHeader;
