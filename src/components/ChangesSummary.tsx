import React from 'react';
import { FileCheck, AlertCircle } from 'lucide-react';
import { DocumentChange } from '../types';

interface ChangesSummaryProps {
  changes: DocumentChange[];
}

export function ChangesSummary({ changes }: ChangesSummaryProps) {
  const getSourceColor = (source: string) => {
    switch (source) {
      case 'recap': return 'bg-blue-100 text-blue-800';
      case 'negotiated_clauses': return 'bg-green-100 text-green-800';
      case 'template': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'recap': return 'Fixture Recap';
      case 'negotiated_clauses': return 'Negotiated Clauses';
      case 'template': return 'Base Template';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
        <FileCheck className="h-5 w-5 mr-2" />
        Document Changes Summary
      </h3>

      {changes.length === 0 ? (
        <div className="text-center py-6">
          <AlertCircle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600">No changes were applied to the base template.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-gray-600 mb-4">
            {changes.length} field(s) were modified during document generation:
          </p>
          {changes.map((change, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm text-gray-900">{change.field}</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSourceColor(change.source)}`}>
                  {getSourceLabel(change.source)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-500">Original:</span>
                  <div className="bg-red-50 p-2 rounded mt-1 text-red-800">
                    {change.original_value || '(empty)'}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">New:</span>
                  <div className="bg-green-50 p-2 rounded mt-1 text-green-800">
                    {change.new_value}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}