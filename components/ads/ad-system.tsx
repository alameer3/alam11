'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  XMarkIcon, 
  PlayIcon, 
  PauseIcon, 
  SpeakerWaveIcon,
  SpeakerXMarkIcon 
} from '@heroicons/react/24/outline'

export interface AdSystemProps {
  type: 'video' | 'banner' | 'popup' | 'interstitial' | 'native'
  position?: 'header' | 'sidebar' | 'content' | 'footer' | 'overlay' | 'floating' | 'popup'
  imageUrl?: string
  videoSrc?: string
  clickUrl?: string
  altText?: string
  duration?: number
  onAdStart?: () => void
  onAdEnd?: () => void
  onAdClick?: () => void
  onSkip?: () => void
  showSkipButton?: boolean
  skipCountdown?: number
  autoPlay?: boolean
  muted?: boolean
  width?: string
  height?: string
  className?: string
  adBlockerDetected?: boolean
}

export function AdSystem({
  type,
  position = 'content',
  imageUrl,
  videoSrc,
  clickUrl,
  altText = 'إعلان',
  duration = 15,
  onAdStart,
  onAdEnd,
  onAdClick,
  onSkip,
  showSkipButton = false,
  skipCountdown = 5,
  autoPlay = true,
  muted = true,
  width,
  height,
  className = '',
  adBlockerDetected = false
}: AdSystemProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(muted)
  const [currentTime, setCurrentTime] = useState(0)
  const [adDuration, setAdDuration] = useState(duration)
  const [countdown, setCountdown] = useState(skipCountdown)
  const [canSkip, setCanSkip] = useState(showSkipButton)
  const [isHovered, setIsHovered] = useState(false)
  const [adBlocked, setAdBlocked] = useState(adBlockerDetected)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // كشف مانع الإعلانات
  useEffect(() => {
    const detectAdBlocker = () => {
      const testAd = document.createElement('div')
      testAd.innerHTML = '&nbsp;'
      testAd.className = 'adsbox'
      testAd.style.position = 'absolute'
      testAd.style.left = '-10000px'
      document.body.appendChild(testAd)
      
      setTimeout(() => {
        if (testAd.offsetHeight === 0) {
          setAdBlocked(true)
        }
        document.body.removeChild(testAd)
      }, 100)
    }
    
    detectAdBlocker()
  }, [])

  // إدارة العد التنازلي للتخطي
  useEffect(() => {
    if (type === 'video' && isPlaying && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
      
      if (countdown <= 1) {
        setCanSkip(true)
      }
      
      return () => clearTimeout(timer)
    }
  }, [type, isPlaying, countdown])

  // إدارة الفيديو
  useEffect(() => {
    const video = videoRef.current
    if (!video || type !== 'video') return

    const handlePlay = () => {
      setIsPlaying(true)
      onAdStart?.()
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const handleLoadedMetadata = () => {
      setAdDuration(video.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      onAdEnd?.()
      if (position === 'overlay') {
        setIsVisible(false)
      }
    }

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('ended', handleEnded)

    if (autoPlay) {
      video.play().catch(() => {
        // التعامل مع فشل التشغيل التلقائي
        setIsPlaying(false)
      })
    }

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('ended', handleEnded)
    }
  }, [type, autoPlay, onAdStart, onAdEnd, position])

  // الإعلانات المنبثقة - إخفاء تلقائي
  useEffect(() => {
    if (type === 'popup' || type === 'interstitial') {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, duration * 1000)
      
      return () => clearTimeout(timer)
    }
  }, [type, duration])

  const handleAdClick = () => {
    onAdClick?.()
    if (clickUrl) {
      window.open(clickUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const handleSkip = () => {
    if (canSkip) {
      onSkip?.()
      setIsVisible(false)
    }
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  if (!isVisible) return null

  // رسالة مانع الإعلانات
  if (adBlocked) {
    return (
      <Card className="bg-yellow-100 border-yellow-400 text-yellow-800 p-4 text-center">
        <p className="text-sm">
          🛡️ تم اكتشاف مانع الإعلانات. يرجى إيقافه لدعم الموقع.
        </p>
      </Card>
    )
  }

  const getContainerClasses = () => {
    const baseClasses = 'ad-container'
    const positionClasses = {
      header: 'w-full',
      sidebar: 'w-full max-w-sm',
      content: 'w-full max-w-4xl mx-auto',
      footer: 'w-full',
      overlay: 'fixed inset-0 z-50 flex items-center justify-center bg-black/80',
      floating: 'fixed bottom-4 right-4 z-40',
      popup: 'fixed inset-0 z-50 flex items-center justify-center bg-black/50'
    }
    
    return `${baseClasses} ${positionClasses[position]} ${className}`
  }

  const getSizeClasses = () => {
    if (width && height) {
      return { width, height }
    }
    
    const defaultSizes = {
      'header-banner': { width: '728px', height: '90px' },
      'sidebar-banner': { width: '300px', height: '250px' },
      'content-banner': { width: '728px', height: '90px' },
      'large-banner': { width: '970px', height: '250px' },
      'mobile-banner': { width: '320px', height: '50px' },
      'square': { width: '250px', height: '250px' },
      'skyscraper': { width: '160px', height: '600px' }
    }
    
    // اختيار الحجم بناء على الموضع والنوع
    if (position === 'sidebar') return defaultSizes['sidebar-banner']
    if (position === 'header' || position === 'footer') return defaultSizes['header-banner']
    return defaultSizes['content-banner']
  }

  // إعلان فيديو
  if (type === 'video') {
    return (
      <div className={getContainerClasses()}>
        <div 
          className="relative bg-black rounded-lg overflow-hidden"
          style={getSizeClasses()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover cursor-pointer"
            muted={isMuted}
            onClick={handleAdClick}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          
          {/* كونترولز الفيديو */}
          {isHovered && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                      onClick={togglePlay}
                    >
                      {isPlaying ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                      onClick={toggleMute}
                    >
                      {isMuted ? <SpeakerXMarkIcon className="w-4 h-4" /> : <SpeakerWaveIcon className="w-4 h-4" />}
                    </Button>
                    
                    <span className="text-xs">
                      {formatTime(currentTime)} / {formatTime(adDuration)}
                    </span>
                  </div>
                  
                  <div className="text-xs bg-black/50 px-2 py-1 rounded">
                    إعلان
                  </div>
                </div>
                
                {/* شريط التقدم */}
                <div className="w-full bg-white/20 h-1 rounded-full mt-2">
                  <div 
                    className="bg-white h-full rounded-full transition-all"
                    style={{ width: `${(currentTime / adDuration) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* زر التخطي */}
          {canSkip && (
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4 bg-black/70 text-white hover:bg-black/90"
              onClick={handleSkip}
            >
              تخطي {countdown > 0 && `(${countdown})`}
            </Button>
          )}
          
          {/* معلومات الإعلان */}
          <div className="absolute top-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
            إعلان • {clickUrl && 'اضغط للمزيد'}
          </div>
        </div>
      </div>
    )
  }

  // إعلان بانر
  if (type === 'banner') {
    return (
      <div className={getContainerClasses()}>
        <Card 
          className="bg-gray-800/50 border-gray-700 overflow-hidden hover:border-gray-600 transition-colors cursor-pointer group"
          onClick={handleAdClick}
          style={getSizeClasses()}
        >
          <div className="relative w-full h-full">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={altText}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-2xl mb-2">📢</div>
                  <p className="text-sm font-medium">مساحة إعلانية</p>
                  <p className="text-xs opacity-80">اضغط للمزيد</p>
                </div>
              </div>
            )}
            
            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              إعلان
            </div>
            
            {position === 'popup' && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 text-white hover:bg-black/20"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClose()
                }}
              >
                <XMarkIcon className="w-4 h-4" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    )
  }

  // إعلان منبثق
  if (type === 'popup' || type === 'interstitial') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <Card className="bg-white max-w-lg w-full mx-4 overflow-hidden">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 z-10"
              onClick={handleClose}
            >
              <XMarkIcon className="w-5 h-5" />
            </Button>
            
            <div 
              className="cursor-pointer"
              onClick={handleAdClick}
            >
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={altText}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-4">🎯</div>
                    <h3 className="text-xl font-bold mb-2">عرض خاص!</h3>
                    <p className="text-sm opacity-90">اضغط لمعرفة المزيد</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 bg-gray-50 text-center">
              <p className="text-sm text-gray-600">
                سيتم إغلاق هذا الإعلان تلقائياً خلال {Math.ceil((duration * 1000 - currentTime * 1000) / 1000)} ثانية
              </p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // إعلان أصلي (Native)
  if (type === 'native') {
    return (
      <Card className="bg-gray-800/50 border-gray-700 p-4 cursor-pointer hover:bg-gray-800/70 transition-colors" onClick={handleAdClick}>
        <div className="flex items-start space-x-3 space-x-reverse">
          <div className="w-16 h-16 bg-gray-600 rounded-lg flex-shrink-0 overflow-hidden">
            {imageUrl ? (
              <img src={imageUrl} alt={altText} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-sm">📱</span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 space-x-reverse mb-1">
              <h4 className="text-white font-medium text-sm">محتوى مُروّج</h4>
              <span className="text-xs text-gray-400 bg-gray-700 px-2 py-0.5 rounded">إعلان</span>
            </div>
            <p className="text-gray-300 text-sm line-clamp-2">
              اكتشف المنتجات والخدمات الجديدة التي قد تهمك. اضغط لمعرفة المزيد من التفاصيل.
            </p>
            <p className="text-[#26baee] text-xs mt-1 hover:underline">
              اضغط للمزيد →
            </p>
          </div>
        </div>
      </Card>
    )
  }

  return null
}

// Hook لكشف مانع الإعلانات
export function useAdBlocker() {
  const [isBlocked, setIsBlocked] = useState(false)

  useEffect(() => {
    const detectAdBlocker = async () => {
      try {
        // محاولة تحميل ملف إعلاني وهمي
        const response = await fetch('/ads/test-ad.js')
        if (!response.ok) {
          setIsBlocked(true)
        }
      } catch {
        setIsBlocked(true)
      }
    }

    detectAdBlocker()
  }, [])

  return isBlocked
}