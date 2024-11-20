export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const FILE_TYPES = {
  ALLOWED: ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'],
  MAX_SIZE: 5 * 1024 * 1024 // 5MB
};

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' }
]; 