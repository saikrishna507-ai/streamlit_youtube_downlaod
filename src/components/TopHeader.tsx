import React, { useState } from 'react';
import { Link2, Search, X, Sun, Globe, User } from 'lucide-react';

interface TopHeaderProps {
  urlInput: string;
  setUrlInput: (val: string) => void;
  onExtract: (url: string) => void;
  isLoading: boolean;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ urlInput, setUrlInput, onExtract, isLoading }) => {
  const [isThemeDark, setIsThemeDark] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onExtract(urlInput.trim());
    }
  };

  const handleQuickPaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrlInput(text);
      }
    } catch {
      // Fallback if clipboard permission is denied
    }
  };

  return (
    <header className="h-20 bg-[#14141c]/80 backdrop-blur-md border-b border-[#222232] px-8 flex items-center justify-between sticky top-0 z-30">
      {/* URL Input Form */}
      <form onSubmit={handleSubmit} className="flex-1 max-w-3xl mr-6">
        <div className="relative flex items-center">
          <div className="absolute left-4 text-slate-400">
            <Link2 className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Paste YouTube URL to get started... (e.g. https://www.youtube.com/watch?v=...)"
            className="w-full bg-[#1b1b26] text-slate-200 placeholder-slate-500 text-sm rounded-xl pl-11 pr-28 py-3.5 border border-[#2d2d3f] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-inner"
          />
          {urlInput && (
            <button
              type="button"
              onClick={() => setUrlInput('')}
              className="absolute right-36 text-slate-400 hover:text-slate-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading || !urlInput.trim()}
            className="absolute right-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-medium text-xs rounded-lg transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Search className="w-3.5 h-3.5" />
            )}
            <span>Get Video Details</span>
          </button>
        </div>
      </form>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsThemeDark(!isThemeDark)}
          className="w-10 h-10 rounded-xl bg-[#1b1b26] border border-[#2d2d3f] flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-all"
          title="Toggle Theme"
        >
          <Sun className="w-4 h-4" />
        </button>
        <button
          onClick={handleQuickPaste}
          className="w-10 h-10 rounded-xl bg-[#1b1b26] border border-[#2d2d3f] flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-all"
          title="Network & Globe Status"
        >
          <Globe className="w-4 h-4" />
        </button>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-md shadow-indigo-500/20">
          <User className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
};
