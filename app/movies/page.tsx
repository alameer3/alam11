'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter, Star, Play, Eye, Download, Heart } from 'lucide-react'
import { IMAGES, optimizeImage } from '@/lib/images'

interface Movie {
  id: string
  title: string
  originalTitle?: string
  slug: string
  description?: string
  poster?: string
  rating?: number
  year: number
  duration: number
  quality: string
  views: number
  downloads: number
  likes: number
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

interface MoviesResponse {
  success: boolean
  data: Movie[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
  stats: {
    totalMovies: number
    averageRating: number
    totalViews: number
    totalDownloads: number
    totalLikes: number
  }
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    category: '',
    quality: '',
    year: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  })
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  })
  const [stats, setStats] = useState({
    totalMovies: 0,
    averageRating: 0,
    totalViews: 0,
    totalDownloads: 0,
    totalLikes: 0
  })

  const fetchMovies = async (page = 1, searchTerm = '', filterParams = filters) => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        search: searchTerm,
        ...filterParams
      })

      const response = await fetch(`/api/movies?${params}`)
      const data: MoviesResponse = await response.json()

      if (data.success) {
        setMovies(data.data)
        setPagination(data.pagination)
        setStats(data.stats)
      } else {
        setError('فشل في جلب الأفلام')
      }
    } catch (err) {
      setError('خطأ في الاتصال بالخادم')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchMovies(1, search, filters)
  }

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    fetchMovies(1, search, newFilters)
  }

  const handlePageChange = (page: number) => {
    fetchMovies(page, search, filters)
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">خطأ في التحميل</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => fetchMovies()}
            className="btn-primary"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
              الأفلام
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              اكتشف مجموعة ضخمة من أحدث الأفلام العربية والعالمية
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto mb-8">
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="البحث في الأفلام..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 rtl:pr-10 rtl:pl-3 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </form>

            {/* Filters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="">جميع التصنيفات</option>
                <option value="action">أكشن</option>
                <option value="drama">دراما</option>
                <option value="comedy">كوميدي</option>
                <option value="thriller">إثارة</option>
              </select>

              <select
                value={filters.quality}
                onChange={(e) => handleFilterChange('quality', e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="">جميع الجودات</option>
                <option value="HD">HD</option>
                <option value="FHD">FHD</option>
                <option value="4K">4K</option>
              </select>

              <select
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="">جميع السنوات</option>
                {Array.from({ length: 10 }, (_, i) => 2024 - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>

              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-')
                  handleFilterChange('sortBy', sortBy)
                  handleFilterChange('sortOrder', sortOrder)
                }}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="createdAt-desc">الأحدث</option>
                <option value="rating-desc">الأعلى تقييماً</option>
                <option value="views-desc">الأكثر مشاهدة</option>
                <option value="year-desc">الأحدث إنتاجاً</option>
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.totalMovies}</div>
              <div className="text-gray-400 text-sm">فيلم</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.averageRating?.toFixed(1) || '0'}</div>
              <div className="text-gray-400 text-sm">متوسط التقييم</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{formatNumber(stats.totalViews)}</div>
              <div className="text-gray-400 text-sm">مشاهدة</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{formatNumber(stats.totalDownloads)}</div>
              <div className="text-gray-400 text-sm">تحميل</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{formatNumber(stats.totalLikes)}</div>
              <div className="text-gray-400 text-sm">إعجاب</div>
            </div>
          </div>
        </div>
      </section>

      {/* Movies Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-800 rounded-lg aspect-[2/3] mb-3"></div>
                  <div className="h-4 bg-gray-800 rounded mb-2"></div>
                  <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {movies.map((movie) => (
                  <Link key={movie.id} href={`/movie/${movie.slug}`}>
                    <div className="group card-hover">
                      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                        <img
                          src={movie.poster || optimizeImage(IMAGES.featured.movie1, 300, 450)}
                          alt={movie.title}
                          className="w-full h-full object-cover image-hover"
                        />
                        
                        {/* Rating Badge */}
                        {movie.rating && (
                          <div className="absolute top-2 right-2 rtl:left-2 rtl:right-auto">
                            <div className="inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold bg-black/70 text-yellow-500">
                              <Star className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
                              {movie.rating}
                            </div>
                          </div>
                        )}

                        {/* Quality Badge */}
                        <div className="absolute bottom-2 left-2 rtl:right-2 rtl:left-auto">
                          <div className="inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold bg-white/90 text-gray-900">
                            {movie.quality}
                          </div>
                        </div>

                        {/* Play Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                            <Play className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <h3 className="font-semibold text-white mb-1 line-clamp-2 group-hover:text-blue-400 transition-colors">
                          {movie.title}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>{movie.year}</span>
                          <span>{formatDuration(movie.duration)}</span>
                        </div>
                        
                        {/* Stats */}
                        <div className="flex items-center space-x-2 rtl:space-x-reverse mt-2 text-xs text-gray-500">
                          <div className="flex items-center">
                            <Eye className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
                            {formatNumber(movie.views)}
                          </div>
                          <div className="flex items-center">
                            <Download className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
                            {formatNumber(movie.downloads)}
                          </div>
                          <div className="flex items-center">
                            <Heart className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
                            {formatNumber(movie.likes)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    {pagination.hasPrev && (
                      <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        className="px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        السابق
                      </button>
                    )}
                    
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      const page = i + 1
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 rounded-lg transition-colors ${
                            page === pagination.page
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-800 text-white hover:bg-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    })}
                    
                    {pagination.hasNext && (
                      <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        className="px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        التالي
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}