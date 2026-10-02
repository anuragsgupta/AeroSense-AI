import React from 'react';
import { stations, Station } from '../data/mockData';

interface IndiaMapProps {
  onStationClick: (stationId: string) => void;
  selectedStationId?: string | null;
}

// Approximate India bounding box: lat 8.4 to 37.6, lng 68.1 to 97.4
// Map to SVG 400x440 canvas
function projectStation(lat: number, lng: number): [number, number] {
  const minLat = 7.5, maxLat = 37.8;
  const minLng = 67.0, maxLng = 98.0;
  const x = ((lng - minLng) / (maxLng - minLng)) * 380 + 10;
  const y = ((maxLat - lat) / (maxLat - minLat)) * 420 + 10;
  return [x, y];
}

const statusColors: Record<string, string> = {
  healthy: '#16a34a',
  warning: '#d97706',
  critical: '#dc2626',
  offline: '#9ca3af',
};

// Simplified India outline path (SVG path approximation)
const INDIA_PATH = `
  M 170 10
  L 200 18 L 230 15 L 265 20 L 285 35 L 295 55 L 310 50 L 340 60 L 370 55 L 385 70
  L 380 90 L 370 110 L 375 130 L 365 150 L 350 165 L 345 185
  L 355 200 L 355 220 L 340 240 L 330 260 L 320 280 L 300 300
  L 280 320 L 265 345 L 250 360 L 240 380 L 230 405 L 220 425
  L 210 420 L 205 395 L 195 375 L 185 355 L 175 330 L 160 310
  L 145 290 L 135 270 L 125 250 L 115 230 L 105 210 L 95 190
  L 90 170 L 80 150 L 70 130 L 65 110 L 70 90 L 75 70
  L 90 55 L 105 45 L 120 30 L 145 20 Z
`;

// Second part for peninsular extension
const INDIA_PATH2 = `
  M 95 190 L 85 200 L 80 220 L 90 240 L 105 250
`;

export default function IndiaMap({ onStationClick, selectedStationId }: IndiaMapProps) {
  return (
    <div className="relative bg-gradient-to-b from-slate-50 to-blue-50/30 border border-gray-200 rounded-xl overflow-hidden">
      <div className="absolute top-2 left-2 text-[9px] text-gray-400 font-semibold tracking-wider uppercase">
        AWS Network — Schematic Representation
      </div>
      <svg
        viewBox="0 0 400 440"
        className="w-full"
        style={{ maxHeight: '360px' }}
      >
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="440" fill="url(#grid)" />

        {/* India outline (stylized) */}
        <path
          d={INDIA_PATH}
          fill="#dbeafe"
          stroke="#93c5fd"
          strokeWidth="1.5"
          opacity="0.7"
        />

        {/* State boundary suggestions */}
        <line x1="220" y1="10" x2="220" y2="440" stroke="#bfdbfe" strokeWidth="0.5" strokeDasharray="4,4" />
        <line x1="10" y1="220" x2="390" y2="220" stroke="#bfdbfe" strokeWidth="0.5" strokeDasharray="4,4" />
        <line x1="10" y1="160" x2="390" y2="160" stroke="#bfdbfe" strokeWidth="0.5" strokeDasharray="4,4" />
        <line x1="10" y1="310" x2="390" y2="310" stroke="#bfdbfe" strokeWidth="0.5" strokeDasharray="4,4" />

        {/* Region labels */}
        <text x="220" y="60" textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="monospace">NORTH</text>
        <text x="310" y="200" textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="monospace">EAST</text>
        <text x="100" y="200" textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="monospace">WEST</text>
        <text x="220" y="360" textAnchor="middle" fontSize="7" fill="#94a3b8" fontFamily="monospace">SOUTH</text>

        {/* Station markers */}
        {stations.map(station => {
          const [x, y] = projectStation(station.lat, station.lng);
          const color = statusColors[station.status];
          const isSelected = station.id === selectedStationId;
          const isCritical = station.status === 'critical';
          const isWarning = station.status === 'warning';

          return (
            <g key={station.id} onClick={() => onStationClick(station.id)} className="cursor-pointer">
              {/* Pulse ring for critical/warning */}
              {(isCritical || isWarning) && (
                <circle
                  cx={x}
                  cy={y}
                  r="10"
                  fill={color}
                  opacity="0.15"
                  className={isCritical ? "animate-ping" : ""}
                />
              )}

              {/* Selection ring */}
              {isSelected && (
                <circle cx={x} cy={y} r="9" fill="none" stroke="#1d4ed8" strokeWidth="2" opacity="0.8" />
              )}

              {/* Station dot */}
              <circle
                cx={x}
                cy={y}
                r={isSelected ? 5 : 4}
                fill={color}
                stroke="white"
                strokeWidth="1.5"
                opacity="0.95"
              />

              {/* Tooltip on hover via title */}
              <title>{station.id} — {station.name} ({station.status.toUpperCase()})</title>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-2 right-2 flex flex-col gap-1 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-md px-2.5 py-2 shadow-sm">
        {Object.entries(statusColors).map(([status, color]) => (
          <div key={status} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[9px] text-gray-600 capitalize font-medium">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
