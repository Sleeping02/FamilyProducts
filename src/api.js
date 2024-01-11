// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

const fetchData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { fetchData };
