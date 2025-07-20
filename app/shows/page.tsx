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
  Radio,
  Mic,
  Users,
  Trophy
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

// البيانات المخصصة للبرامج التلفزيونية
const sections = [
  { id: 0, name: 'جميع الأقسام' },
  { id: 29, name: 'عربي' },
  { id: 30, name: 'أجنبي' },
  { id: 31, name: 'أمريكي' },
  { id: 32, name: 'بريطاني' },
  { id: 33, name: 'آسيوي' }
]

const categories = [
  { id: 0, name: 'جميع التصنيفات' },
  { id: 18, name: 'برامج حوارية' },
  { id: 20, name: 'كوميدي' },
  { id: 25, name: 'رياضة' },
  { id: 32, name: 'مصارعة' },
  { id: 28, name: 'وثائقي' },
  { id: 31, name: 'موسيقى' },
  { id: 33, name: 'عائلي' },
  { id: 88, name: 'أطفال' },
  { id: 89, name: 'أخبار' },
  { id: 90, name: 'طبخ' },
  { id: 91, name: 'سفر' },
  { id: 92, name: 'تقني' },
  { id: 93, name: 'تعليمي' },
  { id: 94, name: 'صحة' },
  { id: 95, name: 'ألعاب' }
]

const showTypes = [
  { id: 0, name: 'جميع الأنواع' },
  { id: 1, name: 'برنامج حواري' },
  { id: 2, name: 'تلك شو' },
  { id: 3, name: 'مسابقات' },
  { id: 4, name: 'رياضة' },
  { id: 5, name: 'مصارعة' },
  { id: 6, name: 'أخبار' },
  { id: 7, name: 'وثائقي' },
  { id: 8, name: 'طبخ' },
  { id: 9, name: 'موسيقى' }
]

const languages = [
  { id: 0, name: 'جميع اللغات' },
  { id: 1, name: 'عربي' },
  { id: 2, name: 'إنجليزي' },
  { id: 3, name: 'فرنسي' },
  { id: 4, name: 'إسباني' },
  { id: 5, name: 'ألماني' },
  { id: 6, name: 'إيطالي' }
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
  { id: 4, name: 'SD' }
]

const sortOptions = [
  { id: 'latest', name: 'الأحدث' },
  { id: 'popular', name: 'الأكثر شعبية' },
  { id: 'rating', name: 'الأعلى تقييماً' },
  { id: 'views', name: 'الأكثر مشاهدة' },
  { id: 'episodes', name: 'عدد الحلقات' },
  { id: 'title', name: 'حسب العنوان' },
  { id: 'year', name: 'حسب السنة' }
]

// محاكاة بيانات البرامج التلفزيونية
const mockShows = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  title: `برنامج تلفزيوني ${i + 1}`,
  poster: `/api/placeholder/250/375`,
  backdrop: `/api/placeholder/400/225`,
  rating: (7.5 + Math.random() * 2.5).toFixed(1),
  year: 2024 - Math.floor(Math.random() * 5),
  episodes: Math.floor(Math.random() * 50) + 10,
  duration: `${45 + Math.floor(Math.random() * 30)}م/حلقة`,
  views: `${Math.floor(Math.random() * 500)}K`,
  quality: ['4K', 'FHD', 'HD'][Math.floor(Math.random() * 3)],
  type: showTypes.slice(1)[Math.floor(Math.random() * (showTypes.length - 1))].name,
  host: `مقدم البرنامج ${i + 1}`,
  network: ['MBC', 'الجزيرة', 'العربية', 'دبي', 'أبوظبي'][Math.floor(Math.random() * 5)],
  genres: categories.slice(1, 4).map(c => c.name),
  isNew: Math.random() > 0.7,
  isTrending: Math.random() > 0.8,
  hasAward: Math.random() > 0.9,
  isLive: Math.random() > 0.85
}))

const ShowsPage: React.FC = () => {
  const [shows, setShows] = useState(mockShows)
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  
  // فلاتر البحث
  const [filters, setFilters] = useState({
    search: '',
    section: 0,
    category: 0,
    showType: 0,
    language: 0,
    year: 0,
    quality: 0,
    sort: 'latest'
  })

  // تطبيق الفلاتر
  const applyFilters = () => {
    setLoading(true)
    setTimeout(() => {
      let filtered = [...mockShows]
      
      if (filters.search) {
        filtered = filtered.filter(show => 
          show.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          show.host.toLowerCase().includes(filters.search.toLowerCase())
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
        case 'episodes':
          filtered.sort((a, b) => b.episodes - a.episodes)
          break
        case 'title':
          filtered.sort((a, b) => a.title.localeCompare(b.title, 'ar'))
          break
        default:
          break
      }
      
      setShows(filtered)
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    applyFilters()
  }, [filters])

  return (
    <div className="min-h-screen bg-gray-950 pt-20">
      
      {/* Hero Section للبرامج التلفزيونية */}
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
              <Badge className="bg-orange-600 hover:bg-orange-700 text-white border-0">
                <Radio className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
                تلفزيون
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                {shows.length} برنامج
              </Badge>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              البرامج التلفزيونية
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              تابع أفضل البرامج التلفزيونية والحوارية من أشهر القنوات العالمية
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                <TrendingUp className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                البرامج الرائجة
              </Button>
              <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                <Trophy className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                مسابقات وجوائز
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
                placeholder="البحث في البرامج والمقدمين..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="pl-10 rtl:pr-10 rtl:pl-3 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
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

              <Select value={filters.showType.toString()} onValueChange={(value) => setFilters({ ...filters, showType: parseInt(value) })}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="نوع البرنامج" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {showTypes.map((type) => (
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
                  showType: 0,
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <>
              {/* عرض الشبكة */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                  {shows.map((show) => (
                    <Link key={show.id} href={`/shows/${show.id}`}>
                      <Card className="group bg-gray-900/30 border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden hover:scale-105">
                        <CardContent className="p-0">
                          
                          {/* صورة البوستر */}
                          <div className="relative aspect-[2/3] overflow-hidden">
                            <img 
                              src={show.poster}
                              alt={show.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />

                            {/* التراكبات والشارات */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* شارات المحتوى */}
                            <div className="absolute top-2 right-2 rtl:left-2 rtl:right-auto space-y-1">
                              {show.isNew && (
                                <Badge className="bg-red-600 hover:bg-red-600 text-white border-0 text-xs">
                                  <Zap className="w-2 h-2 mr-1 rtl:ml-1 rtl:mr-0" />
                                  جديد
                                </Badge>
                              )}
                              {show.isTrending && (
                                <Badge className="bg-orange-600 hover:bg-orange-600 text-white border-0 text-xs">
                                  <Flame className="w-2 h-2 mr-1 rtl:ml-1 rtl:mr-0" />
                                  رائج
                                </Badge>
                              )}
                              {show.isLive && (
                                <Badge className="bg-red-500 hover:bg-red-500 text-white border-0 text-xs animate-pulse">
                                  <Radio className="w-2 h-2 mr-1 rtl:ml-1 rtl:mr-0" />
                                  مباشر
                                </Badge>
                              )}
                              {show.hasAward && (
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
                                {show.rating}
                              </Badge>
                            </div>

                            {/* الجودة والقناة */}
                            <div className="absolute bottom-2 left-2 rtl:right-2 rtl:left-auto space-y-1">
                              <Badge variant="secondary" className="bg-white/90 text-gray-900 hover:bg-white text-xs block">
                                {show.quality}
                              </Badge>
                              <Badge className="bg-blue-600 hover:bg-blue-600 text-white border-0 text-xs block">
                                {show.network}
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
                                {show.title}
                              </h3>
                              <div className="flex items-center justify-between text-xs text-gray-300 mb-1">
                                <span>{show.year}</span>
                                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                  <Eye className="w-3 h-3" />
                                  <span>{show.views}</span>
                                </div>
                              </div>
                              <div className="text-xs text-gray-400">
                                {show.host} • {show.episodes} حلقة
                              </div>
                            </div>
                          </div>

                          {/* معلومات المحتوى */}
                          <div className="p-3">
                            <h3 className="font-medium text-white text-sm mb-1 line-clamp-2 group-hover:text-orange-400 transition-colors">
                              {show.title}
                            </h3>
                            <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                              <span>{show.year}</span>
                              <span>{show.episodes} حلقة</span>
                            </div>
                            <div className="text-xs text-gray-500 line-clamp-1">
                              {show.host}
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
                  {shows.map((show) => (
                    <Link key={show.id} href={`/shows/${show.id}`}>
                      <Card className="group bg-gray-900/30 border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex">
                            {/* صورة صغيرة */}
                            <div className="relative w-24 h-36 flex-shrink-0">
                              <img 
                                src={show.poster}
                                alt={show.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            {/* المحتوى */}
                            <div className="flex-1 p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                                    {show.title}
                                  </h3>
                                  
                                  <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-400 mb-2">
                                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                      <Calendar className="w-4 h-4" />
                                      <span>{show.year}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                      <Radio className="w-4 h-4" />
                                      <span>{show.network}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                      <Clock className="w-4 h-4" />
                                      <span>{show.episodes} حلقة</span>
                                    </div>
                                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                      <Eye className="w-4 h-4" />
                                      <span>{show.views}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                                    <Badge className="bg-black/70 text-yellow-500 border-0">
                                      <Star className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
                                      {show.rating}
                                    </Badge>
                                    <Badge className="bg-blue-600 text-white border-0">
                                      {show.type}
                                    </Badge>
                                    <Badge variant="secondary" className="bg-white/90 text-gray-900">
                                      {show.quality}
                                    </Badge>
                                  </div>
                                  
                                  <div className="text-sm text-gray-400">
                                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                      <Mic className="w-4 h-4" />
                                      <span>{show.host}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                                  <Play className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                                  مشاهدة
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

export default ShowsPage