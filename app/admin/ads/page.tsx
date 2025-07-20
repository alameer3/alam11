'use client'

import { useState } from 'react'
import { MainHeader } from '@/components/layout/main-header'
import { MainMenu } from '@/components/layout/main-menu'
import { SearchBox } from '@/components/layout/search-box'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  ChartBarIcon,
  PlayIcon,
  PhotoIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import { useToast } from '@/hooks/use-toast'

interface AdConfig {
  id: string
  name: string
  type: 'video' | 'banner' | 'popup' | 'interstitial' | 'native'
  position: 'header' | 'sidebar' | 'content' | 'footer' | 'overlay' | 'floating'
  imageUrl?: string
  videoSrc?: string
  clickUrl?: string
  altText?: string
  duration: number
  showSkipButton: boolean
  skipCountdown: number
  autoPlay: boolean
  muted: boolean
  enabled: boolean
  frequency: number
  minInterval: number
  targetPages: string[]
  priority: number
  views: number
  clicks: number
  revenue: number
  createdAt: string
  lastModified: string
}

export default function AdManagementPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState('list')
  const [selectedAd, setSelectedAd] = useState<AdConfig | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // بيانات وهمية للإعلانات
  const [ads, setAds] = useState<AdConfig[]>([
    {
      id: 'welcome-video',
      name: 'إعلان ترحيبي فيديو',
      type: 'video',
      position: 'overlay',
      videoSrc: '/ads/welcome-video.mp4',
      clickUrl: 'https://example.com/welcome',
      altText: 'إعلان ترحيبي',
      duration: 15,
      showSkipButton: true,
      skipCountdown: 5,
      autoPlay: true,
      muted: true,
      enabled: true,
      frequency: 1,
      minInterval: 300,
      targetPages: ['/', '/ones'],
      priority: 1,
      views: 15420,
      clicks: 1230,
      revenue: 145.50,
      createdAt: '2024-01-15',
      lastModified: '2024-01-20'
    },
    {
      id: 'top-banner',
      name: 'بانر علوي رئيسي',
      type: 'banner',
      position: 'header',
      imageUrl: '/ads/top-banner.jpg',
      clickUrl: 'https://example.com/offer',
      altText: 'عرض خاص',
      duration: 0,
      showSkipButton: false,
      skipCountdown: 0,
      autoPlay: false,
      muted: false,
      enabled: true,
      frequency: 0,
      minInterval: 0,
      targetPages: ['*'],
      priority: 3,
      views: 45230,
      clicks: 890,
      revenue: 89.30,
      createdAt: '2024-01-10',
      lastModified: '2024-01-18'
    },
    {
      id: 'sidebar-banner',
      name: 'بانر جانبي للمحتوى',
      type: 'banner',
      position: 'sidebar',
      imageUrl: '/ads/sidebar-banner.jpg',
      clickUrl: 'https://example.com/product',
      altText: 'منتج رائع',
      duration: 0,
      showSkipButton: false,
      skipCountdown: 0,
      autoPlay: false,
      muted: false,
      enabled: true,
      frequency: 0,
      minInterval: 0,
      targetPages: ['/movies', '/series', '/watch'],
      priority: 4,
      views: 28750,
      clicks: 425,
      revenue: 63.75,
      createdAt: '2024-01-12',
      lastModified: '2024-01-19'
    }
  ])

  const [formData, setFormData] = useState<Partial<AdConfig>>({
    name: '',
    type: 'banner',
    position: 'content',
    clickUrl: '',
    altText: '',
    duration: 0,
    showSkipButton: false,
    skipCountdown: 5,
    autoPlay: false,
    muted: true,
    enabled: true,
    frequency: 0,
    minInterval: 0,
    targetPages: ['*'],
    priority: 1
  })

  const filteredAds = ads.filter(ad => 
    ad.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ad.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ad.position.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateAd = () => {
    const newAd: AdConfig = {
      ...formData as AdConfig,
      id: `ad-${Date.now()}`,
      views: 0,
      clicks: 0,
      revenue: 0,
      createdAt: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    }
    
    setAds(prev => [...prev, newAd])
    setFormData({
      name: '',
      type: 'banner',
      position: 'content',
      clickUrl: '',
      altText: '',
      duration: 0,
      showSkipButton: false,
      skipCountdown: 5,
      autoPlay: false,
      muted: true,
      enabled: true,
      frequency: 0,
      minInterval: 0,
      targetPages: ['*'],
      priority: 1
    })
    setActiveTab('list')
    
    toast({
      title: 'تم إنشاء الإعلان',
      description: 'تم إنشاء الإعلان الجديد بنجاح',
    })
  }

  const handleUpdateAd = () => {
    if (!selectedAd) return
    
    setAds(prev => prev.map(ad => 
      ad.id === selectedAd.id 
        ? { ...ad, ...formData, lastModified: new Date().toISOString().split('T')[0] }
        : ad
    ))
    setIsEditing(false)
    setSelectedAd(null)
    
    toast({
      title: 'تم تحديث الإعلان',
      description: 'تم تحديث الإعلان بنجاح',
    })
  }

  const handleDeleteAd = (adId: string) => {
    setAds(prev => prev.filter(ad => ad.id !== adId))
    toast({
      title: 'تم حذف الإعلان',
      description: 'تم حذف الإعلان بنجاح',
    })
  }

  const handleToggleAd = (adId: string) => {
    setAds(prev => prev.map(ad => 
      ad.id === adId ? { ...ad, enabled: !ad.enabled } : ad
    ))
  }

  const handleEditAd = (ad: AdConfig) => {
    setSelectedAd(ad)
    setFormData(ad)
    setIsEditing(true)
    setActiveTab('create')
  }

  const getTotalStats = () => {
    return {
      totalViews: ads.reduce((sum, ad) => sum + ad.views, 0),
      totalClicks: ads.reduce((sum, ad) => sum + ad.clicks, 0),
      totalRevenue: ads.reduce((sum, ad) => sum + ad.revenue, 0),
      enabledAds: ads.filter(ad => ad.enabled).length,
      totalAds: ads.length
    }
  }

  const stats = getTotalStats()

  return (
    <div dir="rtl" className="header-fixed body-admin min-h-screen bg-gray-900">
      <span className="site-overlay"></span>
      
      <MainMenu />
      <SearchBox />
      
      <div className="site-container">
        <div className="main-header-top"></div>
        <MainHeader />
        <div className="main-header-height"></div>
        
        <div className="container mx-auto px-4 py-6">
          {/* عنوان الصفحة */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center">
              <ChartBarIcon className="w-10 h-10 ml-4 text-[#26baee]" />
              إدارة الإعلانات
            </h1>
            <p className="text-gray-300 text-lg">
              إدارة وتتبع جميع الإعلانات في الموقع
            </p>
          </div>

          {/* إحصائيات سريعة */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-blue-500 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">إجمالي المشاهدات</p>
                    <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
                  </div>
                  <EyeIcon className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-600 to-green-700 border-green-500 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">إجمالي النقرات</p>
                    <p className="text-2xl font-bold">{stats.totalClicks.toLocaleString()}</p>
                  </div>
                  <PlayIcon className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-yellow-600 to-yellow-700 border-yellow-500 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">الإيرادات ($)</p>
                    <p className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
                  </div>
                  <ChartBarIcon className="w-8 h-8 text-yellow-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-600 to-purple-700 border-purple-500 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">الإعلانات النشطة</p>
                    <p className="text-2xl font-bold">{stats.enabledAds}</p>
                  </div>
                  <EyeIcon className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-gray-600 to-gray-700 border-gray-500 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-100 text-sm">إجمالي الإعلانات</p>
                    <p className="text-2xl font-bold">{stats.totalAds}</p>
                  </div>
                  <GlobeAltIcon className="w-8 h-8 text-gray-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* التبويبات الرئيسية */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="list" className="data-[state=active]:bg-[#26baee]">
                قائمة الإعلانات
              </TabsTrigger>
              <TabsTrigger value="create" className="data-[state=active]:bg-[#26baee]">
                {isEditing ? 'تعديل إعلان' : 'إنشاء إعلان جديد'}
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-[#26baee]">
                التحليلات
              </TabsTrigger>
            </TabsList>

            {/* قائمة الإعلانات */}
            <TabsContent value="list" className="space-y-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">قائمة الإعلانات</CardTitle>
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <Input
                        placeholder="البحث في الإعلانات..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64 bg-gray-700 border-gray-600 text-white"
                      />
                      <Button 
                        onClick={() => {
                          setIsEditing(false)
                          setFormData({
                            name: '',
                            type: 'banner',
                            position: 'content',
                            clickUrl: '',
                            altText: '',
                            duration: 0,
                            showSkipButton: false,
                            skipCountdown: 5,
                            autoPlay: false,
                            muted: true,
                            enabled: true,
                            frequency: 0,
                            minInterval: 0,
                            targetPages: ['*'],
                            priority: 1
                          })
                          setActiveTab('create')
                        }}
                        className="bg-[#26baee] hover:bg-[#1fa3d1]"
                      >
                        <PlusIcon className="w-4 h-4 ml-2" />
                        إضافة إعلان جديد
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredAds.map((ad) => (
                      <Card key={ad.id} className="bg-gray-700/50 border-gray-600">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 space-x-reverse">
                              <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center">
                                {ad.type === 'video' ? (
                                  <PlayIcon className="w-6 h-6 text-gray-300" />
                                ) : (
                                  <PhotoIcon className="w-6 h-6 text-gray-300" />
                                )}
                              </div>
                              
                              <div>
                                <h3 className="text-white font-bold text-lg">{ad.name}</h3>
                                <div className="flex items-center space-x-2 space-x-reverse mt-1">
                                  <Badge variant="secondary" className="bg-[#26baee]/20 text-[#26baee]">
                                    {ad.type}
                                  </Badge>
                                  <Badge variant="outline" className="border-gray-500 text-gray-300">
                                    {ad.position}
                                  </Badge>
                                  {ad.enabled ? (
                                    <Badge className="bg-green-600">نشط</Badge>
                                  ) : (
                                    <Badge variant="destructive">غير نشط</Badge>
                                  )}
                                </div>
                                
                                <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-400 mt-2">
                                  <span>المشاهدات: {ad.views.toLocaleString()}</span>
                                  <span>النقرات: {ad.clicks.toLocaleString()}</span>
                                  <span>الإيرادات: ${ad.revenue.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-300 hover:text-white"
                                onClick={() => handleToggleAd(ad.id)}
                              >
                                {ad.enabled ? (
                                  <EyeSlashIcon className="w-4 h-4" />
                                ) : (
                                  <EyeIcon className="w-4 h-4" />
                                )}
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-300 hover:text-white"
                                onClick={() => handleEditAd(ad)}
                              >
                                <PencilIcon className="w-4 h-4" />
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-400 hover:text-red-300"
                                onClick={() => handleDeleteAd(ad.id)}
                              >
                                <TrashIcon className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* نموذج إنشاء/تعديل إعلان */}
            <TabsContent value="create" className="space-y-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    {isEditing ? 'تعديل الإعلان' : 'إنشاء إعلان جديد'}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {isEditing ? 'عدّل تفاصيل الإعلان المحدد' : 'أنشئ إعلاناً جديداً للموقع'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* المعلومات الأساسية */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-white">اسم الإعلان</Label>
                        <Input
                          id="name"
                          value={formData.name || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="bg-gray-700 border-gray-600 text-white"
                          placeholder="مثال: بانر الصفحة الرئيسية"
                        />
                      </div>

                      <div>
                        <Label htmlFor="type" className="text-white">نوع الإعلان</Label>
                        <Select 
                          value={formData.type} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as any }))}
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            <SelectItem value="video" className="text-white">إعلان فيديو</SelectItem>
                            <SelectItem value="banner" className="text-white">بانر</SelectItem>
                            <SelectItem value="popup" className="text-white">نافذة منبثقة</SelectItem>
                            <SelectItem value="interstitial" className="text-white">إعلان شامل</SelectItem>
                            <SelectItem value="native" className="text-white">إعلان أصلي</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="position" className="text-white">موضع الإعلان</Label>
                        <Select 
                          value={formData.position} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, position: value as any }))}
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            <SelectItem value="header" className="text-white">أعلى الصفحة</SelectItem>
                            <SelectItem value="sidebar" className="text-white">الشريط الجانبي</SelectItem>
                            <SelectItem value="content" className="text-white">داخل المحتوى</SelectItem>
                            <SelectItem value="footer" className="text-white">أسفل الصفحة</SelectItem>
                            <SelectItem value="overlay" className="text-white">طبقة فوقية</SelectItem>
                            <SelectItem value="floating" className="text-white">عائم</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="clickUrl" className="text-white">رابط النقر</Label>
                        <Input
                          id="clickUrl"
                          value={formData.clickUrl || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, clickUrl: e.target.value }))}
                          className="bg-gray-700 border-gray-600 text-white"
                          placeholder="https://example.com"
                        />
                      </div>

                      <div>
                        <Label htmlFor="altText" className="text-white">النص البديل</Label>
                        <Input
                          id="altText"
                          value={formData.altText || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, altText: e.target.value }))}
                          className="bg-gray-700 border-gray-600 text-white"
                          placeholder="وصف الإعلان"
                        />
                      </div>
                    </div>

                    {/* الإعدادات المتقدمة */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="duration" className="text-white">مدة العرض (ثانية)</Label>
                        <Input
                          id="duration"
                          type="number"
                          value={formData.duration || 0}
                          onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="priority" className="text-white">الأولوية</Label>
                        <Input
                          id="priority"
                          type="number"
                          value={formData.priority || 1}
                          onChange={(e) => setFormData(prev => ({ ...prev, priority: parseInt(e.target.value) }))}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="frequency" className="text-white">تكرار العرض</Label>
                        <Input
                          id="frequency"
                          type="number"
                          value={formData.frequency || 0}
                          onChange={(e) => setFormData(prev => ({ ...prev, frequency: parseInt(e.target.value) }))}
                          className="bg-gray-700 border-gray-600 text-white"
                          placeholder="0 = دائماً، 1 = كل مرة، 3 = كل 3 مرات"
                        />
                      </div>

                      <div>
                        <Label htmlFor="minInterval" className="text-white">الحد الأدنى بين العروض (ثانية)</Label>
                        <Input
                          id="minInterval"
                          type="number"
                          value={formData.minInterval || 0}
                          onChange={(e) => setFormData(prev => ({ ...prev, minInterval: parseInt(e.target.value) }))}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="targetPages" className="text-white">الصفحات المستهدفة</Label>
                        <Textarea
                          id="targetPages"
                          value={formData.targetPages?.join(', ') || ''}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            targetPages: e.target.value.split(',').map(p => p.trim()).filter(p => p)
                          }))}
                          className="bg-gray-700 border-gray-600 text-white"
                          placeholder="*, /, /movies, /series (افصل بفاصلة)"
                        />
                      </div>
                    </div>
                  </div>

                  {/* خيارات الفيديو */}
                  {formData.type === 'video' && (
                    <div className="border-t border-gray-600 pt-6">
                      <h3 className="text-white font-bold mb-4">إعدادات الفيديو</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Switch
                            checked={formData.showSkipButton || false}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, showSkipButton: checked }))}
                          />
                          <Label className="text-white">زر التخطي</Label>
                        </div>

                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Switch
                            checked={formData.autoPlay || false}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, autoPlay: checked }))}
                          />
                          <Label className="text-white">تشغيل تلقائي</Label>
                        </div>

                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Switch
                            checked={formData.muted || false}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, muted: checked }))}
                          />
                          <Label className="text-white">كتم الصوت</Label>
                        </div>

                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Switch
                            checked={formData.enabled || false}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, enabled: checked }))}
                          />
                          <Label className="text-white">مُفعل</Label>
                        </div>
                      </div>

                      {formData.showSkipButton && (
                        <div className="mt-4">
                          <Label htmlFor="skipCountdown" className="text-white">عدد ثواني التخطي</Label>
                          <Input
                            id="skipCountdown"
                            type="number"
                            value={formData.skipCountdown || 5}
                            onChange={(e) => setFormData(prev => ({ ...prev, skipCountdown: parseInt(e.target.value) }))}
                            className="bg-gray-700 border-gray-600 text-white w-32"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* أزرار الحفظ */}
                  <div className="flex items-center justify-end space-x-4 space-x-reverse pt-6 border-t border-gray-600">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setActiveTab('list')
                        setIsEditing(false)
                        setSelectedAd(null)
                      }}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      إلغاء
                    </Button>
                    <Button
                      onClick={isEditing ? handleUpdateAd : handleCreateAd}
                      className="bg-[#26baee] hover:bg-[#1fa3d1]"
                    >
                      {isEditing ? 'تحديث الإعلان' : 'إنشاء الإعلان'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* التحليلات */}
            <TabsContent value="analytics" className="space-y-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">تحليلات الإعلانات</CardTitle>
                  <CardDescription className="text-gray-400">
                    تقارير مفصلة عن أداء الإعلانات
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ads.map((ad) => (
                      <Card key={ad.id} className="bg-gray-700/50 border-gray-600">
                        <CardContent className="p-4">
                          <h3 className="text-white font-bold mb-3">{ad.name}</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">المشاهدات:</span>
                              <span className="text-white">{ad.views.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">النقرات:</span>
                              <span className="text-white">{ad.clicks.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">معدل النقر:</span>
                              <span className="text-white">
                                {ad.views > 0 ? ((ad.clicks / ad.views) * 100).toFixed(2) : 0}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">الإيرادات:</span>
                              <span className="text-green-400">${ad.revenue.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">الحالة:</span>
                              <Badge className={ad.enabled ? 'bg-green-600' : 'bg-red-600'}>
                                {ad.enabled ? 'نشط' : 'غير نشط'}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}