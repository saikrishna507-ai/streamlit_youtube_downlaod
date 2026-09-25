import React, { useState } from 'react';
import { HistoryItem } from '../types';
import { History, Search, FolderOpen, Play, Trash2, Download } from 'lucide-react';

interface HistoryViewProps {
  history: HistoryItem[];
  onClearHistory: () => void;
  onRemoveHistoryItem: (id: string) => void;
  onPlayVideo: (item: HistoryItem) => void;
  onOpenFolderModal: () => void;
  onTriggerDownload: (title: string, format: string) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ 
  history, 
  onClearHistory, 
  onRemoveHistoryItem, 
  onPlayVideo,
  onOpenFolderModal,
  onTriggerDownload
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredHistory = history.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.channel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Download History</h2>
          <p className="text-xs text-slate-400 mt-1">Review, play, export, or download all previously completed files.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search history..."
              className="bg-[#1b1b26] text-slate-200 placeholder-slate-500 text-xs rounded-xl pl-10 pr-4 py-2.5 border border-[#2b2b3d] focus:outline-none focus:border-indigo-500 w-64"
            />
          </div>
          <button
            onClick={onClearHistory}
            className="px-4 py-2.5 bg-[#1b1b26] hover:bg-red-500/10 hover:text-red-400 text-slate-300 font-medium text-xs rounded-xl border border-[#2b2b3d] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        </div>
      </div>

      {/* History List Table */}
      <div className="bg-[#16161f] border border-[#222232] rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-[#222232] pb-4">
          <div className="flex items-center gap-2.5">
            <History className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Completed Files ({filteredHistory.length})</h3>
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto">
              <History className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-white">No history records found</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">Completed media downloads will appear here automatically.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#222232] text-slate-400 font-medium">
                  <th className="pb-3 pl-2">Media Title</th>
                  <th className="pb-3">Channel</th>
                  <th className="pb-3">Format / Res</th>
                  <th className="pb-3">File Size</th>
                  <th className="pb-3">Completed At</th>
                  <th className="pb-3 pr-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222232]">
                {filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-[#1b1b26]/60 transition-colors">
                    <td className="py-4 pl-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-16 h-10 rounded-lg object-cover bg-black shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-bold text-white line-clamp-1 max-w-xs">{item.title}</span>
                      </div>
                    </td>
                    <td className="py-4 text-slate-300">{item.channel}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-1.5 font-mono">
                        <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{item.resolution}</span>
                        <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">{item.format}</span>
                      </div>
                    </td>
                    <td className="py-4 font-mono text-slate-300">{item.fileSize}</td>
                    <td className="py-4 text-slate-400">{item.completedAt}</td>
                    <td className="py-4 pr-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onTriggerDownload(item.title, item.format)}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                          title="Download File to Device"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </button>
                        <button
                          onClick={onOpenFolderModal}
                          className="w-8 h-8 rounded-lg bg-[#1b1b26] hover:bg-[#28283a] text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                          title="Open Folder Location"
                        >
                          <FolderOpen className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onPlayVideo(item)}
                          className="w-8 h-8 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 flex items-center justify-center transition-colors cursor-pointer"
                          title="Play Media"
                        >
                          <Play className="w-3.5 h-3.5 fill-indigo-400" />
                        </button>
                        <button
                          onClick={() => onRemoveHistoryItem(item.id)}
                          className="w-8 h-8 rounded-lg bg-[#1b1b26] hover:bg-red-500/20 text-slate-400 hover:text-red-400 flex items-center justify-center transition-colors cursor-pointer"
                          title="Delete from history"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
