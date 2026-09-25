import React, { useState } from 'react';
import { X, Folder, HardDrive, Check, FolderOpen } from 'lucide-react';

interface FolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  onSelectPath: (path: string) => void;
}

export const FolderModal: React.FC<FolderModalProps> = ({ isOpen, onClose, currentPath, onSelectPath }) => {
  const [selected, setSelected] = useState<string>(currentPath);
  const [folders, setFolders] = useState<string[]>([
    'Downloads',
    'Downloads/TubeGrab',
    'Videos/Movies',
    'Desktop/Media',
    'Custom Directory...'
  ]);
  const [customInput, setCustomInput] = useState<string>('');

  if (!isOpen) return null;

  const handleSave = () => {
    onSelectPath(customInput.trim() || selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#16161f] border border-[#2d2d3f] rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#222232]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Select Download Directory</h3>
              <p className="text-xs text-slate-400">Choose where yt-dlp saves completed media files</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#1f1f2e] hover:bg-[#2a2a3f] text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300">Quick Select Folders</label>
            <div className="space-y-1.5">
              {folders.map(folder => (
                <button
                  key={folder}
                  onClick={() => {
                    setSelected(folder);
                    setCustomInput('');
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-xs transition-all cursor-pointer ${
                    selected === folder && !customInput
                      ? 'bg-indigo-600/15 border-indigo-500 text-indigo-300 font-medium'
                      : 'bg-[#1b1b26] border-[#28283a] text-slate-300 hover:bg-[#222232]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Folder className="w-4 h-4 text-indigo-400" />
                    <span className="font-mono">C:/{folder}</span>
                  </div>
                  {selected === folder && !customInput && <Check className="w-4 h-4 text-indigo-400" />}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-xs font-medium text-slate-300">Custom Path</label>
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="e.g. /home/user/Downloads or D:/Media"
              className="w-full bg-[#1b1b26] text-slate-200 text-xs rounded-xl px-3.5 py-3 border border-[#2b2b3d] focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#14141c] border-t border-[#222232] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-[#1b1b26] hover:bg-[#242433] text-slate-300 font-medium text-xs rounded-xl border border-[#2b2b3d] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
          >
            Select Directory
          </button>
        </div>
      </div>
    </div>
  );
};
