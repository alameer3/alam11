import React from 'react'
import Link from 'next/link'
import { 
  TrendingUp, 
  Star, 
  Play, 
  Clock, 
  Calendar,
  Eye,
  Filter,
  Grid,
  List,
  ChevronDown,
  Flame,
  Award,
  Zap
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// محاكاة البيانات المتطورة
const heroTrending = {
  id: 1,
  title: "المحتوى الأكثر شعبية هذا الأسبوع",
  description: "فيلم/مسلسل حقق أعلى نسب مشاهدة ومشاركة",
  backdrop: "/api/placeholder/1200/600",
  poster: "/api/placeholder/300/450",
  rating: 9.2,
  year: 2024,
  duration: "2h 30m",
  views: "2.5M",
  type: "فيلم"
}

const categories = [
  { id: 'all', name: 'الكل', icon: <Grid className="w-4 h-4" /> },
  { id: 'trending', name: 'الأكثر مشاهدة', icon: <Flame className="w-4 h-4" /> },
  { id: 'top-rated', name: 'الأعلى تقييماً', icon: <Star className="w-4 h-4" /> },
  { id: 'latest', name: 'الأحدث', icon: <Zap className="w-4 h-4" /> },
  { id: 'award-winning', name: 'الحائزة على جوائز', icon: <Award className="w-4 h-4" /> }
]

const contentTabs = [
  { value: 'all', label: 'جميع المحتويات', count: 1234 },
  { value: 'movies', label: 'الأفلام', count: 856 },
  { value: 'series', label: 'المسلسلات', count: 378 }
]

const trendingContent = [
  {
    id: 1,
    title: "المحتوى المتداول 1",
    poster: "/api/placeholder/250/375",
    backdrop: "/api/placeholder/400/225",
    rating: 8.9,
    year: 2024,
    type: "فيلم",
    duration: "2h 15m",
    views: "1.2M",
    trending: true,
    award: false,
    description: "وصف مختصر للمحتوى المعروض"
  },
  {
    id: 2,
    title: "المحتوى المتداول 2",
    poster: "/api/placeholder/250/375", 
    backdrop: "/api/placeholder/400/225",
    rating: 9.1,
    year: 2024,
    type: "مسلسل",
    episodes: 12,
    views: "890K",
    trending: true,
    award: true,
    description: "وصف مختصر للمحتوى المعروض"
  },
  {
    id: 3,
    title: "المحتوى المتداول 3",
    poster: "/api/placeholder/250/375",
    backdrop: "/api/placeholder/400/225", 
    rating: 8.7,
    year: 2023,
    type: "فيلم",
    duration: "1h 58m",
    views: "2.1M",
    trending: false,
    award: true,
    description: "وصف مختصر للمحتوى المعروض"
  },
  {
    id: 4,
    title: "المحتوى المتداول 4",
    poster: "/api/placeholder/250/375",
    backdrop: "/api/placeholder/400/225",
    rating: 8.5,
    year: 2024,
    type: "مسلسل", 
    episodes: 8,
    views: "654K",
    trending: true,
    award: false,
    description: "وصف مختصر للمحتوى المعروض"
  },
  {
    id: 5,
    title: "المحتوى المتداول 5",
    poster: "/api/placeholder/250/375",
    backdrop: "/api/placeholder/400/225",
    rating: 9.3,
    year: 2024,
    type: "فيلم",
    duration: "2h 45m", 
    views: "3.2M",
    trending: true,
    award: true,
    description: "وصف مختصر للمحتوى المعروض"
  },
  {
    id: 6,
    title: "المحتوى المتداول 6",
    poster: "/api/placeholder/250/375",
    backdrop: "/api/placeholder/400/225",
    rating: 8.8,
    year: 2023,
    type: "مسلسل",
    episodes: 16,
    views: "1.8M",
    trending: false,
    award: false,
    description: "وصف مختصر للمحتوى المعروض"
  }
]

const OnesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 pt-20">
      
      {/* Hero Section للمحتوى الرائج */}
      <section className="relative h-96 lg:h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroTrending.backdrop})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            
            {/* شارات المحتوى */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
              <Badge className="bg-red-600 hover:bg-red-700 text-white border-0">
                <Flame className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
                الأكثر شعبية
              </Badge>
              <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                <Eye className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
                {heroTrending.views} مشاهدة
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                {heroTrending.type}
              </Badge>
            </div>

            {/* العنوان والوصف */}
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              الرئيسية
            </h1>
            <h2 className="text-2xl lg:text-3xl text-gray-300 mb-4">
              {heroTrending.title}
            </h2>
            <p className="text-lg text-gray-400 mb-6 max-w-2xl">
              {heroTrending.description}
            </p>

            {/* معلومات سريعة */}
            <div className="flex items-center space-x-6 rtl:space-x-reverse text-sm text-gray-300 mb-8">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-bold text-white">{heroTrending.rating}</span>
              </div>
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <Calendar className="w-4 h-4" />
                <span>{heroTrending.year}</span>
              </div>
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <Clock className="w-4 h-4" />
                <span>{heroTrending.duration}</span>
              </div>
            </div>

            {/* أزرار الإجراء */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Play className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                شاهد الآن
              </Button>
              <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                <TrendingUp className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                المزيد من التفاصيل
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* قسم الفلاتر والتصنيفات */}
      <section className="py-8 bg-gray-900/50 border-b border-gray-800">
        <div className="container mx-auto px-4">
          
          {/* رأس القسم */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">المحتوى المختار</h2>
              <p className="text-gray-400">أفضل المحتويات المختارة بعناية لك</p>
            </div>
            
            {/* أدوات التحكم */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Select defaultValue="latest">
                <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="latest">الأحدث</SelectItem>
                  <SelectItem value="popular">الأكثر شعبية</SelectItem>
                  <SelectItem value="top-rated">الأعلى تقييماً</SelectItem>
                  <SelectItem value="trending">الأكثر مشاهدة</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon" className="border-gray-700 text-gray-400 hover:text-white">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* التصنيفات السريعة */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={category.id === 'all' ? 'default' : 'outline'}
                className={category.id === 'all' 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800'
                }
              >
                {category.icon}
                <span className="mr-2 rtl:ml-2 rtl:mr-0">{category.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* قسم المحتوى الرئيسي */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          
          {/* تبويب المحتوى */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-gray-800 border-gray-700">
              {contentTabs.map((tab) => (
                <TabsTrigger 
                  key={tab.value} 
                  value={tab.value}
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-400"
                >
                  {tab.label}
                  <Badge variant="secondary" className="mr-2 rtl:ml-2 rtl:mr-0 text-xs">
                    {tab.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* محتوى التبويبات */}
            {contentTabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="mt-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                  {trendingContent.map((item) => (
                    <Link key={item.id} href={`/movie/${item.id}`}>
                      <Card className="group bg-gray-900/30 border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden hover:scale-105">
                        <CardContent className="p-0">
                          
                          {/* صورة البوستر */}
                          <div className="relative aspect-[2/3] overflow-hidden">
                            <img 
                              src={item.poster}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />

                            {/* التراكبات */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* شارات المحتوى */}
                            <div className="absolute top-2 right-2 rtl:left-2 rtl:right-auto space-y-1">
                              {item.trending && (
                                <Badge className="bg-red-600 hover:bg-red-600 text-white border-0 text-xs">
                                  <Flame className="w-2 h-2 mr-1 rtl:ml-1 rtl:mr-0" />
                                  رائج
                                </Badge>
                              )}
                              {item.award && (
                                <Badge className="bg-yellow-600 hover:bg-yellow-600 text-white border-0 text-xs">
                                  <Award className="w-2 h-2 mr-1 rtl:ml-1 rtl:mr-0" />
                                  جائزة
                                </Badge>
                              )}
                            </div>

                            {/* تقييم */}
                            <div className="absolute top-2 left-2 rtl:right-2 rtl:left-auto">
                              <Badge className="bg-black/70 hover:bg-black/70 text-yellow-500 border-0 text-xs">
                                <Star className="w-2 h-2 mr-1 rtl:ml-1 rtl:mr-0" />
                                {item.rating}
                              </Badge>
                            </div>

                            {/* نوع المحتوى */}
                            <div className="absolute bottom-2 left-2 rtl:right-2 rtl:left-auto">
                              <Badge variant="secondary" className="bg-white/90 text-gray-900 hover:bg-white text-xs">
                                {item.type}
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
                                {item.title}
                              </h3>
                              <div className="flex items-center justify-between text-xs text-gray-300">
                                <span>{item.year}</span>
                                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                  <Eye className="w-3 h-3" />
                                  <span>{item.views}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* معلومات المحتوى المبسطة */}
                          <div className="p-3">
                            <h3 className="font-medium text-white text-sm mb-1 line-clamp-2 group-hover:text-blue-400 transition-colors">
                              {item.title}
                            </h3>
                            <div className="flex items-center justify-between text-xs text-gray-400">
                              <span>{item.year}</span>
                              <span className="flex items-center space-x-1 rtl:space-x-reverse">
                                {item.duration && (
                                  <>
                                    <Clock className="w-3 h-3" />
                                    <span>{item.duration}</span>
                                  </>
                                )}
                                {item.episodes && (
                                  <>
                                    <span>{item.episodes} حلقة</span>
                                  </>
                                )}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

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
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

    </div>
  )
}

export default OnesPage