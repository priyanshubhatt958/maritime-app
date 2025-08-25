export type ProcessingMode = 'cost-saving' | 'accuracy';

export interface SofEvent {
  event_name: string;
  start_time_iso: string;
  end_time_iso: string | null;
  duration_minutes: number | null;
  page: number;
  row_index: number;
  confidence: number;
}

export interface RecapData {
  vessel_name: string;
  laycan_start_iso: string;
  laycan_end_iso: string;
  load_port: string;
  discharge_port: string;
  freight_rate: string;
  demurrage_rate: string;
  cargo_description: string;
  special_terms: string[];
}

export interface ProcessedDocument {
  content_preview: string;
  changes: DocumentChange[];
  artifacts: {
    docx_url: string;
    pdf_url?: string;
  };
}

export interface DocumentChange {
  field: string;
  original_value: string;
  new_value: string;
  source: 'recap' | 'template' | 'negotiated_clauses';
}