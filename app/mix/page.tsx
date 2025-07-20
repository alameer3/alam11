'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter, Star, Play, Eye, Download, Heart, Grid, List, Sliders, Calendar, Users, Tv, Mic, Video, Music, Camera, Film } from 'lucide-react'

// بيانات تجريبية للمنوعات
const mixData = [
  {
    id: 1,
    title: "أفضل مشاهد الأكشن 2024",
    originalTitle: "Best Action Scenes 2024",
    slug: "best-action-scenes-2024",
    description: "مجموعة من أفضل مشاهد الأكشن والإثارة من أفلام 2024",
    poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
    rating: 9.2,
    year: 2024,
    duration: 45,
    quality: "4K",
    views: 3500000,
    downloads: 1200000,
    likes: 75000,
    isFeatured: true,
    type: "مشاهد مختارة",
    categories: ["Action", "Thriller", "Compilation"]
  },
  {
    id: 2,
    title: "أجمل أغاني الأفلام",
    originalTitle: "Beautiful Movie Songs",
    slug: "beautiful-movie-songs",
    description: "أجمل الأغاني والموسيقى التصويرية من الأفلام العالمية",
    poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
    rating: 8.8,
    year: 2024,
    duration: 60,
    quality: "FHD",
    views: 2800000,
    downloads: 800000,
    likes: 55000,
    isFeatured: true,
    type: "موسيقى",
    categories: ["Music", "Soundtrack", "Compilation"]
  },
  {
    id: 3,
    title: "أفضل النكات في السينما",
    originalTitle: "Best Movie Jokes",
    slug: "best-movie-jokes",
    description: "أطرف النكات والمشاهد الكوميدية من الأفلام والمسلسلات",
    poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
    rating: 8.5,
    year: 2024,
    duration: 30,
    quality: "HD",
    views: 2200000,
    downloads: 600000,
    likes: 45000,
    isFeatured: true,
    type: "كوميديا",
    categories: ["Comedy", "Funny", "Compilation"]
  },
  {
    id: 4,
    title: "أجمل مشاهد الرومانسية",
    originalTitle: "Beautiful Romantic Scenes",
    slug: "beautiful-romantic-scenes",
    description: "أجمل مشاهد الحب والرومانسية من الأفلام العالمية",
    poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
    rating: 8.7,
    year: 2024,
    duration: 40,
    quality: "FHD",
    views: 1800000,
    downloads: 500000,
    likes: 35000,
    isFeatured: false,
    type: "رومانسية",
    categories: ["Romance", "Drama", "Compilation"]
  },
  {
    id: 5,
    title: "أفضل مشاهد الرعب",
    originalTitle: "Best Horror Scenes",
    slug: "best-horror-scenes",
    description: "أكثر مشاهد الرعب إثارة من أفلام الرعب العالمية",
    poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
    rating: 8.3,
    year: 2024,
    duration: 35,
    quality: "4K",
    views: 1500000,
    downloads: 400000,
    likes: 25000,
    isFeatured: false,
    type: "رعب",
    categories: ["Horror", "Thriller", "Compilation"]
  },
  {
    id: 6,
    title: "أجمل مشاهد الطبيعة",
    originalTitle: "Beautiful Nature Scenes",
    slug: "beautiful-nature-scenes",
    description: "أجمل مشاهد الطبيعة والمناظر الخلابة من الأفلام الوثائقية",
    poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
    rating: 9.0,
    year: 2024,
    duration: 50,
    quality: "4K",
    views: 1200000,
    downloads: 300000,
    likes: 20000,
    isFeatured: false,
    type: "وثائقي",
    categories: ["Documentary", "Nature", "Travel"]
  }
]

const categories = ["All", "Action", "Comedy", "Romance", "Horror", "Music", "Documentary", "Compilation", "Thriller", "Drama"]
const qualities = ["All", "HD", "FHD", "4K"]
const years = ["All", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000", "1999", "1998", "1997", "1996", "1995", "1994", "1993", "1992", "1991", "1990"]
const types = ["All", "مشاهد مختارة", "موسيقى", "كوميديا", "رومانسية", "رعب", "وثائقي", "مقابلات", "خلف الكواليس"]

export default function MixPage() {
  const [mixes, setMixes] = useState(mixData)
  const [filteredMixes, setFilteredMixes] = useState(mixData)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedQuality, setSelectedQuality] = useState('All')
  const [selectedYear, setSelectedYear] = useState('All')
  const [selectedType, setSelectedType] = useState('All')
  const [sortBy, setSortBy] = useState('rating')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)

  // فلترة وبحث المنوعات
  useEffect(() => {
    let filtered = mixes.filter(mix => {
      const matchesSearch = mix.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          mix.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || mix.categories.includes(selectedCategory)
      const matchesQuality = selectedQuality === 'All' || mix.quality === selectedQuality
      const matchesYear = selectedYear === 'All' || mix.year.toString() === selectedYear
      const matchesType = selectedType === 'All' || mix.type === selectedType
      
      return matchesSearch && matchesCategory && matchesQuality && matchesYear && matchesType
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
        case 'duration':
          return b.duration - a.duration
        default:
          return 0
      }
    })

    setFilteredMixes(filtered)
  }, [mixes, searchTerm, selectedCategory, selectedQuality, selectedYear, selectedType, sortBy])

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'مشاهد مختارة':
        return <Film className="w-4 h-4" />
      case 'موسيقى':
        return <Music className="w-4 h-4" />
      case 'كوميديا':
        return <Tv className="w-4 h-4" />
      case 'رومانسية':
        return <Heart className="w-4 h-4" />
      case 'رعب':
        return <Camera className="w-4 h-4" />
      case 'وثائقي':
        return <Video className="w-4 h-4" />
      default:
        return <Tv className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'مشاهد مختارة':
        return 'bg-red-600'
      case 'موسيقى':
        return 'bg-purple-600'
      case 'كوميديا':
        return 'bg-yellow-600'
      case 'رومانسية':
        return 'bg-pink-600'
      case 'رعب':
        return 'bg-gray-800'
      case 'وثائقي':
        return 'bg-green-600'
      default:
        return 'bg-blue-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              المنوعات
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              اكتشف مجموعة متنوعة من المشاهد المختارة والموسيقى والكوميديا
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
              placeholder="ابحث في المنوعات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'All' ? 'جميع التصنيفات' : category}
                </option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'All' ? 'جميع الأنواع' : type}
                </option>
              ))}
            </select>

            <select
              value={selectedQuality}
              onChange={(e) => setSelectedQuality(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
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
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
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
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="rating">الأعلى تقييماً</option>
              <option value="year">الأحدث</option>
              <option value="views">الأكثر مشاهدة</option>
              <option value="duration">الأطول مدة</option>
              <option value="title">حسب العنوان</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-orange-600 text-white' : 'bg-gray-700 text-gray-400'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-orange-600 text-white' : 'bg-gray-700 text-gray-400'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            <div className="text-gray-400">
              {filteredMixes.length} منوع
            </div>
          </div>
        </div>

        {/* Mixes Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {filteredMixes.map((mix) => (
              <Link 
                key={mix.id}
                href={`/mix/${mix.slug}`}
                className="group relative overflow-hidden rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
              >
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={mix.poster}
                    alt={mix.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                    {mix.rating}
                  </div>

                  {/* Quality Badge */}
                  <div className="absolute bottom-2 left-2 bg-white/90 text-black px-2 py-1 rounded text-xs font-bold">
                    {mix.quality}
                  </div>

                  {/* Type Badge */}
                  <div className={`absolute top-2 left-2 ${getTypeColor(mix.type)} text-white px-2 py-1 rounded text-xs font-bold`}>
                    {getTypeIcon(mix.type)}
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
                    {mix.title}
                  </h3>
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
                    <span>{mix.year}</span>
                    <span>{formatDuration(mix.duration)}</span>
                  </div>
                  
                  {/* Type */}
                  <div className="flex items-center text-gray-400 text-xs mb-2">
                    <span>{mix.type}</span>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {formatNumber(mix.views)}
                    </div>
                    <div className="flex items-center">
                      <Download className="w-3 h-3 mr-1" />
                      {formatNumber(mix.downloads)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMixes.map((mix) => (
              <Link 
                key={mix.id}
                href={`/mix/${mix.slug}`}
                className="group flex items-center space-x-4 bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-all duration-300"
              >
                <div className="relative w-20 h-28 flex-shrink-0">
                  <img
                    src={mix.poster}
                    alt={mix.title}
                    className="w-full h-full object-cover rounded"
                  />
                  <div className="absolute top-1 right-1 bg-yellow-500 text-black px-1 py-0.5 rounded text-xs font-bold">
                    {mix.rating}
                  </div>
                  <div className={`absolute bottom-1 left-1 ${getTypeColor(mix.type)} text-white px-1 py-0.5 rounded text-xs font-bold`}>
                    {getTypeIcon(mix.type)}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-1">{mix.title}</h3>
                  <p className="text-gray-400 text-sm mb-2 line-clamp-2">{mix.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                    <span>{mix.year}</span>
                    <span>{formatDuration(mix.duration)}</span>
                    <span className="bg-gray-700 px-2 py-1 rounded">{mix.quality}</span>
                    <span>{mix.type}</span>
                    <span>{mix.categories.join(', ')}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {formatNumber(mix.views)}
                    </div>
                    <div className="flex items-center">
                      <Download className="w-3 h-3 mr-1" />
                      {formatNumber(mix.downloads)}
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-3 h-3 mr-1" />
                      {formatNumber(mix.likes)}
                    </div>
                  </div>
                  
                  <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    مشاهدة
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredMixes.length === 0 && (
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