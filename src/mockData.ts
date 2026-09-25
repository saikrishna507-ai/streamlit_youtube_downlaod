import { VideoInfo, DownloadJob, HistoryItem, AppSettings } from './types';

export const SAMPLE_VIDEOS: Record<string, VideoInfo> = {
  'https://www.youtube.com/watch?v=switzerland4k': {
    id: 'switzerland4k',
    title: 'Switzerland 4K - Breathtaking Alpine Views',
    duration: '12:34',
    durationSeconds: 754,
    thumbnail: '/src/assets/images/alpine_thumbnail_1790314239557.jpg',
    channel: 'Scenic Relaxation',
    subscribers: '2.1M subscribers',
    uploadDate: 'Nov 12, 2023',
    views: '12,345,678 views',
    description: 'Experience the breathtaking beauty of Switzerland in stunning 4K. From majestic Alpine peaks to peaceful lakes, this video captures the natural wonders of one of the most picturesque countries on earth. Filmed with professional drone cinematography and high-end cinema lenses.',
    url: 'https://www.youtube.com/watch?v=switzerland4k',
    formats: [
      { format_id: '313', ext: 'mp4', resolution: '3840 × 2160', height: 2160, filesize: '1.2 GB', format_note: 'Best Quality', vcodec: 'H.264 + AAC', acodec: 'AAC 192k', type: 'video' },
      { format_id: '271', ext: 'webm', resolution: '2560 × 1440', height: 1440, filesize: '620 MB', format_note: 'High Quality', vcodec: 'VP9', acodec: 'Opus', type: 'video' },
      { format_id: '137', ext: 'mp4', resolution: '1920 × 1080', height: 1080, filesize: '320 MB', format_note: 'Recommended', vcodec: 'H.264 + AAC', acodec: 'AAC 128k', type: 'video' },
      { format_id: '22', ext: 'mp4', resolution: '1280 × 720', height: 720, filesize: '180 MB', format_note: 'Good Balance', vcodec: 'H.264', acodec: 'AAC', type: 'video' },
      { format_id: '18', ext: 'mp4', resolution: '854 × 480', height: 480, filesize: '96 MB', format_note: 'Smaller Size', vcodec: 'H.264', acodec: 'AAC', type: 'video' },
      { format_id: '140', ext: 'm4a', resolution: 'audio', filesize: '14 MB', format_note: 'Audio Only (AAC)', vcodec: 'none', acodec: 'AAC 128k', type: 'audio' },
      { format_id: '251', ext: 'webm', resolution: 'audio', filesize: '11 MB', format_note: 'Audio Only (Opus High)', vcodec: 'none', acodec: 'Opus 160k', type: 'audio' },
    ]
  },
  'https://www.youtube.com/watch?v=tokyonight': {
    id: 'tokyonight',
    title: 'Tokyo Night Walk - Shibuya Crossing',
    duration: '45:00',
    durationSeconds: 2700,
    thumbnail: '/src/assets/images/tokyo_thumbnail_1790314250998.jpg',
    channel: 'Urban Walker 4K',
    subscribers: '850K subscribers',
    uploadDate: 'Jan 15, 2024',
    views: '4,520,100 views',
    description: 'Binaural audio and ultra-HD visual walk through the bustling neon streets of Shibuya and Shinjuku in Tokyo on a rainy Friday evening.',
    url: 'https://www.youtube.com/watch?v=tokyonight',
    formats: [
      { format_id: '313', ext: 'mp4', resolution: '3840 × 2160', height: 2160, filesize: '3.4 GB', format_note: 'Best Quality', vcodec: 'H.264 + AAC', acodec: 'AAC 192k', type: 'video' },
      { format_id: '137', ext: 'mp4', resolution: '1920 × 1080', height: 1080, filesize: '980 MB', format_note: 'Recommended', vcodec: 'H.264 + AAC', acodec: 'AAC 128k', type: 'video' },
      { format_id: '22', ext: 'mp4', resolution: '1280 × 720', height: 720, filesize: '450 MB', format_note: 'Good Balance', vcodec: 'H.264', acodec: 'AAC', type: 'video' },
      { format_id: '140', ext: 'm4a', resolution: 'audio', filesize: '41 MB', format_note: 'Audio Only (AAC)', vcodec: 'none', acodec: 'AAC 128k', type: 'audio' },
    ]
  }
};

export const INITIAL_ACTIVE_DOWNLOADS: DownloadJob[] = [
  {
    job_id: 'job_switz_01',
    title: 'Switzerland 4K - Breathtaking Alpine Views',
    thumbnail: '/src/assets/images/alpine_thumbnail_1790314239557.jpg',
    resolution: '4K (3840x2160)',
    format: 'MP4',
    fileSize: '1.2 GB',
    progress: 73,
    speed: '4.2 MB/s',
    eta: '00:01:23',
    status: 'downloading'
  },
  {
    job_id: 'job_tokyo_02',
    title: 'Tokyo Night Walk - Shibuya Crossing',
    thumbnail: '/src/assets/images/tokyo_thumbnail_1790314250998.jpg',
    resolution: '1080p (1920x1080)',
    format: 'MP4',
    fileSize: '980 MB',
    progress: 28,
    speed: '3.1 MB/s',
    eta: '00:02:45',
    status: 'downloading'
  }
];

export const INITIAL_HISTORY: HistoryItem[] = [
  {
    id: 'hist_01',
    title: 'Interstellar Main Theme - Organ & Orchestra',
    channel: 'Cinema Symphonies',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
    resolution: 'audio',
    format: 'MP3',
    fileSize: '12.4 MB',
    completedAt: 'Yesterday, 14:22',
    duration: '04:52',
    filePath: '/downloads/Interstellar Main Theme.mp3'
  },
  {
    id: 'hist_02',
    title: 'Deep Space Nebula 8K Relaxation Journey',
    channel: 'Cosmos HD',
    thumbnail: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=400&q=80',
    resolution: '3840 × 2160',
    format: 'MP4',
    fileSize: '2.1 GB',
    completedAt: 'Sep 22, 2026',
    duration: '20:00',
    filePath: '/downloads/Deep Space Nebula 8K.mp4'
  }
];

export const DEFAULT_SETTINGS: AppSettings = {
  downloadDir: 'Downloads',
  maxConcurrent: 3,
  maxDurationMinutes: 180,
  maxFileSizeMb: 5000,
  autoMerge: true,
  addMetadata: true,
  downloadThumbnail: true,
  downloadSubtitles: true,
  subtitleLang: 'en',
  theme: 'dark'
};
