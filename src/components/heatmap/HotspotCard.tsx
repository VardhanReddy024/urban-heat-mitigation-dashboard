import React from 'react';
import { Hotspot } from '../../types';
import { Badge } from '../common/Badge';
import { FiThermometer, FiUsers, FiCpu, FiNavigation, FiSun, FiGrid } from 'react-icons/fi';

interface HotspotCardProps {
  hotspot: Hotspot;
  isSelected: boolean;
  onSelect: (hotspot: Hotspot) => void;
  onAnalyze: (hotspot: Hotspot) => void;
}

export const HotspotCard: React.FC<HotspotCardProps> = ({
  hotspot,
  isSelected,
  onSelect,
  onAnalyze
}) => {
  return (
    <div
      onClick={() => onSelect(hotspot)}
      className={`glass-card rounded-2xl p-5 transition-all duration-300 cursor-pointer ${
        isSelected
          ? 'border-[#FF7A00] bg-gradient-to-br from-[#12285a] to-[#0d1d44] shadow-[0_0_25px_rgba(255,122,0,0.25)] scale-[1.01]'
          : 'glass-card-hover border-white/10'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-bold font-space text-white tracking-tight">
              {hotspot.city}
            </h3>
            <span className="text-xs text-slate-400 font-medium">({hotspot.state})</span>
          </div>
          <span className="text-[11px] text-slate-400 font-space block mt-0.5">
            Sat Sensor: <span className="text-slate-300">{hotspot.satelliteSensor}</span>
          </span>
        </div>
        <Badge risk={hotspot.riskLevel} />
      </div>

      <div className="grid grid-cols-2 gap-3 my-3 py-3 border-y border-white/10">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
            <FiThermometer className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-space text-slate-400 block font-semibold">LST Temp</span>
            <span className="text-lg font-bold font-space text-white">
              {hotspot.temperature}°C
            </span>
            <span className="text-[10px] text-red-400 block">HI: {hotspot.heatIndex}°C</span>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <FiUsers className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-space text-slate-400 block font-semibold">Population</span>
            <span className="text-sm font-bold font-space text-white">
              {hotspot.population}
            </span>
            <span className="text-[10px] text-slate-400 block">Urban Agglomeration</span>
          </div>
        </div>
      </div>

      {/* Concrete & Tree cover mini bar */}
      <div className="space-y-1.5 mb-3.5 text-[11px]">
        <div className="flex justify-between text-slate-300 font-space">
          <span className="flex items-center"><FiGrid className="mr-1 text-slate-400" /> Concrete Built-up: {hotspot.concretePercent}%</span>
          <span className="flex items-center text-emerald-400"><FiSun className="mr-1" /> Tree Canopy: {hotspot.treeCoverPercent}%</span>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden flex">
          <div style={{ width: `${hotspot.concretePercent}%` }} className="h-full bg-red-400/80" />
          <div style={{ width: `${hotspot.treeCoverPercent}%` }} className="h-full bg-emerald-400" />
        </div>
      </div>

      {/* Recommended Action Box */}
      <div className="p-3 rounded-xl bg-gradient-to-r from-[#FF7A00]/15 to-transparent border-l-2 border-[#FF7A00] mb-4">
        <span className="text-[10px] uppercase font-space font-bold tracking-wider text-[#FF7A00] block mb-0.5">
          Recommended Action
        </span>
        <p className="text-xs font-medium text-white leading-snug">
          {hotspot.recommendedAction}
        </p>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAnalyze(hotspot);
          }}
          className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#FF7A00] to-amber-600 hover:from-amber-500 hover:to-[#FF7A00] text-[#081229] font-space font-bold text-xs shadow-md transition flex items-center justify-center space-x-1.5"
        >
          <FiCpu />
          <span>AI Strategy</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(hotspot);
          }}
          className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-space font-semibold text-xs border border-white/10 transition flex items-center space-x-1.5"
        >
          <FiNavigation className="text-[#FF7A00]" />
          <span>Locate</span>
        </button>
      </div>
    </div>
  );
};
