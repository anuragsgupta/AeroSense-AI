import React from 'react';
import { Radio, AlertTriangle, CheckCircle, Clock, ChevronRight, ExternalLink } from 'lucide-react';
import { stations, anomalyRecords, scenarios, ScenarioKey } from '../data/mockData';
import { SeverityBadge, AnomalyTypeBadge, StatusDot, ConfidenceBar } from '../components/UIElements';
import IndiaMap from '../components/IndiaMap';
import ScenarioSwitcher from '../components/ScenarioSwitcher';
import { Page } from '../types';

interface CommandCenterProps {
  navigate: (page: Page, stationId?: string, anomalyId?: string) => void;
  setScenario: (key: ScenarioKey) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  activeScenario: ScenarioKey;
  selectedStationId?: string | null;
}

const kpis = [
  {
    label: 'Total Stations',
    value: '1,008',
    icon: <Radio size={18} className="text-blue-600" />,
    color: 'border-blue-200 bg-blue-50',
    sub: 'National AWS Network',
    iconBg: 'bg-blue-100',
  },
  {
    label: 'Healthy',
    value: '972',
    icon: <CheckCircle size={18} className="text-green-600" />,
    color: 'border-green-200 bg-green-50',
    sub: '96.4% operational',
    iconBg: 'bg-green-100',
  },
  {
    label: 'Under Review',
    value: '24',
    icon: <Clock size={18} className="text-amber-600" />,
    color: 'border-amber-200 bg-amber-50',
    sub: 'Pending operator review',
    iconBg: 'bg-amber-100',
  },
  {
    label: 'Critical',
    value: '12',
    icon: <AlertTriangle size={18} className="text-red-600" />,
    color: 'border-red-200 bg-red-50',
    sub: 'Immediate attention required',
    iconBg: 'bg-red-100',
  },
];

const detectedPatternLabel: Record<string, string> = {
  sensor_spike: 'Sudden Spike',
  frozen_sensor: 'Frozen Sensor',
  sensor_drift: 'Sensor Drift',
  sensor_malfunction: 'Sensor Malfunction',
  genuine_extreme: 'Probable Weather Extreme',
  normal: 'Normal',
};

export default function CommandCenter({ navigate, setScenario, activeScenario, selectedStationId }: CommandCenterProps) {
  return (
    <div className="page-container">
      {/* Page header */}
      <div className="mb-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Weather Observation Intelligence</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Real-time anomaly detection and explainable quality monitoring for Automatic Weather Stations
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-dot" />
            <span>Live monitoring active</span>
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {kpis.map(kpi => (
          <div key={kpi.label} className={`kpi-card border ${kpi.color}`}>
            <div className="flex items-start justify-between mb-2">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${kpi.iconBg}`}>
                {kpi.icon}
              </div>
              <span className="text-[9px] text-gray-400 font-semibold tracking-widest uppercase">[DEMO]</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
            <p className="text-xs font-semibold text-gray-600 mt-0.5">{kpi.label}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-5">
        {/* India Map */}
        <div className="col-span-2 card">
          <div className="card-header flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-800">Network Health — Station Map</p>
              <p className="text-xs text-gray-400 mt-0.5">Schematic representation · Click station to view detail</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" />972 Healthy</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" />24 Warning</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />12 Critical</span>
            </div>
          </div>
          <div className="p-3">
            <IndiaMap
              onStationClick={(id) => navigate('live-anomalies', id)}
              selectedStationId={selectedStationId}
            />
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* Scenario Switcher */}
          <ScenarioSwitcher activeScenario={activeScenario} onScenarioChange={setScenario} />

          {/* Quick stats */}
          <div className="card">
            <div className="card-header">
              <p className="text-sm font-semibold text-gray-800">Today's Summary</p>
              <p className="text-[10px] text-gray-400">[SIMULATED DEMO VALUES]</p>
            </div>
            <div className="p-3 space-y-2.5">
              {[
                { label: 'Anomalies detected', value: '47', color: 'text-gray-900' },
                { label: 'Confirmed sensor faults', value: '31', color: 'text-red-700' },
                { label: 'Genuine weather events', value: '9', color: 'text-blue-700' },
                { label: 'Pending review', value: '7', color: 'text-amber-700' },
                { label: 'Avg. detection confidence', value: '88.4%', color: 'text-gray-900' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{item.label}</span>
                  <span className={`text-sm font-bold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Target note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs font-semibold text-blue-800 mb-1">Pilot Target</p>
            <p className="text-[11px] text-blue-700">
              ≥30% false-positive reduction vs. threshold-only detection
            </p>
            <p className="text-[10px] text-blue-500 mt-1.5">
              Target metric — not a measured result. Requires pilot validation.
            </p>
          </div>
        </div>
      </div>

      {/* Current anomalies table */}
      <div className="card">
        <div className="card-header flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-800">Current Anomalies</p>
            <p className="text-xs text-gray-400 mt-0.5">Active flags requiring operator attention · [SIMULATED DEMO DATA]</p>
          </div>
          <button
            onClick={() => navigate('history')}
            className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            View all history <ChevronRight size={12} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Station</th>
                <th>Parameter</th>
                <th>Detected Pattern</th>
                <th>Severity</th>
                <th>Confidence</th>
                <th>Detected At</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {anomalyRecords.map(record => (
                <tr key={record.id} className="cursor-pointer" onClick={() => navigate('live-anomalies', record.stationId, record.id)}>
                  <td>
                    <div className="flex items-center gap-2">
                      <StatusDot status={record.severity === 'critical' ? 'critical' : record.severity === 'warning' ? 'warning' : 'healthy'} />
                      <span className="font-mono text-xs font-semibold text-blue-700">{record.stationId}</span>
                    </div>
                  </td>
                  <td className="text-xs text-gray-600">{record.parameter}</td>
                  <td>
                    <AnomalyTypeBadge type={record.detectedPattern} />
                  </td>
                  <td>
                    <SeverityBadge severity={record.severity} />
                  </td>
                  <td>
                    <div className="w-24">
                      <ConfidenceBar value={record.confidence} />
                    </div>
                  </td>
                  <td className="font-mono text-xs text-gray-600">{record.detectedAt}</td>
                  <td>
                    <span className={`text-xs font-semibold ${
                      record.status === 'under_review' ? 'text-amber-700' :
                      record.status === 'investigating' ? 'text-blue-700' :
                      record.status === 'verified' ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {record.status === 'under_review' ? 'Under Review' :
                       record.status === 'investigating' ? 'Investigating' :
                       record.status === 'verified' ? 'Verified Event' : 'Resolved'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={e => { e.stopPropagation(); navigate('live-anomalies', record.stationId, record.id); }}
                      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                    >
                      Investigate <ExternalLink size={10} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
