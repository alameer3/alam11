'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ChartBarIcon,
  FilmIcon,
  TvIcon,
  UserGroupIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  CloudArrowDownIcon,
  CursorArrowRaysIcon,
  CalendarDaysIcon,
  ArrowTrendingUpIcon,
  PlusIcon
} from '@heroicons/react/24/outline'

interface Stats {
  movies: {
    total: number
    featured: number
    trending: number
    active: number
    totalViews: number
    totalDownloads: number
  }
  series: {
    total: number
    featured: number
    trending: number
    active: number
    totalViews: number
    totalSeasons: number
    totalEpisodes: number
  }
  users: {
    total: number
    active: number
    verified: number
    admins: number
    moderators: number
    newThisMonth: number
  }
  content: {
    totalRatings: number
    totalComments: number
    totalFavorites: number
    averageRating: number
    totalCategories: number
    totalPeople: number
  }
  activity: {
    todayViews: number
    todayDownloads: number
    todayComments: number
    todayRatings: number
    todayRegistrations: number
  }
}

interface RecentActivity {
  id: number
  type: 'view' | 'rating' | 'comment' | 'favorite' | 'registration'
  user: string
  content?: string
  timestamp: string
  rating?: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      // console.error('خطأ في جلب الإحصائيات:', error)
    }
  }

  const fetchRecentActivity = async () => {
    try {
      const response = await fetch('/api/admin/activity?limit=20')
      if (response.ok) {
        const data = await response.json()
        setRecentActivity(data)
      }
    } catch (error) {
      // console.error('خطأ في جلب النشاطات الحديثة:', error)
    }
  }

  useEffect(() => {
    Promise.all([fetchStats(), fetchRecentActivity()]).finally(() => {
      setLoading(false)
    })
  }, [])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ar-SA').format(num)
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'view':
        return <EyeIcon className="w-4 h-4 text-blue-500" />
      case 'rating':
        return <StarIcon className="w-4 h-4 text-yellow-500" />
      case 'comment':
        return <ChatBubbleLeftRightIcon className="w-4 h-4 text-green-500" />
      case 'favorite':
        return <HeartIcon className="w-4 h-4 text-red-500" />
      case 'registration':
        return <UserGroupIcon className="w-4 h-4 text-purple-500" />
      default:
        return <CursorArrowRaysIcon className="w-4 h-4 text-gray-500" />
    }
  }

  const getActivityText = (activity: RecentActivity) => {
    switch (activity.type) {
      case 'view':
        return `شاهد ${activity.content}`
      case 'rating':
        return `قيّم ${activity.content} بـ ${activity.rating} نجوم`
      case 'comment':
        return `علّق على ${activity.content}`
      case 'favorite':
        return `أضاف ${activity.content} للمفضلة`
      case 'registration':
        return 'انضم للموقع'
      default:
        return 'نشاط غير معروف'
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6" dir="rtl">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">جاري التحميل...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <ChartBarIcon className="w-8 h-8 text-blue-500" />
            لوحة التحكم
          </h1>
          <p className="text-gray-400 mt-1">
            نظرة عامة على أداء الموقع والإحصائيات
          </p>
        </div>
        
        <div className="flex gap-2">
          <Link href="/admin/movies/create">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <PlusIcon className="w-4 h-4 ml-2" />
              إضافة فيلم
            </Button>
          </Link>
          <Link href="/admin/series/create">
            <Button variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600">
              <PlusIcon className="w-4 h-4 ml-2" />
              إضافة مسلسل
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Movies Stats */}
        <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-700/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">الأفلام</CardTitle>
            <FilmIcon className="w-5 h-5 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatNumber(stats?.movies.total || 0)}</div>
            <div className="space-y-1 mt-2">
              <div className="flex justify-between text-xs">
                <span className="text-blue-200">مميز</span>
                <span className="text-white">{formatNumber(stats?.movies.featured || 0)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-blue-200">رائج</span>
                <span className="text-white">{formatNumber(stats?.movies.trending || 0)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-blue-200">المشاهدات</span>
                <span className="text-white">{formatNumber(stats?.movies.totalViews || 0)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Series Stats */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-700/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-100">المسلسلات</CardTitle>
            <TvIcon className="w-5 h-5 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatNumber(stats?.series.total || 0)}</div>
            <div className="space-y-1 mt-2">
              <div className="flex justify-between text-xs">
                <span className="text-purple-200">المواسم</span>
                <span className="text-white">{formatNumber(stats?.series.totalSeasons || 0)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-purple-200">الحلقات</span>
                <span className="text-white">{formatNumber(stats?.series.totalEpisodes || 0)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-purple-200">المشاهدات</span>
                <span className="text-white">{formatNumber(stats?.series.totalViews || 0)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Stats */}
        <Card className="bg-gradient-to-br from-green-900/50 to-green-800/30 border-green-700/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-100">المستخدمين</CardTitle>
            <UserGroupIcon className="w-5 h-5 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatNumber(stats?.users.total || 0)}</div>
            <div className="space-y-1 mt-2">
              <div className="flex justify-between text-xs">
                <span className="text-green-200">نشط</span>
                <span className="text-white">{formatNumber(stats?.users.active || 0)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-green-200">موثق</span>
                <span className="text-white">{formatNumber(stats?.users.verified || 0)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-green-200">جديد هذا الشهر</span>
                <span className="text-white">{formatNumber(stats?.users.newThisMonth || 0)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Stats */}
        <Card className="bg-gradient-to-br from-orange-900/50 to-orange-800/30 border-orange-700/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-100">التفاعل</CardTitle>
                            <ArrowTrendingUpIcon className="w-5 h-5 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatNumber(stats?.content.totalRatings || 0)}</div>
            <div className="space-y-1 mt-2">
              <div className="flex justify-between text-xs">
                <span className="text-orange-200">التعليقات</span>
                <span className="text-white">{formatNumber(stats?.content.totalComments || 0)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-orange-200">المفضلة</span>
                <span className="text-white">{formatNumber(stats?.content.totalFavorites || 0)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-orange-200">متوسط التقييم</span>
                <span className="text-white">{(stats?.content.averageRating || 0).toFixed(1)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Activity */}
      <Card className="mb-8 bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CalendarDaysIcon className="w-5 h-5 text-blue-500" />
            نشاط اليوم
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600/20 rounded-full mx-auto mb-2">
                <EyeIcon className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">{formatNumber(stats?.activity.todayViews || 0)}</div>
              <div className="text-sm text-gray-400">مشاهدة</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-600/20 rounded-full mx-auto mb-2">
                <CloudArrowDownIcon className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white">{formatNumber(stats?.activity.todayDownloads || 0)}</div>
              <div className="text-sm text-gray-400">تحميل</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-600/20 rounded-full mx-auto mb-2">
                <StarIcon className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="text-2xl font-bold text-white">{formatNumber(stats?.activity.todayRatings || 0)}</div>
              <div className="text-sm text-gray-400">تقييم</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-600/20 rounded-full mx-auto mb-2">
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">{formatNumber(stats?.activity.todayComments || 0)}</div>
              <div className="text-sm text-gray-400">تعليق</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-pink-600/20 rounded-full mx-auto mb-2">
                <UserGroupIcon className="w-6 h-6 text-pink-400" />
              </div>
              <div className="text-2xl font-bold text-white">{formatNumber(stats?.activity.todayRegistrations || 0)}</div>
              <div className="text-sm text-gray-400">تسجيل جديد</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">النشاطات الحديثة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {recentActivity.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">
                    لا توجد نشاطات حديثة
                  </div>
                ) : (
                  recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 space-x-reverse p-3 rounded-lg hover:bg-gray-700/50">
                      <div className="flex-shrink-0 mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-white">
                            {activity.user}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(activity.timestamp).toLocaleString('ar-SA')}
                          </p>
                        </div>
                        <p className="text-sm text-gray-300 mt-1">
                          {getActivityText(activity)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">إجراءات سريعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/movies" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700">
                  <FilmIcon className="w-4 h-4 ml-2" />
                  إدارة الأفلام
                </Button>
              </Link>
              
              <Link href="/admin/series" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700">
                  <TvIcon className="w-4 h-4 ml-2" />
                  إدارة المسلسلات
                </Button>
              </Link>
              
              <Link href="/admin/users" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700">
                  <UserGroupIcon className="w-4 h-4 ml-2" />
                  إدارة المستخدمين
                </Button>
              </Link>
              
              <Link href="/admin/settings" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700">
                  <CursorArrowRaysIcon className="w-4 h-4 ml-2" />
                  إعدادات الموقع
                </Button>
              </Link>
              
              <Link href="/admin/ads" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700">
                  <ArrowTrendingUpIcon className="w-4 h-4 ml-2" />
                  إدارة الإعلانات
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="bg-gray-800 border-gray-700 mt-6">
            <CardHeader>
              <CardTitle className="text-white">حالة النظام</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">قاعدة البيانات</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
                  <span className="text-green-400 text-sm">متصلة</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">الخادم</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
                  <span className="text-green-400 text-sm">يعمل</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">النسخ الاحتياطي</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full ml-2"></div>
                  <span className="text-yellow-400 text-sm">جاري التحديث</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}