'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  Captions,
  Download,
  Share2,
  Heart,
  Bookmark,
  MoreVertical,
  Clock,
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Fullscreen,
  RotateCcw,
  RotateCw,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  description?: string;
  poster?: string;
  duration?: number;
  currentTime?: number;
  onTimeUpdate?: (time: number) => void;
  onEnded?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
}

interface QualityOption {
  label: string;
  value: string;
  resolution: string;
  bitrate: string;
}

interface SubtitleOption {
  label: string;
  value: string;
  language: string;
}

export default function AdvancedVideoPlayer({
  videoUrl,
  title,
  description,
  poster,
  duration = 0,
  currentTime = 0,
  onTimeUpdate,
  onEnded,
  onPlay,
  onPause
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [showSubtitlesMenu, setShowSubtitlesMenu] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('1080p');
  const [selectedSubtitle, setSelectedSubtitle] = useState('none');
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const qualityOptions: QualityOption[] = [
    { label: '4K', value: '4k', resolution: '3840x2160', bitrate: '50 Mbps' },
    { label: '1080p', value: '1080p', resolution: '1920x1080', bitrate: '8 Mbps' },
    { label: '720p', value: '720p', resolution: '1280x720', bitrate: '5 Mbps' },
    { label: '480p', value: '480p', resolution: '854x480', bitrate: '2.5 Mbps' },
    { label: '360p', value: '360p', resolution: '640x360', bitrate: '1.5 Mbps' }
  ];

  const subtitleOptions: SubtitleOption[] = [
    { label: 'إيقاف', value: 'none', language: 'none' },
    { label: 'العربية', value: 'ar', language: 'Arabic' },
    { label: 'English', value: 'en', language: 'English' },
    { label: 'Français', value: 'fr', language: 'French' },
    { label: 'Español', value: 'es', language: 'Spanish' }
  ];

  const playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentVideoTime(video.currentTime);
      onTimeUpdate?.(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setTotalDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    const handlePlay = () => {
      setIsPlaying(true);
      onPlay?.();
    };

    const handlePause = () => {
      setIsPlaying(false);
      onPause?.();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [onTimeUpdate, onEnded, onPlay, onPause]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isPlaying) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const seekTo = (time: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = time;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = progressRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    const newTime = percentage * totalDuration;
    seekTo(newTime);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isMuted) {
      video.muted = false;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    const video = videoRef.current;
    if (!video) return;
    
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const skipTime = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime += seconds;
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative bg-black rounded-lg overflow-hidden group"
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full"
        poster={poster}
        preload="metadata"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Controls */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        
        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <Eye size={20} />
              </button>
              <div className="text-white">
                <h3 className="font-semibold">{title}</h3>
                {showInfo && (
                  <p className="text-sm text-gray-300 mt-1">{description}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={handleLike}
                className={`p-2 rounded-full transition-colors ${
                  isLiked ? 'text-red-500' : 'text-white hover:text-gray-300'
                }`}
              >
                <ThumbsUp size={20} />
              </button>
              <button
                onClick={handleBookmark}
                className={`p-2 rounded-full transition-colors ${
                  isBookmarked ? 'text-blue-500' : 'text-white hover:text-gray-300'
                }`}
              >
                <Bookmark size={20} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full text-white hover:text-gray-300 transition-colors"
              >
                <Share2 size={20} />
              </button>
              <button className="p-2 rounded-full text-white hover:text-gray-300 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Center Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="bg-white/20 backdrop-blur-sm rounded-full p-4 text-white hover:bg-white/30 transition-all duration-300"
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Progress Bar */}
          <div 
            ref={progressRef}
            onClick={handleProgressClick}
            className="w-full h-2 bg-white/30 rounded-full cursor-pointer mb-4"
          >
            <div 
              className="h-full bg-red-500 rounded-full relative"
              style={{ width: `${(currentVideoTime / totalDuration) * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                onClick={togglePlay}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              
              <button
                onClick={() => skipTime(-10)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <SkipBack size={20} />
              </button>
              
              <button
                onClick={() => skipTime(10)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <SkipForward size={20} />
              </button>

              <div className="flex items-center space-x-2 space-x-reverse">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer"
                />
              </div>

              <div className="text-white text-sm">
                {formatTime(currentVideoTime)} / {formatTime(totalDuration)}
              </div>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => setShowSubtitlesMenu(!showSubtitlesMenu)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <Captions size={20} />
              </button>
              
              <button
                onClick={() => setShowQualityMenu(!showQualityMenu)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <Settings size={20} />
              </button>
              
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quality Menu */}
      {showQualityMenu && (
        <div className="absolute bottom-20 right-4 bg-gray-900 rounded-lg p-2 shadow-lg">
          <div className="text-white text-sm font-medium mb-2">جودة الفيديو</div>
          {qualityOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setSelectedQuality(option.value);
                setShowQualityMenu(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                selectedQuality === option.value
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <div className="font-medium">{option.label}</div>
              <div className="text-xs text-gray-400">{option.resolution} • {option.bitrate}</div>
            </button>
          ))}
        </div>
      )}

      {/* Subtitles Menu */}
      {showSubtitlesMenu && (
        <div className="absolute bottom-20 right-16 bg-gray-900 rounded-lg p-2 shadow-lg">
          <div className="text-white text-sm font-medium mb-2">الترجمة</div>
          {subtitleOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setSelectedSubtitle(option.value);
                setShowSubtitlesMenu(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                selectedSubtitle === option.value
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* Settings Menu */}
      {showSettings && (
        <div className="absolute bottom-20 right-4 bg-gray-900 rounded-lg p-2 shadow-lg">
          <div className="text-white text-sm font-medium mb-2">إعدادات التشغيل</div>
          <div className="space-y-2">
            {playbackRates.map((rate) => (
              <button
                key={rate}
                onClick={() => {
                  const video = videoRef.current;
                  if (video) {
                    video.playbackRate = rate;
                    setPlaybackRate(rate);
                  }
                  setShowSettings(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                  playbackRate === rate
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}