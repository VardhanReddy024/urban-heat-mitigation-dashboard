import React, { useState } from 'react';
import { FiBell, FiGlobe, FiRadio, FiCheckCircle, FiSun, FiMoon, FiDownload, FiCpu } from 'react-icons/fi';
import { NavTab, AppSettings } from '../../types';

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  settings: AppSettings;
  onUpdateSettings?: (newSettings: AppSettings) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectTab, settings, onUpdateSettings }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'Landsat 8 & 9 Thermal Pass Completed', time: '10m ago', text: 'New LST anomalies detected in Delhi NCR Sector 4.' },
    { id: 2, title: 'AI Recommendation Pilot Ready', time: '1h ago', text: 'Cool Roof intervention simulated for Ahmedabad Slum zones.' },
    { id: 3, title: 'Bhuvan Sentinel-2 Layer Synced', time: '3h ago', text: 'NDVI Vegetation index updated across South India.' }
  ];

  const handleThemeToggle = () => {
    if (onUpdateSettings) {
      onUpdateSettings({
        ...settings,
        theme: settings.theme === 'isro-dark' ? 'high-contrast' : 'isro-dark'
      });
    }
  };

  return (
    <header className="earth-banner border-b border-white/10 px-4 lg:px-8 py-5 relative overflow-hidden z-40 shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
      {/* Floating Satellite Animation above banner */}
      <div className="absolute right-1/4 top-1 pointer-events-none opacity-40 lg:opacity-75 animate-float-sat select-none z-0">
        <div className="flex items-center space-x-1 bg-gradient-to-r from-[#4DA3FF]/20 to-[#FF8A00]/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 shadow-[0_0_15px_rgba(77,163,255,0.3)]">
          <FiRadio className="text-[#FF8A00] animate-pulse w-3 h-3" />
          <span className="text-[10px] font-space font-semibold tracking-widest text-[#4DA3FF] uppercase">INSAT-3DR Telemetry Active</span>
        </div>
      </div>

      {/* Background stars / grid mesh overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#4DA3FF_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-4 relative z-10">
        {/* Left side: ISRO Logo + Badge + Title + Subtitle */}
        <div className="flex items-start sm:items-center space-x-4 cursor-pointer" onClick={() => onSelectTab('dashboard')}>
          {/* ISRO Logo Emblem */}
          <div className="relative flex items-center justify-center w-14 h-14 rounded-[18px] bg-gradient-to-br from-[#FF8A00] via-[#FF8A00]/80 to-[#4DA3FF] p-0.5 shadow-[0_0_25px_rgba(255,138,0,0.45)] group flex-shrink-0">
            <div className="w-full h-full bg-[#07111F] rounded-[16px] flex flex-col items-center justify-center">
              <span className="font-space font-black text-xl tracking-tighter text-white leading-none">
                IS<span className="text-[#FF8A00]">RO</span>
              </span>
              <span className="text-[7px] font-space text-[#4DA3FF] font-bold tracking-widest uppercase mt-0.5">Mission</span>
            </div>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#32D583] opacity-80"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#32D583] border border-[#07111F]"></span>
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[10px] font-space font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#FF8A00]/20 text-[#FF8A00] border border-[#FF8A00]/40 shadow-[0_0_10px_rgba(255,138,0,0.2)]">
                Bharatiya Antariksh Hackathon 2026
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-space font-bold bg-[#4DA3FF]/15 text-[#4DA3FF] border border-[#4DA3FF]/30">
                <FiCpu className="mr-1 animate-spin-slow w-3 h-3" /> Earth Observation AI
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-black tracking-tight font-space text-white leading-tight">
              Urban Heat Mitigation &amp; Cooling Strategy Platform
            </h1>
            <p className="text-xs sm:text-sm font-medium text-[#4DA3FF] mt-0.5 tracking-wide flex items-center">
              <span>AI Powered Insights for Climate Resilient Urban India</span>
            </p>
          </div>
        </div>

        {/* Right side: Language Selector | Theme Toggle | Notifications | User Profile | Export Briefing */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Language Selector */}
          <button
            onClick={() => onSelectTab('settings')}
            className="flex items-center px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#4DA3FF]/40 text-xs font-space text-slate-200 transition shadow-sm"
            title="Switch Language"
          >
            <FiGlobe className="mr-1.5 text-[#4DA3FF] w-4 h-4" />
            <span className="font-semibold">{settings.language}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FF8A00]/40 text-slate-200 hover:text-white transition shadow-sm"
            title="Toggle Interface Mode"
          >
            {settings.theme === 'isro-dark' ? <FiMoon className="w-4 h-4 text-[#FF8A00]" /> : <FiSun className="w-4 h-4 text-[#FF8A00]" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#4DA3FF]/40 text-slate-200 hover:text-white transition relative shadow-sm"
              aria-label="Notifications"
            >
              <FiBell className="w-4 h-4 text-[#4DA3FF]" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#FF8A00] ring-2 ring-[#07111F]" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 glass-panel rounded-2xl shadow-2xl border border-white/15 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <span className="font-space font-bold text-sm text-white flex items-center">
                    <FiBell className="mr-2 text-[#FF8A00]" /> Mission Alerts (3)
                  </span>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-xs text-slate-400 hover:text-white font-space"
                  >
                    Close
                  </button>
                </div>
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#FF8A00]/30 transition">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-semibold text-white font-space">{n.title}</span>
                        <span className="text-[10px] text-slate-400 font-space">{n.time}</span>
                      </div>
                      <p className="text-xs text-slate-300">{n.text}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-white/10 text-center">
                  <button
                    onClick={() => { setShowNotifications(false); onSelectTab('alerts'); }}
                    className="text-xs font-space font-semibold text-[#FF8A00] hover:underline flex items-center justify-center mx-auto"
                  >
                    <FiCheckCircle className="mr-1.5" /> View all Recent Alerts
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div
            onClick={() => onSelectTab('settings')}
            className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#FF8A00]/15 to-[#4DA3FF]/15 border border-[#FF8A00]/30 hover:border-[#FF8A00] cursor-pointer transition shadow-[0_0_15px_rgba(255,138,0,0.1)]"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF8A00] to-amber-500 flex items-center justify-center font-space font-black text-xs text-[#07111F] shadow-sm">
              TS
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-[10px] font-space text-[#4DA3FF] uppercase font-bold tracking-wider leading-tight">Hackathon Team</span>
              <span className="text-xs font-space font-bold text-white tracking-wide">
                Team: <span className="text-[#FF8A00]">Tech_Solvers</span>
              </span>
            </div>
          </div>

          {/* Export Briefing Button */}
          <button
            onClick={() => onSelectTab('reports')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8A00] via-[#FF8A00] to-amber-600 hover:from-amber-500 hover:to-[#FF8A00] text-[#07111F] font-space font-extrabold text-xs sm:text-sm shadow-[0_0_20px_rgba(255,138,0,0.35)] transition-all hover:scale-[1.03] flex items-center space-x-2 whitespace-nowrap"
          >
            <FiDownload className="w-4 h-4 stroke-[3]" />
            <span>Export Briefing</span>
          </button>
        </div>
      </div>
    </header>
  );
};
