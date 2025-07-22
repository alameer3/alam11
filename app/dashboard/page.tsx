'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  Film, 
  TrendingUp, 
  Download,
  Eye,
  Star,
  Play,
  Clock,
  Activity,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'

interface Stats {
  movies: { total: number; thisMonth: number; trending: number }
  series: { total: number; thisMonth: number; trending: number }
  users: { total: number; active: number; thisMonth: number }
  views: { total: number; thisMonth: number; today: number }
  downloads: { total: number; thisMonth: number; today: number }
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats?type=overview')
      const data = await response.json()
      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            لوحة التحكم - يمن فليكس
          </h1>
          <p className="text-gray-600">
            نظرة عامة على إحصائيات الموقع والمحتوى
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الأفلام</CardTitle>
              <Film className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.movies.total.toLocaleString()}</div>
              <p className="text-xs text-green-600">
                +{stats?.movies.thisMonth} هذا الشهر
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المسلسلات</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.series.total.toLocaleString()}</div>
              <p className="text-xs text-green-600">
                +{stats?.series.thisMonth} هذا الشهر
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المستخدمون النشطون</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.users.active.toLocaleString()}</div>
              <p className="text-xs text-green-600">
                من أصل {stats?.users.total.toLocaleString()} مستخدم
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المشاهدات اليوم</CardTitle>
              <Eye className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.views.today.toLocaleString()}</div>
              <p className="text-xs text-green-600">
                {stats?.views.thisMonth.toLocaleString()} هذا الشهر
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="content">المحتوى</TabsTrigger>
            <TabsTrigger value="users">المستخدمون</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-orange-500" />
                    النشاط الأخير
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <p className="font-medium">تم إضافة فيلم جديد</p>
                      <p className="text-sm text-gray-500">The Dark Knight</p>
                    </div>
                    <Badge variant="secondary">منذ 30 دقيقة</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <p className="font-medium">تم تحديث مسلسل</p>
                      <p className="text-sm text-gray-500">Breaking Bad</p>
                    </div>
                    <Badge variant="secondary">منذ ساعة</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">مستخدم جديد</p>
                      <p className="text-sm text-gray-500">تسجيل مستخدم جديد</p>
                    </div>
                    <Badge variant="secondary">منذ ساعتين</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                    إحصائيات سريعة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">معدل النمو الشهري</span>
                    <Badge variant="outline" className="text-green-600">+12.5%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">متوسط وقت المشاهدة</span>
                    <Badge variant="outline">24 دقيقة</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">معدل الرضا</span>
                    <Badge variant="outline" className="text-green-600">94.5%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">وقت التشغيل</span>
                    <Badge variant="outline" className="text-green-600">99.8%</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>الأفلام</CardTitle>
                  <CardDescription>إدارة محتوى الأفلام</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>إجمالي الأفلام</span>
                    <Badge>{stats?.movies.total}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>الأفلام الرائجة</span>
                    <Badge variant="secondary">{stats?.movies.trending}</Badge>
                  </div>
                  <Link href="/admin/movies">
                    <Button className="w-full">إدارة الأفلام</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>المسلسلات</CardTitle>
                  <CardDescription>إدارة محتوى المسلسلات</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>إجمالي المسلسلات</span>
                    <Badge>{stats?.series.total}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>المسلسلات الرائجة</span>
                    <Badge variant="secondary">{stats?.series.trending}</Badge>
                  </div>
                  <Link href="/admin/series">
                    <Button className="w-full">إدارة المسلسلات</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>إجراءات سريعة</CardTitle>
                  <CardDescription>العمليات الأكثر استخداماً</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/admin/movies/create">
                    <Button variant="outline" className="w-full">إضافة فيلم</Button>
                  </Link>
                  <Link href="/admin/series/create">
                    <Button variant="outline" className="w-full">إضافة مسلسل</Button>
                  </Link>
                  <Link href="/admin/users">
                    <Button variant="outline" className="w-full">إدارة المستخدمين</Button>
                  </Link>
                  <Link href="/admin/reports">
                    <Button variant="outline" className="w-full">التقارير</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>إحصائيات المستخدمين</CardTitle>
                <CardDescription>معلومات تفصيلية عن المستخدمين</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{stats?.users.total.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">إجمالي المستخدمين</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{stats?.users.active.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">المستخدمون النشطون</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{stats?.users.thisMonth.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">مستخدمون جدد</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">67.8%</div>
                    <div className="text-sm text-gray-500">معدل العودة</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>إحصائيات المشاهدة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>المشاهدات اليوم</span>
                      <Badge variant="outline">{stats?.views.today.toLocaleString()}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>المشاهدات هذا الشهر</span>
                      <Badge variant="outline">{stats?.views.thisMonth.toLocaleString()}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>إجمالي المشاهدات</span>
                      <Badge variant="outline">{stats?.views.total.toLocaleString()}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>إحصائيات التحميل</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>التحميلات اليوم</span>
                      <Badge variant="outline">{stats?.downloads.today.toLocaleString()}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>التحميلات هذا الشهر</span>
                      <Badge variant="outline">{stats?.downloads.thisMonth.toLocaleString()}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>إجمالي التحميلات</span>
                      <Badge variant="outline">{stats?.downloads.total.toLocaleString()}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}