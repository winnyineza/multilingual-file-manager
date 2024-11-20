import React, { useEffect, useState } from 'react';
import { FileList } from '@/components/FileList';
import { UploadForm } from '@/components/UploadForm';
import { useTranslation } from 'react-i18next';
import { fileService } from '@/services/api';
import { FileType } from '@/services/types';
import { useToast } from '@/components/ui/use-toast';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { handleApiError } from '@/utils/error';

export const Dashboard = () => {
  const [files, setFiles] = useState<FileType[]>([]);
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const fetchFiles = async () => {
    setIsLoading(true);
    try {
      const response = await fileService.getAll();
      setFiles(response.data);
    } catch (error) {
      const appError = handleApiError(error);
      toast({
        title: t('error'),
        description: t(appError.message) || t('fetch_files_failed'),
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (files: File[]) => {
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        await fileService.create(formData);
      }
      await fetchFiles();
      toast({
        title: t('success'),
        description: t('file_uploaded')
      });
    } catch (error) {
      const appError = handleApiError(error);
      toast({
        title: t('error'),
        description: t(appError.message) || t('upload_failed'),
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fileService.delete(id);
      await fetchFiles();
      toast({
        title: t('success'),
        description: t('file_deleted')
      });
    } catch (error) {
      const appError = handleApiError(error);
      toast({
        title: t('error'),
        description: t(appError.message) || t('delete_failed'),
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">{t('dashboard')}</h1>
      <UploadForm onUpload={handleUpload} />
      {isLoading ? (
        <div className="flex justify-center p-4">
          <LoadingSpinner />
        </div>
      ) : (
        <FileList files={files} onDelete={handleDelete} />
      )}
    </div>
  );
}; 