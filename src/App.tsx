import { useState } from 'react';
import { NavTab, Hotspot, AppSettings } from './types';
import { Header } from './components/layout/Header';
import { LeftSidebar } from './components/layout/LeftSidebar';
import { Footer } from './components/layout/Footer';
import { DashboardView } from './components/dashboard/DashboardView';
import { HeatmapView } from './components/heatmap/HeatmapView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { AiRecommendationsView } from './components/ai-recommendations/AiRecommendationsView';
import { ScenarioSimulatorView } from './components/scenario-simulator/ScenarioSimulatorView';
import { ReportsView } from './components/reports/ReportsView';
import { AlertsView } from './components/alerts/AlertsView';
import { SettingsView } from './components/settings/SettingsView';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [selectedCity, setSelectedCity] = useState<string>('Delhi');
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>('delhi');
  const [settings, setSettings] = useState<AppSettings>({
    theme: 'isro-dark',
    notifications: true,
    satelliteAutoRefresh: true,
    language: 'English',
    temperatureUnit: 'Celsius',
    profileName: 'Dr. Vikram Sharma',
    teamName: 'Tech_Solvers',
    hackathonId: 'ISRO-BAH2026-TS409'
  });

  const handleSelectHotspot = (hotspot: Hotspot) => {
    setSelectedHotspotId(hotspot.id);
    setSelectedCity(hotspot.city);
  };

  const handleTabSwitch = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between bg-[#07111F] text-white selection:bg-[#FF8A00] selection:text-[#07111F] ${settings.theme === 'high-contrast' ? 'contrast-125' : ''}`}>
      <div className="flex flex-col min-h-screen">
        {/* Sticky Header with realistic Earth background banner & floating satellite animation */}
        <Header
          activeTab={activeTab}
          onSelectTab={handleTabSwitch}
          settings={settings}
          onUpdateSettings={setSettings}
        />

        {/* Main Body with Left Sidebar + Active View */}
        <div className="flex flex-col lg:flex-row flex-1 max-w-[1600px] w-full mx-auto">
          {/* LEFT SIDEBAR: Premium glass sidebar */}
          <LeftSidebar activeTab={activeTab} onSelectTab={handleTabSwitch} />

          {/* Main Content Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden min-w-0">
            {activeTab === 'dashboard' && (
              <DashboardView
                onSelectTab={handleTabSwitch}
                onSelectHotspot={handleSelectHotspot}
                onSelectCity={(city) => setSelectedCity(city)}
              />
            )}

            {activeTab === 'heatmap' && (
              <HeatmapView
                onSelectTab={handleTabSwitch}
                onSelectHotspot={handleSelectHotspot}
                selectedHotspotId={selectedHotspotId}
                onSelectCity={(city) => setSelectedCity(city)}
              />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsView onSelectTab={handleTabSwitch} />
            )}

            {activeTab === 'ai-recommendations' && (
              <AiRecommendationsView
                selectedCity={selectedCity}
                onSelectCity={(city) => setSelectedCity(city)}
                onSelectTab={handleTabSwitch}
              />
            )}

            {activeTab === 'scenario-simulator' && (
              <ScenarioSimulatorView onSelectTab={handleTabSwitch} />
            )}

            {activeTab === 'reports' && (
              <ReportsView onSelectTab={handleTabSwitch} />
            )}

            {activeTab === 'alerts' && (
              <AlertsView
                onSelectTab={handleTabSwitch}
                onSelectCity={(city) => setSelectedCity(city)}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsView settings={settings} onUpdateSettings={setSettings} />
            )}
          </main>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
