import React from 'react';
import { Brain, Zap, TrendingUp, Database, ArrowDown, Layers } from 'lucide-react';
import { scenarios, ScenarioKey } from '../data/mockData';
import ScenarioSwitcher from '../components/ScenarioSwitcher';
import { Page } from '../types';

interface DetectionInsightsProps {
  navigate: (page: Page, stationId?: string) => void;
  setScenario: (key: ScenarioKey) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  activeScenario: ScenarioKey;
}

export default function DetectionInsights({ navigate, setScenario, showToast, activeScenario }: DetectionInsightsProps) {
  const scenario = scenarios[activeScenario];

  const engineCards = [
    {
      name: 'Isolation Forest',
      subtitle: 'Point / Statistical Anomaly Detection',
      icon: <Zap size={18} className="text-purple-700" />,
      iconBg: 'bg-purple-100',
      score: scenario.isolationForestScore,
      scoreColor: scenario.isolationForestScore >= 80 ? 'text-red-700' : scenario.isolationForestScore >= 60 ? 'text-amber-700' : 'text-green-700',
      statusLabel: scenario.isolationForestScore >= 80 ? 'ANOMALY DETECTED' : scenario.isolationForestScore >= 50 ? 'MARGINAL' : 'NORMAL',
      statusColor: scenario.isolationForestScore >= 80 ? 'bg-red-100 text-red-700 border-red-200' : scenario.isolationForestScore >= 50 ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-green-100 text-green-700 border-green-200',
      description: 'Tree-based ensemble algorithm that isolates anomalous instances by recursively partitioning the feature space. Anomalies require fewer splits to isolate and receive higher scores.',
      params: [
        { k: 'Estimators', v: '200' },
        { k: 'Contamination', v: 'auto' },
        { k: 'Max features', v: '1.0' },
        { k: 'Training window', v: '90 days' },
      ],
    },
    {
      name: 'LSTM Autoencoder',
      subtitle: 'Temporal Sequence Anomaly Detection',
      icon: <Brain size={18} className="text-blue-700" />,
      iconBg: 'bg-blue-100',
      score: scenario.lstmError,
      scoreColor: scenario.lstmError >= 80 ? 'text-red-700' : scenario.lstmError >= 60 ? 'text-amber-700' : 'text-green-700',
      statusLabel: scenario.lstmError >= 80 ? 'HIGH RECONSTRUCTION ERROR' : scenario.lstmError >= 40 ? 'ELEVATED ERROR' : 'NORMAL',
      statusColor: scenario.lstmError >= 80 ? 'bg-red-100 text-red-700 border-red-200' : scenario.lstmError >= 40 ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-green-100 text-green-700 border-green-200',
      description: 'Encoder-decoder LSTM network trained on normal time-series patterns. Anomalies generate high reconstruction error as the model cannot adequately reproduce unseen abnormal sequences.',
      params: [
        { k: 'Sequence length', v: '24 steps' },
        { k: 'LSTM layers', v: '2' },
        { k: 'Hidden units', v: '64 / 32' },
        { k: 'Threshold (MAE)', v: '0.15 [pilot]' },
      ],
    },
    {
      name: 'Domain / Physics Rules',
      subtitle: 'Atmospheric Consistency Checks',
      icon: <Layers size={18} className="text-green-700" />,
      iconBg: 'bg-green-100',
      score: scenario.domainRulesScore,
      scoreColor: scenario.domainRulesScore >= 80 ? 'text-red-700' : 'text-green-700',
      statusLabel: scenario.domainRulesScore >= 80 ? 'RULES VIOLATED' : 'RULES PASSED',
      statusColor: scenario.domainRulesScore >= 80 ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200',
      description: 'Expert-defined meteorological rules encoding physical constraints: rate-of-change limits, persistence checks, multivariate atmospheric consistency, and sensor range boundaries.',
      params: [
        { k: 'Rate-of-change limit (T)', v: '2.5°C/min' },
        { k: 'Persistence window', v: '15 min' },
        { k: 'Range check', v: '−20 to 60°C' },
        { k: 'Multivariate check', v: 'Enabled' },
      ],
    },
    {
      name: 'Station Baseline',
      subtitle: 'Station-Specific Normal Behaviour',
      icon: <Database size={18} className="text-orange-700" />,
      iconBg: 'bg-orange-100',
      score: scenario.baselineDeviation,
      scoreColor: scenario.baselineDeviation >= 80 ? 'text-red-700' : scenario.baselineDeviation >= 50 ? 'text-amber-700' : 'text-green-700',
      statusLabel: scenario.baselineDeviation >= 80 ? 'SIGNIFICANT DEVIATION' : scenario.baselineDeviation >= 50 ? 'MODERATE DEVIATION' : 'WITHIN BASELINE',
      statusColor: scenario.baselineDeviation >= 80 ? 'bg-red-100 text-red-700 border-red-200' : scenario.baselineDeviation >= 50 ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-green-100 text-green-700 border-green-200',
      description: 'Rolling statistical model of each station\'s expected behaviour, accounting for diurnal, weekly, and seasonal cycles. Each station develops its own learned normal profile over time.',
      params: [
        { k: 'Baseline window', v: '90 days' },
        { k: 'Seasonal decomp.', v: 'STL' },
        { k: 'Deviation metric', v: 'σ (sigma)' },
        { k: 'Update frequency', v: 'Daily' },
      ],
    },
  ];

  return (
    <div className="page-container">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900">Hybrid Detection Engine</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Multi-layer anomaly detection combining statistical, temporal, physical, and baseline approaches · [SIMULATED VALUES]
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Engine pipeline */}
        <div className="col-span-2">
          {/* Fusion result banner */}
          <div className={`mb-4 p-4 rounded-xl border-2 flex items-center justify-between ${
            scenario.isGenuineEvent ? 'bg-blue-50 border-blue-300' :
            scenario.severity === 'critical' ? 'bg-red-50 border-red-300' : 'bg-amber-50 border-amber-300'
          }`}>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Anomaly Fusion Result</p>
              <p className={`text-lg font-bold ${scenario.isGenuineEvent ? 'text-blue-800' : scenario.severity === 'critical' ? 'text-red-800' : 'text-amber-800'}`}>
                {scenario.classification}
              </p>
              <p className="text-xs text-gray-500 mt-1">Scenario: {scenario.label} · [SIMULATED DEMO]</p>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold mb-1 ${scenario.isGenuineEvent ? 'text-blue-700' : scenario.severity === 'critical' ? 'text-red-700' : 'text-amber-700'}`}>
                {scenario.fusionScore}%
              </div>
              <p className="text-xs text-gray-500">Fusion Confidence</p>
              <p className="text-[10px] text-gray-400">[SIMULATED]</p>
            </div>
          </div>

          {/* Engine cards in pipeline */}
          <div className="space-y-2">
            {engineCards.map((engine, i) => (
              <div key={i}>
                <div className="card p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${engine.iconBg}`}>
                      {engine.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <p className="text-sm font-bold text-gray-800">{engine.name}</p>
                          <p className="text-xs text-gray-500">{engine.subtitle}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-xl font-bold ${engine.scoreColor}`}>{engine.score}%</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${engine.statusColor}`}>{engine.statusLabel}</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-600 leading-relaxed mb-3">{engine.description}</p>

                      <div className="grid grid-cols-4 gap-2">
                        {engine.params.map((p, j) => (
                          <div key={j} className="bg-gray-50 border border-gray-100 rounded-md px-2 py-1.5">
                            <p className="text-[9px] text-gray-400 uppercase tracking-wide">{p.k}</p>
                            <p className="text-xs font-semibold text-gray-700 mt-0.5">{p.v}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {i < engineCards.length - 1 && (
                  <div className="flex justify-center py-1">
                    <div className="flex items-center gap-1 text-gray-300">
                      <ArrowDown size={14} />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Arrow to fusion */}
            <div className="flex justify-center py-1">
              <ArrowDown size={14} className="text-gray-300" />
            </div>

            {/* Fusion node */}
            <div className={`p-4 rounded-xl border-2 ${scenario.isGenuineEvent ? 'bg-blue-50 border-blue-400' : scenario.severity === 'critical' ? 'bg-red-50 border-red-400' : 'bg-amber-50 border-amber-400'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Anomaly Fusion & Classification</p>
                  <p className={`text-sm font-bold mt-0.5 ${scenario.isGenuineEvent ? 'text-blue-800' : scenario.severity === 'critical' ? 'text-red-800' : 'text-amber-800'}`}>
                    {scenario.classification}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Weighted evidence combination across all detection mechanisms</p>
                </div>
                <div className="text-center">
                  <p className={`text-3xl font-bold ${scenario.isGenuineEvent ? 'text-blue-700' : scenario.severity === 'critical' ? 'text-red-700' : 'text-amber-700'}`}>
                    {scenario.fusionScore}%
                  </p>
                  <p className="text-[10px] text-gray-400">confidence [SIMULATED]</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex flex-col gap-4">
          <ScenarioSwitcher activeScenario={activeScenario} onScenarioChange={setScenario} />

          {/* Evidence agreement */}
          <div className="card">
            <div className="card-header">
              <p className="text-sm font-semibold text-gray-800">Evidence Agreement</p>
              <p className="text-[10px] text-gray-400">[SIMULATED VALUES]</p>
            </div>
            <div className="p-4 space-y-3">
              {[
                { label: 'Isolation Forest', value: scenario.isolationForestScore, bar: 'bg-purple-500' },
                { label: 'LSTM Autoencoder', value: scenario.lstmError, bar: 'bg-blue-500' },
                { label: 'Domain Rules', value: scenario.domainRulesScore, bar: 'bg-green-500' },
                { label: 'Station Baseline', value: scenario.baselineDeviation, bar: 'bg-orange-500' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{item.label}</span>
                    <span className="font-bold">{item.value}%</span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-2">
                    <div className={`h-2 rounded-full ${item.bar} transition-all duration-700`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Classification guide */}
          <div className="card">
            <div className="card-header">
              <p className="text-sm font-semibold text-gray-800">Classification Types</p>
            </div>
            <div className="p-3 space-y-2">
              {[
                { label: 'Sensor Spike', color: 'badge-critical', desc: 'Sharp isolated deviation' },
                { label: 'Frozen Sensor', color: 'badge-warning', desc: 'Zero-variance persistence' },
                { label: 'Sensor Drift', color: 'badge-warning', desc: 'Gradual monotonic trend' },
                { label: 'Malfunction', color: 'badge-critical', desc: 'Complex sensor failure' },
                { label: 'Genuine Extreme', color: 'badge-info', desc: 'Coherent weather event' },
              ].map(c => (
                <div key={c.label} className="flex items-center gap-2">
                  <span className={`${c.color} flex-shrink-0`}>{c.label}</span>
                  <span className="text-[11px] text-gray-400">{c.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Important disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs font-semibold text-amber-800 mb-1">Production Note</p>
            <p className="text-[11px] text-amber-700 leading-relaxed">
              Demo values shown for illustration. Production fusion weights, detection thresholds, and model hyperparameters require validation against real AWS data during pilot deployment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
