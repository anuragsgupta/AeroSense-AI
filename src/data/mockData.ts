// ============================================================
// AeroSense AI — Mock / Simulated Data Layer
// All values are SIMULATED DEMO DATA for prototype purposes.
// Real production data would be fetched from a FastAPI backend.
// ============================================================

import { ScenarioKey } from '../types';

export type StationStatus = 'healthy' | 'warning' | 'critical' | 'offline';
export type AnomalyType = 'sensor_spike' | 'frozen_sensor' | 'sensor_drift' | 'sensor_malfunction' | 'genuine_extreme' | 'normal';
export type Severity = 'critical' | 'warning' | 'info' | 'normal';
export type OperatorDecision = 'confirmed_fault' | 'genuine_event' | 'escalated' | 'pending';

export type { ScenarioKey };

export interface Station {
  id: string;
  name: string;
  state: string;
  region: string;
  lat: number;
  lng: number;
  status: StationStatus;
  temperature: number;
  pressure: number;
  humidity: number;
  lastUpdate: string;
  anomalyCount: number;
  elevation: number;
}

export interface TimeSeriesPoint {
  time: string;
  temperature: number;
  pressure: number;
  humidity: number;
  isAnomaly?: boolean;
}

export interface AnomalyRecord {
  id: string;
  stationId: string;
  parameter: string;
  detectedPattern: AnomalyType;
  severity: Severity;
  confidence: number;
  detectedAt: string;
  status: 'under_review' | 'investigating' | 'verified' | 'resolved';
  operatorDecision?: OperatorDecision;
  operatorNotes?: string;
}

export interface ScenarioData {
  key: ScenarioKey;
  label: string;
  shortLabel: string;
  anomalyType: AnomalyType;
  classification: string;
  severity: Severity;
  confidence: number;
  timeSeries: TimeSeriesPoint[];
  explanation: string;
  evidenceContributions: EvidenceContribution[];
  detectionEngines: DetectionEngine[];
  isolationForestScore: number;
  lstmError: number;
  domainRulesScore: number;
  baselineDeviation: number;
  fusionScore: number;
  statusColor: string;
  classificationColor: string;
  isGenuineEvent: boolean;
}

export interface EvidenceContribution {
  label: string;
  contribution: 'high' | 'medium' | 'low' | 'none';
  value: number;
  description: string;
}

export interface DetectionEngine {
  name: string;
  status: 'anomaly' | 'normal' | 'inconsistent' | 'deviation';
  label: string;
  detail: string;
}

// ============================================================
// STATIONS — Simulated AWS Network
// ============================================================

export const stations: Station[] = [
  { id: 'AWS-MP-104', name: 'Bhopal Central AWS', state: 'Madhya Pradesh', region: 'Central India', lat: 23.25, lng: 77.41, status: 'critical', temperature: 47.2, pressure: 1007, humidity: 42, lastUpdate: '14:02', anomalyCount: 1, elevation: 523 },
  { id: 'AWS-MP-105', name: 'Indore North AWS', state: 'Madhya Pradesh', region: 'Central India', lat: 22.72, lng: 75.86, status: 'healthy', temperature: 31.4, pressure: 1005, humidity: 58, lastUpdate: '14:04', anomalyCount: 0, elevation: 553 },
  { id: 'AWS-RJ-221', name: 'Jaipur West AWS', state: 'Rajasthan', region: 'North India', lat: 26.91, lng: 75.79, status: 'warning', temperature: 34.8, pressure: 1001, humidity: 31, lastUpdate: '13:48', anomalyCount: 1, elevation: 432 },
  { id: 'AWS-OD-087', name: 'Bhubaneswar AWS', state: 'Odisha', region: 'East India', lat: 20.30, lng: 85.82, status: 'warning', temperature: 29.1, pressure: 1009, humidity: 78, lastUpdate: '13:31', anomalyCount: 1, elevation: 45 },
  { id: 'AWS-UP-341', name: 'Lucknow Central', state: 'Uttar Pradesh', region: 'North India', lat: 26.85, lng: 80.91, status: 'healthy', temperature: 33.2, pressure: 1004, humidity: 54, lastUpdate: '13:22', anomalyCount: 0, elevation: 123 },
  { id: 'AWS-MH-156', name: 'Pune AWS', state: 'Maharashtra', region: 'West India', lat: 18.52, lng: 73.86, status: 'healthy', temperature: 28.6, pressure: 1013, humidity: 65, lastUpdate: '14:01', anomalyCount: 0, elevation: 560 },
  { id: 'AWS-MH-089', name: 'Mumbai Colaba AWS', state: 'Maharashtra', region: 'West India', lat: 18.90, lng: 72.81, status: 'healthy', temperature: 30.2, pressure: 1011, humidity: 82, lastUpdate: '14:03', anomalyCount: 0, elevation: 14 },
  { id: 'AWS-TN-201', name: 'Chennai AWS', state: 'Tamil Nadu', region: 'South India', lat: 13.08, lng: 80.27, status: 'healthy', temperature: 34.5, pressure: 1008, humidity: 70, lastUpdate: '13:59', anomalyCount: 0, elevation: 6 },
  { id: 'AWS-KA-178', name: 'Bengaluru AWS', state: 'Karnataka', region: 'South India', lat: 12.97, lng: 77.59, status: 'healthy', temperature: 26.1, pressure: 1015, humidity: 59, lastUpdate: '14:00', anomalyCount: 0, elevation: 920 },
  { id: 'AWS-GJ-112', name: 'Ahmedabad AWS', state: 'Gujarat', region: 'West India', lat: 23.02, lng: 72.57, status: 'healthy', temperature: 36.4, pressure: 1003, humidity: 38, lastUpdate: '13:57', anomalyCount: 0, elevation: 55 },
  { id: 'AWS-WB-045', name: 'Kolkata AWS', state: 'West Bengal', region: 'East India', lat: 22.57, lng: 88.36, status: 'healthy', temperature: 31.8, pressure: 1006, humidity: 76, lastUpdate: '14:02', anomalyCount: 0, elevation: 9 },
  { id: 'AWS-DL-001', name: 'Delhi Safdarjung', state: 'Delhi', region: 'North India', lat: 28.61, lng: 77.20, status: 'healthy', temperature: 35.9, pressure: 1002, humidity: 45, lastUpdate: '14:03', anomalyCount: 0, elevation: 216 },
  { id: 'AWS-HR-067', name: 'Ambala AWS', state: 'Haryana', region: 'North India', lat: 30.37, lng: 76.78, status: 'healthy', temperature: 33.1, pressure: 1005, humidity: 48, lastUpdate: '13:58', anomalyCount: 0, elevation: 272 },
  { id: 'AWS-PB-034', name: 'Amritsar AWS', state: 'Punjab', region: 'North India', lat: 31.63, lng: 74.87, status: 'healthy', temperature: 31.7, pressure: 1006, humidity: 52, lastUpdate: '13:55', anomalyCount: 0, elevation: 234 },
  { id: 'AWS-JK-009', name: 'Srinagar AWS', state: 'J&K', region: 'North India', lat: 34.08, lng: 74.80, status: 'healthy', temperature: 18.2, pressure: 1021, humidity: 63, lastUpdate: '13:50', anomalyCount: 0, elevation: 1587 },
  { id: 'AWS-HP-022', name: 'Shimla AWS', state: 'Himachal Pradesh', region: 'North India', lat: 31.10, lng: 77.17, status: 'healthy', temperature: 16.4, pressure: 1025, humidity: 71, lastUpdate: '13:52', anomalyCount: 0, elevation: 2202 },
  { id: 'AWS-UK-018', name: 'Dehradun AWS', state: 'Uttarakhand', region: 'North India', lat: 30.32, lng: 78.03, status: 'healthy', temperature: 27.8, pressure: 1009, humidity: 68, lastUpdate: '13:47', anomalyCount: 0, elevation: 435 },
  { id: 'AWS-AP-133', name: 'Hyderabad AWS', state: 'Telangana', region: 'South India', lat: 17.38, lng: 78.47, status: 'healthy', temperature: 31.3, pressure: 1010, humidity: 55, lastUpdate: '13:59', anomalyCount: 0, elevation: 536 },
  { id: 'AWS-KL-077', name: 'Thiruvananthapuram AWS', state: 'Kerala', region: 'South India', lat: 8.52, lng: 76.94, status: 'healthy', temperature: 29.4, pressure: 1012, humidity: 85, lastUpdate: '13:56', anomalyCount: 0, elevation: 64 },
  { id: 'AWS-AS-055', name: 'Guwahati AWS', state: 'Assam', region: 'Northeast India', lat: 26.14, lng: 91.74, status: 'warning', temperature: 28.9, pressure: 1008, humidity: 88, lastUpdate: '13:38', anomalyCount: 1, elevation: 55 },
  { id: 'AWS-BR-091', name: 'Patna AWS', state: 'Bihar', region: 'East India', lat: 25.61, lng: 85.14, status: 'healthy', temperature: 32.4, pressure: 1003, humidity: 61, lastUpdate: '13:54', anomalyCount: 0, elevation: 57 },
  { id: 'AWS-CG-044', name: 'Raipur AWS', state: 'Chhattisgarh', region: 'Central India', lat: 21.25, lng: 81.63, status: 'healthy', temperature: 30.7, pressure: 1006, humidity: 66, lastUpdate: '13:49', anomalyCount: 0, elevation: 298 },
  { id: 'AWS-JH-028', name: 'Ranchi AWS', state: 'Jharkhand', region: 'East India', lat: 23.34, lng: 85.31, status: 'healthy', temperature: 27.2, pressure: 1011, humidity: 72, lastUpdate: '13:43', anomalyCount: 0, elevation: 651 },
  { id: 'AWS-GA-003', name: 'Panaji AWS', state: 'Goa', region: 'West India', lat: 15.49, lng: 73.82, status: 'healthy', temperature: 29.8, pressure: 1013, humidity: 79, lastUpdate: '13:58', anomalyCount: 0, elevation: 15 },
];

// ============================================================
// ANOMALY RECORDS
// ============================================================

export const anomalyRecords: AnomalyRecord[] = [
  { id: 'ANO-2024-001', stationId: 'AWS-MP-104', parameter: 'Temperature', detectedPattern: 'sensor_spike', severity: 'critical', confidence: 94, detectedAt: '14:02', status: 'under_review' },
  { id: 'ANO-2024-002', stationId: 'AWS-RJ-221', parameter: 'Pressure', detectedPattern: 'sensor_drift', severity: 'warning', confidence: 87, detectedAt: '13:48', status: 'under_review' },
  { id: 'ANO-2024-003', stationId: 'AWS-OD-087', parameter: 'Humidity', detectedPattern: 'frozen_sensor', severity: 'warning', confidence: 91, detectedAt: '13:31', status: 'investigating' },
  { id: 'ANO-2024-004', stationId: 'AWS-UP-341', parameter: 'Temperature', detectedPattern: 'genuine_extreme', severity: 'info', confidence: 82, detectedAt: '13:22', status: 'verified', operatorDecision: 'genuine_event' },
  { id: 'ANO-2024-005', stationId: 'AWS-AS-055', parameter: 'Humidity', detectedPattern: 'sensor_drift', severity: 'warning', confidence: 79, detectedAt: '13:38', status: 'investigating' },
];

// ============================================================
// SCENARIO DATA — All four demo scenarios
// ============================================================

export const scenarios: Record<ScenarioKey, ScenarioData> = {
  spike: {
    key: 'spike',
    label: 'A. Temperature Sensor Spike',
    shortLabel: 'Sensor Spike',
    anomalyType: 'sensor_spike',
    classification: 'PROBABLE SENSOR SPIKE',
    severity: 'critical',
    confidence: 94,
    statusColor: 'text-red-600',
    classificationColor: 'bg-red-100 text-red-800 border-red-300',
    isGenuineEvent: false,
    timeSeries: [
      { time: '13:45', temperature: 31.1, pressure: 1007.2, humidity: 43.1 },
      { time: '13:50', temperature: 31.4, pressure: 1007.1, humidity: 43.0 },
      { time: '13:55', temperature: 31.7, pressure: 1007.0, humidity: 42.8 },
      { time: '14:00', temperature: 32.0, pressure: 1006.9, humidity: 42.5 },
      { time: '14:01', temperature: 46.8, pressure: 1007.0, humidity: 42.6, isAnomaly: true },
      { time: '14:02', temperature: 47.2, pressure: 1007.1, humidity: 42.7, isAnomaly: true },
      { time: '14:03', temperature: 32.1, pressure: 1007.0, humidity: 42.5 },
      { time: '14:05', temperature: 31.9, pressure: 1006.9, humidity: 42.4 },
      { time: '14:08', temperature: 31.8, pressure: 1007.1, humidity: 42.6 },
    ],
    explanation: 'Temperature increased sharply from 32.0°C to 47.2°C within approximately one minute, then returned to baseline. Atmospheric pressure and relative humidity remained comparatively stable throughout the period. The observed change exceeds the physical rate-of-change limit for ambient temperature and is inconsistent with the station\'s learned temporal behaviour. Multiple detection mechanisms provide supporting evidence for a probable sensor spike.',
    evidenceContributions: [
      { label: 'Temp Rate of Change', contribution: 'high', value: 94, description: 'Δ+15.2°C in ~60 seconds — exceeds physical threshold' },
      { label: 'Station Baseline Deviation', contribution: 'high', value: 89, description: 'Significant deviation from learned station normal' },
      { label: 'Pressure Support', contribution: 'low', value: 12, description: 'Pressure stable — does not support temperature event' },
      { label: 'Humidity Support', contribution: 'low', value: 14, description: 'Humidity stable — does not support temperature event' },
      { label: 'Temporal Reconstruction Error', contribution: 'high', value: 91, description: 'LSTM autoencoder reports HIGH reconstruction error' },
      { label: 'Domain Consistency', contribution: 'high', value: 96, description: 'Multivariate atmospheric consistency check failed' },
    ],
    detectionEngines: [
      { name: 'Isolation Forest', status: 'anomaly', label: 'Anomaly Detected', detail: 'Score: 0.91 — point anomaly confirmed' },
      { name: 'LSTM Autoencoder', status: 'anomaly', label: 'Temporal Anomaly Detected', detail: 'Reconstruction error: 0.847 (threshold: 0.15)' },
      { name: 'Domain Rules', status: 'inconsistent', label: 'Multivariate Inconsistency', detail: 'Rate-of-change rule VIOLATED. Persistence check: OK' },
      { name: 'Station Baseline', status: 'deviation', label: 'Significant Deviation', detail: '4.8σ from 30-day rolling station baseline' },
    ],
    isolationForestScore: 91,
    lstmError: 85,
    domainRulesScore: 96,
    baselineDeviation: 89,
    fusionScore: 94,
  },

  frozen: {
    key: 'frozen',
    label: 'B. Frozen / Stuck Sensor',
    shortLabel: 'Frozen Sensor',
    anomalyType: 'frozen_sensor',
    classification: 'PROBABLE FROZEN SENSOR',
    severity: 'warning',
    confidence: 91,
    statusColor: 'text-amber-600',
    classificationColor: 'bg-amber-100 text-amber-800 border-amber-300',
    isGenuineEvent: false,
    timeSeries: [
      { time: '13:00', temperature: 27.6, pressure: 1008.1, humidity: 61.2 },
      { time: '13:05', temperature: 27.5, pressure: 1008.0, humidity: 61.4 },
      { time: '13:10', temperature: 27.4, pressure: 1007.9, humidity: 61.5 },
      { time: '13:15', temperature: 27.4, pressure: 1007.8, humidity: 61.7, isAnomaly: true },
      { time: '13:20', temperature: 27.4, pressure: 1007.7, humidity: 61.6, isAnomaly: true },
      { time: '13:25', temperature: 27.4, pressure: 1007.6, humidity: 61.8, isAnomaly: true },
      { time: '13:30', temperature: 27.4, pressure: 1007.7, humidity: 61.9, isAnomaly: true },
      { time: '13:35', temperature: 27.4, pressure: 1007.5, humidity: 62.0, isAnomaly: true },
      { time: '13:40', temperature: 27.4, pressure: 1007.6, humidity: 62.1, isAnomaly: true },
    ],
    explanation: 'Temperature has remained constant at exactly 27.4°C for over 30 consecutive minutes. Pressure and humidity continue to exhibit normal temporal variation during the same period. Near-zero variance in a natural atmospheric measurement over such duration is physically implausible and strongly indicates sensor persistence failure (frozen/stuck sensor output).',
    evidenceContributions: [
      { label: 'Persistence Anomaly', contribution: 'high', value: 97, description: 'Zero variance for 30+ minutes — physically implausible' },
      { label: 'Temporal Reconstruction Error', contribution: 'high', value: 88, description: 'LSTM detects abnormal temporal pattern' },
      { label: 'Station Baseline Deviation', contribution: 'medium', value: 72, description: 'Near-zero variance vs. expected natural fluctuation' },
      { label: 'Pressure Context', contribution: 'medium', value: 65, description: 'Pressure variation confirms station is active/reporting' },
      { label: 'Temp Rate of Change', contribution: 'low', value: 8, description: 'Rate-of-change is unusually zero' },
      { label: 'Domain Consistency', contribution: 'high', value: 93, description: 'Variance-persistence rule VIOLATED' },
    ],
    detectionEngines: [
      { name: 'Isolation Forest', status: 'anomaly', label: 'Anomaly Detected', detail: 'Score: 0.78 — statistical anomaly in variance pattern' },
      { name: 'LSTM Autoencoder', status: 'anomaly', label: 'Temporal Anomaly Detected', detail: 'Reconstruction error: 0.623 — flat sequence flagged' },
      { name: 'Domain Rules', status: 'inconsistent', label: 'Persistence Rule Violated', detail: 'Δ=0.0°C for 30+ consecutive intervals' },
      { name: 'Station Baseline', status: 'deviation', label: 'Variance Mismatch', detail: 'Expected σ≈0.8°C; observed σ≈0.0°C' },
    ],
    isolationForestScore: 78,
    lstmError: 88,
    domainRulesScore: 93,
    baselineDeviation: 72,
    fusionScore: 91,
  },

  drift: {
    key: 'drift',
    label: 'C. Sensor Drift',
    shortLabel: 'Sensor Drift',
    anomalyType: 'sensor_drift',
    classification: 'PROBABLE SENSOR DRIFT',
    severity: 'warning',
    confidence: 87,
    statusColor: 'text-amber-600',
    classificationColor: 'bg-amber-100 text-amber-800 border-amber-300',
    isGenuineEvent: false,
    timeSeries: [
      { time: '12:00', temperature: 25.1, pressure: 1008.5, humidity: 60.1 },
      { time: '12:20', temperature: 25.4, pressure: 1008.4, humidity: 60.0 },
      { time: '12:40', temperature: 25.8, pressure: 1008.3, humidity: 59.8 },
      { time: '13:00', temperature: 26.1, pressure: 1008.2, humidity: 59.7 },
      { time: '13:20', temperature: 26.5, pressure: 1008.1, humidity: 59.5, isAnomaly: true },
      { time: '13:40', temperature: 26.9, pressure: 1008.0, humidity: 59.4, isAnomaly: true },
      { time: '14:00', temperature: 27.4, pressure: 1007.9, humidity: 59.2, isAnomaly: true },
      { time: '14:20', temperature: 27.9, pressure: 1007.8, humidity: 59.1, isAnomaly: true },
    ],
    explanation: 'Temperature exhibits a gradual, persistent upward trend of approximately +0.35°C per 20-minute interval over a 2-hour period. While atmospheric pressure and humidity show minor natural variation, they do not confirm a genuine atmospheric warming event of this magnitude. The consistent monotonic drift pattern, combined with increasing residual from the station baseline, is characteristic of sensor calibration drift.',
    evidenceContributions: [
      { label: 'Monotonic Drift Pattern', contribution: 'high', value: 87, description: 'Persistent positive trend over 2-hour window' },
      { label: 'Station Baseline Residual', contribution: 'high', value: 84, description: 'Increasing deviation from expected station behaviour' },
      { label: 'Temporal Reconstruction Error', contribution: 'medium', value: 71, description: 'Gradual degradation in LSTM reconstruction quality' },
      { label: 'Pressure Correlation', contribution: 'medium', value: 58, description: 'Weak pressure correlation with observed warming' },
      { label: 'Humidity Support', contribution: 'low', value: 29, description: 'Humidity trend does not confirm warming event' },
      { label: 'Domain Consistency', contribution: 'medium', value: 76, description: 'Slow drift — rate rule OK but trend rule flagged' },
    ],
    detectionEngines: [
      { name: 'Isolation Forest', status: 'anomaly', label: 'Anomaly Detected', detail: 'Score: 0.69 — statistical drift from expected distribution' },
      { name: 'LSTM Autoencoder', status: 'anomaly', label: 'Temporal Anomaly Detected', detail: 'Reconstruction error degrading: 0.241 and increasing' },
      { name: 'Domain Rules', status: 'inconsistent', label: 'Trend Rule Flagged', detail: 'Monotonic trend > 2h without atmospheric support' },
      { name: 'Station Baseline', status: 'deviation', label: 'Increasing Residual', detail: '2.3σ and growing — baseline residual increasing' },
    ],
    isolationForestScore: 69,
    lstmError: 71,
    domainRulesScore: 76,
    baselineDeviation: 84,
    fusionScore: 87,
  },

  heatwave: {
    key: 'heatwave',
    label: 'D. Genuine Heatwave Event',
    shortLabel: 'Genuine Heatwave',
    anomalyType: 'genuine_extreme',
    classification: 'PROBABLE GENUINE WEATHER EXTREME',
    severity: 'info',
    confidence: 82,
    statusColor: 'text-blue-600',
    classificationColor: 'bg-blue-100 text-blue-800 border-blue-300',
    isGenuineEvent: true,
    timeSeries: [
      { time: '10:00', temperature: 32.1, pressure: 1005.8, humidity: 38.5 },
      { time: '10:30', temperature: 34.2, pressure: 1004.9, humidity: 35.8 },
      { time: '11:00', temperature: 36.4, pressure: 1004.1, humidity: 33.2 },
      { time: '11:30', temperature: 38.1, pressure: 1003.5, humidity: 30.9, isAnomaly: true },
      { time: '12:00', temperature: 39.8, pressure: 1002.8, humidity: 28.4, isAnomaly: true },
      { time: '12:30', temperature: 41.2, pressure: 1002.3, humidity: 26.7, isAnomaly: true },
      { time: '13:00', temperature: 42.5, pressure: 1001.9, humidity: 25.1, isAnomaly: true },
      { time: '13:30', temperature: 41.8, pressure: 1002.1, humidity: 25.8 },
    ],
    explanation: 'Although temperature has risen significantly above station-normal behaviour, the temporal evolution is gradual and physically plausible. Atmospheric pressure shows a coherent decreasing trend consistent with thermally-driven surface pressure reduction. Relative humidity demonstrates expected inverse correlation with rising temperature. The multivariate atmospheric coherence indicates this observation is contextually consistent and is therefore retained for expert review as a probable genuine weather extreme rather than a sensor failure.',
    evidenceContributions: [
      { label: 'Pressure Coherence', contribution: 'high', value: 91, description: 'Pressure decreasing coherently with temperature rise' },
      { label: 'Humidity Inverse Correlation', contribution: 'high', value: 88, description: 'Humidity decreasing — expected with temperature rise' },
      { label: 'Gradual Rate of Change', contribution: 'medium', value: 62, description: 'Δ≈2°C/30min — within physical plausibility range' },
      { label: 'Station Baseline Deviation', contribution: 'high', value: 85, description: 'Significant but coherent deviation from baseline' },
      { label: 'Temporal Pattern', contribution: 'medium', value: 68, description: 'Smooth temporal evolution consistent with heat event' },
      { label: 'Domain Consistency', contribution: 'high', value: 93, description: 'All atmospheric consistency checks PASS' },
    ],
    detectionEngines: [
      { name: 'Isolation Forest', status: 'anomaly', label: 'Statistical Anomaly Detected', detail: 'Score: 0.74 — temperature is statistically unusual' },
      { name: 'LSTM Autoencoder', status: 'normal', label: 'Temporally Consistent', detail: 'Reconstruction error: 0.118 — within acceptable range' },
      { name: 'Domain Rules', status: 'normal', label: 'Atmospheric Coherence: PASS', detail: 'All multivariate consistency checks passed' },
      { name: 'Station Baseline', status: 'deviation', label: 'Above Normal Range', detail: '3.2σ above 30-day baseline — unusual but coherent' },
    ],
    isolationForestScore: 74,
    lstmError: 22,
    domainRulesScore: 7,
    baselineDeviation: 85,
    fusionScore: 82,
  },
};

// ============================================================
// HISTORY DATA
// ============================================================

export interface HistoryRecord {
  id: string;
  timestamp: string;
  date: string;
  stationId: string;
  type: AnomalyType;
  confidence: number;
  severity: Severity;
  decision: OperatorDecision;
  notes?: string;
}

export const historyRecords: HistoryRecord[] = [
  { id: 'H-001', timestamp: '2024-10-03 14:02', date: '2024-10-03', stationId: 'AWS-MP-104', type: 'sensor_spike', confidence: 94, severity: 'critical', decision: 'pending' },
  { id: 'H-002', timestamp: '2024-10-03 13:48', date: '2024-10-03', stationId: 'AWS-RJ-221', type: 'sensor_drift', confidence: 87, severity: 'warning', decision: 'pending' },
  { id: 'H-003', timestamp: '2024-10-03 13:31', date: '2024-10-03', stationId: 'AWS-OD-087', type: 'frozen_sensor', confidence: 91, severity: 'warning', decision: 'confirmed_fault' },
  { id: 'H-004', timestamp: '2024-10-03 13:22', date: '2024-10-03', stationId: 'AWS-UP-341', type: 'genuine_extreme', confidence: 82, severity: 'info', decision: 'genuine_event', notes: 'Heatwave conditions confirmed by regional NWP model' },
  { id: 'H-005', timestamp: '2024-10-02 18:45', date: '2024-10-02', stationId: 'AWS-GJ-112', type: 'sensor_spike', confidence: 89, severity: 'critical', decision: 'confirmed_fault', notes: 'Sensor replaced by field team' },
  { id: 'H-006', timestamp: '2024-10-02 16:21', date: '2024-10-02', stationId: 'AWS-MH-156', type: 'frozen_sensor', confidence: 93, severity: 'warning', decision: 'confirmed_fault' },
  { id: 'H-007', timestamp: '2024-10-02 11:08', date: '2024-10-02', stationId: 'AWS-WB-045', type: 'sensor_drift', confidence: 76, severity: 'warning', decision: 'escalated', notes: 'Escalated to regional maintenance team' },
  { id: 'H-008', timestamp: '2024-10-01 09:34', date: '2024-10-01', stationId: 'AWS-TN-201', type: 'genuine_extreme', confidence: 78, severity: 'info', decision: 'genuine_event' },
  { id: 'H-009', timestamp: '2024-10-01 07:15', date: '2024-10-01', stationId: 'AWS-DL-001', type: 'sensor_spike', confidence: 96, severity: 'critical', decision: 'confirmed_fault', notes: 'Lightning strike — sensor damaged' },
  { id: 'H-010', timestamp: '2024-09-30 22:41', date: '2024-09-30', stationId: 'AWS-KL-077', type: 'sensor_malfunction', confidence: 88, severity: 'critical', decision: 'confirmed_fault' },
  { id: 'H-011', timestamp: '2024-09-30 14:19', date: '2024-09-30', stationId: 'AWS-HP-022', type: 'genuine_extreme', confidence: 71, severity: 'info', decision: 'genuine_event', notes: 'Cold wave advisory in effect' },
  { id: 'H-012', timestamp: '2024-09-29 10:52', date: '2024-09-29', stationId: 'AWS-AS-055', type: 'sensor_drift', confidence: 83, severity: 'warning', decision: 'confirmed_fault' },
];

// ============================================================
// TREND CHART DATA
// ============================================================

export const anomalyTrendData = [
  { date: 'Sep 24', spike: 3, frozen: 2, drift: 4, malfunction: 1, genuine: 2 },
  { date: 'Sep 25', spike: 2, frozen: 3, drift: 2, malfunction: 0, genuine: 3 },
  { date: 'Sep 26', spike: 5, frozen: 1, drift: 3, malfunction: 2, genuine: 1 },
  { date: 'Sep 27', spike: 1, frozen: 4, drift: 2, malfunction: 1, genuine: 4 },
  { date: 'Sep 28', spike: 4, frozen: 2, drift: 5, malfunction: 0, genuine: 2 },
  { date: 'Sep 29', spike: 3, frozen: 3, drift: 3, malfunction: 2, genuine: 3 },
  { date: 'Sep 30', spike: 6, frozen: 1, drift: 2, malfunction: 1, genuine: 1 },
  { date: 'Oct 01', spike: 2, frozen: 2, drift: 4, malfunction: 3, genuine: 3 },
  { date: 'Oct 02', spike: 4, frozen: 3, drift: 2, malfunction: 0, genuine: 2 },
  { date: 'Oct 03', spike: 2, frozen: 1, drift: 1, malfunction: 0, genuine: 1 },
];
