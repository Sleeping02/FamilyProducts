import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InvoiceHeader from './InvoiceHeader';
import InvoiceDetails from './InvoiceDetails';
import { Modal, Button } from 'react-bootstrap';

const Invoice = () => {
  const url = 'http://localhost:8080/api/v1/bill';
  const [bill, setBill] = useState([]);
  const [showList, setShowList] = useState(true);
  const [showInvoiceHeader, setShowInvoiceHeader] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    if (showList) {
      getInvoice();
    }
  }, [showList]);

  const getInvoice = async () => {
    try {
      const respuesta = await axios.get(url);
      setBill(respuesta.data.content);
    } catch (error) {
      console.error('Error al obtener las facturas:', error);
    }
  };

  const toggleList = () => {
    setShowList(!showList);
  };

  const toggleInvoiceHeader = () => {
    setShowInvoiceHeader(!showInvoiceHeader);
  };

  const toggleDetailsModal = () => {
    setShowDetailsModal(!showDetailsModal);
  };

  const toggleInvoiceDetails = (invoice) => {
    setSelectedInvoice(invoice);
    toggleDetailsModal();
  };

  const editInvoice = (invoiceId) => {
    // Lógica para editar factura, podrías redirigir a una página de edición o mostrar un modal
    console.log('Editar factura con ID:', invoiceId);
  };

  const deleteInvoice = (invoiceId) => {
    // Lógica para eliminar factura, podrías mostrar un modal de confirmación antes de la eliminación
    console.log('Eliminar factura con ID:', invoiceId);
  };

  return (
    <div className='App'>
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-md-4 offset-md-4'>
            <div className='d-grid mx-auto'>
              <button onClick={toggleList} className='btn btn-dark'>
                {showList ? 'Ocultar Lista' : 'Mostrar Lista'}
              </button>
            </div>
          </div>
        </div>
        {showList && (
          <div className='row mt-3'>
            <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
              <div className='table-responsive'>
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>#ID FACTURA</th>
                      <th>NUMERO DE FACTURA</th>
                      <th>RUC DE CLIENTE</th>
                      <th>RAZON SOCIAL DEL CLIENTE</th>
                      <th>SUBTOTAL</th>
                      <th>PORCENTAJE DE IGV</th>
                      <th>IGV</th>
                      <th>TOTAL</th>
                      <th>DETALLES DE FACTURA</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody className='table-group-divider'>
                    {bill.map((invoice, i) => (
                      <tr key={invoice.id}>
                        <td>{i + 1}</td>
                        <td>{invoice.num_bill}</td>
                        <td>{invoice.ruc_customer}</td>
                        <td>{invoice.raz_customer}</td>
                        <td>{invoice.subtotal}</td>
                        <td>{invoice.perc_igv}</td>
                        <td>{invoice.igv}</td>
                        <td>{invoice.total}</td>
                        <td>
                          <button
                            onClick={() => toggleInvoiceDetails(invoice)}
                            className='btn btn-info'
                          >
                            Ver Detalles
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => editInvoice(invoice.id)}
                            className='btn btn-warning'
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => deleteInvoice(invoice.id)}
                            className='btn btn-danger'
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='row mt-3'>
        <div className='col-md-4 offset-md-4'>
          <div className='d-grid mx-auto'>
            <button onClick={toggleInvoiceHeader} className='btn btn-primary'>
              Crear Factura
            </button>
          </div>
        </div>
      </div>

      {selectedInvoice && (
        <Modal show={showDetailsModal} onHide={toggleDetailsModal}>
          <Modal.Header closeButton>
            <Modal.Title>Detalles de la Factura</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InvoiceDetails invoice={selectedInvoice} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={toggleDetailsModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {showInvoiceHeader && <InvoiceHeader />}
    </div>
  );
};

export default Invoice;
