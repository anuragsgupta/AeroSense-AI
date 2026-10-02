// Types shared across app components
// Separated to avoid circular imports

export type ScenarioKey = 'spike' | 'frozen' | 'drift' | 'heatwave';

export type Page =
  | 'overview'
  | 'stations'
  | 'live-anomalies'
  | 'history'
  | 'detection'
  | 'model-insights'
  | 'architecture'
  | 'settings';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

export interface AppState {
  currentPage: Page;
  selectedStationId: string | null;
  selectedAnomalyId: string | null;
  activeScenario: ScenarioKey;
  sidebarOpen: boolean;
}
