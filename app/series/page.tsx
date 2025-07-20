'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Grid3X3, List, Star, Eye, Calendar, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

interface Series {
  id: string
  title: string
  arabicTitle: string
  description: string
  year: number
  rating: number
  views: number
  episodes: number
  seasons: number
  genre: string[]
  quality: string
  status: 'ongoing' | 'completed'
  poster: string
  backdrop: string
  duration: string
  language: string
  country: string
  director: string
  cast: string[]
  synopsis: string
}

const mockSeries: Series[] = [
  {
    id: '1',
    title: 'Breaking Bad',
    arabicTitle: 'بريكينغ باد',
    description: 'A high school chemistry teacher turned methamphetamine manufacturer',
    year: 2008,
    rating: 9.5,
    views: 2500000,
    episodes: 62,
    seasons: 5,
    genre: ['Crime', 'Drama', 'Thriller'],
    quality: '1080p',
    status: 'completed',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a9?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a9?w=1200&h=400&fit=crop',
    duration: '47 min',
    language: 'English',
    country: 'USA',
    director: 'Vince Gilligan',
    cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn'],
    synopsis: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s financial future.'
  },
  {
    id: '2',
    title: 'Game of Thrones',
    arabicTitle: 'لعبة العرش',
    description: 'Nine noble families fight for control over the lands of Westeros',
    year: 2011,
    rating: 9.3,
    views: 3200000,
    episodes: 73,
    seasons: 8,
    genre: ['Action', 'Adventure', 'Drama'],
    quality: '4K',
    status: 'completed',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=400&fit=crop',
    duration: '57 min',
    language: 'English',
    country: 'USA',
    director: 'David Benioff',
    cast: ['Emilia Clarke', 'Kit Harington', 'Peter Dinklage'],
    synopsis: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.'
  },
  {
    id: '3',
    title: 'Stranger Things',
    arabicTitle: 'أشياء غريبة',
    description: 'When a young boy disappears, his mother must confront terrifying forces',
    year: 2016,
    rating: 8.7,
    views: 1800000,
    episodes: 34,
    seasons: 4,
    genre: ['Drama', 'Fantasy', 'Horror'],
    quality: '1080p',
    status: 'ongoing',
    poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=400&fit=crop',
    duration: '51 min',
    language: 'English',
    country: 'USA',
    director: 'The Duffer Brothers',
    cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder'],
    synopsis: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying forces in order to get him back.'
  },
  {
    id: '4',
    title: 'The Crown',
    arabicTitle: 'التاج',
    description: 'Follows the political rivalries and romance of Queen Elizabeth II',
    year: 2016,
    rating: 8.6,
    views: 1200000,
    episodes: 40,
    seasons: 5,
    genre: ['Biography', 'Drama', 'History'],
    quality: '4K',
    status: 'ongoing',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=400&fit=crop',
    duration: '58 min',
    language: 'English',
    country: 'UK',
    director: 'Peter Morgan',
    cast: ['Olivia Colman', 'Emma Corrin', 'Josh O\'Connor'],
    synopsis: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.'
  }
]

export default function SeriesPage() {
  const [series, setSeries] = useState<Series[]>(mockSeries)
  const [filteredSeries, setFilteredSeries] = useState<Series[]>(mockSeries)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')
  const [selectedQuality, setSelectedQuality] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [sortBy, setSortBy] = useState('rating')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isLoading, setIsLoading] = useState(false)

  const genres = ['all', ...Array.from(new Set(series.flatMap(s => s.genre)))]
  const years = ['all', ...Array.from(new Set(series.map(s => s.year.toString())))]
  const qualities = ['all', ...Array.from(new Set(series.map(s => s.quality)))]
  const statuses = ['all', 'ongoing', 'completed']

  useEffect(() => {
    setIsLoading(true)
    
    let filtered = series.filter(series => {
      const matchesSearch = series.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           series.arabicTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           series.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesGenre = selectedGenre === 'all' || series.genre.includes(selectedGenre)
      const matchesYear = selectedYear === 'all' || series.year.toString() === selectedYear
      const matchesQuality = selectedQuality === 'all' || series.quality === selectedQuality
      const matchesStatus = selectedStatus === 'all' || series.status === selectedStatus
      
      return matchesSearch && matchesGenre && matchesYear && matchesQuality && matchesStatus
    })

    // Sort filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'views':
          return b.views - a.views
        case 'year':
          return b.year - a.year
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    setFilteredSeries(filtered)
    
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 300)
  }, [searchTerm, selectedGenre, selectedYear, selectedQuality, selectedStatus, sortBy, series])

  const getStatusColor = (status: string) => {
    return status === 'ongoing' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
  }

  const getStatusText = (status: string) => {
    return status === 'ongoing' ? 'مستمر' : 'مكتمل'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">المسلسلات</h1>
            <p className="text-xl opacity-90">
              اكتشف أفضل المسلسلات العربية والأجنبية
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span>{series.reduce((sum, s) => sum + s.views, 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span>{series.length} مسلسل</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="البحث في المسلسلات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Genre Filter */}
            <div>
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger>
                  <SelectValue placeholder="التصنيف" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map(genre => (
                    <SelectItem key={genre} value={genre}>
                      {genre === 'all' ? 'جميع التصنيفات' : genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Year Filter */}
            <div>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="السنة" />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year}>
                      {year === 'all' ? 'جميع السنوات' : year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quality Filter */}
            <div>
              <Select value={selectedQuality} onValueChange={setSelectedQuality}>
                <SelectTrigger>
                  <SelectValue placeholder="الجودة" />
                </SelectTrigger>
                <SelectContent>
                  {qualities.map(quality => (
                    <SelectItem key={quality} value={quality}>
                      {quality === 'all' ? 'جميع الجودات' : quality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="الترتيب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">التقييم</SelectItem>
                  <SelectItem value="views">المشاهدات</SelectItem>
                  <SelectItem value="year">السنة</SelectItem>
                  <SelectItem value="title">العنوان</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Filters */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status === 'all' ? 'جميع الحالات' : 
                       status === 'ongoing' ? 'مستمر' : 'مكتمل'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            تم العثور على {filteredSeries.length} مسلسل
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Series Grid/List */}
        {!isLoading && (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
          }>
            {filteredSeries.map((series) => (
              <Card key={series.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={series.poster}
                    alt={series.title}
                    className={`w-full object-cover ${viewMode === 'grid' ? 'h-64' : 'h-32'}`}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-black bg-opacity-75 text-white">
                      {series.quality}
                    </Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className={getStatusColor(series.status)}>
                      {getStatusText(series.status)}
                    </Badge>
                  </div>
                  <div className="absolute bottom-2 left-2 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm font-medium">{series.rating}</span>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className={viewMode === 'list' ? 'flex items-center gap-4' : ''}>
                    {viewMode === 'list' && (
                      <img
                        src={series.poster}
                        alt={series.title}
                        className="w-16 h-24 object-cover rounded"
                      />
                    )}
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                        {series.arabicTitle}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                        {series.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{series.year}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{series.episodes} حلقة</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{series.views.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 flex flex-wrap gap-1">
                        {series.genre.slice(0, 2).map((genre, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && filteredSeries.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold mb-2">لم يتم العثور على نتائج</h3>
            <p className="text-gray-600 dark:text-gray-400">
              جرب تغيير معايير البحث أو الفلترة
            </p>
          </div>
        )}
      </div>
    </div>
  )
}