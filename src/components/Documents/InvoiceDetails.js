import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InvoiceHeader from './InvoiceHeader';
import { Modal, Button } from 'react-bootstrap';

const InvoiceDetails = () => {
  const url = 'http://localhost:8080/api/v1/bill-detail';
  const [bill_detail, setBill_Detail] = useState([]);
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
      console.log(respuesta.data);
      setBill_Detail(respuesta.data.content);
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
                      <th>#</th>
                      <th>ID DETALLE</th>
                      <th>ID BILL</th>
                      <th>ID PRODUCTO</th>
                      <th>CANTIDAD</th>
                      <th>SUBTOTAL</th>
                    
                    </tr>
                  </thead>
                  <tbody className='table-group-divider'>
                    {bill_detail.map((bill_detail, i) => (
                      <tr key={bill_detail.id}>
                        <td>{i + 1}</td>
                        <td>{bill_detail.id}</td>
                        <td>{bill_detail.bill.id}</td>
                        <td>{bill_detail.product.id}</td>
                        <td>{bill_detail.cantidad}</td>
                        <td>{bill_detail.sub}</td>
                        
                        <td>
                      
                        </td>
                        <td>
                          <button
                            onClick={() => editInvoice(bill_detail.id)}
                            className='btn btn-warning'
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => deleteInvoice(bill_detail.id)}
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

    </div>
  );
};

export default InvoiceDetails;
