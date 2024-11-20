import { useState } from 'react';
import axios from 'axios';

export const useUploadProgress = () => {
  const [progress, setProgress] = useState<number>(0);

  const uploadWithProgress = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('/api/files', formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        }
      });
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  };

  return { progress, uploadWithProgress };
}; 