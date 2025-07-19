"use client"

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Button } from '@/components/ui/button'
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock,
  Zap,
  TrendingUp,
  Server,
  Database,
  Globe,
  RefreshCw,
  Play,
  Eye,
  AlertCircle
} from 'lucide-react'

interface SystemStatus {
  timestamp: string
  status: 'healthy' | 'warning' | 'critical' | 'offline'
  components: {
    database: ComponentStatus
    api: ComponentStatus
    frontend: ComponentStatus
    cdn: ComponentStatus
    streaming: ComponentStatus
  }
  performance: PerformanceMetrics
  errors: ErrorReport[]
  suggestions: AISuggestion[]
}

interface ComponentStatus {
  name: string
  status: 'online' | 'offline' | 'degraded'
  responseTime: number
  uptime: number
  lastCheck: string
  issues: string[]
}

interface PerformanceMetrics {
  pageLoadTime: number
  apiResponseTime: number
  databaseQueryTime: number
  memoryUsage: number
  cpuUsage: number
  diskUsage: number
  bandwidthUsage: number
}

interface ErrorReport {
  id: string
  timestamp: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  component: string
  message: string
  resolved: boolean
  autoFixAttempted: boolean
  autoFixSuccess?: boolean
}

interface AISuggestion {
  id: string
  type: 'performance' | 'security' | 'maintenance' | 'optimization'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  title: string
  description: string
  estimatedImpact: string
  estimatedTime: string
  autoImplementable: boolean
  implemented: boolean
}

export default function MonitoringPage() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)

  // جلب حالة النظام
  const fetchSystemStatus = async () => {
    try {
      const response = await fetch('/api/monitoring/status')
      const result = await response.json()
      
      if (result.success) {
        setSystemStatus(result.data)
      }
    } catch (error) {
      console.error('خطأ في جلب حالة النظام:', error)
    } finally {
      setLoading(false)
    }
  }

  // تطبيق اقتراح
  const implementSuggestion = async (suggestionId: string) => {
    try {
      const response = await fetch('/api/monitoring/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ suggestionId, action: 'implement' })
      })
      
      const result = await response.json()
      
      if (result.success) {
        fetchSystemStatus() // تحديث البيانات
      }
    } catch (error) {
      console.error('خطأ في تطبيق الاقتراح:', error)
    }
  }

  // تشغيل فحص فوري
  const runManualCheck = async () => {
    setLoading(true)
    await fetchSystemStatus()
  }

  useEffect(() => {
    fetchSystemStatus()
  }, [])

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(fetchSystemStatus, 30000) // كل 30 ثانية
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'online':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'warning':
      case 'degraded':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'critical':
      case 'offline':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'online':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'warning':
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'critical':
      case 'offline':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading && !systemStatus) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <Header />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-8">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <RefreshCw className="h-12 w-12 text-red-500 animate-spin mx-auto mb-4" />
                <p className="text-xl text-gray-300">جاري تحميل بيانات النظام...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />
      
      <div className="flex">
        <AdminSidebar />
        
        <main className="flex-1 p-8">
          {/* رأس الصفحة */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Activity className="h-8 w-8 text-red-500" />
                نظام المراقبة الذكي
              </h1>
              <p className="text-gray-400 mt-2">
                مراقبة شاملة وذكية لجميع مكونات الموقع مع اقتراحات تلقائية للتحسين
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">التحديث التلقائي:</span>
                <Button
                  size="sm"
                  variant={autoRefresh ? "default" : "outline"}
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={autoRefresh ? "bg-red-600 hover:bg-red-700" : ""}
                >
                  {autoRefresh ? <Play className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
                  {autoRefresh ? 'تشغيل' : 'متوقف'}
                </Button>
              </div>
              
              <Button
                onClick={runManualCheck}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                فحص فوري
              </Button>
            </div>
          </div>

          {systemStatus && (
            <>
              {/* حالة النظام العامة */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className={`p-6 rounded-xl border-2 ${getStatusColor(systemStatus.status)}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">حالة النظام العامة</h3>
                      <p className="text-2xl font-bold mt-2 capitalize">
                        {systemStatus.status === 'healthy' ? 'سليم' :
                         systemStatus.status === 'warning' ? 'تحذير' :
                         systemStatus.status === 'critical' ? 'حرج' : 'غير متصل'}
                      </p>
                    </div>
                    {getStatusIcon(systemStatus.status)}
                  </div>
                </div>

                <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">الأخطاء النشطة</h3>
                      <p className="text-2xl font-bold mt-2 text-red-400">
                        {systemStatus.errors.filter(e => !e.resolved).length}
                      </p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-red-500" />
                  </div>
                </div>

                <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">الاقتراحات المعلقة</h3>
                      <p className="text-2xl font-bold mt-2 text-yellow-400">
                        {systemStatus.suggestions.filter(s => !s.implemented).length}
                      </p>
                    </div>
                    <Zap className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>

                <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">وقت الاستجابة</h3>
                      <p className="text-2xl font-bold mt-2 text-blue-400">
                        {systemStatus.performance.pageLoadTime}ms
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
              </div>

              {/* حالة المكونات */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Server className="h-6 w-6 text-red-500" />
                  حالة المكونات
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(systemStatus.components).map(([key, component]) => (
                    <div key={key} className="p-6 bg-gray-800 rounded-xl border border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">{component.name}</h3>
                        {getStatusIcon(component.status)}
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">وقت الاستجابة:</span>
                          <span className="text-white">{component.responseTime}ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">معدل التشغيل:</span>
                          <span className="text-green-400">{component.uptime}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">آخر فحص:</span>
                          <span className="text-white">
                            {new Date(component.lastCheck).toLocaleTimeString('ar')}
                          </span>
                        </div>
                      </div>

                      {component.issues.length > 0 && (
                        <div className="mt-4 p-3 bg-red-900/30 border border-red-800 rounded-lg">
                          <h4 className="text-sm font-semibold text-red-400 mb-2">مشاكل:</h4>
                          <ul className="text-xs text-red-300 space-y-1">
                            {component.issues.map((issue, index) => (
                              <li key={index}>• {issue}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* الاقتراحات الذكية */}
              {systemStatus.suggestions.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Zap className="h-6 w-6 text-yellow-500" />
                    الاقتراحات الذكية
                  </h2>
                  
                  <div className="space-y-4">
                    {systemStatus.suggestions
                      .filter(s => !s.implemented)
                      .slice(0, 5)
                      .map((suggestion) => (
                      <div key={suggestion.id} className="p-6 bg-gray-800 rounded-xl border border-gray-700">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-white">{suggestion.title}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(suggestion.priority)}`}>
                                {suggestion.priority === 'urgent' ? 'عاجل' :
                                 suggestion.priority === 'high' ? 'عالي' :
                                 suggestion.priority === 'medium' ? 'متوسط' : 'منخفض'}
                              </span>
                              {suggestion.autoImplementable && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                  تطبيق تلقائي
                                </span>
                              )}
                            </div>
                            
                            <p className="text-gray-300 mb-3">{suggestion.description}</p>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-400">التأثير المتوقع:</span>
                                <p className="text-blue-300">{suggestion.estimatedImpact}</p>
                              </div>
                              <div>
                                <span className="text-gray-400">الوقت المطلوب:</span>
                                <p className="text-yellow-300">{suggestion.estimatedTime}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 ml-4">
                            {suggestion.autoImplementable && (
                              <Button
                                size="sm"
                                onClick={() => implementSuggestion(suggestion.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Play className="h-4 w-4 ml-1" />
                                تطبيق
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 ml-1" />
                              تفاصيل
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* الأخطاء الأخيرة */}
              {systemStatus.errors.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                    الأخطاء الأخيرة
                  </h2>
                  
                  <div className="space-y-4">
                    {systemStatus.errors.slice(0, 10).map((error) => (
                      <div key={error.id} className={`p-4 rounded-lg border ${
                        error.resolved ? 'bg-green-900/20 border-green-800' : 'bg-red-900/20 border-red-800'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                error.severity === 'critical' ? 'bg-red-100 text-red-800' :
                                error.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                                error.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {error.severity === 'critical' ? 'حرج' :
                                 error.severity === 'high' ? 'عالي' :
                                 error.severity === 'medium' ? 'متوسط' : 'منخفض'}
                              </span>
                              <span className="text-gray-400 text-sm">{error.component}</span>
                              <span className="text-gray-400 text-sm">
                                {new Date(error.timestamp).toLocaleString('ar')}
                              </span>
                            </div>
                            
                            <p className={error.resolved ? 'text-green-300' : 'text-red-300'}>
                              {error.message}
                            </p>
                            
                            {error.autoFixAttempted && (
                              <p className="text-xs text-gray-400 mt-2">
                                {error.autoFixSuccess ? '✅ تم الإصلاح تلقائياً' : '❌ فشل الإصلاح التلقائي'}
                              </p>
                            )}
                          </div>
                          
                          {error.resolved ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}