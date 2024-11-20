import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface UploadFormProps {
  onUpload: (files: File[]) => Promise<void>;
}

export const UploadForm: React.FC<UploadFormProps> = ({ onUpload }) => {
  const { t } = useTranslation();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      await onUpload(acceptedFiles);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed rounded-lg p-8 text-center mb-4 cursor-pointer"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>{t("drop_files")}</p>
      ) : (
        <div>
          <p>{t("drag_drop_files")}</p>
          <Button className="mt-2">{t("select_files")}</Button>
        </div>
      )}
    </div>
  );
};
