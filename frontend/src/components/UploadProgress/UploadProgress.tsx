import React from 'react';
import { Progress } from '@/components/ui/progress';

interface UploadProgressProps {
  progress: number;
  fileName: string;
}

export const UploadProgress: React.FC<UploadProgressProps> = ({ 
  progress, 
  fileName 
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm">{fileName}</span>
        <span className="text-sm">{progress}%</span>
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
}; 