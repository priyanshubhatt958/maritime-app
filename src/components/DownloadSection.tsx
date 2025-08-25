import React from 'react';
import { Download, FileText } from 'lucide-react';

interface DownloadSectionProps {
  docxUrl: string;
  pdfUrl?: string;
  fileName: string;
}

export function DownloadSection({ docxUrl, pdfUrl, fileName }: DownloadSectionProps) {
  const handleDownload = (url: string, extension: string) => {
    // Mock download functionality
    const a = document.createElement('a');
    a.href = '#';
    a.download = `${fileName}.${extension}`;
    console.log(`Downloading ${fileName}.${extension} from ${url}`);
    // In real implementation, this would trigger actual download
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
        <Download className="h-5 w-5 mr-2" />
        Download Documents
      </h3>

      <div className="space-y-3">
        <button
          onClick={() => handleDownload(docxUrl, 'docx')}
          className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FileText className="h-5 w-5 mr-2" />
          Download DOCX
        </button>

        {pdfUrl && (
          <button
            onClick={() => handleDownload(pdfUrl, 'pdf')}
            className="w-full flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <FileText className="h-5 w-5 mr-2" />
            Download PDF
          </button>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-3">
        DOCX format is recommended for further editing. PDF is provided for final distribution.
      </p>
    </div>
  );
}