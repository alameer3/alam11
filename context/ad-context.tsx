'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AdSystem } from '@/components/ads/ad-system'

interface AdConfig {
  id: string
  type: 'video' | 'banner' | 'popup' | 'interstitial' | 'native'
  position: 'header' | 'sidebar' | 'content' | 'footer' | 'overlay' | 'floating'
  imageUrl?: string
  videoSrc?: string
  clickUrl?: string
  altText?: string
  duration: number
  showSkipButton: boolean
  skipCountdown: number
  autoPlay: boolean
  muted: boolean
  enabled: boolean
  frequency: number // كم مرة يُعرض الإعلان
  minInterval: number // الحد الأدنى بين الإعلانات (بالثواني)
  targetPages: string[] // الصفحات التي يُعرض فيها
  priority: number // أولوية العرض
}

interface AdContextType {
  ads: AdConfig[]
  currentAd: AdConfig | null
  isAdVisible: boolean
  adBlockerDetected: boolean
  showAd: (adId: string) => void
  hideAd: () => void
  skipAd: () => void
  setAdBlockerDetected: (detected: boolean) => void
  enableAds: () => void
  disableAds: () => void
  adsEnabled: boolean
}

const AdContext = createContext<AdContextType | undefined>(undefined)

const defaultAds: AdConfig[] = [
  {
    id: 'welcome-video',
    type: 'video',
    position: 'overlay',
    videoSrc: '/ads/welcome-video.mp4',
    clickUrl: 'https://example.com/welcome',
    altText: 'إعلان ترحيبي',
    duration: 15,
    showSkipButton: true,
    skipCountdown: 5,
    autoPlay: true,
    muted: true,
    enabled: true,
    frequency: 1,
    minInterval: 300, // 5 دقائق
    targetPages: ['/', '/ones'],
    priority: 1
  },
  {
    id: 'top-banner',
    type: 'banner',
    position: 'header',
    imageUrl: '/ads/top-banner.jpg',
    clickUrl: 'https://example.com/offer',
    altText: 'عرض خاص',
    duration: 0,
    showSkipButton: false,
    skipCountdown: 0,
    autoPlay: false,
    muted: false,
    enabled: true,
    frequency: 0, // دائماً مُفعل
    minInterval: 0,
    targetPages: ['*'], // جميع الصفحات
    priority: 3
  },
  {
    id: 'sidebar-banner',
    type: 'banner',
    position: 'sidebar',
    imageUrl: '/ads/sidebar-banner.jpg',
    clickUrl: 'https://example.com/product',
    altText: 'منتج رائع',
    duration: 0,
    showSkipButton: false,
    skipCountdown: 0,
    autoPlay: false,
    muted: false,
    enabled: true,
    frequency: 0,
    minInterval: 0,
    targetPages: ['/movies', '/series', '/watch'],
    priority: 4
  },
  {
    id: 'pre-roll-video',
    type: 'video',
    position: 'overlay',
    videoSrc: '/ads/pre-roll.mp4',
    clickUrl: 'https://example.com/subscribe',
    altText: 'اشترك معنا',
    duration: 30,
    showSkipButton: true,
    skipCountdown: 10,
    autoPlay: true,
    muted: true,
    enabled: true,
    frequency: 3, // كل 3 مشاهدات
    minInterval: 600, // 10 دقائق
    targetPages: ['/watch'],
    priority: 2
  },
  {
    id: 'popup-special',
    type: 'popup',
    position: 'overlay',
    imageUrl: '/ads/special-offer.jpg',
    clickUrl: 'https://example.com/special',
    altText: 'عرض محدود',
    duration: 10,
    showSkipButton: true,
    skipCountdown: 3,
    autoPlay: false,
    muted: false,
    enabled: true,
    frequency: 5, // كل 5 زيارات
    minInterval: 1800, // 30 دقيقة
    targetPages: ['/', '/movies', '/series'],
    priority: 5
  },
  {
    id: 'native-content',
    type: 'native',
    position: 'content',
    imageUrl: '/ads/native-ad.jpg',
    clickUrl: 'https://example.com/app',
    altText: 'تطبيق جديد',
    duration: 0,
    showSkipButton: false,
    skipCountdown: 0,
    autoPlay: false,
    muted: false,
    enabled: true,
    frequency: 0,
    minInterval: 0,
    targetPages: ['/movies', '/series'],
    priority: 6
  }
]

export function AdProvider({ children }: { children: ReactNode }) {
  const [ads, setAds] = useState<AdConfig[]>(defaultAds)
  const [currentAd, setCurrentAd] = useState<AdConfig | null>(null)
  const [isAdVisible, setIsAdVisible] = useState(false)
  const [adBlockerDetected, setAdBlockerDetected] = useState(false)
  const [adsEnabled, setAdsEnabled] = useState(true)
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({})
  const [lastShown, setLastShown] = useState<Record<string, number>>({})

  // تحميل الإعدادات من localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('ad-settings')
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      setAdsEnabled(settings.enabled ?? true)
      setViewCounts(settings.viewCounts ?? {})
      setLastShown(settings.lastShown ?? {})
    }

    // كشف مانع الإعلانات
    detectAdBlocker()
  }, [])

  // حفظ الإعدادات في localStorage
  useEffect(() => {
    const settings = {
      enabled: adsEnabled,
      viewCounts,
      lastShown
    }
    localStorage.setItem('ad-settings', JSON.stringify(settings))
  }, [adsEnabled, viewCounts, lastShown])

  // كشف مانع الإعلانات
  const detectAdBlocker = () => {
    const testAd = document.createElement('div')
    testAd.innerHTML = '&nbsp;'
    testAd.className = 'adsbox'
    testAd.style.position = 'absolute'
    testAd.style.left = '-10000px'
    testAd.style.height = '1px'
    testAd.style.width = '1px'
    document.body.appendChild(testAd)
    
    setTimeout(() => {
      if (testAd.offsetHeight === 0 || testAd.style.display === 'none') {
        setAdBlockerDetected(true)
      }
      try {
        document.body.removeChild(testAd)
      } catch (e) {
        // التعامل مع الخطأ إذا كان العنصر محذوفاً مسبقاً
      }
    }, 100)
  }

  // اختيار الإعلان المناسب للعرض
  const selectAdForPage = (pagePath: string): AdConfig | null => {
    if (!adsEnabled || adBlockerDetected) return null

    const availableAds = ads.filter(ad => {
      if (!ad.enabled) return false
      
      // فحص الصفحات المستهدفة
      if (!ad.targetPages.includes('*') && !ad.targetPages.includes(pagePath)) {
        return false
      }

      // فحص التكرار
      const viewCount = viewCounts[ad.id] || 0
      if (ad.frequency > 0 && viewCount % ad.frequency !== 0) {
        return false
      }

      // فحص الفترة الزمنية
      const lastShownTime = lastShown[ad.id] || 0
      const now = new Date("2025-07-21T14:00:00Z").getTime()
      if (ad.minInterval > 0 && (now - lastShownTime) < (ad.minInterval * 1000)) {
        return false
      }

      return true
    })

    // ترتيب حسب الأولوية
    availableAds.sort((a, b) => a.priority - b.priority)
    
    return availableAds[0] || null
  }

  // عرض إعلان
  const showAd = (adId: string) => {
    const ad = ads.find(a => a.id === adId)
    if (!ad || !adsEnabled || adBlockerDetected) return

    setCurrentAd(ad)
    setIsAdVisible(true)
    
    // تحديث عدد المشاهدات
    setViewCounts(prev => ({
      ...prev,
      [adId]: (prev[adId] || 0) + 1
    }))
    
    // تحديث وقت آخر عرض
    setLastShown(prev => ({
      ...prev,
      [adId]: new Date("2025-07-21T14:00:00Z").getTime()
    }))
  }

  // إخفاء الإعلان
  const hideAd = () => {
    setIsAdVisible(false)
    setCurrentAd(null)
  }

  // تخطي الإعلان
  const skipAd = () => {
    hideAd()
  }

  // تفعيل الإعلانات
  const enableAds = () => {
    setAdsEnabled(true)
  }

  // إيقاف الإعلانات
  const disableAds = () => {
    setAdsEnabled(false)
    hideAd()
  }

  // عرض إعلان تلقائي عند تحميل الصفحة
  useEffect(() => {
    const currentPath = window.location.pathname
    const shouldShowWelcomeAd = currentPath === '/' || currentPath === '/ones'
    
    if (shouldShowWelcomeAd && adsEnabled && !adBlockerDetected) {
      // تأخير صغير لضمان تحميل الصفحة
      const timer = setTimeout(() => {
        const welcomeAd = selectAdForPage(currentPath)
        if (welcomeAd && welcomeAd.type === 'video') {
          showAd(welcomeAd.id)
        }
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [adsEnabled, adBlockerDetected])

  const value: AdContextType = {
    ads,
    currentAd,
    isAdVisible,
    adBlockerDetected,
    showAd,
    hideAd,
    skipAd,
    setAdBlockerDetected,
    enableAds,
    disableAds,
    adsEnabled
  }

  return (
    <AdContext.Provider value={value}>
      {children}
      
      {/* عرض الإعلان الحالي */}
      {isAdVisible && currentAd && (
        <AdSystem
          type={currentAd.type}
          position={currentAd.position}
          imageUrl={currentAd.imageUrl}
          videoSrc={currentAd.videoSrc}
          clickUrl={currentAd.clickUrl}
          altText={currentAd.altText}
          duration={currentAd.duration}
          onAdEnd={hideAd}
          onSkip={skipAd}
          showSkipButton={currentAd.showSkipButton}
          skipCountdown={currentAd.skipCountdown}
          autoPlay={currentAd.autoPlay}
          muted={currentAd.muted}
          adBlockerDetected={adBlockerDetected}
        />
      )}
      
      {/* رسالة مانع الإعلانات */}
      {adBlockerDetected && (
        <div className="fixed bottom-4 right-4 bg-yellow-500 text-black p-4 rounded-lg shadow-lg z-50 max-w-sm">
          <div className="flex items-start space-x-3 space-x-reverse">
            <span className="text-2xl">🛡️</span>
            <div>
              <h4 className="font-bold text-sm mb-1">مانع الإعلانات مُفعل</h4>
              <p className="text-xs">
                يرجى إيقاف مانع الإعلانات لدعم الموقع والاستمرار في تقديم المحتوى المجاني.
              </p>
              <button 
                onClick={() => setAdBlockerDetected(false)}
                className="mt-2 text-xs underline hover:no-underline"
              >
                أعد المحاولة
              </button>
            </div>
          </div>
        </div>
      )}
    </AdContext.Provider>
  )
}

export function useAds() {
  const context = useContext(AdContext)
  if (context === undefined) {
    throw new Error('useAds must be used within an AdProvider')
  }
  return context
}

// Hook للحصول على إعلانات صفحة معينة
export function usePageAds(pagePath: string) {
  const { ads, showAd, adsEnabled, adBlockerDetected } = useAds()
  
  const getPageAds = (position?: string) => {
    return ads.filter(ad => {
      if (!ad.enabled || !adsEnabled || adBlockerDetected) return false
      if (position && ad.position !== position) return false
      return ad.targetPages.includes('*') || ad.targetPages.includes(pagePath)
    })
  }

  const showPageAd = (position?: string) => {
    const pageAds = getPageAds(position)
    if (pageAds.length > 0) {
      // اختيار إعلان عشوائي من الإعلانات المتاحة
      const randomAd = pageAds[Math.floor(0.5 * pageAds.length)]
      showAd(randomAd.id)
    }
  }

  return {
    getPageAds,
    showPageAd,
    hasAds: getPageAds().length > 0
  }
}