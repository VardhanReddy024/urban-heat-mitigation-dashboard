import React, { useState, useMemo } from 'react';
import { FiSliders, FiTrendingDown, FiArrowRight } from 'react-icons/fi';
import { NavTab } from '../../types';

interface DashboardSimulatorCardProps {
  onSelectTab: (tab: NavTab) => void;
}

export const DashboardSimulatorCard: React.FC<DashboardSimulatorCardProps> = ({ onSelectTab }) => {
  const [treeCover, setTreeCover] = useState(20);
  const [coolRoofs, setCoolRoofs] = useState(50);
  const [reflectiveRoads, setReflectiveRoads] = useState(30);
  const [waterBodies, setWaterBodies] = useState(10);

  const baselineTemp = 44.8;
  const baselineHeatIndex = 51.2;

  const results = useMemo(() => {
    const treeRed = (treeCover / 10) * 0.65;
    const roofRed = (coolRoofs / 20) * 0.55;
    const roadRed = (reflectiveRoads / 25) * 0.30;
    const waterRed = (waterBodies / 5) * 0.35;

    const totalReduction = Number((treeRed + roofRed + roadRed + waterRed).toFixed(1));
    const predictedTemp = Number((baselineTemp - totalReduction).toFixed(1));
    const predHeatIndex = Number((baselineHeatIndex - totalReduction * 1.45).toFixed(1));
    const maxPoss = 4.8;
    const efficiency = Math.min(100, Math.round((totalReduction / maxPoss) * 100));

    return { totalReduction, predictedTemp, predHeatIndex, efficiency };
  }, [treeCover, coolRoofs, reflectiveRoads, waterBodies]);

  return (
    <div className="glass-card p-6 flex flex-col justify-between h-full border border-white/10 hover:border-[#FF8A00]/40 transition-all duration-300 bg-gradient-to-b from-[#0D1E36]/70 to-[#07111F]/90">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg xl:text-xl font-extrabold font-space tracking-tight text-white flex items-center">
              <FiSliders className="mr-2 text-[#4DA3FF]" /> Scenario Simulator
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-[#32D583]/15 text-[#32D583] border border-[#32D583]/30 text-[10px] font-space font-black uppercase">
            Live Model
          </span>
        </div>
        <p className="text-xs text-[#4DA3FF] font-medium mb-4">
          Adjust urban intervention sliders to dynamically compute microclimate thermal reduction
        </p>

        {/* Sliders Grid */}
        <div className="space-y-3.5 bg-[#07111F]/70 p-4 rounded-2xl border border-white/5 font-space">
          {/* Tree Cover */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-200">Tree Cover (%)</span>
              <span className="text-[#32D583]">{treeCover}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={treeCover}
              onChange={(e) => setTreeCover(Number(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#32D583]"
            />
          </div>

          {/* Cool Roofs */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-200">Cool Roofs (%)</span>
              <span className="text-[#FF8A00]">{coolRoofs}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={coolRoofs}
              onChange={(e) => setCoolRoofs(Number(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FF8A00]"
            />
          </div>

          {/* Reflective Roads */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-200">Reflective Roads (%)</span>
              <span className="text-[#4DA3FF]">{reflectiveRoads}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={reflectiveRoads}
              onChange={(e) => setReflectiveRoads(Number(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#4DA3FF]"
            />
          </div>

          {/* Water Bodies */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-200">Water Bodies (%)</span>
              <span className="text-cyan-400">{waterBodies}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={waterBodies}
              onChange={(e) => setWaterBodies(Number(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Live Results Cards */}
      <div className="grid grid-cols-3 gap-2 my-4 pt-3 border-t border-white/10 font-space text-center">
        <div className="bg-[#07111F]/80 p-2.5 rounded-xl border border-[#32D583]/30 shadow-sm">
          <span className="text-[9px] text-slate-400 uppercase block font-bold">Predicted Temp</span>
          <span className="text-xl xl:text-2xl font-black text-white block mt-0.5">{results.predictedTemp}°C</span>
          <span className="text-[10px] font-bold text-[#32D583] flex items-center justify-center mt-0.5">
            <FiTrendingDown className="mr-0.5" /> -{results.totalReduction}°C
          </span>
        </div>

        <div className="bg-[#07111F]/80 p-2.5 rounded-xl border border-[#FF4D4F]/30 shadow-sm">
          <span className="text-[9px] text-slate-400 uppercase block font-bold">Heat Index</span>
          <span className="text-xl xl:text-2xl font-black text-[#FF8A00] block mt-0.5">{results.predHeatIndex}°C</span>
          <span className="text-[10px] font-bold text-[#FF4D4F] block mt-0.5">Apparent</span>
        </div>

        <div className="bg-[#07111F]/80 p-2.5 rounded-xl border border-[#4DA3FF]/30 shadow-sm">
          <span className="text-[9px] text-slate-400 uppercase block font-bold">Efficiency</span>
          <span className="text-xl xl:text-2xl font-black text-[#4DA3FF] block mt-0.5">{results.efficiency}%</span>
          <span className="text-[10px] font-bold text-[#4DA3FF] block mt-0.5">Optimal</span>
        </div>
      </div>

      <button
        onClick={() => onSelectTab('scenario-simulator')}
        className="w-full py-3 rounded-xl bg-white/10 hover:bg-[#4DA3FF]/20 text-white font-space font-extrabold text-xs transition border border-white/10 hover:border-[#4DA3FF] flex items-center justify-center space-x-1.5"
      >
        <span>Launch Full Scenario Sandbox</span>
        <FiArrowRight />
      </button>
    </div>
  );
};
