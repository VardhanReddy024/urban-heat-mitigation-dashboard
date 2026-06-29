import React from 'react';
import { FiActivity, FiClock, FiDatabase, FiRefreshCw } from 'react-icons/fi';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050D1A] border-t border-white/10 py-6 px-4 lg:px-8 text-slate-400 text-xs font-space relative z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Telemetry & Satellite Data Sources */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-center md:justify-start">
          <span className="text-[10px] uppercase font-space font-extrabold text-slate-400 tracking-wider flex items-center mr-1">
            <FiDatabase className="mr-1.5 text-[#FF8A00]" /> Telemetry Feeds:
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white font-semibold text-[11px] flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#32D583] mr-1.5 animate-pulse" /> ISRO Bhuvan
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[#4DA3FF] font-semibold text-[11px]">
            INSAT-3DR
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-emerald-400 font-semibold text-[11px]">
            Sentinel-2
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[#FF8A00] font-semibold text-[11px]">
            Landsat-8
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-amber-300 font-semibold text-[11px]">
            IMD
          </span>
        </div>

        {/* Center/Right: Model Accuracy | Last Updated | Next Update */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[11px] font-space justify-center">
          <div className="flex items-center space-x-1.5 text-white">
            <FiActivity className="text-[#32D583]" />
            <span className="text-slate-400">Model Accuracy:</span>
            <span className="font-extrabold text-[#32D583] bg-[#32D583]/10 px-2 py-0.5 rounded border border-[#32D583]/20">94.8%</span>
          </div>
          <div className="flex items-center space-x-1.5 text-slate-300">
            <FiClock className="text-[#4DA3FF]" />
            <span className="text-slate-400">Last Updated:</span>
            <span className="font-bold text-white">10:45 IST</span>
          </div>
          <div className="flex items-center space-x-1.5 text-slate-300">
            <FiRefreshCw className="text-[#FF8A00] animate-spin-slow" />
            <span className="text-slate-400">Next Update:</span>
            <span className="font-bold text-[#FF8A00]">11:00 IST</span>
          </div>
        </div>

        {/* Right: Copyright & Attribution */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-center md:text-right font-space">
          <span className="font-extrabold text-white tracking-wide">
            © ISRO Bharatiya Antariksh Hackathon 2026
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="text-[#FF8A00] font-bold bg-[#FF8A00]/10 px-2.5 py-1 rounded-md border border-[#FF8A00]/20">
            Built by Team Tech_Solvers
          </span>
        </div>
      </div>
    </footer>
  );
};
