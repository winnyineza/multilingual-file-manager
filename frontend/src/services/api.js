import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fileService = {
  create: (data) => api.post('/files', data),
  getById: (id) => api.get(`/files/${id}`),
  update: (id, data) => api.put(`/files/${id}`, data),
  delete: (id) => api.delete(`/files/${id}`)
};

export const authService = {
  login: (credentials) => api.post('/users/login', credentials),
  register: (userData) => api.post('/users/register', userData)
};

export default api; 