import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';
const getToken = () => {
  return localStorage.getItem('token');
};

export const getActiveFamilies = async () => {
  try {
    const token = getToken();  // Obtener el token
    const response = await axios.get(`${API_URL}/family/byActive/true`,{
      headers: {
        Authorization: `Bearer ${token}`,  // Incluir el token en el encabezado de la solicitud
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener familias activas:', error);
    throw error;
  }
}

export const getActiveProducts = async () => {
    try {
      const token = getToken();  // Obtener el token
      const response = await axios.get(`${API_URL}/products/byActive/true`,{
        headers: {
          Authorization: `Bearer ${token}`,  // Incluir el token en el encabezado de la solicitud
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos activos:', error);
      throw error;
    }
  };