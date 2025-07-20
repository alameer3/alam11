'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter, Star, Play, Eye, Download, Heart, Grid, List, Sliders, Calendar, Users } from 'lucide-react'

// بيانات تجريبية للمسلسلات
const seriesData = [
  {
    id: 1,
    title: "Breaking Bad",
    originalTitle: "Breaking Bad",
    slug: "breaking-bad",
    description: "مسلسل درامي أمريكي عن معلم كيمياء يتحول إلى تاجر مخدرات",
    poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
    rating: 9.5,
    year: 2008,
    seasons: 5,
    episodes: 62,
    duration: 47,
    quality: "FHD",
    views: 2500000,
    downloads: 800000,
    likes: 45000,
    isFeatured: true,
    status: "مكتمل",
    categories: ["Drama", "Crime", "Thriller"]
  },
  {
    id: 2,
    title: "Game of Thrones",
    originalTitle: "Game of Thrones",
    slug: "game-of-thrones",
    description: "مسلسل خيالي ملحمي عن الصراع على العرش الحديدي",
    poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
    rating: 9.3,
    year: 2011,
    seasons: 8,
    episodes: 73,
    duration: 55,
    quality: "4K",
    views: 3000000,
    downloads: 1000000,
    likes: 60000,
    isFeatured: true,
    status: "مكتمل",
    categories: ["Fantasy", "Drama", "Adventure"]
  },
  {
    id: 3,
    title: "Stranger Things",
    originalTitle: "Stranger Things",
    slug: "stranger-things",
    description: "مسلسل خيال علمي عن مجموعة أطفال يواجهون قوى خارقة",
    poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
    rating: 8.7,
    year: 2016,
    seasons: 4,
    episodes: 34,
    duration: 50,
    quality: "FHD",
    views: 2200000,
    downloads: 700000,
    likes: 35000,
    isFeatured: true,
    status: "مستمر",
    categories: ["Sci-Fi", "Drama", "Horror"]
  },
  {
    id: 4,
    title: "The Crown",
    originalTitle: "The Crown",
    slug: "the-crown",
    description: "مسلسل درامي عن حياة الملكة إليزابيث الثانية",
    poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
    rating: 8.6,
    year: 2016,
    seasons: 6,
    episodes: 60,
    duration: 58,
    quality: "4K",
    views: 1800000,
    downloads: 500000,
    likes: 25000,
    isFeatured: false,
    status: "مكتمل",
    categories: ["Drama", "History", "Biography"]
  },
  {
    id: 5,
    title: "The Mandalorian",
    originalTitle: "The Mandalorian",
    slug: "the-mandalorian",
    description: "مسلسل خيال علمي في عالم حرب النجوم",
    poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
    rating: 8.8,
    year: 2019,
    seasons: 3,
    episodes: 24,
    duration: 40,
    quality: "4K",
    views: 2000000,
    downloads: 600000,
    likes: 30000,
    isFeatured: false,
    status: "مستمر",
    categories: ["Sci-Fi", "Action", "Adventure"]
  },
  {
    id: 6,
    title: "The Witcher",
    originalTitle: "The Witcher",
    slug: "the-witcher",
    description: "مسلسل خيالي عن صياد وحوش في عالم مليء بالسحر",
    poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
    rating: 8.2,
    year: 2019,
    seasons: 3,
    episodes: 24,
    duration: 60,
    quality: "FHD",
    views: 1600000,
    downloads: 400000,
    likes: 20000,
    isFeatured: false,
    status: "مستمر",
    categories: ["Fantasy", "Action", "Drama"]
  }
]

const categories = ["All", "Drama", "Comedy", "Action", "Thriller", "Sci-Fi", "Fantasy", "Crime", "Adventure", "Horror"]
const qualities = ["All", "HD", "FHD", "4K"]
const years = ["All", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000", "1999", "1998", "1997", "1996", "1995", "1994", "1993", "1992", "1991", "1990"]
const statuses = ["All", "مستمر", "مكتمل", "متوقف"]

export default function SeriesPage() {
  const [series, setSeries] = useState(seriesData)
  const [filteredSeries, setFilteredSeries] = useState(seriesData)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedQuality, setSelectedQuality] = useState('All')
  const [selectedYear, setSelectedYear] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [sortBy, setSortBy] = useState('rating')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)

  // فلترة وبحث المسلسلات
  useEffect(() => {
    let filtered = series.filter(show => {
      const matchesSearch = show.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          show.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || show.categories.includes(selectedCategory)
      const matchesQuality = selectedQuality === 'All' || show.quality === selectedQuality
      const matchesYear = selectedYear === 'All' || show.year.toString() === selectedYear
      const matchesStatus = selectedStatus === 'All' || show.status === selectedStatus
      
      return matchesSearch && matchesCategory && matchesQuality && matchesYear && matchesStatus
    })

    // ترتيب النتائج
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'year':
          return b.year - a.year
        case 'views':
          return b.views - a.views
        case 'title':
          return a.title.localeCompare(b.title)
        case 'seasons':
          return b.seasons - a.seasons
        default:
          return 0
      }
    })

    setFilteredSeries(filtered)
  }, [series, searchTerm, selectedCategory, selectedQuality, selectedYear, selectedStatus, sortBy])

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مستمر':
        return 'bg-green-500'
      case 'مكتمل':
        return 'bg-blue-500'
      case 'متوقف':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              المسلسلات
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              اكتشف أفضل المسلسلات العربية والعالمية بجميع أنواعها
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="ابحث عن مسلسل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'All' ? 'جميع التصنيفات' : category}
                </option>
              ))}
            </select>

            <select
              value={selectedQuality}
              onChange={(e) => setSelectedQuality(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {qualities.map(quality => (
                <option key={quality} value={quality}>
                  {quality === 'All' ? 'جميع الجودات' : quality}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {years.map(year => (
                <option key={year} value={year}>
                  {year === 'All' ? 'جميع السنوات' : year}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'All' ? 'جميع الحالات' : status}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="rating">الأعلى تقييماً</option>
              <option value="year">الأحدث</option>
              <option value="views">الأكثر مشاهدة</option>
              <option value="seasons">الأكثر مواسم</option>
              <option value="title">حسب العنوان</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            <div className="text-gray-400">
              {filteredSeries.length} مسلسل
            </div>
          </div>
        </div>

        {/* Series Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {filteredSeries.map((show) => (
              <Link 
                key={show.id}
                href={`/series/${show.slug}`}
                className="group relative overflow-hidden rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
              >
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={show.poster}
                    alt={show.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                    {show.rating}
                  </div>

                  {/* Quality Badge */}
                  <div className="absolute bottom-2 left-2 bg-white/90 text-black px-2 py-1 rounded text-xs font-bold">
                    {show.quality}
                  </div>

                  {/* Status Badge */}
                  <div className={`absolute top-2 left-2 ${getStatusColor(show.status)} text-white px-2 py-1 rounded text-xs font-bold`}>
                    {show.status}
                  </div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" fill="white" />
                    </div>
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                    {show.title}
                  </h3>
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
                    <span>{show.year}</span>
                    <span>{show.seasons} مواسم</span>
                  </div>
                  
                  {/* Episodes */}
                  <div className="flex items-center text-gray-400 text-xs mb-2">
                    <span>{show.episodes} حلقة</span>
                    <span className="mx-2">•</span>
                    <span>{formatDuration(show.duration)}</span>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {formatNumber(show.views)}
                    </div>
                    <div className="flex items-center">
                      <Download className="w-3 h-3 mr-1" />
                      {formatNumber(show.downloads)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSeries.map((show) => (
              <Link 
                key={show.id}
                href={`/series/${show.slug}`}
                className="group flex items-center space-x-4 bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-all duration-300"
              >
                <div className="relative w-20 h-28 flex-shrink-0">
                  <img
                    src={show.poster}
                    alt={show.title}
                    className="w-full h-full object-cover rounded"
                  />
                  <div className="absolute top-1 right-1 bg-yellow-500 text-black px-1 py-0.5 rounded text-xs font-bold">
                    {show.rating}
                  </div>
                  <div className={`absolute bottom-1 left-1 ${getStatusColor(show.status)} text-white px-1 py-0.5 rounded text-xs font-bold`}>
                    {show.status}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-1">{show.title}</h3>
                  <p className="text-gray-400 text-sm mb-2 line-clamp-2">{show.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                    <span>{show.year}</span>
                    <span>{show.seasons} مواسم</span>
                    <span>{show.episodes} حلقة</span>
                    <span>{formatDuration(show.duration)}</span>
                    <span className="bg-gray-700 px-2 py-1 rounded">{show.quality}</span>
                    <span>{show.categories.join(', ')}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {formatNumber(show.views)}
                    </div>
                    <div className="flex items-center">
                      <Download className="w-3 h-3 mr-1" />
                      {formatNumber(show.downloads)}
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-3 h-3 mr-1" />
                      {formatNumber(show.likes)}
                    </div>
                  </div>
                  
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    مشاهدة
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredSeries.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📺</div>
            <h3 className="text-xl font-semibold text-white mb-2">لا توجد نتائج</h3>
            <p className="text-gray-400">جرب تغيير معايير البحث</p>
          </div>
        )}
      </div>
    </div>
  )
}