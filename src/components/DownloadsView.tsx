import React from 'react';
import { DownloadJob } from '../types';
import { Download, Pause, Play, X, Trash2, FolderOpen, CheckCircle2 } from 'lucide-react';

interface DownloadsViewProps {
  activeDownloads: DownloadJob[];
  onPauseJob: (jobId: string) => void;
  onResumeJob: (jobId: string) => void;
  onCancelJob: (jobId: string) => void;
  onClearCompleted: () => void;
  onCancelAll: () => void;
  onPauseAll: () => void;
  onTriggerDownload: (title: string, format: string) => void;
}

export const DownloadsView: React.FC<DownloadsViewProps> = ({
  activeDownloads,
  onPauseJob,
  onResumeJob,
  onCancelJob,
  onClearCompleted,
  onCancelAll,
  onPauseAll,
  onTriggerDownload
}) => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Active Downloads</h2>
          <p className="text-xs text-slate-400 mt-1">Manage, pause, cancel or inspect live yt-dlp & FFmpeg jobs.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onCancelAll}
            className="px-4 py-2 bg-[#1b1b26] hover:bg-red-500/10 hover:text-red-400 text-slate-300 font-medium text-xs rounded-xl border border-[#2b2b3d] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Cancel All</span>
          </button>
          <button
            onClick={onPauseAll}
            className="px-4 py-2 bg-[#1b1b26] hover:bg-indigo-500/10 hover:text-indigo-400 text-slate-300 font-medium text-xs rounded-xl border border-[#2b2b3d] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Pause className="w-3.5 h-3.5" />
            <span>Pause All</span>
          </button>
          <button
            onClick={onClearCompleted}
            className="px-4 py-2 bg-[#1b1b26] hover:bg-emerald-500/10 hover:text-emerald-400 text-slate-300 font-medium text-xs rounded-xl border border-[#2b2b3d] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Completed</span>
          </button>
        </div>
      </div>

      {/* Downloads List */}
      <div className="bg-[#16161f] border border-[#222232] rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-[#222232] pb-4">
          <div className="flex items-center gap-2.5">
            <Download className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Active Queue ({activeDownloads.length})</h3>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Speed: 7.3 MB/s total
          </div>
        </div>

        {activeDownloads.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-white">No active downloads</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">All download tasks have finished successfully or the queue is currently empty.</p>
            <div className="pt-2">
              <button
                onClick={() => onTriggerDownload('Sample Video Demonstration', 'mp4')}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl transition-all shadow-md shadow-indigo-600/30 inline-flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Test Instant Sample Download</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {activeDownloads.map((job) => (
              <div
                key={job.job_id}
                className="bg-[#1b1b26] border border-[#28283a] rounded-2xl p-4 flex items-center gap-5 hover:border-indigo-500/40 transition-all"
              >
                {/* Thumbnail */}
                <div className="w-24 h-14 rounded-xl overflow-hidden bg-black shrink-0 relative">
                  <img
                    src={job.thumbnail}
                    alt={job.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Details & Progress */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="text-sm font-bold text-white truncate">{job.title}</h4>
                    <div className="flex items-center gap-2 text-xs font-mono shrink-0">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{job.resolution}</span>
                      <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">{job.format}</span>
                      <span className="text-slate-400">{job.fileSize}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="w-full bg-[#252536] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-0.5">
                      <div className="flex items-center gap-3">
                        <span className="text-indigo-400 font-bold">{job.progress}%</span>
                        <span>{job.speed}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span>ETA {job.eta}</span>
                        <button
                          onClick={() => onTriggerDownload(job.title, job.format)}
                          className="text-indigo-400 hover:text-indigo-300 font-medium underline cursor-pointer"
                        >
                          Download Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  {job.status === 'downloading' ? (
                    <button
                      onClick={() => onPauseJob(job.job_id)}
                      className="w-9 h-9 rounded-xl bg-[#232333] hover:bg-[#2d2d42] text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                      title="Pause Download"
                    >
                      <Pause className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onResumeJob(job.job_id)}
                      className="w-9 h-9 rounded-xl bg-[#232333] hover:bg-[#2d2d42] text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                      title="Resume Download"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => onCancelJob(job.job_id)}
                    className="w-9 h-9 rounded-xl bg-[#232333] hover:bg-red-500/20 text-slate-300 hover:text-red-400 flex items-center justify-center transition-colors cursor-pointer"
                    title="Cancel Download"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
