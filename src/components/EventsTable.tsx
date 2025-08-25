import React, { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { SofEvent } from '../types';

interface EventsTableProps {
  events: SofEvent[];
  onEventUpdate: (index: number, event: SofEvent) => void;
}

export function EventsTable({ events, onEventUpdate }: EventsTableProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingEvent, setEditingEvent] = useState<SofEvent | null>(null);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.85) return 'text-green-600 bg-green-100';
    if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const formatDateTime = (isoString: string | null) => {
    if (!isoString) return '-';
    return new Date(isoString).toLocaleString();
  };

  const formatDuration = (minutes: number | null) => {
    if (!minutes) return '-';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditingEvent({ ...events[index] });
  };

  const handleSave = () => {
    if (editingIndex !== null && editingEvent) {
      onEventUpdate(editingIndex, editingEvent);
      setEditingIndex(null);
      setEditingEvent(null);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditingEvent(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h3 className="text-lg font-medium text-gray-900">Extracted Events</h3>
        <p className="text-sm text-gray-600 mt-1">
          Review and edit the extracted events. Click the edit button to make changes.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Confidence
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((event, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editingEvent?.event_name || ''}
                      onChange={(e) => setEditingEvent(prev => prev ? { ...prev, event_name: e.target.value } : null)}
                      className="w-full p-1 border border-gray-300 rounded text-sm"
                    />
                  ) : (
                    <div className="text-sm font-medium text-gray-900">{event.event_name}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingIndex === index ? (
                    <input
                      type="datetime-local"
                      value={editingEvent?.start_time_iso?.slice(0, 16) || ''}
                      onChange={(e) => setEditingEvent(prev => prev ? { ...prev, start_time_iso: e.target.value + ':00Z' } : null)}
                      className="w-full p-1 border border-gray-300 rounded text-sm"
                    />
                  ) : (
                    <div className="text-sm text-gray-900">{formatDateTime(event.start_time_iso)}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingIndex === index ? (
                    <input
                      type="datetime-local"
                      value={editingEvent?.end_time_iso?.slice(0, 16) || ''}
                      onChange={(e) => setEditingEvent(prev => prev ? { ...prev, end_time_iso: e.target.value ? e.target.value + ':00Z' : null } : null)}
                      className="w-full p-1 border border-gray-300 rounded text-sm"
                    />
                  ) : (
                    <div className="text-sm text-gray-900">{formatDateTime(event.end_time_iso)}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatDuration(event.duration_minutes)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getConfidenceColor(event.confidence)}`}>
                    {Math.round(event.confidence * 100)}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingIndex === index ? (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleSave}
                        className="text-green-600 hover:text-green-900 p-1"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-600 hover:text-red-900 p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}