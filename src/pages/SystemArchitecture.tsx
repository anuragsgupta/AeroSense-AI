import React from 'react';
import {
  Database, Cpu, GitBranch, BarChart3, Shield, Globe,
  ArrowDown, ArrowRight, Layers, Server, Code, Package,
  Users, Wind,
} from 'lucide-react';

const techBadges = [
  { name: 'Python 3.11', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { name: 'Pandas', color: 'bg-gray-100 text-gray-700 border-gray-200' },
  { name: 'NumPy', color: 'bg-gray-100 text-gray-700 border-gray-200' },
  { name: 'scikit-learn', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  { name: 'PyTorch', color: 'bg-red-100 text-red-800 border-red-200' },
  { name: 'SHAP', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { name: 'FastAPI', color: 'bg-teal-100 text-teal-800 border-teal-200' },
  { name: 'React + TypeScript', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { name: 'PostgreSQL / TimescaleDB', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  { name: 'Docker', color: 'bg-sky-100 text-sky-800 border-sky-200' },
  { name: 'Redis', color: 'bg-red-100 text-red-700 border-red-200' },
  { name: 'MQTT / REST', color: 'bg-green-100 text-green-800 border-green-200' },
];

interface PipelineNode {
  label: string;
  sub?: string;
  icon: React.ReactNode;
  color: string;
  border: string;
  iconBg: string;
  wide?: boolean;
}

const pipeline: (PipelineNode | 'arrow' | PipelineNode[])[] = [
  {
    label: 'AWS / IMD Data Sources',
    sub: 'Real-time sensor streams + historical archives',
    icon: <Database size={18} />,
    color: 'bg-slate-50',
    border: 'border-slate-300',
    iconBg: 'bg-slate-200',
    wide: true,
  },
  'arrow',
  {
    label: 'Data Ingestion Layer',
    sub: 'MQTT / REST API · Protocol adapters',
    icon: <Globe size={16} />,
    color: 'bg-blue-50',
    border: 'border-blue-300',
    iconBg: 'bg-blue-200',
    wide: true,
  },
  'arrow',
  {
    label: 'Data Quality & Preprocessing',
    sub: 'Range checks · Gap filling · Normalisation',
    icon: <Shield size={16} />,
    color: 'bg-indigo-50',
    border: 'border-indigo-300',
    iconBg: 'bg-indigo-200',
    wide: true,
  },
  'arrow',
  {
    label: 'Feature Engineering',
    sub: 'Rolling stats · Lag features · Rate-of-change · Seasonal features',
    icon: <Cpu size={16} />,
    color: 'bg-violet-50',
    border: 'border-violet-300',
    iconBg: 'bg-violet-200',
    wide: true,
  },
  'arrow',
];

export default function SystemArchitecture() {
  return (
    <div className="page-container">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900">System Architecture</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          AeroSense AI — Modular, API-ready anomaly detection platform for national AWS networks
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Architecture diagram */}
        <div className="col-span-2">
          <div className="card">
            <div className="card-header flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wind size={15} className="text-blue-700" />
                <p className="text-sm font-bold text-gray-800">AeroSense AI — Processing Pipeline</p>
              </div>
              <span className="text-[9px] text-gray-400 uppercase tracking-widest border border-gray-200 px-1.5 py-0.5 rounded">Conceptual Diagram</span>
            </div>
            <div className="p-6">
              {/* Ingestion / preprocessing layer */}
              <div className="space-y-2 mb-3">
                {[
                  { label: 'AWS / IMD Data Sources', sub: 'Real-time sensor streams · Historical data archives', icon: <Database size={16} />, bg: 'bg-slate-50 border-slate-300', ibg: 'bg-slate-200 text-slate-700' },
                  { label: 'Data Ingestion Layer', sub: 'MQTT · REST API · Protocol adapters · Rate limiting', icon: <Globe size={16} />, bg: 'bg-blue-50 border-blue-300', ibg: 'bg-blue-200 text-blue-700' },
                  { label: 'Data Quality & Preprocessing', sub: 'Range checks · Gap filling · Normalisation · Deduplication', icon: <Shield size={16} />, bg: 'bg-indigo-50 border-indigo-300', ibg: 'bg-indigo-200 text-indigo-700' },
                  { label: 'Feature Engineering', sub: 'Rolling statistics · Lag features · Rate-of-change · Seasonal decomposition', icon: <Cpu size={16} />, bg: 'bg-violet-50 border-violet-300', ibg: 'bg-violet-200 text-violet-700' },
                ].map((node, i) => (
                  <React.Fragment key={i}>
                    <div className={`flex items-center gap-3 p-3 rounded-lg border ${node.bg}`}>
                      <div className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${node.ibg}`}>
                        {node.icon}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-800">{node.label}</p>
                        <p className="text-[11px] text-gray-500">{node.sub}</p>
                      </div>
                    </div>
                    {i < 3 && (
                      <div className="flex justify-center">
                        <ArrowDown size={12} className="text-gray-300" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="flex justify-center my-1">
                <ArrowDown size={12} className="text-gray-300" />
              </div>

              {/* Hybrid Detection Engine box */}
              <div className="border-2 border-blue-400 rounded-xl p-4 bg-blue-50/50 mb-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-md bg-blue-700 flex items-center justify-center">
                    <Layers size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-blue-800">Hybrid Detection Engine</p>
                    <p className="text-[11px] text-blue-600">Multi-mechanism parallel anomaly detection</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Isolation Forest', sub: 'Point anomaly', color: 'bg-purple-100 border-purple-300 text-purple-800' },
                    { label: 'LSTM Autoencoder', sub: 'Temporal anomaly', color: 'bg-blue-100 border-blue-400 text-blue-800' },
                    { label: 'Domain Rules', sub: 'Physics check', color: 'bg-green-100 border-green-300 text-green-800' },
                    { label: 'Station Baseline', sub: 'Local normal', color: 'bg-orange-100 border-orange-300 text-orange-800' },
                  ].map((e, i) => (
                    <div key={i} className={`rounded-lg border p-2.5 text-center ${e.color}`}>
                      <p className="text-xs font-bold leading-tight">{e.label}</p>
                      <p className="text-[10px] mt-0.5 opacity-70">{e.sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center my-1">
                <ArrowDown size={12} className="text-gray-300" />
              </div>

              {/* Post-processing layer */}
              <div className="space-y-2">
                {[
                  { label: 'Anomaly Fusion', sub: 'Weighted evidence combination · Threshold evaluation · Multi-model consensus', icon: <GitBranch size={16} />, bg: 'bg-amber-50 border-amber-300', ibg: 'bg-amber-200 text-amber-800' },
                  { label: 'Classification Engine', sub: 'Spike / Frozen / Drift / Malfunction / Genuine Extreme · Confidence scoring', icon: <BarChart3 size={16} />, bg: 'bg-orange-50 border-orange-300', ibg: 'bg-orange-200 text-orange-800' },
                  { label: 'Explainability Layer (SHAP)', sub: 'Feature contributions · Rule evidence · Human-readable reasoning', icon: <Code size={16} />, bg: 'bg-rose-50 border-rose-300', ibg: 'bg-rose-200 text-rose-800' },
                  { label: 'Alert / API Gateway', sub: 'FastAPI · Webhooks · Email/SMS · External system integration', icon: <Server size={16} />, bg: 'bg-teal-50 border-teal-300', ibg: 'bg-teal-200 text-teal-800' },
                ].map((node, i) => (
                  <React.Fragment key={i}>
                    <div className={`flex items-center gap-3 p-3 rounded-lg border ${node.bg}`}>
                      <div className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${node.ibg}`}>
                        {node.icon}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-800">{node.label}</p>
                        <p className="text-[11px] text-gray-500">{node.sub}</p>
                      </div>
                    </div>
                    {i < 3 && (
                      <div className="flex justify-center">
                        <ArrowDown size={12} className="text-gray-300" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="flex justify-center my-1">
                <ArrowDown size={12} className="text-gray-300" />
              </div>

              {/* Final output row */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-lg bg-blue-700 text-white border border-blue-800">
                  <div className="flex items-center gap-2 mb-1">
                    <Package size={14} />
                    <p className="text-xs font-bold">AeroSense Dashboard</p>
                  </div>
                  <p className="text-[11px] opacity-75">React · TypeScript · This UI</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-700 text-white border border-slate-800">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe size={14} />
                    <p className="text-xs font-bold">External Systems</p>
                  </div>
                  <p className="text-[11px] opacity-75">IMD · NWP systems · Emergency services</p>
                </div>
              </div>

              {/* Human in the loop overlay */}
              <div className="mt-4 p-3 bg-green-50 border-2 border-green-300 border-dashed rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center flex-shrink-0">
                    <Users size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-green-800">Human-in-the-Loop Decision Layer</p>
                    <p className="text-[11px] text-green-700">Meteorologists and authorised operators review AI evidence and make final classification decisions. AI assists — does not replace — expert judgment.</p>
                  </div>
                </div>
              </div>

              {/* Edge deployment note */}
              <div className="mt-3 p-2.5 bg-gray-50 border border-gray-200 border-dashed rounded-lg">
                <p className="text-xs font-semibold text-gray-600 mb-0.5">Optional Future: Edge Deployment</p>
                <p className="text-[11px] text-gray-400">Lightweight on-device models for stations with limited connectivity. Subset of detection rules + compressed LSTM for local inference.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex flex-col gap-4">
          {/* Technology stack */}
          <div className="card">
            <div className="card-header">
              <p className="text-sm font-semibold text-gray-800">Technology Stack</p>
              <p className="text-xs text-gray-400 mt-0.5">Planned/intended implementation technologies</p>
            </div>
            <div className="p-4 flex flex-wrap gap-1.5">
              {techBadges.map(t => (
                <span key={t.name} className={`text-xs font-medium px-2 py-1 rounded-full border ${t.color}`}>
                  {t.name}
                </span>
              ))}
            </div>
          </div>

          {/* Design principles */}
          <div className="card">
            <div className="card-header">
              <p className="text-sm font-semibold text-gray-800">Design Principles</p>
            </div>
            <div className="p-4 space-y-3">
              {[
                { title: 'Explainability First', desc: 'Every anomaly flag includes feature evidence and human-readable reasoning — not just a score.' },
                { title: 'Hybrid Evidence', desc: 'No single model. Multiple orthogonal mechanisms must agree before high-confidence classification.' },
                { title: 'Genuine Event Preservation', desc: 'Contextual atmospheric coherence prevents genuine extremes from being dismissed as sensor faults.' },
                { title: 'Human Authority', desc: 'AI assists operators. Operators make final decisions recorded in audit trail.' },
                { title: 'Station-Specific', desc: 'Each AWS has its own baseline model accounting for local geography, elevation, and seasonal patterns.' },
                { title: 'API-Ready', desc: 'Modular FastAPI backend can scale from prototype to national deployment.' },
              ].map(p => (
                <div key={p.title} className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{p.title}</p>
                    <p className="text-[11px] text-gray-500 leading-tight">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Problem statement */}
          <div className="bg-navy-50 bg-blue-900 rounded-lg p-4 text-white">
            <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-2">SIH Problem Statement</p>
            <p className="text-xs font-bold mb-1">SIH26073</p>
            <p className="text-[11px] text-blue-200 leading-relaxed">
              AI/ML-Based Intelligent Anomaly Detection for Automatic Weather Stations
            </p>
            <p className="text-[10px] text-blue-300 mt-2">Domain: Disaster Management · Ministry of Earth Sciences</p>
          </div>
        </div>
      </div>
    </div>
  );
}
