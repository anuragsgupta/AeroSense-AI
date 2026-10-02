import React, { useState, useEffect } from 'react';
import { Bell, Wifi, User, Menu, RefreshCw } from 'lucide-react';
import { Page } from '../types';

interface TopBarProps {
  currentPage: Page;
  onToggleSidebar: () => void;
}

const pageTitles: Record<Page, string> = {
  'overview': 'Command Center — Overview',
  'stations': 'Station Monitoring',
  'live-anomalies': 'Anomaly Investigation',
  'history': 'Anomaly History',
  'detection': 'Detection Engine',
  'model-insights': 'Model Insights',
  'architecture': 'System Architecture',
  'settings': 'Settings',
};

export default function TopBar({ currentPage, onToggleSidebar }: TopBarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const formatted = time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateStr = time.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <header className="flex-shrink-0 bg-white border-b border-gray-200 px-4 flex items-center h-[52px] gap-3 shadow-sm">
      <button
        onClick={onToggleSidebar}
        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded cursor-pointer"
      >
        <Menu size={16} />
      </button>

      <div className="text-xs text-gray-400 font-medium">{pageTitles[currentPage]}</div>

      <div className="ml-auto flex items-center gap-4">
        {/* Network status */}
        <div className="flex items-center gap-1.5 text-xs text-green-700 font-medium">
          <Wifi size={13} className="text-green-500" />
          <span>Network: Online</span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" />
        </div>

        {/* Last update */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 border-l border-gray-200 pl-4">
          <RefreshCw size={11} className="text-gray-400" />
          <span>Last update: {formatted}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-400">{dateStr}</span>
        </div>

        {/* DEMO badge */}
        <div className="border-l border-gray-200 pl-4">
          <span className="text-[9px] font-bold text-amber-600 tracking-widest uppercase border border-amber-300 bg-amber-50 px-1.5 py-0.5 rounded">
            DEMO • SIMULATED DATA
          </span>
        </div>

        {/* Notifications */}
        <button className="relative text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
          <Bell size={16} />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-white text-[8px] font-bold flex items-center justify-center">
            3
          </span>
        </button>

        {/* User */}
        <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
          <div className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center">
            <User size={13} className="text-white" />
          </div>
          <div className="text-xs">
            <p className="font-semibold text-gray-700 leading-none">Analyst</p>
            <p className="text-gray-400 leading-tight mt-0.5">Meteorological Analyst</p>
          </div>
        </div>
      </div>
    </header>
  );
}
