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
  getAll: () => api.get('/files'),
  create: (formData: FormData) => api.post('/files', formData),
  delete: (id: number) => api.delete(`/files/${id}`)
};

export default api; 