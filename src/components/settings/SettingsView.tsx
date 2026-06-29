import React from 'react';
import { AppSettings } from '../../types';
import { FiSettings, FiMoon, FiSun, FiBell, FiGlobe, FiUser, FiKey, FiShield, FiSave, FiCheckCircle } from 'react-icons/fi';

interface SettingsViewProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ settings, onUpdateSettings }) => {
  const [savedToast, setSavedToast] = React.useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto">
      {/* Settings Header */}
      <div className="glass-card rounded-2xl p-6 flex items-center justify-between border border-white/10 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-[#FF7A00]/20 text-[#FF7A00]">
            <FiSettings className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-space text-white tracking-tight">
              Platform Configuration &amp; Settings
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Customize ISRO Bhuvan satellite telemetry sync, interface theme, and notifications
            </p>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7A00] to-amber-600 hover:from-amber-500 hover:to-[#FF7A00] text-[#081229] font-space font-bold text-xs sm:text-sm shadow-xl shadow-[#FF7A00]/20 transition flex items-center space-x-2"
        >
          <FiSave />
          <span>Save Preferences</span>
        </button>
      </div>

      {savedToast && (
        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/50 bg-emerald-500/10 flex items-center justify-between animate-in slide-in-from-top-2">
          <div className="flex items-center space-x-3 text-emerald-400 font-space text-xs font-semibold">
            <FiCheckCircle className="w-5 h-5" />
            <span>Platform settings saved successfully.</span>
          </div>
        </div>
      )}

      {/* Grid of Setting Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Section */}
        <div className="glass-card rounded-2xl p-6 space-y-4 border border-white/10">
          <div className="flex items-center space-x-2 pb-3 border-b border-white/10 text-white font-space font-bold">
            <FiUser className="text-[#FF7A00]" />
            <span>Hackathon Profile</span>
          </div>

          <div className="space-y-3 text-xs font-space">
            <div>
              <label className="text-slate-400 block mb-1">Team Name</label>
              <input
                type="text"
                value={settings.teamName}
                onChange={(e) => onUpdateSettings({ ...settings, teamName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-bold outline-none focus:border-[#FF7A00]"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Project Lead</label>
              <input
                type="text"
                value={settings.profileName}
                onChange={(e) => onUpdateSettings({ ...settings, profileName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#FF7A00]"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Hackathon Registration ID</label>
              <input
                type="text"
                value={settings.hackathonId}
                disabled
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/5 text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="glass-card rounded-2xl p-6 space-y-4 border border-white/10">
          <div className="flex items-center space-x-2 pb-3 border-b border-white/10 text-white font-space font-bold">
            <FiMoon className="text-[#FF7A00]" />
            <span>Design Theme</span>
          </div>

          <div className="space-y-3">
            <div
              onClick={() => onUpdateSettings({ ...settings, theme: 'isro-dark' })}
              className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                settings.theme === 'isro-dark'
                  ? 'bg-gradient-to-r from-[#FF7A00]/20 to-transparent border-[#FF7A00] text-white'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#081229] border border-[#FF7A00]/50 flex items-center justify-center text-amber-400">
                  <FiMoon />
                </div>
                <div>
                  <h4 className="font-bold font-space text-xs">ISRO Deep Space Dark (#081229)</h4>
                  <p className="text-[10px] text-slate-400">Dark blue &amp; orange glassmorphism (Recommended)</p>
                </div>
              </div>
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${settings.theme === 'isro-dark' ? 'border-[#FF7A00] bg-[#FF7A00]' : 'border-slate-500'}`}>
                {settings.theme === 'isro-dark' && <span className="w-1.5 h-1.5 rounded-full bg-[#081229]" />}
              </div>
            </div>

            <div
              onClick={() => onUpdateSettings({ ...settings, theme: 'high-contrast' })}
              className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                settings.theme === 'high-contrast'
                  ? 'bg-gradient-to-r from-[#FF7A00]/20 to-transparent border-[#FF7A00] text-white'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-black border border-white/30 flex items-center justify-center text-white">
                  <FiSun />
                </div>
                <div>
                  <h4 className="font-bold font-space text-xs">High Contrast Command Mode</h4>
                  <p className="text-[10px] text-slate-400">Maximum contrast for projection &amp; daylight</p>
                </div>
              </div>
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${settings.theme === 'high-contrast' ? 'border-[#FF7A00] bg-[#FF7A00]' : 'border-slate-500'}`}>
                {settings.theme === 'high-contrast' && <span className="w-1.5 h-1.5 rounded-full bg-[#081229]" />}
              </div>
            </div>
          </div>
        </div>

        {/* Notification Toggle */}
        <div className="glass-card rounded-2xl p-6 space-y-4 border border-white/10">
          <div className="flex items-center space-x-2 pb-3 border-b border-white/10 text-white font-space font-bold">
            <FiBell className="text-[#FF7A00]" />
            <span>Satellite &amp; AI Notifications</span>
          </div>

          <div className="space-y-4 text-xs font-space">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Real-time LST Anomaly Alerts</span>
                <span className="text-[10px] text-slate-400">Notify when Landsat 9 detects hotspots &gt;43°C</span>
              </div>
              <button
                onClick={() => onUpdateSettings({ ...settings, notifications: !settings.notifications })}
                className={`w-11 h-6 rounded-full transition p-0.5 flex items-center ${settings.notifications ? 'bg-[#FF7A00] justify-end' : 'bg-white/10 justify-start'}`}
              >
                <span className="w-5 h-5 rounded-full bg-white shadow-md block" />
              </button>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <div>
                <span className="font-bold text-white block">Bhuvan Auto-Refresh Telemetry</span>
                <span className="text-[10px] text-slate-400">Simulate periodic Sentinel-2 NDVI raster sync</span>
              </div>
              <button
                onClick={() => onUpdateSettings({ ...settings, satelliteAutoRefresh: !settings.satelliteAutoRefresh })}
                className={`w-11 h-6 rounded-full transition p-0.5 flex items-center ${settings.satelliteAutoRefresh ? 'bg-emerald-500 justify-end' : 'bg-white/10 justify-start'}`}
              >
                <span className="w-5 h-5 rounded-full bg-white shadow-md block" />
              </button>
            </div>
          </div>
        </div>

        {/* Language Selection */}
        <div className="glass-card rounded-2xl p-6 space-y-4 border border-white/10">
          <div className="flex items-center space-x-2 pb-3 border-b border-white/10 text-white font-space font-bold">
            <FiGlobe className="text-[#FF7A00]" />
            <span>Language Selection</span>
          </div>

          <div className="space-y-2 text-xs font-space">
            <label className="text-slate-400 block mb-1">Display Language</label>
            <select
              value={settings.language}
              onChange={(e) => onUpdateSettings({ ...settings, language: e.target.value as any })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold outline-none focus:border-[#FF7A00] cursor-pointer"
            >
              <option value="English" className="bg-[#081229]">English (Primary ISRO UI)</option>
              <option value="Hindi" className="bg-[#081229]">हिन्दी / Hindi (भारतीय अंतरिक्ष अनुसंधान संगठन)</option>
              <option value="Telugu" className="bg-[#081229]">తెలుగు / Telugu (NRSC Hyderabad)</option>
              <option value="Tamil" className="bg-[#081229]">தமிழ் / Tamil (ISRO SDSC SHAR)</option>
              <option value="Kannada" className="bg-[#081229]">ಕನ್ನಡ / Kannada (ISRO HQ Bengaluru)</option>
            </select>
            <p className="text-[10px] text-slate-500 mt-2">
              Supports multilingual municipal disaster mitigation reports and local citizen alerts.
            </p>
          </div>
        </div>
      </div>

      {/* API Keys & Sentinel Mock Configuration */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <FiKey className="w-6 h-6" />
          </div>
          <div className="text-xs font-space">
            <h4 className="font-bold text-white">ISRO Bhuvan API &amp; Sentinel Data Sandbox</h4>
            <p className="text-slate-400 mt-0.5">
              Simulated API endpoints active: <code className="bg-black/30 px-1.5 py-0.5 rounded text-[#FF7A00]">https://bhuvan-app1.nrsc.gov.in/api/lst_v2</code>
            </p>
          </div>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-space font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          <FiShield className="mr-1.5" /> Hackathon Sandbox Ready
        </span>
      </div>
    </div>
  );
};
