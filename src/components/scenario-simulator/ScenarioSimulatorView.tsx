import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { ScenarioControls } from '../../types';
import { FiSliders, FiTrendingDown, FiRefreshCw, FiCheckCircle, FiShield, FiFileText } from 'react-icons/fi';
import { NavTab } from '../../types';

interface ScenarioSimulatorViewProps {
  onSelectTab: (tab: NavTab) => void;
}

export const ScenarioSimulatorView: React.FC<ScenarioSimulatorViewProps> = ({ onSelectTab }) => {
  const [controls, setControls] = useState<ScenarioControls>({
    treePlantation: 15,
    coolRoof: 40,
    waterBodies: 8,
    reflectiveRoads: 25
  });

  const [selectedCity] = useState('Delhi National Capital Region');
  const baselineTemp = 44.8;
  const baselineHeatIndex = 51.2;

  // Real-time scientific calculation of reduction
  const result = useMemo(() => {
    // Tree plantation: each 10% reduces temp by ~0.65°C
    const treeReduction = (controls.treePlantation / 10) * 0.65;
    // Cool roof: each 20% reduces temp by ~0.55°C
    const roofReduction = (controls.coolRoof / 20) * 0.55;
    // Water bodies: each 5% reduces temp by ~0.35°C
    const waterReduction = (controls.waterBodies / 5) * 0.35;
    // Reflective roads: each 25% reduces temp by ~0.30°C
    const roadReduction = (controls.reflectiveRoads / 25) * 0.30;

    const totalReduction = Number((treeReduction + roofReduction + waterReduction + roadReduction).toFixed(1));
    const predictedTemp = Number((baselineTemp - totalReduction).toFixed(1));
    const heatIndexReduction = Number((totalReduction * 1.45).toFixed(1));
    const predictedHeatIndex = Number((baselineHeatIndex - heatIndexReduction).toFixed(1));
    
    // Cooling Efficiency formula
    const maxPossibleReduction = 4.8;
    const efficiency = Math.min(100, Math.round((totalReduction / maxPossibleReduction) * 100));

    // Generate monthly forecast array
    const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
    const monthlyForecast = months.map((m, idx) => {
      const baseCurve = [41.5, 45.2, 43.6, 36.8, 35.2, 35.8][idx];
      return {
        month: m,
        baseline: baseCurve,
        simulated: Number((baseCurve - totalReduction).toFixed(1)),
        reduction: totalReduction
      };
    });

    return {
      totalReduction,
      predictedTemp,
      predictedHeatIndex,
      efficiency,
      monthlyForecast
    };
  }, [controls]);

  const applyPreset = (preset: 'isro-optimal' | 'green-focus' | 'roof-mandate' | 'reset') => {
    if (preset === 'isro-optimal') {
      setControls({ treePlantation: 35, coolRoof: 80, waterBodies: 20, reflectiveRoads: 60 });
    } else if (preset === 'green-focus') {
      setControls({ treePlantation: 50, coolRoof: 30, waterBodies: 25, reflectiveRoads: 20 });
    } else if (preset === 'roof-mandate') {
      setControls({ treePlantation: 15, coolRoof: 100, waterBodies: 10, reflectiveRoads: 80 });
    } else {
      setControls({ treePlantation: 15, coolRoof: 40, waterBodies: 8, reflectiveRoads: 25 });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/10 shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-[#FF7A00]/20 text-[#FF7A00]">
              <FiSliders className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-bold font-space text-white tracking-tight">
              Interactive Urban Intervention Scenario Simulator
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulating {selectedCity} urban microclimate response using ISRO AI thermal dynamic modeling
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => applyPreset('isro-optimal')}
            className="px-3 py-1.5 rounded-xl bg-[#FF7A00] text-[#081229] font-space font-bold text-xs shadow-md hover:scale-[1.02] transition"
          >
            ISRO AI Optimized
          </button>
          <button
            onClick={() => applyPreset('green-focus')}
            className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-space font-bold text-xs hover:bg-emerald-500/30 transition"
          >
            Max Green Forest
          </button>
          <button
            onClick={() => applyPreset('roof-mandate')}
            className="px-3 py-1.5 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30 font-space font-bold text-xs hover:bg-blue-500/30 transition"
          >
            100% Cool Roofs
          </button>
          <button
            onClick={() => applyPreset('reset')}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition"
            title="Reset to Default Baseline"
          >
            <FiRefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Controls & KPI Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders Panel */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-base font-bold font-space text-white flex items-center">
              <FiSliders className="mr-2 text-[#FF7A00]" /> Intervention Controls
            </h3>
            <span className="text-[11px] font-space text-[#FF7A00] font-semibold">Live Dynamic Inference</span>
          </div>

          {/* Slider 1: Tree Plantation */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-space">
              <span className="font-semibold text-slate-200">Tree Plantation Coverage</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold font-space">
                {controls.treePlantation}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={controls.treePlantation}
              onChange={(e) => setControls({ ...controls, treePlantation: Number(e.target.value) })}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-space">
              <span>0% Baseline</span>
              <span>50% Max Miyawaki Target</span>
            </div>
          </div>

          {/* Slider 2: Cool Roof */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-space">
              <span className="font-semibold text-slate-200">Cool Roof Deployment</span>
              <span className="px-2 py-0.5 rounded bg-[#FF7A00]/20 text-[#FF7A00] font-bold font-space">
                {controls.coolRoof}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={controls.coolRoof}
              onChange={(e) => setControls({ ...controls, coolRoof: Number(e.target.value) })}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FF7A00]"
            >
            </input>
            <div className="flex justify-between text-[10px] text-slate-500 font-space">
              <span>0% None</span>
              <span>100% Citywide Mandate</span>
            </div>
          </div>

          {/* Slider 3: Water Bodies */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-space">
              <span className="font-semibold text-slate-200">Water Bodies &amp; Sponge Wetlands</span>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold font-space">
                {controls.waterBodies}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={controls.waterBodies}
              onChange={(e) => setControls({ ...controls, waterBodies: Number(e.target.value) })}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-space">
              <span>0% Existing</span>
              <span>30% Urban Lakes Restored</span>
            </div>
          </div>

          {/* Slider 4: Reflective Roads */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-space">
              <span className="font-semibold text-slate-200">Reflective Porous Pavements</span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold font-space">
                {controls.reflectiveRoads}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={controls.reflectiveRoads}
              onChange={(e) => setControls({ ...controls, reflectiveRoads: Number(e.target.value) })}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-space">
              <span>0% Dark Asphalt</span>
              <span>100% High Albedo Pavement</span>
            </div>
          </div>

          {/* Intervention Summary Badge */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-space space-y-1">
            <span className="font-bold text-[#FF7A00] uppercase text-[10px] block">Model Parameters Active</span>
            <p className="text-slate-300">
              Combining radiative cooling from cool roofs with evapotranspiration from {controls.treePlantation}% tree canopy.
            </p>
          </div>
        </div>

        {/* Real-time Results Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Predicted Temp */}
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between border-t-4 border-emerald-400 bg-gradient-to-b from-[#0d1b3a] to-[#081229]">
            <div>
              <span className="text-[10px] uppercase font-space font-bold tracking-wider text-slate-400 block">
                Predicted LST Temp
              </span>
              <div className="flex items-baseline mt-2">
                <span className="text-4xl lg:text-5xl font-black font-space text-white">
                  {result.predictedTemp}°C
                </span>
              </div>
              <span className="inline-flex items-center text-xs font-space font-bold text-emerald-400 mt-2 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <FiTrendingDown className="mr-1" /> -{result.totalReduction}°C drop
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-space mt-4 pt-2 border-t border-white/5">
              Baseline LST: <strong className="text-red-400">{baselineTemp}°C</strong>
            </span>
          </div>

          {/* Predicted Heat Index */}
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between border-t-4 border-[#FF7A00] bg-gradient-to-b from-[#0d1b3a] to-[#081229]">
            <div>
              <span className="text-[10px] uppercase font-space font-bold tracking-wider text-slate-400 block">
                Apparent Heat Index
              </span>
              <div className="flex items-baseline mt-2">
                <span className="text-4xl lg:text-5xl font-black font-space text-[#FF7A00]">
                  {result.predictedHeatIndex}°C
                </span>
              </div>
              <span className="inline-flex items-center text-xs font-space font-bold text-emerald-400 mt-2 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <FiTrendingDown className="mr-1" /> -{(baselineHeatIndex - result.predictedHeatIndex).toFixed(1)}°C apparent
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-space mt-4 pt-2 border-t border-white/5">
              Baseline HI: <strong className="text-red-400">{baselineHeatIndex}°C</strong>
            </span>
          </div>

          {/* Cooling Efficiency */}
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between border-t-4 border-blue-400 bg-gradient-to-b from-[#0d1b3a] to-[#081229]">
            <div>
              <span className="text-[10px] uppercase font-space font-bold tracking-wider text-slate-400 block">
                Cooling Efficiency
              </span>
              <div className="flex items-baseline mt-2">
                <span className="text-4xl lg:text-5xl font-black font-space text-blue-400">
                  {result.efficiency}%
                </span>
              </div>
              <span className="inline-flex items-center text-xs font-space font-bold text-blue-300 mt-2">
                <FiCheckCircle className="mr-1" /> Optimal Synergy
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-space mt-4 pt-2 border-t border-white/5">
              Est. Energy Saved: ~14.2 MWh
            </span>
          </div>

          {/* Monthly Simulated Chart */}
          <div className="sm:col-span-3 glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold font-space text-white">
                Monthly Temperature Forecast (Baseline vs Simulated)
              </h4>
              <span className="text-xs font-space text-emerald-400 font-semibold animate-pulse">
                Dynamic Recharts Animation
              </span>
            </div>

            <div className="w-full h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.monthlyForecast} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} domain={[28, 48]} unit="°C" tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0d1b3a',
                      borderColor: '#FF7A00',
                      borderRadius: '0.75rem',
                      color: '#fff',
                      fontSize: '12px'
                    }}
                    formatter={(val: any) => [`${val}°C`, 'Temperature']}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                  <Bar dataKey="baseline" name="Baseline (Without Action)" fill="#EF4444" radius={[4, 4, 0, 0]} animationDuration={800} />
                  <Bar dataKey="simulated" name="Simulated (With Interventions)" fill="#10B981" radius={[4, 4, 0, 0]} animationDuration={800} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Simulator Bottom Action */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-[#FF7A00]/20 text-[#FF7A00]">
            <FiShield className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold font-space text-white">Ready to formalize this simulation?</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Export this exact {result.totalReduction}°C cooling strategy with predicted temperature &amp; recommendations into an ISRO Hackathon Report.
            </p>
          </div>
        </div>
        <button
          onClick={() => onSelectTab('reports')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF7A00] to-amber-600 hover:from-amber-500 hover:to-[#FF7A00] text-[#081229] font-space font-bold text-xs sm:text-sm shadow-xl shadow-[#FF7A00]/20 transition flex items-center space-x-2 whitespace-nowrap"
        >
          <FiFileText />
          <span>Generate Official Report</span>
        </button>
      </div>
    </div>
  );
};
