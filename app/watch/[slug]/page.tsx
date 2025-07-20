'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2,
  Settings,
  Subtitles,
  Download,
  Share2,
  Heart,
  Bookmark,
  Flag,
  ArrowLeft,
  SkipBack,
  SkipForward,
  RotateCcw,
  RotateCw,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react'

// بيانات تجريبية للفيديو
const videoData = {
  id: 1,
  title: "The Dark Knight",
  slug: "the-dark-knight",
  poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
  duration: 9120, // بالثواني
  currentTime: 0,
  quality: "4K",
  sources: [
    { quality: "4K", url: "#", size: "8.5 GB" },
    { quality: "FHD", url: "#", size: "4.2 GB" },
    { quality: "HD", url: "#", size: "2.1 GB" },
    { quality: "SD", url: "#", size: "1.1 GB" }
  ],
  subtitles: [
    { language: "العربية", code: "ar", url: "#" },
    { language: "الإنجليزية", code: "en", url: "#" },
    { language: "الفرنسية", code: "fr", url: "#" },
    { language: "الإسبانية", code: "es", url: "#" }
  ],
  audio: [
    { language: "الإنجليزية", code: "en" },
    { language: "العربية", code: "ar" }
  ],
  relatedEpisodes: [
    {
      id: 2,
      title: "الحلقة 2",
      duration: 45,
      thumbnail: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=200&h=120&fit=crop"
    },
    {
      id: 3,
      title: "الحلقة 3",
      duration: 42,
      thumbnail: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=200&h=120&fit=crop"
    }
  ]
}

export default function WatchPage({ params }: { params: { slug: string } }) {
  const [video, setVideo] = useState(videoData)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [showSubtitles, setShowSubtitles] = useState(false)
  const [currentQuality, setCurrentQuality] = useState("4K")
  const [currentSubtitle, setCurrentSubtitle] = useState("العربية")
  const [currentAudio, setCurrentAudio] = useState("الإنجليزية")
  const [volume, setVolume] = useState(100)
  const [progress, setProgress] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showRelated, setShowRelated] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  // إخفاء الضوابط تلقائياً
  useEffect(() => {
    if (showControls) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [showControls])

  // تنسيق الوقت
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  // تبديل التشغيل/الإيقاف
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // تبديل الكتم
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // تبديل ملء الشاشة
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // تحديث التقدم
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(progress)
      setVideo(prev => ({ ...prev, currentTime: videoRef.current?.currentTime || 0 }))
    }
  }

  // تغيير التقدم
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value)
    setProgress(newProgress)
    
    if (videoRef.current) {
      const newTime = (newProgress / 100) * videoRef.current.duration
      videoRef.current.currentTime = newTime
    }
  }

  // تغيير مستوى الصوت
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100
    }
  }

  // التخطي للأمام/الخلف
  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Video Container */}
      <div className="relative w-full h-screen">
        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={video.poster}
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onMouseMove={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <source src="#" type="video/mp4" />
          متصفحك لا يدعم تشغيل الفيديو.
        </video>

        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Top Controls */}
        <div 
          className={`absolute top-0 left-0 right-0 p-4 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center justify-between">
            <Link 
              href={`/movie/${video.slug}`}
              className="flex items-center text-white hover:text-gray-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              العودة
            </Link>
            
            <div className="flex items-center gap-4">
              <button className="text-white hover:text-gray-300 transition-colors">
                <Download className="w-5 h-5" />
              </button>
              <button className="text-white hover:text-gray-300 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`transition-colors ${isLiked ? 'text-red-500' : 'text-white hover:text-gray-300'}`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`transition-colors ${isBookmarked ? 'text-blue-500' : 'text-white hover:text-gray-300'}`}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
              <button className="text-white hover:text-gray-300 transition-colors">
                <Flag className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Center Play Button */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <Play className="w-8 h-8 text-white fill-white" />
            </button>
          </div>
        )}

        {/* Bottom Controls */}
        <div 
          className={`absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Progress Bar */}
          <div className="mb-4">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              
              <button
                onClick={() => skip(-10)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => skip(10)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <SkipForward className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div className="text-white text-sm">
                {formatTime(video.currentTime)} / {formatTime(video.duration)}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSubtitles(!showSubtitles)}
                className={`transition-colors ${showSubtitles ? 'text-blue-400' : 'text-white hover:text-gray-300'}`}
              >
                <Subtitles className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="absolute bottom-20 right-4 bg-gray-900 rounded-lg p-4 min-w-48">
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-semibold mb-2">الجودة</h4>
                <div className="space-y-1">
                  {video.sources.map((source) => (
                    <button
                      key={source.quality}
                      onClick={() => setCurrentQuality(source.quality)}
                      className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                        currentQuality === source.quality
                          ? 'text-blue-400 bg-blue-400/20'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {source.quality} ({source.size})
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">الترجمة</h4>
                <div className="space-y-1">
                  {video.subtitles.map((subtitle) => (
                    <button
                      key={subtitle.code}
                      onClick={() => setCurrentSubtitle(subtitle.language)}
                      className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                        currentSubtitle === subtitle.language
                          ? 'text-blue-400 bg-blue-400/20'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {subtitle.language}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">الصوت</h4>
                <div className="space-y-1">
                  {video.audio.map((audio) => (
                    <button
                      key={audio.code}
                      onClick={() => setCurrentAudio(audio.language)}
                      className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                        currentAudio === audio.language
                          ? 'text-blue-400 bg-blue-400/20'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {audio.language}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Subtitles Panel */}
        {showSubtitles && (
          <div className="absolute bottom-20 left-4 bg-gray-900 rounded-lg p-4 min-w-48">
            <h4 className="text-white font-semibold mb-2">الترجمة</h4>
            <div className="space-y-1">
              {video.subtitles.map((subtitle) => (
                <button
                  key={subtitle.code}
                  onClick={() => setCurrentSubtitle(subtitle.language)}
                  className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                    currentSubtitle === subtitle.language
                      ? 'text-blue-400 bg-blue-400/20'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {subtitle.language}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Episodes */}
      {showRelated && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-white font-semibold mb-4">الحلقات ذات الصلة</h3>
            <div className="flex gap-4 overflow-x-auto">
              {video.relatedEpisodes.map((episode) => (
                <div key={episode.id} className="flex-shrink-0">
                  <div className="relative w-48 h-28 rounded-lg overflow-hidden">
                    <img
                      src={episode.thumbnail}
                      alt={episode.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {formatTime(episode.duration * 60)}
                    </div>
                  </div>
                  <p className="text-white text-sm mt-2">{episode.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Info */}
      <div className="fixed top-4 right-4 bg-black/80 text-white text-xs p-2 rounded opacity-0 hover:opacity-100 transition-opacity">
        <div>Space: تشغيل/إيقاف</div>
        <div>← →: تخطي 10 ثواني</div>
        <div>M: كتم الصوت</div>
        <div>F: ملء الشاشة</div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  )
}