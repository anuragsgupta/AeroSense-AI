import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, ChevronRight } from 'lucide-react';
import { stations, ScenarioKey } from '../data/mockData';
import { StatusDot, SeverityBadge, AnomalyTypeBadge } from '../components/UIElements';
import { Page } from '../types';

interface StationMonitoringProps {
  navigate: (page: Page, stationId?: string) => void;
  setScenario: (key: ScenarioKey) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  activeScenario: ScenarioKey;
}

const regions = ['All Regions', 'North India', 'South India', 'East India', 'West India', 'Central India', 'Northeast India'];
const states = ['All States', 'Madhya Pradesh', 'Rajasthan', 'Odisha', 'Uttar Pradesh', 'Maharashtra', 'Tamil Nadu', 'Karnataka', 'Gujarat', 'West Bengal', 'Delhi', 'Others'];
const statuses = ['All Status', 'Healthy', 'Warning', 'Critical', 'Offline'];

export default function StationMonitoring({ navigate }: StationMonitoringProps) {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All Regions');
  const [status, setStatus] = useState('All Status');
  const [state, setState] = useState('All States');

  const filtered = useMemo(() => {
    return stations.filter(s => {
      const matchSearch = !search || s.id.toLowerCase().includes(search.toLowerCase()) || s.name.toLowerCase().includes(search.toLowerCase()) || s.state.toLowerCase().includes(search.toLowerCase());
      const matchRegion = region === 'All Regions' || s.region === region;
      const matchStatus = status === 'All Status' || s.status === status.toLowerCase();
      const matchState = state === 'All States' || s.state === state;
      return matchSearch && matchRegion && matchStatus && matchState;
    });
  }, [search, region, status, state]);

  const statusColor = (s: string) => ({
    healthy: 'text-green-700',
    warning: 'text-amber-700',
    critical: 'text-red-700',
    offline: 'text-gray-500',
  }[s] || 'text-gray-700');

  const tempColor = (t: number) =>
    t > 45 ? 'text-red-700 font-bold' : t > 40 ? 'text-amber-700 font-semibold' : t > 35 ? 'text-orange-700' : 'text-gray-700';

  return (
    <div className="page-container">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900">Station Monitoring</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Real-time sensor data from {stations.length} stations · [SIMULATED DEMO DATA]
        </p>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="p-3 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="input-base pl-8 py-1.5 text-xs"
              placeholder="Search station ID, name, state..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={12} className="text-gray-400" />
          </div>

          <select className="select-base py-1.5 text-xs w-36" value={region} onChange={e => setRegion(e.target.value)}>
            {regions.map(r => <option key={r}>{r}</option>)}
          </select>

          <select className="select-base py-1.5 text-xs w-36" value={state} onChange={e => setState(e.target.value)}>
            {states.map(s => <option key={s}>{s}</option>)}
          </select>

          <select className="select-base py-1.5 text-xs w-32" value={status} onChange={e => setStatus(e.target.value)}>
            {statuses.map(s => <option key={s}>{s}</option>)}
          </select>

          <div className="ml-auto text-xs text-gray-400">
            Showing {filtered.length} of {stations.length} stations
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="cursor-pointer">
                  <div className="flex items-center gap-1">Station ID <ArrowUpDown size={10} /></div>
                </th>
                <th>Location</th>
                <th>Temperature</th>
                <th>Pressure</th>
                <th>Humidity</th>
                <th>Status</th>
                <th>Last Update</th>
                <th>Anomalies</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(station => (
                <tr
                  key={station.id}
                  className="cursor-pointer"
                  onClick={() => navigate('live-anomalies', station.id)}
                >
                  <td>
                    <div className="flex items-center gap-2">
                      <StatusDot status={station.status} />
                      <span className="font-mono text-xs font-bold text-blue-700">{station.id}</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{station.name}</p>
                      <p className="text-[11px] text-gray-400">{station.state} · {station.region}</p>
                    </div>
                  </td>
                  <td>
                    <span className={`text-xs font-bold ${tempColor(station.temperature)}`}>
                      {station.temperature.toFixed(1)}°C
                    </span>
                  </td>
                  <td className="text-xs text-gray-700">{station.pressure} hPa</td>
                  <td className="text-xs text-gray-700">{station.humidity}%</td>
                  <td>
                    <div className="flex items-center gap-1.5">
                      <StatusDot status={station.status} />
                      <span className={`text-xs font-semibold capitalize ${statusColor(station.status)}`}>
                        {station.status}
                      </span>
                    </div>
                  </td>
                  <td className="font-mono text-xs text-gray-500">{station.lastUpdate}</td>
                  <td>
                    {station.anomalyCount > 0 ? (
                      <span className="badge-critical">{station.anomalyCount} active</span>
                    ) : (
                      <span className="badge-normal">None</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={e => { e.stopPropagation(); navigate('live-anomalies', station.id); }}
                      className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-0.5 cursor-pointer"
                    >
                      Detail <ChevronRight size={11} />
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
