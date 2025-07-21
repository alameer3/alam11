'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ChartBarIcon,
  DocumentChartBarIcon,
  CursorArrowRaysIcon,
  CloudArrowDownIcon,
  EyeIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowPathIcon,
  FunnelIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline'

interface ReportData {
  overview: {
    totalViews: number
    totalDownloads: number
    totalUsers: number
    totalContent: number
    viewsGrowth: number
    downloadsGrowth: number
    usersGrowth: number
    contentGrowth: number
  }
  topContent: {
    id: string
    title: string
    type: 'movie' | 'series'
    views: number
    downloads: number
    rating: number
    growth: number
  }[]
  userAnalytics: {
    activeUsers: number
    newUsers: number
    returningUsers: number
    avgSessionTime: number
    bounceRate: number
    topCountries: {
      country: string
      users: number
      percentage: number
    }[]
  }
  contentPerformance: {
    totalMovies: number
    totalSeries: number
    avgMovieRating: number
    avgSeriesRating: number
    topGenres: {
      genre: string
      count: number
      views: number
    }[]
  }
  systemHealth: {
    uptime: number
    avgResponseTime: number
    errorRate: number
    serverLoad: number
    bandwidthUsage: number
  }
  financialData: {
    adRevenue: number
    subscriptionRevenue: number
    totalRevenue: number
    revenueGrowth: number
    costPerAcquisition: number
    avgRevenuePerUser: number
  }
}

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '3m' | '1y'>('30d')
  const [refreshing, setRefreshing] = useState(false)

  const fetchReportData = async () => {
    try {
      setLoading(true)
      
      // محاكاة البيانات
      const mockData: ReportData = {
        overview: {
          totalViews: 2450000,
          totalDownloads: 185000,
          totalUsers: 45000,
          totalContent: 1250,
          viewsGrowth: 12.5,
          downloadsGrowth: 8.3,
          usersGrowth: 15.7,
          contentGrowth: 5.2
        },
        topContent: [
          {
            id: '1',
            title: 'فيلم الحركة الجديد',
            type: 'movie',
            views: 125000,
            downloads: 45000,
            rating: 8.5,
            growth: 25.3
          },
          {
            id: '2',
            title: 'مسلسل الدراما الشهير',
            type: 'series',
            views: 98000,
            downloads: 32000,
            rating: 9.1,
            growth: 18.7
          },
          {
            id: '3',
            title: 'كوميديا رومانسية',
            type: 'movie',
            views: 76000,
            downloads: 28000,
            rating: 7.8,
            growth: -5.2
          },
          {
            id: '4',
            title: 'مسلسل الإثارة',
            type: 'series',
            views: 65000,
            downloads: 22000,
            rating: 8.3,
            growth: 12.1
          },
          {
            id: '5',
            title: 'فيلم الخيال العلمي',
            type: 'movie',
            views: 54000,
            downloads: 18000,
            rating: 7.2,
            growth: 8.9
          }
        ],
        userAnalytics: {
          activeUsers: 12500,
          newUsers: 2300,
          returningUsers: 10200,
          avgSessionTime: 25.5,
          bounceRate: 32.1,
          topCountries: [
            { country: 'السعودية', users: 15000, percentage: 33.3 },
            { country: 'مصر', users: 12000, percentage: 26.7 },
            { country: 'الإمارات', users: 8000, percentage: 17.8 },
            { country: 'الكويت', users: 5000, percentage: 11.1 },
            { country: 'قطر', users: 3000, percentage: 6.7 },
            { country: 'أخرى', users: 2000, percentage: 4.4 }
          ]
        },
        contentPerformance: {
          totalMovies: 850,
          totalSeries: 400,
          avgMovieRating: 7.8,
          avgSeriesRating: 8.2,
          topGenres: [
            { genre: 'حركة', count: 245, views: 1200000 },
            { genre: 'دراما', count: 198, views: 980000 },
            { genre: 'كوميديا', count: 167, views: 750000 },
            { genre: 'رومانسي', count: 134, views: 620000 },
            { genre: 'إثارة', count: 112, views: 540000 }
          ]
        },
        systemHealth: {
          uptime: 99.8,
          avgResponseTime: 245,
          errorRate: 0.12,
          serverLoad: 67.5,
          bandwidthUsage: 78.2
        },
        financialData: {
          adRevenue: 125000,
          subscriptionRevenue: 85000,
          totalRevenue: 210000,
          revenueGrowth: 14.2,
          costPerAcquisition: 12.5,
          avgRevenuePerUser: 4.67
        }
      }

      // محاكاة تأخير الشبكة
      await new Promise(resolve => setTimeout(resolve, 1500))
      setReportData(mockData)
    } catch (error) {
      // // // console.error('خطأ في جلب بيانات التقارير:', error)
    } finally {
      setLoading(false)
    }
  }

  const refreshData = async () => {
    setRefreshing(true)
    await fetchReportData()
    setRefreshing(false)
  }

  useEffect(() => {
    fetchReportData()
  }, [selectedPeriod])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(amount)
  }

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) {
      return <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
    } else if (growth < 0) {
              return <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />
    }
    return null
  }

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-500'
    if (growth < 0) return 'text-red-500'
    return 'text-gray-500'
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6" dir="rtl">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-700 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-32 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!reportData) {
    return (
      <div className="container mx-auto p-6 text-center" dir="rtl">
        <p className="text-red-500">فشل في تحميل بيانات التقارير</p>
        <Button onClick={fetchReportData} className="mt-4">
          إعادة المحاولة
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <DocumentChartBarIcon className="w-8 h-8 text-blue-500" />
            التقارير والتحليلات
          </h1>
          <p className="text-gray-400 mt-1">
            تحليل شامل لأداء الموقع والمحتوى والمستخدمين
          </p>
        </div>
        
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
          >
            <option value="7d">آخر 7 أيام</option>
            <option value="30d">آخر 30 يوم</option>
            <option value="3m">آخر 3 شهور</option>
            <option value="1y">آخر سنة</option>
          </select>
          
          <Button
            onClick={refreshData}
            disabled={refreshing}
            variant="outline"
            className="border-blue-600 text-blue-400 hover:bg-blue-600"
          >
            <ArrowPathIcon className={`w-4 h-4 ml-2 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'جاري التحديث...' : 'تحديث البيانات'}
          </Button>
          
          <Button className="bg-green-600 hover:bg-green-700">
            <DocumentArrowDownIcon className="w-4 h-4 ml-2" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">إجمالي المشاهدات</p>
                <p className="text-2xl font-bold text-white">{formatNumber(reportData.overview.totalViews)}</p>
                <div className="flex items-center gap-1 mt-1">
                  {getGrowthIcon(reportData.overview.viewsGrowth)}
                  <span className={`text-sm ${getGrowthColor(reportData.overview.viewsGrowth)}`}>
                    {Math.abs(reportData.overview.viewsGrowth)}%
                  </span>
                </div>
              </div>
              <EyeIcon className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">إجمالي التحميلات</p>
                <p className="text-2xl font-bold text-white">{formatNumber(reportData.overview.totalDownloads)}</p>
                <div className="flex items-center gap-1 mt-1">
                  {getGrowthIcon(reportData.overview.downloadsGrowth)}
                  <span className={`text-sm ${getGrowthColor(reportData.overview.downloadsGrowth)}`}>
                    {Math.abs(reportData.overview.downloadsGrowth)}%
                  </span>
                </div>
              </div>
              <CloudArrowDownIcon className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">إجمالي المستخدمين</p>
                <p className="text-2xl font-bold text-white">{formatNumber(reportData.overview.totalUsers)}</p>
                <div className="flex items-center gap-1 mt-1">
                  {getGrowthIcon(reportData.overview.usersGrowth)}
                  <span className={`text-sm ${getGrowthColor(reportData.overview.usersGrowth)}`}>
                    {Math.abs(reportData.overview.usersGrowth)}%
                  </span>
                </div>
              </div>
              <UserGroupIcon className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">إجمالي المحتوى</p>
                <p className="text-2xl font-bold text-white">{reportData.overview.totalContent}</p>
                <div className="flex items-center gap-1 mt-1">
                  {getGrowthIcon(reportData.overview.contentGrowth)}
                  <span className={`text-sm ${getGrowthColor(reportData.overview.contentGrowth)}`}>
                    {Math.abs(reportData.overview.contentGrowth)}%
                  </span>
                </div>
              </div>
              <ChartBarIcon className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Content */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ArrowTrendingUpIcon className="w-5 h-5 text-green-500" />
              أفضل المحتوى أداءً
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.topContent.map((content, index) => (
                <div key={content.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{content.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {content.type === 'movie' ? 'فيلم' : 'مسلسل'}
                        </Badge>
                        <span className="text-xs text-gray-400">
                          تقييم: {content.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-white font-medium">
                      {formatNumber(content.views)} مشاهدة
                    </div>
                    <div className="text-gray-400 text-sm">
                      {formatNumber(content.downloads)} تحميل
                    </div>
                    <div className={`text-sm flex items-center gap-1 ${getGrowthColor(content.growth)}`}>
                      {getGrowthIcon(content.growth)}
                      {Math.abs(content.growth)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Analytics */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <UserGroupIcon className="w-5 h-5 text-purple-500" />
              تحليل المستخدمين
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-gray-400 text-sm">المستخدمون النشطون</p>
                  <p className="text-xl font-bold text-white">{formatNumber(reportData.userAnalytics.activeUsers)}</p>
                </div>
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-gray-400 text-sm">مستخدمون جدد</p>
                  <p className="text-xl font-bold text-green-400">{formatNumber(reportData.userAnalytics.newUsers)}</p>
                </div>
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-gray-400 text-sm">متوسط وقت الجلسة</p>
                  <p className="text-xl font-bold text-blue-400">{reportData.userAnalytics.avgSessionTime}د</p>
                </div>
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-gray-400 text-sm">معدل الارتداد</p>
                  <p className="text-xl font-bold text-yellow-400">{reportData.userAnalytics.bounceRate}%</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-medium mb-3">أفضل البلدان</h4>
                <div className="space-y-2">
                  {reportData.userAnalytics.topCountries.map((country, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-300">{country.country}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white">{formatNumber(country.users)}</span>
                        <div className="w-16 bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${country.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-gray-400 text-sm w-10">{country.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Performance */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ChartBarIcon className="w-5 h-5 text-orange-500" />
              أداء المحتوى
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-700/50 p-3 rounded-lg text-center">
                  <p className="text-gray-400 text-sm">الأفلام</p>
                  <p className="text-xl font-bold text-blue-400">{reportData.contentPerformance.totalMovies}</p>
                  <p className="text-xs text-gray-500">متوسط: {reportData.contentPerformance.avgMovieRating}</p>
                </div>
                <div className="bg-gray-700/50 p-3 rounded-lg text-center">
                  <p className="text-gray-400 text-sm">المسلسلات</p>
                  <p className="text-xl font-bold text-purple-400">{reportData.contentPerformance.totalSeries}</p>
                  <p className="text-xs text-gray-500">متوسط: {reportData.contentPerformance.avgSeriesRating}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-medium mb-3">أفضل التصنيفات</h4>
                <div className="space-y-2">
                  {reportData.contentPerformance.topGenres.map((genre, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-300">{genre.genre}</span>
                      <div className="text-right">
                        <div className="text-white text-sm">{genre.count} عنصر</div>
                        <div className="text-gray-400 text-xs">{formatNumber(genre.views)} مشاهدة</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CursorArrowRaysIcon className="w-5 h-5 text-green-500" />
              صحة النظام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">وقت التشغيل</span>
                <span className="text-green-400 font-bold">{reportData.systemHealth.uptime}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">متوسط الاستجابة</span>
                <span className="text-blue-400 font-bold">{reportData.systemHealth.avgResponseTime}ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">معدل الأخطاء</span>
                <span className="text-yellow-400 font-bold">{reportData.systemHealth.errorRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">حمل الخادم</span>
                <span className="text-orange-400 font-bold">{reportData.systemHealth.serverLoad}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">استخدام النطاق</span>
                <span className="text-purple-400 font-bold">{reportData.systemHealth.bandwidthUsage}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Data */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CalendarDaysIcon className="w-5 h-5 text-yellow-500" />
              البيانات المالية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-700/50 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">إجمالي الإيرادات</p>
                <p className="text-2xl font-bold text-green-400">{formatCurrency(reportData.financialData.totalRevenue)}</p>
                <div className="flex items-center gap-1 mt-1">
                  {getGrowthIcon(reportData.financialData.revenueGrowth)}
                  <span className={`text-sm ${getGrowthColor(reportData.financialData.revenueGrowth)}`}>
                    {Math.abs(reportData.financialData.revenueGrowth)}%
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">إيرادات الإعلانات</span>
                  <span className="text-white">{formatCurrency(reportData.financialData.adRevenue)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">إيرادات الاشتراكات</span>
                  <span className="text-white">{formatCurrency(reportData.financialData.subscriptionRevenue)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">تكلفة الاكتساب</span>
                  <span className="text-orange-400">{formatCurrency(reportData.financialData.costPerAcquisition)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">متوسط الإيراد/مستخدم</span>
                  <span className="text-blue-400">{formatCurrency(reportData.financialData.avgRevenuePerUser)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}