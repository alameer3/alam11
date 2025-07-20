'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  PhotoIcon,
  LinkIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

interface Ad {
  id: number
  title: string
  description?: string
  image?: string
  url?: string
  position: 'header' | 'sidebar' | 'footer' | 'popup' | 'banner'
  type: 'image' | 'text' | 'html'
  is_active: boolean
  priority: number
  start_date?: string
  end_date?: string
  clicks: number
  views: number
  created_at: string
}

export default function AdsManagementPage() {
  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [positionFilter, setPositionFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingAd, setEditingAd] = useState<Ad | null>(null)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    url: '',
    position: 'banner' as const,
    type: 'image' as const,
    is_active: true,
    priority: 1,
    start_date: '',
    end_date: ''
  })

  const fetchAds = async () => {
    try {
      setLoading(true)
      // محاكاة جلب البيانات
      const mockAds: Ad[] = [
        {
          id: 1,
          title: 'إعلان Netflix الرئيسي',
          description: 'إعلان للاشتراك في Netflix',
          image: 'https://via.placeholder.com/300x150/ff0000/ffffff?text=Netflix',
          url: 'https://netflix.com',
          position: 'header',
          type: 'image',
          is_active: true,
          priority: 1,
          start_date: '2024-01-01',
          end_date: '2024-12-31',
          clicks: 1250,
          views: 25680,
          created_at: '2024-01-01T00:00:00Z'
        },
        {
          id: 2,
          title: 'إعلان Disney+ الجانبي',
          description: 'عرض خاص لاشتراك Disney+',
          image: 'https://via.placeholder.com/250x400/1e40af/ffffff?text=Disney%2B',
          url: 'https://disneyplus.com',
          position: 'sidebar',
          type: 'image',
          is_active: true,
          priority: 2,
          clicks: 890,
          views: 18450,
          created_at: '2024-01-15T00:00:00Z'
        },
        {
          id: 3,
          title: 'إعلان نصي للتطبيق',
          description: 'حمل تطبيقنا الآن ومتاح مجاناً',
          position: 'footer',
          type: 'text',
          is_active: false,
          priority: 3,
          clicks: 456,
          views: 9870,
          created_at: '2024-02-01T00:00:00Z'
        }
      ]
      setAds(mockAds)
    } catch (error) {
      console.error('خطأ في جلب الإعلانات:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAds()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      if (editingAd) {
        // تحديث إعلان موجود
        const updatedAds = ads.map(ad => 
          ad.id === editingAd.id 
            ? { ...ad, ...formData, id: editingAd.id }
            : ad
        )
        setAds(updatedAds)
        setEditingAd(null)
      } else {
        // إضافة إعلان جديد
        const newAd: Ad = {
          ...formData,
          id: Date.now(),
          clicks: 0,
          views: 0,
          created_at: new Date().toISOString()
        }
        setAds([newAd, ...ads])
        setShowCreateForm(false)
      }
      
      // إعادة تعيين النموذج
      setFormData({
        title: '',
        description: '',
        image: '',
        url: '',
        position: 'banner',
        type: 'image',
        is_active: true,
        priority: 1,
        start_date: '',
        end_date: ''
      })
      
    } catch (error) {
      console.error('خطأ في حفظ الإعلان:', error)
    }
  }

  const handleEdit = (ad: Ad) => {
    setEditingAd(ad)
    setFormData({
      title: ad.title,
      description: ad.description || '',
      image: ad.image || '',
      url: ad.url || '',
      position: ad.position,
      type: ad.type,
      is_active: ad.is_active,
      priority: ad.priority,
      start_date: ad.start_date || '',
      end_date: ad.end_date || ''
    })
    setShowCreateForm(true)
  }

  const handleDelete = async (adId: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا الإعلان؟')) return

    try {
      setIsDeleting(adId)
      setAds(ads.filter(ad => ad.id !== adId))
    } catch (error) {
      console.error('خطأ في حذف الإعلان:', error)
    } finally {
      setIsDeleting(null)
    }
  }

  const toggleAdStatus = async (adId: number, currentStatus: boolean) => {
    try {
      setAds(ads.map(ad => 
        ad.id === adId 
          ? { ...ad, is_active: !currentStatus }
          : ad
      ))
    } catch (error) {
      console.error('خطأ في تغيير حالة الإعلان:', error)
    }
  }

  const getPositionBadge = (position: string) => {
    switch (position) {
      case 'header':
        return <Badge className="bg-blue-600">رأس الصفحة</Badge>
      case 'sidebar':
        return <Badge className="bg-green-600">الشريط الجانبي</Badge>
      case 'footer':
        return <Badge className="bg-purple-600">أسفل الصفحة</Badge>
      case 'popup':
        return <Badge className="bg-red-600">نافذة منبثقة</Badge>
      case 'banner':
        return <Badge className="bg-orange-600">بانر</Badge>
      default:
        return <Badge variant="secondary">{position}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'image':
        return <Badge variant="outline" className="border-blue-500 text-blue-400">صورة</Badge>
      case 'text':
        return <Badge variant="outline" className="border-green-500 text-green-400">نص</Badge>
      case 'html':
        return <Badge variant="outline" className="border-purple-500 text-purple-400">HTML</Badge>
      default:
        return <Badge variant="secondary">{type}</Badge>
    }
  }

  const filteredAds = ads.filter(ad => {
    const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPosition = !positionFilter || ad.position === positionFilter
    const matchesStatus = !statusFilter || 
      (statusFilter === 'active' && ad.is_active) ||
      (statusFilter === 'inactive' && !ad.is_active)
    
    return matchesSearch && matchesPosition && matchesStatus
  })

  return (
    <div className="container mx-auto p-6" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <MegaphoneIcon className="w-8 h-8 text-blue-500" />
            إدارة الإعلانات
          </h1>
          <p className="text-gray-400 mt-1">
            إجمالي الإعلانات: {ads.length}
          </p>
        </div>
        
        <Button 
          onClick={() => {
            setShowCreateForm(true)
            setEditingAd(null)
            setFormData({
              title: '',
              description: '',
              image: '',
              url: '',
              position: 'banner',
              type: 'image',
              is_active: true,
              priority: 1,
              start_date: '',
              end_date: ''
            })
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5 ml-2" />
          إضافة إعلان جديد
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6 bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="البحث في الإعلانات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 bg-gray-700 border-gray-600 text-white"
              />
            </div>
            
            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              className="p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            >
              <option value="">جميع المواضع</option>
              <option value="header">رأس الصفحة</option>
              <option value="sidebar">الشريط الجانبي</option>
              <option value="footer">أسفل الصفحة</option>
              <option value="popup">نافذة منبثقة</option>
              <option value="banner">بانر</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            >
              <option value="">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>

            <Button onClick={fetchAds} className="bg-blue-600 hover:bg-blue-700">
              تحديث
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ads List */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="grid gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700 animate-pulse">
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredAds.length === 0 ? (
            <Card className="bg-gray-800 border-gray-700 text-center py-12">
              <CardContent>
                <MegaphoneIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">لا توجد إعلانات</h3>
                <p className="text-gray-400 mb-4">
                  {searchTerm ? 'لم يتم العثور على إعلانات تطابق البحث' : 'لم يتم إضافة أي إعلانات بعد'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredAds.map((ad) => (
                <Card key={ad.id} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-white">{ad.title}</h3>
                          {getPositionBadge(ad.position)}
                          {getTypeBadge(ad.type)}
                          {ad.is_active ? (
                            <Badge className="bg-green-600">نشط</Badge>
                          ) : (
                            <Badge className="bg-red-600">غير نشط</Badge>
                          )}
                        </div>
                        
                        {ad.description && (
                          <p className="text-gray-300 text-sm mb-2">{ad.description}</p>
                        )}
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400">
                          <div>
                            <span className="flex items-center gap-1">
                              <EyeIcon className="w-4 h-4" />
                              {ad.views.toLocaleString()} مشاهدة
                            </span>
                          </div>
                          <div>
                            <span className="flex items-center gap-1">
                              <LinkIcon className="w-4 h-4" />
                              {ad.clicks.toLocaleString()} نقرة
                            </span>
                          </div>
                          <div>
                            <span>الأولوية: {ad.priority}</span>
                          </div>
                          <div>
                            <span className="flex items-center gap-1">
                              <ClockIcon className="w-4 h-4" />
                              {new Date(ad.created_at).toLocaleDateString('ar-SA')}
                            </span>
                          </div>
                        </div>
                        
                        {ad.url && (
                          <a 
                            href={ad.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block"
                          >
                            {ad.url}
                          </a>
                        )}
                      </div>
                      
                      {ad.image && (
                        <div className="mr-4">
                          <img 
                            src={ad.image} 
                            alt={ad.title}
                            className="w-20 h-12 object-cover rounded border"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(ad)}
                        className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
                      >
                        <PencilIcon className="w-4 h-4 ml-1" />
                        تعديل
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleAdStatus(ad.id, ad.is_active)}
                        className={ad.is_active 
                          ? "border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                          : "border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
                        }
                      >
                        {ad.is_active ? 'إيقاف' : 'تفعيل'}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(ad.id)}
                        disabled={isDeleting === ad.id}
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
                  {editingAd ? 'تعديل الإعلان' : 'إضافة إعلان جديد'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">عنوان الإعلان *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="أدخل عنوان الإعلان"
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-white">الوصف</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="وصف مختصر للإعلان..."
                      rows={3}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image" className="text-white flex items-center gap-2">
                      <PhotoIcon className="w-4 h-4" />
                      رابط الصورة
                    </Label>
                    <Input
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="url" className="text-white flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" />
                      رابط الإعلان
                    </Label>
                    <Input
                      id="url"
                      name="url"
                      value={formData.url}
                      onChange={handleInputChange}
                      placeholder="https://example.com"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="position" className="text-white">الموضع</Label>
                      <select
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      >
                        <option value="header">رأس الصفحة</option>
                        <option value="sidebar">الشريط الجانبي</option>
                        <option value="footer">أسفل الصفحة</option>
                        <option value="popup">نافذة منبثقة</option>
                        <option value="banner">بانر</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type" className="text-white">النوع</Label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      >
                        <option value="image">صورة</option>
                        <option value="text">نص</option>
                        <option value="html">HTML</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority" className="text-white">الأولوية</Label>
                    <Input
                      id="priority"
                      name="priority"
                      type="number"
                      min="1"
                      max="10"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start_date" className="text-white">تاريخ البداية</Label>
                      <Input
                        id="start_date"
                        name="start_date"
                        type="date"
                        value={formData.start_date}
                        onChange={handleInputChange}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="end_date" className="text-white">تاريخ النهاية</Label>
                      <Input
                        id="end_date"
                        name="end_date"
                        type="date"
                        value={formData.end_date}
                        onChange={handleInputChange}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
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
                      {editingAd ? 'تحديث الإعلان' : 'إضافة الإعلان'}
                    </Button>
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setShowCreateForm(false)
                        setEditingAd(null)
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