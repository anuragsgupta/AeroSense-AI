import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceArea, BarChart, Bar, Cell,
} from 'recharts';
import {
  AlertTriangle, CheckCircle, ShieldAlert, Microscope,
  ArrowRight, MessageSquare, Info, ChevronDown, ChevronUp,
  Thermometer, Gauge, Droplets, Wind,
} from 'lucide-react';
import { stations, scenarios, ScenarioKey } from '../data/mockData';
import {
  SeverityBadge, FusionScoreGauge, EvidenceLevelBar,
  EngineStatusDot, ContributionLevel,
} from '../components/UIElements';
import ScenarioSwitcher from '../components/ScenarioSwitcher';
import { Page } from '../types';

interface AnomalyInvestigationProps {
  navigate: (page: Page, stationId?: string) => void;
  setScenario: (key: ScenarioKey) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  activeScenario: ScenarioKey;
  stationId: string;
}

type DecisionType = 'confirmed_fault' | 'genuine_event' | 'escalated' | null;

const contributionBarColors = {
  high: '#dc2626',
  medium: '#d97706',
  low: '#3b82f6',
  none: '#16a34a',
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2.5 text-xs">
      <p className="font-bold text-gray-700 mb-1">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-gray-600">{p.name}:</span>
          <span className="font-semibold">{p.value?.toFixed(2)}{p.name === 'Temperature' ? '°C' : p.name === 'Pressure' ? ' hPa' : '%'}</span>
        </div>
      ))}
    </div>
  );
};

export default function AnomalyInvestigation({
  navigate, setScenario, showToast, activeScenario, stationId,
}: AnomalyInvestigationProps) {
  const station = stations.find(s => s.id === stationId) ?? stations[0];
  const scenario = scenarios[activeScenario];

  const [decision, setDecision] = useState<DecisionType>(null);
  const [notes, setNotes] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingDecision, setPendingDecision] = useState<DecisionType>(null);
  const [evidenceExpanded, setEvidenceExpanded] = useState(true);

  const anomalyPoints = scenario.timeSeries.filter(p => p.isAnomaly);
  const anomalyStart = anomalyPoints[0]?.time;
  const anomalyEnd = anomalyPoints[anomalyPoints.length - 1]?.time;

  const handleDecisionClick = (d: DecisionType) => {
    setPendingDecision(d);
    setShowConfirmModal(true);
  };

  const confirmDecision = () => {
    setDecision(pendingDecision);
    setShowConfirmModal(false);
    const messages: Record<string, string> = {
      confirmed_fault: 'Sensor fault confirmed. Decision recorded for audit trail.',
      genuine_event: 'Marked as genuine weather event. Logged for meteorological review.',
      escalated: 'Anomaly escalated for further investigation. Supervisor notified.',
    };
    showToast(messages[pendingDecision!] || 'Decision recorded.', 'success');
    setPendingDecision(null);
  };

  // Chart data with normalized pressure to align visually
  const chartData = scenario.timeSeries.map(p => ({
    ...p,
    pressureNorm: p.pressure - 990, // normalize for visual alignment
  }));

  const evidenceBarData = scenario.evidenceContributions.map(e => ({
    name: e.label,
    value: e.value,
    level: e.contribution,
  }));

  const decisionConfig: Record<NonNullable<DecisionType>, { label: string; color: string; icon: React.ReactNode }> = {
    confirmed_fault: { label: 'CONFIRMED — Sensor Fault', color: 'text-red-700', icon: <AlertTriangle size={14} /> },
    genuine_event: { label: 'RECORDED — Genuine Weather Event', color: 'text-blue-700', icon: <CheckCircle size={14} /> },
    escalated: { label: 'ESCALATED — Pending Investigation', color: 'text-amber-700', icon: <ShieldAlert size={14} /> },
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Microscope size={18} className="text-gray-600" />
            <h1 className="text-xl font-bold text-gray-900">Anomaly Investigation</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-mono font-semibold text-blue-700">{station.id}</span>
            <span>·</span>
            <span>{station.name}</span>
            <span>·</span>
            <span>{station.state}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {decision && (
            <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md border bg-gray-50 ${decisionConfig[decision].color}`}>
              {decisionConfig[decision].icon}
              {decisionConfig[decision].label}
            </div>
          )}
          <SeverityBadge severity={scenario.severity} />
        </div>
      </div>

      {/* Classification banner */}
      <div className={`mb-4 p-3 rounded-xl border-2 flex items-center justify-between ${
        scenario.isGenuineEvent
          ? 'bg-blue-50 border-blue-300'
          : scenario.severity === 'critical'
          ? 'bg-red-50 border-red-300'
          : 'bg-amber-50 border-amber-300'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            scenario.isGenuineEvent ? 'bg-blue-100' : scenario.severity === 'critical' ? 'bg-red-100' : 'bg-amber-100'
          }`}>
            {scenario.isGenuineEvent
              ? <Wind size={20} className="text-blue-700" />
              : scenario.severity === 'critical'
              ? <AlertTriangle size={20} className="text-red-700" />
              : <AlertTriangle size={20} className="text-amber-700" />
            }
          </div>
          <div>
            <p className={`text-base font-bold ${scenario.isGenuineEvent ? 'text-blue-800' : scenario.severity === 'critical' ? 'text-red-800' : 'text-amber-800'}`}>
              {scenario.classification}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Scenario: {scenario.label} · [SIMULATED DEMO DATA]
            </p>
          </div>
        </div>
        {scenario.isGenuineEvent && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-100 border border-blue-300 px-2.5 py-1.5 rounded-lg">
            <CheckCircle size={13} />
            Atmospheric Context: COHERENT
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Main investigation area */}
        <div className="col-span-2 flex flex-col gap-4">
          {/* Fusion score + explanation */}
          <div className="card">
            <div className="card-header">
              <p className="text-sm font-semibold text-gray-800">Anomaly Score & Explanation</p>
              <p className="text-xs text-gray-400">[SIMULATED CONFIDENCE VALUES]</p>
            </div>
            <div className="p-4 flex gap-6">
              <FusionScoreGauge score={scenario.fusionScore} isGenuine={scenario.isGenuineEvent} />

              <div className="flex-1">
                <div className="flex items-start gap-2 mb-3">
                  <Info size={13} className="text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Why was this flagged?</p>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed border-l-2 border-blue-200 pl-3">
                  {scenario.explanation}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[10px] text-gray-400">Fusion confidence:</span>
                  <span className={`text-xs font-bold ${scenario.isGenuineEvent ? 'text-blue-700' : scenario.severity === 'critical' ? 'text-red-700' : 'text-amber-700'}`}>
                    {scenario.fusionScore}% [SIMULATED]
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Time series */}
          <div className="card">
            <div className="card-header flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-800">Sensor Readings Timeline</p>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />Temperature</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" />Pressure</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-teal-500" />Humidity</span>
              </div>
            </div>
            <div className="p-4">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="#cbd5e1" />
                  <YAxis tick={{ fontSize: 10 }} stroke="#cbd5e1" />
                  <Tooltip content={<CustomTooltip />} />

                  {anomalyStart && anomalyEnd && (
                    <ReferenceArea
                      x1={anomalyStart}
                      x2={anomalyEnd}
                      fill={scenario.isGenuineEvent ? '#dbeafe' : '#fee2e2'}
                      fillOpacity={0.5}
                      stroke={scenario.isGenuineEvent ? '#93c5fd' : '#fca5a5'}
                      strokeDasharray="4 4"
                      label={{ value: scenario.isGenuineEvent ? '▲ ELEVATED' : '⚠ ANOMALY', position: 'insideTop', fontSize: 9, fill: scenario.isGenuineEvent ? '#1d4ed8' : '#dc2626', fontWeight: 'bold' }}
                    />
                  )}

                  <Line
                    type="monotone"
                    dataKey="temperature"
                    name="Temperature"
                    stroke="#ef4444"
                    strokeWidth={2.5}
                    dot={(props: any) => {
                      if (props.payload?.isAnomaly) {
                        return <circle key={props.key} cx={props.cx} cy={props.cy} r={5} fill={scenario.isGenuineEvent ? '#f97316' : '#dc2626'} stroke="white" strokeWidth={2} />;
                      }
                      return <circle key={props.key} cx={props.cx} cy={props.cy} r={2.5} fill="#ef4444" />;
                    }}
                  />
                  <Line type="monotone" dataKey="pressure" name="Pressure" stroke="#3b82f6" strokeWidth={1.5} dot={{ r: 2 }} strokeDasharray={scenario.isGenuineEvent ? "0" : "5 5"} />
                  <Line type="monotone" dataKey="humidity" name="Humidity" stroke="#14b8a6" strokeWidth={1.5} dot={{ r: 2 }} strokeDasharray={scenario.isGenuineEvent ? "0" : "5 5"} />
                </LineChart>
              </ResponsiveContainer>
              {!scenario.isGenuineEvent && (
                <p className="text-[10px] text-center text-gray-400 mt-1">
                  Dashed lines (Pressure/Humidity) confirm stability — does not support a genuine atmospheric event
                </p>
              )}
              {scenario.isGenuineEvent && (
                <p className="text-[10px] text-center text-blue-600 mt-1 font-medium">
                  All three parameters evolve coherently — atmospheric context supports genuine event classification
                </p>
              )}
            </div>
          </div>

          {/* Evidence contributions */}
          <div className="card">
            <div
              className="card-header flex items-center justify-between cursor-pointer"
              onClick={() => setEvidenceExpanded(!evidenceExpanded)}
            >
              <div>
                <p className="text-sm font-semibold text-gray-800">Evidence Contributions</p>
                <p className="text-xs text-gray-400 mt-0.5">Feature-level anomaly evidence from all detection mechanisms · [SIMULATED]</p>
              </div>
              {evidenceExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </div>
            {evidenceExpanded && (
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {scenario.evidenceContributions.map((e, i) => (
                    <div key={i} className="evidence-card">
                      <div className="flex items-start justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-gray-400">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <p className="text-xs font-bold text-gray-800 uppercase tracking-wide">{e.label}</p>
                        </div>
                        <ContributionLevel level={e.contribution} />
                      </div>
                      <p className="text-[11px] text-gray-500 leading-tight">{e.description}</p>
                      <div className="mt-2 bg-gray-200 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full transition-all duration-700"
                          style={{ width: `${e.value}%`, backgroundColor: contributionBarColors[e.contribution] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Horizontal bar chart */}
                <div className="mt-2 pt-3 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-600 mb-3">Evidence Weight Comparison</p>
                  <div className="space-y-2.5">
                    {scenario.evidenceContributions.map((e, i) => (
                      <EvidenceLevelBar key={i} value={e.value} label={e.label} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right panel */}
        <div className="flex flex-col gap-4">
          {/* Scenario switcher */}
          <ScenarioSwitcher activeScenario={activeScenario} onScenarioChange={setScenario} />

          {/* Detection engines */}
          <div className="card">
            <div className="card-header">
              <p className="text-sm font-semibold text-gray-800">Detection Engines</p>
              <p className="text-xs text-gray-400 mt-0.5">[SIMULATED VALUES]</p>
            </div>
            <div className="p-3 space-y-2.5">
              {scenario.detectionEngines.map((engine, i) => (
                <div key={i} className="flex items-start gap-2.5 p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                  <EngineStatusDot status={engine.status} />
                  <div>
                    <p className="text-xs font-bold text-gray-800">{engine.name}</p>
                    <p className={`text-[11px] font-semibold mt-0.5 ${
                      engine.status === 'anomaly' ? 'text-red-600' :
                      engine.status === 'inconsistent' || engine.status === 'deviation' ? 'text-amber-600' :
                      'text-green-600'
                    }`}>{engine.label}</p>
                    <p className="text-[10px] text-gray-400 mt-1 leading-tight">{engine.detail}</p>
                  </div>
                </div>
              ))}

              {/* Fusion arrow */}
              <div className="flex flex-col items-center py-1">
                <div className="flex items-center gap-1.5 w-full">
                  <div className="flex-1 h-px bg-gray-200" />
                  <ArrowRight size={12} className="text-gray-400" />
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
              </div>

              <div className={`p-2.5 rounded-lg border-2 ${
                scenario.isGenuineEvent
                  ? 'bg-blue-50 border-blue-300'
                  : scenario.severity === 'critical'
                  ? 'bg-red-50 border-red-300'
                  : 'bg-amber-50 border-amber-300'
              }`}>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Fusion Result</p>
                <p className={`text-xs font-bold mt-1 ${
                  scenario.isGenuineEvent ? 'text-blue-800' :
                  scenario.severity === 'critical' ? 'text-red-800' : 'text-amber-800'
                }`}>{scenario.classification}</p>
                <p className="text-[10px] text-gray-400 mt-1">Confidence: {scenario.fusionScore}% [SIMULATED]</p>
              </div>
            </div>
          </div>

          {/* Evidence agreement bars */}
          <div className="card">
            <div className="card-header">
              <p className="text-xs font-semibold text-gray-700">Evidence Agreement</p>
              <p className="text-[10px] text-gray-400">[SIMULATED]</p>
            </div>
            <div className="p-3 space-y-2">
              {[
                { label: 'Isolation Forest', value: scenario.isolationForestScore },
                { label: 'LSTM Autoencoder', value: scenario.lstmError },
                { label: 'Domain Rules', value: scenario.domainRulesScore },
                { label: 'Station Baseline', value: scenario.baselineDeviation },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-[10px] text-gray-600 mb-0.5">
                    <span>{item.label}</span>
                    <span className="font-bold">{item.value}%</span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-700 ${
                        item.value >= 80 ? 'bg-red-500' :
                        item.value >= 60 ? 'bg-amber-500' :
                        item.value >= 30 ? 'bg-blue-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
              <p className="text-[9px] text-gray-400 mt-2 italic">
                Demo values. Production thresholds require calibration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* HUMAN-IN-THE-LOOP REVIEW */}
      <div className={`card border-2 ${decision ? 'border-green-300 bg-green-50/30' : 'border-blue-200 bg-blue-50/20'}`}>
        <div className="card-header border-blue-200">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">H</span>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">Operator Review — Human-in-the-Loop</p>
              <p className="text-xs text-gray-500 mt-0.5">
                AI provides evidence and classification. Final decision authority rests with the authorised operator.
              </p>
            </div>
          </div>
        </div>
        <div className="p-4">
          {decision ? (
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
              <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-green-800">{decisionConfig[decision].label}</p>
                <p className="text-xs text-green-600 mt-0.5">Decision recorded for audit trail. Timestamp: {new Date().toLocaleTimeString()}</p>
                {notes && <p className="text-xs text-green-700 mt-1 italic">"{notes}"</p>}
              </div>
              <button
                onClick={() => setDecision(null)}
                className="ml-auto text-xs text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                Revise
              </button>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={() => handleDecisionClick('confirmed_fault')}
              disabled={!!decision}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all cursor-pointer ${
                decision === 'confirmed_fault'
                  ? 'bg-red-100 border-red-400 text-red-800'
                  : 'bg-white border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              <AlertTriangle size={15} />
              Confirm Sensor Fault
            </button>
            <button
              onClick={() => handleDecisionClick('genuine_event')}
              disabled={!!decision}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all cursor-pointer ${
                decision === 'genuine_event'
                  ? 'bg-blue-100 border-blue-400 text-blue-800'
                  : 'bg-white border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              <CheckCircle size={15} />
              Mark as Genuine Weather Event
            </button>
            <button
              onClick={() => handleDecisionClick('escalated')}
              disabled={!!decision}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all cursor-pointer ${
                decision === 'escalated'
                  ? 'bg-amber-100 border-amber-400 text-amber-800'
                  : 'bg-white border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              <ShieldAlert size={15} />
              Escalate for Investigation
            </button>
          </div>

          <div className="flex items-start gap-2">
            <MessageSquare size={14} className="text-gray-400 mt-2 flex-shrink-0" />
            <textarea
              className="flex-1 input-base text-xs py-2 resize-none"
              rows={2}
              placeholder="Operator remarks (optional) — e.g. field conditions, cross-reference with nearby stations, NWP model output..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
            <Info size={11} />
            <span>All operator decisions are timestamped and stored in the audit trail. AI classification does not override human judgment.</span>
          </div>
        </div>
      </div>

      {/* Confirmation modal */}
      {showConfirmModal && pendingDecision && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 max-w-sm w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <CheckCircle size={20} className="text-blue-700" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Confirm Operator Decision</p>
                <p className="text-xs text-gray-500 mt-0.5">This will be recorded in the audit trail</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-200">
              <p className="text-xs text-gray-600">Station: <span className="font-semibold font-mono">{station.id}</span></p>
              <p className="text-xs text-gray-600 mt-1">Decision: <span className="font-semibold capitalize">
                {pendingDecision === 'confirmed_fault' ? 'Confirm Sensor Fault' :
                 pendingDecision === 'genuine_event' ? 'Mark as Genuine Weather Event' :
                 'Escalate for Investigation'}
              </span></p>
              <p className="text-xs text-gray-600 mt-1">Classification: <span className="font-semibold">{scenario.classification}</span></p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => { setShowConfirmModal(false); setPendingDecision(null); }}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button onClick={confirmDecision} className="btn-primary flex-1">
                Confirm & Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
