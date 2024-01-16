import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getActiveProducts } from '../../services/api';
import { show_alert } from '../functions';
import axios2 from 'axios';
import axios from '../commons/axiosInstance';

const InvoiceHeader = ({ onSave }) => {
  const url = "http://localhost:8080/api/v1/bill";
  const [bill, setBill] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [num_bill, setNumBill] = useState('');
  const [ruc_customer, setRucCustomer] = useState('');
  const [raz_customer, setRazCustomer] = useState('');
  const [perc_igv, setPercIgv] = useState('');
  const [product, setProduct] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [details, setDetails] = useState([]);
  const [activeProducts, setActiveProducts] = useState([]);

  useEffect(() => {
    fetchActiveProducts();
  }, []);

  const fetchActiveProducts = async () => {
    try {
      const products = await getActiveProducts();
      setActiveProducts(products);
    } catch (error) {
      console.error('Error al obtener productos activos:', error);
      show_alert('Error al obtener productos activos', 'error');
    }
  };

  const validar = () => {
    if (num_bill === '') {
      show_alert('Escribe el número de la factura', 'warning');
    } else if (ruc_customer === '') {
      show_alert('Escribe el RUC del Cliente', 'warning');
    } else if (raz_customer.trim() === '') {
      show_alert('Escribe la razón social del cliente', 'warning');
    } else if (perc_igv === '') {
      show_alert('Escribe el porcentaje de IGV', 'warning');
    } else if (details.length === 0) {
      show_alert('Agrega al menos un detalle', 'warning');
    } else {
      const parametros = { num_bill, ruc_customer, raz_customer: raz_customer.trim(), perc_igv, details };
      const metodo = 'POST'; // Deberías determinar aquí si es una operación de creación o actualización
      enviarSolicitud(metodo, parametros);
    }
  };

  const enviarSolicitud = async (metodo, parametros) => {
    try {
      const response = await axios({
        method: metodo,
        url: url,
        data: parametros
      });

      const tipo = response.status === 201 || 204 ? 'success' : 'error';
      const msj = response.status === 201 || 204;

      show_alert(tipo, msj);

      if (tipo === 'success') {
        show_alert('La operación fue exitosa', 'success');
        document.getElementById('btnCerrar').click();
        const updatedBill = await axios.get(url).then((response) => response.data.content);
        setBill(updatedBill);
        onSave(updatedBill); // Llamar a la función onSave con la factura actualizada
        // Limpiar los campos después de la operación
        setNumBill('');
        setRucCustomer('');
        setRazCustomer('');
        setPercIgv('');
        setDetails([]);
      }
    } catch (error) {
      show_alert('Error en la solicitud', 'error');
      console.error('Error en la solicitud:', error);
    }
  };

  const openDetailsModal = () => {
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
  };

  const handleDetailsSave = () => {
    setDetails([...details, { product, cantidad }]);
    setProduct('');
    setCantidad(1);
    closeDetailsModal();
  };

  return (
    <div>
      <h2>Crear Factura</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="num_bill" className="form-label">Número de Factura</label>
          <input
            type="text"
            className="form-control"
            id="num_bill"
            value={num_bill}
            onChange={(e) => setNumBill(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ruc_customer" className="form-label">RUC del Cliente</label>
          <input
            type="text"
            className="form-control"
            id="ruc_customer"
            value={ruc_customer}
            onChange={(e) => setRucCustomer(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="raz_customer" className="form-label">Razón Social del Cliente</label>
          <input
            type="text"
            className="form-control"
            id="raz_customer"
            value={raz_customer}
            onChange={(e) => setRazCustomer(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="percIgv" className="form-label">Porcentaje de IGV</label>
          <input
            type="text"
            className="form-control"
            id="percIgv"
            value={perc_igv}
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
                Producto: {detail.product.id}, Cantidad: {detail.cantidad}
              </li>
            ))}
          </ul>
        </div>

        <Modal show={showDetailsModal} onHide={closeDetailsModal}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Detalle</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='input-group mb-3'>
              <label className='input-group-text'>  Producto</label>
              <select
                id='product'
                className='form-control'
                value={product.id}
                onChange={(e) => setProduct({ id: e.target.value })}
              >
                <option value=''>Seleccionar  Producto</option>
                {activeProducts.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>  
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

        <div className="d-grid col-6 mx-auto">
          <button onClick={() => validar()} className="btn btn-success">
            <i className="fa-solid fa-floppy-disk"></i>Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvoiceHeader;
