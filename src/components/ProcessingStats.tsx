import React from 'react';
import { BarChart3, AlertTriangle, CheckCircle } from 'lucide-react';

interface ProcessingStatsProps {
  stats: {
    total_events: number;
    low_confidence_count: number;
  };
  anomalies: Array<{
    type: string;
    message: string;
    row_index: number;
  }>;
}

export function ProcessingStats({ stats, anomalies }: ProcessingStatsProps) {
  const confidenceRate = Math.round(((stats.total_events - stats.low_confidence_count) / stats.total_events) * 100);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
        <BarChart3 className="h-5 w-5 mr-2" />
        Processing Results
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-gray-900">Total Events</span>
          </div>
          <span className="text-lg font-bold text-blue-600">{stats.total_events}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-900">Confidence Rate</span>
          </div>
          <span className="text-lg font-bold text-green-600">{confidenceRate}%</span>
        </div>

        {stats.low_confidence_count > 0 && (
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="text-sm font-medium text-gray-900">Low Confidence</span>
            </div>
            <span className="text-lg font-bold text-yellow-600">{stats.low_confidence_count}</span>
          </div>
        )}

        {anomalies.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Anomalies Detected</h4>
            <div className="space-y-2">
              {anomalies.slice(0, 3).map((anomaly, index) => (
                <div key={index} className="p-2 bg-red-50 rounded text-xs">
                  <span className="font-medium text-red-800">{anomaly.type}:</span>
                  <span className="text-red-600 ml-1">{anomaly.message}</span>
                </div>
              ))}
              {anomalies.length > 3 && (
                <p className="text-xs text-gray-500">+{anomalies.length - 3} more anomalies</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}