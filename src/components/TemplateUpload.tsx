import React from 'react';
import { FileUpload } from './FileUpload';

interface TemplateUploadProps {
  onTemplateUpload: (file: File) => void;
  currentTemplate?: File | null;
}

export function TemplateUpload({ onTemplateUpload, currentTemplate }: TemplateUploadProps) {
  return (
    <FileUpload
      onFileUpload={onTemplateUpload}
      acceptedTypes=".docx"
      currentFile={currentTemplate}
      label="Base Charter Party Template"
      description="Upload your DOCX template with placeholders"
    />
  );
}