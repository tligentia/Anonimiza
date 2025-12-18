
export interface PseudonymizationResult {
  pseudonymizedText: string;
  originalText: string;
  entitiesFound: Entity[];
  processingTime?: number;
  mode?: 'ANON' | 'REVERT';
}

export interface Entity {
  type: string;
  originalValue: string;
  placeholder: string;
  forced?: boolean;
}

export enum ProcessStatus {
  IDLE = 'IDLE',
  LOADING_FILE = 'LOADING_FILE',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface FileData {
  data: string; // base64
  mimeType: string;
  name: string;
}
