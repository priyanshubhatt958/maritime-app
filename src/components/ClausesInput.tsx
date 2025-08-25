import React from 'react';
import { ScrollText } from 'lucide-react';

interface ClausesInputProps {
  clauses: string;
  onClausesChange: (clauses: string) => void;
}

export function ClausesInput({ clauses, onClausesChange }: ClausesInputProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
        <ScrollText className="h-5 w-5 mr-2" />
        Negotiated Clauses
      </h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Terms & Clauses (Optional)
        </label>
        <textarea
          value={clauses}
          onChange={(e) => onClausesChange(e.target.value)}
          rows={6}
          placeholder="Enter any negotiated clauses or special terms that should override the base template..."
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        <p className="text-xs text-gray-500 mt-2">
          These clauses will take precedence over both the recap data and base template.
        </p>
      </div>
    </div>
  );
}