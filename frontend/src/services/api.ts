import axios from 'axios';
import { ApiError } from '../types/error';
import { File } from './types';

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      status: 'error',
      message: error.response?.data?.message || 'An error occurred'
    };
    return Promise.reject(apiError);
  }
);

export const fileService = {
  getAll: () => api.get<File[]>('/files'),
  create: (formData: FormData) => api.post<File>('/files', formData),
  delete: (id: number) => api.delete(`/files/${id}`)
};

export default api; 