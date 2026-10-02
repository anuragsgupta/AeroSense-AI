import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, ReferenceArea, Legend,
} from 'recharts';
import { Thermometer, Gauge, Droplets, ArrowUpRight, ArrowRight, Minus } from 'lucide-react';
import { stations, scenarios, ScenarioKey, TimeSeriesPoint } from '../data/mockData';
import { SeverityBadge, EngineStatusDot } from '../components/UIElements';
import ScenarioSwitcher from '../components/ScenarioSwitcher';
import { Page } from '../types';

interface StationDetailProps {
  navigate: (page: Page, stationId?: string) => void;
  setScenario: (key: ScenarioKey) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  activeScenario: ScenarioKey;
  stationId: string;
}

export default function StationDetail({ navigate, setScenario, showToast, activeScenario, stationId }: StationDetailProps) {
  const station = stations.find(s => s.id === stationId) ?? stations[0];
  const scenario = scenarios[activeScenario];

  const [showTemp, setShowTemp] = useState(true);
  const [showPressure, setShowPressure] = useState(true);
  const [showHumidity, setShowHumidity] = useState(true);

  // Find anomaly region
  const anomalyPoints = scenario.timeSeries.filter(p => p.isAnomaly);
  const anomalyStart = anomalyPoints[0]?.time;
  const anomalyEnd = anomalyPoints[anomalyPoints.length - 1]?.time;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2.5 text-xs">
        <p className="font-bold text-gray-700 mb-1.5">{label}</p>
        {payload.map((p: any) => (
          <div key={p.dataKey} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-gray-600">{p.name}:</span>
            <span className="font-semibold">{p.value?.toFixed(1)} {p.name === 'Temperature' ? '°C' : p.name === 'Pressure' ? ' hPa' : '%'}</span>
          </div>
        ))}
      </div>
    );
  };

  const sensorCards = [
    {
      label: 'Temperature',
      value: `${scenario.timeSeries[scenario.timeSeries.length - 1]?.temperature.toFixed(1)}°C`,
      icon: <Thermometer size={18} className={scenario.anomalyType === 'sensor_spike' || scenario.anomalyType === 'genuine_extreme' ? 'text-red-600' : 'text-gray-600'} />,
      change: scenario.anomalyType === 'sensor_spike' ? '+15.8°C / 1 min' : scenario.anomalyType === 'frozen_sensor' ? 'No change — 30 min' : scenario.anomalyType === 'sensor_drift' ? '+2.8°C / 2 hr' : '+10.4°C / 3 hr',
      changeColor: scenario.anomalyType === 'frozen_sensor' ? 'text-blue-600' : scenario.isGenuineEvent ? 'text-orange-600' : 'text-red-600',
      status: scenario.anomalyType !== 'normal' && scenario.anomalyType !== 'genuine_extreme' ? 'ANOMALY' : scenario.isGenuineEvent ? 'ELEVATED' : 'NORMAL',
      statusColor: scenario.isGenuineEvent ? 'text-orange-700 bg-orange-50 border-orange-200' : scenario.anomalyType !== 'normal' ? 'text-red-700 bg-red-50 border-red-200' : 'text-green-700 bg-green-50 border-green-200',
    },
    {
      label: 'Pressure',
      value: `${scenario.timeSeries[scenario.timeSeries.length - 1]?.pressure.toFixed(1)} hPa`,
      icon: <Gauge size={18} className="text-gray-600" />,
      change: scenario.isGenuineEvent ? '↓ −3.9 hPa / 3 hr' : 'Stable',
      changeColor: scenario.isGenuineEvent ? 'text-orange-600' : 'text-gray-500',
      status: scenario.isGenuineEvent ? 'COHERENT' : 'STABLE',
      statusColor: 'text-green-700 bg-green-50 border-green-200',
    },
    {
      label: 'Relative Humidity',
      value: `${scenario.timeSeries[scenario.timeSeries.length - 1]?.humidity.toFixed(0)}%`,
      icon: <Droplets size={18} className="text-gray-600" />,
      change: scenario.isGenuineEvent ? '↓ −13.4% / 3 hr' : 'Stable',
      changeColor: scenario.isGenuineEvent ? 'text-orange-600' : 'text-gray-500',
      status: scenario.isGenuineEvent ? 'COHERENT' : 'STABLE',
      statusColor: 'text-green-700 bg-green-50 border-green-200',
    },
  ];

  return (
    <div className="page-container">
      {/* Station header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-gray-900 font-mono">{station.id}</h1>
            <SeverityBadge severity={scenario.severity} />
          </div>
          <p className="text-sm text-gray-500">{station.name} · {station.state} · Elevation: {station.elevation}m</p>
          <p className="text-xs text-gray-400 mt-0.5">Lat {station.lat}° N  Lng {station.lng}° E</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className={`text-xs font-bold ${scenario.isGenuineEvent ? 'text-blue-700' : scenario.severity === 'critical' ? 'text-red-700' : 'text-amber-700'}`}>
              {scenario.isGenuineEvent ? '1 probable weather extreme' : `1 active anomaly — ${scenario.shortLabel}`}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">Scenario: {scenario.label}</p>
          </div>
        </div>
      </div>

      {/* Sensor reading cards */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {sensorCards.map(card => (
          <div key={card.label} className="kpi-card">
            <div className="flex items-center justify-between mb-2">
              {card.icon}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${card.statusColor}`}>{card.status}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="text-xs font-semibold text-gray-600">{card.label}</p>
            <p className={`text-xs mt-1 font-medium ${card.changeColor}`}>{card.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Time series chart */}
        <div className="col-span-2 card">
          <div className="card-header flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-800">Sensor Time Series</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {scenario.label} · Highlighted region indicates flagged period · [SIMULATED]
              </p>
            </div>
            <div className="flex items-center gap-3">
              {[
                { key: 'temp', label: 'Temperature', active: showTemp, toggle: () => setShowTemp(!showTemp), color: 'bg-red-500' },
                { key: 'pres', label: 'Pressure', active: showPressure, toggle: () => setShowPressure(!showPressure), color: 'bg-blue-500' },
                { key: 'hum', label: 'Humidity', active: showHumidity, toggle: () => setShowHumidity(!showHumidity), color: 'bg-teal-500' },
              ].map(t => (
                <button
                  key={t.key}
                  onClick={t.toggle}
                  className={`flex items-center gap-1.5 text-xs font-medium cursor-pointer transition-opacity ${t.active ? 'opacity-100' : 'opacity-40'}`}
                >
                  <span className={`w-2 h-2 rounded-full ${t.color}`} />
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div className="p-4">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={scenario.timeSeries} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="#cbd5e1" />
                <YAxis tick={{ fontSize: 10 }} stroke="#cbd5e1" />
                <Tooltip content={<CustomTooltip />} />

                {/* Anomaly highlight region */}
                {anomalyStart && anomalyEnd && (
                  <ReferenceArea
                    x1={anomalyStart}
                    x2={anomalyEnd}
                    fill={scenario.isGenuineEvent ? '#dbeafe' : '#fee2e2'}
                    fillOpacity={0.5}
                    stroke={scenario.isGenuineEvent ? '#93c5fd' : '#fca5a5'}
                    strokeDasharray="4 4"
                    label={{ value: scenario.isGenuineEvent ? 'ELEVATED' : 'ANOMALY', position: 'insideTop', fontSize: 9, fill: scenario.isGenuineEvent ? '#1d4ed8' : '#dc2626', fontWeight: 'bold' }}
                  />
                )}

                {showTemp && (
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    name="Temperature"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={(props: any) => {
                      if (props.payload?.isAnomaly) {
                        return <circle key={props.key} cx={props.cx} cy={props.cy} r={5} fill={scenario.isGenuineEvent ? '#f97316' : '#dc2626'} stroke="white" strokeWidth={2} />;
                      }
                      return <circle key={props.key} cx={props.cx} cy={props.cy} r={2.5} fill="#ef4444" />;
                    }}
                  />
                )}
                {showPressure && (
                  <Line type="monotone" dataKey="pressure" name="Pressure" stroke="#3b82f6" strokeWidth={1.5} dot={{ r: 2 }} />
                )}
                {showHumidity && (
                  <Line type="monotone" dataKey="humidity" name="Humidity" stroke="#14b8a6" strokeWidth={1.5} dot={{ r: 2 }} />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scenario switcher + scenario info */}
        <div className="flex flex-col gap-3">
          <ScenarioSwitcher activeScenario={activeScenario} onScenarioChange={setScenario} />

          <div className="card">
            <div className="card-header">
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Classification</p>
            </div>
            <div className="p-3">
              <span className={`inline-flex items-center px-2.5 py-1.5 rounded-md border text-xs font-bold ${scenario.classificationColor}`}>
                {scenario.classification}
              </span>
              <div className="mt-3 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Confidence</span>
                  <span className="font-bold text-gray-800">{scenario.confidence}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Severity</span>
                  <SeverityBadge severity={scenario.severity} />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Genuine Event</span>
                  <span className={`font-semibold ${scenario.isGenuineEvent ? 'text-blue-700' : 'text-red-700'}`}>
                    {scenario.isGenuineEvent ? 'Probable Yes' : 'Probable No'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Detection Evidence */}
      <div className="card">
        <div className="card-header">
          <p className="text-sm font-semibold text-gray-800">AI Detection Evidence</p>
          <p className="text-xs text-gray-400 mt-0.5">Evidence from each detection mechanism for current scenario · [SIMULATED]</p>
        </div>
        <div className="p-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {scenario.detectionEngines.map((engine, i) => (
            <div key={i} className="engine-card">
              <EngineStatusDot status={engine.status} />
              <div>
                <p className="text-xs font-bold text-gray-800">{engine.name}</p>
                <p className={`text-[10px] font-semibold mt-0.5 ${
                  engine.status === 'anomaly' ? 'text-red-600' :
                  engine.status === 'inconsistent' || engine.status === 'deviation' ? 'text-amber-600' : 'text-green-600'
                }`}>{engine.label}</p>
                <p className="text-[10px] text-gray-400 mt-1 leading-tight">{engine.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 pb-4 flex justify-center">
          <button
            onClick={() => navigate('live-anomalies', station.id)}
            className="btn-primary"
          >
            Open Full Investigation →
          </button>
        </div>
      </div>
    </div>
  );
}
