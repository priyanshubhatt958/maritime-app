import React, { useRef, useState } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle, Zap } from 'lucide-react';
import { GlowingCard, PulsingButton } from './HyperAnimations';

interface EnhancedFileUploadProps {
  onFileUpload: (file: File) => void;
  acceptedTypes: string;
  currentFile?: File | null;
  label?: string;
  description?: string;
  maxSize?: number;
  processing?: boolean;
}

export function EnhancedFileUpload({ 
  onFileUpload, 
  acceptedTypes, 
  currentFile, 
  label = "Upload Document",
  description = "Drag & drop or click to select",
  maxSize = 100 * 1024 * 1024, // 100MB
  processing = false
}: EnhancedFileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      validateAndUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndUpload(e.dataTransfer.files[0]);
    }
  };

  const validateAndUpload = (file: File) => {
    // Validate file size
    if (file.size > maxSize) {
      alert(`File size exceeds ${Math.round(maxSize / (1024 * 1024))}MB limit`);
      return;
    }

    // Validate file type
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExt)) {
      alert(`File type not supported. Accepted: ${acceptedTypes}`);
      return;
    }

    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onFileUpload(file);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleClearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setUploadProgress(0);
    onFileUpload(null as any);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf': return '📄';
      case 'docx':
      case 'doc': return '📝';
      default: return '📎';
    }
  };

  return (
    <GlowingCard className="p-6" glowColor="blue">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold gradient-text-blue">{label}</h3>
        {processing && (
          <div className="flex items-center text-blue-600">
            <Zap className="h-4 w-4 mr-1 animate-pulse" />
            <span className="text-sm">Processing...</span>
          </div>
        )}
      </div>
      
      {currentFile ? (
        <div className="space-y-4">
          {/* File Info */}
          <div className="glass rounded-xl p-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{getFileIcon(currentFile.name)}</div>
                <div>
                  <p className="font-medium text-gray-900">{currentFile.name}</p>
                  <p className="text-sm text-gray-500">{formatFileSize(currentFile.size)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <button
                  onClick={handleClearFile}
                  className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                  disabled={processing}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Upload Progress */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* File Analysis */}
          <div className="glass rounded-xl p-4">
            <h4 className="font-medium text-gray-900 mb-2">File Analysis</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Format:</span>
                <span className="ml-2 font-medium">{currentFile.name.split('.').pop()?.toUpperCase()}</span>
              </div>
              <div>
                <span className="text-gray-500">Size:</span>
                <span className="ml-2 font-medium">{formatFileSize(currentFile.size)}</span>
              </div>
              <div>
                <span className="text-gray-500">OCR Recommended:</span>
                <span className="ml-2 font-medium text-blue-600">Yes</span>
              </div>
              <div>
                <span className="text-gray-500">Processing Mode:</span>
                <span className="ml-2 font-medium text-green-600">High Accuracy</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div 
          className={`
            border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer
            ${dragActive 
              ? 'border-blue-500 bg-blue-50 scale-105' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
            }
          `}
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className={`mx-auto transition-all duration-300 ${dragActive ? 'scale-110' : ''}`}>
              <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            </div>
            
            <div>
              <p className="text-lg font-medium text-gray-900 mb-2">{description}</p>
              <p className="text-sm text-gray-500 mb-4">
                Supported formats: {acceptedTypes.replace(/\./g, '').toUpperCase()}
              </p>
              
              <PulsingButton variant="primary" className="mx-auto">
                Choose File
              </PulsingButton>
            </div>
            
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                AI-Powered Processing
              </div>
              <div className="flex items-center">
                <Zap className="h-4 w-4 mr-1" />
                OCR Support
              </div>
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                Max {Math.round(maxSize / (1024 * 1024))}MB
              </div>
            </div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileChange}
        className="hidden"
        disabled={processing}
      />
    </GlowingCard>
  );
}