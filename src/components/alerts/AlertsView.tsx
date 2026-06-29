import React, { useState } from 'react';
import { RECENT_ALERTS } from '../../data/sampleData';
import { FiBell, FiAlertTriangle, FiCheckCircle, FiSearch, FiSliders } from 'react-icons/fi';
import { NavTab } from '../../types';

interface AlertsViewProps {
  onSelectTab: (tab: NavTab) => void;
  onSelectCity: (city: string) => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({ onSelectTab, onSelectCity }) => {
  const [filter, setFilter] = useState<'All' | 'Critical' | 'Warning' | 'Info'>('All');
  const [search, setSearch] = useState('');

  const filteredAlerts = RECENT_ALERTS.filter((a) => {
    const matchSeverity = filter === 'All' || a.severity === filter;
    const matchSearch = a.city.toLowerCase().includes(search.toLowerCase()) || a.title.toLowerCase().includes(search.toLowerCase()) || a.description.toLowerCase().includes(search.toLowerCase());
    return matchSeverity && matchSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="glass-card p-6 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-[#FF4D4F]/20 text-[#FF4D4F]">
              <FiBell className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-black font-space text-white tracking-tight">
                ISRO Mission Control Alert Center
              </h2>
              <p className="text-xs text-[#4DA3FF] font-medium">
                Live Earth Observation anomaly detection feed &amp; automated disaster mitigation triggers
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px]">
            <FiSearch className="absolute left-3 top-3 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search city or alert..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 outline-none focus:border-[#FF8A00] font-space"
            />
          </div>

          <div className="flex items-center space-x-1 bg-[#07111F]/80 p-1 rounded-xl border border-white/10 text-xs font-space">
            {(['All', 'Critical', 'Warning', 'Info'] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setFilter(sev)}
                className={`px-3 py-1.5 rounded-lg transition font-bold ${
                  filter === sev
                    ? 'bg-[#FF8A00] text-[#07111F] shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-6">
        {filteredAlerts.map((alert) => {
          const isCritical = alert.severity === 'Critical';
          const isWarning = alert.severity === 'Warning';
          const color = isCritical ? '#FF4D4F' : isWarning ? '#FF8A00' : '#4DA3FF';
          return (
            <div
              key={alert.id}
              className="glass-card p-6 border border-white/10 hover:border-[#FF8A00]/50 transition-all duration-300 flex flex-col justify-between space-y-4 bg-[#07111F]/70 group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: color }} />
                    <span className="font-space font-black text-sm text-white">{alert.category}</span>
                  </div>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-space font-black uppercase tracking-wider"
                    style={{ backgroundColor: `${color}25`, color: color, border: `1px solid ${color}40` }}
                  >
                    {alert.severity}
                  </span>
                </div>

                <h3 className="text-base font-space font-extrabold text-white group-hover:text-[#FF8A00] transition leading-snug">
                  {alert.title} — {alert.city}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{alert.description}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-space">
                <span className="text-slate-400">Timestamp: <strong className="text-white">{alert.time}</strong></span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      onSelectCity(alert.city);
                      onSelectTab('ai-recommendations');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#4DA3FF]/20 hover:bg-[#4DA3FF]/30 text-[#4DA3FF] font-bold text-xs transition"
                  >
                    Run XAI Analysis
                  </button>
                  <button
                    onClick={() => {
                      onSelectCity(alert.city);
                      onSelectTab('scenario-simulator');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#FF8A00] text-[#07111F] font-bold text-xs transition shadow-md"
                  >
                    Simulate Fix
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="glass-card p-12 text-center text-slate-400 font-space">
          <FiCheckCircle className="w-12 h-12 text-[#32D583] mx-auto mb-3" />
          <h4 className="text-lg font-bold text-white">All Clear</h4>
          <p className="text-xs text-slate-400 mt-1">No thermal alerts match your active filter.</p>
        </div>
      )}

      {/* Footer Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#07111F]/80">
        <div className="flex items-center space-x-3">
          <FiAlertTriangle className="text-[#FF8A00] w-5 h-5 flex-shrink-0" />
          <span className="text-xs font-space text-slate-300">
            Automated alerts are triggered when satellite thermal LST readings surpass standard IMD heatwave thresholds (&gt;43°C).
          </span>
        </div>
        <button
          onClick={() => onSelectTab('scenario-simulator')}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-space font-bold whitespace-nowrap transition flex items-center space-x-1.5"
        >
          <FiSliders className="text-[#FF8A00]" />
          <span>Launch Scenario Simulator</span>
        </button>
      </div>
    </div>
  );
};
