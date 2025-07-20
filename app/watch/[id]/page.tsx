'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { MainHeader } from '@/components/layout/main-header'
import { MainMenu } from '@/components/layout/main-menu'
import { SearchBox } from '@/components/layout/search-box'
import { Footer } from '@/components/layout/footer'
import { AdSystem } from '@/components/ads/ad-system'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  PlayIcon, 
  PauseIcon, 
  VolumeHighIcon, 
  VolumeMuteIcon,
  ArrowsPointingOutIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  ShareIcon,
  FlagIcon
} from '@heroicons/react/24/outline'

export default function WatchPage() {
  const params = useParams()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [quality, setQuality] = useState('1080p')
  const [showAd, setShowAd] = useState(true)
  const [adCountdown, setAdCountdown] = useState(15)
  const [canSkipAd, setCanSkipAd] = useState(false)
  const [showQualityMenu, setShowQualityMenu] = useState(false)

  // بيانات وهمية للمحتوى
  const content = {
    id: params.id,
    title: 'فيلم اكشن مثير 2024',
    description: 'قصة مشوقة عن مغامرة خطيرة في عالم مليء بالتحديات والإثارة.',
    poster: '/images/poster-placeholder.jpg',
    year: 2024,
    rating: 8.5,
    genre: ['أكشن', 'إثارة', 'مغامرة'],
    duration: '2:15:30',
    views: '1.2M',
    likes: '45K',
    videoUrl: '/videos/sample-video.mp4',
    cast: ['محمد رمضان', 'ياسمين صبري', 'أحمد السقا'],
    director: 'محمد سعد',
    language: 'العربية',
    subtitles: ['العربية', 'الإنجليزية', 'الفرنسية']
  }

  // إدارة العد التنازلي للإعلان
  useEffect(() => {
    if (showAd && adCountdown > 0) {
      const timer = setTimeout(() => {
        setAdCountdown(prev => prev - 1)
      }, 1000)
      
      if (adCountdown <= 5) {
        setCanSkipAd(true)
      }
      
      return () => clearTimeout(timer)
    }
  }, [showAd, adCountdown])

  // إخفاء الكونترولز تلقائياً
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isPlaying) setShowControls(false)
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [showControls, isPlaying])

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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const skipAd = () => {
    if (canSkipAd) {
      setShowAd(false)
    }
  }

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div dir="rtl" className="header-fixed body-watch min-h-screen bg-gray-900">
      <span className="site-overlay"></span>
      
      <MainMenu />
      <SearchBox />
      
      <div className="site-container">
        <div className="main-header-top"></div>
        <MainHeader />
        <div className="main-header-height"></div>
        
        <div className="container mx-auto px-4 py-6">
          {/* مشغل الفيديو */}
          <div className="video-player-container mb-6">
            <div 
              className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group"
              onMouseMove={() => setShowControls(true)}
              onMouseLeave={() => isPlaying && setShowControls(false)}
            >
              {/* الإعلان */}
              {showAd && (
                <div className="absolute inset-0 z-50">
                  <AdSystem
                    type="video"
                    position="overlay"
                    videoSrc="/ads/sample-ad.mp4"
                    clickUrl="https://example.com"
                    duration={15}
                    onAdEnd={() => setShowAd(false)}
                    showSkipButton={canSkipAd}
                    skipCountdown={adCountdown}
                    onSkip={skipAd}
                  />
                </div>
              )}
              
              {/* الفيديو الرئيسي */}
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                poster={content.poster}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onDurationChange={(e) => setDuration(e.currentTarget.duration)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={content.videoUrl} type="video/mp4" />
                <track kind="subtitles" src="/subtitles/ar.vtt" srcLang="ar" label="العربية" default />
                <track kind="subtitles" src="/subtitles/en.vtt" srcLang="en" label="English" />
              </video>
              
              {/* كونترولز المشغل */}
              {showControls && !showAd && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-between pointer-events-none">
                  {/* شريط علوي */}
                  <div className="flex justify-between items-center p-4 pointer-events-auto">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <h2 className="text-white font-bold text-lg">{content.title}</h2>
                      <Badge variant="secondary" className="bg-red-600 text-white">
                        مباشر
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                        onClick={() => setShowQualityMenu(!showQualityMenu)}
                      >
                        <Cog6ToothIcon className="w-5 h-5 ml-2" />
                        {quality}
                      </Button>
                      
                      {showQualityMenu && (
                        <div className="absolute top-12 right-0 bg-black/90 backdrop-blur-sm rounded-lg p-2 min-w-[120px]">
                          {['720p', '1080p', '1440p', '4K'].map((q) => (
                            <button
                              key={q}
                              className={`block w-full text-right px-3 py-2 text-white hover:bg-white/20 rounded ${
                                quality === q ? 'bg-[#26baee]' : ''
                              }`}
                              onClick={() => {
                                setQuality(q)
                                setShowQualityMenu(false)
                              }}
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* زر التشغيل المركزي */}
                  <div className="flex-1 flex items-center justify-center pointer-events-auto">
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-20 h-20 rounded-full bg-black/50 hover:bg-black/70 text-white border-2 border-white/30"
                      onClick={togglePlay}
                    >
                      {isPlaying ? (
                        <PauseIcon className="w-8 h-8" />
                      ) : (
                        <PlayIcon className="w-8 h-8 mr-1" />
                      )}
                    </Button>
                  </div>
                  
                  {/* شريط سفلي */}
                  <div className="p-4 space-y-3 pointer-events-auto">
                    {/* شريط التقدم */}
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <span className="text-white text-sm min-w-fit">{formatTime(currentTime)}</span>
                      <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={handleSeek}
                        className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <span className="text-white text-sm min-w-fit">{formatTime(duration)}</span>
                    </div>
                    
                    {/* كونترولز التحكم */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/20"
                          onClick={togglePlay}
                        >
                          {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                        </Button>
                        
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-white/20"
                            onClick={toggleMute}
                          >
                            {isMuted ? <VolumeMuteIcon className="w-5 h-5" /> : <VolumeHighIcon className="w-5 h-5" />}
                          </Button>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/20"
                          onClick={toggleFullscreen}
                        >
                          <ArrowsPointingOutIcon className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* معلومات المحتوى */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* معلومات أساسية */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-white mb-2">{content.title}</h1>
                      <div className="flex items-center space-x-4 space-x-reverse text-gray-300 text-sm">
                        <span>{content.year}</span>
                        <span>•</span>
                        <span>{content.duration}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          ⭐ {content.rating}/10
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                        <HeartIcon className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                        <ShareIcon className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                        <FlagIcon className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {content.genre.map((g, index) => (
                      <Badge key={index} variant="secondary" className="bg-[#26baee]/20 text-[#26baee]">
                        {g}
                      </Badge>
                    ))}
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed mb-4">{content.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">المخرج:</span>
                      <span className="text-white mr-2">{content.director}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">اللغة:</span>
                      <span className="text-white mr-2">{content.language}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">المشاهدات:</span>
                      <span className="text-white mr-2">{content.views}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">الإعجابات:</span>
                      <span className="text-white mr-2">{content.likes}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* طاقم التمثيل */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">طاقم التمثيل</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {content.cast.map((actor, index) => (
                      <div key={index} className="text-center">
                        <div className="w-20 h-20 bg-gray-700 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <span className="text-gray-400 text-lg">👤</span>
                        </div>
                        <p className="text-white text-sm font-medium">{actor}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* التعليقات */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <ChatBubbleLeftRightIcon className="w-6 h-6 ml-2" />
                      التعليقات
                    </h3>
                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                      إضافة تعليق
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {[1, 2, 3].map((comment) => (
                      <div key={comment} className="flex space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-gray-400">👤</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 space-x-reverse mb-1">
                            <span className="text-white font-medium">مستخدم {comment}</span>
                            <span className="text-gray-400 text-sm">منذ ساعة</span>
                          </div>
                          <p className="text-gray-300 text-sm">فيلم رائع جداً! أنصح الجميع بمشاهدته</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* الشريط الجانبي */}
            <div className="space-y-6">
              {/* إعلان جانبي */}
              <AdSystem
                type="banner"
                position="sidebar"
                imageUrl="/ads/banner-300x250.jpg"
                clickUrl="https://example.com"
                altText="إعلان"
              />
              
              {/* محتوى مقترح */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">محتوى مقترح</h3>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="flex space-x-3 space-x-reverse group cursor-pointer">
                        <div className="w-20 h-12 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                          <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white text-sm font-medium group-hover:text-[#26baee] transition-colors line-clamp-2">
                            عنوان المحتوى المقترح {item}
                          </h4>
                          <p className="text-gray-400 text-xs mt-1">2024 • 1:45:00</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* إعلان آخر */}
              <AdSystem
                type="banner"
                position="sidebar"
                imageUrl="/ads/banner-300x600.jpg"
                clickUrl="https://example.com"
                altText="إعلان طويل"
              />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      
      <style jsx global>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #26baee;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #26baee;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}