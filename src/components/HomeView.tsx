import React, { useState } from 'react';
import { VideoInfo, VideoFormat } from '../types';
import { 
  Play, Clock, ShieldCheck, Film, Music, Check, ChevronDown, ChevronUp, 
  Download, Sparkles, FolderOpen, Globe, Youtube, Twitter, Instagram 
} from 'lucide-react';

interface HomeViewProps {
  currentVideo: VideoInfo | null;
  onSelectPreset: (url: string) => void;
  onStartDownload: (formatId: string, options: any) => void;
  onPlayVideo: () => void;
  onOpenFolderModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ 
  currentVideo, 
  onSelectPreset, 
  onStartDownload, 
  onPlayVideo,
  onOpenFolderModal 
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'audio'>('video');
  const [selectedFormatId, setSelectedFormatId] = useState<string>('313');
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);
  const [qualityPreset, setQualityPreset] = useState<string>('Auto (Recommended)');
  
  // Download Options state
  const [fileName, setFileName] = useState<string>(currentVideo ? currentVideo.title : '');
  const [outputFormat, setOutputFormat] = useState<string>('MP4 (Video + Audio)');
  const [mergeAudioVideo, setMergeAudioVideo] = useState<boolean>(true);
  const [addMetadata, setAddMetadata] = useState<boolean>(true);
  const [downloadThumbnail, setDownloadThumbnail] = useState<boolean>(true);
  const [downloadSubtitles, setDownloadSubtitles] = useState<boolean>(true);
  const [subtitleLang, setSubtitleLang] = useState<string>('English (Auto)');

  // Update filename when currentVideo changes
  React.useEffect(() => {
    if (currentVideo) {
      setFileName(currentVideo.title);
      if (currentVideo.formats && currentVideo.formats.length > 0) {
        setSelectedFormatId(currentVideo.formats[0].format_id);
      }
    }
  }, [currentVideo]);

  if (!currentVideo) {
    return (
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Welcome Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-[#14141c] border border-indigo-500/20 p-10 flex flex-col items-center text-center">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-pink-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-3">
            Welcome to TubeGrab Studio
          </h2>
          <p className="text-slate-400 max-w-xl text-sm leading-relaxed mb-8">
            Paste any media URL in the top bar above to extract high-resolution streams, convert formats effortlessly with FFmpeg, and manage lightning-fast downloads.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onSelectPreset('https://www.youtube.com/watch?v=switzerland4k')}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Try Switzerland 4K Demo</span>
            </button>
            <button
              onClick={() => onSelectPreset('https://www.youtube.com/watch?v=tokyonight')}
              className="px-6 py-3 bg-[#1e1e2d] hover:bg-[#252538] text-slate-200 font-medium text-sm rounded-xl border border-[#2e2e42] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Film className="w-4 h-4 text-indigo-400" />
              <span>Try Tokyo Night Walk Demo</span>
            </button>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#16161f] border border-[#222232] rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">01</div>
            <h3 className="text-base font-semibold text-white">Advanced Extraction</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Powered by robust yt-dlp extraction engine supporting 1000+ websites and adaptive streaming formats.</p>
          </div>
          <div className="bg-[#16161f] border border-[#222232] rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">02</div>
            <h3 className="text-base font-semibold text-white">Lossless FFmpeg Merging</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Automatically muxes highest quality video and audio streams into pristine MP4, MKV, or MP3 files.</p>
          </div>
          <div className="bg-[#16161f] border border-[#222232] rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center font-bold">03</div>
            <h3 className="text-base font-semibold text-white">Concurrent Queue</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Manage multiple downloads with real-time speed monitoring, ETAs, pause, resume, and cancellation controls.</p>
          </div>
        </div>
      </div>
    );
  }

  const filteredFormats = currentVideo.formats.filter(f => {
    if (activeTab === 'video') return f.type === 'video';
    if (activeTab === 'audio') return f.type === 'audio';
    return true;
  });

  const handleDownloadClick = () => {
    onStartDownload(selectedFormatId, {
      fileName,
      outputFormat,
      mergeAudioVideo,
      addMetadata,
      downloadThumbnail,
      downloadSubtitles,
      subtitleLang
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Section: Video Preview + Side Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Preview Card (2 cols) */}
        <div className="lg:col-span-2 bg-[#16161f] border border-[#222232] rounded-3xl p-6 space-y-6 shadow-xl">
          {/* Thumbnail Player */}
          <div 
            onClick={onPlayVideo}
            className="relative rounded-2xl overflow-hidden aspect-video bg-black group shadow-lg cursor-pointer"
          >
            <img 
              src={currentVideo.thumbnail} 
              alt={currentVideo.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-indigo-600/90 hover:bg-indigo-500 flex items-center justify-center text-white shadow-xl shadow-indigo-600/40 cursor-pointer transition-transform group-hover:scale-110">
                <Play className="w-7 h-7 fill-white ml-1" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
              <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg font-mono">YouTube</span>
              <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg font-mono">{currentVideo.duration}</span>
            </div>
          </div>

          {/* Title & Channel Info */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl font-bold text-white tracking-tight leading-snug">
                {currentVideo.title}
              </h2>
            </div>
            
            <div className="flex items-center justify-between flex-wrap gap-4 pt-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  {currentVideo.channel.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-200">{currentVideo.channel}</div>
                  <div className="text-xs text-slate-400">{currentVideo.subscribers}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
                <span>{currentVideo.views}</span>
                <span>·</span>
                <span>{currentVideo.uploadDate}</span>
              </div>
            </div>

            {/* Description accordion */}
            <div className="pt-2">
              <p className={`text-xs text-slate-400 leading-relaxed ${isDescriptionOpen ? '' : 'line-clamp-2'}`}>
                {currentVideo.description}
              </p>
              <button
                onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium mt-1.5 flex items-center gap-1 cursor-pointer"
              >
                <span>{isDescriptionOpen ? 'Show less' : 'Show more'}</span>
                {isDescriptionOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Metric Pills / Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="bg-[#1b1b26] border border-[#28283a] rounded-xl p-3 flex items-center gap-3">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400">Duration</div>
                  <div className="text-sm font-bold text-white font-mono">{currentVideo.duration}</div>
                </div>
              </div>
              <div className="bg-[#1b1b26] border border-[#28283a] rounded-xl p-3 flex items-center gap-3">
                <Film className="w-4 h-4 text-purple-400 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400">Max Quality</div>
                  <div className="text-sm font-bold text-white font-mono">4K Ultra HD</div>
                </div>
              </div>
              <div className="bg-[#1b1b26] border border-[#28283a] rounded-xl p-3 flex items-center gap-3">
                <Music className="w-4 h-4 text-pink-400 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400">Available Formats</div>
                  <div className="text-sm font-bold text-white font-mono">{currentVideo.formats.length} formats</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Quick Tips & Supported Sites */}
        <div className="space-y-6">
          {/* Quick Tips */}
          <div className="bg-[#16161f] border border-[#222232] rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Quick Tips</span>
            </h3>
            <ol className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold shrink-0">1</span>
                <span>Paste a YouTube URL in the top search bar.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold shrink-0">2</span>
                <span>Select your preferred video or audio format below.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold shrink-0">3</span>
                <span>Click Download Now and enjoy your media offline!</span>
              </li>
            </ol>
          </div>

          {/* Supported Sites */}
          <div className="bg-[#16161f] border border-[#222232] rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-400" />
              <span>Supported Sites</span>
            </h3>
            <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#1b1b26] border border-[#262638]">
                <Youtube className="w-4 h-4 text-red-500 shrink-0" />
                <span className="font-medium">YouTube</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#1b1b26] border border-[#262638]">
                <span className="w-4 h-4 rounded-full bg-black flex items-center justify-center text-[10px] text-white font-bold shrink-0">t</span>
                <span className="font-medium">TikTok</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#1b1b26] border border-[#262638]">
                <Globe className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="font-medium">Facebook</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#1b1b26] border border-[#262638]">
                <Twitter className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="font-medium">Twitter/X</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#1b1b26] border border-[#262638]">
                <Instagram className="w-4 h-4 text-pink-500 shrink-0" />
                <span className="font-medium">Instagram</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#1b1b26] border border-[#262638]">
                <Film className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-medium">Vimeo</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-500 text-center pt-1">
              and 1000+ more sites supported by yt-dlp...
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Choose Format & Quality Table + Download Options */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Format Selection Table (2 cols) */}
        <div className="lg:col-span-2 bg-[#16161f] border border-[#222232] rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Film className="w-5 h-5 text-indigo-400" />
              <span>Choose Format & Quality</span>
            </h3>

            {/* Quality Preset Dropdown */}
            <div className="relative">
              <select
                value={qualityPreset}
                onChange={(e) => setQualityPreset(e.target.value)}
                className="bg-[#1b1b26] text-slate-200 text-xs font-medium rounded-xl px-4 py-2.5 border border-[#2c2c3e] focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option>Auto (Recommended)</option>
                <option>Best Quality 4K</option>
                <option>High Quality 1080p</option>
                <option>Audio Only (MP3)</option>
              </select>
            </div>
          </div>

          {/* Tabs: All / Video / Audio */}
          <div className="flex items-center gap-2 bg-[#1b1b26] p-1.5 rounded-2xl w-fit border border-[#28283a]">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Formats ({currentVideo.formats.length})
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'video'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Video ({currentVideo.formats.filter(f => f.type === 'video').length})
            </button>
            <button
              onClick={() => setActiveTab('audio')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'audio'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Audio ({currentVideo.formats.filter(f => f.type === 'audio').length})
            </button>
          </div>

          {/* Formats Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#222232] text-slate-400 font-medium">
                  <th className="pb-3 pl-2">Quality</th>
                  <th className="pb-3">Format</th>
                  <th className="pb-3">Resolution</th>
                  <th className="pb-3">File Size</th>
                  <th className="pb-3">Codec</th>
                  <th className="pb-3 pr-2">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222232]">
                {filteredFormats.map((fmt) => {
                  const isSelected = selectedFormatId === fmt.format_id;
                  return (
                    <tr
                      key={fmt.format_id}
                      onClick={() => setSelectedFormatId(fmt.format_id)}
                      className={`hover:bg-[#1b1b26]/80 cursor-pointer transition-colors ${
                        isSelected ? 'bg-indigo-600/10' : ''
                      }`}
                    >
                      <td className="py-3.5 pl-2 flex items-center gap-3">
                        <input
                          type="radio"
                          name="format_select"
                          checked={isSelected}
                          onChange={() => setSelectedFormatId(fmt.format_id)}
                          className="text-indigo-600 focus:ring-indigo-500 h-4 w-4 bg-[#1b1b26] border-slate-700 cursor-pointer"
                        />
                        <span className="font-bold text-white">{fmt.resolution === 'audio' ? 'Audio Stream' : fmt.resolution.split('×')[1] ? `${fmt.resolution.split('×')[1].trim()}p` : fmt.resolution}</span>
                      </td>
                      <td className="py-3.5 font-mono text-slate-300 uppercase">{fmt.ext}</td>
                      <td className="py-3.5 font-mono text-slate-400">{fmt.resolution}</td>
                      <td className="py-3.5 font-mono text-slate-300">{fmt.filesize}</td>
                      <td className="py-3.5 font-mono text-slate-400">{fmt.vcodec !== 'none' ? fmt.vcodec : fmt.acodec}</td>
                      <td className="py-3.5 pr-2">
                        <span className={`px-2.5 py-1 rounded-lg text-[11px] font-medium ${
                          fmt.format_note.includes('Best') || fmt.format_note.includes('Recommended')
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {fmt.format_note}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Download Options Panel (1 col) */}
        <div className="bg-[#16161f] border border-[#222232] rounded-3xl p-6 space-y-5 shadow-xl flex flex-col justify-between">
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Download className="w-4 h-4 text-indigo-400" />
              <span>Download Options</span>
            </h3>

            {/* File Name input */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">File Name</label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full bg-[#1b1b26] text-slate-200 text-xs rounded-xl px-3.5 py-2.5 border border-[#2b2b3d] focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Output Format selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Output Format</label>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                className="w-full bg-[#1b1b26] text-slate-200 text-xs rounded-xl px-3.5 py-2.5 border border-[#2b2b3d] focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option>MP4 (Video + Audio)</option>
                <option>MKV (Matroska)</option>
                <option>WebM (Web Optimized)</option>
                <option>MP3 (Audio Only)</option>
                <option>M4A (Apple Lossless)</option>
              </select>
            </div>

            {/* Toggles */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">Merge audio and video (FFmpeg)</span>
                <input
                  type="checkbox"
                  checked={mergeAudioVideo}
                  onChange={(e) => setMergeAudioVideo(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#1b1b26] text-indigo-600 focus:ring-indigo-500 border-slate-700 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">Add metadata tags</span>
                <input
                  type="checkbox"
                  checked={addMetadata}
                  onChange={(e) => setAddMetadata(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#1b1b26] text-indigo-600 focus:ring-indigo-500 border-slate-700 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">Download thumbnail artwork</span>
                <input
                  type="checkbox"
                  checked={downloadThumbnail}
                  onChange={(e) => setDownloadThumbnail(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#1b1b26] text-indigo-600 focus:ring-indigo-500 border-slate-700 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">Download subtitles</span>
                <input
                  type="checkbox"
                  checked={downloadSubtitles}
                  onChange={(e) => setDownloadSubtitles(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#1b1b26] text-indigo-600 focus:ring-indigo-500 border-slate-700 cursor-pointer"
                />
              </div>
            </div>

            {/* Subtitle Language */}
            {downloadSubtitles && (
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-medium text-slate-400">Subtitle Language</label>
                <select
                  value={subtitleLang}
                  onChange={(e) => setSubtitleLang(e.target.value)}
                  className="w-full bg-[#1b1b26] text-slate-200 text-xs rounded-xl px-3 py-2 border border-[#2b2b3d] focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option>English (Auto)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Japanese</option>
                </select>
              </div>
            )}

            {/* Save to folder */}
            <div className="flex items-center justify-between bg-[#1b1b26] p-3 rounded-xl border border-[#262638]">
              <div className="flex items-center gap-2.5">
                <FolderOpen className="w-4 h-4 text-indigo-400" />
                <div className="text-xs">
                  <div className="text-slate-400">Save to:</div>
                  <div className="font-semibold text-slate-200 font-mono">Downloads/TubeGrab</div>
                </div>
              </div>
              <button 
                onClick={onOpenFolderModal}
                className="px-3 py-1.5 bg-[#262638] hover:bg-[#323246] text-slate-200 font-medium text-xs rounded-lg transition-colors cursor-pointer"
              >
                Change
              </button>
            </div>
          </div>

          {/* Download Now Button */}
          <button
            onClick={handleDownloadClick}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white font-bold text-sm rounded-2xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98"
          >
            <Download className="w-4 h-4" />
            <span>Download Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
