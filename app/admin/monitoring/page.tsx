'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  EyeIcon,
  CpuChipIcon,
  CircleStackIcon,
  WifiIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BoltIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

interface SystemMetrics {
  cpu: {
    usage: number
    cores: number
    temperature: number
    load_average: number[]
  }
  memory: {
    used: number
    total: number
    available: number
    usage_percent: number
  }
  disk: {
    used: number
    total: number
    available: number
    usage_percent: number
  }
  network: {
    upload_speed: number
    download_speed: number
    total_sent: number
    total_received: number
  }
}

interface ServiceStatus {
  id: string
  name: string
  status: 'running' | 'stopped' | 'error' | 'restarting'
  uptime: string
  memory_usage: number
  cpu_usage: number
  port?: number
  description: string
  last_restart?: string
}

interface LogEntry {
  id: number
  level: 'info' | 'warning' | 'error' | 'critical'
  message: string
  service: string
  timestamp: string
  details?: string
}

interface Alert {
  id: number
  type: 'warning' | 'error' | 'critical'
  title: string
  message: string
  timestamp: string
  resolved: boolean
  service?: string
}

export default function MonitoringPage() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null)
  const [services, setServices] = useState<ServiceStatus[]>([])
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h')

  const fetchSystemMetrics = async () => {
    // محاكاة بيانات النظام
    const mockMetrics: SystemMetrics = {
      cpu: {
        usage: Math.floor(Math.random() * 40) + 30, // 30-70%
        cores: 8,
        temperature: Math.floor(Math.random() * 20) + 45, // 45-65°C
        load_average: [1.2, 1.5, 1.8]
      },
      memory: {
        used: 12.5,
        total: 32,
        available: 19.5,
        usage_percent: Math.floor((12.5 / 32) * 100)
      },
      disk: {
        used: 450,
        total: 1000,
        available: 550,
        usage_percent: 45
      },
      network: {
        upload_speed: Math.floor(Math.random() * 50) + 10,
        download_speed: Math.floor(Math.random() * 100) + 50,
        total_sent: 2.5,
        total_received: 15.8
      }
    }
    setMetrics(mockMetrics)
  }

  const fetchServices = async () => {
    const mockServices: ServiceStatus[] = [
      {
        id: 'nginx',
        name: 'خادم الويب (Nginx)',
        status: 'running',
        uptime: '15 يوم، 8 ساعات',
        memory_usage: 85,
        cpu_usage: 12,
        port: 80,
        description: 'خادم الويب الرئيسي'
      },
      {
        id: 'mysql',
        name: 'قاعدة البيانات (MySQL)',
        status: 'running',
        uptime: '30 يوم، 5 ساعات',
        memory_usage: 1200,
        cpu_usage: 25,
        port: 3306,
        description: 'قاعدة البيانات الرئيسية'
      },
      {
        id: 'redis',
        name: 'التخزين المؤقت (Redis)',
        status: 'running',
        uptime: '25 يوم، 12 ساعة',
        memory_usage: 512,
        cpu_usage: 8,
        port: 6379,
        description: 'خادم التخزين المؤقت'
      },
      {
        id: 'nodejs',
        name: 'تطبيق Node.js',
        status: 'running',
        uptime: '2 يوم، 3 ساعات',
        memory_usage: 256,
        cpu_usage: 15,
        port: 3000,
        description: 'تطبيق الواجهة الخلفية',
        last_restart: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'ffmpeg',
        name: 'معالج الفيديو (FFmpeg)',
        status: 'restarting',
        uptime: '0 دقيقة',
        memory_usage: 0,
        cpu_usage: 0,
        description: 'محول تنسيقات الفيديو',
        last_restart: new Date().toISOString()
      }
    ]
    setServices(mockServices)
  }

  const fetchLogs = async () => {
    const mockLogs: LogEntry[] = [
      {
        id: 1,
        level: 'info',
        message: 'تم بدء تشغيل الخادم بنجاح',
        service: 'nginx',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        level: 'warning',
        message: 'استخدام الذاكرة مرتفع - 85%',
        service: 'mysql',
        timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        details: 'قد تحتاج إلى تحسين الاستعلامات أو زيادة الذاكرة'
      },
      {
        id: 3,
        level: 'error',
        message: 'فشل في الاتصال بقاعدة البيانات',
        service: 'nodejs',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        details: 'Connection timeout after 30 seconds'
      },
      {
        id: 4,
        level: 'info',
        message: 'تم تنفيذ النسخ الاحتياطي بنجاح',
        service: 'system',
        timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString()
      },
      {
        id: 5,
        level: 'critical',
        message: 'مساحة القرص منخفضة جداً - أقل من 5%',
        service: 'system',
        timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        details: 'المساحة المتاحة: 2.1GB من أصل 100GB'
      }
    ]
    setLogs(mockLogs)
  }

  const fetchAlerts = async () => {
    const mockAlerts: Alert[] = [
      {
        id: 1,
        type: 'critical',
        title: 'استخدام المعالج مرتفع جداً',
        message: 'استخدام المعالج وصل إلى 95% لأكثر من 10 دقائق',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        resolved: false,
        service: 'system'
      },
      {
        id: 2,
        type: 'warning',
        title: 'ذاكرة قاعدة البيانات مرتفعة',
        message: 'MySQL تستخدم 1.2GB من الذاكرة',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        resolved: false,
        service: 'mysql'
      },
      {
        id: 3,
        type: 'error',
        title: 'خطأ في معالج الفيديو',
        message: 'FFmpeg توقف عن العمل بشكل غير متوقع',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        resolved: true,
        service: 'ffmpeg'
      }
    ]
    setAlerts(mockAlerts)
  }

  const fetchAllData = async () => {
    setLoading(true)
    await Promise.all([
      fetchSystemMetrics(),
      fetchServices(),
      fetchLogs(),
      fetchAlerts()
    ])
    setLoading(false)
  }

  useEffect(() => {
    fetchAllData()
    
    if (autoRefresh) {
      const interval = setInterval(fetchAllData, 30000) // تحديث كل 30 ثانية
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />
      case 'stopped':
        return <XMarkIcon className="w-5 h-5 text-red-500" />
      case 'error':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
      case 'restarting':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running':
        return <Badge className="bg-green-600">يعمل</Badge>
      case 'stopped':
        return <Badge className="bg-red-600">متوقف</Badge>
      case 'error':
        return <Badge className="bg-red-600">خطأ</Badge>
      case 'restarting':
        return <Badge className="bg-yellow-600">إعادة تشغيل</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'info':
        return <CheckCircleIcon className="w-4 h-4 text-blue-500" />
      case 'warning':
        return <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500" />
      case 'error':
        return <XMarkIcon className="w-4 h-4 text-red-500" />
      case 'critical':
        return <BoltIcon className="w-4 h-4 text-red-600" />
      default:
        return <CheckCircleIcon className="w-4 h-4 text-gray-500" />
    }
  }

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'info':
        return <Badge className="bg-blue-600">معلومات</Badge>
      case 'warning':
        return <Badge className="bg-yellow-600">تحذير</Badge>
      case 'error':
        return <Badge className="bg-red-600">خطأ</Badge>
      case 'critical':
        return <Badge className="bg-red-700">حرج</Badge>
      default:
        return <Badge variant="secondary">{level}</Badge>
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
      case 'error':
        return <XMarkIcon className="w-5 h-5 text-red-500" />
      case 'critical':
        return <BoltIcon className="w-5 h-5 text-red-600" />
      default:
        return <ExclamationTriangleIcon className="w-5 h-5 text-gray-500" />
    }
  }

  const getUsageColor = (usage: number) => {
    if (usage >= 90) return 'text-red-400'
    if (usage >= 70) return 'text-yellow-400'
    return 'text-green-400'
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const resolveAlert = (alertId: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ))
  }

  return (
    <div className="container mx-auto p-6" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <EyeIcon className="w-8 h-8 text-blue-500" />
            مراقبة النظام
          </h1>
          <p className="text-gray-400 mt-1">
            مراقبة الأداء والخدمات في الوقت الفعلي
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={fetchAllData}
            disabled={loading}
            variant="outline" 
            className="border-green-600 text-green-400 hover:bg-green-600"
          >
            {loading ? 'جاري التحديث...' : 'تحديث البيانات'}
          </Button>
          
          <Button 
            onClick={() => setAutoRefresh(!autoRefresh)}
            variant={autoRefresh ? "default" : "outline"}
            className={autoRefresh ? "bg-blue-600" : "border-blue-600 text-blue-400"}
          >
            التحديث التلقائي {autoRefresh ? 'مُفعل' : 'معطل'}
          </Button>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* CPU */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">المعالج</p>
                <p className={`text-2xl font-bold ${getUsageColor(metrics?.cpu.usage || 0)}`}>
                  {metrics?.cpu.usage || 0}%
                </p>
                <p className="text-xs text-gray-500">
                  {metrics?.cpu.cores} نواة | {metrics?.cpu.temperature}°C
                </p>
              </div>
              <CpuChipIcon className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        {/* Memory */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">الذاكرة</p>
                <p className={`text-2xl font-bold ${getUsageColor(metrics?.memory.usage_percent || 0)}`}>
                  {metrics?.memory.usage_percent || 0}%
                </p>
                <p className="text-xs text-gray-500">
                  {metrics?.memory.used}GB / {metrics?.memory.total}GB
                </p>
              </div>
              <CircleStackIcon className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        {/* Disk */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">التخزين</p>
                <p className={`text-2xl font-bold ${getUsageColor(metrics?.disk.usage_percent || 0)}`}>
                  {metrics?.disk.usage_percent || 0}%
                </p>
                <p className="text-xs text-gray-500">
                  {metrics?.disk.used}GB / {metrics?.disk.total}GB
                </p>
              </div>
              <CircleStackIcon className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        {/* Network */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">الشبكة</p>
                <div className="flex items-center gap-2">
                  <ArrowTrendingUpIcon className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-white">{metrics?.network.upload_speed || 0} MB/s</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowTrendingDownIcon className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-white">{metrics?.network.download_speed || 0} MB/s</span>
                </div>
              </div>
              <WifiIcon className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Services Status */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ShieldCheckIcon className="w-5 h-5 text-blue-500" />
              حالة الخدمات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {services.map((service) => (
                <div key={service.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(service.status)}
                    <div>
                      <h4 className="font-medium text-white">{service.name}</h4>
                      <p className="text-sm text-gray-400">{service.description}</p>
                      {service.port && (
                        <p className="text-xs text-gray-500">المنفذ: {service.port}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {getStatusBadge(service.status)}
                    <div className="mt-1 text-xs text-gray-400">
                      <div>مدة التشغيل: {service.uptime}</div>
                      <div>المعالج: {service.cpu_usage}%</div>
                      <div>الذاكرة: {formatBytes(service.memory_usage * 1024 * 1024)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
              التنبيهات النشطة
              <Badge className="bg-red-600 ml-2">
                {alerts.filter(a => !a.resolved).length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.filter(alert => !alert.resolved).length === 0 ? (
                <div className="text-center text-gray-400 py-4">
                  <CheckCircleIcon className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <p>لا توجد تنبيهات نشطة</p>
                </div>
              ) : (
                alerts.filter(alert => !alert.resolved).map((alert) => (
                  <div key={alert.id} className="flex items-start justify-between p-3 bg-gray-700/50 rounded-lg border-r-4 border-red-500">
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.type)}
                      <div>
                        <h4 className="font-medium text-white">{alert.title}</h4>
                        <p className="text-sm text-gray-400 mt-1">{alert.message}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={
                            alert.type === 'critical' ? 'bg-red-700' :
                            alert.type === 'error' ? 'bg-red-600' :
                            'bg-yellow-600'
                          }>
                            {alert.type === 'critical' ? 'حرج' : 
                             alert.type === 'error' ? 'خطأ' : 'تحذير'}
                          </Badge>
                          {alert.service && (
                            <Badge variant="outline" className="border-gray-500 text-gray-400">
                              {alert.service}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(alert.timestamp).toLocaleString('ar-SA')}
                        </p>
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => resolveAlert(alert.id)}
                      className="border-green-600 text-green-400 hover:bg-green-600"
                    >
                      حل
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Logs */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <ClockIcon className="w-5 h-5 text-blue-500" />
              سجلات النظام
            </CardTitle>
            
            <div className="flex gap-2">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="p-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm"
              >
                <option value="1h">آخر ساعة</option>
                <option value="6h">آخر 6 ساعات</option>
                <option value="24h">آخر 24 ساعة</option>
                <option value="7d">آخر أسبوع</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                <div className="flex-shrink-0 mt-0.5">
                  {getLevelIcon(log.level)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {getLevelBadge(log.level)}
                    <Badge variant="outline" className="border-gray-500 text-gray-400">
                      {log.service}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(log.timestamp).toLocaleString('ar-SA')}
                    </span>
                  </div>
                  
                  <p className="text-white text-sm">{log.message}</p>
                  
                  {log.details && (
                    <p className="text-gray-400 text-xs mt-1 bg-gray-800 p-2 rounded">
                      {log.details}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}