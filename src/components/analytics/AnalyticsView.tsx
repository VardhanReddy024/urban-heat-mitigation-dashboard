import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { MONTHLY_HEAT_INCREASE, CORRELATION_DATA, TEMPERATURE_TREND_DATA } from '../../data/sampleData';
import { FiTrendingUp, FiActivity, FiGrid } from 'react-icons/fi';
import { NavTab } from '../../types';

interface AnalyticsViewProps {
  onSelectTab: (tab: NavTab) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ onSelectTab }) => {
  const [activeMetric, setActiveMetric] = useState<'delhi' | 'ahmedabad' | 'hyderabad' | 'all'>('all');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Analytics Header */}
      <div className="glass-card rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 border-[#FF7A00]">
        <div>
          <h2 className="text-2xl font-bold font-space text-white tracking-tight">
            Comprehensive Heat &amp; Vegetation Analytics
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Analyzing correlation between NDVI Vegetation Canopy, Impervious Urban Density, and Apparent Heat Index
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onSelectTab('scenario-simulator')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF7A00] to-amber-600 text-[#081229] font-space font-bold text-xs shadow-lg shadow-[#FF7A00]/20 hover:scale-[1.02] transition"
          >
            Test Analytics in Simulator
          </button>
        </div>
      </div>

      {/* Monthly Heat Increase Bar Chart */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold font-space text-white flex items-center">
              <FiTrendingUp className="mr-2 text-[#FF7A00]" /> Monthly Heat Increase (°C Peak Daily LST)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Seasonal surface temperature curves across India's primary urban hotspots
            </p>
          </div>

          <div className="flex items-center space-x-1 glass-panel p-1 rounded-xl border border-white/10 text-xs font-space">
            <button
              onClick={() => setActiveMetric('all')}
              className={`px-3 py-1 rounded-lg transition ${activeMetric === 'all' ? 'bg-[#FF7A00] text-[#081229] font-bold' : 'text-slate-300 hover:text-white'}`}
            >
              All Cities
            </button>
            <button
              onClick={() => setActiveMetric('delhi')}
              className={`px-3 py-1 rounded-lg transition ${activeMetric === 'delhi' ? 'bg-[#FF7A00] text-[#081229] font-bold' : 'text-slate-300 hover:text-white'}`}
            >
              Delhi
            </button>
            <button
              onClick={() => setActiveMetric('ahmedabad')}
              className={`px-3 py-1 rounded-lg transition ${activeMetric === 'ahmedabad' ? 'bg-[#FF7A00] text-[#081229] font-bold' : 'text-slate-300 hover:text-white'}`}
            >
              Ahmedabad
            </button>
            <button
              onClick={() => setActiveMetric('hyderabad')}
              className={`px-3 py-1 rounded-lg transition ${activeMetric === 'hyderabad' ? 'bg-[#FF7A00] text-[#081229] font-bold' : 'text-slate-300 hover:text-white'}`}
            >
              Hyderabad
            </button>
          </div>
        </div>

        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MONTHLY_HEAT_INCREASE} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} domain={[18, 48]} unit="°C" tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0d1b3a',
                  borderColor: '#FF7A00',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontSize: '12px'
                }}
                formatter={(value: any) => [`${value}°C`, 'Peak LST']}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              {(activeMetric === 'all' || activeMetric === 'delhi') && (
                <Line type="monotone" dataKey="delhi" name="Delhi" stroke="#EF4444" strokeWidth={3} dot={{ r: 4 }} />
              )}
              {(activeMetric === 'all' || activeMetric === 'ahmedabad') && (
                <Line type="monotone" dataKey="ahmedabad" name="Ahmedabad" stroke="#FF7A00" strokeWidth={3} dot={{ r: 4 }} />
              )}
              {(activeMetric === 'all' || activeMetric === 'hyderabad') && (
                <Line type="monotone" dataKey="hyderabad" name="Hyderabad" stroke="#3B82F6" strokeWidth={2.5} dot={{ r: 3 }} />
              )}
              {activeMetric === 'all' && (
                <Line type="monotone" dataKey="chennai" name="Chennai" stroke="#10B981" strokeWidth={2} dot={false} />
              )}
              {activeMetric === 'all' && (
                <Line type="monotone" dataKey="bengaluru" name="Bengaluru" stroke="#8B5CF6" strokeWidth={2} dot={false} />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Correlation between vegetation and temperature */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold font-space text-white flex items-center">
                <FiActivity className="mr-2 text-emerald-400" /> Vegetation Index (NDVI) vs Temperature
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Strong Negative Correlation (R² = -0.89)
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Scatter plot illustrating how higher Normalized Difference Vegetation Index (NDVI) directly mitigates surface heat.
            </p>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis
                  type="number"
                  dataKey="vegetationIndex"
                  name="NDVI"
                  unit=""
                  domain={[0, 0.8]}
                  stroke="#94a3b8"
                  fontSize={11}
                  label={{ value: 'NDVI Vegetation Index', position: 'insideBottomRight', offset: -5, fill: '#94a3b8', fontSize: 11 }}
                />
                <YAxis
                  type="number"
                  dataKey="surfaceTemp"
                  name="Surface Temp"
                  unit="°C"
                  domain={[30, 48]}
                  stroke="#94a3b8"
                  fontSize={11}
                />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{
                    backgroundColor: '#0d1b3a',
                    borderColor: '#10B981',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                  formatter={(value: any, name: any) => [
                    name === 'surfaceTemp' ? `${value}°C` : value,
                    name === 'surfaceTemp' ? 'Surface LST' : 'NDVI Index'
                  ]}
                  labelFormatter={() => ''}
                />
                <Scatter name="Urban Wards" data={CORRELATION_DATA} fill="#10B981">
                  {CORRELATION_DATA.map((entry, index) => (
                    <circle key={`circle-${index}`} r={6} fill={entry.surfaceTemp > 42 ? '#EF4444' : '#10B981'} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 font-space flex justify-between border-t border-white/5 pt-2">
            <span>Red points: Impervious concrete sectors (&gt;42°C)</span>
            <span className="text-emerald-400 font-semibold">Green points: Parks &amp; Forest buffers</span>
          </div>
        </div>

        {/* Urban Density & Heat Index Bar Comparison */}
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold font-space text-white flex items-center mb-1">
              <FiGrid className="mr-2 text-[#FF7A00]" /> Urban Density vs Apparent Heat Index
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Comparison of built-up density percentage against apparent thermal discomfort (Heat Index)
            </p>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TEMPERATURE_TREND_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} domain={[30, 52]} unit="°C" tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0d1b3a',
                    borderColor: '#FF7A00',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                  formatter={(val: any) => [`${val}°C`, 'Metric']}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="avgTemp" name="Mean LST" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="heatIndex" name="Heat Index" fill="#FF7A00" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 font-space flex justify-between border-t border-white/5 pt-2">
            <span>Urban built-up density surged by 18% since 2019</span>
            <span className="text-[#FF7A00] font-semibold">Heat Index grew faster due to trapped humidity</span>
          </div>
        </div>
      </div>

      {/* ISRO Analytics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-5 border border-white/10">
          <span className="text-[10px] font-space font-bold uppercase tracking-wider text-slate-400">Vegetation Metric</span>
          <h4 className="text-xl font-bold font-space text-white mt-1">NDVI Threshold: &gt; 0.45</h4>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Sectors maintaining an NDVI above 0.45 consistently record daytime LSTs 4.2°C cooler than adjacent concrete wards.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10">
          <span className="text-[10px] font-space font-bold uppercase tracking-wider text-slate-400">Albedo Metric</span>
          <h4 className="text-xl font-bold font-space text-white mt-1">Reflectivity Ratio: &gt; 0.38</h4>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Rooftops coated with high-albedo white elastomeric compounds reduce building thermal uptake by up to 35%.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10">
          <span className="text-[10px] font-space font-bold uppercase tracking-wider text-slate-400">Urban Density</span>
          <h4 className="text-xl font-bold font-space text-white mt-1">Impervious Ratio: &lt; 60%</h4>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Municipal zoning limiting impervious concrete coverage to under 60% preserves natural groundwater infiltration cooling.
          </p>
        </div>
      </div>
    </div>
  );
};
