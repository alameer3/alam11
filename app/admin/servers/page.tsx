'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  ServerIcon,
  CpuChipIcon,
  CircleStackIcon,
  WifiIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface Server {
  id: number
  name: string
  hostname: string
  ip_address: string
  port: number
  type: 'streaming' | 'storage' | 'cdn' | 'database' | 'cache'
  status: 'online' | 'offline' | 'maintenance' | 'error'
  cpu_usage: number
  memory_usage: number
  disk_usage: number
  bandwidth_usage: number
  uptime: string
  last_check: string
  is_active: boolean
  location: string
  capacity: string
  bandwidth_limit: string
  created_at: string
}

export default function ServersManagementPage() {
  const [servers, setServers] = useState<Server[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingServer, setEditingServer] = useState<Server | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const [formData, setFormData] = useState<{
    name: string
    hostname: string
    ip_address: string
    port: number
    type: 'streaming' | 'database' | 'storage' | 'cdn' | 'cache'
    location: string
    capacity: string
    bandwidth_limit: string
    is_active: boolean
  }>({
    name: '',
    hostname: '',
    ip_address: '',
    port: 80,
    type: 'streaming',
    location: '',
    capacity: '',
    bandwidth_limit: '',
    is_active: true
  })

  const fetchServers = async () => {
    try {
      setLoading(true)
      // محاكاة البيانات
      const mockServers: Server[] = [
        {
          id: 1,
          name: 'خادم البث الرئيسي',
          hostname: 'stream-main.akwam.com',
          ip_address: '192.168.1.10',
          port: 8080,
          type: 'streaming',
          status: 'online',
          cpu_usage: 65,
          memory_usage: 78,
          disk_usage: 45,
          bandwidth_usage: 82,
          uptime: '15 يوم، 8 ساعات',
          last_check: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
          is_active: true,
          location: 'الرياض، السعودية',
          capacity: '2TB SSD',
          bandwidth_limit: '1Gbps',
          created_at: '2024-01-01T00:00:00Z'
        },
        {
          id: 2,
          name: 'خادم التخزين الاحتياطي',
          hostname: 'storage-backup.akwam.com',
          ip_address: '192.168.1.20',
          port: 21,
          type: 'storage',
          status: 'online',
          cpu_usage: 25,
          memory_usage: 45,
          disk_usage: 89,
          bandwidth_usage: 15,
          uptime: '45 يوم، 12 ساعة',
          last_check: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          is_active: true,
          location: 'دبي، الإمارات',
          capacity: '10TB HDD',
          bandwidth_limit: '500Mbps',
          created_at: '2024-01-01T00:00:00Z'
        },
        {
          id: 3,
          name: 'خادم CDN الأوروبي',
          hostname: 'cdn-eu.akwam.com',
          ip_address: '185.123.45.67',
          port: 443,
          type: 'cdn',
          status: 'maintenance',
          cpu_usage: 0,
          memory_usage: 0,
          disk_usage: 67,
          bandwidth_usage: 0,
          uptime: '0 يوم، 0 ساعة',
          last_check: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          is_active: false,
          location: 'لندن، بريطانيا',
          capacity: '500GB SSD',
          bandwidth_limit: '2Gbps',
          created_at: '2024-01-15T00:00:00Z'
        },
        {
          id: 4,
          name: 'قاعدة البيانات الرئيسية',
          hostname: 'db-primary.akwam.com',
          ip_address: '192.168.1.30',
          port: 3306,
          type: 'database',
          status: 'online',
          cpu_usage: 45,
          memory_usage: 67,
          disk_usage: 34,
          bandwidth_usage: 25,
          uptime: '30 يوم، 5 ساعات',
          last_check: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
          is_active: true,
          location: 'الرياض، السعودية',
          capacity: '1TB SSD',
          bandwidth_limit: '1Gbps',
          created_at: '2024-01-01T00:00:00Z'
        },
        {
          id: 5,
          name: 'خادم التخزين المؤقت',
          hostname: 'cache-redis.akwam.com',
          ip_address: '192.168.1.40',
          port: 6379,
          type: 'cache',
          status: 'error',
          cpu_usage: 95,
          memory_usage: 98,
          disk_usage: 12,
          bandwidth_usage: 45,
          uptime: '2 يوم، 3 ساعات',
          last_check: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
          is_active: true,
          location: 'الكويت، الكويت',
          capacity: '64GB RAM',
          bandwidth_limit: '500Mbps',
          created_at: '2024-02-01T00:00:00Z'
        }
      ]
      setServers(mockServers)
    } catch (error) {
      console.error('خطأ في جلب الخوادم:', error)
    } finally {
      setLoading(false)
    }
  }

  const refreshServerStatus = async () => {
    setRefreshing(true)
    await fetchServers()
    setRefreshing(false)
  }

  useEffect(() => {
    fetchServers()
    // تحديث البيانات كل دقيقة
    const interval = setInterval(fetchServers, 60000)
    return () => clearInterval(interval)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'port' ? parseInt(value) : value
    }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingServer) {
        // تحديث خادم موجود
        const updatedServers = servers.map(server => 
          server.id === editingServer.id 
            ? { 
                ...server, 
                ...formData,
                last_check: new Date().toISOString()
              }
            : server
        )
        setServers(updatedServers)
        setEditingServer(null)
      } else {
        // إضافة خادم جديد
        const newServer: Server = {
          ...formData,
          id: Date.now(),
          status: 'offline',
          cpu_usage: 0,
          memory_usage: 0,
          disk_usage: 0,
          bandwidth_usage: 0,
          uptime: '0 يوم، 0 ساعة',
          last_check: new Date().toISOString(),
          created_at: new Date().toISOString()
        }
        setServers([newServer, ...servers])
        setShowCreateForm(false)
      }
      
      // إعادة تعيين النموذج
      setFormData({
        name: '',
        hostname: '',
        ip_address: '',
        port: 80,
        type: 'streaming',
        location: '',
        capacity: '',
        bandwidth_limit: '',
        is_active: true
      })
      
    } catch (error) {
      console.error('خطأ في حفظ الخادم:', error)
    }
  }

  const handleEdit = (server: Server) => {
    setEditingServer(server)
    setFormData({
      name: server.name,
      hostname: server.hostname,
      ip_address: server.ip_address,
      port: server.port,
      type: server.type,
      location: server.location,
      capacity: server.capacity,
      bandwidth_limit: server.bandwidth_limit,
      is_active: server.is_active
    })
    setShowCreateForm(true)
  }

  const handleDelete = async (serverId: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا الخادم؟')) return

    try {
      setServers(servers.filter(server => server.id !== serverId))
    } catch (error) {
      console.error('خطأ في حذف الخادم:', error)
    }
  }

  const toggleServerStatus = async (serverId: number, currentStatus: boolean) => {
    try {
      setServers(servers.map(server => 
        server.id === serverId 
          ? { 
              ...server, 
              is_active: !currentStatus,
              status: !currentStatus ? 'online' : 'offline'
            }
          : server
      ))
    } catch (error) {
      console.error('خطأ في تغيير حالة الخادم:', error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge className="bg-green-600">متصل</Badge>
      case 'offline':
        return <Badge className="bg-red-600">غير متصل</Badge>
      case 'maintenance':
        return <Badge className="bg-yellow-600">صيانة</Badge>
      case 'error':
        return <Badge className="bg-red-600">خطأ</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'streaming':
        return <Badge variant="outline" className="border-blue-500 text-blue-400">بث</Badge>
      case 'storage':
        return <Badge variant="outline" className="border-green-500 text-green-400">تخزين</Badge>
      case 'cdn':
        return <Badge variant="outline" className="border-purple-500 text-purple-400">CDN</Badge>
      case 'database':
        return <Badge variant="outline" className="border-orange-500 text-orange-400">قاعدة بيانات</Badge>
      case 'cache':
        return <Badge variant="outline" className="border-pink-500 text-pink-400">تخزين مؤقت</Badge>
      default:
        return <Badge variant="secondary">{type}</Badge>
    }
  }

  const getUsageColor = (usage: number) => {
    if (usage >= 90) return 'text-red-400'
    if (usage >= 70) return 'text-yellow-400'
    return 'text-green-400'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />
      case 'offline':
        return <XMarkIcon className="w-5 h-5 text-red-500" />
      case 'maintenance':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />
      case 'error':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
      default:
        return <ServerIcon className="w-5 h-5 text-gray-500" />
    }
  }

  const filteredServers = servers.filter(server => {
    const matchesSearch = server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         server.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         server.ip_address.includes(searchTerm)
    const matchesType = !typeFilter || server.type === typeFilter
    const matchesStatus = !statusFilter || server.status === statusFilter
    
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="container mx-auto p-6" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <ServerIcon className="w-8 h-8 text-blue-500" />
            إدارة الخوادم
          </h1>
          <p className="text-gray-400 mt-1">
            إجمالي الخوادم: {servers.length} | متصل: {servers.filter(s => s.status === 'online').length}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={refreshServerStatus}
            disabled={refreshing}
            variant="outline" 
            className="border-green-600 text-green-400 hover:bg-green-600"
          >
            {refreshing ? 'جاري التحديث...' : 'تحديث الحالة'}
          </Button>
          
          <Button 
            onClick={() => {
              setShowCreateForm(true)
              setEditingServer(null)
              setFormData({
                name: '',
                hostname: '',
                ip_address: '',
                port: 80,
                type: 'streaming',
                location: '',
                capacity: '',
                bandwidth_limit: '',
                is_active: true
              })
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="w-5 h-5 ml-2" />
            إضافة خادم جديد
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6 bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              type="text"
              placeholder="البحث في الخوادم..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            >
              <option value="">جميع الأنواع</option>
              <option value="streaming">خادم بث</option>
              <option value="storage">خادم تخزين</option>
              <option value="cdn">شبكة توصيل المحتوى</option>
              <option value="database">قاعدة بيانات</option>
              <option value="cache">تخزين مؤقت</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            >
              <option value="">جميع الحالات</option>
              <option value="online">متصل</option>
              <option value="offline">غير متصل</option>
              <option value="maintenance">صيانة</option>
              <option value="error">خطأ</option>
            </select>

            <Button onClick={fetchServers} className="bg-blue-600 hover:bg-blue-700">
              تحديث
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Servers List */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="grid gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700 animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-700 rounded mb-4"></div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="h-16 bg-gray-700 rounded"></div>
                      <div className="h-16 bg-gray-700 rounded"></div>
                      <div className="h-16 bg-gray-700 rounded"></div>
                      <div className="h-16 bg-gray-700 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredServers.length === 0 ? (
            <Card className="bg-gray-800 border-gray-700 text-center py-12">
              <CardContent>
                <ServerIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">لا توجد خوادم</h3>
                <p className="text-gray-400 mb-4">
                  {searchTerm ? 'لم يتم العثور على خوادم تطابق البحث' : 'لم يتم إضافة أي خوادم بعد'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredServers.map((server) => (
                <Card key={server.id} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(server.status)}
                        <div>
                          <h3 className="font-semibold text-white text-lg">{server.name}</h3>
                          <p className="text-gray-400 text-sm">{server.hostname}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {getTypeBadge(server.type)}
                            {getStatusBadge(server.status)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right text-sm text-gray-400">
                        <p>IP: {server.ip_address}:{server.port}</p>
                        <p>{server.location}</p>
                        <p>آخر فحص: {new Date(server.last_check).toLocaleTimeString('ar-SA')}</p>
                      </div>
                    </div>

                    {/* مقاييس الأداء */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <CpuChipIcon className="w-6 h-6 mx-auto mb-1 text-blue-400" />
                        <div className={`text-lg font-bold ${getUsageColor(server.cpu_usage)}`}>
                          {server.cpu_usage}%
                        </div>
                        <div className="text-xs text-gray-400">المعالج</div>
                      </div>

                      <div className="text-center">
                        <CircleStackIcon className="w-6 h-6 mx-auto mb-1 text-green-400" />
                        <div className={`text-lg font-bold ${getUsageColor(server.memory_usage)}`}>
                          {server.memory_usage}%
                        </div>
                        <div className="text-xs text-gray-400">الذاكرة</div>
                      </div>

                      <div className="text-center">
                        <CircleStackIcon className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
                        <div className={`text-lg font-bold ${getUsageColor(server.disk_usage)}`}>
                          {server.disk_usage}%
                        </div>
                        <div className="text-xs text-gray-400">التخزين</div>
                      </div>

                      <div className="text-center">
                        <WifiIcon className="w-6 h-6 mx-auto mb-1 text-purple-400" />
                        <div className={`text-lg font-bold ${getUsageColor(server.bandwidth_usage)}`}>
                          {server.bandwidth_usage}%
                        </div>
                        <div className="text-xs text-gray-400">النطاق</div>
                      </div>
                    </div>

                    {/* معلومات إضافية */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-300 mb-4">
                      <div>
                        <span className="text-gray-400">مدة التشغيل:</span>
                        <br />
                        <span>{server.uptime}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">السعة:</span>
                        <br />
                        <span>{server.capacity}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">النطاق الترددي:</span>
                        <br />
                        <span>{server.bandwidth_limit}</span>
                      </div>
                    </div>

                    {/* أزرار التحكم */}
                    <div className="flex gap-2 pt-4 border-t border-gray-700">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(server)}
                        className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
                      >
                        <PencilIcon className="w-4 h-4 ml-1" />
                        تعديل
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleServerStatus(server.id, server.is_active)}
                        className={server.is_active 
                          ? "border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                          : "border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
                        }
                      >
                        {server.is_active ? 'إيقاف' : 'تشغيل'}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(server.id)}
                        className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                      >
                        <TrashIcon className="w-4 h-4 ml-1" />
                        حذف
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Create/Edit Form */}
        {showCreateForm && (
          <div className="lg:col-span-1">
            <Card className="bg-gray-800 border-gray-700 sticky top-6">
              <CardHeader>
                <CardTitle className="text-white">
                  {editingServer ? 'تعديل الخادم' : 'إضافة خادم جديد'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">اسم الخادم *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="خادم البث الرئيسي"
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hostname" className="text-white">اسم المضيف *</Label>
                    <Input
                      id="hostname"
                      name="hostname"
                      value={formData.hostname}
                      onChange={handleInputChange}
                      placeholder="stream.akwam.com"
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ip_address" className="text-white">عنوان IP *</Label>
                      <Input
                        id="ip_address"
                        name="ip_address"
                        value={formData.ip_address}
                        onChange={handleInputChange}
                        placeholder="192.168.1.10"
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="port" className="text-white">المنفذ *</Label>
                      <Input
                        id="port"
                        name="port"
                        type="number"
                        value={formData.port}
                        onChange={handleInputChange}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-white">نوع الخادم</Label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    >
                      <option value="streaming">خادم بث</option>
                      <option value="storage">خادم تخزين</option>
                      <option value="cdn">شبكة توصيل المحتوى</option>
                      <option value="database">قاعدة بيانات</option>
                      <option value="cache">تخزين مؤقت</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-white">الموقع</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="الرياض، السعودية"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacity" className="text-white">السعة</Label>
                    <Input
                      id="capacity"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      placeholder="2TB SSD"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bandwidth_limit" className="text-white">حد النطاق الترددي</Label>
                    <Input
                      id="bandwidth_limit"
                      name="bandwidth_limit"
                      value={formData.bandwidth_limit}
                      onChange={handleInputChange}
                      placeholder="1Gbps"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="is_active" className="text-white">نشط</Label>
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => handleSwitchChange('is_active', checked)}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      {editingServer ? 'تحديث الخادم' : 'إضافة الخادم'}
                    </Button>
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setShowCreateForm(false)
                        setEditingServer(null)
                      }}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      إلغاء
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}