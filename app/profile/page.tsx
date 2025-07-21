'use client';
import React from 'react'
import { useState } from 'react'
import { 
  User, 
  Settings, 
  Heart, 
  Download, 
  Clock, 
  Star, 
  Edit, 
  Camera, 
  Bell, 
  Shield, 
  Palette,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Link,
  Plus,
  Trash2,
  Play,
  Pause
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  bio: string
  location: string
  joinDate: string
  lastActive: string
  subscription: 'free' | 'premium' | 'pro'
  preferences: {
    language: string
    theme: 'light' | 'dark' | 'auto'
    notifications: boolean
    privacy: 'public' | 'private' | 'friends'
    autoplay: boolean
    quality: string
  }
  stats: {
    totalWatched: number
    totalLiked: number
    totalDownloaded: number
    watchTime: string
    favoriteGenres: string[]
  }
}

const mockUserProfile: UserProfile = {
  id: '1',
  name: 'أحمد محمد',
  email: 'ahmed@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  bio: 'مشاهد محترف للأفلام والمسلسلات. أحب الأكشن والدراما والكوميديا.',
  location: 'القاهرة، مصر',
  joinDate: '2023-01-15',
  lastActive: '2024-01-20',
  subscription: 'premium',
  preferences: {
    language: 'العربية',
    theme: 'dark',
    notifications: true,
    privacy: 'public',
    autoplay: true,
    quality: '1080p'
  },
  stats: {
    totalWatched: 247,
    totalLiked: 89,
    totalDownloaded: 34,
    watchTime: '1,247 ساعة',
    favoriteGenres: ['أكشن', 'دراما', 'كوميديا', 'إثارة']
  }
}

const mockWatchHistory = [
  {
    id: '1',
    title: 'The Dark Knight',
    arabicTitle: 'الفرسان المظلم',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=120&h=180&fit=crop',
    progress: 85,
    lastWatched: 'منذ ساعتين',
    duration: '2:32:00',
    type: 'movie'
  },
  {
    id: '2',
    title: 'Breaking Bad',
    arabicTitle: 'بريكينغ باد',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a9?w=120&h=180&fit=crop',
    progress: 45,
    lastWatched: 'منذ يوم',
    duration: '47 min',
    type: 'series'
  },
  {
    id: '3',
    title: 'Game of Thrones',
    arabicTitle: 'لعبة العرش',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=120&h=180&fit=crop',
    progress: 100,
    lastWatched: 'منذ 3 أيام',
    duration: '57 min',
    type: 'series'
  }
]

const mockFavorites = [
  {
    id: '1',
    title: 'The Dark Knight',
    arabicTitle: 'الفرسان المظلم',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=120&h=180&fit=crop',
    rating: 9.0,
    year: 2008,
    type: 'movie'
  },
  {
    id: '2',
    title: 'Breaking Bad',
    arabicTitle: 'بريكينغ باد',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a9?w=120&h=180&fit=crop',
    rating: 9.5,
    year: 2008,
    type: 'series'
  },
  {
    id: '3',
    title: 'Inception',
    arabicTitle: 'البداية',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=120&h=180&fit=crop',
    rating: 8.8,
    year: 2010,
    type: 'movie'
  }
]

const mockDownloads = [
  {
    id: '1',
    title: 'The Dark Knight',
    arabicTitle: 'الفرسان المظلم',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=120&h=180&fit=crop',
    size: '2.5 GB',
    quality: '1080p',
    downloadDate: '2024-01-15',
    type: 'movie'
  },
  {
    id: '2',
    title: 'Breaking Bad S01E01',
    arabicTitle: 'بريكينغ باد الحلقة الأولى',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a9?w=120&h=180&fit=crop',
    size: '800 MB',
    quality: '720p',
    downloadDate: '2024-01-10',
    type: 'series'
  }
]

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Here you would typically save to backend
  }

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case 'premium': return 'bg-yellow-100 text-yellow-800'
      case 'pro': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSubscriptionText = (subscription: string) => {
    switch (subscription) {
      case 'premium': return 'مميز'
      case 'pro': return 'احترافي'
      default: return 'مجاني'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-3xl font-bold">{profile.name}</h1>
                  <Badge className={getSubscriptionColor(profile.subscription)}>
                    {getSubscriptionText(profile.subscription)}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? 'إلغاء' : 'تعديل'}
                  </Button>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4">{profile.bio}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>انضم في {new Date(profile.joinDate).toLocaleDateString('ar-SA')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>آخر نشاط: {profile.lastActive}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Play className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{profile.stats.totalWatched}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">مشاهد</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                  <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{profile.stats.totalLiked}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">مفضل</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Download className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{profile.stats.totalDownloaded}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">تحميل</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{profile.stats.watchTime}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">وقت المشاهدة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tabs Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                <TabsTrigger value="history">السجل</TabsTrigger>
                <TabsTrigger value="favorites">المفضلة</TabsTrigger>
                <TabsTrigger value="downloads">التحميلات</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Favorite Genres */}
                <Card>
                  <CardHeader>
                    <CardTitle>التصنيفات المفضلة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profile.stats.favoriteGenres.map((genre, index) => (
                        <Badge key={index} variant="secondary">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>النشاط الأخير</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockWatchHistory.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <img
                            src={item.poster}
                            alt={item.title}
                            className="w-16 h-24 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.arabicTitle}</h4>
                            <p className="text-sm text-gray-500">{item.lastWatched}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${item.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                {mockWatchHistory.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.poster}
                          alt={item.title}
                          className="w-16 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.arabicTitle}</h4>
                          <p className="text-sm text-gray-500">{item.lastWatched}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {item.type === 'movie' ? 'فيلم' : 'مسلسل'}
                            </Badge>
                            <span className="text-sm text-gray-500">{item.duration}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="favorites" className="space-y-4">
                {mockFavorites.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.poster}
                          alt={item.title}
                          className="w-16 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.arabicTitle}</h4>
                          <div className="flex items-center gap-2 mt-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm">{item.rating}</span>
                            <span className="text-sm text-gray-500">{item.year}</span>
                          </div>
                          <Badge variant="outline" className="text-xs mt-2">
                            {item.type === 'movie' ? 'فيلم' : 'مسلسل'}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Heart className="w-4 h-4 text-red-500 fill-current" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="downloads" className="space-y-4">
                {mockDownloads.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.poster}
                          alt={item.title}
                          className="w-16 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.arabicTitle}</h4>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm text-gray-500">{item.size}</span>
                            <Badge variant="outline" className="text-xs">
                              {item.quality}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{item.downloadDate}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  الإعدادات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Language */}
                <div>
                  <label className="text-sm font-medium mb-2 block">اللغة</label>
                  <Select value={profile.preferences.language}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="العربية">العربية</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Français">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Theme */}
                <div>
                  <label className="text-sm font-medium mb-2 block">المظهر</label>
                  <Select value={profile.preferences.theme}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">فاتح</SelectItem>
                      <SelectItem value="dark">داكن</SelectItem>
                      <SelectItem value="auto">تلقائي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Quality */}
                <div>
                  <label className="text-sm font-medium mb-2 block">جودة الفيديو</label>
                  <Select value={profile.preferences.quality}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="480p">480p</SelectItem>
                      <SelectItem value="720p">720p</SelectItem>
                      <SelectItem value="1080p">1080p</SelectItem>
                      <SelectItem value="4K">4K</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Privacy */}
                <div>
                  <label className="text-sm font-medium mb-2 block">الخصوصية</label>
                  <Select value={profile.preferences.privacy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">عام</SelectItem>
                      <SelectItem value="friends">الأصدقاء</SelectItem>
                      <SelectItem value="private">خاص</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Toggles */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      <span className="text-sm">الإشعارات</span>
                    </div>
                    <Switch checked={profile.preferences.notifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      <span className="text-sm">التشغيل التلقائي</span>
                    </div>
                    <Switch checked={profile.preferences.autoplay} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  أمان الحساب
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  تغيير كلمة المرور
                </Button>
                <Button variant="outline" className="w-full">
                  تفعيل المصادقة الثنائية
                </Button>
                <Button variant="outline" className="w-full">
                  إدارة الأجهزة
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}