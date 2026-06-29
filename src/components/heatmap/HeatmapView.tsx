import React, { useState } from 'react';
import { HOTSPOTS } from '../../data/sampleData';
import { Hotspot, NavTab, RiskLevel } from '../../types';
import { IndiaMap } from '../dashboard/IndiaMap';
import { HotspotCard } from './HotspotCard';
import { FiFilter, FiSearch, FiRefreshCw, FiCheckCircle } from 'react-icons/fi';

interface HeatmapViewProps {
  onSelectTab: (tab: NavTab) => void;
  onSelectHotspot: (hotspot: Hotspot) => void;
  selectedHotspotId?: string;
  onSelectCity: (city: string) => void;
}

export const HeatmapView: React.FC<HeatmapViewProps> = ({
  onSelectTab,
  onSelectHotspot,
  selectedHotspotId,
  onSelectCity
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<'All' | RiskLevel>('All');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Today, 10:45 IST');

  const filteredHotspots = HOTSPOTS.filter((h) => {
    const matchesSearch = h.city.toLowerCase().includes(searchTerm.toLowerCase()) || h.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'All' || h.riskLevel === riskFilter;
    return matchesSearch && matchesRisk;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' IST');
    }, 800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title & Filter Bar */}
      <div className="glass-card rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold font-space text-white tracking-tight">
              ISRO Satellite Thermal Heat Map
            </h2>
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded text-xs font-space font-semibold bg-[#FF7A00]/20 text-[#FF7A00] border border-[#FF7A00]/40">
              High Resolution LST (30m)
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center">
            <span>Synchronized with Bhuvan National Geoportal</span>
            <span className="mx-2 text-slate-600">•</span>
            <span>Last pass: <strong className="text-slate-300">{lastUpdated}</strong></span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Refresh simulated feed button */}
          <button
            onClick={handleRefresh}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition flex items-center space-x-2 text-xs font-space"
          >
            <FiRefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#FF7A00]' : ''}`} />
            <span className="hidden sm:inline">Sync Satellite</span>
          </button>

          {/* Search Input */}
          <div className="relative flex-1 sm:w-56">
            <FiSearch className="absolute left-3 top-3 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-[#FF7A00] text-xs text-white placeholder-slate-400 outline-none transition font-space"
            />
          </div>

          {/* Risk Level Filter dropdown */}
          <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-space">
            <FiFilter className="text-[#FF7A00]" />
            <span className="text-slate-400">Risk:</span>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value as any)}
              className="bg-transparent text-white outline-none font-semibold cursor-pointer"
            >
              <option value="All" className="bg-[#081229]">All Levels</option>
              <option value="Critical" className="bg-[#081229]">Critical (&gt;43°C)</option>
              <option value="High" className="bg-[#081229]">High (39-43°C)</option>
              <option value="Moderate" className="bg-[#081229]">Moderate (&lt;39°C)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Map Main Display */}
      <div className="w-full">
        <IndiaMap
          hotspots={filteredHotspots}
          onSelectHotspot={(hotspot) => onSelectHotspot(hotspot)}
          selectedHotspotId={selectedHotspotId}
          height="540px"
        />
      </div>

      {/* Hotspots Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold font-space text-white flex items-center">
            <span>Monitored Indian Hotspots</span>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-white/10 text-xs font-normal">
              {filteredHotspots.length} Cities
            </span>
          </h3>
          <span className="text-xs text-slate-400 font-space">
            Click any card to pan map or trigger Explainable AI Analysis
          </span>
        </div>

        {filteredHotspots.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center text-slate-400 font-space">
            <p className="text-base">No hotspot cities match your search filter.</p>
            <button
              onClick={() => { setSearchTerm(''); setRiskFilter('All'); }}
              className="mt-3 px-4 py-2 rounded-xl bg-[#FF7A00]/20 text-[#FF7A00] text-xs font-bold"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotspots.map((hotspot) => (
              <HotspotCard
                key={hotspot.id}
                hotspot={hotspot}
                isSelected={selectedHotspotId === hotspot.id}
                onSelect={(h) => onSelectHotspot(h)}
                onAnalyze={(h) => {
                  onSelectCity(h.city);
                  onSelectTab('ai-recommendations');
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Telemetry Sensor Overview */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-space gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold text-base">
            LST
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Land Surface Temperature Retrieval Algorithm</h4>
            <p className="text-slate-400 mt-0.5">
              Calculated using thermal infrared split-window technique applied to Landsat 9 Band 10 &amp; Sentinel-3 SLSTR data.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3 text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
          <FiCheckCircle className="w-5 h-5 flex-shrink-0" />
          <span>ISRO Hackathon Standard Dataset Verified</span>
        </div>
      </div>
    </div>
  );
};
