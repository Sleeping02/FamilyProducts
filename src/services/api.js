// api.js
import axios from 'axios';

const API_BASE_URL = 'http://tu-api-rest:puerto'; // Reemplaza con la URL de tu API

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getProducts = () => api.get('/products');
// Agrega más funciones según sea necesario
