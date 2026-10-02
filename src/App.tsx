import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Toast from './components/Toast';
import CommandCenter from './pages/CommandCenter';
import StationMonitoring from './pages/StationMonitoring';
import AnomalyInvestigation from './pages/AnomalyInvestigation';
import AnomalyHistory from './pages/AnomalyHistory';
import DetectionInsights from './pages/DetectionInsights';
import SystemArchitecture from './pages/SystemArchitecture';
import { ScenarioKey } from './data/mockData';
import { Page, ToastMessage, AppState } from './types';


function App() {
  const [state, setState] = useState<AppState>({
    currentPage: 'overview',
    selectedStationId: 'AWS-MP-104',
    selectedAnomalyId: 'ANO-2024-001',
    activeScenario: 'spike',
    sidebarOpen: true,
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const navigate = useCallback((page: Page, stationId?: string, anomalyId?: string) => {
    setState(prev => ({
      ...prev,
      currentPage: page,
      selectedStationId: stationId ?? prev.selectedStationId,
      selectedAnomalyId: anomalyId ?? prev.selectedAnomalyId,
    }));
  }, []);

  const setScenario = useCallback((scenario: ScenarioKey) => {
    setState(prev => ({ ...prev, activeScenario: scenario }));
  }, []);

  const showToast = useCallback((message: string, type: ToastMessage['type'] = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toggleSidebar = useCallback(() => {
    setState(prev => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
  }, []);

  const renderPage = () => {
    const props = { navigate, setScenario, showToast, activeScenario: state.activeScenario };

    switch (state.currentPage) {
      case 'overview':
        return <CommandCenter {...props} selectedStationId={state.selectedStationId} />;
      case 'stations':
        return <StationMonitoring {...props} />;
      case 'live-anomalies':
        return (
          <AnomalyInvestigation
            {...props}
            stationId={state.selectedStationId ?? 'AWS-MP-104'}
          />
        );

      case 'history':
        return <AnomalyHistory {...props} />;
      case 'detection':
      case 'model-insights':
        return <DetectionInsights {...props} />;
      case 'architecture':
        return <SystemArchitecture />;
      case 'settings':
        return (
          <div className="page-container flex items-center justify-center">
            <div className="text-center text-gray-400">
              <p className="text-lg font-medium">Settings</p>
              <p className="text-sm mt-1">Configuration panel — coming in production build</p>
            </div>
          </div>
        );
      default:
        return <CommandCenter {...props} selectedStationId={state.selectedStationId} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        currentPage={state.currentPage}
        navigate={navigate}
        isOpen={state.sidebarOpen}
        onToggle={toggleSidebar}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar
          currentPage={state.currentPage}
          onToggleSidebar={toggleSidebar}
        />
        <main className="flex-1 min-h-0 overflow-hidden">
          {renderPage()}
        </main>
      </div>

      {/* Toast notifications */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onDismiss={dismissToast} />
        ))}
      </div>
    </div>
  );
}

export default App;
