import React, { useState, useEffect } from 'react';
import axios2 from 'axios';
import axios from '../commons/axiosInstance';
import InvoiceHeader from './InvoiceHeader';
import InvoiceDetails from './InvoiceDetails';
import { Modal, Button } from 'react-bootstrap';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { show_alert } from '../functions';

const Invoice = () => {
  const url = '/bill';
  const [bill, setBill] = useState([]);
  const [id, setId] = useState([]);
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
  const handleSaveInvoice = () => {
    // Realiza cualquier acción adicional después de guardar la factura, si es necesario
    console.log('Factura guardada. Acciones adicionales se pueden realizar aquí.');
    // Opcionalmente, puedes actualizar la lista de facturas aquí
    getInvoice();
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
    console.log('Enviando factura con ID:', invoice);
  };

  const editInvoice = (invoiceId) => {
    // Lógica para editar factura, podrías redirigir a una página de edición o mostrar un modal
    console.log('Editar factura con ID:', invoiceId);
  };

  const deleteInvoice = (id) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: `¿Seguro de eliminar la factura ${id}?`,
      icon: 'question',
      text: 'No se podrá dar marcha atrás',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Eliminar factura con ID:", id);

        axios({
          method: 'DELETE',
          url: `http://localhost:8080/api/v1/bill/${id}`,
        })
          .then((response) => {
            // Manejar la respuesta, si es necesario
            console.log(response);
            show_alert('El producto fue eliminado', 'success');
            getInvoice(); // Actualizar la lista de productos después de eliminar
          })
          .catch((error) => {
            // Manejar el error
            console.error('Error al eliminar la factura:', error);
            show_alert('Error al eliminar la factura', 'error');
          });
      } else {
        show_alert('El producto no fue eliminado', 'info');
      }
    });
  };

  return (
    <div className='App'>
      <div className='container-fluid'>

      <div className='row mt-3'>
        <div className='col-md-4 offset-md-4'>
          <div className='d-grid mx-auto'>
            <button onClick={toggleInvoiceHeader} className='btn btn-primary'>
              Crear Factura
            </button>
          </div>
        </div>
      </div>
      {showInvoiceHeader && <InvoiceHeader />}
      
        
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

      
    </div>
  );
};

export default Invoice;
