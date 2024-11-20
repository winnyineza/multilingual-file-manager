import { ApiError } from '../types/error';

export const handleApiError = (error: any): ApiError => {
  if (error.response?.data) {
    return error.response.data as ApiError;
  }
  return {
    status: 'error',
    message: 'unexpected_error',
    statusCode: 500
  };
};