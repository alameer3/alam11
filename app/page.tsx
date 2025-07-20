import React from 'react'
import Link from 'next/link'
import { 
  Play, 
  TrendingUp, 
  Star, 
  Calendar, 
  Eye,
  Clock,
  ChevronRight,
  Flame,
  Sparkles,
  Award
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { IMAGES, optimizeImage } from '@/lib/images'

// محاكاة البيانات بناءً على هيكل ak.sv
const heroContent = {
  title: "أحدث الأفلام والمسلسلات",
  subtitle: "شاهد أجمل المحتويات العربية والعالمية",
  featured: {
    id: 1,
    title: "فيلم مميز حديث",
    description: "قصة مثيرة تأخذك في رحلة لا تُنسى مع أفضل النجوم",
    poster: "/api/placeholder/300/450",
    backdrop: "/api/placeholder/1920/1080",
    year: 2024,
    rating: 8.5,
    duration: "2h 15m",
    genres: ["دراما", "إثارة"]
  }
}

const sections = [
  {
    id: 'trending',
    title: 'الأكثر مشاهدة',
    subtitle: 'المحتوى الذي يتابعه الجميع الآن',
    icon: <Flame className="w-5 h-5" />,
    href: '/ones',
    color: 'from-red-500 to-orange-500'
  },
  {
    id: 'movies',
    title: 'الأفلام',
    subtitle: 'مجموعة ضخمة من أحدث الأفلام',
    icon: <Play className="w-5 h-5" />,
    href: '/movies',
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 'series',
    title: 'المسلسلات',
    subtitle: 'مسلسلات متنوعة ومثيرة',
    icon: <Star className="w-5 h-5" />,
    href: '/series',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'shows',
    title: 'التلفزيون',
    subtitle: 'برامج تلفزيونية متنوعة',
    icon: <Clock className="w-5 h-5" />,
    href: '/shows',
    color: 'from-yellow-500 to-red-500'
  },
  {
    id: 'mix',
    title: 'المنوعات',
    subtitle: 'محتوى متنوع ومميز',
    icon: <Sparkles className="w-5 h-5" />,
    href: '/mix',
    color: 'from-purple-500 to-pink-500'
  }
]

// محاكاة المحتوى المميز
const featuredItems = [
  {
    id: 1,
    title: "المحتوى المميز 1",
    poster: "/api/placeholder/200/300",
    rating: 8.7,
    year: 2024,
    type: "فيلم"
  },
  {
    id: 2,
    title: "المحتوى المميز 2", 
    poster: "/api/placeholder/200/300",
    rating: 9.1,
    year: 2024,
    type: "مسلسل"
  },
  {
    id: 3,
    title: "المحتوى المميز 3",
    poster: "/api/placeholder/200/300", 
    rating: 8.3,
    year: 2023,
    type: "فيلم"
  },
  {
    id: 4,
    title: "المحتوى المميز 4",
    poster: "/api/placeholder/200/300",
    rating: 8.9,
    year: 2024,
    type: "برنامج"
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${optimizeImage(IMAGES.hero.movie, 1920, 1080)})`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl">
            {/* Badges */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-6">
              <div className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors bg-red-600 hover:bg-red-700 text-white border-0">
                <Sparkles className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
                جديد
              </div>
              <div className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors border border-gray-600 text-gray-300">
                2024
              </div>
            </div>
            
            {/* Title */}
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
              أحدث الأفلام والمسلسلات
            </h1>
            
            {/* Description */}
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-2xl animate-fade-in-delay">
              شاهد أجمل المحتويات العربية والعالمية
            </p>
            
            {/* Featured Content Card */}
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-800 animate-fade-in-delay-2">
              <h3 className="text-2xl font-bold text-white mb-3">فيلم مميز حديث</h3>
              <p className="text-gray-300 mb-4">قصة مثيرة تأخذك في رحلة لا تُنسى مع أفضل النجوم</p>
              
              <div className="flex items-center space-x-6 rtl:space-x-reverse text-sm text-gray-400">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-white font-semibold">8.5</span>
                </div>
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <Clock className="w-4 h-4" />
                  <span>2024</span>
                </div>
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <Clock className="w-4 h-4" />
                  <span>2h 15m</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-3">
              <button className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-10 rounded-md bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg group">
                <Play className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 group-hover:scale-110 transition-transform" />
                شاهد الآن
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-sm hover:text-accent-foreground h-10 rounded-md border-gray-600 text-white hover:bg-gray-800 px-8 py-3 text-lg group">
                <TrendingUp className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 group-hover:scale-110 transition-transform" />
                استكشف المزيد
              </button>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">استكشف عالم الترفيه</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">اكتشف أفضل المحتويات من أفلام ومسلسلات وبرامج متنوعة</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Trending */}
            <Link href="/ones" className="group">
              <div className="rounded-lg border text-card-foreground shadow-sm group bg-gray-900/50 backdrop-blur border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden hover:scale-105">
                <div className="p-0">
                  <div 
                    className="h-24 bg-gradient-to-r from-red-500 to-orange-500 relative"
                    style={{
                      backgroundImage: `url(${optimizeImage(IMAGES.sections.movies, 400, 200)})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-4 right-4 rtl:left-4 rtl:right-auto">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white">
                        <Flame className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">الأكثر مشاهدة</h3>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 rtl:rotate-180 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 18 6-6-6-6" />
                      </svg>
                    </div>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">المحتوى الذي يتابعه الجميع الآن</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Movies */}
            <Link href="/movies" className="group">
              <div className="rounded-lg border text-card-foreground shadow-sm group bg-gray-900/50 backdrop-blur border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden hover:scale-105">
                <div className="p-0">
                  <div 
                    className="h-24 bg-gradient-to-r from-blue-500 to-purple-500 relative"
                    style={{
                      backgroundImage: `url(${optimizeImage(IMAGES.sections.movies, 400, 200)})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-4 right-4 rtl:left-4 rtl:right-auto">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white">
                        <Play className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">الأفلام</h3>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 rtl:rotate-180 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 18 6-6-6-6" />
                      </svg>
                    </div>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">مجموعة ضخمة من أحدث الأفلام</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Series */}
            <Link href="/series" className="group">
              <div className="rounded-lg border text-card-foreground shadow-sm group bg-gray-900/50 backdrop-blur border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden hover:scale-105">
                <div className="p-0">
                  <div 
                    className="h-24 bg-gradient-to-r from-green-500 to-teal-500 relative"
                    style={{
                      backgroundImage: `url(${optimizeImage(IMAGES.sections.series, 400, 200)})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-4 right-4 rtl:left-4 rtl:right-auto">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white">
                        <Star className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">المسلسلات</h3>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 rtl:rotate-180 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 18 6-6-6-6" />
                      </svg>
                    </div>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">مسلسلات متنوعة ومثيرة</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Shows */}
            <Link href="/shows" className="group">
              <div className="rounded-lg border text-card-foreground shadow-sm group bg-gray-900/50 backdrop-blur border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden hover:scale-105">
                <div className="p-0">
                  <div 
                    className="h-24 bg-gradient-to-r from-yellow-500 to-red-500 relative"
                    style={{
                      backgroundImage: `url(${optimizeImage(IMAGES.sections.shows, 400, 200)})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-4 right-4 rtl:left-4 rtl:right-auto">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white">
                        <Clock className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">التلفزيون</h3>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 rtl:rotate-180 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 18 6-6-6-6" />
                      </svg>
                    </div>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">برامج تلفزيونية متنوعة</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Mix */}
            <Link href="/mix" className="group">
              <div className="rounded-lg border text-card-foreground shadow-sm group bg-gray-900/50 backdrop-blur border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden hover:scale-105">
                <div className="p-0">
                  <div 
                    className="h-24 bg-gradient-to-r from-purple-500 to-pink-500 relative"
                    style={{
                      backgroundImage: `url(${optimizeImage(IMAGES.sections.mix, 400, 200)})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-4 right-4 rtl:left-4 rtl:right-auto">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white">
                        <Sparkles className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">المنوعات</h3>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 rtl:rotate-180 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 18 6-6-6-6" />
                      </svg>
                    </div>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">محتوى متنوع ومميز</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">المحتوى المميز</h2>
              <p className="text-gray-400">أفضل المحتويات المختارة بعناية</p>
            </div>
            <Link href="/ones">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-sm hover:text-accent-foreground h-9 px-4 py-2 border-gray-600 text-white hover:bg-gray-800">
                عرض الكل
                <svg className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Link key={item} href={`/movie/${item}`}>
                <div className="rounded-lg border text-card-foreground shadow-sm group bg-gray-900/30 border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden hover:scale-105">
                  <div className="p-0">
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img 
                        src={optimizeImage(IMAGES.featured[`movie${item}` as keyof typeof IMAGES.featured], 200, 300)} 
                        alt={`المحتوى المميز ${item}`} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 rtl:left-3 rtl:right-auto">
                        <div className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors bg-black/70 hover:bg-black/70 text-yellow-500 border-0">
                          <Star className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
                          {8.5 + (item * 0.2)}
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 rtl:right-3 rtl:left-auto">
                        <div className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors bg-white/90 text-gray-900 hover:bg-white">
                          {item % 2 === 0 ? 'مسلسل' : 'فيلم'}
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white mb-1 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        المحتوى المميز {item}
                      </h3>
                      <p className="text-sm text-gray-400">2024</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-gray-400">أفلام</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">5,000+</div>
              <div className="text-gray-400">مسلسلات</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">1M+</div>
              <div className="text-gray-400">مستخدم</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400">مشاهدة</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}