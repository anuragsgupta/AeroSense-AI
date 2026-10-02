import React from 'react';
import { AnomalyType, Severity } from '../data/mockData';

export function SeverityBadge({ severity }: { severity: Severity }) {
  const map = {
    critical: 'badge-critical',
    warning: 'badge-warning',
    info: 'badge-info',
    normal: 'badge-normal',
  };
  const labels = {
    critical: 'CRITICAL',
    warning: 'WARNING',
    info: 'INFO',
    normal: 'NORMAL',
  };
  return <span className={map[severity]}>{labels[severity]}</span>;
}

export function StatusDot({ status }: { status: 'healthy' | 'warning' | 'critical' | 'offline' }) {
  const colors = {
    healthy: 'bg-green-500',
    warning: 'bg-amber-500',
    critical: 'bg-red-500',
    offline: 'bg-gray-400',
  };
  return <span className={`inline-block w-2 h-2 rounded-full ${colors[status]}`} />;
}

export function AnomalyTypeBadge({ type }: { type: AnomalyType }) {
  const map: Record<AnomalyType, { label: string; cls: string }> = {
    sensor_spike: { label: 'Sensor Spike', cls: 'badge-critical' },
    frozen_sensor: { label: 'Frozen Sensor', cls: 'badge-warning' },
    sensor_drift: { label: 'Sensor Drift', cls: 'badge-warning' },
    sensor_malfunction: { label: 'Sensor Malfunction', cls: 'badge-critical' },
    genuine_extreme: { label: 'Weather Extreme', cls: 'badge-info' },
    normal: { label: 'Normal', cls: 'badge-normal' },
  };
  const { label, cls } = map[type];
  return <span className={cls}>{label}</span>;
}

export function ConfidenceBar({ value, color }: { value: number; color?: string }) {
  const c = color || (value >= 90 ? 'bg-red-500' : value >= 75 ? 'bg-amber-500' : 'bg-blue-500');
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
        <div className={`h-1.5 rounded-full ${c} transition-all duration-500`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-semibold text-gray-700 w-8 text-right">{value}%</span>
    </div>
  );
}

export function EvidenceLevelBar({ value, label }: { value: number; label: string }) {
  const color =
    value >= 80 ? 'bg-red-500'
    : value >= 60 ? 'bg-amber-500'
    : value >= 30 ? 'bg-blue-500'
    : 'bg-green-500';

  return (
    <div className="flex items-center gap-3">
      <div className="w-48 text-xs text-gray-600 truncate">{label}</div>
      <div className="flex-1 bg-gray-100 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${color} transition-all duration-700`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs font-bold text-gray-700 w-8 text-right">{value}%</span>
    </div>
  );
}

export function ContributionLevel({ level }: { level: 'high' | 'medium' | 'low' | 'none' }) {
  const map = {
    high: 'badge-critical',
    medium: 'badge-warning',
    low: 'badge-info',
    none: 'badge-normal',
  };
  const labels = {
    high: 'HIGH',
    medium: 'MED',
    low: 'LOW',
    none: 'NONE',
  };
  return <span className={`${map[level]} text-[10px]`}>{labels[level]}</span>;
}

export function EngineStatusDot({ status }: { status: 'anomaly' | 'normal' | 'inconsistent' | 'deviation' }) {
  const map = {
    anomaly: 'bg-red-500',
    deviation: 'bg-amber-500',
    inconsistent: 'bg-amber-500',
    normal: 'bg-green-500',
  };
  return (
    <span className={`inline-block w-2.5 h-2.5 rounded-full flex-shrink-0 mt-0.5 ${map[status]}`} />
  );
}

export function DemoTag() {
  return (
    <span className="text-[9px] font-bold text-gray-400 tracking-widest uppercase">
      [SIMULATED]
    </span>
  );
}

export function FusionScoreGauge({ score, isGenuine }: { score: number; isGenuine: boolean }) {
  const color = isGenuine ? '#1d4ed8' : score >= 85 ? '#b91c1c' : score >= 70 ? '#b45309' : '#15803d';
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 136 136">
          <circle cx="68" cy="68" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="10" />
          <circle
            cx="68"
            cy="68"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold" style={{ color }}>{score}%</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-wide font-semibold mt-0.5">Confidence</span>
        </div>
      </div>
    </div>
  );
}
