'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { 
  Play, 
  Star, 
  Calendar, 
  Clock, 
  Eye, 
  Download, 
  Heart, 
  Share2, 
  Bookmark,
  ArrowLeft,
  Users,
  Award,
  Globe,
  Film,
  MessageCircle
} from 'lucide-react'
import { IMAGES, optimizeImage } from '@/lib/images'

interface Movie {
  id: string
  title: string
  originalTitle?: string
  slug: string
  description?: string
  poster?: string
  backdrop?: string
  trailer?: string
  rating?: number
  imdbRating?: number
  year: number
  duration: number
  releaseDate?: string
  country?: string
  language?: string
  budget?: number
  boxOffice?: number
  director?: string
  cast?: string
  awards?: string
  quality: string
  size?: string
  views: number
  downloads: number
  likes: number
  dislikes: number
  isActive: boolean
  isFeatured: boolean
  section: {
    name: string
    slug: string
  }
  categories: Array<{
    category: {
      name: string
      slug: string
    }
  }>
}

interface MovieResponse {
  success: boolean
  data: Movie
}

export default function MovieDetailPage() {
  const params = useParams()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/movies/${params.slug}`)
        const data: MovieResponse = await response.json()

        if (data.success) {
          setMovie(data.data)
        } else {
          setError('لم يتم العثور على الفيلم')
        }
      } catch (err) {
        setError('خطأ في الاتصال بالخادم')
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchMovie()
    }
  }, [params.slug])

  const handleLike = () => {
    setIsLiked(!isLiked)
    // TODO: إرسال طلب إلى API لتحديث الإعجاب
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    // TODO: إرسال طلب إلى API لتحديث المفضلة
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: movie?.title,
        text: movie?.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // TODO: إظهار رسالة نجاح
    }
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-800"></div>
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-64 h-96 bg-gray-800 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-8 bg-gray-800 rounded mb-4"></div>
                <div className="h-4 bg-gray-800 rounded mb-2"></div>
                <div className="h-4 bg-gray-800 rounded mb-2"></div>
                <div className="h-4 bg-gray-800 rounded mb-6"></div>
                <div className="h-6 bg-gray-800 rounded mb-4"></div>
                <div className="h-4 bg-gray-800 rounded mb-2"></div>
                <div className="h-4 bg-gray-800 rounded mb-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">خطأ في التحميل</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <Link href="/movies" className="btn-primary">
            العودة للأفلام
          </Link>
        </div>
      </div>
    )
  }

  const castArray = movie.cast ? JSON.parse(movie.cast) : []
  const awardsArray = movie.awards ? JSON.parse(movie.awards) : []

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative h-96 lg:h-[500px] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${movie.backdrop || optimizeImage(IMAGES.hero.movie, 1920, 1080)})`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>

        {/* Navigation */}
        <div className="relative z-10 container mx-auto px-4 pt-6">
          <Link 
            href="/movies"
            className="inline-flex items-center text-white hover:text-blue-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
            العودة للأفلام
          </Link>
        </div>

        {/* Movie Info Overlay */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-8">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              {movie.categories.map((cat, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full"
                >
                  {cat.category.name}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
              {movie.title}
            </h1>
            
            {movie.originalTitle && movie.originalTitle !== movie.title && (
              <p className="text-xl text-gray-300 mb-4">
                {movie.originalTitle}
              </p>
            )}

            <div className="flex items-center space-x-6 rtl:space-x-reverse text-white mb-6">
              {movie.rating && (
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-2 rtl:ml-2 rtl:mr-0" />
                  <span className="font-semibold">{movie.rating}</span>
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                <span>{formatDuration(movie.duration)}</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                <span>{formatNumber(movie.views)} مشاهدة</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Link 
                href={`/watch/${movie.slug}`}
                className="btn-primary flex items-center"
              >
                <Play className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                مشاهدة الفيلم
              </Link>
              
              <button 
                onClick={handleLike}
                className={`p-3 rounded-lg transition-colors ${
                  isLiked 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                <Heart className="w-5 h-5" />
              </button>
              
              <button 
                onClick={handleBookmark}
                className={`p-3 rounded-lg transition-colors ${
                  isBookmarked 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                <Bookmark className="w-5 h-5" />
              </button>
              
              <button 
                onClick={handleShare}
                className="p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Poster */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="relative">
                <img
                  src={movie.poster || optimizeImage(IMAGES.featured.movie1, 300, 450)}
                  alt={movie.title}
                  className="w-full rounded-lg shadow-2xl"
                />
                
                {/* Quality Badge */}
                <div className="absolute top-4 left-4 rtl:right-4 rtl:left-auto">
                  <div className="px-3 py-1 bg-white/90 text-gray-900 rounded-md font-semibold text-sm">
                    {movie.quality}
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>المشاهدات</span>
                    <span className="font-semibold text-white">{formatNumber(movie.views)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>التحميلات</span>
                    <span className="font-semibold text-white">{formatNumber(movie.downloads)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>الإعجابات</span>
                    <span className="font-semibold text-white">{formatNumber(movie.likes)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1">
              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">القصة</h2>
                <p className="text-gray-300 leading-relaxed">
                  {movie.description || 'لا يوجد وصف متاح لهذا الفيلم.'}
                </p>
              </div>

              {/* Movie Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">تفاصيل الفيلم</h3>
                  <div className="space-y-3">
                    {movie.director && (
                      <div className="flex items-center text-gray-300">
                        <Film className="w-4 h-4 mr-3 rtl:ml-3 rtl:mr-0 text-blue-400" />
                        <span className="font-medium">المخرج:</span>
                        <span className="mr-2 rtl:ml-2 rtl:mr-0">{movie.director}</span>
                      </div>
                    )}
                    
                    {movie.country && (
                      <div className="flex items-center text-gray-300">
                        <Globe className="w-4 h-4 mr-3 rtl:ml-3 rtl:mr-0 text-blue-400" />
                        <span className="font-medium">البلد:</span>
                        <span className="mr-2 rtl:ml-2 rtl:mr-0">{movie.country}</span>
                      </div>
                    )}
                    
                    {movie.language && (
                      <div className="flex items-center text-gray-300">
                        <Users className="w-4 h-4 mr-3 rtl:ml-3 rtl:mr-0 text-blue-400" />
                        <span className="font-medium">اللغة:</span>
                        <span className="mr-2 rtl:ml-2 rtl:mr-0">{movie.language}</span>
                      </div>
                    )}
                    
                    {movie.budget && (
                      <div className="flex items-center text-gray-300">
                        <span className="font-medium">الميزانية:</span>
                        <span className="mr-2 rtl:ml-2 rtl:mr-0">{formatCurrency(movie.budget)}</span>
                      </div>
                    )}
                    
                    {movie.boxOffice && (
                      <div className="flex items-center text-gray-300">
                        <span className="font-medium">الإيرادات:</span>
                        <span className="mr-2 rtl:ml-2 rtl:mr-0">{formatCurrency(movie.boxOffice)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">التقييمات</h3>
                  <div className="space-y-3">
                    {movie.rating && (
                      <div className="flex items-center text-gray-300">
                        <Star className="w-4 h-4 mr-3 rtl:ml-3 rtl:mr-0 text-yellow-500" />
                        <span className="font-medium">تقييم الموقع:</span>
                        <span className="mr-2 rtl:ml-2 rtl:mr-0">{movie.rating}/10</span>
                      </div>
                    )}
                    
                    {movie.imdbRating && (
                      <div className="flex items-center text-gray-300">
                        <Star className="w-4 h-4 mr-3 rtl:ml-3 rtl:mr-0 text-yellow-500" />
                        <span className="font-medium">IMDB:</span>
                        <span className="mr-2 rtl:ml-2 rtl:mr-0">{movie.imdbRating}/10</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Cast */}
              {castArray.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4">طاقم التمثيل</h3>
                  <div className="flex flex-wrap gap-2">
                    {castArray.map((actor: string, index: number) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                      >
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Awards */}
              {awardsArray.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4">الجوائز</h3>
                  <div className="space-y-2">
                    {awardsArray.map((award: string, index: number) => (
                      <div key={index} className="flex items-center text-gray-300">
                        <Award className="w-4 h-4 mr-3 rtl:ml-3 rtl:mr-0 text-yellow-500" />
                        <span>{award}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments Section */}
              <div className="border-t border-gray-800 pt-8">
                <h3 className="text-lg font-semibold text-white mb-4">التعليقات</h3>
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">لا توجد تعليقات بعد</p>
                  <p className="text-gray-500 text-sm">كن أول من يعلق على هذا الفيلم</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}