'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Settings, 
  Download, 
  Share2, 
  Heart, 
  MessageCircle, 
  ThumbsUp, 
  ThumbsDown,
  Clock,
  Eye,
  Star,
  Calendar,
  User,
  Tag,
  ArrowLeft,
  List,
  SkipBack,
  SkipForward,
  RotateCcw,
  RotateCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface VideoDetails {
  id: string
  title: string
  arabicTitle: string
  description: string
  year: number
  rating: number
  views: number
  duration: string
  genre: string[]
  quality: string
  poster: string
  backdrop: string
  language: string
  country: string
  director: string
  cast: string[]
  synopsis: string
  videoUrl: string
  subtitles: { language: string; url: string }[]
  qualities: { label: string; url: string }[]
}

const mockVideoDetails: VideoDetails = {
  id: '1',
  title: 'The Dark Knight',
  arabicTitle: 'الفرسان المظلم',
  description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
  year: 2008,
  rating: 9.0,
  views: 1800000,
  duration: '2:32:00',
  genre: ['Action', 'Crime', 'Drama'],
  quality: '4K',
  poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
  backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=400&fit=crop',
  language: 'English',
  country: 'USA',
  director: 'Christopher Nolan',
  cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
  synopsis: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
  videoUrl: '/videos/dark-knight.mp4',
  subtitles: [
    { language: 'English', url: '/subtitles/en.vtt' },
    { language: 'العربية', url: '/subtitles/ar.vtt' },
    { language: 'Español', url: '/subtitles/es.vtt' }
  ],
  qualities: [
    { label: '4K', url: '/videos/dark-knight-4k.mp4' },
    { label: '1080p', url: '/videos/dark-knight-1080p.mp4' },
    { label: '720p', url: '/videos/dark-knight-720p.mp4' },
    { label: '480p', url: '/videos/dark-knight-480p.mp4' }
  ]
}

export default function WatchPage() {
  const params = useParams()
  const [videoDetails, setVideoDetails] = useState<VideoDetails>(mockVideoDetails)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [selectedQuality, setSelectedQuality] = useState('1080p')
  const [selectedSubtitle, setSelectedSubtitle] = useState('العربية')
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    // Simulate video loading
    setDuration(9120) // 2:32:00 in seconds
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
  }

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0])
  }

  const handleSpeedChange = (speed: string) => {
    setPlaybackSpeed(parseFloat(speed))
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    if (isDisliked) setIsDisliked(false)
  }

  const handleDislike = () => {
    setIsDisliked(!isDisliked)
    if (isLiked) setIsLiked(false)
  }

  const handleShare = () => {
    navigator.share?.({
      title: videoDetails.title,
      text: videoDetails.description,
      url: window.location.href
    })
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Video Player */}
      <div className="relative w-full h-screen">
        {/* Video Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${videoDetails.backdrop})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Video Controls Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            className="w-20 h-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white ml-1" />
            )}
          </button>
        </div>

        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              رجوع
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white hover:bg-opacity-20"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={handleSeek}
              className="w-full"
            />
            <div className="flex justify-between text-white text-sm mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePlayPause}
                className="text-white hover:bg-white hover:bg-opacity-20"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMuteToggle}
                  className="text-white hover:bg-white hover:bg-opacity-20"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.1}
                  onValueChange={handleVolumeChange}
                  className="w-20"
                />
              </div>

              <div className="flex items-center gap-2 text-white text-sm">
                <span>{formatTime(currentTime)}</span>
                <span>/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFullscreenToggle}
                className="text-white hover:bg-white hover:bg-opacity-20"
              >
                {isFullscreen ? (
                  <Minimize className="w-5 h-5" />
                ) : (
                  <Maximize className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="absolute top-16 right-4 bg-black bg-opacity-90 backdrop-blur-sm rounded-lg p-4 min-w-48">
            <div className="space-y-4">
              <div>
                <label className="text-white text-sm mb-2 block">الجودة</label>
                <Select value={selectedQuality} onValueChange={setSelectedQuality}>
                  <SelectTrigger className="bg-gray-800 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {videoDetails.qualities.map(quality => (
                      <SelectItem key={quality.label} value={quality.label}>
                        {quality.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">الترجمة</label>
                <Select value={selectedSubtitle} onValueChange={setSelectedSubtitle}>
                  <SelectTrigger className="bg-gray-800 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {videoDetails.subtitles.map(subtitle => (
                      <SelectItem key={subtitle.language} value={subtitle.language}>
                        {subtitle.language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-white text-sm mb-2 block">سرعة التشغيل</label>
                <Select value={playbackSpeed.toString()} onValueChange={handleSpeedChange}>
                  <SelectTrigger className="bg-gray-800 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5">0.5x</SelectItem>
                    <SelectItem value="0.75">0.75x</SelectItem>
                    <SelectItem value="1">1x</SelectItem>
                    <SelectItem value="1.25">1.25x</SelectItem>
                    <SelectItem value="1.5">1.5x</SelectItem>
                    <SelectItem value="2">2x</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{videoDetails.arabicTitle}</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{videoDetails.description}</p>
              
              <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{videoDetails.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span>{videoDetails.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{videoDetails.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{videoDetails.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                {videoDetails.genre.map((genre, index) => (
                  <Badge key={index} variant="outline">
                    {genre}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <Button onClick={handleLike} variant={isLiked ? 'default' : 'outline'}>
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  إعجاب
                </Button>
                <Button onClick={handleDislike} variant={isDisliked ? 'default' : 'outline'}>
                  <ThumbsDown className="w-4 h-4 mr-2" />
                  عدم إعجاب
                </Button>
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  مشاركة
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  تحميل
                </Button>
              </div>
            </div>

            {/* Cast & Crew */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">طاقم العمل</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">المخرج</h4>
                    <p className="text-gray-600 dark:text-gray-400">{videoDetails.director}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">طاقم التمثيل</h4>
                    <p className="text-gray-600 dark:text-gray-400">{videoDetails.cast.join(', ')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Synopsis */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">ملخص القصة</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {videoDetails.synopsis}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Videos */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">مقاطع ذات صلة</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex gap-3">
                      <img
                        src={`https://images.unsplash.com/photo-${1500000000000 + item}?w=120&h=68&fit=crop`}
                        alt="Related video"
                        className="w-30 h-17 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">فيديو ذو صلة {item}</h4>
                        <p className="text-xs text-gray-500">1.2M مشاهدة • منذ يومين</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comments */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">التعليقات</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">أحمد محمد</span>
                        <span className="text-xs text-gray-500">منذ ساعة</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        فيلم رائع! التمثيل والإخراج ممتازان
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">سارة أحمد</span>
                        <span className="text-xs text-gray-500">منذ 3 ساعات</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        أحد أفضل الأفلام التي شاهدتها هذا العام
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <input
                      type="text"
                      placeholder="أضف تعليق..."
                      className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}