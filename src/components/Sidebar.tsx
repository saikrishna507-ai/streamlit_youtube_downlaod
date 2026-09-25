import React from 'react';
import { Home, Download, History, Settings, PlaySquare, CheckCircle2, HardDrive, Terminal } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeDownloadsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, activeDownloadsCount }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, description: 'Download videos & audio' },
    { id: 'downloads', label: 'Downloads', icon: Download, description: 'Manage active downloads', badge: activeDownloadsCount },
    { id: 'history', label: 'History', icon: History, description: 'Browse past downloads' },
    { id: 'settings', label: 'Settings', icon: Settings, description: 'Preferences & tools' },
  ];

  return (
    <aside className="w-64 bg-[#14141c] border-r border-[#222232] flex flex-col justify-between shrink-0 select-none">
      <div>
        {/* Brand Header */}
        <div className="p-6 flex items-center gap-3 border-b border-[#222232]">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <PlaySquare className="w-5 h-5 text-white fill-white/20" />
          </div>
          <div>
            <h1 className="font-bold text-white tracking-tight text-lg">TubeGrab</h1>
            <p className="text-xs text-slate-400">Download. Save. Enjoy.</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 group text-left ${
                  isActive
                    ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#1b1b26]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                  <div>
                    <div className="text-sm font-medium leading-tight">{item.label}</div>
                    <div className="text-[11px] text-slate-500 leading-normal mt-0.5">{item.description}</div>
                  </div>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-500 text-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / System Status & Storage */}
      <div className="p-4 border-t border-[#222232] space-y-4">
        {/* System Status Box */}
        <div className="bg-[#191924] rounded-xl p-3.5 border border-[#262638] space-y-2.5">
          <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>System Status</span>
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span>yt-dlp</span>
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Available
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>FFmpeg</span>
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Available
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>JavaScript Runtime</span>
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Available
              </span>
            </div>
          </div>
        </div>

        {/* Storage Widget */}
        <div className="bg-[#191924] rounded-xl p-3.5 border border-[#262638] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-indigo-400" /> Storage
            </span>
            <span className="text-slate-400 font-mono">12.4 GB / 500 GB</span>
          </div>
          <div className="w-full bg-[#262638] h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full" style={{ width: '2.5%' }}></div>
          </div>
        </div>

        {/* Version & Credits */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
          <span>Open Source</span>
          <span className="font-mono">v1.0.0</span>
        </div>
      </div>
    </aside>
  );
};
