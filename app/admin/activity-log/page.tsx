'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  ClockIcon,
  UserIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ShieldCheckIcon,
  DocumentIcon,
  ServerIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon,
  MagnifyingGlassIcon,

  ArrowPathIcon,
  CloudArrowDownIcon
} from '@heroicons/react/24/outline'

interface ActivityLog {
  id: string
  timestamp: string
  userId: string
  userName: string
  userRole: string
  action: string
  resource: string
  resourceId: string
  resourceName: string
  description: string
  details: Record<string, unknown>
  ipAddress: string
  userAgent: string
  status: 'success' | 'failed' | 'warning'
  category: 'auth' | 'content' | 'users' | 'system' | 'security'
  duration?: number
}

const actionIcons = {
  'create': PlusIcon,
  'update': PencilIcon,
  'delete': TrashIcon,
  'view': EyeIcon,
  'login': UserIcon,
  'logout': UserIcon,
  'backup': CloudArrowDownIcon,
  'restore': ArrowPathIcon,
  'permission': ShieldCheckIcon,
  'system': ServerIcon
}

const categoryColors = {
  'auth': 'bg-blue-600',
  'content': 'bg-green-600',
  'users': 'bg-purple-600',
  'system': 'bg-orange-600',
  'security': 'bg-red-600'
}

export default function ActivityLogPage() {
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [filteredActivities, setFilteredActivities] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(20)

  const fetchActivities = async () => {
    try {
      setLoading(true)
      
      // محاكاة بيانات سجل الأنشطة
      const mockActivities: ActivityLog[] = [
        {
          id: '1',
          timestamp: '2024-01-20T14:30:00Z',
          userId: '1',
          userName: 'أحمد محمد',
          userRole: 'مدير عام',
          action: 'create',
          resource: 'movie',
          resourceId: '123',
          resourceName: 'فيلم الحركة الجديد',
          description: 'تم إضافة فيلم جديد',
          details: { title: 'فيلم الحركة الجديد', year: 2024, genre: 'حركة' },
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          status: 'success',
          category: 'content',
          duration: 2500
        },
        {
          id: '2',
          timestamp: '2024-01-20T13:45:00Z',
          userId: '2',
          userName: 'فاطمة علي',
          userRole: 'مدير المحتوى',
          action: 'update',
          resource: 'series',
          resourceId: '456',
          resourceName: 'مسلسل الدراما الشهير',
          description: 'تم تحديث بيانات المسلسل',
          details: { updated_fields: ['description', 'poster'], previous_values: {} },
          ipAddress: '192.168.1.101',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          status: 'success',
          category: 'content',
          duration: 1800
        },
        {
          id: '3',
          timestamp: '2024-01-20T12:20:00Z',
          userId: '3',
          userName: 'محمد حسن',
          userRole: 'مدير المستخدمين',
          action: 'login',
          resource: 'auth',
          resourceId: '3',
          resourceName: 'تسجيل دخول',
          description: 'تم تسجيل الدخول بنجاح',
          details: { login_method: 'password', two_factor: false },
          ipAddress: '192.168.1.102',
          userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
          status: 'success',
          category: 'auth'
        },
        {
          id: '4',
          timestamp: '2024-01-20T11:55:00Z',
          userId: '1',
          userName: 'أحمد محمد',
          userRole: 'مدير عام',
          action: 'delete',
          resource: 'user',
          resourceId: '789',
          resourceName: 'مستخدم محظور',
          description: 'تم حذف مستخدم محظور',
          details: { reason: 'انتهاك الشروط', ban_duration: 'permanent' },
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          status: 'success',
          category: 'users',
          duration: 500
        },
        {
          id: '5',
          timestamp: '2024-01-20T10:30:00Z',
          userId: 'system',
          userName: 'النظام',
          userRole: 'نظام',
          action: 'backup',
          resource: 'database',
          resourceId: 'backup_001',
          resourceName: 'نسخة احتياطية يومية',
          description: 'تم إنشاء نسخة احتياطية تلقائية',
          details: { size: '2.5GB', compression: 'gzip', duration: 1800 },
          ipAddress: 'localhost',
          userAgent: 'System/1.0',
          status: 'success',
          category: 'system',
          duration: 1800000
        },
        {
          id: '6',
          timestamp: '2024-01-20T09:15:00Z',
          userId: '4',
          userName: 'سارة أحمد',
          userRole: 'مشرف',
          action: 'update',
          resource: 'user',
          resourceId: '345',
          resourceName: 'مستخدم عادي',
          description: 'تم تحديث صلاحيات المستخدم',
          details: { role_changed: 'من مستخدم إلى مشرف', permissions_added: ['moderate_comments'] },
          ipAddress: '192.168.1.103',
          userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
          status: 'success',
          category: 'users',
          duration: 1200
        },
        {
          id: '7',
          timestamp: '2024-01-20T08:45:00Z',
          userId: '5',
          userName: 'عبدالله يوسف',
          userRole: 'مشاهد',
          action: 'login',
          resource: 'auth',
          resourceId: '5',
          resourceName: 'محاولة تسجيل دخول فاشلة',
          description: 'فشل في تسجيل الدخول - كلمة مرور خاطئة',
          details: { attempts: 3, locked_account: false, security_alert: true },
          ipAddress: '203.0.113.5',
          userAgent: 'Mozilla/5.0 (Android 11; Mobile; rv:89.0) Gecko/89.0',
          status: 'failed',
          category: 'auth'
        },
        {
          id: '8',
          timestamp: '2024-01-20T07:30:00Z',
          userId: 'system',
          userName: 'النظام',
          userRole: 'نظام',
          action: 'system',
          resource: 'server',
          resourceId: 'server_01',
          resourceName: 'خادم المحتوى الرئيسي',
          description: 'تحذير: استخدام مرتفع للذاكرة',
          details: { memory_usage: '85%', cpu_usage: '67%', alert_level: 'warning' },
          ipAddress: 'localhost',
          userAgent: 'System/1.0',
          status: 'warning',
          category: 'system'
        },
        {
          id: '9',
          timestamp: '2024-01-19T23:00:00Z',
          userId: '2',
          userName: 'فاطمة علي',
          userRole: 'مدير المحتوى',
          action: 'create',
          resource: 'episode',
          resourceId: '678',
          resourceName: 'الحلقة الأولى - مسلسل جديد',
          description: 'تم إضافة حلقة جديدة',
          details: { series_id: '456', episode_number: 1, season: 1, duration: 45 },
          ipAddress: '192.168.1.101',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          status: 'success',
          category: 'content',
          duration: 3200
        },
        {
          id: '10',
          timestamp: '2024-01-19T20:15:00Z',
          userId: '1',
          userName: 'أحمد محمد',
          userRole: 'مدير عام',
          action: 'permission',
          resource: 'role',
          resourceId: 'role_content_manager',
          resourceName: 'دور مدير المحتوى',
          description: 'تم تحديث أذونات الدور',
          details: { permissions_added: ['export_reports'], permissions_removed: [] },
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          status: 'success',
          category: 'security',
          duration: 800
        }
      ]

      await new Promise(resolve => setTimeout(resolve, 1000))
      setActivities(mockActivities)
      setFilteredActivities(mockActivities)
    } catch (error) {
      // // console.error('خطأ في جلب سجل الأنشطة:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  useEffect(() => {
    let filtered = activities

    // تصفية حسب مصطلح البحث
    if (searchTerm) {
      filtered = filtered.filter(activity =>
        activity.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.resourceName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // تصفية حسب الفئة
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(activity => activity.category === selectedCategory)
    }

    // تصفية حسب الحالة
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(activity => activity.status === selectedStatus)
    }

    // تصفية حسب التاريخ
    if (dateRange.from) {
      filtered = filtered.filter(activity => activity.timestamp >= dateRange.from)
    }
    if (dateRange.to) {
      filtered = filtered.filter(activity => activity.timestamp <= dateRange.to)
    }

    setFilteredActivities(filtered)
    setCurrentPage(1)
  }, [activities, searchTerm, selectedCategory, selectedStatus, dateRange])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon className="w-4 h-4 text-green-500" />
      case 'failed':
        return <XMarkIcon className="w-4 h-4 text-red-500" />
      case 'warning':
        return <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500" />
      default:
        return <ClockIcon className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-600">نجح</Badge>
      case 'failed':
        return <Badge className="bg-red-600">فشل</Badge>
      case 'warning':
        return <Badge className="bg-yellow-600">تحذير</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getActionIcon = (action: string) => {
    const IconComponent = actionIcons[action as keyof typeof actionIcons] || DocumentIcon
    return <IconComponent className="w-4 h-4 text-blue-400" />
  }

  const formatDuration = (ms?: number) => {
    if (!ms) return '-'
    if (ms < 1000) return `${ms}ms`
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`
    return `${(ms / 60000).toFixed(1)}m`
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'auth': return 'المصادقة'
      case 'content': return 'المحتوى'
      case 'users': return 'المستخدمون'
      case 'system': return 'النظام'
      case 'security': return 'الأمان'
      default: return category
    }
  }

  const exportLogs = () => {
    const csv = [
      ['الوقت', 'المستخدم', 'الإجراء', 'المورد', 'الوصف', 'الحالة', 'عنوان IP'],
      ...filteredActivities.map(activity => [
        new Date(activity.timestamp).toLocaleString('ar-SA'),
        activity.userName,
        activity.action,
        activity.resourceName,
        activity.description,
        activity.status,
        activity.ipAddress
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `activity-log-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // حساب الصفحات
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentActivities = filteredActivities.slice(startIndex, endIndex)

  const stats = {
    total: activities.length,
    success: activities.filter(a => a.status === 'success').length,
    failed: activities.filter(a => a.status === 'failed').length,
    warning: activities.filter(a => a.status === 'warning').length
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6" dir="rtl">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-700 rounded w-1/4"></div>
          <div className="grid gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-20 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <ClockIcon className="w-8 h-8 text-blue-500" />
            سجل الأنشطة
          </h1>
          <p className="text-gray-400 mt-1">
            تتبع جميع العمليات والأنشطة في النظام
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={() => fetchActivities()}
            variant="outline"
            className="border-blue-600 text-blue-400 hover:bg-blue-600"
          >
            <ArrowPathIcon className="w-4 h-4 ml-2" />
            تحديث
          </Button>
          
          <Button 
            onClick={exportLogs}
            className="bg-green-600 hover:bg-green-700"
          >
            <CloudArrowDownIcon className="w-4 h-4 ml-2" />
            تصدير CSV
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">إجمالي الأنشطة</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <ClockIcon className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">عمليات ناجحة</p>
                <p className="text-2xl font-bold text-green-400">{stats.success}</p>
              </div>
              <CheckCircleIcon className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">عمليات فاشلة</p>
                <p className="text-2xl font-bold text-red-400">{stats.failed}</p>
              </div>
              <XMarkIcon className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">تحذيرات</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.warning}</p>
              </div>
              <ExclamationTriangleIcon className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="البحث في الأنشطة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white pr-10"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            >
              <option value="all">جميع الفئات</option>
              <option value="auth">المصادقة</option>
              <option value="content">المحتوى</option>
              <option value="users">المستخدمون</option>
              <option value="system">النظام</option>
              <option value="security">الأمان</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            >
              <option value="all">جميع الحالات</option>
              <option value="success">نجح</option>
              <option value="failed">فشل</option>
              <option value="warning">تحذير</option>
            </select>

            <Input
              type="date"
              placeholder="من تاريخ"
              value={dateRange.from}
              onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
              className="bg-gray-700 border-gray-600 text-white"
            />

            <Input
              type="date"
              placeholder="إلى تاريخ"
              value={dateRange.to}
              onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Activity List */}
      <div className="space-y-3">
        {currentActivities.map((activity) => (
          <Card key={activity.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex flex-col items-center gap-1">
                    {getActionIcon(activity.action)}
                    {getStatusIcon(activity.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-white">{activity.description}</h3>
                      {getStatusBadge(activity.status)}
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${categoryColors[activity.category as keyof typeof categoryColors]} border-0`}
                      >
                        {getCategoryName(activity.category)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm text-gray-400">
                      <div>
                        <span className="font-medium">المستخدم:</span> {activity.userName} ({activity.userRole})
                      </div>
                      <div>
                        <span className="font-medium">المورد:</span> {activity.resourceName}
                      </div>
                      <div>
                        <span className="font-medium">IP:</span> {activity.ipAddress}
                      </div>
                      <div>
                        <span className="font-medium">المدة:</span> {formatDuration(activity.duration)}
                      </div>
                    </div>

                    {activity.details && Object.keys(activity.details).length > 0 && (
                      <details className="mt-2">
                        <summary className="text-xs text-blue-400 cursor-pointer hover:text-blue-300">
                          عرض التفاصيل
                        </summary>
                        <pre className="mt-1 text-xs text-gray-500 bg-gray-900 p-2 rounded overflow-x-auto">
                          {JSON.stringify(activity.details, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
                
                <div className="text-right text-xs text-gray-500 whitespace-nowrap">
                  {new Date(activity.timestamp).toLocaleString('ar-SA')}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="border-gray-600 text-gray-300"
          >
            السابق
          </Button>
          
          <span className="text-gray-400 text-sm">
            صفحة {currentPage} من {totalPages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="border-gray-600 text-gray-300"
          >
            التالي
          </Button>
        </div>
      )}

      {filteredActivities.length === 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-12 text-center">
            <ClockIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">لا توجد أنشطة</h3>
            <p className="text-gray-400">
              لم يتم العثور على أنشطة مطابقة لمعايير البحث المحددة
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}