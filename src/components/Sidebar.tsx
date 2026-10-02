import React from 'react';
import {
  LayoutDashboard,
  Radio,
  AlertTriangle,
  Clock,
  Brain,
  BarChart3,
  Network,
  Settings,
  ChevronLeft,
  ChevronRight,
  Wind,
} from 'lucide-react';
import { Page } from '../types';

interface SidebarProps {
  currentPage: Page;
  navigate: (page: Page) => void;
  isOpen: boolean;
  onToggle: () => void;
}

interface NavItem {
  id: Page;
  label: string;
  icon: React.ReactNode;
  group: string;
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={15} />, group: 'COMMAND CENTER' },
  { id: 'stations', label: 'Stations', icon: <Radio size={15} />, group: 'COMMAND CENTER' },
  { id: 'live-anomalies', label: 'Live Anomalies', icon: <AlertTriangle size={15} />, group: 'COMMAND CENTER' },
  { id: 'history', label: 'History', icon: <Clock size={15} />, group: 'COMMAND CENTER' },
  { id: 'detection', label: 'Detection Engine', icon: <Brain size={15} />, group: 'INTELLIGENCE' },
  { id: 'model-insights', label: 'Model Insights', icon: <BarChart3 size={15} />, group: 'INTELLIGENCE' },
  { id: 'architecture', label: 'Architecture', icon: <Network size={15} />, group: 'SYSTEM' },
  { id: 'settings', label: 'Settings', icon: <Settings size={15} />, group: 'SYSTEM' },
];

const groups = ['COMMAND CENTER', 'INTELLIGENCE', 'SYSTEM'];

export default function Sidebar({ currentPage, navigate, isOpen, onToggle }: SidebarProps) {
  return (
    <aside
      className={`flex-shrink-0 bg-gradient-to-b from-[#0f1e3a] to-[#0a1628] border-r border-blue-900/40 flex flex-col transition-all duration-200 ${
        isOpen ? 'w-56' : 'w-14'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 py-4 border-b border-blue-900/40 min-h-[60px]">
        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
          <Wind size={16} className="text-white" />
        </div>
        {isOpen && (
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-tight tracking-tight">AeroSense AI</p>
            <p className="text-blue-300/70 text-[9px] leading-tight mt-0.5 truncate">Anomaly Intelligence</p>
          </div>
        )}
        <button
          onClick={onToggle}
          className="ml-auto text-blue-300/50 hover:text-blue-200 transition-colors cursor-pointer flex-shrink-0"
        >
          {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {groups.map(group => {
          const items = navItems.filter(item => item.group === group);
          return (
            <div key={group} className="mb-1">
              {isOpen && (
                <p className="px-3 py-1.5 text-[9px] font-bold text-blue-400/50 uppercase tracking-widest">
                  {group}
                </p>
              )}
              {!isOpen && <div className="border-t border-blue-900/30 my-1.5 mx-2" />}
              {items.map(item => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  title={!isOpen ? item.label : undefined}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium transition-all duration-150 cursor-pointer ${
                    currentPage === item.id
                      ? 'bg-blue-600/80 text-white shadow-sm'
                      : 'text-blue-200/70 hover:bg-blue-800/40 hover:text-blue-100'
                  } ${isOpen ? 'rounded-none' : 'justify-center rounded-md mx-1'}`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {isOpen && <span className="truncate">{item.label}</span>}
                  {isOpen && item.id === 'live-anomalies' && (
                    <span className="ml-auto flex-shrink-0 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                      3
                    </span>
                  )}
                </button>
              ))}
            </div>
          );
        })}
      </nav>

      {/* Bottom version */}
      {isOpen && (
        <div className="px-3 py-3 border-t border-blue-900/40">
          <p className="text-[9px] text-blue-400/40 uppercase tracking-widest leading-relaxed">
            SIH 2026 • Prototype v0.9<br />
            <span className="text-yellow-400/60">SIMULATED DEMO DATA</span>
          </p>
        </div>
      )}
    </aside>
  );
}
