'use client'

import { useState, useEffect } from 'react'
import { MainHeader } from '@/components/layout/main-header'
import { MainMenu } from '@/components/layout/main-menu'
import { SearchBox } from '@/components/layout/search-box'
import { Footer } from '@/components/layout/footer'
import { AdSystem } from '@/components/ads/ad-system'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  CalendarIcon,
  StarIcon,
  ClockIcon,
  EyeIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function MoviesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('newest')
  const [filterGenre, setFilterGenre] = useState('all')
  const [filterYear, setFilterYear] = useState('all')
  const [filterRating, setFilterRating] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // بيانات وهمية للأفلام
  const movies = [
    {
      id: 1,
      title: 'فيلم الأكشن الرائع',
      poster: '/images/movie1.jpg',
      year: 2024,
      rating: 8.5,
      duration: '2h 15m',
      genre: ['أكشن', 'إثارة'],
      views: '1.2M',
      description: 'قصة مثيرة عن مغامرة خطيرة',
      quality: 'HD'
    },
    {
      id: 2,
      title: 'الكوميديا الرومانسية',
      poster: '/images/movie2.jpg',
      year: 2024,
      rating: 7.8,
      duration: '1h 45m',
      genre: ['كوميديا', 'رومانسية'],
      views: '890K',
      description: 'قصة حب مضحكة ومؤثرة',
      quality: '4K'
    },
    {
      id: 3,
      title: 'الدراما العائلية',
      poster: '/images/movie3.jpg',
      year: 2023,
      rating: 9.1,
      duration: '2h 30m',
      genre: ['دراما', 'عائلي'],
      views: '2.1M',
      description: 'قصة عائلية مؤثرة ومليئة بالعواطف',
      quality: 'HD'
    },
    {
      id: 4,
      title: 'فيلم الرعب المرعب',
      poster: '/images/movie4.jpg',
      year: 2024,
      rating: 6.9,
      duration: '1h 55m',
      genre: ['رعب', 'إثارة'],
      views: '650K',
      description: 'تجربة مرعبة ستجعلك على حافة مقعدك',
      quality: 'HD'
    },
    {
      id: 5,
      title: 'مغامرة الخيال العلمي',
      poster: '/images/movie5.jpg',
      year: 2024,
      rating: 8.7,
      duration: '2h 45m',
      genre: ['خيال علمي', 'مغامرة'],
      views: '1.5M',
      description: 'رحلة عبر الفضاء والزمن',
      quality: '4K'
    },
    {
      id: 6,
      title: 'الجريمة والغموض',
      poster: '/images/movie6.jpg',
      year: 2023,
      rating: 8.2,
      duration: '2h 10m',
      genre: ['جريمة', 'غموض'],
      views: '1.1M',
      description: 'لغز جريمة معقد يحتاج لذكاء خارق',
      quality: 'HD'
    }
  ]

  const genres = ['الكل', 'أكشن', 'كوميديا', 'دراما', 'رعب', 'خيال علمي', 'رومانسية', 'جريمة', 'مغامرة', 'عائلي']
  const years = ['الكل', '2024', '2023', '2022', '2021', '2020']
  const ratings = ['الكل', '9+ نجوم', '8+ نجوم', '7+ نجوم', '6+ نجوم']

  const filteredMovies = movies.filter(movie => {
    if (filterGenre !== 'all' && !movie.genre.includes(filterGenre)) return false
    if (filterYear !== 'all' && movie.year.toString() !== filterYear) return false
    if (filterRating !== 'all') {
      const minRating = parseInt(filterRating.split('+')[0])
      if (movie.rating < minRating) return false
    }
    return true
  })

  const sortedMovies = filteredMovies.sort((a, b) => {
    switch (sortBy) {
      case 'newest': return b.year - a.year
      case 'oldest': return a.year - b.year
      case 'rating': return b.rating - a.rating
      case 'popular': return parseFloat(b.views.replace('M', '').replace('K', '')) - parseFloat(a.views.replace('M', '').replace('K', ''))
      default: return 0
    }
  })

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [sortBy, filterGenre, filterYear, filterRating])

  return (
    <div dir="rtl" className="header-fixed body-movies min-h-screen">
      <span className="site-overlay"></span>
      
      <MainMenu />
      <SearchBox />
      
      <div className="site-container">
        <div className="main-header-top"></div>
        <MainHeader />
        <div className="main-header-height"></div>
        
        <div className="container mx-auto px-4 py-6">
          {/* عنوان الصفحة */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center">
              <span className="text-5xl ml-4">🎬</span>
              الأفلام
            </h1>
            <p className="text-gray-300 text-lg">
              اكتشف أحدث وأفضل الأفلام العربية والأجنبية
            </p>
          </div>

          {/* شريط الفلترة والترتيب */}
          <Card className="bg-gray-800/50 border-gray-700 mb-6">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <FunnelIcon className="w-5 h-5 text-gray-400" />
                    <span className="text-white font-medium">الفلاتر:</span>
                  </div>
                  
                  <Select value={filterGenre} onValueChange={setFilterGenre}>
                    <SelectTrigger className="w-[140px] bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="النوع" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {genres.map((genre) => (
                        <SelectItem key={genre} value={genre === 'الكل' ? 'all' : genre} className="text-white hover:bg-gray-700">
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={filterYear} onValueChange={setFilterYear}>
                    <SelectTrigger className="w-[120px] bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="السنة" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {years.map((year) => (
                        <SelectItem key={year} value={year === 'الكل' ? 'all' : year} className="text-white hover:bg-gray-700">
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={filterRating} onValueChange={setFilterRating}>
                    <SelectTrigger className="w-[140px] bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="التقييم" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {ratings.map((rating) => (
                        <SelectItem key={rating} value={rating === 'الكل' ? 'all' : rating.split('+')[0]} className="text-white hover:bg-gray-700">
                          {rating}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-4 space-x-reverse">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[160px] bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="ترتيب حسب" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="newest" className="text-white hover:bg-gray-700">الأحدث</SelectItem>
                      <SelectItem value="oldest" className="text-white hover:bg-gray-700">الأقدم</SelectItem>
                      <SelectItem value="rating" className="text-white hover:bg-gray-700">التقييم</SelectItem>
                      <SelectItem value="popular" className="text-white hover:bg-gray-700">الأكثر مشاهدة</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex bg-gray-700 rounded-lg overflow-hidden">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      className={`${viewMode === 'grid' ? 'bg-[#26baee] text-white' : 'text-gray-300 hover:text-white'}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <Squares2X2Icon className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      className={`${viewMode === 'list' ? 'bg-[#26baee] text-white' : 'text-gray-300 hover:text-white'}`}
                      onClick={() => setViewMode('list')}
                    >
                      <ListBulletIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* إعلان عرضي */}
          <div className="mb-8">
            <AdSystem
              type="banner"
              position="content"
              imageUrl="/ads/banner-728x90.jpg"
              clickUrl="https://example.com"
              altText="إعلان"
            />
          </div>

          {/* نتائج البحث */}
          <div className="mb-6">
            <p className="text-gray-300">
              عرض {sortedMovies.length} من {movies.length} فيلم
            </p>
          </div>

          {/* قائمة الأفلام */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-700 aspect-[2/3] rounded-lg mb-4"></div>
                  <div className="bg-gray-700 h-4 rounded mb-2"></div>
                  <div className="bg-gray-700 h-3 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedMovies.map((movie, index) => (
                <div key={movie.id}>
                  {/* إعلان كل 8 أفلام */}
                  {index > 0 && index % 8 === 0 && (
                    <div className="col-span-full mb-6">
                      <AdSystem
                        type="banner"
                        position="content"
                        imageUrl="/ads/banner-728x90.jpg"
                        clickUrl="https://example.com"
                        altText="إعلان"
                      />
                    </div>
                  )}
                  
                  <Link href={`/watch/${movie.id}`}>
                    <Card className="bg-gray-800/50 border-gray-700 hover:border-[#26baee]/50 transition-all duration-300 hover:scale-105 group">
                      <div className="relative">
                        <div className="aspect-[2/3] bg-gray-700 rounded-t-lg overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                            <span className="text-gray-400 text-4xl">🎬</span>
                          </div>
                          
                          {/* علامة الجودة */}
                          <Badge className="absolute top-2 right-2 bg-[#26baee] text-white text-xs">
                            {movie.quality}
                          </Badge>
                          
                          {/* زر التشغيل */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                            <div className="w-16 h-16 bg-[#26baee] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                              <div className="w-0 h-0 border-t-8 border-t-transparent border-r-12 border-r-white border-b-8 border-b-transparent mr-1"></div>
                            </div>
                          </div>
                        </div>
                        
                        <CardContent className="p-4">
                          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-[#26baee] transition-colors">
                            {movie.title}
                          </h3>
                          
                          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                            <div className="flex items-center space-x-1 space-x-reverse">
                              <CalendarIcon className="w-4 h-4" />
                              <span>{movie.year}</span>
                            </div>
                            <div className="flex items-center space-x-1 space-x-reverse">
                              <ClockIcon className="w-4 h-4" />
                              <span>{movie.duration}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm mb-3">
                            <div className="flex items-center space-x-1 space-x-reverse text-yellow-400">
                              <StarIcon className="w-4 h-4 fill-current" />
                              <span className="text-white">{movie.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1 space-x-reverse text-gray-400">
                              <EyeIcon className="w-4 h-4" />
                              <span>{movie.views}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {movie.genre.slice(0, 2).map((g, i) => (
                              <Badge key={i} variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                                {g}
                              </Badge>
                            ))}
                          </div>
                          
                          <p className="text-gray-400 text-sm line-clamp-2">
                            {movie.description}
                          </p>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedMovies.map((movie, index) => (
                <div key={movie.id}>
                  {/* إعلان كل 5 أفلام في العرض القائمة */}
                  {index > 0 && index % 5 === 0 && (
                    <div className="mb-6">
                      <AdSystem
                        type="banner"
                        position="content"
                        imageUrl="/ads/banner-728x90.jpg"
                        clickUrl="https://example.com"
                        altText="إعلان"
                      />
                    </div>
                  )}
                  
                  <Link href={`/watch/${movie.id}`}>
                    <Card className="bg-gray-800/50 border-gray-700 hover:border-[#26baee]/50 transition-all duration-300 group">
                      <CardContent className="p-4">
                        <div className="flex space-x-4 space-x-reverse">
                          <div className="relative w-32 h-48 flex-shrink-0">
                            <div className="w-full h-full bg-gray-700 rounded overflow-hidden">
                              <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                                <span className="text-gray-400 text-2xl">🎬</span>
                              </div>
                            </div>
                            <Badge className="absolute top-2 right-2 bg-[#26baee] text-white text-xs">
                              {movie.quality}
                            </Badge>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-bold text-xl mb-2 group-hover:text-[#26baee] transition-colors">
                              {movie.title}
                            </h3>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-3">
                              <div className="flex items-center space-x-1 space-x-reverse">
                                <CalendarIcon className="w-4 h-4" />
                                <span>{movie.year}</span>
                              </div>
                              <div className="flex items-center space-x-1 space-x-reverse">
                                <ClockIcon className="w-4 h-4" />
                                <span>{movie.duration}</span>
                              </div>
                              <div className="flex items-center space-x-1 space-x-reverse text-yellow-400">
                                <StarIcon className="w-4 h-4 fill-current" />
                                <span className="text-white">{movie.rating}</span>
                              </div>
                              <div className="flex items-center space-x-1 space-x-reverse text-gray-400">
                                <EyeIcon className="w-4 h-4" />
                                <span>{movie.views}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              {movie.genre.map((g, i) => (
                                <Badge key={i} variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                                  {g}
                                </Badge>
                              ))}
                            </div>
                            
                            <p className="text-gray-400 line-clamp-3">
                              {movie.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* زر تحميل المزيد */}
          <div className="text-center mt-12 mb-8">
            <Button 
              className="bg-[#26baee] hover:bg-[#1fa3d1] text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105"
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              تحميل المزيد
            </Button>
          </div>

          {/* إعلان سفلي */}
          <div className="mt-8">
            <AdSystem
              type="banner"
              position="content"
              imageUrl="/ads/banner-728x90.jpg"
              clickUrl="https://example.com"
              altText="إعلان"
            />
          </div>
        </div>
      </div>
      
      <Footer />
      
      <style jsx global>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}