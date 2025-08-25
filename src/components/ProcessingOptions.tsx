import React from 'react';
import { Settings, Zap, Shield } from 'lucide-react';
import { ProcessingMode } from '../types';

interface ProcessingOptionsProps {
  mode: ProcessingMode;
  onModeChange: (mode: ProcessingMode) => void;
  portTimezone: string;
  onPortTimezoneChange: (timezone: string) => void;
  enableOCR: boolean;
  onEnableOCRChange: (enabled: boolean) => void;
}

export function ProcessingOptions({
  mode,
  onModeChange,
  portTimezone,
  onPortTimezoneChange,
  enableOCR,
  onEnableOCRChange
}: ProcessingOptionsProps) {
  const timezones = [
    'UTC',
    'America/New_York',
    'Europe/London',
    'Asia/Singapore',
    'Europe/Hamburg',
    'Asia/Dubai',
    'Australia/Sydney'
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
        <Settings className="h-5 w-5 mr-2" />
        Processing Options
      </h3>

      {/* Processing Mode */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Processing Mode</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onModeChange('cost-saving')}
            className={`p-3 rounded-lg border text-left transition-all ${
              mode === 'cost-saving'
                ? 'border-orange-500 bg-orange-50 text-orange-900'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center mb-1">
              <Zap className="h-4 w-4 mr-2 text-orange-500" />
              <span className="font-medium text-sm">Cost-saving</span>
            </div>
            <p className="text-xs text-gray-600">Local processing only</p>
          </button>
          
          <button
            onClick={() => onModeChange('accuracy')}
            className={`p-3 rounded-lg border text-left transition-all ${
              mode === 'accuracy'
                ? 'border-blue-500 bg-blue-50 text-blue-900'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center mb-1">
              <Shield className="h-4 w-4 mr-2 text-blue-500" />
              <span className="font-medium text-sm">Accuracy</span>
            </div>
            <p className="text-xs text-gray-600">OCR + AI when needed</p>
          </button>
        </div>
      </div>

      {/* Port Timezone */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Port Timezone</label>
        <select
          value={portTimezone}
          onChange={(e) => onPortTimezoneChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {timezones.map((tz) => (
            <option key={tz} value={tz}>{tz}</option>
          ))}
        </select>
      </div>

      {/* OCR Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700">Enable OCR</label>
          <p className="text-xs text-gray-500">Use OCR for scanned documents</p>
        </div>
        <button
          onClick={() => onEnableOCRChange(!enableOCR)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            enableOCR ? 'bg-blue-600' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              enableOCR ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
}