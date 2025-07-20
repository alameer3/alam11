'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  MagnifyingGlassIcon,
  FilmIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'

interface Movie {
  id: number
  title: string
  original_title?: string
  slug: string
  description?: string
  poster?: string
  backdrop?: string
  release_date?: string
  runtime?: number
  imdb_rating?: number
  local_rating?: number
  views_count?: number
  downloads_count?: number
  section_name?: string
  country_name?: string
  language_name?: string
  quality_name?: string
  is_featured?: boolean
  is_trending?: boolean
  is_active?: boolean
  created_at?: string
}

interface PaginationResult {
  data: Movie[]
  pagination: {
    page: number
    perPage: number
    total: number
    pages: number
  }
}

export default function MoviesManagementPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalMovies, setTotalMovies] = useState(0)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)

  const perPage = 12

  const fetchMovies = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        perPage: perPage.toString(),
        ...(searchTerm && { search: searchTerm })
      })

      const response = await fetch(`/api/movies?${params}`)
      if (response.ok) {
        const data: PaginationResult = await response.json()
        setMovies(data.data)
        setTotalPages(data.pagination.pages)
        setTotalMovies(data.pagination.total)
      } else {
        console.error('فشل في جلب الأفلام')
      }
    } catch (error) {
      console.error('خطأ في جلب الأفلام:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (movieId: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا الفيلم؟')) return

    try {
      setIsDeleting(movieId)
      const response = await fetch(`/api/movies/${movieId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setMovies(movies.filter(movie => movie.id !== movieId))
        setTotalMovies(prev => prev - 1)
      } else {
        alert('فشل في حذف الفيلم')
      }
    } catch (error) {
      console.error('خطأ في حذف الفيلم:', error)
      alert('خطأ في حذف الفيلم')
    } finally {
      setIsDeleting(null)
    }
  }

  const toggleFeatured = async (movieId: number, currentFeatured: boolean) => {
    try {
      const response = await fetch(`/api/movies/${movieId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          is_featured: !currentFeatured
        })
      })

      if (response.ok) {
        setMovies(movies.map(movie => 
          movie.id === movieId 
            ? { ...movie, is_featured: !currentFeatured }
            : movie
        ))
      }
    } catch (error) {
      console.error('خطأ في تحديث حالة المميز:', error)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [currentPage, searchTerm])

  const handleSearch = () => {
    setCurrentPage(1)
    fetchMovies()
  }

  return (
    <div className="container mx-auto p-6" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <FilmIcon className="w-8 h-8 text-blue-500" />
            إدارة الأفلام
          </h1>
          <p className="text-gray-400 mt-1">
            إجمالي الأفلام: {totalMovies}
          </p>
        </div>
        
        <Link href="/admin/movies/create">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <PlusIcon className="w-5 h-5 ml-2" />
            إضافة فيلم جديد
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6 bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="البحث في الأفلام..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="pr-10 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
              بحث
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Movies Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700 animate-pulse">
              <div className="aspect-[2/3] bg-gray-700 rounded-t-lg"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : movies.length === 0 ? (
        <Card className="bg-gray-800 border-gray-700 text-center py-12">
          <CardContent>
            <FilmIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">لا توجد أفلام</h3>
            <p className="text-gray-400 mb-4">
              {searchTerm ? 'لم يتم العثور على أفلام تطابق البحث' : 'لم يتم إضافة أي أفلام بعد'}
            </p>
            <Link href="/admin/movies/create">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <PlusIcon className="w-5 h-5 ml-2" />
                إضافة أول فيلم
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
            {movies.map((movie) => (
              <Card key={movie.id} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                <div className="relative">
                  {/* Movie Poster */}
                  <div className="aspect-[2/3] relative overflow-hidden rounded-t-lg">
                    {movie.poster ? (
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <FilmIcon className="w-16 h-16 text-gray-500" />
                      </div>
                    )}
                    
                    {/* Featured Badge */}
                    {movie.is_featured && (
                      <Badge className="absolute top-2 right-2 bg-yellow-600 text-white">
                        مميز
                      </Badge>
                    )}
                    
                    {/* Rating */}
                    {movie.imdb_rating && movie.imdb_rating > 0 && (
                      <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded flex items-center gap-1">
                        <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm">{movie.imdb_rating}</span>
                      </div>
                    )}
                  </div>

                  {/* Movie Info */}
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-white mb-2 line-clamp-2">
                      {movie.title}
                    </h3>
                    
                    {movie.original_title && movie.original_title !== movie.title && (
                      <p className="text-sm text-gray-400 mb-2 line-clamp-1">
                        {movie.original_title}
                      </p>
                    )}

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">السنة:</span>
                        <span className="text-white">
                          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'غير محدد'}
                        </span>
                      </div>
                      
                      {movie.section_name && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">القسم:</span>
                          <span className="text-white">{movie.section_name}</span>
                        </div>
                      )}
                      
                      {movie.quality_name && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">الجودة:</span>
                          <Badge variant="secondary">{movie.quality_name}</Badge>
                        </div>
                      )}
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">المشاهدات:</span>
                        <span className="text-white">{movie.views_count?.toLocaleString() || 0}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link href={`/movie/${movie.slug}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                          <EyeIcon className="w-4 h-4 ml-1" />
                          عرض
                        </Button>
                      </Link>
                      
                      <Link href={`/admin/movies/${movie.id}/edit`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white">
                          <PencilIcon className="w-4 h-4 ml-1" />
                          تعديل
                        </Button>
                      </Link>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleFeatured(movie.id, movie.is_featured || false)}
                        className={`border-yellow-600 ${movie.is_featured ? 'text-yellow-400 bg-yellow-600/20' : 'text-yellow-400 hover:bg-yellow-600 hover:text-white'}`}
                      >
                        <StarIcon className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(movie.id)}
                        disabled={isDeleting === movie.id}
                        className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                السابق
              </Button>
              
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page 
                        ? "bg-blue-600 text-white" 
                        : "border-gray-600 text-gray-300 hover:bg-gray-700"
                      }
                    >
                      {page}
                    </Button>
                  )
                })}
              </div>
              
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                التالي
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}