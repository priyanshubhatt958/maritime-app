import React from 'react';
import { Download, FileText } from 'lucide-react';
import { SofEvent } from '../types';

interface ExportSectionProps {
  events: SofEvent[];
  fileName?: string;
}

export function ExportSection({ events, fileName }: ExportSectionProps) {
  const exportToCSV = () => {
    const headers = ['Event Name', 'Start Time', 'End Time', 'Duration (minutes)', 'Page', 'Confidence'];
    const csvData = [
      headers.join(','),
      ...events.map(event => [
        `"${event.event_name}"`,
        event.start_time_iso,
        event.end_time_iso || '',
        event.duration_minutes || '',
        event.page,
        event.confidence
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName?.replace(/\.[^/.]+$/, '') || 'sof_events'}_extracted.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    const jsonData = JSON.stringify({ events }, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName?.replace(/\.[^/.]+$/, '') || 'sof_events'}_extracted.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
        <Download className="h-5 w-5 mr-2" />
        Export Data
      </h3>

      <div className="space-y-3">
        <button
          onClick={exportToCSV}
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FileText className="h-4 w-4 mr-2" />
          Export as CSV
        </button>

        <button
          onClick={exportToJSON}
          className="w-full flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <FileText className="h-4 w-4 mr-2" />
          Export as JSON
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-3">
        Export your validated events for use in other maritime systems or further analysis.
      </p>
    </div>
  );
}