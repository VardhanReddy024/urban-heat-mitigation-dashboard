import React from 'react';
import { KPI_METRICS, HOTSPOTS } from '../../data/sampleData';
import { KpiCard } from '../common/KpiCard';
import { IndiaMap } from './IndiaMap';
import { HeatTrendChart } from './HeatTrendChart';
import { RiskPieChart } from './RiskPieChart';
import { RecentRecommendations } from './RecentRecommendations';
import { DashboardSimulatorCard } from './DashboardSimulatorCard';
import { RecentAlertsCard } from './RecentAlertsCard';
import { NavTab, Hotspot } from '../../types';
import { FiRadio, FiGrid } from 'react-icons/fi';

interface DashboardViewProps {
  onSelectTab: (tab: NavTab) => void;
  onSelectHotspot: (hotspot: Hotspot) => void;
  onSelectCity: (city: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSelectTab,
  onSelectHotspot,
  onSelectCity
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/10">
        <div>
          <h2 className="text-xl sm:text-3xl font-black font-space tracking-tight text-white flex items-center">
            <FiGrid className="mr-3 text-[#FF8A00] w-6 h-6" />
            ISRO Bharatiya Antariksh Command Center
          </h2>
          <p className="text-xs sm:text-sm text-[#4DA3FF] font-medium mt-0.5">
            Real-time urban microclimate thermal intelligence &amp; AI intervention monitoring
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1.5 rounded-full bg-[#32D583]/15 text-[#32D583] border border-[#32D583]/30 text-xs font-space font-extrabold flex items-center shadow-[0_0_15px_rgba(50,213,131,0.2)]">
            <FiRadio className="mr-1.5 animate-pulse" /> Live Telemetry Synced
          </span>
        </div>
      </div>

      {/* TOP KPI CARDS: Four premium cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6">
        {KPI_METRICS.map((metric) => (
          <KpiCard
            key={metric.id}
            metric={metric}
            onClick={() => {
              if (metric.id === 'hotspots' || metric.id === 'avg-temp') onSelectTab('heatmap');
              if (metric.id === 'risk-zones') onSelectTab('analytics');
              if (metric.id === 'cooling-projects') onSelectTab('scenario-simulator');
            }}
          />
        ))}
      </div>

      {/* MAIN SECTION: LEFT (Map) | CENTER (Temperature Trend) | RIGHT (Risk Distribution) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Large Interactive India Heat Map */}
        <div className="lg:col-span-5 flex flex-col min-h-[460px]">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg xl:text-xl font-extrabold font-space text-white tracking-tight">
                Interactive India Heat Map
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-space font-extrabold bg-[#FF4D4F]/20 text-[#FF4D4F] border border-[#FF4D4F]/30 animate-pulse">
                Live LST Overlay
              </span>
            </div>
          </div>
          <div className="flex-1">
            <IndiaMap
              hotspots={HOTSPOTS}
              onSelectHotspot={(hotspot) => onSelectHotspot(hotspot)}
              height="520px"
            />
          </div>
        </div>

        {/* CENTER: Temperature Trend Chart */}
        <div className="lg:col-span-4 min-h-[460px]">
          <HeatTrendChart />
        </div>

        {/* RIGHT: Risk Distribution Doughnut Chart */}
        <div className="lg:col-span-3 min-h-[460px]">
          <RiskPieChart />
        </div>
      </div>

      {/* BOTTOM SECTION: BOTTOM LEFT (AI Recommendations) | BOTTOM CENTER (Scenario Simulator) | BOTTOM RIGHT (Recent Alerts) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* BOTTOM LEFT: AI Recommendations */}
        <div className="min-h-[440px]">
          <RecentRecommendations
            onSelectTab={onSelectTab}
            onSelectCity={onSelectCity}
          />
        </div>

        {/* BOTTOM CENTER: Scenario Simulator */}
        <div className="min-h-[440px]">
          <DashboardSimulatorCard
            onSelectTab={onSelectTab}
          />
        </div>

        {/* BOTTOM RIGHT: Recent Alerts */}
        <div className="min-h-[440px]">
          <RecentAlertsCard
            onSelectTab={onSelectTab}
            onSelectCity={onSelectCity}
          />
        </div>
      </div>
    </div>
  );
};
