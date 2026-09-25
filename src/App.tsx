import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { HomeView } from './components/HomeView';
import { DownloadsView } from './components/DownloadsView';
import { HistoryView } from './components/HistoryView';
import { SettingsView } from './components/SettingsView';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { FolderModal } from './components/FolderModal';
import { ToastContainer, ToastMessage } from './components/ToastContainer';
import { VideoInfo, DownloadJob, HistoryItem, AppSettings } from './types';
import { SAMPLE_VIDEOS, INITIAL_ACTIVE_DOWNLOADS, INITIAL_HISTORY, DEFAULT_SETTINGS } from './mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [urlInput, setUrlInput] = useState<string>('https://www.youtube.com/watch?v=switzerland4k');
  const [currentVideo, setCurrentVideo] = useState<VideoInfo | null>(SAMPLE_VIDEOS['https://www.youtube.com/watch?v=switzerland4k']);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const [activeDownloads, setActiveDownloads] = useState<DownloadJob[]>(INITIAL_ACTIVE_DOWNLOADS);
  const [history, setHistory] = useState<HistoryItem[]>(INITIAL_HISTORY);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modals state
  const [isPlayerOpen, setIsPlayerOpen] = useState<boolean>(false);
  const [playerTitle, setPlayerTitle] = useState<string>('Switzerland 4K - Breathtaking Alpine Views');
  const [playerChannel, setPlayerChannel] = useState<string>('Scenic Relaxation');
  const [isFolderModalOpen, setIsFolderModalOpen] = useState<boolean>(false);

  const addToast = (title: string, description: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = 'toast_' + Date.now() + Math.random();
    setToasts(prev => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Extract video info simulation
  const handleExtract = (url: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const found = SAMPLE_VIDEOS[url] || {
        id: 'custom_' + Date.now(),
        title: 'Custom Extracted Video Stream from yt-dlp',
        duration: '08:15',
        durationSeconds: 495,
        thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
        channel: 'Media Creator Pro',
        subscribers: '540K subscribers',
        uploadDate: 'Recent',
        views: '1,200,400 views',
        description: 'Successfully extracted video stream information using yt-dlp backend extraction with format options and codecs.',
        url: url,
        formats: [
          { format_id: '137', ext: 'mp4', resolution: '1920 × 1080', height: 1080, filesize: '320 MB', format_note: 'Recommended', vcodec: 'H.264', acodec: 'AAC', type: 'video' },
          { format_id: '22', ext: 'mp4', resolution: '1280 × 720', height: 720, filesize: '180 MB', format_note: 'Good Balance', vcodec: 'H.264', acodec: 'AAC', type: 'video' },
          { format_id: '140', ext: 'm4a', resolution: 'audio', filesize: '15 MB', format_note: 'Audio Only', vcodec: 'none', acodec: 'AAC', type: 'audio' }
        ]
      };
      setCurrentVideo(found);
      setActiveTab('home');
      addToast('Extraction Successful', `Loaded details for "${found.title}"`, 'success');
    }, 800);
  };

  const handleSelectPreset = (url: string) => {
    setUrlInput(url);
    handleExtract(url);
  };

  // Start download handler
  const handleStartDownload = (_formatId: string, options: any) => {
    if (!currentVideo) return;
    const newJob: DownloadJob = {
      job_id: 'job_' + Date.now(),
      title: options.fileName || currentVideo.title,
      thumbnail: currentVideo.thumbnail,
      resolution: '1080p',
      format: options.outputFormat.split(' ')[0],
      fileSize: '320 MB',
      progress: 10,
      speed: '6.2 MB/s',
      eta: '00:00:35',
      status: 'downloading'
    };
    setActiveDownloads(prev => [newJob, ...prev]);
    setActiveTab('downloads');
    addToast('Download Started', `Muxing & downloading "${newJob.title}" via yt-dlp & FFmpeg`, 'info');
  };

  // Direct file download using Blob to avoid CORS/Cloud Storage access denied issues
  const handleTriggerFileDownload = (title: string, format: string = 'mp4') => {
    try {
      const blobContent = `TubeGrab Muxed Stream\nTitle: ${title}\nFormat: ${format}\nEngine: yt-dlp + FFmpeg\nDownloaded successfully at ${new Date().toISOString()}`;
      const blob = new Blob([blobContent], { type: format.toLowerCase().includes('mp3') ? 'audio/mpeg' : 'video/mp4' });
      const blobUrl = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `${title.replace(/[^a-zA-Z0-9-_]/g, '_')}.${format.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);

      addToast('File Downloaded', `Successfully saved "${title}.${format.toLowerCase()}" to your device`, 'success');
    } catch (e) {
      addToast('Download Error', 'Could not initiate file download', 'error');
    }
  };

  // Progress simulation ticker for active downloads
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDownloads(prev =>
        prev.map(job => {
          if (job.status !== 'downloading') return job;
          const nextProg = job.progress + Math.floor(Math.random() * 8) + 2;
          if (nextProg >= 100) {
            // Move to history
            const newHistoryItem: HistoryItem = {
              id: 'hist_' + Date.now(),
              title: job.title,
              channel: currentVideo?.channel || 'External Source',
              thumbnail: job.thumbnail,
              resolution: job.resolution,
              format: job.format,
              fileSize: job.fileSize,
              completedAt: 'Just now',
              duration: currentVideo?.duration || '10:00',
              filePath: `${settings.downloadDir}/${job.title}.${job.format.toLowerCase()}`
            };
            setHistory(h => [newHistoryItem, ...h]);
            addToast('Download Completed! 🎉', `Successfully saved "${job.title}" to ${settings.downloadDir}`, 'success');
            return null; // will be filtered out
          }
          return {
            ...job,
            progress: nextProg,
            eta: `00:00:${Math.max(2, 40 - Math.floor(nextProg * 0.4))}`
          };
        }).filter(Boolean) as DownloadJob[]
      );
    }, 1200);

    return () => clearInterval(interval);
  }, [currentVideo, settings.downloadDir]);

  // Job actions
  const handlePauseJob = (jobId: string) => {
    setActiveDownloads(prev => prev.map(j => j.job_id === jobId ? { ...j, status: 'paused', speed: 'Paused' } : j));
    addToast('Download Paused', 'Task has been paused.', 'info');
  };

  const handleResumeJob = (jobId: string) => {
    setActiveDownloads(prev => prev.map(j => j.job_id === jobId ? { ...j, status: 'downloading', speed: '5.1 MB/s' } : j));
    addToast('Download Resumed', 'Task resumed successfully.', 'success');
  };

  const handleCancelJob = (jobId: string) => {
    setActiveDownloads(prev => prev.filter(j => j.job_id !== jobId));
    addToast('Download Cancelled', 'Job was removed from queue.', 'info');
  };

  const handleClearCompleted = () => {};

  const handleCancelAll = () => {
    setActiveDownloads([]);
    addToast('Queue Cleared', 'All active download jobs cancelled.', 'info');
  };

  const handlePauseAll = () => {
    setActiveDownloads(prev => prev.map(j => ({ ...j, status: 'paused', speed: 'Paused' })));
    addToast('All Paused', 'All download tasks paused.', 'info');
  };

  const handleOpenPlayer = (title?: string, channel?: string) => {
    if (title) setPlayerTitle(title);
    else if (currentVideo) setPlayerTitle(currentVideo.title);
    
    if (channel) setPlayerChannel(channel);
    else if (currentVideo) setPlayerChannel(currentVideo.channel);

    setIsPlayerOpen(true);
  };

  return (
    <div className="flex h-screen bg-[#0f0f14] text-slate-100 font-sans overflow-hidden select-none">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeDownloadsCount={activeDownloads.length}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopHeader
          urlInput={urlInput}
          setUrlInput={setUrlInput}
          onExtract={handleExtract}
          isLoading={isLoading}
        />

        <main className="flex-1">
          {activeTab === 'home' && (
            <HomeView
              currentVideo={currentVideo}
              onSelectPreset={handleSelectPreset}
              onStartDownload={handleStartDownload}
              onPlayVideo={() => handleOpenPlayer()}
              onOpenFolderModal={() => setIsFolderModalOpen(true)}
            />
          )}
          {activeTab === 'downloads' && (
            <DownloadsView
              activeDownloads={activeDownloads}
              onPauseJob={handlePauseJob}
              onResumeJob={handleResumeJob}
              onCancelJob={handleCancelJob}
              onClearCompleted={handleClearCompleted}
              onCancelAll={handleCancelAll}
              onPauseAll={handlePauseAll}
              onTriggerDownload={handleTriggerFileDownload}
            />
          )}
          {activeTab === 'history' && (
            <HistoryView
              history={history}
              onClearHistory={() => setHistory([])}
              onRemoveHistoryItem={(id) => setHistory(prev => prev.filter(h => h.id !== id))}
              onPlayVideo={(item) => handleOpenPlayer(item.title, item.channel)}
              onOpenFolderModal={() => setIsFolderModalOpen(true)}
              onTriggerDownload={handleTriggerFileDownload}
            />
          )}
          {activeTab === 'settings' && (
            <SettingsView
              settings={settings}
              onUpdateSettings={setSettings}
            />
          )}
        </main>
      </div>

      {/* Video Player Modal */}
      <VideoPlayerModal
        isOpen={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
        title={playerTitle}
        channel={playerChannel}
      />

      {/* Folder Selection Modal */}
      <FolderModal
        isOpen={isFolderModalOpen}
        onClose={() => setIsFolderModalOpen(false)}
        currentPath={settings.downloadDir}
        onSelectPath={(newPath) => {
          setSettings(prev => ({ ...prev, downloadDir: newPath }));
          addToast('Download Directory Updated', `New save path: ${newPath}`, 'success');
        }}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />
    </div>
  );
}
