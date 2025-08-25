import React, { useState } from 'react';
import { EnhancedFileUpload } from '../components/EnhancedFileUpload';
import { ProcessingOptions } from '../components/ProcessingOptions';
import { EnhancedEventsTable } from '../components/EnhancedEventsTable';
import { ExportSection } from '../components/ExportSection';
import { ProcessingStats } from '../components/ProcessingStats';
import { FloatingParticles, GlowingCard, PulsingButton, LoadingWave } from '../components/HyperAnimations';
import { SofEvent, ProcessingMode } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

export function SofExtraction() {
  const [file, setFile] = useState<File | null>(null);
  const [events, setEvents] = useState<SofEvent[]>([]);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [processingMode, setProcessingMode] = useState<ProcessingMode>('accuracy');
  const [portTimezone, setPortTimezone] = useState('UTC');
  const [enableOCR, setEnableOCR] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [anomalies, setAnomalies] = useState<any[]>([]);

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    setProcessed(false);
    setEvents([]);
    setStats(null);
    setAnomalies([]);
  };

  const handleProcess = async () => {
    if (!file) return;

    setProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('mode', processingMode);
      formData.append('port_timezone', portTimezone);
      formData.append('enable_ocr', enableOCR.toString());

      const response = await fetch(`${API_BASE_URL}/sof/process`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      setEvents(result.events);
      setStats(result.stats);
      setAnomalies(result.anomalies);
      setProcessed(true);
    } catch (error) {
      console.error('Processing error:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleEventUpdate = (index: number, updatedEvent: SofEvent) => {
    const newEvents = [...events];
    newEvents[index] = updatedEvent;
    setEvents(newEvents);
  };

  return (
    <div className="min-h-screen relative">
      <FloatingParticles />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold gradient-text-blue mb-4 animate-fadeIn">
          AI-Powered SoF Event Extraction
        </h1>
        <p className="text-xl text-gray-600 animate-slideInLeft">
          Upload your SoF document to extract and validate structured events with intelligent timestamp processing.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Panel - Configuration */}
        <div className="lg:col-span-1 space-y-6">
          <EnhancedFileUpload 
            onFileUpload={handleFileUpload}
            acceptedTypes=".pdf,.docx"
            currentFile={file}
            processing={processing}
          />

          <ProcessingOptions
            mode={processingMode}
            onModeChange={setProcessingMode}
            portTimezone={portTimezone}
            onPortTimezoneChange={setPortTimezone}
            enableOCR={enableOCR}
            onEnableOCRChange={setEnableOCR}
          />

          <PulsingButton
            onClick={handleProcess}
            disabled={!file || processing}
            variant={!file || processing ? "secondary" : "primary"}
            className="w-full"
          >
            {processing ? 'Processing...' : 'Extract Events'}
          </PulsingButton>

          {processed && stats && (
            <ProcessingStats stats={stats} anomalies={anomalies} />
          )}

          {processed && events.length > 0 && (
            <ExportSection events={events} fileName={file?.name} />
          )}
        </div>

        {/* Right Panel - Results */}
        <div className="lg:col-span-2">
          {processing && (
            <GlowingCard className="p-8">
              <LoadingWave message="AI is analyzing your document..." />
            </GlowingCard>
          )}

          {processed && events.length > 0 && (
            <EnhancedEventsTable 
              events={events} 
              onEventUpdate={handleEventUpdate}
            />
          )}

          {processed && events.length === 0 && (
            <GlowingCard className="p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Events Found</h3>
              <p className="text-gray-600">
                No extractable events were found in the uploaded document. Please try a different file or check your processing options.
              </p>
            </GlowingCard>
          )}

          {!processing && !processed && (
            <GlowingCard className="p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Process</h3>
              <p className="text-gray-600">
                Upload a Statement of Facts document and configure your processing options to get started.
              </p>
            </GlowingCard>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}