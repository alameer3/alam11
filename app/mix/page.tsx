'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Grid3X3, List, Star, Eye, Calendar, Clock, Music, Video, Mic, BookOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

interface MixContent {
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
  status: 'available' | 'premium' | 'new'
  poster: string
  backdrop: string
  language: string
  country: string
  artist?: string
  album?: string
  author?: string
  synopsis: string
  type: 'music' | 'podcast' | 'audiobook' | 'documentary' | 'lecture' | 'comedy'
}

const mockMixContent: MixContent[] = [
  {
    id: '1',
    title: 'Bohemian Rhapsody',
    arabicTitle: 'رابسودي بوهيمي',
    description: 'One of the most iconic songs in rock music history',
    year: 1975,
    rating: 9.8,
    views: 2500000,
    duration: '5:55',
    genre: ['Rock', 'Progressive Rock', 'Opera'],
    quality: 'Lossless',
    status: 'available',
    poster: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=400&fit=crop',
    language: 'English',
    country: 'UK',
    artist: 'Queen',
    album: 'A Night at the Opera',
    synopsis: 'Bohemian Rhapsody is a song by the British rock band Queen.',
    type: 'music'
  },
  {
    id: '2',
    title: 'The Joe Rogan Experience',
    arabicTitle: 'تجربة جو روغان',
    description: 'The most popular podcast in the world',
    year: 2009,
    rating: 8.9,
    views: 1800000,
    duration: '2:30:00',
    genre: ['Podcast', 'Interview', 'Comedy'],
    quality: 'HD',
    status: 'premium',
    poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=400&fit=crop',
    language: 'English',
    country: 'USA',
    author: 'Joe Rogan',
    synopsis: 'The Joe Rogan Experience is a podcast hosted by American comedian Joe Rogan.',
    type: 'podcast'
  },
  {
    id: '3',
    title: 'The Great Gatsby',
    arabicTitle: 'غاتسبي العظيم',
    description: 'A classic American novel by F. Scott Fitzgerald',
    year: 1925,
    rating: 9.2,
    views: 1200000,
    duration: '8:45:00',
    genre: ['Fiction', 'Classic', 'Drama'],
    quality: 'HD',
    status: 'available',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=400&fit=crop',
    language: 'English',
    country: 'USA',
    author: 'F. Scott Fitzgerald',
    synopsis: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald.',
    type: 'audiobook'
  },
  {
    id: '4',
    title: 'Cosmos: A Spacetime Odyssey',
    arabicTitle: 'الكون: رحلة عبر الزمكان',
    description: 'A documentary series about the universe',
    year: 2014,
    rating: 9.4,
    views: 3500000,
    duration: '45:00',
    genre: ['Documentary', 'Science', 'Educational'],
    quality: '4K',
    status: 'premium',
    poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop',
    language: 'English',
    country: 'USA',
    author: 'Neil deGrasse Tyson',
    synopsis: 'Cosmos: A Spacetime Odyssey is an American science documentary television series.',
    type: 'documentary'
  },
  {
    id: '5',
    title: 'The Art of War',
    arabicTitle: 'فن الحرب',
    description: 'Ancient Chinese text on military strategy',
    year: -500,
    rating: 8.7,
    views: 800000,
    duration: '3:20:00',
    genre: ['Philosophy', 'Military', 'Classic'],
    quality: 'HD',
    status: 'available',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a9?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a9?w=1200&h=400&fit=crop',
    language: 'Chinese',
    country: 'China',
    author: 'Sun Tzu',
    synopsis: 'The Art of War is an ancient Chinese text on military strategy.',
    type: 'audiobook'
  },
  {
    id: '6',
    title: 'Comedy Central Stand-Up',
    arabicTitle: 'كوميدي سنترال ستاند أب',
    description: 'The best stand-up comedy specials',
    year: 2023,
    rating: 8.5,
    views: 1500000,
    duration: '1:15:00',
    genre: ['Comedy', 'Stand-Up', 'Entertainment'],
    quality: '1080p',
    status: 'new',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=400&fit=crop',
    language: 'English',
    country: 'USA',
    author: 'Various Comedians',
    synopsis: 'Comedy Central Stand-Up features the best stand-up comedy specials.',
    type: 'comedy'
  },
  {
    id: '7',
    title: 'Harvard Business Review',
    arabicTitle: 'هارفارد بيزنس ريفيو',
    description: 'Insights from Harvard Business School',
    year: 2024,
    rating: 8.9,
    views: 900000,
    duration: '45:00',
    genre: ['Business', 'Education', 'Leadership'],
    quality: 'HD',
    status: 'premium',
    poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=400&fit=crop',
    language: 'English',
    country: 'USA',
    author: 'Harvard Business School',
    synopsis: 'Harvard Business Review provides insights from Harvard Business School.',
    type: 'lecture'
  },
  {
    id: '8',
    title: 'Pink Floyd - Dark Side of the Moon',
    arabicTitle: 'بينك فلويد - الجانب المظلم من القمر',
    description: 'One of the greatest albums ever recorded',
    year: 1973,
    rating: 9.6,
    views: 3200000,
    duration: '42:50',
    genre: ['Rock', 'Progressive Rock', 'Psychedelic'],
    quality: 'Lossless',
    status: 'available',
    poster: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=400&fit=crop',
    language: 'English',
    country: 'UK',
    artist: 'Pink Floyd',
    album: 'The Dark Side of the Moon',
    synopsis: 'The Dark Side of the Moon is the eighth studio album by English rock band Pink Floyd.',
    type: 'music'
  }
]

export default function MixPage() {
  const [content, setContent] = useState<MixContent[]>(mockMixContent)
  const [filteredContent, setFilteredContent] = useState<MixContent[]>(mockMixContent)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')
  const [selectedQuality, setSelectedQuality] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [sortBy, setSortBy] = useState('rating')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isLoading, setIsLoading] = useState(false)

  const genres = ['all', ...Array.from(new Set(content.flatMap(c => c.genre)))]
  const years = ['all', ...Array.from(new Set(content.map(c => c.year.toString())))]
  const qualities = ['all', ...Array.from(new Set(content.map(c => c.quality)))]
  const statuses = ['all', 'available', 'premium', 'new']
  const types = ['all', 'music', 'podcast', 'audiobook', 'documentary', 'lecture', 'comedy']

  useEffect(() => {
    setIsLoading(true)
    
    let filtered = content.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.arabicTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesGenre = selectedGenre === 'all' || item.genre.includes(selectedGenre)
      const matchesYear = selectedYear === 'all' || item.year.toString() === selectedYear
      const matchesQuality = selectedQuality === 'all' || item.quality === selectedQuality
      const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus
      const matchesType = selectedType === 'all' || item.type === selectedType
      
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

    setFilteredContent(filtered)
    
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 300)
  }, [searchTerm, selectedGenre, selectedYear, selectedQuality, selectedStatus, selectedType, sortBy, content])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'premium': return 'bg-yellow-100 text-yellow-800'
      case 'new': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'متاح'
      case 'premium': return 'مميز'
      case 'new': return 'جديد'
      default: return status
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'music': return 'موسيقى'
      case 'podcast': return 'بودكاست'
      case 'audiobook': return 'كتاب صوتي'
      case 'documentary': return 'وثائقي'
      case 'lecture': return 'محاضرة'
      case 'comedy': return 'كوميدي'
      default: return type
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'music': return <Music className="w-4 h-4" />
      case 'podcast': return <Mic className="w-4 h-4" />
      case 'audiobook': return <BookOpen className="w-4 h-4" />
      case 'documentary': return <Video className="w-4 h-4" />
      case 'lecture': return <BookOpen className="w-4 h-4" />
      case 'comedy': return <Mic className="w-4 h-4" />
      default: return <Video className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">المنوعات</h1>
            <p className="text-xl opacity-90">
              اكتشف الموسيقى والبودكاست والكتب الصوتية والمحتوى المتنوع
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span>{content.reduce((sum, c) => sum + c.views, 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Music className="w-5 h-5" />
                <span>{content.length} محتوى</span>
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
                  placeholder="البحث في المنوعات..."
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
            تم العثور على {filteredContent.length} محتوى
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        )}

        {/* Content Grid/List */}
        {!isLoading && (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
          }>
            {filteredContent.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={item.poster}
                    alt={item.title}
                    className={`w-full object-cover ${viewMode === 'grid' ? 'h-64' : 'h-32'}`}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-black bg-opacity-75 text-white">
                      {item.quality}
                    </Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className={getStatusColor(item.status)}>
                      {getStatusText(item.status)}
                    </Badge>
                  </div>
                  <div className="absolute bottom-2 left-2 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm font-medium">{item.rating}</span>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="outline" className="bg-white bg-opacity-90 text-black text-xs flex items-center gap-1">
                      {getTypeIcon(item.type)}
                      {getTypeText(item.type)}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className={viewMode === 'list' ? 'flex items-center gap-4' : ''}>
                    {viewMode === 'list' && (
                      <img
                        src={item.poster}
                        alt={item.title}
                        className="w-16 h-24 object-cover rounded"
                      />
                    )}
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                        {item.arabicTitle}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{item.year}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{item.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{item.views.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 flex flex-wrap gap-1">
                        {item.genre.slice(0, 2).map((genre, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                      
                      {viewMode === 'list' && item.artist && (
                        <div className="mt-2 text-sm text-gray-500">
                          <span className="font-medium">الفنان:</span> {item.artist}
                        </div>
                      )}
                      
                      {viewMode === 'list' && item.author && (
                        <div className="mt-2 text-sm text-gray-500">
                          <span className="font-medium">المؤلف:</span> {item.author}
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
        {!isLoading && filteredContent.length === 0 && (
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