'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Grid3X3, List, Star, Eye, Calendar, Clock, Users, Play } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

interface Show {
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
  status: 'ongoing' | 'completed' | 'cancelled'
  poster: string
  backdrop: string
  duration: string
  language: string
  country: string
  host: string
  guests: string[]
  synopsis: string
  type: 'talk' | 'reality' | 'variety' | 'game' | 'documentary'
}

const mockShows: Show[] = [
  {
    id: '1',
    title: 'The Oprah Winfrey Show',
    arabicTitle: 'برنامج أوبرا وينفري',
    description: 'The most successful talk show in television history',
    year: 1986,
    rating: 8.9,
    views: 1500000,
    episodes: 4561,
    seasons: 25,
    genre: ['Talk Show', 'Interview', 'Entertainment'],
    quality: '1080p',
    status: 'completed',
    poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=400&fit=crop',
    duration: '60 min',
    language: 'English',
    country: 'USA',
    host: 'Oprah Winfrey',
    guests: ['Celebrities', 'Authors', 'Experts'],
    synopsis: 'The Oprah Winfrey Show was an American syndicated talk show that aired nationally for 25 seasons.',
    type: 'talk'
  },
  {
    id: '2',
    title: 'American Idol',
    arabicTitle: 'أمريكان أيدول',
    description: 'The most successful singing competition show',
    year: 2002,
    rating: 7.8,
    views: 2200000,
    episodes: 570,
    seasons: 21,
    genre: ['Reality', 'Music', 'Competition'],
    quality: '4K',
    status: 'ongoing',
    poster: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=400&fit=crop',
    duration: '90 min',
    language: 'English',
    country: 'USA',
    host: 'Ryan Seacrest',
    guests: ['Contestants', 'Judges', 'Celebrities'],
    synopsis: 'American Idol is an American singing competition television series created by Simon Fuller.',
    type: 'reality'
  },
  {
    id: '3',
    title: 'The Tonight Show',
    arabicTitle: 'برنامج الليلة',
    description: 'The longest-running talk show in American television history',
    year: 1954,
    rating: 8.2,
    views: 1800000,
    episodes: 15000,
    seasons: 68,
    genre: ['Talk Show', 'Comedy', 'Entertainment'],
    quality: '1080p',
    status: 'ongoing',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=400&fit=crop',
    duration: '60 min',
    language: 'English',
    country: 'USA',
    host: 'Jimmy Fallon',
    guests: ['Celebrities', 'Comedians', 'Musicians'],
    synopsis: 'The Tonight Show is an American late-night talk show that has aired on NBC since 1954.',
    type: 'talk'
  },
  {
    id: '4',
    title: 'Who Wants to Be a Millionaire',
    arabicTitle: 'من يريد أن يكون مليونير',
    description: 'The most successful quiz show in television history',
    year: 1998,
    rating: 7.5,
    views: 1200000,
    episodes: 2000,
    seasons: 25,
    genre: ['Game Show', 'Quiz', 'Entertainment'],
    quality: '1080p',
    status: 'ongoing',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a9?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a9?w=1200&h=400&fit=crop',
    duration: '45 min',
    language: 'English',
    country: 'UK',
    host: 'Chris Tarrant',
    guests: ['Contestants', 'Celebrities'],
    synopsis: 'Who Wants to Be a Millionaire is a British television quiz show based on the format devised by David Briggs.',
    type: 'game'
  },
  {
    id: '5',
    title: 'Planet Earth',
    arabicTitle: 'كوكب الأرض',
    description: 'The most successful nature documentary series',
    year: 2006,
    rating: 9.4,
    views: 3500000,
    episodes: 11,
    seasons: 2,
    genre: ['Documentary', 'Nature', 'Educational'],
    quality: '4K',
    status: 'completed',
    poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop',
    duration: '50 min',
    language: 'English',
    country: 'UK',
    host: 'David Attenborough',
    guests: ['Scientists', 'Photographers'],
    synopsis: 'Planet Earth is a 2006 British television series produced by the BBC Natural History Unit.',
    type: 'documentary'
  },
  {
    id: '6',
    title: 'Saturday Night Live',
    arabicTitle: 'عرض السبت ليلة حية',
    description: 'The longest-running sketch comedy show in television history',
    year: 1975,
    rating: 8.1,
    views: 1600000,
    episodes: 900,
    seasons: 48,
    genre: ['Comedy', 'Sketch', 'Entertainment'],
    quality: '1080p',
    status: 'ongoing',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=400&fit=crop',
    duration: '90 min',
    language: 'English',
    country: 'USA',
    host: 'Lorne Michaels',
    guests: ['Celebrities', 'Comedians', 'Musicians'],
    synopsis: 'Saturday Night Live is an American late-night live television sketch comedy and variety show.',
    type: 'variety'
  }
]

export default function ShowsPage() {
  const [shows, setShows] = useState<Show[]>(mockShows)
  const [filteredShows, setFilteredShows] = useState<Show[]>(mockShows)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')
  const [selectedQuality, setSelectedQuality] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [sortBy, setSortBy] = useState('rating')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isLoading, setIsLoading] = useState(false)

  const genres = ['all', ...Array.from(new Set(shows.flatMap(s => s.genre)))]
  const years = ['all', ...Array.from(new Set(shows.map(s => s.year.toString())))]
  const qualities = ['all', ...Array.from(new Set(shows.map(s => s.quality)))]
  const statuses = ['all', 'ongoing', 'completed', 'cancelled']
  const types = ['all', 'talk', 'reality', 'variety', 'game', 'documentary']

  useEffect(() => {
    setIsLoading(true)
    
    let filtered = shows.filter(show => {
      const matchesSearch = show.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           show.arabicTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           show.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesGenre = selectedGenre === 'all' || show.genre.includes(selectedGenre)
      const matchesYear = selectedYear === 'all' || show.year.toString() === selectedYear
      const matchesQuality = selectedQuality === 'all' || show.quality === selectedQuality
      const matchesStatus = selectedStatus === 'all' || show.status === selectedStatus
      const matchesType = selectedType === 'all' || show.type === selectedType
      
      return matchesSearch && matchesGenre && matchesYear && matchesQuality && matchesStatus && matchesType
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

    setFilteredShows(filtered)
    
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 300)
  }, [searchTerm, selectedGenre, selectedYear, selectedQuality, selectedStatus, selectedType, sortBy, shows])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ongoing': return 'مستمر'
      case 'completed': return 'مكتمل'
      case 'cancelled': return 'ملغي'
      default: return status
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'talk': return 'برنامج حواري'
      case 'reality': return 'برنامج واقعي'
      case 'variety': return 'برنامج متنوع'
      case 'game': return 'برنامج مسابقات'
      case 'documentary': return 'وثائقي'
      default: return type
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">البرامج</h1>
            <p className="text-xl opacity-90">
              اكتشف أفضل البرامج التلفزيونية والعروض المتنوعة
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span>{shows.reduce((sum, s) => sum + s.views, 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                <span>{shows.length} برنامج</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="البحث في البرامج..."
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

            {/* Type Filter */}
            <div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="النوع" />
                </SelectTrigger>
                <SelectContent>
                  {types.map(type => (
                    <SelectItem key={type} value={type}>
                      {type === 'all' ? 'جميع الأنواع' : getTypeText(type)}
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
                      {status === 'all' ? 'جميع الحالات' : getStatusText(status)}
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
            تم العثور على {filteredShows.length} برنامج
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        )}

        {/* Shows Grid/List */}
        {!isLoading && (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
          }>
            {filteredShows.map((show) => (
              <Card key={show.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={show.poster}
                    alt={show.title}
                    className={`w-full object-cover ${viewMode === 'grid' ? 'h-64' : 'h-32'}`}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-black bg-opacity-75 text-white">
                      {show.quality}
                    </Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className={getStatusColor(show.status)}>
                      {getStatusText(show.status)}
                    </Badge>
                  </div>
                  <div className="absolute bottom-2 left-2 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm font-medium">{show.rating}</span>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="outline" className="bg-white bg-opacity-90 text-black text-xs">
                      {getTypeText(show.type)}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className={viewMode === 'list' ? 'flex items-center gap-4' : ''}>
                    {viewMode === 'list' && (
                      <img
                        src={show.poster}
                        alt={show.title}
                        className="w-16 h-24 object-cover rounded"
                      />
                    )}
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                        {show.arabicTitle}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                        {show.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{show.year}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{show.episodes} حلقة</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{show.views.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 flex flex-wrap gap-1">
                        {show.genre.slice(0, 2).map((genre, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                      
                      {viewMode === 'list' && (
                        <div className="mt-2 text-sm text-gray-500">
                          <span className="font-medium">المضيف:</span> {show.host}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && filteredShows.length === 0 && (
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