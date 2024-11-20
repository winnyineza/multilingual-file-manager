import React from 'react';
import { Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface File {
  id: number;
  name: string;
  path: string;
  created_at: string;
}

export const FileList = ({ files, onDelete }: { files: File[], onDelete: (id: number) => void }) => {
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