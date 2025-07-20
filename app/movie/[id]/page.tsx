'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  Play, 
  Star, 
  Calendar, 
  Clock,
  Eye,
  Download,
  Share2,
  Heart,
  Bookmark,
  Info,
  Users,
  Globe,
  Video,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  MessageCircle,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// محاكاة بيانات الفيلم
const getMovieData = (id: string) => ({
  id: parseInt(id),
  title: `فيلم رائع ${id}`,
  originalTitle: `Amazing Movie ${id}`,
  poster: `/api/placeholder/300/450`,
  backdrop: `/api/placeholder/1200/600`,
  trailer: `/api/placeholder/800/450`,
  rating: (8.0 + Math.random() * 2).toFixed(1),
  imdbRating: (7.5 + Math.random() * 2.5).toFixed(1),
  year: 2024 - Math.floor(Math.random() * 5),
  duration: `${90 + Math.floor(Math.random() * 60)}دقيقة`,
  quality: '4K',
  size: '2.5 GB',
  language: 'عربي',
  subtitle: 'متوفر',
  director: 'مخرج مشهور',
  cast: ['ممثل 1', 'ممثل 2', 'ممثل 3', 'ممثل 4'],
  genres: ['أكشن', 'إثارة', 'دراما'],
  description: 'قصة مثيرة تحكي عن مغامرة شيقة في عالم مليء بالإثارة والتشويق، حيث يواجه البطل تحديات كبيرة في رحلة البحث عن الحقيقة.',
  views: `${Math.floor(Math.random() * 1000)}K`,
  downloads: `${Math.floor(Math.random() * 500)}K`,
  releaseDate: '2024-01-15',
  budget: '$50M',
  boxOffice: '$200M',
  country: 'الولايات المتحدة',
  awards: ['جائزة أفضل فيلم', 'جائزة أفضل مخرج'],
  screenshots: Array.from({ length: 6 }, (_, i) => `/api/placeholder/400/225`),
  downloadLinks: [
    { quality: '4K', size: '2.5GB', format: 'MP4', url: '#' },
    { quality: 'FHD', size: '1.8GB', format: 'MP4', url: '#' },
    { quality: 'HD', size: '1.2GB', format: 'MP4', url: '#' }
  ],
  streamingLinks: [
    { name: 'السيرفر الأول', quality: '4K', url: '#' },
    { name: 'السيرفر الثاني', quality: 'FHD', url: '#' },
    { name: 'السيرفر الثالث', quality: 'HD', url: '#' }
  ]
})

const relatedMovies = Array.from({ length: 8 }, (_, i) => ({
  id: i + 10,
  title: `فيلم مشابه ${i + 1}`,
  poster: `/api/placeholder/200/300`,
  rating: (7.5 + Math.random() * 2.5).toFixed(1),
  year: 2024 - Math.floor(Math.random() * 3)
}))

const MovieDetailPage: React.FC = () => {
  const params = useParams()
  const id = params.id as string
  const [movie, setMovie] = useState(getMovieData(id))
  const [currentScreenshot, setCurrentScreenshot] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  return (
    <div className="min-h-screen bg-gray-950 pt-20">
      
      {/* Hero Section */}
      <section className="relative h-96 lg:h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-8">
          <div className="flex flex-col lg:flex-row gap-8 w-full">
            
            {/* Poster */}
            <div className="flex-shrink-0">
              <img 
                src={movie.poster}
                alt={movie.title}
                className="w-48 lg:w-64 rounded-lg shadow-2xl"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-2">
                {movie.title}
              </h1>
              <h2 className="text-lg lg:text-xl text-gray-300 mb-4">
                {movie.originalTitle}
              </h2>

              {/* Quick Info */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge className="bg-yellow-600 text-white border-0">
                  <Star className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                  {movie.rating}
                </Badge>
                <Badge variant="outline" className="border-gray-500 text-gray-300">
                  IMDB: {movie.imdbRating}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {movie.year}
                </Badge>
                <Badge className="bg-blue-600 text-white border-0">
                  {movie.quality}
                </Badge>
                <span className="text-gray-300 flex items-center">
                  <Clock className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                  {movie.duration}
                </span>
                <span className="text-gray-300 flex items-center">
                  <Eye className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                  {movie.views}
                </span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <Badge key={genre} variant="outline" className="border-gray-600 text-gray-300">
                    {genre}
                  </Badge>
                ))}
              </div>

              {/* Description */}
              <p className="text-gray-300 text-lg mb-6 max-w-2xl">
                {movie.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Play className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                  مشاهدة الآن
                </Button>
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  <Download className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                  تحميل
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className={`border-gray-600 ${isFavorite ? 'text-red-400 border-red-400' : 'text-white'} hover:bg-gray-800`}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 ${isFavorite ? 'fill-current' : ''}`} />
                  إعجاب
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className={`border-gray-600 ${isBookmarked ? 'text-yellow-400 border-yellow-400' : 'text-white'} hover:bg-gray-800`}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark className={`w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 ${isBookmarked ? 'fill-current' : ''}`} />
                  حفظ
                </Button>
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  <Share2 className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                  مشاركة
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800 border-gray-700">
              <TabsTrigger value="info" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-400">
                <Info className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                التفاصيل
              </TabsTrigger>
              <TabsTrigger value="watch" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-400">
                <Play className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                المشاهدة
              </TabsTrigger>
              <TabsTrigger value="download" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-400">
                <Download className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                التحميل
              </TabsTrigger>
              <TabsTrigger value="screenshots" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-400">
                <ImageIcon className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                الصور
              </TabsTrigger>
            </TabsList>

            {/* Movie Details */}
            <TabsContent value="info" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Main Info */}
                <div className="lg:col-span-2">
                  <Card className="bg-gray-900/50 border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">معلومات الفيلم</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-gray-400 text-sm mb-1">المخرج</h4>
                          <p className="text-white">{movie.director}</p>
                        </div>
                        <div>
                          <h4 className="text-gray-400 text-sm mb-1">تاريخ الإصدار</h4>
                          <p className="text-white">{movie.releaseDate}</p>
                        </div>
                        <div>
                          <h4 className="text-gray-400 text-sm mb-1">البلد</h4>
                          <p className="text-white">{movie.country}</p>
                        </div>
                        <div>
                          <h4 className="text-gray-400 text-sm mb-1">اللغة</h4>
                          <p className="text-white">{movie.language}</p>
                        </div>
                        <div>
                          <h4 className="text-gray-400 text-sm mb-1">الميزانية</h4>
                          <p className="text-white">{movie.budget}</p>
                        </div>
                        <div>
                          <h4 className="text-gray-400 text-sm mb-1">إيرادات الشباك</h4>
                          <p className="text-white">{movie.boxOffice}</p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="text-gray-400 text-sm mb-2">طاقم التمثيل</h4>
                        <div className="flex flex-wrap gap-2">
                          {movie.cast.map((actor) => (
                            <Badge key={actor} variant="secondary" className="bg-gray-800 text-white">
                              {actor}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {movie.awards.length > 0 && (
                        <div className="mt-6">
                          <h4 className="text-gray-400 text-sm mb-2">الجوائز</h4>
                          <div className="flex flex-wrap gap-2">
                            {movie.awards.map((award) => (
                              <Badge key={award} className="bg-yellow-600 text-white border-0">
                                {award}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div>
                  <Card className="bg-gray-900/50 border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">إحصائيات</h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-400">المشاهدات</span>
                          <span className="text-white">{movie.views}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">التحميلات</span>
                          <span className="text-white">{movie.downloads}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">الحجم</span>
                          <span className="text-white">{movie.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">الترجمة</span>
                          <span className="text-white">{movie.subtitle}</span>
                        </div>
                      </div>

                      <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">
                        <ThumbsUp className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                        أعجبني ({Math.floor(Math.random() * 1000)})
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Watch Tab */}
            <TabsContent value="watch" className="mt-6">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">روابط المشاهدة</h3>
                  
                  <div className="grid gap-4">
                    {movie.streamingLinks.map((link, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <Video className="w-5 h-5 text-blue-400" />
                          <div>
                            <h4 className="text-white font-medium">{link.name}</h4>
                            <p className="text-gray-400 text-sm">جودة {link.quality}</p>
                          </div>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <Play className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                          مشاهدة
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Download Tab */}
            <TabsContent value="download" className="mt-6">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">روابط التحميل</h3>
                  
                  <div className="grid gap-4">
                    {movie.downloadLinks.map((link, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <Download className="w-5 h-5 text-green-400" />
                          <div>
                            <h4 className="text-white font-medium">جودة {link.quality}</h4>
                            <p className="text-gray-400 text-sm">{link.size} • {link.format}</p>
                          </div>
                        </div>
                        <Button className="bg-green-600 hover:bg-green-700">
                          <Download className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                          تحميل
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Screenshots Tab */}
            <TabsContent value="screenshots" className="mt-6">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">صور من الفيلم</h3>
                  
                  {/* Main Screenshot */}
                  <div className="mb-6">
                    <img 
                      src={movie.screenshots[currentScreenshot]}
                      alt={`لقطة ${currentScreenshot + 1}`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>

                  {/* Thumbnails */}
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {movie.screenshots.map((screenshot, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentScreenshot(index)}
                        className={`relative aspect-video rounded overflow-hidden ${
                          currentScreenshot === index ? 'ring-2 ring-blue-500' : ''
                        }`}
                      >
                        <img 
                          src={screenshot}
                          alt={`لقطة ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Movies */}
      <section className="py-8 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6">أفلام مشابهة</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {relatedMovies.map((relatedMovie) => (
              <Link key={relatedMovie.id} href={`/movie/${relatedMovie.id}`}>
                <Card className="group bg-gray-900/30 border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden hover:scale-105">
                  <CardContent className="p-0">
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img 
                        src={relatedMovie.poster}
                        alt={relatedMovie.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 rtl:right-2 rtl:left-auto">
                        <Badge className="bg-black/70 text-yellow-500 border-0 text-xs">
                          <Star className="w-2 h-2 mr-1 rtl:ml-1 rtl:mr-0" />
                          {relatedMovie.rating}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-2">
                      <h3 className="text-white text-sm font-medium line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {relatedMovie.title}
                      </h3>
                      <p className="text-gray-400 text-xs">{relatedMovie.year}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default MovieDetailPage