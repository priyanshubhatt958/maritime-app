import React, { useState } from 'react';
import { FileText, Edit3 } from 'lucide-react';
import { RecapData } from '../types';

interface RecapInputProps {
  onRecapChange: (recap: RecapData | null) => void;
  currentRecap: RecapData | null;
}

export function RecapInput({ onRecapChange, currentRecap }: RecapInputProps) {
  const [inputMode, setInputMode] = useState<'form' | 'text'>('form');
  const [freeText, setFreeText] = useState('');
  const [formData, setFormData] = useState<RecapData>({
    vessel_name: '',
    laycan_start_iso: '',
    laycan_end_iso: '',
    load_port: '',
    discharge_port: '',
    freight_rate: '',
    demurrage_rate: '',
    cargo_description: '',
    special_terms: []
  });

  const handleFormChange = (field: keyof RecapData, value: string | string[]) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onRecapChange(updated);
  };

  const handleSpecialTermsChange = (value: string) => {
    const terms = value.split('\n').filter(term => term.trim() !== '');
    handleFormChange('special_terms', terms);
  };

  const processFreeText = async () => {
    // Mock processing of free text
    const mockRecap: RecapData = {
      vessel_name: 'MV EXAMPLE',
      laycan_start_iso: '2024-02-01T00:00:00Z',
      laycan_end_iso: '2024-02-03T23:59:59Z',
      load_port: 'Hamburg',
      discharge_port: 'Singapore',
      freight_rate: '$45.50 per MT',
      demurrage_rate: '$12,500 per day',
      cargo_description: 'Steel coils',
      special_terms: ['Load trim 10cm max', 'Baltic exchange arbitration']
    };
    
    setFormData(mockRecap);
    onRecapChange(mockRecap);
    setInputMode('form');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Fixture Recap
        </h3>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setInputMode('form')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              inputMode === 'form' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Form
          </button>
          <button
            onClick={() => setInputMode('text')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              inputMode === 'text' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Free Text
          </button>
        </div>
      </div>

      {inputMode === 'form' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vessel Name</label>
              <input
                type="text"
                value={formData.vessel_name}
                onChange={(e) => handleFormChange('vessel_name', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cargo Description</label>
              <input
                type="text"
                value={formData.cargo_description}
                onChange={(e) => handleFormChange('cargo_description', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Load Port</label>
              <input
                type="text"
                value={formData.load_port}
                onChange={(e) => handleFormChange('load_port', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discharge Port</label>
              <input
                type="text"
                value={formData.discharge_port}
                onChange={(e) => handleFormChange('discharge_port', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Laycan Start</label>
              <input
                type="datetime-local"
                value={formData.laycan_start_iso.slice(0, 16)}
                onChange={(e) => handleFormChange('laycan_start_iso', e.target.value + ':00Z')}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Laycan End</label>
              <input
                type="datetime-local"
                value={formData.laycan_end_iso.slice(0, 16)}
                onChange={(e) => handleFormChange('laycan_end_iso', e.target.value + ':00Z')}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Freight Rate</label>
              <input
                type="text"
                value={formData.freight_rate}
                onChange={(e) => handleFormChange('freight_rate', e.target.value)}
                placeholder="e.g. $45.50 per MT"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Demurrage Rate</label>
              <input
                type="text"
                value={formData.demurrage_rate}
                onChange={(e) => handleFormChange('demurrage_rate', e.target.value)}
                placeholder="e.g. $12,500 per day"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Special Terms (one per line)</label>
            <textarea
              value={formData.special_terms.join('\n')}
              onChange={(e) => handleSpecialTermsChange(e.target.value)}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter special terms, one per line"
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Free Text Recap
            </label>
            <textarea
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
              rows={8}
              placeholder="Paste your fixture recap here and we'll extract the structured data..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={processFreeText}
            disabled={!freeText.trim()}
            className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
              freeText.trim()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Extract Structured Data
          </button>
        </div>
      )}
    </div>
  );
}