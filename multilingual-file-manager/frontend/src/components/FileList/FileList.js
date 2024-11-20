import React from 'react';
import { Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { FileType } from '@/services/types';

interface FileListProps {
  files: FileType[];
  onDelete: (id: number) => void;
}

export const FileList: React.FC<FileListProps> = ({ files, onDelete }) => {
  const { t } = useTranslation();

  return (
    <Table>
      <thead>
        <tr>
          <th>{t('name')}</th>
          <th>{t('path')}</th>
          <th>{t('created_at')}</th>
          <th>{t('actions')}</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file) => (
          <tr key={file.id}>
            <td>{file.name}</td>
            <td>{file.path}</td>
            <td>{new Date(file.created_at).toLocaleDateString()}</td>
            <td>
              <Button onClick={() => onDelete(file.id)}>{t('delete')}</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
