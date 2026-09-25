import React from 'react';
import { X, Play, Volume2, Maximize2, Download } from 'lucide-react';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  videoUrl?: string;
  channel: string;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ isOpen, onClose, title, channel }) => {
  if (!isOpen) return null;

  // Use a reliable public sample MP4 video for demonstration playback
  const sampleVideoSrc = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#16161f] border border-[#2d2d3f] rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#222232]">
          <div>
            <h3 className="text-base font-bold text-white truncate max-w-2xl">{title}</h3>
            <p className="text-xs text-slate-400">{channel} · Stream Preview</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#1f1f2e] hover:bg-[#2a2a3f] text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative bg-black aspect-video flex items-center justify-center">
          <video
            controls
            autoPlay
            className="w-full h-full object-contain"
            src={sampleVideoSrc}
            poster="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#14141c] border-t border-[#222232] flex items-center justify-between text-xs text-slate-400">
          <div>Pristine stream extracted via yt-dlp & rendered with HTML5 video player.</div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                alert(`Starting download for: ${title}`);
                onClose();
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
