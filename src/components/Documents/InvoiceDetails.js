import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import axios2 from '../commons/axiosInstance';
import axios from '../commons/axiosInstance';
import InvoiceHeader from './InvoiceHeader';
import { Modal, Button } from 'react-bootstrap';

const InvoiceDetails = () => {
  const url = '/bill-detail';
  const [detailbill, setDetailbill] = useState([]);
  const [showList, setShowList] = useState(true);
  const [showInvoiceHeader, setShowInvoiceHeader] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
const [invoiceDetails, setInvoiceDetails] = useState([]);

  useEffect(() => {
    if (showList) {
      getInvoice();
    }
  }, [showList]);

  const getInvoice = async () => {
    try {
      const respuesta = await axios.get(url);
      
      setDetailbill(respuesta.data.content);

      console.log("datos de SetBIll", respuesta.data.content);
    } catch (error) {
      console.error('Error al obtener los detalles de facturas:', error);
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
    setSelectedInvoiceId(invoice.id);
    console.log("Selected Invoice ID:", invoice.id);
    getInvoiceDetails(invoice.id);
    toggleDetailsModal();
  };

  const getInvoiceDetails = async (invoiceId) => {
    try {
      const response = await axios.get(`${url}/bybill/${invoiceId}`);
      setInvoiceDetails(response.data.content);
    } catch (error) {
      console.error('Error al obtener los detalles de facturas:', error);
    }
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
                  {invoiceDetails.map((bill_detail, i) => (  bill_detail.bill.id === selectedInvoiceId && (
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
                         
                          </button>
                        </td>
                      </tr>
                    )))}
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
