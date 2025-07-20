'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { contentManager, initializeSampleData } from '@/lib/content-manager'
import { SmartMaintenanceSystem } from '@/lib/smart-maintenance'

const maintenanceSystem = new SmartMaintenanceSystem()
import { 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Download, 
  Upload, 
  BarChart3, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  Users,
  Eye,
  TrendingUp,
  Server,
  Database,
  Globe,
  FileText,
  Code,
  Image
} from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalMovies: 0,
    totalSeries: 0,
    totalShows: 0,
    totalMix: 0,
    totalUsers: 1250,
    monthlyViews: 45680,
    systemHealth: 'good'
  })
  
  const [systemStatus, setSystemStatus] = useState({
    server: 'online',
    database: 'online',
    cdn: 'online',
    backup: 'completed',
    lastCheck: new Date().toLocaleString('ar-EG')
  })
  
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: 'إضافة فيلم جديد', item: 'Spider-Man: No Way Home', time: '5 دقائق', user: 'المشرف' },
    { id: 2, action: 'تحديث مسلسل', item: 'House of the Dragon', time: '15 دقيقة', user: 'المشرف' },
    { id: 3, action: 'حذف محتوى', item: 'فيلم قديم', time: '30 دقيقة', user: 'المشرف' },
    { id: 4, action: 'نسخ احتياطي', item: 'قاعدة البيانات', time: '1 ساعة', user: 'النظام' }
  ])
  
  const [newMovie, setNewMovie] = useState({
    title: '',
    year: '',
    genre: '',
    quality: '4K',
    plot: ''
  })
  
  useEffect(() => {
    loadDashboardData()
    checkSystemHealth()
  }, [])
  
  const loadDashboardData = async () => {
    const analytics = contentManager.getAnalytics()
    setStats(prev => ({
      ...prev,
      totalMovies: analytics.totalMovies,
      totalSeries: analytics.totalSeries,
      totalShows: analytics.totalShows,
      totalMix: analytics.totalMix
    }))
  }
  
  const checkSystemHealth = async () => {
    try {
      const health = await maintenanceSystem.runMaintenanceCheck()
      setSystemStatus(prev => ({
        ...prev,
        systemHealth: health.overall,
        lastCheck: new Date().toLocaleString('ar-EG')
      }))
    } catch (error) {
      console.error('خطأ في فحص حالة النظام:', error)
    }
  }
  
  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await contentManager.addMovie({
        title: newMovie.title,
        year: newMovie.year,
        genre: newMovie.genre.split(',').map(g => g.trim()),
        quality: newMovie.quality,
        plot: newMovie.plot,
        featured: false
      })
      
      setNewMovie({ title: '', year: '', genre: '', quality: '4K', plot: '' })
      loadDashboardData()
      
      setRecentActivities(prev => [
        { id: Date.now(), action: 'إضافة فيلم جديد', item: newMovie.title, time: 'الآن', user: 'المشرف' },
        ...prev.slice(0, 3)
      ])
    } catch (error) {
      console.error('خطأ في إضافة الفيلم:', error)
    }
  }
  
  const handleBackup = async () => {
    try {
      const filename = await contentManager.createBackup()
      alert(`تم إنشاء نسخة احتياطية: ${filename}`)
      
      setRecentActivities(prev => [
        { id: Date.now(), action: 'نسخ احتياطي', item: 'قاعدة البيانات', time: 'الآن', user: 'النظام' },
        ...prev.slice(0, 3)
      ])
    } catch (error) {
      console.error('خطأ في النسخ الاحتياطي:', error)
    }
  }
  
  const initializeSampleDataHandler = async () => {
    await initializeSampleData()
    loadDashboardData()
    alert('تم تحميل البيانات التجريبية بنجاح!')
  }
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* رأس لوحة التحكم */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🎬 لوحة تحكم اكوام</h1>
          <p className="text-gray-400">إدارة شاملة للموقع والمحتوى</p>
        </div>
        
        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">إجمالي الأفلام</CardTitle>
              <Eye className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalMovies.toLocaleString()}</div>
              <p className="text-xs text-green-500">+12% من الشهر الماضي</p>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">إجمالي المسلسلات</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalSeries.toLocaleString()}</div>
              <p className="text-xs text-green-500">+8% من الشهر الماضي</p>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">المستخدمون النشطون</CardTitle>
              <Users className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-green-500">+23% من الشهر الماضي</p>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">المشاهدات الشهرية</CardTitle>
              <BarChart3 className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.monthlyViews.toLocaleString()}</div>
              <p className="text-xs text-green-500">+15% من الشهر الماضي</p>
            </CardContent>
          </Card>
        </div>
        
        {/* حالة النظام */}
        <Card className="bg-[#1a1a1a] border-[#333] mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Server className="h-5 w-5" />
              حالة النظام
            </CardTitle>
            <CardDescription className="text-gray-400">
              آخر فحص: {systemStatus.lastCheck}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-300">الخادم: متصل</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-300">قاعدة البيانات: متصلة</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-300">CDN: نشط</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-gray-300">النسخ الاحتياطي: مكتمل</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* تبويبات الإدارة */}
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-[#1a1a1a] border-[#333]">
            <TabsTrigger value="content" className="text-white data-[state=active]:bg-[#26baee]">إدارة المحتوى</TabsTrigger>
            <TabsTrigger value="users" className="text-white data-[state=active]:bg-[#26baee]">إدارة المستخدمين</TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-[#26baee]">التحليلات</TabsTrigger>
            <TabsTrigger value="settings" className="text-white data-[state=active]:bg-[#26baee]">الإعدادات</TabsTrigger>
            <TabsTrigger value="files" className="text-white data-[state=active]:bg-[#26baee]">الملفات</TabsTrigger>
            <TabsTrigger value="backup" className="text-white data-[state=active]:bg-[#26baee]">النسخ الاحتياطي</TabsTrigger>
          </TabsList>
          
          {/* إدارة المحتوى */}
          <TabsContent value="content" className="space-y-6">
            <Card className="bg-[#1a1a1a] border-[#333]">
              <CardHeader>
                <CardTitle className="text-white">إضافة فيلم جديد</CardTitle>
                <CardDescription className="text-gray-400">
                  أضف محتوى جديد إلى الموقع
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddMovie} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title" className="text-gray-300">عنوان الفيلم</Label>
                      <Input
                        id="title"
                        value={newMovie.title}
                        onChange={(e) => setNewMovie(prev => ({ ...prev, title: e.target.value }))}
                        className="bg-[#2a2a2a] border-[#444] text-white"
                        placeholder="اسم الفيلم"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="year" className="text-gray-300">سنة الإنتاج</Label>
                      <Input
                        id="year"
                        value={newMovie.year}
                        onChange={(e) => setNewMovie(prev => ({ ...prev, year: e.target.value }))}
                        className="bg-[#2a2a2a] border-[#444] text-white"
                        placeholder="2024"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="genre" className="text-gray-300">النوع (مفصولة بفواصل)</Label>
                      <Input
                        id="genre"
                        value={newMovie.genre}
                        onChange={(e) => setNewMovie(prev => ({ ...prev, genre: e.target.value }))}
                        className="bg-[#2a2a2a] border-[#444] text-white"
                        placeholder="أكشن, دراما, كوميديا"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="quality" className="text-gray-300">الجودة</Label>
                      <Input
                        id="quality"
                        value={newMovie.quality}
                        onChange={(e) => setNewMovie(prev => ({ ...prev, quality: e.target.value }))}
                        className="bg-[#2a2a2a] border-[#444] text-white"
                        placeholder="4K, FHD, HD"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="plot" className="text-gray-300">القصة</Label>
                    <Textarea
                      id="plot"
                      value={newMovie.plot}
                      onChange={(e) => setNewMovie(prev => ({ ...prev, plot: e.target.value }))}
                      className="bg-[#2a2a2a] border-[#444] text-white min-h-[100px]"
                      placeholder="ملخص القصة..."
                    />
                  </div>
                  
                  <Button type="submit" className="bg-[#26baee] hover:bg-[#1fa3d1] text-white">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    إضافة الفيلم
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* أزرار سريعة للمحتوى */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                onClick={initializeSampleDataHandler}
                className="bg-green-600 hover:bg-green-700 text-white p-6 h-auto"
              >
                <Database className="h-6 w-6 mb-2" />
                <div>
                  <div className="font-bold">تحميل البيانات التجريبية</div>
                  <div className="text-sm opacity-90">أفلام ومسلسلات للاختبار</div>
                </div>
              </Button>
              
              <Button className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto">
                <Upload className="h-6 w-6 mb-2" />
                <div>
                  <div className="font-bold">استيراد محتوى</div>
                  <div className="text-sm opacity-90">من ملف CSV أو JSON</div>
                </div>
              </Button>
              
              <Button className="bg-purple-600 hover:bg-purple-700 text-white p-6 h-auto">
                <Globe className="h-6 w-6 mb-2" />
                <div>
                  <div className="font-bold">سحب من API</div>
                  <div className="text-sm opacity-90">TMDB أو مصادر أخرى</div>
                </div>
              </Button>
            </div>
          </TabsContent>
          
          {/* النسخ الاحتياطي */}
          <TabsContent value="backup" className="space-y-6">
            <Card className="bg-[#1a1a1a] border-[#333]">
              <CardHeader>
                <CardTitle className="text-white">إدارة النسخ الاحتياطي</CardTitle>
                <CardDescription className="text-gray-400">
                  إنشاء واستعادة النسخ الاحتياطية للموقع
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    onClick={handleBackup}
                    className="bg-[#26baee] hover:bg-[#1fa3d1] text-white p-6 h-auto"
                  >
                    <Download className="h-6 w-6 mb-2" />
                    <div>
                      <div className="font-bold">إنشاء نسخة احتياطية</div>
                      <div className="text-sm opacity-90">تصدير جميع البيانات</div>
                    </div>
                  </Button>
                  
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white p-6 h-auto">
                    <Upload className="h-6 w-6 mb-2" />
                    <div>
                      <div className="font-bold">استعادة نسخة احتياطية</div>
                      <div className="text-sm opacity-90">استيراد البيانات</div>
                    </div>
                  </Button>
                </div>
                
                <div className="bg-[#2a2a2a] p-4 rounded-lg border border-[#444]">
                  <h4 className="text-white font-bold mb-2">آخر النسخ الاحتياطية</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>akwam-backup-2025-01-20.json</span>
                      <span className="text-green-500">مكتملة</span>
                    </div>
                    <div className="flex justify-between">
                      <span>akwam-backup-2025-01-19.json</span>
                      <span className="text-green-500">مكتملة</span>
                    </div>
                    <div className="flex justify-between">
                      <span>akwam-backup-2025-01-18.json</span>
                      <span className="text-green-500">مكتملة</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* التحليلات */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-[#1a1a1a] border-[#333]">
                <CardHeader>
                  <CardTitle className="text-white">الأنشطة الأخيرة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg">
                        <div>
                          <div className="text-white font-medium">{activity.action}</div>
                          <div className="text-gray-400 text-sm">{activity.item}</div>
                        </div>
                        <div className="text-gray-500 text-sm">
                          {activity.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-[#1a1a1a] border-[#333]">
                <CardHeader>
                  <CardTitle className="text-white">إحصائيات سريعة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">الأفلام المميزة</span>
                      <span className="text-[#26baee] font-bold">24</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">المسلسلات النشطة</span>
                      <span className="text-green-500 font-bold">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">المحتوى المضاف اليوم</span>
                      <span className="text-yellow-500 font-bold">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">متوسط التقييم</span>
                      <span className="text-purple-500 font-bold">8.2/10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* إدارة المستخدمين */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-[#1a1a1a] border-[#333]">
              <CardHeader>
                <CardTitle className="text-white">المستخدمون النشطون</CardTitle>
                <CardDescription className="text-gray-400">
                  إدارة حسابات وصلاحيات المستخدمين
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-400">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>نظام إدارة المستخدمين قيد التطوير</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* الإعدادات */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-[#1a1a1a] border-[#333]">
              <CardHeader>
                <CardTitle className="text-white">إعدادات النظام</CardTitle>
                <CardDescription className="text-gray-400">
                  تخصيص إعدادات الموقع والأداء
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    onClick={() => window.open('/admin/settings', '_blank')}
                    className="bg-[#26baee] hover:bg-[#1fa3d1] text-white p-6 h-auto"
                  >
                    <Settings className="h-8 w-8 mb-2" />
                    <div>
                      <div className="font-bold">إعدادات الموقع الشاملة</div>
                      <div className="text-sm opacity-90">تخصيص كامل للموقع</div>
                    </div>
                  </Button>
                  
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white p-6 h-auto"
                    onClick={() => window.open('/admin/files', '_blank')}
                  >
                    <FileText className="h-8 w-8 mb-2" />
                    <div>
                      <div className="font-bold">محرر الملفات</div>
                      <div className="text-sm opacity-90">تحرير ملفات الكود</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* الملفات */}
          <TabsContent value="files" className="space-y-6">
            <Card className="bg-[#1a1a1a] border-[#333]">
              <CardHeader>
                <CardTitle className="text-white">إدارة الملفات</CardTitle>
                <CardDescription className="text-gray-400">
                  تحرير وإدارة ملفات الموقع
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    onClick={() => window.open('/admin/files', '_blank')}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto"
                  >
                    <Code className="h-8 w-8 mb-2" />
                    <div>
                      <div className="font-bold">محرر الكود</div>
                      <div className="text-sm opacity-90">تحرير ملفات React/CSS</div>
                    </div>
                  </Button>
                  
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white p-6 h-auto">
                    <Image className="h-8 w-8 mb-2" />
                    <div>
                      <div className="font-bold">إدارة الصور</div>
                      <div className="text-sm opacity-90">رفع وتنظيم الصور</div>
                    </div>
                  </Button>
                  
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white p-6 h-auto">
                    <Upload className="h-8 w-8 mb-2" />
                    <div>
                      <div className="font-bold">رفع الملفات</div>
                      <div className="text-sm opacity-90">استيراد ملفات جديدة</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}