import React from 'react';
import { FiBell, FiAlertTriangle, FiAlertCircle, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { NavTab } from '../../types';
import { RECENT_ALERTS } from '../../data/sampleData';

interface RecentAlertsCardProps {
  onSelectTab: (tab: NavTab) => void;
  onSelectCity?: (city: string) => void;
}

export const RecentAlertsCard: React.FC<RecentAlertsCardProps> = ({ onSelectTab, onSelectCity }) => {
  const getSeverityStyle = (severity: string) => {
    if (severity === 'Critical') {
      return {
        bg: 'bg-[#FF4D4F]/15 border-[#FF4D4F]/40',
        text: 'text-[#FF4D4F]',
        icon: <FiAlertTriangle className="w-4 h-4 text-[#FF4D4F] animate-pulse" />
      };
    }
    if (severity === 'Warning') {
      return {
        bg: 'bg-[#FF8A00]/15 border-[#FF8A00]/40',
        text: 'text-[#FF8A00]',
        icon: <FiAlertCircle className="w-4 h-4 text-[#FF8A00]" />
      };
    }
    return {
      bg: 'bg-[#4DA3FF]/15 border-[#4DA3FF]/40',
      text: 'text-[#4DA3FF]',
      icon: <FiCheckCircle className="w-4 h-4 text-[#4DA3FF]" />
    };
  };

  return (
    <div className="glass-card p-6 flex flex-col justify-between h-full border border-white/10 hover:border-[#FF8A00]/40 transition-all duration-300 bg-gradient-to-b from-[#0D1E36]/70 to-[#07111F]/90">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg xl:text-xl font-extrabold font-space tracking-tight text-white flex items-center">
              <FiBell className="mr-2 text-[#FF4D4F]" /> Recent Alerts
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-[#FF4D4F]/15 text-[#FF4D4F] border border-[#FF4D4F]/30 text-[10px] font-space font-black uppercase tracking-wider">
            Active Wards
          </span>
        </div>
        <p className="text-xs text-[#4DA3FF] font-medium mb-4">
          Real-time thermal anomaly warnings &amp; urban cooling project status telemetry
        </p>

        <div className="space-y-3">
          {RECENT_ALERTS.map((alert) => {
            const style = getSeverityStyle(alert.severity);
            return (
              <div
                key={alert.id}
                onClick={() => {
                  if (onSelectCity) onSelectCity(alert.city);
                  onSelectTab('alerts');
                }}
                className="p-3.5 rounded-2xl bg-[#07111F]/70 border border-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer group flex items-start space-x-3"
              >
                <div className={`p-2 rounded-xl border flex-shrink-0 mt-0.5 ${style.bg}`}>
                  {style.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-space font-black text-white group-hover:text-[#FF8A00] transition truncate pr-1">
                      {alert.category}
                    </span>
                    <span className="text-[10px] font-space text-slate-400 whitespace-nowrap">
                      {alert.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2 leading-snug">{alert.description}</p>
                  <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-white/5 font-space text-[10px]">
                    <span className="text-slate-400">City: <strong className="text-white">{alert.city}</strong></span>
                    <span className={`font-extrabold ${style.text}`}>{alert.severity}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => onSelectTab('alerts')}
        className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-[#FF4D4F] to-[#FF8A00] hover:from-[#FF8A00] hover:to-[#FF4D4F] text-[#07111F] font-space font-black text-xs sm:text-sm shadow-[0_0_20px_rgba(255,77,79,0.3)] transition-all hover:scale-[1.02] flex items-center justify-center space-x-2"
      >
        <span>View Mission Control Alert Center</span>
        <FiArrowRight className="stroke-[3]" />
      </button>
    </div>
  );
};
