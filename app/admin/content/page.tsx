'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  FilmIcon,
  TvIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  StarIcon,
  CalendarDaysIcon,
  PlayIcon,
  PencilIcon,
  TrashIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'

interface ContentItem {
  id: string
  title: string
  type: 'movie' | 'series'
  description: string
  poster: string
  backdrop: string
  status: 'published' | 'draft' | 'archived'
  featured: boolean
  trending: boolean
  rating: number
  views: number
  releaseDate: string
  genre: string[]
  quality: string[]
  language: string
  country: string
  duration?: number // for movies
  seasons?: number // for series
  episodes?: number // for series
  createdAt: string
  updatedAt: string
}

// Mock data
const mockContent: ContentItem[] = [
  {
    id: '1',
    title: 'فيلم الحركة المثير',
    type: 'movie',
    description: 'فيلم حركة مليء بالمغامرات والإثارة من إنتاج هوليوود 2024',
    poster: '/posters/action-movie.jpg',
    backdrop: '/backdrops/action-movie.jpg',
    status: 'published',
    featured: true,
    trending: true,
    rating: 8.5,
    views: 15420,
    releaseDate: '2024-01-15',
    genre: ['حركة', 'إثارة', 'مغامرات'],
    quality: ['4K', '1080p', '720p'],
    language: 'العربية',
    country: 'أمريكا',
    duration: 145,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    title: 'مسلسل الدراما العائلية',
    type: 'series',
    description: 'مسلسل درامي يحكي قصة عائلة عربية وتحدياتها في العصر الحديث',
    poster: '/posters/family-drama.jpg',
    backdrop: '/backdrops/family-drama.jpg',
    status: 'published',
    featured: true,
    trending: false,
    rating: 9.2,
    views: 28750,
    releaseDate: '2023-12-01',
    genre: ['دراما', 'عائلي', 'اجتماعي'],
    quality: ['1080p', '720p'],
    language: 'العربية',
    country: 'مصر',
    seasons: 2,
    episodes: 45,
    createdAt: '2023-11-25T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z'
  },
  {
    id: '3',
    title: 'كوميديا رومانسية',
    type: 'movie',
    description: 'فيلم كوميدي رومانسي خفيف ومسلي للعائلة',
    poster: '/posters/romantic-comedy.jpg',
    backdrop: '/backdrops/romantic-comedy.jpg',
    status: 'draft',
    featured: false,
    trending: false,
    rating: 7.8,
    views: 8950,
    releaseDate: '2024-02-14',
    genre: ['كوميديا', 'رومانسي'],
    quality: ['1080p', '720p'],
    language: 'العربية',
    country: 'لبنان',
    duration: 98,
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-22T00:00:00Z'
  },
  {
    id: '4',
    title: 'مسلسل الجريمة والتشويق',
    type: 'series',
    description: 'مسلسل بوليسي مشوق يتابع قضايا جرائم معقدة',
    poster: '/posters/crime-thriller.jpg',
    backdrop: '/backdrops/crime-thriller.jpg',
    status: 'published',
    featured: false,
    trending: true,
    rating: 8.9,
    views: 19320,
    releaseDate: '2024-01-01',
    genre: ['جريمة', 'تشويق', 'بوليسي'],
    quality: ['4K', '1080p'],
    language: 'العربية',
    country: 'الأردن',
    seasons: 1,
    episodes: 12,
    createdAt: '2023-12-15T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  },
  {
    id: '5',
    title: 'فيلم الخيال العلمي',
    type: 'movie',
    description: 'فيلم خيال علمي يستكشف مستقبل البشرية',
    poster: '/posters/sci-fi.jpg',
    backdrop: '/backdrops/sci-fi.jpg',
    status: 'archived',
    featured: false,
    trending: false,
    rating: 6.5,
    views: 5240,
    releaseDate: '2023-08-15',
    genre: ['خيال علمي', 'إثارة'],
    quality: ['1080p', '720p'],
    language: 'العربية',
    country: 'الإمارات',
    duration: 112,
    createdAt: '2023-08-10T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  }
]

export default function ContentManagement() {
  const [content, setContent] = useState<ContentItem[]>([])
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<'all' | 'movie' | 'series'>('all')
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'published' | 'draft' | 'archived'>('all')
  const [sortBy, setSortBy] = useState<'title' | 'views' | 'rating' | 'date'>('date')

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setContent(mockContent)
        setFilteredContent(mockContent)
      } catch (error) {
        // // console.error('Error loading content:', error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  useEffect(() => {
    let filtered = [...content]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(item => item.type === selectedType)
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(item => item.status === selectedStatus)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title, 'ar')
        case 'views':
          return b.views - a.views
        case 'rating':
          return b.rating - a.rating
        case 'date':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        default:
          return 0
      }
    })

    setFilteredContent(filtered)
  }, [content, searchTerm, selectedType, selectedStatus, sortBy])

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { label: 'منشور', color: 'bg-green-100 text-green-800' },
      draft: { label: 'مسودة', color: 'bg-yellow-100 text-yellow-800' },
      archived: { label: 'مؤرشف', color: 'bg-gray-100 text-gray-800' }
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    )
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}س ${mins}د`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA')
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">إدارة المحتوى</h1>
          <p className="text-muted-foreground mt-1">
            إدارة الأفلام والمسلسلات والمحتوى المرئي
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link href="/admin/movies/create">
            <Button className="w-full sm:w-auto">
              <FilmIcon className="w-4 h-4 mr-2" />
              إضافة فيلم
            </Button>
          </Link>
          <Link href="/admin/series/create">
            <Button variant="outline" className="w-full sm:w-auto">
              <TvIcon className="w-4 h-4 mr-2" />
              إضافة مسلسل
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الأفلام</p>
                <p className="text-2xl font-bold">{content.filter(c => c.type === 'movie').length}</p>
              </div>
              <FilmIcon className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المسلسلات</p>
                <p className="text-2xl font-bold">{content.filter(c => c.type === 'series').length}</p>
              </div>
              <TvIcon className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المشاهدات</p>
                <p className="text-2xl font-bold">{content.reduce((sum, c) => sum + c.views, 0).toLocaleString()}</p>
              </div>
              <EyeIcon className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المحتوى المميز</p>
                <p className="text-2xl font-bold">{content.filter(c => c.featured).length}</p>
              </div>
              <StarIcon className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="البحث في المحتوى..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as 'all' | 'movie' | 'series' | 'episode')}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="all">جميع الأنواع</option>
              <option value="movie">أفلام</option>
              <option value="series">مسلسلات</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'published' | 'draft' | 'archived')}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="all">جميع الحالات</option>
              <option value="published">منشور</option>
              <option value="draft">مسودة</option>
              <option value="archived">مؤرشف</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'created' | 'updated' | 'title' | 'rating')}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="date">تاريخ التحديث</option>
              <option value="title">العنوان</option>
              <option value="views">المشاهدات</option>
              <option value="rating">التقييم</option>
            </select>
            <div className="text-sm text-muted-foreground flex items-center">
              <FunnelIcon className="w-4 h-4 mr-1" />
              {filteredContent.length} من {content.length} عنصر
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredContent.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={item.poster}
                alt={item.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-poster.jpg'
                }}
              />
              <div className="absolute top-2 right-2 flex gap-1">
                {item.featured && (
                  <Badge className="bg-yellow-500 text-white">مميز</Badge>
                )}
                {item.trending && (
                  <Badge className="bg-red-500 text-white">الأكثر شيوعاً</Badge>
                )}
              </div>
              <div className="absolute top-2 left-2">
                {getStatusBadge(item.status)}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                {item.type === 'movie' ? (
                  <FilmIcon className="w-4 h-4 text-blue-500" />
                ) : (
                  <TvIcon className="w-4 h-4 text-purple-500" />
                )}
                <span className="text-sm text-muted-foreground">
                  {item.type === 'movie' ? 'فيلم' : 'مسلسل'}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    {item.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <EyeIcon className="w-4 h-4 text-gray-500" />
                    {item.views.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <CalendarDaysIcon className="w-4 h-4 text-gray-500" />
                    {formatDate(item.releaseDate)}
                  </span>
                  {item.type === 'movie' && item.duration && (
                    <span>{formatDuration(item.duration)}</span>
                  )}
                  {item.type === 'series' && (
                    <span>{item.seasons} مواسم، {item.episodes} حلقة</span>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {item.genre.slice(0, 2).map((g, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {g}
                    </Badge>
                  ))}
                  {item.genre.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.genre.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" className="flex-1">
                  <PlayIcon className="w-4 h-4 mr-1" />
                  مشاهدة
                </Button>
                <Button size="sm" variant="outline">
                  <PencilIcon className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 mb-4 text-gray-400">
            <FilmIcon className="w-full h-full" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            لا يوجد محتوى
          </h3>
          <p className="text-gray-500 mb-4">
            لم يتم العثور على أي محتوى يطابق معايير البحث
          </p>
          <Button>
            <PlusIcon className="w-4 h-4 mr-2" />
            إضافة محتوى جديد
          </Button>
        </div>
      )}
    </div>
  )
}