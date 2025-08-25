import React from 'react';
import { FileText, Eye } from 'lucide-react';
import { ProcessedDocument } from '../types';

interface DocumentPreviewProps {
  document: ProcessedDocument;
}

export function DocumentPreview({ document }: DocumentPreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
        <Eye className="h-5 w-5 mr-2" />
        Document Preview
      </h3>

      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <div className="flex items-center mb-3">
          <FileText className="h-5 w-5 text-blue-600 mr-2" />
          <span className="font-medium text-gray-900">Charter Party Document</span>
        </div>
        
        <div className="bg-white rounded border p-4 max-h-96 overflow-y-auto">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
            {document.content_preview}
          </pre>
        </div>
        
        <p className="text-xs text-gray-500 mt-3">
          This is a preview of your generated document. Download the full version using the buttons below.
        </p>
      </div>
    </div>
  );
}