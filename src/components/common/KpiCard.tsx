import React from 'react';
import { FiAlertTriangle, FiThermometer, FiShield, FiCheckCircle, FiTrendingUp, FiTrendingDown, FiActivity } from 'react-icons/fi';
import { KpiMetric } from '../../types';

interface KpiCardProps {
  metric: KpiMetric;
  onClick?: () => void;
}

export const KpiCard: React.FC<KpiCardProps> = ({ metric, onClick }) => {
  const getStyling = () => {
    switch (metric.id) {
      case 'hotspots':
        return {
          icon: <FiAlertTriangle className="w-8 h-8 text-[#FF4D4F]" />,
          glow: 'group-hover:shadow-[0_0_35px_rgba(255,77,79,0.35)] border-[#FF4D4F]/30',
          iconBg: 'bg-[#FF4D4F]/15 border-[#FF4D4F]/40 shadow-[0_0_15px_rgba(255,77,79,0.2)]',
          accent: 'text-[#FF4D4F]',
          blob: 'bg-[#FF4D4F]/10'
        };
      case 'avg-temp':
        return {
          icon: <FiThermometer className="w-8 h-8 text-[#FF8A00]" />,
          glow: 'group-hover:shadow-[0_0_35px_rgba(255,138,0,0.35)] border-[#FF8A00]/30',
          iconBg: 'bg-[#FF8A00]/15 border-[#FF8A00]/40 shadow-[0_0_15px_rgba(255,138,0,0.2)]',
          accent: 'text-[#FF8A00]',
          blob: 'bg-[#FF8A00]/10'
        };
      case 'risk-zones':
        return {
          icon: <FiShield className="w-8 h-8 text-[#4DA3FF]" />,
          glow: 'group-hover:shadow-[0_0_35px_rgba(77,163,255,0.35)] border-[#4DA3FF]/30',
          iconBg: 'bg-[#4DA3FF]/15 border-[#4DA3FF]/40 shadow-[0_0_15px_rgba(77,163,255,0.2)]',
          accent: 'text-[#4DA3FF]',
          blob: 'bg-[#4DA3FF]/10'
        };
      case 'cooling-projects':
      default:
        return {
          icon: <FiCheckCircle className="w-8 h-8 text-[#32D583]" />,
          glow: 'group-hover:shadow-[0_0_35px_rgba(50,213,131,0.35)] border-[#32D583]/30',
          iconBg: 'bg-[#32D583]/15 border-[#32D583]/40 shadow-[0_0_15px_rgba(50,213,131,0.2)]',
          accent: 'text-[#32D583]',
          blob: 'bg-[#32D583]/10'
        };
    }
  };

  const style = getStyling();

  return (
    <div
      onClick={onClick}
      className={`glass-card p-6 glass-card-hover cursor-pointer relative overflow-hidden group border ${style.glow} bg-gradient-to-br from-[#0D1E36]/80 via-[#0A182D]/80 to-[#07111F]/90`}
    >
      {/* Subtle glow orb */}
      <div className={`absolute -right-10 -top-10 w-36 h-36 rounded-full blur-3xl pointer-events-none transition-all duration-500 ${style.blob} group-hover:scale-125`} />

      <div className="flex items-start justify-between mb-5 relative z-10">
        <div className="space-y-1">
          <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase font-space flex items-center">
            <FiActivity className="mr-1.5 w-3 h-3 opacity-70" />
            {metric.title}
          </span>
          <h3 className={`text-3xl xl:text-4xl font-extrabold tracking-tight font-space transition-colors ${style.accent} drop-shadow-sm`}>
            {metric.value}
          </h3>
        </div>
        {/* Large icon in glowing well */}
        <div className={`p-3.5 rounded-2xl border transition-transform duration-300 group-hover:scale-110 flex items-center justify-center ${style.iconBg}`}>
          {style.icon}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs pt-3 border-t border-white/5 relative z-10 font-space">
        <span
          className={`inline-flex items-center font-extrabold px-2.5 py-1 rounded-lg text-[11px] ${
            metric.isPositive
              ? 'bg-[#32D583]/15 text-[#32D583] border border-[#32D583]/30 shadow-[0_0_10px_rgba(50,213,131,0.15)]'
              : 'bg-[#FF4D4F]/15 text-[#FF4D4F] border border-[#FF4D4F]/30 shadow-[0_0_10px_rgba(255,77,79,0.15)]'
          }`}
        >
          {metric.isPositive ? <FiTrendingDown className="mr-1 h-3.5 w-3.5 stroke-[3]" /> : <FiTrendingUp className="mr-1 h-3.5 w-3.5 stroke-[3]" />}
          {metric.change}
        </span>
        <span className="text-slate-400 truncate max-w-[130px] ml-2 text-[11px] font-medium" title={metric.description}>
          {metric.description}
        </span>
      </div>
    </div>
  );
};
