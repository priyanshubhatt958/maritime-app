import React, { useState } from 'react';
import { Edit2, Check, X, Clock, MapPin, AlertTriangle, TrendingUp } from 'lucide-react';
import { SofEvent } from '../types';
import { GlowingCard, AnimatedCounter } from './HyperAnimations';

interface EnhancedEventsTableProps {
  events: SofEvent[];
  onEventUpdate: (index: number, event: SofEvent) => void;
}

export function EnhancedEventsTable({ events, onEventUpdate }: EnhancedEventsTableProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingEvent, setEditingEvent] = useState<SofEvent | null>(null);
  const [filter, setFilter] = useState<'all' | 'low-confidence' | 'completed'>('all');

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-emerald-600 bg-emerald-100 border-emerald-200';
    if (confidence >= 0.75) return 'text-green-600 bg-green-100 border-green-200';
    if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-red-600 bg-red-100 border-red-200';
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 0.85) return <Check className="h-3 w-3" />;
    if (confidence >= 0.6) return <AlertTriangle className="h-3 w-3" />;
    return <X className="h-3 w-3" />;
  };

  const formatDateTime = (isoString: string | null) => {
    if (!isoString) return '-';
    return new Date(isoString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  const filteredEvents = events.filter(event => {
    switch (filter) {
      case 'low-confidence':
        return event.confidence < 0.85;
      case 'completed':
        return event.end_time_iso !== null;
      default:
        return true;
    }
  });

  const stats = {
    total: events.length,
    lowConfidence: events.filter(e => e.confidence < 0.85).length,
    completed: events.filter(e => e.end_time_iso !== null).length,
    avgConfidence: events.reduce((sum, e) => sum + e.confidence, 0) / events.length
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlowingCard className="p-4 text-center" glowColor="blue">
          <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-600">
            <AnimatedCounter value={stats.total} />
          </div>
          <p className="text-sm text-gray-600">Total Events</p>
        </GlowingCard>

        <GlowingCard className="p-4 text-center" glowColor="green">
          <Check className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-600">
            <AnimatedCounter value={stats.completed} />
          </div>
          <p className="text-sm text-gray-600">Completed</p>
        </GlowingCard>

        <GlowingCard className="p-4 text-center" glowColor="orange">
          <AlertTriangle className="h-6 w-6 text-orange-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-orange-600">
            <AnimatedCounter value={stats.lowConfidence} />
          </div>
          <p className="text-sm text-gray-600">Low Confidence</p>
        </GlowingCard>

        <GlowingCard className="p-4 text-center" glowColor="purple">
          <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-600">
            <AnimatedCounter value={Math.round(stats.avgConfidence * 100)} suffix="%" />
          </div>
          <p className="text-sm text-gray-600">Avg Confidence</p>
        </GlowingCard>
      </div>

      {/* Main Table */}
      <GlowingCard className="overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold gradient-text-blue">Extracted Events</h3>
            
            {/* Filter Buttons */}
            <div className="flex space-x-2">
              {[
                { key: 'all', label: 'All Events', count: stats.total },
                { key: 'completed', label: 'Completed', count: stats.completed },
                { key: 'low-confidence', label: 'Low Confidence', count: stats.lowConfidence }
              ].map(({ key, label, count }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key as any)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                    filter === key
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {label} ({count})
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Start Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  End Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Confidence
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEvents.map((event, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 animate-fadeIn"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="px-6 py-4">
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={editingEvent?.event_name || ''}
                        onChange={(e) => setEditingEvent(prev => prev ? { ...prev, event_name: e.target.value } : null)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <div>
                        <div className="font-medium text-gray-900">{event.event_name}</div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          Page {event.page}, Row {event.row_index}
                        </div>
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4">
                    {editingIndex === index ? (
                      <input
                        type="datetime-local"
                        value={editingEvent?.start_time_iso?.slice(0, 16) || ''}
                        onChange={(e) => setEditingEvent(prev => prev ? { ...prev, start_time_iso: e.target.value + ':00Z' } : null)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{formatDateTime(event.start_time_iso)}</span>
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4">
                    {editingIndex === index ? (
                      <input
                        type="datetime-local"
                        value={editingEvent?.end_time_iso?.slice(0, 16) || ''}
                        onChange={(e) => setEditingEvent(prev => prev ? { ...prev, end_time_iso: e.target.value ? e.target.value + ':00Z' : null } : null)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{formatDateTime(event.end_time_iso)}</span>
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900 font-medium">{formatDuration(event.duration_minutes)}</span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getConfidenceColor(event.confidence)}`}>
                      {getConfidenceIcon(event.confidence)}
                      <span className="ml-1">{Math.round(event.confidence * 100)}%</span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    {editingIndex === index ? (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={handleSave}
                          className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-full transition-colors"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(index)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
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

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Events Found</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'No events were extracted from the document.' 
                : `No events match the "${filter}" filter.`
              }
            </p>
          </div>
        )}
      </GlowingCard>
    </div>
  );
}