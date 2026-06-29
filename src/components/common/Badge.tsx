import React from 'react';
import { RiskLevel } from '../../types';

interface BadgeProps {
  risk?: RiskLevel;
  text?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ risk, text, className = '' }) => {
  const getColors = () => {
    if (risk === 'Critical') {
      return 'bg-red-500/20 text-red-400 border-red-500/40 shadow-[0_0_12px_rgba(239,68,68,0.3)]';
    }
    if (risk === 'High') {
      return 'bg-[#FF7A00]/20 text-[#FF7A00] border-[#FF7A00]/40 shadow-[0_0_12px_rgba(255,122,0,0.3)]';
    }
    if (risk === 'Moderate') {
      return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    }
    if (risk === 'Low') {
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
    }
    return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase border font-space ${getColors()} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
        risk === 'Critical' ? 'bg-red-500 animate-ping' :
        risk === 'High' ? 'bg-[#FF7A00]' :
        risk === 'Moderate' ? 'bg-amber-400' : 'bg-emerald-400'
      }`} />
      {risk || text}
    </span>
  );
};
