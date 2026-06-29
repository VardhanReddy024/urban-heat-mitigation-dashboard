import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { TEMPERATURE_TREND_DATA } from '../../data/sampleData';
import { FiTrendingUp, FiActivity, FiRadio } from 'react-icons/fi';

export const HeatTrendChart: React.FC = () => {
  return (
    <div className="glass-card p-6 flex flex-col justify-between h-full border border-white/10 hover:border-[#FF8A00]/40 transition-all duration-300 bg-gradient-to-b from-[#0D1E36]/70 to-[#07111F]/90">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-lg xl:text-xl font-extrabold font-space tracking-tight text-white flex items-center">
              <FiActivity className="mr-2 text-[#FF8A00]" /> Temperature Trend Chart
            </h3>
            <span className="p-1 rounded-md bg-[#FF4D4F]/20 text-[#FF4D4F] text-xs border border-[#FF4D4F]/30">
              <FiTrendingUp />
            </span>
          </div>
          <p className="text-xs text-[#4DA3FF] font-medium mt-1">
            Observed telemetry vs AI predicted surface warming curves (2019 - 2026)
          </p>
        </div>

        <div className="flex items-center space-x-4 text-xs font-space bg-[#07111F]/60 px-3.5 py-1.5 rounded-xl border border-white/10">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF8A00] shadow-[0_0_8px_#FF8A00]" />
            <span className="text-slate-200 font-bold">Observed LST</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4DA3FF] shadow-[0_0_8px_#4DA3FF]" />
            <span className="text-slate-200 font-bold">Predicted LST</span>
          </div>
        </div>
      </div>

      <div className="w-full h-64 sm:h-72 xl:h-80 flex-1 my-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={TEMPERATURE_TREND_DATA} margin={{ top: 15, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="obsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF8A00" stopOpacity={0.65} />
                <stop offset="95%" stopColor="#FF8A00" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4DA3FF" stopOpacity={0.55} />
                <stop offset="95%" stopColor="#4DA3FF" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} tickLine={false} fontStyle="bold" />
            <YAxis stroke="#94a3b8" fontSize={11} domain={[35, 45]} tickLine={false} unit="°C" fontStyle="bold" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#07111F',
                borderColor: '#FF8A00',
                borderRadius: '14px',
                color: '#fff',
                fontSize: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.9)',
                fontFamily: 'Space Grotesk, sans-serif'
              }}
              formatter={(value: any, name: any) => [
                `${value}°C`,
                name === 'observed' || name === 'avgTemp' ? 'Observed LST' : name === 'predicted' ? 'Predicted AI LST' : 'Apparent Heat Index'
              ]}
            />
            <Area
              type="monotone"
              dataKey="predicted"
              stroke="#4DA3FF"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#predGrad)"
              animationBegin={200}
              animationDuration={1500}
            />
            <Area
              type="monotone"
              dataKey="observed"
              stroke="#FF8A00"
              strokeWidth={3.5}
              fillOpacity={1}
              fill="url(#obsGrad)"
              animationBegin={0}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-slate-400 font-space gap-2">
        <span className="flex items-center text-slate-300 font-medium">
          <FiRadio className="mr-1.5 text-[#32D583] animate-pulse" /> Sentinel-3 &amp; Landsat-8 Radiometer Fusion
        </span>
        <span className="text-[#FF4D4F] font-bold">+3.6°C overall warming anomaly</span>
      </div>
    </div>
  );
};
