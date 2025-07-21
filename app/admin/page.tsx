'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Film, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  totalVideos: number;
  totalRevenue: number;
  activeSubscriptions: number;
  pendingReports: number;
  uploadsToday: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'suspended' | 'pending';
  joinDate: string;
  lastLogin: string;
}

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  status: 'published' | 'pending' | 'rejected';
  uploadDate: string;
  uploader: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalVideos: 0,
    totalRevenue: 0,
    activeSubscriptions: 0,
    pendingReports: 0,
    uploadsToday: 0
  });

  const [users, setUsers] = useState<User[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    // Simulate loading admin data
    setStats({
      totalUsers: 15420,
      totalVideos: 8920,
      totalRevenue: 45678.90,
      activeSubscriptions: 3420,
      pendingReports: 23,
      uploadsToday: 156
    });

    setUsers([
      {
        id: '1',
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
        avatar: '/avatars/ahmed.jpg',
        role: 'user',
        status: 'active',
        joinDate: '2024-01-15',
        lastLogin: '2024-01-20'
      },
      {
        id: '2',
        name: 'سارة أحمد',
        email: 'sara@example.com',
        avatar: '/avatars/sara.jpg',
        role: 'moderator',
        status: 'active',
        joinDate: '2023-12-10',
        lastLogin: '2024-01-20'
      }
    ]);

    setVideos([
      {
        id: '1',
        title: 'فيلم أكشن جديد 2024',
        thumbnail: '/thumbnails/movie1.jpg',
        duration: '2:15:30',
        views: 15420,
        likes: 892,
        status: 'published',
        uploadDate: '2024-01-20',
        uploader: 'أحمد محمد'
      },
      {
        id: '2',
        title: 'مسلسل درامي حصري',
        thumbnail: '/thumbnails/series1.jpg',
        duration: '45:20',
        views: 8920,
        likes: 456,
        status: 'pending',
        uploadDate: '2024-01-19',
        uploader: 'سارة أحمد'
      }
    ]);
  }, []);

  const handleUserAction = (userId: string, action: 'suspend' | 'activate' | 'delete') => {
    // Handle user management actions
    // console.log(`User ${userId} action: ${action}`);
  };

  const handleVideoAction = (videoId: string, action: 'approve' | 'reject' | 'delete') => {
    // Handle video moderation actions
    // console.log(`Video ${videoId} action: ${action}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">لوحة تحكم المشرف</h1>
          <p className="text-gray-600 mt-2">إدارة المحتوى والمستخدمين والإحصائيات</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% من الشهر الماضي</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الفيديوهات</CardTitle>
              <Film className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVideos.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% من الشهر الماضي</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+15% من الشهر الماضي</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الاشتراكات النشطة</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeSubscriptions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+5% من الشهر الماضي</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">التقارير المعلقة</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingReports}</div>
              <p className="text-xs text-muted-foreground">تتطلب مراجعة</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الرفوعات اليوم</CardTitle>
              <Plus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.uploadsToday}</div>
              <p className="text-xs text-muted-foreground">+23% من أمس</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="users">المستخدمين</TabsTrigger>
            <TabsTrigger value="content">المحتوى</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>النشاط الأخير</CardTitle>
                  <CardDescription>آخر الأنشطة في النظام</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/avatars/user${i}.jpg`} />
                          <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">مستخدم جديد انضم للنظام</p>
                          <p className="text-xs text-muted-foreground">منذ {i} دقائق</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>إحصائيات سريعة</CardTitle>
                  <CardDescription>أداء النظام الحالي</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>معدل المشاهدة</span>
                      <span className="font-medium">89%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>معدل الإشتراك</span>
                      <span className="font-medium">12.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>وقت الاستجابة</span>
                      <span className="font-medium">1.2s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>معدل الخطأ</span>
                      <span className="font-medium">0.1%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>إدارة المستخدمين</CardTitle>
                    <CardDescription>عرض وإدارة جميع المستخدمين</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة مستخدم
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.status === 'active' ? 'نشط' : user.status === 'suspended' ? 'معلق' : 'معلق'}
                        </Badge>
                        <Badge variant="outline">{user.role}</Badge>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, 'suspend')}>
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>إدارة المحتوى</CardTitle>
                    <CardDescription>مراجعة وإدارة الفيديوهات المرفوعة</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة محتوى
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {videos.map((video) => (
                    <div key={video.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img src={video.thumbnail} alt={video.title} className="w-16 h-12 object-cover rounded" />
                        <div>
                          <p className="font-medium">{video.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {video.views.toLocaleString()} مشاهدة • {video.likes} إعجاب
                          </p>
                          <p className="text-xs text-muted-foreground">بواسطة {video.uploader}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={video.status === 'published' ? 'default' : video.status === 'pending' ? 'secondary' : 'destructive'}>
                          {video.status === 'published' ? 'منشور' : video.status === 'pending' ? 'معلق' : 'مرفوض'}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleVideoAction(video.id, 'approve')}>
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleVideoAction(video.id, 'reject')}>
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>التقارير والبلاغات</CardTitle>
                <CardDescription>مراجعة البلاغات المرفوعة من المستخدمين</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">بلاغ على فيديو #{i}</p>
                          <p className="text-sm text-muted-foreground">محتوى غير مناسب</p>
                          <p className="text-xs text-muted-foreground">منذ {i} ساعة</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات النظام</CardTitle>
                <CardDescription>تكوين إعدادات النظام العامة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>تفعيل التسجيل الجديد</Label>
                      <p className="text-sm text-muted-foreground">السماح للمستخدمين الجدد بالتسجيل</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>مراجعة المحتوى</Label>
                      <p className="text-sm text-muted-foreground">مراجعة المحتوى قبل النشر</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>إشعارات البريد الإلكتروني</Label>
                      <p className="text-sm text-muted-foreground">إرسال إشعارات عبر البريد الإلكتروني</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>وضع الصيانة</Label>
                      <p className="text-sm text-muted-foreground">إيقاف الموقع للصيانة</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}