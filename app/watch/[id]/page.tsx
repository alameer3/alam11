'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  Download,
  Share2,
  Heart,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Eye,
  Star,
  ChevronDown,
  ChevronUp,
  Loader,
  SkipBack,
  SkipForward,
  RotateCcw,
  Subtitles,
  Monitor
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'

// محاكاة بيانات المحتوى
const getContentData = (id: string) => ({
  id: parseInt(id),
  title: `محتوى رائع ${id}`,
  type: 'movie', // movie, series, show, mix
  poster: `/api/placeholder/300/450`,
  backdrop: `/api/placeholder/1200/600`,
  rating: (8.0 + Math.random() * 2).toFixed(1),
  year: 2024 - Math.floor(Math.random() * 5),
  duration: `${90 + Math.floor(Math.random() * 60)}دقيقة`,
  quality: '4K',
  language: 'عربي',
  subtitle: true,
  director: 'مخرج مشهور',
  cast: ['ممثل 1', 'ممثل 2', 'ممثل 3'],
  genres: ['أكشن', 'إثارة', 'دراما'],
  description: 'قصة مثيرة تحكي عن مغامرة شيقة في عالم مليء بالإثارة والتشويق.',
  views: `${Math.floor(Math.random() * 1000)}K`,
  likes: Math.floor(Math.random() * 5000),
  dislikes: Math.floor(Math.random() * 500),
  servers: [
    { id: 1, name: 'السيرفر الأول', quality: '4K', status: 'active' },
    { id: 2, name: 'السيرفر الثاني', quality: 'FHD', status: 'active' },
    { id: 3, name: 'السيرفر الثالث', quality: 'HD', status: 'maintenance' },
    { id: 4, name: 'السيرفر الرابع', quality: 'SD', status: 'active' }
  ],
  subtitles: [
    { id: 1, language: 'العربية', url: '#' },
    { id: 2, language: 'English', url: '#' },
    { id: 3, language: 'Français', url: '#' }
  ]
})

const relatedContent = Array.from({ length: 12 }, (_, i) => ({
  id: i + 20,
  title: `محتوى مشابه ${i + 1}`,
  poster: `/api/placeholder/200/300`,
  rating: (7.5 + Math.random() * 2.5).toFixed(1),
  year: 2024 - Math.floor(Math.random() * 3),
  type: ['movie', 'series', 'show'][Math.floor(Math.random() * 3)]
}))

const WatchPage: React.FC = () => {
  const params = useParams()
  const id = params.id as string
  const [content, setContent] = useState(getContentData(id))
  
  // Player states
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(3600) // 1 hour in seconds
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [currentServer, setCurrentServer] = useState(content.servers[0])
  const [currentSubtitle, setCurrentSubtitle] = useState(content.subtitles[0])
  const [quality, setQuality] = useState('4K')
  const [isLoading, setIsLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  
  // User interactions
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showComments, setShowComments] = useState(false)

  // Format time helper
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  // Skip functions
  const skipForward = () => {
    setCurrentTime(Math.min(currentTime + 10, duration))
  }

  const skipBackward = () => {
    setCurrentTime(Math.max(currentTime - 10, 0))
  }

  // Volume control
  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    setIsMuted(value[0] === 0)
  }

  // Progress control
  const handleProgressChange = (value: number[]) => {
    setCurrentTime(value[0])
  }

  // Server change
  const changeServer = (server: typeof content.servers[0]) => {
    setIsLoading(true)
    setCurrentServer(server)
    setTimeout(() => setIsLoading(false), 2000) // Simulate loading
  }

  // Like/Dislike
  const handleLike = () => {
    setIsLiked(!isLiked)
    if (isDisliked) setIsDisliked(false)
  }

  const handleDislike = () => {
    setIsDisliked(!isDisliked)
    if (isLiked) setIsLiked(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 pt-20">
      
      {/* Video Player Section */}
      <section className="relative">
        <div className="container mx-auto px-4">
          
          {/* Player Container */}
          <div className="relative bg-black rounded-lg overflow-hidden mb-6 shadow-2xl">
            <div className="aspect-video relative">
              
              {/* Video Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                {isLoading ? (
                  <div className="text-center">
                    <Loader className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                    <p className="text-white">جاري التحميل...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto cursor-pointer hover:bg-blue-700 transition-colors" onClick={togglePlay}>
                      {isPlaying ? (
                        <Pause className="w-8 h-8 text-white" />
                      ) : (
                        <Play className="w-8 h-8 text-white ml-1" />
                      )}
                    </div>
                    <p className="text-white text-lg font-medium">{content.title}</p>
                    <p className="text-gray-300">{currentServer.name} - {currentServer.quality}</p>
                  </div>
                )}
              </div>

              {/* Player Controls Overlay */}
              {showControls && !isLoading && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 opacity-100 hover:opacity-100 transition-opacity">
                  
                  {/* Top Controls */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <Badge className="bg-black/50 text-white border-0">
                        <Eye className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
                        {content.views}
                      </Badge>
                      <Badge className="bg-red-600 text-white border-0">
                        مباشر
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={() => setShowSettings(!showSettings)}
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={() => setIsFullscreen(!isFullscreen)}
                      >
                        <Maximize className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Center Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 border-2 border-white/30"
                      onClick={togglePlay}
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8 text-white" />
                      ) : (
                        <Play className="w-8 h-8 text-white ml-1" />
                      )}
                    </Button>
                  </div>

                  {/* Bottom Controls */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <Slider
                        value={[currentTime]}
                        max={duration}
                        step={1}
                        onValueChange={handleProgressChange}
                        className="w-full"
                      />
                      <div className="flex justify-between text-white text-sm mt-1">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white hover:bg-white/20"
                          onClick={skipBackward}
                        >
                          <SkipBack className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white hover:bg-white/20"
                          onClick={togglePlay}
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white hover:bg-white/20"
                          onClick={skipForward}
                        >
                          <SkipForward className="w-4 h-4" />
                        </Button>

                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-white/20"
                            onClick={toggleMute}
                          >
                            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          </Button>
                          <div className="w-20">
                            <Slider
                              value={[isMuted ? 0 : volume]}
                              max={100}
                              step={1}
                              onValueChange={handleVolumeChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white hover:bg-white/20"
                        >
                          <Subtitles className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white hover:bg-white/20"
                        >
                          <Monitor className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content Info and Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Main Content Info */}
            <div className="lg:col-span-3">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  
                  {/* Title and Basic Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                        {content.title}
                      </h1>
                      <div className="flex flex-wrap items-center gap-4">
                        <Badge className="bg-yellow-600 text-white border-0">
                          <Star className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                          {content.rating}
                        </Badge>
                        <Badge variant="secondary" className="bg-white/20 text-white">
                          {content.year}
                        </Badge>
                        <Badge className="bg-blue-600 text-white border-0">
                          {content.quality}
                        </Badge>
                        <span className="text-gray-300">{content.duration}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mt-4 sm:mt-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`border-gray-600 ${isLiked ? 'text-blue-400 border-blue-400' : 'text-white'} hover:bg-gray-800`}
                        onClick={handleLike}
                      >
                        <ThumbsUp className={`w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0 ${isLiked ? 'fill-current' : ''}`} />
                        {content.likes + (isLiked ? 1 : 0)}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className={`border-gray-600 ${isDisliked ? 'text-red-400 border-red-400' : 'text-white'} hover:bg-gray-800`}
                        onClick={handleDislike}
                      >
                        <ThumbsDown className={`w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0 ${isDisliked ? 'fill-current' : ''}`} />
                        {content.dislikes + (isDisliked ? 1 : 0)}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className={`border-gray-600 ${isFavorite ? 'text-red-400 border-red-400' : 'text-white'} hover:bg-gray-800`}
                        onClick={() => setIsFavorite(!isFavorite)}
                      >
                        <Heart className={`w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0 ${isFavorite ? 'fill-current' : ''}`} />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-white hover:bg-gray-800"
                      >
                        <Share2 className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-white hover:bg-gray-800"
                      >
                        <Download className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                      </Button>
                    </div>
                  </div>

                  {/* Genres */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {content.genres.map((genre) => (
                      <Badge key={genre} variant="outline" className="border-gray-600 text-gray-300">
                        {genre}
                      </Badge>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {content.description}
                  </p>

                  {/* Additional Info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">المخرج:</span>
                      <p className="text-white">{content.director}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">اللغة:</span>
                      <p className="text-white">{content.language}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">المشاهدات:</span>
                      <p className="text-white">{content.views}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">الترجمة:</span>
                      <p className="text-white">{content.subtitle ? 'متوفرة' : 'غير متوفرة'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <Card className="bg-gray-900/50 border-gray-800 mt-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">
                      التعليقات ({Math.floor(Math.random() * 100)})
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowComments(!showComments)}
                      className="border-gray-600 text-white hover:bg-gray-800"
                    >
                      <MessageCircle className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                      {showComments ? 'إخفاء' : 'عرض'} التعليقات
                      {showComments ? <ChevronUp className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" /> : <ChevronDown className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />}
                    </Button>
                  </div>
                  
                  {showComments && (
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">أ</span>
                          </div>
                          <div>
                            <h4 className="text-white font-medium">أحمد محمد</h4>
                            <p className="text-gray-400 text-xs">منذ ساعتين</p>
                          </div>
                        </div>
                        <p className="text-gray-300">فيلم رائع! أستمتعت بمشاهدته كثيراً. التمثيل والإخراج على مستوى عالي.</p>
                      </div>
                      
                      <div className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">س</span>
                          </div>
                          <div>
                            <h4 className="text-white font-medium">سارة أحمد</h4>
                            <p className="text-gray-400 text-xs">منذ 3 ساعات</p>
                          </div>
                        </div>
                        <p className="text-gray-300">شكراً لكم على توفير هذا المحتوى الرائع بجودة عالية.</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Servers */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">السيرفرات</h3>
                  <div className="space-y-2">
                    {content.servers.map((server) => (
                      <Button
                        key={server.id}
                        variant={currentServer.id === server.id ? "default" : "outline"}
                        className={`w-full justify-start ${
                          currentServer.id === server.id
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'border-gray-600 text-white hover:bg-gray-800'
                        } ${server.status === 'maintenance' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => server.status === 'active' && changeServer(server)}
                        disabled={server.status === 'maintenance'}
                      >
                        <Monitor className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                        <div className="flex-1 text-right rtl:text-left">
                          <div>{server.name}</div>
                          <div className="text-xs opacity-70">{server.quality}</div>
                        </div>
                        {server.status === 'maintenance' && (
                          <Badge className="bg-red-600 text-white text-xs border-0">
                            صيانة
                          </Badge>
                        )}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Subtitles */}
              {content.subtitle && (
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-4">الترجمة</h3>
                    <div className="space-y-2">
                      {content.subtitles.map((subtitle) => (
                        <Button
                          key={subtitle.id}
                          variant={currentSubtitle.id === subtitle.id ? "default" : "outline"}
                          className={`w-full justify-start ${
                            currentSubtitle.id === subtitle.id
                              ? 'bg-purple-600 hover:bg-purple-700 text-white'
                              : 'border-gray-600 text-white hover:bg-gray-800'
                          }`}
                          onClick={() => setCurrentSubtitle(subtitle)}
                        >
                          <Subtitles className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                          {subtitle.language}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Related Content */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">محتوى مشابه</h3>
                  <div className="space-y-3">
                    {relatedContent.slice(0, 6).map((item) => (
                      <Link key={item.id} href={`/watch/${item.id}`}>
                        <div className="flex space-x-3 rtl:space-x-reverse p-2 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer">
                          <img 
                            src={item.poster}
                            alt={item.title}
                            className="w-16 h-24 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="text-white text-sm font-medium line-clamp-2 mb-1">
                              {item.title}
                            </h4>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <Badge className="bg-yellow-600 text-white border-0 text-xs">
                                <Star className="w-2 h-2 mr-1 rtl:ml-1 rtl:mr-0" />
                                {item.rating}
                              </Badge>
                              <span className="text-gray-400 text-xs">{item.year}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WatchPage