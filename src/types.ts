export interface VideoFormat {
  format_id: string;
  ext: string;
  resolution: string;
  height?: number;
  filesize?: string;
  format_note: string;
  vcodec: string;
  acodec: string;
  type: 'video' | 'audio' | 'all';
}

export interface VideoInfo {
  id: string;
  title: string;
  duration: string;
  durationSeconds: number;
  thumbnail: string;
  channel: string;
  subscribers: string;
  uploadDate: string;
  views: string;
  description: string;
  formats: VideoFormat[];
  url: string;
}

export interface DownloadJob {
  job_id: string;
  title: string;
  thumbnail: string;
  resolution: string;
  format: string;
  fileSize: string;
  progress: number; // 0 to 100
  speed: string;
  eta: string;
  status: 'downloading' | 'paused' | 'completed' | 'error' | 'queued';
  error?: string;
  downloadedBytes?: number;
  totalBytes?: number;
}

export interface HistoryItem {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  resolution: string;
  format: string;
  fileSize: string;
  completedAt: string;
  duration: string;
  filePath: string;
}

export interface AppSettings {
  downloadDir: string;
  maxConcurrent: number;
  maxDurationMinutes: number;
  maxFileSizeMb: number;
  autoMerge: boolean;
  addMetadata: boolean;
  downloadThumbnail: boolean;
  downloadSubtitles: boolean;
  subtitleLang: string;
  theme: 'dark' | 'light';
}
