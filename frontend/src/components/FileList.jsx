import React from 'react';
import { useTranslation } from 'react-i18next';

const FileList = ({ files = [], onFileSelect }) => {
  const { t } = useTranslation();

  if (!files.length) {
    return (
      <div className="text-center p-4">
        {t('noFiles')}
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {files.map((file) => (
        <div
          key={file.id}
          className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
          onClick={() => onFileSelect(file)}
        >
          <h3 className="font-medium">{file.name}</h3>
          <p className="text-sm text-gray-500">
            {t('lastModified')}: {new Date(file.modifiedAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FileList;