import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alert } from '../functions';
import { act } from 'react-dom/test-utils';

const ProductFamily = () => {
  const url = "http://localhost:8080/api/v1/family";
  const [family, setFamily] = useState([]);
  const [id, setId] = useState([]);
  const [cod_family, setCod_Family] = useState('');
  const [name,  setName] = useState('');
  const [active, setActive] = useState('');
  const [created_date, setCreated_Date] = useState('');
  const [operation, setOperation] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    getFamily();
  }, []);

  const getFamily = async () => {
    try {
      const respuesta = await axios.get(url);
      console.log(respuesta.data); // Verifica la estructura de la respuesta
      setFamily(respuesta.data.content); // Accede a la propiedad content
    } catch (error) {
      console.error('Error al obtener la familia de productos:', error);
    }
  }
  
  const openModal = (op, id, cod_family, name, active,created_date) =>{
      setId('');
      setCod_Family('');
      setName('');
      setActive('');
      setCreated_Date('');
      setOperation(op);
      if(op ===1){
        setTitle('Registrar familia de Producto');

      }
      else if( op === 2){
        setTitle('Editar Producto');
        setId(id);
      setCod_Family(cod_family);
      setName(name);
      setActive(active);
      setCreated_Date(created_date);
      }

      window.setTimeout(function(){
        document.getElementById('nombre').focus();
      }, 500);

  }
  const validar =() =>{
    var parametros;
    var metodo;
   
    if(cod_family === ''){
      show_alert('Escribe el codigo de la familia', 'warning');
    }
    else if(name.trim() === ''){
      show_alert('Escribe el nombre del producto', 'warning');
    }
    
    // else if(active === ''){
    //   show_alert('Escribe el estado del producto', 'warning');
    // }
   
    // else if(created_date === ''){
    //   show_alert('Escribe el create del producto', 'warning');
    // }
    else{
      if(operation === 1){
        parametros ={cod_family:cod_family.trim() ,name:name.trim(),  active:active !== undefined ? active : false, created_date:created_date.trim()};
        metodo='POST';

      }
      else{
        parametros ={id:id ,cod_family:cod_family.trim() ,name:name.trim(),  active:active !== undefined ? active : false, created_date:created_date.trim()};
        metodo='PUT';
      }
      enviarSolicitud(metodo, parametros);
    }
  }

  const enviarSolicitud = async(metodo, parametros) => {
    await axios({ 
      method:metodo, url: url, data:parametros
    }).then(function(respuesta){
      console.log(respuesta);
      var tipo= respuesta.data[0];
      var msj =respuesta.data[1];
      show_alert(msj, tipo);
      if(tipo === 'success'){
        document.getElementById('btnCerrar').click();
        getFamily();
      }
    })
    .catch(function(error){
      show_alert('Error en la solicitud', error);
      console.log(error);
    })
  }
  // const deleteProduct =(id, name)=>{
  //   const MySwal = withReactContent(Swal);
  //   MySwal.fire({
  //     title:'¿Seguro de eliminar el producto '+id+ '?',
  //     icon: 'question', text:'No se podrá dar marcha atrás',
  //     showCancelButton:true, confirmButtonText:'Sí, eliminar', cancelButtonText:'Cancelar'
  //   }).then((result) => {
  //     if(result.isConfirmed){
        
  //       console.log("Eliminar producto con ID:", id);
  //       enviarSolicitud('DELETE', {id:id});
  //     }
  //     else{
  //       show_alert('El producto no fue eliminado', 'info');
  //     }
  //   })
  // }
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
        console.log("Eliminar familia-producto con ID:", id);

        axios({
          method: 'DELETE',
          url: `http://localhost:8080/api/v1/family/${id}`,
        })
          .then((response) => {
            // Manejar la respuesta, si es necesario
            console.log(response);
            show_alert('la familia producto fue eliminado', 'success');
            getFamily(); // Actualizar la lista de productos después de eliminar
          })
          .catch((error) => {
            // Manejar el error
            console.error('Error al eliminar la familia producto:', error);
            show_alert('Error al eliminar la familia producto', 'error');
          });
      } else {
        show_alert('La familia producto no fue eliminado', 'info');
      }
    });
  };


  return (
    <div className='App'>
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-md-4 offset-md-4'>
            <div className='d-grid mx-auto'>
              <button onClick={()=> openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                <i className='fas fa-plus-circle'></i> Añadir
              </button>
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
                  {family.map((family, i) => (
                    <tr key={family.id}>
                      <td>{(i + 1)}</td>
                      <td>{family.cod_family}</td>
                      <td>{family.name}</td>
                      <td>{family.active !== undefined ? (family.active ? 'Activo' : 'Inactivo') : 'N/A'}</td>

                      <td>{family.created_date}</td>
                      
                      <td>
                        <button onClick={()=> openModal(2,family.id,family.cod_family, family.name,
                          family.active, family.created_date)} className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                          <i className='fas fa-pencil-alt'>

                         
                          </i>
                        </button>
                        &nbsp;
                        {/* ELIMINAR */}
                        <button onClick={()=> deleteFamily(family.id, family.name)} className='btn btn-danger'>
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
              <div className='input-group mb-3'>
                <span className='input-group-text'> <i className='fa-solid fa-gift'></i></span>
                <input type='text' id='codigo' className='form-control' placeholder='Código de Familia Producto' value={cod_family}
                 onChange={(e)=> setCod_Family(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'> <i className='fa-solid fa-gift'></i></span>
                <input type='text' id='nombre' className='form-control' placeholder='Nombre Familia Producto' value={name}
                 onChange={(e)=> setName(e.target.value)}></input>
              </div>   
              <div className='input-group mb-3'>
                    <span className='input-group-text'> <i className='fa-solid fa-gift'></i></span>
                    <select id='active' className='form-control' value={active} onChange={(e) => setActive(e.target.value === 'true')}>
                        <option value='true'>Activo</option>
                        <option value='false'>Inactivo</option>
                    </select>
              </div>       
              <div className='input-group mb-3'>
                <span className='input-group-text'> <i className='fa-solid fa-gift'></i></span>
                <input type='text' id='create' className='form-control' placeholder='create' value={created_date}
                 onChange={(e)=> setCreated_Date(e.target.value)}></input>
              </div>
            
              <div className='d-grid col-6 mx-auto'>
                {/* //guardar producto */}
                <button onClick={()=> validar()} className='btn btn-success'>
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
