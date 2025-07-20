'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X, Play, Volume2, VolumeX, Maximize, ChevronRight } from 'lucide-react'

interface AdConfig {
  id: string
  type: 'video' | 'banner' | 'popup' | 'overlay'
  title: string
  description?: string
  imageUrl: string
  videoUrl?: string
  clickUrl: string
  duration: number // بالثواني
  skipAfter: number // يمكن التخطي بعد كم ثانية
  enabled: boolean
  position: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'floating'
}

const defaultAds: AdConfig[] = [
  {
    id: 'pre-roll-video',
    type: 'video',
    title: 'إعلان ترويجي',
    description: 'منتج رائع بخصومات مذهلة',
    imageUrl: '/images/ads/ad-poster.jpg',
    videoUrl: '/videos/ads/pre-roll.mp4',
    clickUrl: 'https://example.com/product',
    duration: 30,
    skipAfter: 5,
    enabled: true,
    position: 'center'
  },
  {
    id: 'banner-top',
    type: 'banner',
    title: 'عرض خاص',
    description: 'خصم 50% على جميع المنتجات',
    imageUrl: '/images/ads/banner-top.jpg',
    clickUrl: 'https://example.com/sale',
    duration: 0,
    skipAfter: 0,
    enabled: true,
    position: 'top'
  },
  {
    id: 'popup-overlay',
    type: 'popup',
    title: 'عرض محدود',
    description: 'اشترك الآن واحصل على خصم 30%',
    imageUrl: '/images/ads/popup.jpg',
    clickUrl: 'https://example.com/subscribe',
    duration: 10,
    skipAfter: 3,
    enabled: true,
    position: 'center'
  }
]

interface VideoAdPlayerProps {
  ad: AdConfig
  onSkip: () => void
  onComplete: () => void
  onAdClick: () => void
}

function VideoAdPlayer({ ad, onSkip, onComplete, onAdClick }: VideoAdPlayerProps) {
  const [timeLeft, setTimeLeft] = useState(ad.duration)
  const [canSkip, setCanSkip] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete()
      return
    }

    if (timeLeft <= ad.duration - ad.skipAfter) {
      setCanSkip(true)
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, ad.duration, ad.skipAfter, onComplete])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-4xl mx-4">
        {/* Video Player */}
        <div className="relative bg-black rounded-lg overflow-hidden">
          {/* إعلان فيديو مزيف */}
          <div 
            className="relative w-full h-96 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center cursor-pointer"
            onClick={onAdClick}
          >
            <div className="text-center text-white">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="text-2xl font-bold mb-2">{ad.title}</h3>
              <p className="text-lg opacity-90">{ad.description}</p>
              <div className="mt-4 text-sm opacity-75">
                انقر للمزيد من التفاصيل
              </div>
            </div>
          </div>

          {/* شريط التحكم */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:bg-white/20"
                >
                  <Play className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-white text-sm">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* شريط التقدم */}
            <div className="mt-2 bg-white/20 rounded-full h-1">
              <div 
                className="bg-[#26baee] h-1 rounded-full transition-all duration-1000"
                style={{ width: `${((ad.duration - timeLeft) / ad.duration) * 100}%` }}
              />
            </div>
          </div>

          {/* زر التخطي */}
          <div className="absolute top-4 right-4">
            {canSkip ? (
              <Button
                onClick={onSkip}
                className="bg-black/70 hover:bg-black/90 text-white border border-white/30"
              >
                <X className="h-4 w-4 mr-2" />
                تخطي الإعلان
              </Button>
            ) : (
              <div className="bg-black/70 text-white px-4 py-2 rounded border border-white/30">
                يمكن التخطي خلال {ad.skipAfter - (ad.duration - timeLeft)} ث
              </div>
            )}
          </div>

          {/* معلومات الإعلان */}
          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
            إعلان
          </div>
        </div>
      </div>
    </div>
  )
}

interface BannerAdProps {
  ad: AdConfig
  onClose: () => void
  onAdClick: () => void
}

function BannerAd({ ad, onClose, onAdClick }: BannerAdProps) {
  return (
    <div className={`relative w-full bg-gradient-to-r from-[#26baee] to-[#1fa3d1] ${
      ad.position === 'top' ? 'order-first' : 'order-last'
    }`}>
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-black/10 transition-colors"
        onClick={onAdClick}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-2xl">📢</span>
          </div>
          <div className="text-white">
            <h4 className="font-bold">{ad.title}</h4>
            {ad.description && <p className="text-sm opacity-90">{ad.description}</p>}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <ChevronRight className="h-5 w-5 text-white" />
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

interface PopupAdProps {
  ad: AdConfig
  onClose: () => void
  onAdClick: () => void
}

function PopupAd({ ad, onClose, onAdClick }: PopupAdProps) {
  const [timeLeft, setTimeLeft] = useState(ad.skipAfter)
  const [canClose, setCanClose] = useState(ad.skipAfter === 0)

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanClose(true)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* زر الإغلاق */}
        <div className="absolute top-3 right-3 z-10">
          {canClose ? (
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="bg-black/70 hover:bg-black/90 text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          ) : (
            <div className="bg-black/70 text-white px-2 py-1 rounded text-xs">
              {timeLeft}
            </div>
          )}
        </div>

        {/* محتوى الإعلان */}
        <div 
          className="p-6 text-center cursor-pointer"
          onClick={onAdClick}
        >
          <div className="text-6xl mb-4">🎁</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{ad.title}</h3>
          {ad.description && (
            <p className="text-gray-600 mb-4">{ad.description}</p>
          )}
          <Button className="bg-[#26baee] hover:bg-[#1fa3d1] text-white">
            احصل على العرض الآن
          </Button>
        </div>
      </div>
    </div>
  )
}

interface AdSystemProps {
  enabled?: boolean
  position?: 'before-content' | 'after-content' | 'floating'
  onAdComplete?: () => void
}

export function AdSystem({ enabled = true, position = 'before-content', onAdComplete }: AdSystemProps) {
  const [currentAd, setCurrentAd] = useState<AdConfig | null>(null)
  const [showAd, setShowAd] = useState(false)
  const [adQueue, setAdQueue] = useState<AdConfig[]>([])

  useEffect(() => {
    if (!enabled) return

    // تحميل الإعلانات المتاحة
    const enabledAds = defaultAds.filter(ad => ad.enabled)
    setAdQueue(enabledAds)

    // عرض أول إعلان إذا كان متاحاً
    if (enabledAds.length > 0) {
      setCurrentAd(enabledAds[0])
      setShowAd(true)
    }
  }, [enabled])

  const handleAdSkip = () => {
    setShowAd(false)
    setCurrentAd(null)
    onAdComplete?.()
  }

  const handleAdComplete = () => {
    setShowAd(false)
    setCurrentAd(null)
    onAdComplete?.()
  }

  const handleAdClick = () => {
    if (currentAd?.clickUrl) {
      window.open(currentAd.clickUrl, '_blank')
    }
  }

  if (!enabled || !currentAd || !showAd) {
    return null
  }

  return (
    <>
      {currentAd.type === 'video' && (
        <VideoAdPlayer
          ad={currentAd}
          onSkip={handleAdSkip}
          onComplete={handleAdComplete}
          onAdClick={handleAdClick}
        />
      )}

      {currentAd.type === 'banner' && (
        <BannerAd
          ad={currentAd}
          onClose={handleAdSkip}
          onAdClick={handleAdClick}
        />
      )}

      {currentAd.type === 'popup' && (
        <PopupAd
          ad={currentAd}
          onClose={handleAdSkip}
          onAdClick={handleAdClick}
        />
      )}
    </>
  )
}

// Hook لإدارة الإعلانات
export function useAdSystem() {
  const [adsEnabled, setAdsEnabled] = useState(true)
  const [adBlocker, setAdBlocker] = useState(false)

  useEffect(() => {
    // فحص وجود أداة حجب الإعلانات
    const checkAdBlocker = () => {
      const testAd = document.createElement('div')
      testAd.className = 'adsbox'
      testAd.style.position = 'absolute'
      testAd.style.left = '-10000px'
      document.body.appendChild(testAd)
      
      setTimeout(() => {
        const isBlocked = testAd.offsetHeight === 0
        setAdBlocker(isBlocked)
        document.body.removeChild(testAd)
      }, 100)
    }

    checkAdBlocker()
  }, [])

  const skipAds = () => {
    setAdsEnabled(false)
    localStorage.setItem('ads-disabled', 'true')
  }

  const enableAds = () => {
    setAdsEnabled(true)
    localStorage.removeItem('ads-disabled')
  }

  return {
    adsEnabled,
    adBlocker,
    skipAds,
    enableAds
  }
}