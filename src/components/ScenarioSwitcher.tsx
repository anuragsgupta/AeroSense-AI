import React from 'react';
import { scenarios, ScenarioKey } from '../data/mockData';
import { Zap, Snowflake, TrendingUp, Sun } from 'lucide-react';

interface ScenarioSwitcherProps {
  activeScenario: ScenarioKey;
  onScenarioChange: (key: ScenarioKey) => void;
}

const scenarioIcons: Record<ScenarioKey, React.ReactNode> = {
  spike: <Zap size={13} />,
  frozen: <Snowflake size={13} />,
  drift: <TrendingUp size={13} />,
  heatwave: <Sun size={13} />,
};

const scenarioColors: Record<ScenarioKey, string> = {
  spike: 'border-red-400 bg-red-50 text-red-700',
  frozen: 'border-blue-400 bg-blue-50 text-blue-700',
  drift: 'border-amber-400 bg-amber-50 text-amber-700',
  heatwave: 'border-orange-400 bg-orange-50 text-orange-700',
};

const activeColors: Record<ScenarioKey, string> = {
  spike: 'border-red-500 bg-red-100 text-red-800 shadow-md shadow-red-100',
  frozen: 'border-blue-500 bg-blue-100 text-blue-800 shadow-md shadow-blue-100',
  drift: 'border-amber-500 bg-amber-100 text-amber-800 shadow-md shadow-amber-100',
  heatwave: 'border-orange-500 bg-orange-100 text-orange-800 shadow-md shadow-orange-100',
};

export default function ScenarioSwitcher({ activeScenario, onScenarioChange }: ScenarioSwitcherProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
      <div className="flex items-center justify-between mb-2.5">
        <div>
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Demo Scenarios</p>
          <p className="text-[10px] text-gray-400 mt-0.5">Select anomaly pattern to simulate</p>
        </div>
        <span className="text-[9px] font-bold text-amber-600 tracking-widest uppercase border border-amber-300 bg-amber-50 px-1.5 py-0.5 rounded">
          SIMULATED
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {(Object.keys(scenarios) as ScenarioKey[]).map(key => {
          const scenario = scenarios[key];
          const isActive = key === activeScenario;
          return (
            <button
              key={key}
              onClick={() => onScenarioChange(key)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-md border text-xs font-semibold transition-all duration-150 cursor-pointer text-left ${
                isActive ? activeColors[key] : `${scenarioColors[key]} opacity-70 hover:opacity-100`
              }`}
            >
              <span className="flex-shrink-0">{scenarioIcons[key]}</span>
              <span className="leading-tight">{scenario.label}</span>
              {isActive && (
                <span className="ml-auto flex-shrink-0 w-1.5 h-1.5 rounded-full bg-current" />
              )}
            </button>
          );
        })}
      </div>
      {activeScenario === 'heatwave' && (
        <div className="mt-2.5 p-2 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-[10px] text-blue-700 font-medium">
            ✓ Contextually consistent — atmospheric coherence maintained. This scenario demonstrates genuine event identification.
          </p>
        </div>
      )}
    </div>
  );
}
