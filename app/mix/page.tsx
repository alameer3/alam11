'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Play, 
  Star, 
  Calendar, 
  Clock,
  Eye,
  Filter,
  Grid,
  List,
  ChevronDown,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Flame,
  Award,
  Zap,
  TrendingUp,
  Sparkles,
  Music,
  GamepadIcon,
  Book,
  Palette,
  Gift
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

// البيانات المخصصة للمنوعات
const sections = [
  { id: 0, name: 'جميع الأقسام' },
  { id: 29, name: 'عربي' },
  { id: 30, name: 'أجنبي' },
  { id: 31, name: 'محلي' },
  { id: 32, name: 'عالمي' }
]

const categories = [
  { id: 0, name: 'جميع التصنيفات' },
  { id: 18, name: 'موسيقى' },
  { id: 20, name: 'ألعاب' },
  { id: 21, name: 'تطبيقات' },
  { id: 22, name: 'كتب صوتية' },
  { id: 23, name: 'بودكاست' },
  { id: 24, name: 'أغاني' },
  { id: 25, name: 'حفلات' },
  { id: 26, name: 'مقاطع قصيرة' },
  { id: 27, name: 'فيديوهات موسيقية' },
  { id: 28, name: 'ألبومات' },
  { id: 29, name: 'مسرحيات' },
  { id: 30, name: 'عروض' },
  { id: 31, name: 'تجارب' },
  { id: 32, name: 'تقييمات' },
  { id: 33, name: 'دروس' }
]

const contentTypes = [
  { id: 0, name: 'جميع الأنواع' },
  { id: 1, name: 'أغنية' },
  { id: 2, name: 'ألبوم' },
  { id: 3, name: 'حفلة' },
  { id: 4, name: 'لعبة' },
  { id: 5, name: 'تطبيق' },
  { id: 6, name: 'كتاب صوتي' },
  { id: 7, name: 'بودكاست' },
  { id: 8, name: 'مسرحية' },
  { id: 9, name: 'عرض' }
]

const languages = [
  { id: 0, name: 'جميع اللغات' },
  { id: 1, name: 'عربي' },
  { id: 2, name: 'إنجليزي' },
  { id: 3, name: 'فرنسي' },
  { id: 4, name: 'إسباني' },
  { id: 5, name: 'إيطالي' },
  { id: 6, name: 'ألماني' }
]

const years = Array.from({ length: 25 }, (_, i) => {
  const year = 2024 - i
  return { id: year, name: year.toString() }
})

const qualities = [
  { id: 0, name: 'جميع الجودات' },
  { id: 1, name: '4K' },
  { id: 2, name: 'FHD' },
  { id: 3, name: 'HD' },
  { id: 4, name: 'SD' },
  { id: 5, name: 'HQ Audio' },
  { id: 6, name: 'MP3' }
]

const sortOptions = [
  { id: 'latest', name: 'الأحدث' },
  { id: 'popular', name: 'الأكثر شعبية' },
  { id: 'rating', name: 'الأعلى تقييماً' },
  { id: 'views', name: 'الأكثر مشاهدة' },
  { id: 'duration', name: 'المدة' },
  { id: 'title', name: 'حسب العنوان' },
  { id: 'year', name: 'حسب السنة' }
]

// محاكاة بيانات المنوعات
const mockMixContent = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  title: `محتوى منوع ${i + 1}`,
  poster: `/api/placeholder/250/375`,
  backdrop: `/api/placeholder/400/225`,
  rating: (7.0 + Math.random() * 3).toFixed(1),
  year: 2024 - Math.floor(Math.random() * 5),
  duration: `${3 + Math.floor(Math.random() * 120)}دقيقة`,
  views: `${Math.floor(Math.random() * 200)}K`,
  quality: ['4K', 'FHD', 'HD', 'HQ Audio', 'MP3'][Math.floor(Math.random() * 5)],
  type: contentTypes.slice(1)[Math.floor(Math.random() * (contentTypes.length - 1))].name,
  artist: `فنان/منشئ ${i + 1}`,
  size: `${50 + Math.floor(Math.random() * 500)}MB`,
  format: ['MP4', 'MP3', 'AAC', 'FLAC', 'WAV'][Math.floor(Math.random() * 5)],
  genres: categories.slice(1, 4).map(c => c.name),
  isNew: Math.random() > 0.7,
  isTrending: Math.random() > 0.8,
  hasAward: Math.random() > 0.9,
  isExclusive: Math.random() > 0.85,
  downloadCount: Math.floor(Math.random() * 50000) + 1000
}))

const MixPage: React.FC = () => {
  const [mixContent, setMixContent] = useState(mockMixContent)
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  
  // فلاتر البحث
  const [filters, setFilters] = useState({
    search: '',
    section: 0,
    category: 0,
    contentType: 0,
    language: 0,
    year: 0,
    quality: 0,
    sort: 'latest'
  })

  // تطبيق الفلاتر
  const applyFilters = () => {
    setLoading(true)
    setTimeout(() => {
      let filtered = [...mockMixContent]
      
      if (filters.search) {
        filtered = filtered.filter(content => 
          content.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          content.artist.toLowerCase().includes(filters.search.toLowerCase())
        )
      }
      
      // ترتيب النتائج
      switch (filters.sort) {
        case 'rating':
          filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
          break
        case 'year':
          filtered.sort((a, b) => b.year - a.year)
          break
        case 'popular':
          filtered.sort((a, b) => parseInt(b.views) - parseInt(a.views))
          break
        case 'duration':
          filtered.sort((a, b) => parseInt(b.duration) - parseInt(a.duration))
          break
        case 'title':
          filtered.sort((a, b) => a.title.localeCompare(b.title, 'ar'))
          break
        default:
          break
      }
      
      setMixContent(filtered)
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    applyFilters()
  }, [filters])

  return (
    <div className="min-h-screen bg-gray-950 pt-20">
      
      {/* Hero Section للمنوعات */}
      <section className="relative h-80 lg:h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/api/placeholder/1200/600)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <Badge className="bg-pink-600 hover:bg-pink-700 text-white border-0">
                <Sparkles className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
                منوعات
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                {mixContent.length} عنصر
              </Badge>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              عالم المنوعات
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              اكتشف مجموعة متنوعة من المحتوى الترفيهي والتعليمي والفني
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
                <TrendingUp className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                المحتوى الرائج
              </Button>
              <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                <Gift className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                المحتوى الحصري
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* شريط الفلاتر والبحث */}
      <section className="py-6 bg-gray-900/50 border-b border-gray-800 sticky top-20 z-40">
        <div className="container mx-auto px-4">
          
          {/* شريط البحث والأدوات الرئيسية */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            
            {/* البحث */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="البحث في المحتوى والفنانين..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="pl-10 rtl:pr-10 rtl:pl-3 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-pink-500"
              />
            </div>

            {/* أدوات التحكم */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              
              {/* الترتيب */}
              <Select value={filters.sort} onValueChange={(value) => setFilters({ ...filters, sort: value })}>
                <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
                  <ArrowUpDown className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {sortOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* عرض الفلاتر */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className="border-gray-700 text-gray-400 hover:text-white"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </Button>

              {/* تغيير العرض */}
              <div className="flex border border-gray-700 rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none border-r border-gray-700"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* الفلاتر المتقدمة */}
          {showFilters && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              
              <Select value={filters.section.toString()} onValueChange={(value) => setFilters({ ...filters, section: parseInt(value) })}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="القسم" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {sections.map((section) => (
                    <SelectItem key={section.id} value={section.id.toString()}>
                      {section.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.category.toString()} onValueChange={(value) => setFilters({ ...filters, category: parseInt(value) })}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="التصنيف" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.contentType.toString()} onValueChange={(value) => setFilters({ ...filters, contentType: parseInt(value) })}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="نوع المحتوى" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {contentTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id.toString()}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.language.toString()} onValueChange={(value) => setFilters({ ...filters, language: parseInt(value) })}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="اللغة" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {languages.map((language) => (
                    <SelectItem key={language.id} value={language.id.toString()}>
                      {language.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.year.toString()} onValueChange={(value) => setFilters({ ...filters, year: parseInt(value) })}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="السنة" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="0">جميع السنوات</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year.id} value={year.id.toString()}>
                      {year.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.quality.toString()} onValueChange={(value) => setFilters({ ...filters, quality: parseInt(value) })}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="الجودة" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {qualities.map((quality) => (
                    <SelectItem key={quality.id} value={quality.id.toString()}>
                      {quality.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                onClick={() => setFilters({
                  search: '',
                  section: 0,
                  category: 0,
                  contentType: 0,
                  language: 0,
                  year: 0,
                  quality: 0,
                  sort: 'latest'
                })}
                variant="outline"
                className="border-gray-700 text-gray-400 hover:text-white"
              >
                مسح الفلاتر
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* المحتوى الرئيسي */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
          ) : (
            <>
              {/* عرض الشبكة */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                  {mixContent.map((content) => (
                    <Link key={content.id} href={`/mix/${content.id}`}>
                      <Card className="group bg-gray-900/30 border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden hover:scale-105">
                        <CardContent className="p-0">
                          
                          {/* صورة البوستر */}
                          <div className="relative aspect-[2/3] overflow-hidden">
                            <img 
                              src={content.poster}
                              alt={content.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />

                            {/* التراكبات والشارات */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* شارات المحتوى */}
                            <div className="absolute top-2 right-2 rtl:left-2 rtl:right-auto space-y-1">
                              {content.isNew && (
                                <Badge className="bg-red-600 hover:bg-red-600 text-white border-0 text-xs">
                                  <Zap className="w-2 h-2 mr-1 rtl:ml-1 rtl:mr-0" />
                                  جديد
                                </Badge>
                              )}
                              {content.isTrending && (
                                <Badge className="bg-pink-600 hover:bg-pink-600 text-white border-0 text-xs">
                                  <Flame className="w-2 h-2 mr-1 rtl:ml-1 rtl:mr-0" />
                                  رائج
                                </Badge>
                              )}
                              {content.isExclusive && (
                                <Badge className="bg-purple-600 hover:bg-purple-600 text-white border-0 text-xs">
                                  <Gift className="w-2 h-2 mr-1 rtl:ml-1 rtl:mr-0" />
                                  حصري
                                </Badge>
                              )}
                              {content.hasAward && (
                                <Badge className="bg-yellow-600 hover:bg-yellow-600 text-white border-0 text-xs">
                                  <Award className="w-2 h-2 mr-1 rtl:ml-1 rtl:mr-0" />
                                  جائزة
                                </Badge>
                              )}
                            </div>

                            {/* التقييم */}
                            <div className="absolute top-2 left-2 rtl:right-2 rtl:left-auto">
                              <Badge className="bg-black/70 hover:bg-black/70 text-yellow-500 border-0 text-xs">
                                <Star className="w-2 h-2 mr-1 rtl:ml-1 rtl:mr-0" />
                                {content.rating}
                              </Badge>
                            </div>

                            {/* الجودة والحجم */}
                            <div className="absolute bottom-2 left-2 rtl:right-2 rtl:left-auto space-y-1">
                              <Badge variant="secondary" className="bg-white/90 text-gray-900 hover:bg-white text-xs block">
                                {content.quality}
                              </Badge>
                              <Badge className="bg-gray-600 hover:bg-gray-600 text-white border-0 text-xs block">
                                {content.size}
                              </Badge>
                            </div>

                            {/* زر التشغيل */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                                <Play className="w-6 h-6 text-white" />
                              </div>
                            </div>

                            {/* معلومات إضافية عند التفاعل */}
                            <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                              <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                                {content.title}
                              </h3>
                              <div className="flex items-center justify-between text-xs text-gray-300 mb-1">
                                <span>{content.year}</span>
                                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                  <Eye className="w-3 h-3" />
                                  <span>{content.views}</span>
                                </div>
                              </div>
                              <div className="text-xs text-gray-400">
                                {content.artist} • {content.duration}
                              </div>
                            </div>
                          </div>

                          {/* معلومات المحتوى */}
                          <div className="p-3">
                            <h3 className="font-medium text-white text-sm mb-1 line-clamp-2 group-hover:text-pink-400 transition-colors">
                              {content.title}
                            </h3>
                            <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                              <span>{content.year}</span>
                              <span>{content.duration}</span>
                            </div>
                            <div className="text-xs text-gray-500 line-clamp-1">
                              {content.artist}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}

              {/* عرض القائمة */}
              {viewMode === 'list' && (
                <div className="space-y-4">
                  {mixContent.map((content) => (
                    <Link key={content.id} href={`/mix/${content.id}`}>
                      <Card className="group bg-gray-900/30 border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex">
                            {/* صورة صغيرة */}
                            <div className="relative w-24 h-36 flex-shrink-0">
                              <img 
                                src={content.poster}
                                alt={content.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            {/* المحتوى */}
                            <div className="flex-1 p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-pink-400 transition-colors">
                                    {content.title}
                                  </h3>
                                  
                                  <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-400 mb-2">
                                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                      <Calendar className="w-4 h-4" />
                                      <span>{content.year}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                      <Clock className="w-4 h-4" />
                                      <span>{content.duration}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                      <Eye className="w-4 h-4" />
                                      <span>{content.views}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                                    <Badge className="bg-black/70 text-yellow-500 border-0">
                                      <Star className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
                                      {content.rating}
                                    </Badge>
                                    <Badge className="bg-pink-600 text-white border-0">
                                      {content.type}
                                    </Badge>
                                    <Badge variant="secondary" className="bg-white/90 text-gray-900">
                                      {content.quality}
                                    </Badge>
                                  </div>
                                  
                                  <div className="text-sm text-gray-400">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                        <Palette className="w-4 h-4" />
                                        <span>{content.artist}</span>
                                      </div>
                                      <span className="text-xs">{content.size} • {content.format}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
                                  <Play className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                                  تشغيل
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}

              {/* زر تحميل المزيد */}
              <div className="text-center mt-12">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-gray-700 text-white hover:bg-gray-800"
                >
                  تحميل المزيد
                  <ChevronDown className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default MixPage