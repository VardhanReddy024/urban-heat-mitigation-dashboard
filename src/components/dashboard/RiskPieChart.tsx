import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { RISK_DISTRIBUTION } from '../../data/sampleData';
import { FiPieChart, FiAlertCircle } from 'react-icons/fi';

export const RiskPieChart: React.FC = () => {
  const topCriticalCities = [
    { city: 'Delhi NCR', heatIndex: '51.2°C', risk: 'Critical', color: '#FF4D4F' },
    { city: 'Ahmedabad', heatIndex: '49.8°C', risk: 'Critical', color: '#FF8A00' },
    { city: 'Chennai', heatIndex: '50.6°C', risk: 'High', color: '#4DA3FF' },
    { city: 'Hyderabad', heatIndex: '47.4°C', risk: 'High', color: '#F59E0B' }
  ];

  return (
    <div className="glass-card p-6 flex flex-col justify-between h-full border border-white/10 hover:border-[#FF8A00]/40 transition-all duration-300 bg-gradient-to-b from-[#0D1E36]/70 to-[#07111F]/90">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg xl:text-xl font-extrabold font-space tracking-tight text-white flex items-center">
              <FiPieChart className="mr-2 text-[#4DA3FF]" /> Risk Distribution
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#FF4D4F]/15 text-[#FF4D4F] border border-[#FF4D4F]/30 text-[11px] font-space font-bold">
            Live Severity
          </span>
        </div>
        <p className="text-xs text-[#4DA3FF] font-medium">
          Doughnut breakdown of thermal risk categories across monitored urban wards
        </p>
      </div>

      {/* Doughnut Chart */}
      <div className="w-full h-48 xl:h-52 relative flex items-center justify-center my-3">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={RISK_DISTRIBUTION}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={78}
              paddingAngle={6}
              dataKey="value"
              animationBegin={100}
              animationDuration={1400}
            >
              {RISK_DISTRIBUTION.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color === '#EF4444' ? '#FF4D4F' : entry.color === '#FF7A00' ? '#FF8A00' : entry.color === '#F59E0B' ? '#4DA3FF' : '#32D583'}
                  stroke="#07111F"
                  strokeWidth={3}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#07111F',
                borderColor: '#4DA3FF',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.9)',
                fontFamily: 'Space Grotesk, sans-serif'
              }}
              formatter={(val: any) => [`${val}% of zones`, 'Share']}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl xl:text-3xl font-black font-space text-white">52%</span>
          <span className="text-[10px] font-space font-bold text-[#FF4D4F] uppercase tracking-wider">Critical</span>
        </div>
      </div>

      {/* Professional Legends */}
      <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10 text-xs font-space">
        {RISK_DISTRIBUTION.map((item) => {
          const color = item.color === '#EF4444' ? '#FF4D4F' : item.color === '#FF7A00' ? '#FF8A00' : item.color === '#F59E0B' ? '#4DA3FF' : '#32D583';
          return (
            <div key={item.name} className="flex items-center space-x-2 bg-white/5 px-2 py-1.5 rounded-lg">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }} />
              <span className="text-slate-200 font-bold truncate text-[11px]">{item.name.split(' ')[0]} ({item.value}%)</span>
            </div>
          );
        })}
      </div>

      {/* Top Critical Cities + Heat Index values */}
      <div className="pt-3 space-y-2">
        <span className="text-[11px] font-space font-extrabold uppercase tracking-widest text-[#FF8A00] flex items-center">
          <FiAlertCircle className="mr-1.5 text-[#FF4D4F]" /> Top Critical Cities
        </span>
        <div className="space-y-1.5">
          {topCriticalCities.map((c) => (
            <div key={c.city} className="flex items-center justify-between text-xs font-space bg-[#07111F]/60 px-3 py-1.5 rounded-xl border border-white/5 hover:border-white/20 transition">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.color, boxShadow: `0 0 6px ${c.color}` }} />
                <span className="font-bold text-slate-200">{c.city}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 text-[10px]">HI:</span>
                <span className="font-black text-white px-1.5 py-0.5 rounded bg-white/10">{c.heatIndex}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
