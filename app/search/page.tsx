'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Grid3X3, List, Star, Eye, Calendar, Clock, Film, Tv, Music, Mic, BookOpen, Video, TrendingUp, Clock as ClockIcon, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface SearchResult {
  id: string
  title: string
  arabicTitle: string
  description: string
  year: number
  rating: number
  views: number
  duration: string
  genre: string[]
  quality: string
  type: 'movie' | 'series' | 'show' | 'music' | 'podcast' | 'audiobook' | 'documentary'
  poster: string
  language: string
  country: string
  director?: string
  cast?: string[]
  artist?: string
  album?: string
  author?: string
  host?: string
  synopsis: string
  isTrending?: boolean
  isNew?: boolean
  isFeatured?: boolean
}

const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    title: 'The Dark Knight',
    arabicTitle: 'الفرسان المظلم',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    year: 2008,
    rating: 9.0,
    views: 1800000,
    duration: '2:32:00',
    genre: ['Action', 'Crime', 'Drama'],
    quality: '4K',
    type: 'movie',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
    language: 'English',
    country: 'USA',
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    synopsis: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    isTrending: true
  },
  {
    id: '2',
    title: 'Breaking Bad',
    arabicTitle: 'بريكينغ باد',
    description: 'A high school chemistry teacher turned methamphetamine manufacturer',
    year: 2008,
    rating: 9.5,
    views: 2500000,
    duration: '47 min',
    genre: ['Crime', 'Drama', 'Thriller'],
    quality: '1080p',
    type: 'series',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a9?w=300&h=450&fit=crop',
    language: 'English',
    country: 'USA',
    director: 'Vince Gilligan',
    cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn'],
    synopsis: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s financial future.',
    isFeatured: true
  },
  {
    id: '3',
    title: 'Bohemian Rhapsody',
    arabicTitle: 'رابسودي بوهيمي',
    description: 'One of the most iconic songs in rock music history',
    year: 1975,
    rating: 9.8,
    views: 2500000,
    duration: '5:55',
    genre: ['Rock', 'Progressive Rock', 'Opera'],
    quality: 'Lossless',
    type: 'music',
    poster: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=450&fit=crop',
    language: 'English',
    country: 'UK',
    artist: 'Queen',
    album: 'A Night at the Opera',
    synopsis: 'Bohemian Rhapsody is a song by the British rock band Queen.',
    isTrending: true
  },
  {
    id: '4',
    title: 'The Joe Rogan Experience',
    arabicTitle: 'تجربة جو روغان',
    description: 'The most popular podcast in the world',
    year: 2009,
    rating: 8.9,
    views: 1800000,
    duration: '2:30:00',
    genre: ['Podcast', 'Interview', 'Comedy'],
    quality: 'HD',
    type: 'podcast',
    poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop',
    language: 'English',
    country: 'USA',
    host: 'Joe Rogan',
    synopsis: 'The Joe Rogan Experience is a podcast hosted by American comedian Joe Rogan.',
    isNew: true
  },
  {
    id: '5',
    title: 'The Great Gatsby',
    arabicTitle: 'غاتسبي العظيم',
    description: 'A classic American novel by F. Scott Fitzgerald',
    year: 1925,
    rating: 9.2,
    views: 1200000,
    duration: '8:45:00',
    genre: ['Fiction', 'Classic', 'Drama'],
    quality: 'HD',
    type: 'audiobook',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
    language: 'English',
    country: 'USA',
    author: 'F. Scott Fitzgerald',
    synopsis: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald.',
    isFeatured: true
  },
  {
    id: '6',
    title: 'Cosmos: A Spacetime Odyssey',
    arabicTitle: 'الكون: رحلة عبر الزمكان',
    description: 'A documentary series about the universe',
    year: 2014,
    rating: 9.4,
    views: 3500000,
    duration: '45:00',
    genre: ['Documentary', 'Science', 'Educational'],
    quality: '4K',
    type: 'documentary',
    poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop',
    language: 'English',
    country: 'USA',
    director: 'Neil deGrasse Tyson',
    synopsis: 'Cosmos: A Spacetime Odyssey is an American science documentary television series.',
    isTrending: true
  }
]

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<SearchResult[]>(mockSearchResults)
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>(mockSearchResults)
  const [selectedType, setSelectedType] = useState('all')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')
  const [selectedQuality, setSelectedQuality] = useState('all')
  const [selectedLanguage, setSelectedLanguage] = useState('all')
  const [sortBy, setSortBy] = useState('relevance')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [activeTab, setActiveTab] = useState('all')
  const [isLoading, setIsLoading] = useState(false)

  const types = ['all', 'movie', 'series', 'show', 'music', 'podcast', 'audiobook', 'documentary']
  const genres = ['all', ...Array.from(new Set(results.flatMap(r => r.genre)))]
  const years = ['all', ...Array.from(new Set(results.map(r => r.year.toString())))]
  const qualities = ['all', ...Array.from(new Set(results.map(r => r.quality)))]
  const languages = ['all', ...Array.from(new Set(results.map(r => r.language)))]

  useEffect(() => {
    setIsLoading(true)
    
    let filtered = results.filter(result => {
      const matchesSearch = result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           result.arabicTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           result.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           result.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesType = selectedType === 'all' || result.type === selectedType
      const matchesGenre = selectedGenre === 'all' || result.genre.includes(selectedGenre)
      const matchesYear = selectedYear === 'all' || result.year.toString() === selectedYear
      const matchesQuality = selectedQuality === 'all' || result.quality === selectedQuality
      const matchesLanguage = selectedLanguage === 'all' || result.language === selectedLanguage
      
      return matchesSearch && matchesType && matchesGenre && matchesYear && matchesQuality && matchesLanguage
    })

    // Sort filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          return b.rating - a.rating
        case 'rating':
          return b.rating - a.rating
        case 'views':
          return b.views - a.views
        case 'year':
          return b.year - a.year
        case 'title':
          return a.title.localeCompare(b.title)
        case 'trending':
          return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0)
        case 'new':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        default:
          return 0
      }
    })

    setFilteredResults(filtered)
    
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 300)
  }, [searchTerm, selectedType, selectedGenre, selectedYear, selectedQuality, selectedLanguage, sortBy, results])

  const getTypeText = (type: string) => {
    switch (type) {
      case 'movie': return 'فيلم'
      case 'series': return 'مسلسل'
      case 'show': return 'برنامج'
      case 'music': return 'موسيقى'
      case 'podcast': return 'بودكاست'
      case 'audiobook': return 'كتاب صوتي'
      case 'documentary': return 'وثائقي'
      default: return type
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'movie': return <Film className="w-4 h-4" />
      case 'series': return <Tv className="w-4 h-4" />
      case 'show': return <Video className="w-4 h-4" />
      case 'music': return <Music className="w-4 h-4" />
      case 'podcast': return <Mic className="w-4 h-4" />
      case 'audiobook': return <BookOpen className="w-4 h-4" />
      case 'documentary': return <Video className="w-4 h-4" />
      default: return <Video className="w-4 h-4" />
    }
  }

  const getTabResults = (tabType: string) => {
    if (tabType === 'all') return filteredResults
    return filteredResults.filter(result => result.type === tabType)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Search Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">البحث المتقدم</h1>
            <p className="text-gray-600 dark:text-gray-400">
              ابحث في جميع أنواع المحتوى بسهولة وسرعة
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="ابحث عن أفلام، مسلسلات، موسيقى، بودكاست..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
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

            {/* Language Filter */}
            <div>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="اللغة" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(language => (
                    <SelectItem key={language} value={language}>
                      {language === 'all' ? 'جميع اللغات' : language}
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
                  <SelectItem value="relevance">الأكثر صلة</SelectItem>
                  <SelectItem value="rating">التقييم</SelectItem>
                  <SelectItem value="views">المشاهدات</SelectItem>
                  <SelectItem value="year">السنة</SelectItem>
                  <SelectItem value="title">العنوان</SelectItem>
                  <SelectItem value="trending">رائج</SelectItem>
                  <SelectItem value="new">جديد</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              تم العثور على {filteredResults.length} نتيجة
            </div>
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

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Results Tabs */}
        {!isLoading && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="movie">أفلام</TabsTrigger>
              <TabsTrigger value="series">مسلسلات</TabsTrigger>
              <TabsTrigger value="show">برامج</TabsTrigger>
              <TabsTrigger value="music">موسيقى</TabsTrigger>
              <TabsTrigger value="podcast">بودكاست</TabsTrigger>
              <TabsTrigger value="audiobook">كتب صوتية</TabsTrigger>
              <TabsTrigger value="documentary">وثائقيات</TabsTrigger>
            </TabsList>

            {types.slice(1).map(type => (
              <TabsContent key={type} value={type}>
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
                }>
                  {getTabResults(type).map((result) => (
                    <Card key={result.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={result.poster}
                          alt={result.title}
                          className={`w-full object-cover ${viewMode === 'grid' ? 'h-64' : 'h-32'}`}
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="bg-black bg-opacity-75 text-white">
                            {result.quality}
                          </Badge>
                        </div>
                        <div className="absolute top-2 left-2 flex items-center gap-1">
                          <Badge variant="outline" className="bg-white bg-opacity-90 text-black text-xs flex items-center gap-1">
                            {getTypeIcon(result.type)}
                            {getTypeText(result.type)}
                          </Badge>
                        </div>
                        <div className="absolute bottom-2 left-2 flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white text-sm font-medium">{result.rating}</span>
                        </div>
                        {result.isTrending && (
                          <div className="absolute bottom-2 right-2">
                            <Badge className="bg-orange-500 text-white text-xs">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              رائج
                            </Badge>
                          </div>
                        )}
                        {result.isNew && (
                          <div className="absolute bottom-2 right-2">
                            <Badge className="bg-green-500 text-white text-xs">
                              <ClockIcon className="w-3 h-3 mr-1" />
                              جديد
                            </Badge>
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-4">
                        <div className={viewMode === 'list' ? 'flex items-center gap-4' : ''}>
                          {viewMode === 'list' && (
                            <img
                              src={result.poster}
                              alt={result.title}
                              className="w-16 h-24 object-cover rounded"
                            />
                          )}
                          
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                              {result.arabicTitle}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                              {result.description}
                            </p>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{result.year}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{result.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                <span>{result.views.toLocaleString()}</span>
                              </div>
                            </div>
                            
                            <div className="mt-2 flex flex-wrap gap-1">
                              {result.genre.slice(0, 2).map((genre, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {genre}
                                </Badge>
                              ))}
                            </div>
                            
                            {viewMode === 'list' && result.director && (
                              <div className="mt-2 text-sm text-gray-500">
                                <span className="font-medium">المخرج:</span> {result.director}
                              </div>
                            )}
                            
                            {viewMode === 'list' && result.artist && (
                              <div className="mt-2 text-sm text-gray-500">
                                <span className="font-medium">الفنان:</span> {result.artist}
                              </div>
                            )}
                            
                            {viewMode === 'list' && result.author && (
                              <div className="mt-2 text-sm text-gray-500">
                                <span className="font-medium">المؤلف:</span> {result.author}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}

            <TabsContent value="all">
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
              }>
                {filteredResults.map((result) => (
                  <Card key={result.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={result.poster}
                        alt={result.title}
                        className={`w-full object-cover ${viewMode === 'grid' ? 'h-64' : 'h-32'}`}
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-black bg-opacity-75 text-white">
                          {result.quality}
                        </Badge>
                      </div>
                      <div className="absolute top-2 left-2 flex items-center gap-1">
                        <Badge variant="outline" className="bg-white bg-opacity-90 text-black text-xs flex items-center gap-1">
                          {getTypeIcon(result.type)}
                          {getTypeText(result.type)}
                        </Badge>
                      </div>
                      <div className="absolute bottom-2 left-2 flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white text-sm font-medium">{result.rating}</span>
                      </div>
                      {result.isTrending && (
                        <div className="absolute bottom-2 right-2">
                          <Badge className="bg-orange-500 text-white text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            رائج
                          </Badge>
                        </div>
                      )}
                      {result.isNew && (
                        <div className="absolute bottom-2 right-2">
                          <Badge className="bg-green-500 text-white text-xs">
                            <ClockIcon className="w-3 h-3 mr-1" />
                            جديد
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-4">
                      <div className={viewMode === 'list' ? 'flex items-center gap-4' : ''}>
                        {viewMode === 'list' && (
                          <img
                            src={result.poster}
                            alt={result.title}
                            className="w-16 h-24 object-cover rounded"
                          />
                        )}
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                            {result.arabicTitle}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                            {result.description}
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{result.year}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{result.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>{result.views.toLocaleString()}</span>
                            </div>
                          </div>
                          
                          <div className="mt-2 flex flex-wrap gap-1">
                            {result.genre.slice(0, 2).map((genre, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                          
                          {viewMode === 'list' && result.director && (
                            <div className="mt-2 text-sm text-gray-500">
                              <span className="font-medium">المخرج:</span> {result.director}
                            </div>
                          )}
                          
                          {viewMode === 'list' && result.artist && (
                            <div className="mt-2 text-sm text-gray-500">
                              <span className="font-medium">الفنان:</span> {result.artist}
                            </div>
                          )}
                          
                          {viewMode === 'list' && result.author && (
                            <div className="mt-2 text-sm text-gray-500">
                              <span className="font-medium">المؤلف:</span> {result.author}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* No Results */}
        {!isLoading && filteredResults.length === 0 && (
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