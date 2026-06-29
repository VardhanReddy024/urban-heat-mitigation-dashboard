import React from 'react';
import { FiCpu, FiShield, FiSun, FiDroplet } from 'react-icons/fi';
import { NavTab } from '../../types';

interface RecentRecommendationsProps {
  onSelectTab: (tab: NavTab) => void;
  onSelectCity?: (city: string) => void;
}

export const RecentRecommendations: React.FC<RecentRecommendationsProps> = ({ onSelectTab, onSelectCity }) => {
  const recommendations = [
    {
      id: 'rec-tree',
      title: 'Increase Tree Cover',
      city: 'Delhi',
      priority: 'High Priority',
      impact: 'High Albedo Synergy',
      estReduction: '-2.5°C',
      benefit: 'Reduces surface UHI & improves localized thermal comfort by 35%',
      icon: <FiSun className="w-4 h-4 text-[#32D583]" />,
      accentColor: 'border-[#32D583]/40 hover:border-[#32D583]',
      tagBg: 'bg-[#32D583]/15 text-[#32D583]'
    },
    {
      id: 'rec-roof',
      title: 'Cool Roof Deployment',
      city: 'Ahmedabad',
      priority: 'Critical',
      impact: 'Direct Radiative Drop',
      estReduction: '-3.0°C',
      benefit: 'Reflects 85% of solar insolation from low-income commercial roofs',
      icon: <FiCpu className="w-4 h-4 text-[#FF8A00]" />,
      accentColor: 'border-[#FF8A00]/40 hover:border-[#FF8A00]',
      tagBg: 'bg-[#FF8A00]/15 text-[#FF8A00]'
    },
    {
      id: 'rec-road',
      title: 'Reflective Pavements',
      city: 'Hyderabad',
      priority: 'Moderate',
      impact: 'Porous Asphalt Albedo',
      estReduction: '-1.7°C',
      benefit: 'Eliminates urban canyon heat retention along IT corridor highways',
      icon: <FiShield className="w-4 h-4 text-[#4DA3FF]" />,
      accentColor: 'border-[#4DA3FF]/40 hover:border-[#4DA3FF]',
      tagBg: 'bg-[#4DA3FF]/15 text-[#4DA3FF]'
    },
    {
      id: 'rec-water',
      title: 'Water Bodies & Sponge Parks',
      city: 'Chennai',
      priority: 'High Priority',
      impact: 'Evaporative Microclimate',
      estReduction: '-2.1°C',
      benefit: 'Rejuvenates urban wetlands & dissipates trapped nocturnal humidity',
      icon: <FiDroplet className="w-4 h-4 text-cyan-400" />,
      accentColor: 'border-cyan-400/40 hover:border-cyan-400',
      tagBg: 'bg-cyan-400/15 text-cyan-400'
    }
  ];

  return (
    <div className="glass-card p-6 flex flex-col justify-between h-full border border-white/10 hover:border-[#FF8A00]/40 transition-all duration-300 bg-gradient-to-b from-[#0D1E36]/70 to-[#07111F]/90">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg xl:text-xl font-extrabold font-space tracking-tight text-white flex items-center">
              <FiCpu className="mr-2 text-[#FF8A00]" /> AI Recommendations
            </h3>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#4DA3FF]/15 text-[#4DA3FF] border border-[#4DA3FF]/30 text-[10px] font-space font-black tracking-wider uppercase flex items-center shadow-[0_0_10px_rgba(77,163,255,0.2)]">
            Explainable AI
          </span>
        </div>
        <p className="text-xs text-[#4DA3FF] font-medium mb-4">
          Actionable municipal cooling strategies synthesized via deep learning SHAP feature attribution
        </p>

        <div className="space-y-3">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              onClick={() => {
                if (onSelectCity) onSelectCity(rec.city);
                onSelectTab('ai-recommendations');
              }}
              className={`p-4 rounded-2xl bg-[#07111F]/70 border transition-all duration-300 cursor-pointer group hover:translate-x-1 hover:shadow-lg ${rec.accentColor}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                    {rec.icon}
                  </div>
                  <span className="text-sm font-space font-extrabold text-white group-hover:text-[#FF8A00] transition">
                    {rec.title}
                  </span>
                  <span className="text-[10px] font-space font-bold px-2 py-0.5 rounded bg-white/10 text-slate-300">
                    {rec.city}
                  </span>
                </div>
                <span className={`text-[10px] font-space font-black px-2 py-0.5 rounded-full ${rec.tagBg}`}>
                  {rec.priority}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-snug font-medium mb-2 pl-1">{rec.benefit}</p>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] font-space">
                <div className="flex items-center space-x-2 text-slate-400">
                  <span>Impact:</span>
                  <span className="text-white font-bold">{rec.impact}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-slate-400">Est. Reduction:</span>
                  <span className="text-[#32D583] font-black text-xs px-1.5 py-0.5 rounded bg-[#32D583]/10 border border-[#32D583]/20 shadow-[0_0_8px_rgba(50,213,131,0.2)]">
                    {rec.estReduction}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => onSelectTab('ai-recommendations')}
        className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-[#FF8A00] to-amber-600 hover:from-amber-500 hover:to-[#FF8A00] text-[#07111F] font-space font-black text-xs sm:text-sm shadow-[0_0_20px_rgba(255,138,0,0.3)] transition-all hover:scale-[1.02] flex items-center justify-center space-x-2"
      >
        <FiCpu className="stroke-[3]" />
        <span>Open Deep Learning XAI Engine</span>
      </button>
    </div>
  );
};
