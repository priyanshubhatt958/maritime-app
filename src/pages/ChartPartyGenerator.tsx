import React, { useState } from 'react';
import { RecapInput } from '../components/RecapInput';
import { TemplateUpload } from '../components/TemplateUpload';
import { ClausesInput } from '../components/ClausesInput';
import { DocumentPreview } from '../components/DocumentPreview';
import { DownloadSection } from '../components/DownloadSection';
import { ChangesSummary } from '../components/ChangesSummary';
import { RecapData, ProcessedDocument } from '../types';
import { mockCpGeneration } from '../api/mockApi';

export function ChartPartyGenerator() {
  const [recapData, setRecapData] = useState<RecapData | null>(null);
  const [baseTemplate, setBaseTemplate] = useState<File | null>(null);
  const [negotiatedClauses, setNegotiatedClauses] = useState<string>('');
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [document, setDocument] = useState<ProcessedDocument | null>(null);

  const handleGenerate = async () => {
    if (!recapData || !baseTemplate) return;

    setProcessing(true);
    try {
      // Mock processing delay
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const result = await mockCpGeneration({
        recap: recapData,
        baseTemplate,
        negotiatedClauses
      });
      
      setDocument(result);
      setProcessed(true);
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setProcessing(false);
    }
  };

  const canGenerate = recapData && baseTemplate && !processing;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Charter Party Generator</h1>
        <p className="text-gray-600">
          Generate professionally formatted Charter Party documents by combining fixture recaps, 
          base templates, and negotiated clauses.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Panel - Inputs */}
        <div className="space-y-6">
          <RecapInput 
            onRecapChange={setRecapData}
            currentRecap={recapData}
          />

          <TemplateUpload 
            onTemplateUpload={setBaseTemplate}
            currentTemplate={baseTemplate}
          />

          <ClausesInput 
            clauses={negotiatedClauses}
            onClausesChange={setNegotiatedClauses}
          />

          <button
            onClick={handleGenerate}
            disabled={!canGenerate}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              !canGenerate
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {processing ? 'Generating Document...' : 'Generate Charter Party'}
          </button>
        </div>

        {/* Right Panel - Preview & Download */}
        <div className="space-y-6">
          {processing && (
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Generating Document</h3>
              <p className="text-gray-600">
                Merging your inputs to create the Charter Party document...
              </p>
            </div>
          )}

          {processed && document && (
            <>
              <ChangesSummary changes={document.changes} />
              <DocumentPreview document={document} />
              <DownloadSection 
                docxUrl={document.artifacts.docx_url}
                pdfUrl={document.artifacts.pdf_url}
                fileName="charter_party"
              />
            </>
          )}

          {!processing && !processed && (
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Generate</h3>
              <p className="text-gray-600">
                Complete the fixture recap and upload a base template to generate your Charter Party document.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}