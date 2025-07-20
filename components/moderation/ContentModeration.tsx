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
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Users,
  Filter,
  Search,
  Settings,
  Flag,
  Shield,
  Ban,
  Play,
  Pause,
  Edit,
  Trash2,
  MessageSquare,
  History
} from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  type: 'video' | 'image' | 'text' | 'audio';
  uploader: string;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  tags: string[];
  thumbnail?: string;
  duration?: string;
  fileSize: number;
  flags: Flag[];
  moderator?: string;
  reviewDate?: string;
  notes?: string;
}

interface Flag {
  id: string;
  type: 'inappropriate' | 'copyright' | 'spam' | 'violence' | 'other';
  reason: string;
  reporter: string;
  date: string;
  severity: 'low' | 'medium' | 'high';
}

interface ModerationRule {
  id: string;
  name: string;
  category: string;
  conditions: string[];
  action: 'auto_approve' | 'auto_reject' | 'flag_for_review';
  isActive: boolean;
  priority: number;
}

export default function ContentModeration() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [moderationRules, setModerationRules] = useState<ModerationRule[]>([]);
  const [selectedTab, setSelectedTab] = useState('queue');
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    type: 'all',
    category: 'all'
  });

  useEffect(() => {
    // Load moderation data
    setContentItems([
      {
        id: '1',
        title: 'فيلم أكشن جديد 2024',
        type: 'video',
        uploader: 'أحمد محمد',
        uploadDate: '2024-01-20T10:30:00',
        status: 'pending',
        priority: 'high',
        category: 'entertainment',
        tags: ['أكشن', 'مغامرة'],
        thumbnail: '/thumbnails/movie1.jpg',
        duration: '2:15:30',
        fileSize: 2048576,
        flags: [
          {
            id: '1',
            type: 'inappropriate',
            reason: 'محتوى غير مناسب للعائلة',
            reporter: 'مستخدم مجهول',
            date: '2024-01-20T11:00:00',
            severity: 'high'
          }
        ]
      },
      {
        id: '2',
        title: 'مسلسل درامي حصري',
        type: 'video',
        uploader: 'سارة أحمد',
        uploadDate: '2024-01-19T15:20:00',
        status: 'approved',
        priority: 'medium',
        category: 'drama',
        tags: ['دراما', 'رومانسي'],
        thumbnail: '/thumbnails/series1.jpg',
        duration: '45:20',
        fileSize: 1048576,
        flags: [],
        moderator: 'محمد علي',
        reviewDate: '2024-01-19T16:30:00',
        notes: 'محتوى مناسب، تمت الموافقة'
      },
      {
        id: '3',
        title: 'صورة غير مناسبة',
        type: 'image',
        uploader: 'مستخدم مجهول',
        uploadDate: '2024-01-20T09:15:00',
        status: 'rejected',
        priority: 'urgent',
        category: 'other',
        tags: [],
        fileSize: 512000,
        flags: [
          {
            id: '2',
            type: 'inappropriate',
            reason: 'محتوى صريح',
            reporter: 'نظام تلقائي',
            date: '2024-01-20T09:16:00',
            severity: 'high'
          }
        ],
        moderator: 'فاطمة حسن',
        reviewDate: '2024-01-20T09:30:00',
        notes: 'محتوى مخالف للسياسات، تم الرفض'
      }
    ]);

    setModerationRules([
      {
        id: '1',
        name: 'فلترة المحتوى الصريح',
        category: 'inappropriate',
        conditions: ['كلمات ممنوعة', 'صور صريحة', 'عنف'],
        action: 'auto_reject',
        isActive: true,
        priority: 1
      },
      {
        id: '2',
        name: 'مراجعة المحتوى المميز',
        category: 'featured',
        conditions: ['محتوى مميز', 'عالي الجودة'],
        action: 'flag_for_review',
        isActive: true,
        priority: 2
      },
      {
        id: '3',
        name: 'موافقة تلقائية للمستخدمين الموثوقين',
        category: 'trusted_users',
        conditions: ['مستخدم موثوق', 'سجل نظيف'],
        action: 'auto_approve',
        isActive: true,
        priority: 3
      }
    ]);
  }, []);

  const handleModerationAction = (contentId: string, action: 'approve' | 'reject' | 'flag', notes?: string) => {
    setContentItems(prev => prev.map(item => {
      if (item.id === contentId) {
        return {
          ...item,
          status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'flagged',
          moderator: 'المشرف الحالي',
          reviewDate: new Date().toISOString(),
          notes: notes || ''
        };
      }
      return item;
    }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'flagged': return 'bg-orange-100 text-orange-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFlagColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredContent = contentItems.filter(item => {
    if (filters.status !== 'all' && item.status !== filters.status) return false;
    if (filters.priority !== 'all' && item.priority !== filters.priority) return false;
    if (filters.type !== 'all' && item.type !== filters.type) return false;
    if (filters.category !== 'all' && item.category !== filters.category) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">مراجعة المحتوى</h1>
          <p className="text-gray-600">إدارة ومراجعة المحتوى المرفوع</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            إعدادات المراجعة
          </Button>
          <Button>
            <Shield className="h-4 w-4 mr-2" />
            قواعد المراجعة
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">في انتظار المراجعة</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contentItems.filter(item => item.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">+5 من اليوم</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">تمت الموافقة</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contentItems.filter(item => item.status === 'approved').length}
            </div>
            <p className="text-xs text-muted-foreground">+12 من اليوم</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">مرفوض</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contentItems.filter(item => item.status === 'rejected').length}
            </div>
            <p className="text-xs text-muted-foreground">+3 من اليوم</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">مُعلم</CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contentItems.filter(item => item.status === 'flagged').length}
            </div>
            <p className="text-xs text-muted-foreground">+2 من اليوم</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="queue">قائمة المراجعة</TabsTrigger>
          <TabsTrigger value="rules">قواعد المراجعة</TabsTrigger>
          <TabsTrigger value="history">سجل المراجعات</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        {/* Queue Tab */}
        <TabsContent value="queue" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>فلاتر البحث</CardTitle>
              <CardDescription>تصفية المحتوى حسب المعايير</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>الحالة</Label>
                  <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الحالات</SelectItem>
                      <SelectItem value="pending">في الانتظار</SelectItem>
                      <SelectItem value="approved">تمت الموافقة</SelectItem>
                      <SelectItem value="rejected">مرفوض</SelectItem>
                      <SelectItem value="flagged">مُعلم</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>الأولوية</Label>
                  <Select value={filters.priority} onValueChange={(value) => setFilters(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأولويات</SelectItem>
                      <SelectItem value="urgent">عاجل</SelectItem>
                      <SelectItem value="high">عالي</SelectItem>
                      <SelectItem value="medium">متوسط</SelectItem>
                      <SelectItem value="low">منخفض</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>النوع</Label>
                  <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأنواع</SelectItem>
                      <SelectItem value="video">فيديو</SelectItem>
                      <SelectItem value="image">صورة</SelectItem>
                      <SelectItem value="text">نص</SelectItem>
                      <SelectItem value="audio">صوت</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>الفئة</Label>
                  <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الفئات</SelectItem>
                      <SelectItem value="entertainment">ترفيه</SelectItem>
                      <SelectItem value="drama">دراما</SelectItem>
                      <SelectItem value="news">أخبار</SelectItem>
                      <SelectItem value="sports">رياضة</SelectItem>
                      <SelectItem value="other">أخرى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content List */}
          <Card>
            <CardHeader>
              <CardTitle>قائمة المراجعة</CardTitle>
              <CardDescription>مراجعة المحتوى المرفوع</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredContent.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-32 h-20 bg-gray-100 rounded flex items-center justify-center">
                        {item.thumbnail ? (
                          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover rounded" />
                        ) : (
                          <div className="text-center">
                            <div className="text-2xl mb-1">
                              {item.type === 'video' ? '🎥' : item.type === 'image' ? '🖼️' : item.type === 'audio' ? '🎵' : '📄'}
                            </div>
                            <div className="text-xs text-gray-500">{item.type}</div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">بواسطة: {item.uploader}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span>{item.uploadDate}</span>
                              <span>{formatFileSize(item.fileSize)}</span>
                              {item.duration && <span>{item.duration}</span>}
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge className={getPriorityColor(item.priority)}>
                                {item.priority}
                              </Badge>
                              <Badge className={getStatusColor(item.status)}>
                                {item.status === 'pending' ? 'في الانتظار' : 
                                 item.status === 'approved' ? 'تمت الموافقة' : 
                                 item.status === 'rejected' ? 'مرفوض' : 'مُعلم'}
                              </Badge>
                              <Badge variant="outline">{item.category}</Badge>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {item.status === 'pending' && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleModerationAction(item.id, 'approve', 'محتوى مناسب')}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleModerationAction(item.id, 'reject', 'محتوى مخالف')}
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Flags */}
                        {item.flags.length > 0 && (
                          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
                            <h4 className="font-medium text-red-800 mb-2">تحذيرات:</h4>
                            {item.flags.map((flag) => (
                              <div key={flag.id} className="flex items-center space-x-2 text-sm">
                                <Badge className={getFlagColor(flag.severity)}>
                                  {flag.type}
                                </Badge>
                                <span className="text-red-700">{flag.reason}</span>
                                <span className="text-gray-500">- {flag.reporter}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Review Notes */}
                        {item.notes && (
                          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                            <h4 className="font-medium text-blue-800 mb-1">ملاحظات المراجعة:</h4>
                            <p className="text-sm text-blue-700">{item.notes}</p>
                            {item.moderator && (
                              <p className="text-xs text-blue-600 mt-1">بواسطة: {item.moderator}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rules Tab */}
        <TabsContent value="rules" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>قواعد المراجعة</CardTitle>
                  <CardDescription>إدارة قواعد المراجعة التلقائية</CardDescription>
                </div>
                <Button>
                  <Settings className="h-4 w-4 mr-2" />
                  إضافة قاعدة جديدة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {moderationRules.map((rule) => (
                  <div key={rule.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{rule.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">الفئة: {rule.category}</p>
                        <div className="mt-2">
                          <p className="text-sm font-medium">الشروط:</p>
                          <ul className="text-sm text-gray-600 mt-1">
                            {rule.conditions.map((condition, index) => (
                              <li key={index}>• {condition}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="outline">
                            {rule.action === 'auto_approve' ? 'موافقة تلقائية' : 
                             rule.action === 'auto_reject' ? 'رفض تلقائي' : 'علامة للمراجعة'}
                          </Badge>
                          <Badge variant="secondary">الأولوية: {rule.priority}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch checked={rule.isActive} />
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>سجل المراجعات</CardTitle>
              <CardDescription>تاريخ مراجعات المحتوى</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contentItems.filter(item => item.moderator).map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">بواسطة: {item.uploader}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>تمت المراجعة: {item.reviewDate}</span>
                          <span>بواسطة: {item.moderator}</span>
                        </div>
                        {item.notes && (
                          <p className="text-sm text-gray-700 mt-2">{item.notes}</p>
                        )}
                      </div>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status === 'approved' ? 'تمت الموافقة' : 
                         item.status === 'rejected' ? 'مرفوض' : 'مُعلم'}
                      </Badge>
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
              <CardTitle>إعدادات المراجعة</CardTitle>
              <CardDescription>تكوين إعدادات نظام المراجعة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>تفعيل المراجعة التلقائية</Label>
                <Switch defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label>إشعارات المراجعة</Label>
                <Switch defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label>الحد الأقصى للمراجعات اليومية</Label>
                <Input type="number" defaultValue={100} />
              </div>
              
              <div className="space-y-2">
                <Label>وقت الاستجابة المطلوب (بالساعات)</Label>
                <Input type="number" defaultValue={24} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}