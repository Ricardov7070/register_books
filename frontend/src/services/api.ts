import axios from 'axios';

const baseURL = import.meta.env.BASE_URL;

const api = axios.create({
  baseURL,
});

// Exemplo de interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Lógica para redirecionar ou atualizar token
    }
    return Promise.reject(error);
  }
);

export default api;
