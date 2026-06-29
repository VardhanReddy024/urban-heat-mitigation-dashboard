import React from 'react';
import { FiGrid, FiMap, FiBarChart2, FiCpu, FiSliders, FiFileText, FiSettings } from 'react-icons/fi';
import { NavTab } from '../../types';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab }) => {
  const tabs: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiGrid className="w-4 h-4" /> },
    { id: 'heatmap', label: 'Heat Map', icon: <FiMap className="w-4 h-4" />, badge: 'Live' },
    { id: 'analytics', label: 'Analytics', icon: <FiBarChart2 className="w-4 h-4" /> },
    { id: 'ai-recommendations', label: 'AI Recommendations', icon: <FiCpu className="w-4 h-4" />, badge: 'Explainable AI' },
    { id: 'scenario-simulator', label: 'Scenario Simulator', icon: <FiSliders className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports', icon: <FiFileText className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings className="w-4 h-4" /> }
  ];

  return (
    <nav className="bg-[#081229] border-b border-white/10 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex space-x-1 sm:space-x-2 py-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl font-space text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF7A00] to-amber-600 text-[#081229] shadow-[0_4px_20px_rgba(255,122,0,0.35)] scale-[1.02]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={isActive ? 'text-[#081229]' : 'text-[#FF7A00]'}>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded font-bold ${
                    isActive ? 'bg-[#081229] text-white' : 'bg-[#FF7A00]/20 text-[#FF7A00]'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
