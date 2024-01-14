import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alert } from '../functions';

const ProductFamily = () => {
  const url = "http://localhost:8080/api/v1/family";
  const [family, setFamily] = useState([]);
  const [filteredFamily, setFilteredFamily] = useState([]);
  const [id, setId] = useState('');
  const [cod_family, setCod_Family] = useState('');
  const [name, setName] = useState('');
  const [active, setActive] = useState('');
  // const [createdDate, setCreatedDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchingByName, setIsSearchingByName] = useState(true);
  const [operation, setOperation] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    getFamily();
    
  }, []);

  const getFamily = async () => {
    try {
      const response = await axios.get(url);
      setFamily(response.data.content);
      setFilteredFamily(response.data.content);
    } catch (error) {
      console.error('Error al obtener la familia de productos:', error);
    }
  };

  const searchFamily = (searchTerm) => {
    const filtered = family.filter((item) =>
      item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredFamily(filtered);
  };
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (isSearchingByName) {
      searchFamily(searchTerm);
    } else {
      // Lógica para otros tipos de búsqueda si es necesario
    }
  };

  const openModal = (op, id, cod_family, name, active) => {
    setId('');
    setCod_Family('');
    setName('');
    setActive(true);
    // setCreatedDate('');
    setOperation(op);
    if (op === 1) {
      setTitle('Registrar familia de Producto');
    } else if (op === 2) {
      setTitle('Editar Producto');
      setId(id);
      setCod_Family(cod_family);
      setName(name);
      setActive(active);
    }

    window.setTimeout(function () {
      document.getElementById('name').focus();
    }, 500);
  };

  const validar = () => {
    var parametros;
    var metodo;

    if (name.trim() === '') {
      show_alert('Escribe el nombre del producto', 'warning');
    } else {
      if (operation === 1) {
        parametros = { cod_family: cod_family.trim(), name: name.trim(), active: active };
        metodo = 'POST';
        
      } else if (operation === 2) {
        parametros = { id: id, cod_family: cod_family.trim(), name: name.trim(), active: active };
        metodo = 'PUT';
        
      }
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
      console.log('Respuesta completa del servidor:', response);
      const tipo = response.status === 201  || 204? 'success' : 'error';
      const msj = response.status === 201 || 204;
  
      show_alert(tipo,msj );
      
      if (tipo === 'success') {
        show_alert('La operación fue exitosa', 'success');
        document.getElementById('btnCerrar').click();
        // Obtener el nuevo estado de 'family' después de la operación
        const updatedFamily = await axios.get(url).then((response) => response.data.content);
        setFamily(updatedFamily);
        setFilteredFamily(updatedFamily);
      }
    } catch (error) {
      // Mostrar la alerta de error
      show_alert('Error en la solicitud', 'error');
      console.error('Error en la solicitud:', error);
    }
  };

  const filterFamily = async (filterValue) => {
    let endpoint = 'http://localhost:8080/api/v1/family';

    if (filterValue !== 'all') {
      endpoint += `/byActive/${filterValue === 'true'}`;
    }

    try {
      const response = await axios.get(endpoint);

      if (filterValue !== 'all') {
        setFamily(response.data);
        setFilteredFamily(response.data);
      } else {
        getFamily();
      }
    } catch (error) {
      console.error('Error al obtener las familias de productos:', error);
      show_alert('Error al obtener las familias de productos', 'error');
    }
  };

  const deleteFamily = (id, name) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: `¿Seguro de eliminar el producto ${name}?`,
      icon: 'question',
      text: 'No se podrá dar marcha atrás',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: 'DELETE',
          url: `http://localhost:8080/api/v1/family/${id}`,
        })
          .then((response) => {
            console.log(response);
            show_alert('La familia producto fue eliminada', 'success');
            getFamily();
          })
          .catch((error) => {
            console.error('Error al eliminar la familia producto:', error);
            show_alert('Error al eliminar la familia producto', 'error');
          });
      } else {
        show_alert('La familia producto no fue eliminada', 'info');
      }
    });
  };

  return (
    <div className='App'>
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-md-12 text-center'>
            <h1>Familia de Productos</h1>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-md-4 offset-md-4'>
            <div className='d-grid mx-auto'>
              <button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                <i className='fas fa-plus-circle'></i> Añadir
              </button>
            </div>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
            <div className='col-md-12 text-center'>
              <h2>Búsqueda avanzada</h2>
            </div>
            <div className='input-group'>
              <label className='input-group-text' htmlFor='searchByStatus'>Estado:</label>
              <select id='searchByStatus' className='form-select' onChange={(e) => filterFamily(e.target.value)}>
                <option value='all'>Todos</option>
                <option value='true'>Activos</option>
                <option value='false'>Inactivos</option>
              </select>
              <label className='input-group-text' htmlFor='searchByName'>Nombre:</label>
              <input
                type='text'
                id='searchByName'
                className='form-control'
                placeholder='Nombre del producto'
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
            <div className='table-responsive'>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>#ID FAMILIA PRODUCTO</th>
                    <th>CODIGO DE FAMILIA PRODUCTO</th>
                    <th>FAMILIA PRODUCTO</th>
                    <th>ESTADO</th>
                    <th>FECHA DE CREACION</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className='table-group-divider'>
                  {filteredFamily.map((familyItem, i) => (
                    <tr key={familyItem.id}>
                      <td>{(i + 1)}</td>
                      <td>{familyItem.cod_family}</td>
                      <td>{familyItem.name}</td>
                      <td>{familyItem.active !== undefined ? (familyItem.active ? 'Activo' : 'Inactivo') : 'N/A'}</td>
                      <td>{familyItem.created_date}</td>
                      <td>
                        <button onClick={() => openModal(2, familyItem.id, familyItem.cod_family, familyItem.name, familyItem.active, familyItem.created_date)} className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                          <i className='fas fa-pencil-alt'></i>
                        </button>
                        &nbsp;
                        <button onClick={() => deleteFamily(familyItem.id, familyItem.name)} className='btn btn-danger'>
                          <i className='fas fa-trash-alt'></i>
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
      <div id='modalProducts' className='modal fade' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <label className='h5'>{title}</label>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <input type='hidden' id='id'></input>
              {/* <div className='input-group mb-3'>
                <span className='input-group-text'>Codigo Familia<i className='fa-solid fa-gift'></i></span>
                <input type='text' id='codigo' className='form-control' placeholder='Codigo Familia Producto' value={cod_family} onChange={(e) => setCod_Family(e.target.value)}></input>
              </div> */}
              <div className='input-group mb-3'>
                <span className='input-group-text'>Nombre<i className='fa-solid fa-gift'></i></span>
                <input type='text' id='name' className='form-control' placeholder='Nombre Familia Producto' value={name} onChange={(e) => setName(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <label htmlFor='active' className='input-group-text'>
                  Estado
                </label>
                <select
                  id='active'
                  className='form-control'
                  value={active ? 'true' : 'false'}
                  onChange={(e) => setActive(e.target.value === 'true')}
                >
                  <option value='true'>Activo</option>
                  <option value='false'>Inactivo</option>
                </select>
              </div>
              <div className='d-grid col-6 mx-auto'>
                <button onClick={() => validar()} className='btn btn-success'>
                  <i className='fa-solid fa-floppy-disk'></i>Guardar
                </button>
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>CERRAR</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFamily;
