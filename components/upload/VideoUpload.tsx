'use client';

import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload,
  Video,
  File,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Play,
  Pause,
  Trash2,
  Edit,
  Eye,
  Download,
  Share,
  Settings,
  Clock,
  HardDrive
} from 'lucide-react';

interface UploadedVideo {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileSize: number;
  duration: string;
  thumbnail: string;
  status: 'uploading' | 'processing' | 'completed' | 'failed' | 'pending_review';
  progress: number;
  uploadDate: string;
  category: string;
  tags: string[];
  isPublic: boolean;
  views: number;
  likes: number;
}

interface UploadStats {
  totalUploads: number;
  totalSize: number;
  processingCount: number;
  completedCount: number;
  failedCount: number;
}

export default function VideoUpload() {
  const [uploadedVideos, setUploadedVideos] = useState<UploadedVideo[]>([]);
  const [uploadStats, setUploadStats] = useState<UploadStats>({
    totalUploads: 0,
    totalSize: 0,
    processingCount: 0,
    completedCount: 0,
    failedCount: 0
  });
  const [selectedTab, setSelectedTab] = useState('upload');
  const [dragActive, setDragActive] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    category: '',
    tags: [],
    isPublic: true
  });

  // Simulate upload progress
  const simulateUpload = useCallback((file: File) => {
    const videoId = `video-${Date.now()}`;
    const newVideo: UploadedVideo = {
      id: videoId,
      title: file.name.replace(/\.[^/.]+$/, ''),
      description: '',
      fileName: file.name,
      fileSize: file.size,
      duration: '00:00:00',
      thumbnail: '',
      status: 'uploading',
      progress: 0,
      uploadDate: new Date().toISOString(),
      category: '',
      tags: [],
      isPublic: true,
      views: 0,
      likes: 0
    };

    setUploadedVideos(prev => [newVideo, ...prev]);

    const interval = setInterval(() => {
      setUploadedVideos(prev => prev.map(video => {
        if (video.id === videoId) {
          const newProgress = video.progress + Math.random() * 10;
          if (newProgress >= 100) {
            clearInterval(interval);
            return { ...video, progress: 100, status: 'processing' };
          }
          return { ...video, progress: newProgress };
        }
        return video;
      }));
    }, 500);

    // Simulate processing completion
    setTimeout(() => {
      setUploadedVideos(prev => prev.map(video => 
        video.id === videoId 
          ? { ...video, status: 'pending_review' }
          : video
      ));
    }, 5000);
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      const videoFiles = files.filter(file => file.type.startsWith('video/'));
      videoFiles.forEach(file => simulateUpload(file));
    }
  }, [simulateUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files);
      const videoFiles = files.filter(file => file.type.startsWith('video/'));
      videoFiles.forEach(file => simulateUpload(file));
    }
  }, [simulateUpload]);

  const handleVideoAction = (videoId: string, action: 'edit' | 'delete' | 'publish' | 'preview') => {
    console.log(`Video ${videoId} action: ${action}`);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending_review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'مكتمل';
      case 'processing': return 'قيد المعالجة';
      case 'failed': return 'فشل';
      case 'pending_review': return 'في انتظار المراجعة';
      case 'uploading': return 'قيد الرفع';
      default: return 'غير معروف';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">رفع الفيديوهات</h1>
          <p className="text-gray-600">رفع وإدارة الفيديوهات الخاصة بك</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            الإعدادات
          </Button>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            رفع فيديو جديد
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الرفوعات</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uploadStats.totalUploads}</div>
            <p className="text-xs text-muted-foreground">+12% من الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الحجم</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatFileSize(uploadStats.totalSize)}</div>
            <p className="text-xs text-muted-foreground">+8% من الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">قيد المعالجة</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uploadStats.processingCount}</div>
            <p className="text-xs text-muted-foreground">فيديوهات في الانتظار</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المكتملة</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uploadStats.completedCount}</div>
            <p className="text-xs text-muted-foreground">فيديوهات منشورة</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upload">رفع جديد</TabsTrigger>
          <TabsTrigger value="my-videos">فيديوهاتي</TabsTrigger>
          <TabsTrigger value="processing">قيد المعالجة</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        {/* Upload Tab */}
        <TabsContent value="upload" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>رفع فيديو جديد</CardTitle>
                <CardDescription>اسحب وأفلت الفيديو أو انقر للاختيار</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">اسحب الفيديو هنا</h3>
                  <p className="text-gray-500 mb-4">أو انقر للاختيار من جهازك</p>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    اختيار ملف
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <div className="mt-4 text-sm text-gray-500">
                    <p>الحد الأقصى: 2GB</p>
                    <p>الصيغ المدعومة: MP4, AVI, MOV, MKV</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>تفاصيل الفيديو</CardTitle>
                <CardDescription>أدخل معلومات الفيديو</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">عنوان الفيديو</Label>
                  <Input
                    id="title"
                    value={newVideo.title}
                    onChange={(e) => setNewVideo(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="أدخل عنوان الفيديو"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">وصف الفيديو</Label>
                  <Textarea
                    id="description"
                    value={newVideo.description}
                    onChange={(e) => setNewVideo(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="أدخل وصف الفيديو"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">الفئة</Label>
                  <Select value={newVideo.category} onValueChange={(value) => setNewVideo(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entertainment">ترفيه</SelectItem>
                      <SelectItem value="education">تعليمي</SelectItem>
                      <SelectItem value="news">أخبار</SelectItem>
                      <SelectItem value="sports">رياضة</SelectItem>
                      <SelectItem value="music">موسيقى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newVideo.isPublic}
                    onCheckedChange={(checked) => setNewVideo(prev => ({ ...prev, isPublic: checked }))}
                  />
                  <Label>فيديو عام</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* My Videos Tab */}
        <TabsContent value="my-videos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>فيديوهاتي</CardTitle>
              <CardDescription>إدارة الفيديوهات المرفوعة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadedVideos.filter(video => video.status === 'completed' || video.status === 'pending_review').map((video) => (
                  <div key={video.id} className="border rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-32 h-20 bg-gray-100 rounded flex items-center justify-center">
                        {video.thumbnail ? (
                          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover rounded" />
                        ) : (
                          <Video className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{video.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{video.description}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span>{formatFileSize(video.fileSize)}</span>
                              <span>{video.duration}</span>
                              <span>{video.views} مشاهدة</span>
                              <span>{video.likes} إعجاب</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(video.status)}>
                              {getStatusText(video.status)}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Processing Tab */}
        <TabsContent value="processing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>الفيديوهات قيد المعالجة</CardTitle>
              <CardDescription>الفيديوهات التي يتم معالجتها حالياً</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadedVideos.filter(video => video.status === 'uploading' || video.status === 'processing').map((video) => (
                  <div key={video.id} className="border rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-32 h-20 bg-gray-100 rounded flex items-center justify-center">
                        <Video className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{video.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{video.fileName}</p>
                            <div className="mt-3">
                              <div className="flex justify-between text-sm text-gray-500 mb-1">
                                <span>{getStatusText(video.status)}</span>
                                <span>{Math.round(video.progress)}%</span>
                              </div>
                              <Progress value={video.progress} className="h-2" />
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(video.status)}>
                              {getStatusText(video.status)}
                            </Badge>
                          </div>
                        </div>
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
              <CardTitle>إعدادات الرفع</CardTitle>
              <CardDescription>تكوين إعدادات رفع الفيديوهات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>الحد الأقصى لحجم الملف</Label>
                <Select defaultValue="2gb">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500mb">500 MB</SelectItem>
                    <SelectItem value="1gb">1 GB</SelectItem>
                    <SelectItem value="2gb">2 GB</SelectItem>
                    <SelectItem value="5gb">5 GB</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>جودة الفيديو الافتراضية</Label>
                <Select defaultValue="1080p">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="480p">480p</SelectItem>
                    <SelectItem value="720p">720p</SelectItem>
                    <SelectItem value="1080p">1080p</SelectItem>
                    <SelectItem value="4k">4K</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>تفعيل المعالجة التلقائية</Label>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>إرسال إشعار عند اكتمال المعالجة</Label>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}