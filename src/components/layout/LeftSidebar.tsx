import React from 'react';
import {
  FiGrid,
  FiMap,
  FiBarChart2,
  FiCpu,
  FiSliders,
  FiFileText,
  FiBell,
  FiSettings,
  FiDatabase,
  FiRefreshCw
} from 'react-icons/fi';
import { NavTab } from '../../types';

interface LeftSidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ activeTab, onSelectTab }) => {
  const menuItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string; badgeColor?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiGrid className="w-4 h-4" /> },
    { id: 'heatmap', label: 'Heat Map', icon: <FiMap className="w-4 h-4" />, badge: 'LIVE', badgeColor: 'bg-[#FF4D4F] text-white animate-pulse' },
    { id: 'analytics', label: 'Analytics', icon: <FiBarChart2 className="w-4 h-4" /> },
    { id: 'ai-recommendations', label: 'AI Recommendations', icon: <FiCpu className="w-4 h-4" />, badge: 'AI', badgeColor: 'bg-[#4DA3FF]/20 text-[#4DA3FF] border border-[#4DA3FF]/40' },
    { id: 'scenario-simulator', label: 'Scenario Simulator', icon: <FiSliders className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports', icon: <FiFileText className="w-4 h-4" /> },
    { id: 'alerts', label: 'Alerts', icon: <FiBell className="w-4 h-4" />, badge: '4', badgeColor: 'bg-[#FF8A00] text-[#07111F]' },
    { id: 'settings', label: 'Settings', icon: <FiSettings className="w-4 h-4" /> }
  ];

  return (
    <aside className="w-full lg:w-72 bg-[#081528]/85 backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between p-4 flex-shrink-0 z-30 min-h-[calc(100vh-90px)] shadow-xl">
      <div className="space-y-6">
        {/* Navigation Menu */}
        <div>
          <span className="text-[10px] font-space uppercase tracking-widest text-slate-400 font-bold px-3 block mb-2">
            Mission Navigation
          </span>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-space text-xs sm:text-sm font-bold transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FF8A00] to-amber-600 text-[#07111F] shadow-[0_4px_20px_rgba(255,138,0,0.4)] translate-x-1'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={isActive ? 'text-[#07111F]' : 'text-[#FF8A00] group-hover:scale-110 transition-transform'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-space font-extrabold tracking-wider px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-[#07111F] text-[#FF8A00]'
                          : item.badgeColor || 'bg-white/10 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* System Status Card */}
        <div className="glass-card p-4 border border-white/10 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-xs font-space font-bold text-white tracking-wide">System Status</span>
            <span className="w-2 h-2 rounded-full bg-[#32D583] animate-ping" />
          </div>
          <div className="space-y-2 text-[11px] font-space text-slate-200">
            <div className="flex items-center justify-between">
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#32D583] mr-2 shadow-[0_0_8px_#32D583]" /> AI Engine</span>
              <span className="text-[#32D583] font-bold">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#32D583] mr-2 shadow-[0_0_8px_#32D583]" /> Satellite Feed</span>
              <span className="text-[#32D583] font-bold">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#32D583] mr-2 shadow-[0_0_8px_#32D583]" /> Weather API</span>
              <span className="text-[#32D583] font-bold">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#32D583] mr-2 shadow-[0_0_8px_#32D583]" /> Database</span>
              <span className="text-[#32D583] font-bold">Connected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Cards: Team Card & ISRO Bhuvan Data Card */}
      <div className="space-y-4 pt-4">
        {/* Team Card */}
        <div className="glass-card p-4 border border-[#FF8A00]/30 bg-gradient-to-br from-[#0d1e36] to-[#081528] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#FF8A00]/10 rounded-bl-full pointer-events-none" />
          <span className="text-[10px] font-space font-extrabold tracking-widest text-[#FF8A00] uppercase block">
            Team Tech_Solvers
          </span>
          <h4 className="text-xs font-space font-bold text-white mt-0.5">
            Urban Climate Innovators
          </h4>
          {/* Four member avatars */}
          <div className="flex items-center space-x-1.5 mt-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FF8A00] to-amber-400 text-[#07111F] font-space font-black text-[10px] flex items-center justify-center border border-white/20 shadow-md" title="Dr. Vikram Sharma">
              VS
            </div>
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#4DA3FF] to-blue-300 text-[#07111F] font-space font-black text-[10px] flex items-center justify-center border border-white/20 shadow-md" title="Aarav Patel">
              AP
            </div>
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#32D583] to-emerald-300 text-[#07111F] font-space font-black text-[10px] flex items-center justify-center border border-white/20 shadow-md" title="Sneha Reddy">
              SR
            </div>
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-500 to-pink-400 text-white font-space font-black text-[10px] flex items-center justify-center border border-white/20 shadow-md" title="Rohan Gupta">
              RG
            </div>
          </div>
        </div>

        {/* ISRO Bhuvan Data Card */}
        <div className="glass-card p-3.5 border border-[#4DA3FF]/30 space-y-2 text-xs font-space">
          <div className="flex items-center justify-between text-[#4DA3FF] font-bold">
            <span className="flex items-center"><FiDatabase className="mr-1.5 w-3.5 h-3.5" /> ISRO Bhuvan Data</span>
            <FiRefreshCw className="w-3 h-3 animate-spin-slow text-slate-400" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div className="bg-white/5 p-1.5 rounded-lg border border-white/5">
              <span className="text-slate-400 text-[9px] block uppercase">Last Sync</span>
              <span className="text-white font-bold">10:45 IST</span>
            </div>
            <div className="bg-white/5 p-1.5 rounded-lg border border-white/5">
              <span className="text-slate-400 text-[9px] block uppercase">Next Sync</span>
              <span className="text-[#32D583] font-bold">11:00 IST</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
