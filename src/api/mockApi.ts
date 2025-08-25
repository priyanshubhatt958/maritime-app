import { SofEvent, RecapData, ProcessedDocument, ProcessingMode } from '../types';

export async function mockSofProcessing(
  file: File, 
  options: { mode: ProcessingMode; portTimezone: string; enableOCR: boolean }
): Promise<{
  events: SofEvent[];
  stats: { total_events: number; low_confidence_count: number };
  anomalies: Array<{ type: string; message: string; row_index: number }>;
}> {
  // Mock processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Generate mock events based on file name for variation
  const mockEvents: SofEvent[] = [
    {
      event_name: "Vessel Arrived",
      start_time_iso: "2024-01-15T08:30:00Z",
      end_time_iso: null,
      duration_minutes: null,
      page: 1,
      row_index: 1,
      confidence: 0.95
    },
    {
      event_name: "Notice of Readiness Tendered",
      start_time_iso: "2024-01-15T09:15:00Z",
      end_time_iso: null,
      duration_minutes: null,
      page: 1,
      row_index: 2,
      confidence: 0.88
    },
    {
      event_name: "Loading Commenced",
      start_time_iso: "2024-01-15T14:00:00Z",
      end_time_iso: "2024-01-16T18:30:00Z",
      duration_minutes: 1710,
      page: 1,
      row_index: 3,
      confidence: 0.92
    },
    {
      event_name: "Loading Completed",
      start_time_iso: "2024-01-16T18:30:00Z",
      end_time_iso: null,
      duration_minutes: null,
      page: 2,
      row_index: 4,
      confidence: 0.78
    },
    {
      event_name: "Vessel Sailed",
      start_time_iso: "2024-01-16T20:45:00Z",
      end_time_iso: null,
      duration_minutes: null,
      page: 2,
      row_index: 5,
      confidence: 0.85
    }
  ];

  const lowConfidenceCount = mockEvents.filter(e => e.confidence < 0.85).length;
  
  const anomalies = [
    {
      type: "Time Gap",
      message: "Unexpectedly long gap between arrival and NOR",
      row_index: 1
    },
    {
      type: "Low Confidence", 
      message: "Event extraction confidence below threshold",
      row_index: 3
    }
  ];

  return {
    events: mockEvents,
    stats: {
      total_events: mockEvents.length,
      low_confidence_count: lowConfidenceCount
    },
    anomalies
  };
}

export async function mockCpGeneration(data: {
  recap: RecapData;
  baseTemplate: File;
  negotiatedClauses: string;
}): Promise<ProcessedDocument> {
  // Mock processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const mockChanges = [
    {
      field: "Vessel Name",
      original_value: "[VESSEL_NAME]",
      new_value: data.recap.vessel_name,
      source: "recap" as const
    },
    {
      field: "Load Port",
      original_value: "[LOAD_PORT]",
      new_value: data.recap.load_port,
      source: "recap" as const
    },
    {
      field: "Discharge Port",
      original_value: "[DISCHARGE_PORT]",
      new_value: data.recap.discharge_port,
      source: "recap" as const
    },
    {
      field: "Freight Rate",
      original_value: "[FREIGHT_RATE]",
      new_value: data.recap.freight_rate,
      source: "recap" as const
    }
  ];

  if (data.negotiatedClauses.trim()) {
    mockChanges.push({
      field: "Special Clauses",
      original_value: "",
      new_value: data.negotiatedClauses.substring(0, 50) + "...",
      source: "negotiated_clauses" as const
    });
  }

  const contentPreview = `CHARTER PARTY

Vessel: ${data.recap.vessel_name}
Cargo: ${data.recap.cargo_description}
Load Port: ${data.recap.load_port}
Discharge Port: ${data.recap.discharge_port}
Laycan: ${new Date(data.recap.laycan_start_iso).toLocaleDateString()} - ${new Date(data.recap.laycan_end_iso).toLocaleDateString()}
Freight Rate: ${data.recap.freight_rate}
Demurrage: ${data.recap.demurrage_rate}

TERMS AND CONDITIONS:

1. The vessel shall proceed to the loading port and there load the cargo...

2. The vessel shall be loaded and discharged in accordance with the custom of the port...

3. Freight payable as per the agreed rate stated above...

${data.negotiatedClauses ? '\nSPECIAL CLAUSES:\n' + data.negotiatedClauses : ''}

[Additional standard charter party clauses would follow...]`;

  return {
    content_preview: contentPreview,
    changes: mockChanges,
    artifacts: {
      docx_url: "mock://charter_party.docx",
      pdf_url: "mock://charter_party.pdf"
    }
  };
}