'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter, Star, Play, Eye, Download, Heart, Grid, List, Sliders } from 'lucide-react'

// بيانات تجريبية للأفلام
const moviesData = [
  {
    id: 1,
    title: "The Dark Knight",
    originalTitle: "The Dark Knight",
    slug: "the-dark-knight",
    description: "فيلم أكشن وإثارة من بطولة كريستيان بيل",
    poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
    rating: 9.0,
    year: 2008,
    duration: 152,
    quality: "HD",
    views: 1500000,
    downloads: 500000,
    likes: 25000,
    isFeatured: true,
    categories: ["Action", "Drama", "Crime"]
  },
  {
    id: 2,
    title: "Inception",
    originalTitle: "Inception",
    slug: "inception",
    description: "فيلم خيال علمي من إخراج كريستوفر نولان",
    poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
    rating: 8.8,
    year: 2010,
    duration: 148,
    quality: "FHD",
    views: 1200000,
    downloads: 400000,
    likes: 20000,
    isFeatured: true,
    categories: ["Sci-Fi", "Action", "Thriller"]
  },
  {
    id: 3,
    title: "Interstellar",
    originalTitle: "Interstellar",
    slug: "interstellar",
    description: "رحلة فضائية مذهلة من بطولة ماثيو ماكونهي",
    poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
    rating: 8.6,
    year: 2014,
    duration: 169,
    quality: "4K",
    views: 1800000,
    downloads: 600000,
    likes: 30000,
    isFeatured: true,
    categories: ["Sci-Fi", "Adventure", "Drama"]
  },
  {
    id: 4,
    title: "The Matrix",
    originalTitle: "The Matrix",
    slug: "the-matrix",
    description: "فيلم ثوري في عالم الخيال العلمي",
    poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
    rating: 8.7,
    year: 1999,
    duration: 136,
    quality: "HD",
    views: 2000000,
    downloads: 800000,
    likes: 35000,
    isFeatured: false,
    categories: ["Sci-Fi", "Action"]
  },
  {
    id: 5,
    title: "Pulp Fiction",
    originalTitle: "Pulp Fiction",
    slug: "pulp-fiction",
    description: "فيلم كلاسيكي من إخراج كوينتن تارانتينو",
    poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
    rating: 8.9,
    year: 1994,
    duration: 154,
    quality: "HD",
    views: 900000,
    downloads: 300000,
    likes: 15000,
    isFeatured: false,
    categories: ["Crime", "Drama"]
  },
  {
    id: 6,
    title: "Fight Club",
    originalTitle: "Fight Club",
    slug: "fight-club",
    description: "فيلم نفسي مثير من بطولة براد بيت",
    poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
    rating: 8.8,
    year: 1999,
    duration: 139,
    quality: "FHD",
    views: 1100000,
    downloads: 350000,
    likes: 18000,
    isFeatured: false,
    categories: ["Drama", "Thriller"]
  }
]

const categories = ["All", "Action", "Drama", "Comedy", "Thriller", "Sci-Fi", "Crime", "Adventure"]
const qualities = ["All", "HD", "FHD", "4K"]
const years = ["All", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000", "1999", "1998", "1997", "1996", "1995", "1994", "1993", "1992", "1991", "1990"]

export default function MoviesPage() {
  const [movies, setMovies] = useState(moviesData)
  const [filteredMovies, setFilteredMovies] = useState(moviesData)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedQuality, setSelectedQuality] = useState('All')
  const [selectedYear, setSelectedYear] = useState('All')
  const [sortBy, setSortBy] = useState('rating')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)

  // فلترة وبحث الأفلام
  useEffect(() => {
    let filtered = movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          movie.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || movie.categories.includes(selectedCategory)
      const matchesQuality = selectedQuality === 'All' || movie.quality === selectedQuality
      const matchesYear = selectedYear === 'All' || movie.year.toString() === selectedYear
      
      return matchesSearch && matchesCategory && matchesQuality && matchesYear
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
        default:
          return 0
      }
    })

    setFilteredMovies(filtered)
  }, [movies, searchTerm, selectedCategory, selectedQuality, selectedYear, sortBy])

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              الأفلام
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              اكتشف مجموعة ضخمة من أفضل الأفلام العربية والعالمية
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
              placeholder="ابحث عن فيلم..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {years.map(year => (
                <option key={year} value={year}>
                  {year === 'All' ? 'جميع السنوات' : year}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="rating">الأعلى تقييماً</option>
              <option value="year">الأحدث</option>
              <option value="views">الأكثر مشاهدة</option>
              <option value="title">حسب العنوان</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            <div className="text-gray-400">
              {filteredMovies.length} فيلم
            </div>
          </div>
        </div>

        {/* Movies Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {filteredMovies.map((movie) => (
              <Link 
                key={movie.id}
                href={`/movie/${movie.slug}`}
                className="group relative overflow-hidden rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
              >
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                    {movie.rating}
                  </div>

                  {/* Quality Badge */}
                  <div className="absolute bottom-2 left-2 bg-white/90 text-black px-2 py-1 rounded text-xs font-bold">
                    {movie.quality}
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
                    {movie.title}
                  </h3>
                  <div className="flex items-center justify-between text-gray-400 text-xs">
                    <span>{movie.year}</span>
                    <span>{formatDuration(movie.duration)}</span>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {formatNumber(movie.views)}
                    </div>
                    <div className="flex items-center">
                      <Download className="w-3 h-3 mr-1" />
                      {formatNumber(movie.downloads)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMovies.map((movie) => (
              <Link 
                key={movie.id}
                href={`/movie/${movie.slug}`}
                className="group flex items-center space-x-4 bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-all duration-300"
              >
                <div className="relative w-20 h-28 flex-shrink-0">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover rounded"
                  />
                  <div className="absolute top-1 right-1 bg-yellow-500 text-black px-1 py-0.5 rounded text-xs font-bold">
                    {movie.rating}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-1">{movie.title}</h3>
                  <p className="text-gray-400 text-sm mb-2 line-clamp-2">{movie.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>{movie.year}</span>
                    <span>{formatDuration(movie.duration)}</span>
                    <span className="bg-gray-700 px-2 py-1 rounded">{movie.quality}</span>
                    <span>{movie.categories.join(', ')}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {formatNumber(movie.views)}
                    </div>
                    <div className="flex items-center">
                      <Download className="w-3 h-3 mr-1" />
                      {formatNumber(movie.downloads)}
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-3 h-3 mr-1" />
                      {formatNumber(movie.likes)}
                    </div>
                  </div>
                  
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    مشاهدة
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold text-white mb-2">لا توجد نتائج</h3>
            <p className="text-gray-400">جرب تغيير معايير البحث</p>
          </div>
        )}
      </div>
    </div>
  )
}