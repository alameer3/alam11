'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell,
  Send,
  Users,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Settings,
  BarChart3,
  Smartphone,
  Globe
} from 'lucide-react';

interface PushNotification {
  id: string;
  title: string;
  body: string;
  image?: string;
  url?: string;
  targetAudience: 'all' | 'subscribers' | 'premium' | 'custom';
  customFilters?: string[];
  scheduledAt?: string;
  sentAt?: string;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  sentCount: number;
  openedCount: number;
  clickRate: number;
}

interface NotificationTemplate {
  id: string;
  name: string;
  title: string;
  body: string;
  category: string;
  isActive: boolean;
  usageCount: number;
}

interface DeviceToken {
  id: string;
  userId: string;
  userName: string;
  token: string;
  platform: 'web' | 'ios' | 'android';
  lastSeen: string;
  isActive: boolean;
}

export default function PushNotifications() {
  const [notifications, setNotifications] = useState<PushNotification[]>([]);
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [deviceTokens, setDeviceTokens] = useState<DeviceToken[]>([]);
  const [selectedTab, setSelectedTab] = useState('compose');
  const [fcmConfig, setFcmConfig] = useState({
    apiKey: 'your-fcm-api-key',
    projectId: 'your-project-id',
    messagingSenderId: 'your-sender-id',
    appId: 'your-app-id'
  });

  useEffect(() => {
    // Load notification data
    setNotifications([
      {
        id: '1',
        title: 'فيلم جديد متاح الآن!',
        body: 'شاهد أحدث الأفلام المضافة إلى مكتبتنا',
        image: '/notifications/new-movie.jpg',
        url: '/movies/new',
        targetAudience: 'all',
        scheduledAt: '2024-01-20T10:00:00',
        status: 'scheduled',
        sentCount: 0,
        openedCount: 0,
        clickRate: 0
      },
      {
        id: '2',
        title: 'خصم خاص للمشتركين المميزين',
        body: 'احصل على خصم 50% على جميع الخطط السنوية',
        targetAudience: 'premium',
        sentAt: '2024-01-19T15:30:00',
        status: 'sent',
        sentCount: 1250,
        openedCount: 890,
        clickRate: 71.2
      }
    ]);

    setTemplates([
      {
        id: '1',
        name: 'ترحيب بالمستخدمين الجدد',
        title: 'مرحباً بك في منصتنا!',
        body: 'نشكرك على الانضمام إلينا. استمتع بمشاهدة أفضل المحتوى.',
        category: 'welcome',
        isActive: true,
        usageCount: 45
      },
      {
        id: '2',
        name: 'إشعار فيلم جديد',
        title: 'فيلم جديد متاح الآن!',
        body: 'شاهد أحدث الأفلام المضافة إلى مكتبتنا',
        category: 'content',
        isActive: true,
        usageCount: 23
      }
    ]);

    setDeviceTokens([
      {
        id: '1',
        userId: 'user1',
        userName: 'أحمد محمد',
        token: 'fcm-token-123456789',
        platform: 'web',
        lastSeen: '2024-01-20T10:30:00',
        isActive: true
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'سارة أحمد',
        token: 'fcm-token-987654321',
        platform: 'ios',
        lastSeen: '2024-01-20T09:15:00',
        isActive: true
      }
    ]);
  }, []);

  const [newNotification, setNewNotification] = useState({
    title: '',
    body: '',
    image: '',
    url: '',
    targetAudience: 'all' as const,
    scheduledAt: '',
    customFilters: []
  });

  const handleSendNotification = () => {
    // // console.log('Sending notification:', newNotification);
    // FCM sending logic
  };

  const handleScheduleNotification = () => {
    // // console.log('Scheduling notification:', newNotification);
    // Schedule notification logic
  };

  const testFCMConnection = () => {
    // // console.log('Testing FCM connection...');
    // Test FCM connection
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">إشعارات Push</h1>
          <p className="text-gray-600">إدارة إشعارات Firebase Cloud Messaging</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={testFCMConnection}>
            <Settings className="h-4 w-4 mr-2" />
            اختبار الاتصال
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            إشعار جديد
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الأجهزة النشطة</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-xs text-muted-foreground">+8% من الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الإشعارات المرسلة</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,230</div>
            <p className="text-xs text-muted-foreground">+15% من الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">معدل الفتح</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.5%</div>
            <p className="text-xs text-muted-foreground">+3% من الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">معدل النقر</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.3%</div>
            <p className="text-xs text-muted-foreground">+2% من الشهر الماضي</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="compose">إنشاء إشعار</TabsTrigger>
          <TabsTrigger value="scheduled">المجدولة</TabsTrigger>
          <TabsTrigger value="templates">القوالب</TabsTrigger>
          <TabsTrigger value="devices">الأجهزة</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        {/* Compose Tab */}
        <TabsContent value="compose" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>إنشاء إشعار جديد</CardTitle>
                  <CardDescription>إنشاء وإرسال إشعارات Push للمستخدمين</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">عنوان الإشعار</Label>
                    <Input
                      id="title"
                      value={newNotification.title}
                      onChange={(e) => setNewNotification(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="أدخل عنوان الإشعار"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="body">محتوى الإشعار</Label>
                    <Textarea
                      id="body"
                      value={newNotification.body}
                      onChange={(e) => setNewNotification(prev => ({ ...prev, body: e.target.value }))}
                      placeholder="أدخل محتوى الإشعار"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="image">رابط الصورة (اختياري)</Label>
                      <Input
                        id="image"
                        value={newNotification.image}
                        onChange={(e) => setNewNotification(prev => ({ ...prev, image: e.target.value }))}
                        placeholder="رابط الصورة"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="url">رابط التوجيه (اختياري)</Label>
                      <Input
                        id="url"
                        value={newNotification.url}
                        onChange={(e) => setNewNotification(prev => ({ ...prev, url: e.target.value }))}
                        placeholder="رابط التوجيه"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="target">الجمهور المستهدف</Label>
                    <Select value={newNotification.targetAudience} onValueChange={(value: any) => setNewNotification(prev => ({ ...prev, targetAudience: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع المستخدمين</SelectItem>
                        <SelectItem value="subscribers">المشتركين فقط</SelectItem>
                        <SelectItem value="premium">المشتركين المميزين</SelectItem>
                        <SelectItem value="custom">جمهور مخصص</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schedule">جدولة الإرسال (اختياري)</Label>
                    <Input
                      id="schedule"
                      type="datetime-local"
                      value={newNotification.scheduledAt}
                      onChange={(e) => setNewNotification(prev => ({ ...prev, scheduledAt: e.target.value }))}
                    />
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button onClick={handleSendNotification} className="flex-1">
                      <Send className="h-4 w-4 mr-2" />
                      إرسال فوري
                    </Button>
                    <Button onClick={handleScheduleNotification} variant="outline" className="flex-1">
                      <Clock className="h-4 w-4 mr-2" />
                      جدولة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>معاينة الإشعار</CardTitle>
                  <CardDescription>كيف سيظهر الإشعار للمستخدمين</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start space-x-3">
                      {newNotification.image && (
                        <img src={newNotification.image} alt="Notification" className="w-12 h-12 rounded object-cover" />
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{newNotification.title || 'عنوان الإشعار'}</h4>
                        <p className="text-sm text-gray-600 mt-1">{newNotification.body || 'محتوى الإشعار'}</p>
                        <p className="text-xs text-gray-500 mt-2">الآن</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Scheduled Tab */}
        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>الإشعارات المجدولة</CardTitle>
              <CardDescription>الإشعارات المبرمجة للإرسال</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.filter(n => n.status === 'scheduled').map((notification) => (
                  <div key={notification.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{notification.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{notification.body}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>الجمهور: {notification.targetAudience}</span>
                          <span>الموعد: {notification.scheduledAt}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>قوالب الإشعارات</CardTitle>
                  <CardDescription>إدارة قوالب الإشعارات الجاهزة</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة قالب جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{template.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{template.title}</p>
                        <p className="text-sm text-gray-500 mt-1">{template.body}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="outline">{template.category}</Badge>
                          <span className="text-sm text-gray-500">استخدام: {template.usageCount}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Devices Tab */}
        <TabsContent value="devices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>أجهزة المستخدمين</CardTitle>
              <CardDescription>إدارة أجهزة المستخدمين المسجلة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deviceTokens.map((device) => (
                  <div key={device.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Smartphone className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{device.userName}</h3>
                          <p className="text-sm text-gray-600">{device.platform}</p>
                          <p className="text-xs text-gray-500">آخر ظهور: {device.lastSeen}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={device.isActive ? 'default' : 'secondary'}>
                          {device.isActive ? 'نشط' : 'غير نشط'}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تحليلات الإشعارات</CardTitle>
              <CardDescription>إحصائيات وأداء الإشعارات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.filter(n => n.status === 'sent').map((notification) => (
                  <div key={notification.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{notification.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{notification.body}</p>
                        <div className="grid grid-cols-3 gap-4 mt-3">
                          <div>
                            <p className="text-sm text-gray-500">المرسل</p>
                            <p className="font-semibold">{notification.sentCount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">المفتوح</p>
                            <p className="font-semibold">{notification.openedCount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">معدل النقر</p>
                            <p className="font-semibold">{notification.clickRate}%</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">تاريخ الإرسال</p>
                        <p className="font-semibold">{notification.sentAt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}