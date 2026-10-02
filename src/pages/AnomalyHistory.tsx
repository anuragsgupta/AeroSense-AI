import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, LineChart, Line,
} from 'recharts';
import { Calendar, Filter, Download } from 'lucide-react';
import { historyRecords, anomalyTrendData, ScenarioKey } from '../data/mockData';
import { SeverityBadge, AnomalyTypeBadge } from '../components/UIElements';
import { Page } from '../types';

interface AnomalyHistoryProps {
  navigate: (page: Page, stationId?: string) => void;
  setScenario: (key: ScenarioKey) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  activeScenario: ScenarioKey;
}

const typeOptions = ['All Types', 'sensor_spike', 'frozen_sensor', 'sensor_drift', 'sensor_malfunction', 'genuine_extreme'];
const decisionOptions = ['All Decisions', 'confirmed_fault', 'genuine_event', 'escalated', 'pending'];
const typeLabels: Record<string, string> = {
  sensor_spike: 'Sensor Spike',
  frozen_sensor: 'Frozen Sensor',
  sensor_drift: 'Sensor Drift',
  sensor_malfunction: 'Sensor Malfunction',
  genuine_extreme: 'Weather Extreme',
};
const decisionLabels: Record<string, string> = {
  confirmed_fault: 'Confirmed Fault',
  genuine_event: 'Genuine Event',
  escalated: 'Escalated',
  pending: 'Pending',
};
const decisionColors: Record<string, string> = {
  confirmed_fault: 'text-red-700 bg-red-50 border border-red-200',
  genuine_event: 'text-blue-700 bg-blue-50 border border-blue-200',
  escalated: 'text-amber-700 bg-amber-50 border border-amber-200',
  pending: 'text-gray-600 bg-gray-50 border border-gray-200',
};

export default function AnomalyHistory({ navigate }: AnomalyHistoryProps) {
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [decisionFilter, setDecisionFilter] = useState('All Decisions');
  const [stationSearch, setStationSearch] = useState('');

  const filtered = useMemo(() => {
    return historyRecords.filter(r => {
      const matchType = typeFilter === 'All Types' || r.type === typeFilter;
      const matchDecision = decisionFilter === 'All Decisions' || r.decision === decisionFilter;
      const matchStation = !stationSearch || r.stationId.toLowerCase().includes(stationSearch.toLowerCase());
      return matchType && matchDecision && matchStation;
    });
  }, [typeFilter, decisionFilter, stationSearch]);

  const summaryStats = {
    total: historyRecords.length,
    faults: historyRecords.filter(r => r.decision === 'confirmed_fault').length,
    genuine: historyRecords.filter(r => r.decision === 'genuine_event').length,
    pending: historyRecords.filter(r => r.decision === 'pending').length,
    escalated: historyRecords.filter(r => r.decision === 'escalated').length,
  };

  return (
    <div className="page-container">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900">Anomaly History</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Historical anomaly records and operator decisions · [SIMULATED DEMO DATA]
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-5 gap-3 mb-4">
        {[
          { label: 'Total Anomalies', value: summaryStats.total, color: 'text-gray-900', bg: 'bg-gray-50 border-gray-200' },
          { label: 'Confirmed Faults', value: summaryStats.faults, color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
          { label: 'Genuine Extremes', value: summaryStats.genuine, color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
          { label: 'Escalated', value: summaryStats.escalated, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
          { label: 'Pending Review', value: summaryStats.pending, color: 'text-gray-700', bg: 'bg-gray-50 border-gray-200' },
        ].map(s => (
          <div key={s.label} className={`kpi-card border ${s.bg}`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            <p className="text-[9px] text-gray-400 mt-0.5">[DEMO]</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Trend chart */}
        <div className="col-span-2 card">
          <div className="card-header">
            <p className="text-sm font-semibold text-gray-800">Anomaly Trend — Last 10 Days</p>
            <p className="text-xs text-gray-400 mt-0.5">[SIMULATED DEMO VALUES]</p>
          </div>
          <div className="p-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={anomalyTrendData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#cbd5e1" />
                <YAxis tick={{ fontSize: 10 }} stroke="#cbd5e1" />
                <Tooltip
                  contentStyle={{ fontSize: '11px', borderRadius: '8px' }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="spike" name="Sensor Spike" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} />
                <Bar dataKey="frozen" name="Frozen" stackId="a" fill="#3b82f6" />
                <Bar dataKey="drift" name="Drift" stackId="a" fill="#f59e0b" />
                <Bar dataKey="malfunction" name="Malfunction" stackId="a" fill="#8b5cf6" />
                <Bar dataKey="genuine" name="Genuine" stackId="a" fill="#10b981" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Type breakdown */}
        <div className="card">
          <div className="card-header">
            <p className="text-sm font-semibold text-gray-800">Type Breakdown</p>
            <p className="text-[10px] text-gray-400">[SIMULATED]</p>
          </div>
          <div className="p-4 space-y-3">
            {[
              { type: 'Sensor Spike', count: 4, pct: 33, color: 'bg-red-500' },
              { type: 'Frozen Sensor', count: 3, pct: 25, color: 'bg-blue-500' },
              { type: 'Sensor Drift', count: 3, pct: 25, color: 'bg-amber-500' },
              { type: 'Genuine Extreme', count: 3, pct: 25, color: 'bg-green-500' },
              { type: 'Malfunction', count: 1, pct: 8, color: 'bg-purple-500' },
            ].map(item => (
              <div key={item.type}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">{item.type}</span>
                  <span className="font-semibold text-gray-800">{item.count}</span>
                </div>
                <div className="bg-gray-100 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
            <p className="text-[10px] text-gray-400 pt-2 border-t border-gray-100">
              Avg. confidence: 85.1% [SIMULATED]
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-3">
        <div className="p-3 flex flex-wrap items-center gap-3">
          <Filter size={13} className="text-gray-400" />
          <input
            className="input-base py-1.5 text-xs w-44"
            placeholder="Filter by Station ID..."
            value={stationSearch}
            onChange={e => setStationSearch(e.target.value)}
          />
          <select
            className="select-base py-1.5 text-xs w-40"
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
          >
            {typeOptions.map(t => <option key={t} value={t}>{t === 'All Types' ? t : typeLabels[t] || t}</option>)}
          </select>
          <select
            className="select-base py-1.5 text-xs w-40"
            value={decisionFilter}
            onChange={e => setDecisionFilter(e.target.value)}
          >
            {decisionOptions.map(d => <option key={d} value={d}>{d === 'All Decisions' ? d : decisionLabels[d] || d}</option>)}
          </select>
          <div className="ml-auto text-xs text-gray-400">
            Showing {filtered.length} records
          </div>
        </div>
      </div>

      {/* History table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Station</th>
                <th>Type</th>
                <th>Severity</th>
                <th>Confidence</th>
                <th>Operator Decision</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(record => (
                <tr key={record.id}>
                  <td className="font-mono text-xs text-gray-600">{record.timestamp}</td>
                  <td>
                    <span
                      className="font-mono text-xs font-bold text-blue-700 cursor-pointer hover:underline"
                      onClick={() => navigate('live-anomalies', record.stationId)}
                    >
                      {record.stationId}
                    </span>
                  </td>
                  <td><AnomalyTypeBadge type={record.type} /></td>
                  <td><SeverityBadge severity={record.severity} /></td>
                  <td>
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 bg-gray-100 rounded-full h-1">
                        <div className="h-1 rounded-full bg-blue-500" style={{ width: `${record.confidence}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-gray-700">{record.confidence}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${decisionColors[record.decision]}`}>
                      {decisionLabels[record.decision]}
                    </span>
                  </td>
                  <td className="text-xs text-gray-400 max-w-[180px] truncate" title={record.notes}>
                    {record.notes || '—'}
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
