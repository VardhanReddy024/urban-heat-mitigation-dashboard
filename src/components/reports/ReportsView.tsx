import React, { useState } from 'react';
import { HOTSPOTS } from '../../data/sampleData';
import { FiFileText, FiDownload, FiCheckCircle, FiPrinter, FiShare2, FiSliders } from 'react-icons/fi';
import { NavTab } from '../../types';

interface ReportsViewProps {
  onSelectTab: (tab: NavTab) => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ onSelectTab }) => {
  const [selectedCityId, setSelectedCityId] = useState('delhi');
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const cityData = HOTSPOTS.find((h) => h.id === selectedCityId) || HOTSPOTS[0];

  const handleDownloadSimulation = () => {
    setDownloading(true);
    setDownloadSuccess(false);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Controls */}
      <div className="glass-card rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/10 shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-[#FF7A00]/20 text-[#FF7A00]">
              <FiFileText className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-bold font-space text-white tracking-tight">
              Official Urban Heat Mitigation Reports
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Generate formal policy briefs combining AI predictive models with ISRO Earth Observation analytics
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onSelectTab('scenario-simulator')}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-space font-semibold text-slate-200 transition flex items-center space-x-1.5"
          >
            <FiSliders className="text-[#FF7A00]" />
            <span>Customize Scenario</span>
          </button>

          <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-space">
            <span className="text-slate-400">Target City:</span>
            <select
              value={selectedCityId}
              onChange={(e) => setSelectedCityId(e.target.value)}
              className="bg-transparent text-white outline-none font-bold cursor-pointer"
            >
              {HOTSPOTS.map((h) => (
                <option key={h.id} value={h.id} className="bg-[#081229]">{h.city}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleDownloadSimulation}
            disabled={downloading}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7A00] to-amber-600 hover:from-amber-500 hover:to-[#FF7A00] text-[#081229] font-space font-bold text-xs sm:text-sm shadow-xl shadow-[#FF7A00]/25 transition flex items-center space-x-2 disabled:opacity-50"
          >
            <FiDownload className={downloading ? 'animate-bounce' : ''} />
            <span>{downloading ? 'Generating PDF...' : 'Download Sample Report (PDF)'}</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/50 bg-emerald-500/10 flex items-center justify-between animate-in slide-in-from-top-2">
          <div className="flex items-center space-x-3">
            <FiCheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-space font-semibold text-white">
              Successfully generated <strong>{cityData.city}_Heat_Mitigation_Report_2026.pdf</strong> (2.4 MB)
            </span>
          </div>
          <button onClick={() => setDownloadSuccess(false)} className="text-xs text-slate-400 hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* PDF preview UI container */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-3 px-2 text-xs font-space">
          <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#FF7A00]/20 text-[#FF7A00] border border-[#FF7A00]/30 font-bold tracking-wider uppercase">
            PDF Preview UI Only
          </span>
          <div className="flex items-center space-x-3 text-slate-400">
            <span className="flex items-center hover:text-white cursor-pointer" onClick={handleDownloadSimulation}>
              <FiPrinter className="mr-1.5" /> Print
            </span>
            <span className="flex items-center hover:text-white cursor-pointer" onClick={handleDownloadSimulation}>
              <FiShare2 className="mr-1.5" /> Share
            </span>
          </div>
        </div>

        {/* Realistic PDF Paper UI */}
        <div className="bg-white text-slate-900 rounded-lg shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] p-8 sm:p-12 lg:p-16 border border-slate-300 relative overflow-hidden font-sans">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none transform -rotate-12">
            <span className="text-8xl lg:text-9xl font-black font-space tracking-widest text-slate-900 uppercase">
              ISRO 2026
            </span>
          </div>

          {/* Document Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-slate-900 gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#081229] text-white rounded-lg flex items-center justify-center font-space font-black text-xl">
                ISRO
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight font-space text-[#081229] uppercase">
                  Bharatiya Antariksh Hackathon 2026
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  Urban Heat Mitigation &amp; Cooling Strategy Platform
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right text-xs font-space text-slate-600">
              <p><strong>Document ID:</strong> ISRO-BAH-2026-{cityData.id.toUpperCase()}</p>
              <p><strong>Date:</strong> April 12, 2026</p>
              <p><strong>Team:</strong> Tech_Solvers</p>
            </div>
          </div>

          {/* Report Title */}
          <div className="my-8">
            <span className="text-xs font-bold tracking-widest text-[#FF7A00] uppercase font-space">
              Action Brief &amp; Satellite Evaluation
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-space text-slate-900 mt-1">
              Urban Heat Assessment &amp; AI Mitigation Blueprint: {cityData.city}
            </h1>
          </div>

          {/* Key Metrics Table / Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6 py-6 bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div>
              <span className="text-[10px] font-space uppercase text-slate-500 font-bold block">Target City</span>
              <span className="text-lg font-bold text-slate-900 font-space">{cityData.city} ({cityData.state})</span>
            </div>

            <div>
              <span className="text-[10px] font-space uppercase text-slate-500 font-bold block">Current Heat Score</span>
              <span className="text-xl font-black text-red-600 font-space">{cityData.heatScore} / 100</span>
            </div>

            <div>
              <span className="text-[10px] font-space uppercase text-slate-500 font-bold block">Predicted Temp</span>
              <span className="text-xl font-black text-emerald-600 font-space">
                {(cityData.temperature - 3.1).toFixed(1)}°C
              </span>
              <span className="text-[10px] text-slate-500 block">(-3.1°C reduction)</span>
            </div>

            <div>
              <span className="text-[10px] font-space uppercase text-slate-500 font-bold block">Risk Rating</span>
              <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-red-100 text-red-800 border border-red-300">
                {cityData.riskLevel}
              </span>
            </div>
          </div>

          {/* Executive Summary Section */}
          <div className="my-6 space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h4 className="text-sm font-bold font-space text-slate-900 uppercase border-b border-slate-200 pb-1">
              1. Executive Summary &amp; Satellite Telemetry
            </h4>
            <p>
              This technical document evaluates surface urban heat anomalies within the municipal bounds of <strong>{cityData.city}</strong> using high-resolution Landsat 9 Thermal Infrared Sensor (TIRS-2) land surface temperature (LST) datasets combined with Sentinel-2 vegetation index (NDVI) mapping.
            </p>
            <p>
              Currently exhibiting an impervious built-up concrete ratio of <strong>{cityData.concretePercent}%</strong> and a green canopy cover of only <strong>{cityData.treeCoverPercent}%</strong>, peak summer daytime LST reaches an extreme <strong>{cityData.temperature}°C</strong> with an apparent Heat Index of <strong>{cityData.heatIndex}°C</strong>.
            </p>
          </div>

          {/* Recommendations Table */}
          <div className="my-8">
            <h4 className="text-sm font-bold font-space text-slate-900 uppercase border-b border-slate-200 pb-2 mb-4">
              2. AI-Recommended Cooling Strategies
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 font-space uppercase border-b border-slate-300">
                    <th className="p-3 font-bold">Intervention Action</th>
                    <th className="p-3 font-bold">Category</th>
                    <th className="p-3 font-bold">Expected Temp Reduction</th>
                    <th className="p-3 font-bold">Timeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
                  {cityData.recommendations.map((rec) => (
                    <tr key={rec.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">{rec.action}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-space font-bold text-[10px]">
                          {rec.category}
                        </span>
                      </td>
                      <td className="p-3 text-emerald-700 font-bold">{rec.expectedTempReduction}</td>
                      <td className="p-3 text-slate-600">{rec.timeline}</td>
                    </tr>
                  ))}
                  <tr className="bg-emerald-50 text-emerald-900 font-bold">
                    <td className="p-3">Combined Synergistic Intervention</td>
                    <td className="p-3">Integrated</td>
                    <td className="p-3 text-emerald-700 text-sm">2.0 – 3.2°C cumulative</td>
                    <td className="p-3">18 Months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer of PDF page */}
          <div className="mt-16 pt-6 border-t border-slate-300 flex items-center justify-between text-[11px] text-slate-500 font-space">
            <div>
              <span>Approved by ISRO Hackathon AI Advisory Protocol</span>
            </div>
            <div>
              <span>Page 1 of 1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
