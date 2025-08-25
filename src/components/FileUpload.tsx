import React, { useRef } from 'react';
import { Upload, File, X } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  acceptedTypes: string;
  currentFile?: File | null;
  label?: string;
  description?: string;
}

export function FileUpload({ 
  onFileUpload, 
  acceptedTypes, 
  currentFile, 
  label = "Upload Document",
  description = "Select a file to upload"
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const handleClearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileUpload(null as any);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{label}</h3>
      
      {currentFile ? (
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <File className="h-5 w-5 text-blue-600 mr-2" />
              <div>
                <p className="text-sm font-medium text-gray-900">{currentFile.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(currentFile.size)}</p>
              </div>
            </div>
            <button
              onClick={handleClearFile}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-sm text-gray-600 mb-2">{description}</p>
          <p className="text-xs text-gray-500">
            Supported formats: {acceptedTypes.replace(/\./g, '').toUpperCase()}
          </p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}