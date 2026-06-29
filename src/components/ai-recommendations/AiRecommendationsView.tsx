import React, { useState } from 'react';
import { HOTSPOTS } from '../../data/sampleData';
import { Badge } from '../common/Badge';
import { NavTab } from '../../types';
import {
  FiCpu,
  FiAlertTriangle,
  FiGrid,
  FiSun,
  FiWind,
  FiDroplet,
  FiCheckCircle,
  FiArrowRight,
  FiZap,
  FiInfo,
  FiTrendingDown,
  FiShield
} from 'react-icons/fi';

interface AiRecommendationsViewProps {
  selectedCity: string;
  onSelectCity: (city: string) => void;
  onSelectTab: (tab: NavTab) => void;
}

export const AiRecommendationsView: React.FC<AiRecommendationsViewProps> = ({
  selectedCity,
  onSelectCity,
  onSelectTab
}) => {
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const currentHotspot = HOTSPOTS.find((h) => h.city.toLowerCase() === selectedCity.toLowerCase()) || HOTSPOTS[0];

  const handleCitySwitch = (city: string) => {
    setIsSynthesizing(true);
    onSelectCity(city);
    setTimeout(() => {
      setIsSynthesizing(false);
    }, 600);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* City Selector Header */}
      <div className="glass-card rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/10 shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-[#FF7A00]/20 text-[#FF7A00]">
              <FiCpu className="w-5 h-5 animate-pulse" />
            </span>
            <h2 className="text-2xl font-bold font-space text-white tracking-tight">
              Explainable AI (XAI) Recommendation Engine
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulating deep learning feature attribution (SHAP values) derived from ISRO Earth Observation imagery
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-xs font-space font-semibold text-slate-400">Select City:</span>
          <div className="flex flex-wrap gap-1.5 glass-panel p-1.5 rounded-xl border border-white/10">
            {HOTSPOTS.map((h) => (
              <button
                key={h.id}
                onClick={() => handleCitySwitch(h.city)}
                className={`px-3 py-1.5 rounded-lg text-xs font-space font-semibold transition ${
                  currentHotspot.city === h.city
                    ? 'bg-gradient-to-r from-[#FF7A00] to-amber-600 text-[#081229] shadow-md scale-105'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {h.city}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isSynthesizing ? (
        <div className="glass-card rounded-2xl p-16 flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full border-4 border-[#FF7A00]/30 border-t-[#FF7A00] animate-spin" />
          <h3 className="font-space font-bold text-lg text-white">Synthesizing Satellite &amp; Climatological Data...</h3>
          <p className="text-xs text-slate-400">Running Explainable AI inference for {selectedCity}</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Main City Summary & Heat Score Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Heat Score Display Card */}
            <div className="glass-card rounded-2xl p-6 flex flex-col justify-between border-t-4 border-[#FF7A00] relative overflow-hidden bg-gradient-to-b from-[#0d1b3a] to-[#081229]">
              <div className="absolute right-0 top-0 w-32 h-32 bg-[#FF7A00]/10 rounded-full blur-3xl pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-space uppercase font-bold tracking-wider text-slate-400">
                    City Assessment
                  </span>
                  <Badge risk={currentHotspot.riskLevel} />
                </div>
                <h3 className="text-3xl font-extrabold font-space text-white mt-1">
                  {currentHotspot.city}
                </h3>
                <span className="text-xs text-slate-400 block">{currentHotspot.state}</span>
              </div>

              <div className="my-6 text-center py-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-xs font-space text-slate-400 uppercase tracking-widest block font-semibold mb-1">
                  AI Heat Score
                </span>
                <div className="flex items-baseline justify-center">
                  <span className={`text-6xl font-black font-space tracking-tighter ${
                    currentHotspot.heatScore >= 85 ? 'text-red-500' :
                    currentHotspot.heatScore >= 75 ? 'text-[#FF7A00]' : 'text-amber-400'
                  }`}>
                    {currentHotspot.heatScore}
                  </span>
                  <span className="text-xl font-bold font-space text-slate-400 ml-1">/100</span>
                </div>
                <span className="text-[11px] font-space font-medium text-red-400 mt-1 inline-flex items-center">
                  <FiAlertTriangle className="mr-1" /> Severe Urban Heat Island Intensity
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 font-space pt-2 border-t border-white/10">
                <span>Expected AI Reduction:</span>
                <span className="text-emerald-400 font-extrabold text-sm flex items-center">
                  <FiTrendingDown className="mr-1" /> 2.0 – 3.2°C
                </span>
              </div>
            </div>

            {/* Environmental & Built-up Metrics Grid */}
            <div className="lg:col-span-2 glass-card rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold font-space text-white mb-4 flex items-center">
                  <FiZap className="mr-2 text-[#FF7A00]" /> Climatological &amp; Urban Morphology Metrics
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center text-slate-400 mb-1 text-xs font-space font-semibold">
                      <FiGrid className="mr-1.5 text-red-400" /> Concrete %
                    </div>
                    <span className="text-2xl font-bold font-space text-white">{currentHotspot.concretePercent}%</span>
                    <span className="text-[10px] text-red-400 block mt-0.5">Impervious Built-up</span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center text-slate-400 mb-1 text-xs font-space font-semibold">
                      <FiSun className="mr-1.5 text-emerald-400" /> Tree Cover %
                    </div>
                    <span className="text-2xl font-bold font-space text-white">{currentHotspot.treeCoverPercent}%</span>
                    <span className="text-[10px] text-emerald-400 block mt-0.5">Green Canopy Deficit</span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center text-slate-400 mb-1 text-xs font-space font-semibold">
                      <FiZap className="mr-1.5 text-amber-400" /> Traffic Density
                    </div>
                    <span className="text-sm font-bold font-space text-white truncate block">{currentHotspot.trafficDensity.split(' ')[0]}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5 truncate">{currentHotspot.trafficDensity}</span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center text-slate-400 mb-1 text-xs font-space font-semibold">
                      <FiDroplet className="mr-1.5 text-blue-400" /> Relative Humidity
                    </div>
                    <span className="text-2xl font-bold font-space text-white">{currentHotspot.humidity}%</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Moisture Retention</span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center text-slate-400 mb-1 text-xs font-space font-semibold">
                      <FiWind className="mr-1.5 text-cyan-400" /> Wind Speed
                    </div>
                    <span className="text-2xl font-bold font-space text-white">{currentHotspot.windSpeed} <span className="text-xs font-normal">km/h</span></span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Thermal Dissipation</span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center text-slate-400 mb-1 text-xs font-space font-semibold">
                      <FiShield className="mr-1.5 text-[#FF7A00]" /> LST Peak
                    </div>
                    <span className="text-2xl font-bold font-space text-[#FF7A00]">{currentHotspot.temperature}°C</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Apparent HI: {currentHotspot.heatIndex}°C</span>
                  </div>
                </div>
              </div>

              {/* Explainable AI SHAP values breakdown */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <span className="text-xs font-space font-bold uppercase tracking-wider text-slate-400 flex items-center mb-2">
                  <FiInfo className="mr-1.5 text-[#FF7A00]" /> Explainable AI (SHAP) Factor Attribution
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {currentHotspot.shapFactors.map((sf, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs bg-white/5 px-3 py-2 rounded-lg">
                      <span className="text-slate-300 truncate max-w-[200px]" title={sf.factor}>{sf.factor}</span>
                      <span className={`font-space font-bold ${sf.impact === 'negative' ? 'text-red-400' : 'text-emerald-400'}`}>
                        {sf.impact === 'negative' ? '+' : '-'}{sf.contribution}% score weight
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Root Causes Box */}
          <div className="glass-card rounded-2xl p-6 border-l-4 border-red-500 bg-red-500/5">
            <h4 className="text-base font-bold font-space text-white flex items-center mb-3">
              <FiAlertTriangle className="mr-2 text-red-400" /> Identified Root Causes of Thermal Anomaly
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentHotspot.rootCauses.map((cause, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                  <span className="leading-relaxed">{cause}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Generated AI Recommendations */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-xl font-bold font-space text-white">
                  AI-Generated Cooling Recommendations
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Actionable municipal interventions ordered by thermal reduction efficiency
                </p>
              </div>
              <button
                onClick={() => onSelectTab('scenario-simulator')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF7A00] to-amber-600 text-[#081229] font-space font-bold text-xs shadow-lg hover:scale-[1.02] transition flex items-center self-start sm:self-auto"
              >
                <span>Simulate in Scenario Simulator</span>
                <FiArrowRight className="ml-1.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentHotspot.recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-white/10 hover:border-[#FF7A00]/40 transition group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF7A00]/5 rounded-bl-full pointer-events-none group-hover:bg-[#FF7A00]/10 transition" />

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 rounded text-[10px] font-space font-bold uppercase tracking-wider bg-[#FF7A00]/15 text-[#FF7A00] border border-[#FF7A00]/30">
                        {rec.category} Strategy
                      </span>
                      <span className="text-xs font-space font-bold text-emerald-400 flex items-center bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        <FiTrendingDown className="mr-1" /> Expected reduction: {rec.expectedTempReduction}
                      </span>
                    </div>

                    <h4 className="text-base font-bold font-space text-white mb-2 leading-snug group-hover:text-[#FF7A00] transition-colors">
                      {rec.action}
                    </h4>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-xs font-space">
                    <div className="bg-white/5 p-2 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Est. Cost</span>
                      <span className="font-bold text-white">{rec.costEstimate}</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Timeline</span>
                      <span className="font-bold text-white">{rec.timeline}</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Feasibility</span>
                      <span className="font-bold text-emerald-400">{rec.feasibilityScore}%</span>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => onSelectTab('scenario-simulator')}
                      className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-space font-bold text-xs transition flex items-center justify-center space-x-1"
                    >
                      <span>Simulate Strategy</span>
                      <FiArrowRight />
                    </button>
                    <button
                      onClick={() => onSelectTab('reports')}
                      className="py-2 px-3 rounded-xl bg-[#FF7A00]/20 hover:bg-[#FF7A00]/30 text-[#FF7A00] font-space font-bold text-xs transition flex items-center space-x-1"
                    >
                      <FiCheckCircle />
                      <span>Add to Report</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
