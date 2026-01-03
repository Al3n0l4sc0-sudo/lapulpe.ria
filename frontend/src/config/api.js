// Configuración de API para La Pulpería
// Este archivo configura axios para enviar el token en todas las requests

import axios from 'axios';

// BACKEND URL DINÁMICO - Detecta automáticamente el dominio
// Si estás en lapulperiahn.shop, usa ese backend
// Si estás en preview, usa el preview backend
const getBackendURL = () => {
  const hostname = window.location.hostname;
  
  // Si estamos en lapulperiahn.shop, usar ese dominio
  if (hostname === 'lapulperiahn.shop' || hostname === 'www.lapulperiahn.shop') {
    return `https://${hostname}`;
  }
  
  // Si estamos en cualquier otro dominio (preview, local, etc), usar el origin actual
  return window.location.origin;
};

export const BACKEND_URL = getBackendURL();

console.log('[API Config] Backend URL:', BACKEND_URL);
console.log('[API Config] Current hostname:', window.location.hostname);

// Crear instancia de axios configurada
const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  timeout: 30000
});

// Interceptor para añadir token a todas las requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('session_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de auth
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('session_token');
      // Solo redirigir si no estamos ya en la landing page
      if (window.location.pathname !== '/' && window.location.pathname !== '/auth/callback') {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export { api };
export default BACKEND_URL;
