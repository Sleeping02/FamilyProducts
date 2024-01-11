import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alert } from '../functions';
import { act } from 'react-dom/test-utils';

const Product = () => {
  const url = "http://localhost:8080/api/v1/products";
  const [product, setProduct] = useState([]);
  const [id, setId] = useState([]);
  const [name, setName] = useState('');
  const [cod_product, setCod_Product] = useState('');
  const [familyProduct, setFamilyProduct] = useState({id: ''});
  const [active, setActive] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [created_date, setCreated_Date] = useState('');
  const [operation, setOperation] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const respuesta = await axios.get(url);
      console.log(respuesta.data); // Verifica la estructura de la respuesta
      setProduct(respuesta.data.content); // Accede a la propiedad content
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  }
  
  const openModal = (op, id, name, cod_product, familyProduct, active, price, stock, created_date) =>{
      setId('');
      setName('');
      setCod_Product('');
      setFamilyProduct({id:''});
      setActive('');
      setPrice('');
      setStock('');
      setCreated_Date('');
      setOperation(op);
      if(op ===1){
        setTitle('Registrar Producto');

      }
      else if( op === 2){
        setTitle('Editar Producto');
        setId(id);
        setName(name);
        setCod_Product(cod_product);
        setFamilyProduct(familyProduct);
        setActive(active);
        setPrice(price);
        setStock(stock);
        setCreated_Date(created_date);
      }

      window.setTimeout(function(){
        document.getElementById('nombre').focus();
      }, 500);

  }
  const validar =() =>{
    var parametros;
    var metodo;
    if(name.trim() === ''){
      show_alert('Escribe el nombre del producto', 'warning');
    }
    else if(cod_product === ''){
      show_alert('Escribe el codigo del producto', 'warning');
    }
    else if(familyProduct === ''){
      show_alert('Escribe el id de familia del producto', 'warning');
    }
    // else if(active === ''){
    //   show_alert('Escribe el estado del producto', 'warning');
    // }
    else if(price === ''){
      show_alert('Escribe el precio del producto', 'warning');
    }
    else if(stock === ''){
      show_alert('Escribe el stock del producto', 'warning');
    }
    // else if(created_date === ''){
    //   show_alert('Escribe el create del producto', 'warning');
    // }
    else{
      if(operation === 1){
        parametros ={name:name.trim(), cod_product:cod_product.trim(),familyProduct: { id: familyProduct.id }, active:active !== undefined ? active : false, price:price, stock:stock, created_date:created_date.trim()};
        metodo='POST';

      }
      else{
        parametros ={id:id,name:name.trim(),cod_product:cod_product.trim(), familyProduct: { id: familyProduct.id }, active:active !== undefined ? active : false, price:price, stock:stock, created_date:created_date.trim()};
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
        getProduct();
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
  const deleteProduct = (id, name) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: `¿Seguro de eliminar el producto ${id}?`,
      icon: 'question',
      text: 'No se podrá dar marcha atrás',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Eliminar producto con ID:", id);

        axios({
          method: 'DELETE',
          url: `http://localhost:8080/api/v1/products/${id}`,
        })
          .then((response) => {
            // Manejar la respuesta, si es necesario
            console.log(response);
            show_alert('El producto fue eliminado', 'success');
            getProduct(); // Actualizar la lista de productos después de eliminar
          })
          .catch((error) => {
            // Manejar el error
            console.error('Error al eliminar el producto:', error);
            show_alert('Error al eliminar el producto', 'error');
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
                    <th>#ID PRODUCTO</th>
                    <th>PRODUCTO</th>
                    <th>CODIGO DE PRODUCTO</th>
                    <th>CODIGO DE FAMILIA PRODUCTO</th>
                    <th>STOCK</th>
                    <th>PRECIO</th>
                    <th>ESTADO</th>
                    <th>FECHA DE CREACION</th>
                  
                    <th></th>
                  </tr>
                </thead>
                <tbody className='table-group-divider'>
                  {product.map((product, i) => (
                    <tr key={product.id}>
                      <td>{(i + 1)}</td>
                      <td>{product.name}</td>
                      <td>{product.cod_product}</td>
                      <td>{product.familyProduct.id}</td>
                      <td>{product.stock}</td>
                      <td>{product.price}</td>
                      <td>{product.active !== undefined ? (product.active ? 'Activo' : 'Inactivo') : 'N/A'}</td>

                      <td>{product.created_date}</td>
                      
                      <td>
                        <button onClick={()=> openModal(2,product.id, product.name,product.cod_product, product.familyProduct,
                          product.active, product.price, product.stock, product.created_date)} className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                          <i className='fas fa-pencil-alt'>

                         
                          </i>
                        </button>
                        &nbsp;
                        {/* ELIMINAR */}
                        <button onClick={()=> deleteProduct(product.id, product.name)} className='btn btn-danger'>
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
                <input type='text' id='codigo' className='form-control' placeholder='Código de Producto' value={cod_product}
                 onChange={(e)=> setCod_Product(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'> <i className='fa-solid fa-gift'></i></span>
                <input type='text' id='nombre' className='form-control' placeholder='Nombre Producto' value={name}
                 onChange={(e)=> setName(e.target.value)}></input>
              </div>
                <div className='input-group mb-3'>
                  <span className='input-group-text'> <i className='fa-solid fa-comment'></i></span>
                  <input type='text' id='familia' className='form-control' placeholder='Familia de producto' value={familyProduct.id}
                  onChange={(e)=> setFamilyProduct({id: e.target.value})}></input>
                </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'> <i className='fa-solid fa-gift'></i></span>
                <input type='text' id='precio' className='form-control' placeholder='Precio Producto' value={price}
                 onChange={(e)=> setPrice(e.target.value)}></input>
              </div>
                <div className='input-group mb-3'>
                <span className='input-group-text'> <i className='fa-solid fa-gift'></i></span>
                <input type='text' id='stock' className='form-control' placeholder='stock' value={stock}
                 onChange={(e)=> setStock(e.target.value)}></input>
              </div>
             
            
              <div className='input-group mb-3'>
                <span className='input-group-text'> <i className='fa-solid fa-gift'></i></span>
                <input type='text' id='create' className='form-control' placeholder='create' value={created_date}
                 onChange={(e)=> setCreated_Date(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
   <span className='input-group-text'> <i className='fa-solid fa-gift'></i></span>
   <select id='active' className='form-control' value={active} onChange={(e) => setActive(e.target.value === 'true')}>
      <option value='true'>Activo</option>
      <option value='false'>Inactivo</option>
   </select>
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

export default Product;
