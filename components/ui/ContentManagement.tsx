'use client';

import { useState } from 'react';
import { 
  Upload, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Play, 
  Pause, 
  Settings,
  Tag,
  Calendar,
  Clock,
  Users,
  BarChart3,
  FileText,
  Image,
  Video,
  Music,
  Globe,
  Lock,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  visibility: 'public' | 'private' | 'unlisted';
  uploadDate: string;
  duration: string;
  size: string;
  views: number;
  likes: number;
  thumbnail?: string;
  videoUrl?: string;
}

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const mockContent: ContentItem[] = [
    {
      id: '1',
      title: 'فيلم الأكشن الجديد',
      description: 'فيلم أكشن مثير مليء بالمشاهد المذهلة',
      category: 'أفلام',
      tags: ['أكشن', 'مغامرة', '2024'],
      status: 'published',
      visibility: 'public',
      uploadDate: '2024-01-15',
      duration: '2:15:30',
      size: '2.5 GB',
      views: 15420,
      likes: 892,
      thumbnail: '/api/placeholder/300/200',
      videoUrl: '/videos/action-movie.mp4'
    },
    {
      id: '2',
      title: 'مسلسل درامي',
      description: 'مسلسل درامي عائلي مليء بالأحداث المثيرة',
      category: 'مسلسلات',
      tags: ['دراما', 'عائلي', 'عربي'],
      status: 'published',
      visibility: 'public',
      uploadDate: '2024-01-10',
      duration: '45:30',
      size: '800 MB',
      views: 8920,
      likes: 456,
      thumbnail: '/api/placeholder/300/200',
      videoUrl: '/videos/drama-series.mp4'
    },
    {
      id: '3',
      title: 'وثائقي طبيعي',
      description: 'وثائقي عن الحياة البرية والطبيعة',
      category: 'وثائقيات',
      tags: ['طبيعة', 'حياة برية', 'تعليمي'],
      status: 'draft',
      visibility: 'private',
      uploadDate: '2024-01-08',
      duration: '1:30:00',
      size: '1.2 GB',
      views: 0,
      likes: 0,
      thumbnail: '/api/placeholder/300/200',
      videoUrl: '/videos/nature-doc.mp4'
    }
  ];

  const categories = [
    'أفلام', 'مسلسلات', 'وثائقيات', 'برامج', 'أطفال', 'رياضة', 'موسيقى', 'تعليمي'
  ];

  const statuses = [
    { value: 'draft', label: 'مسودة', color: 'bg-gray-100 text-gray-800' },
    { value: 'published', label: 'منشور', color: 'bg-green-100 text-green-800' },
    { value: 'archived', label: 'مؤرشف', color: 'bg-yellow-100 text-yellow-800' }
  ];

  const visibilities = [
    { value: 'public', label: 'عام', icon: Globe },
    { value: 'private', label: 'خاص', icon: Lock },
    { value: 'unlisted', label: 'غير مدرج', icon: EyeOff }
  ];

  const tabs = [
    { id: 'upload', label: 'رفع محتوى', icon: Upload },
    { id: 'manage', label: 'إدارة المحتوى', icon: Settings },
    { id: 'analytics', label: 'التحليلات', icon: BarChart3 },
    { id: 'settings', label: 'الإعدادات', icon: Settings }
  ];

  const handleUpload = () => {
    setIsUploading(true);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleContentAction = (action: string, contentId: string) => {
    // // console.log(`${action} content ${contentId}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">إدارة المحتوى</h1>
        <p className="text-gray-600 dark:text-gray-400">
          رفع وإدارة وتنظيم المحتوى الخاص بك
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 space-x-reverse px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 space-x-reverse ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">رفع ملف فيديو</h3>
                <p className="text-gray-500 mb-4">
                  اسحب وأفلت الملف هنا أو انقر للاختيار
                </p>
                <div className="space-y-4">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    اختيار ملف
                  </button>
                  <div className="text-sm text-gray-500">
                    يدعم: MP4, AVI, MOV, MKV (الحد الأقصى: 10GB)
                  </div>
                </div>
              </div>

              {isUploading && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">جاري الرفع...</span>
                    <span className="text-sm text-gray-500">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">تفاصيل المحتوى</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        العنوان
                      </label>
                      <input
                        type="text"
                        placeholder="أدخل عنوان المحتوى"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        الوصف
                      </label>
                      <textarea
                        rows={4}
                        placeholder="أدخل وصف المحتوى"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        الفئة
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>اختر الفئة</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        الكلمات المفتاحية
                      </label>
                      <input
                        type="text"
                        placeholder="أكشن، مغامرة، 2024"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">إعدادات النشر</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        الحالة
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        {statuses.map(status => (
                          <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        الرؤية
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        {visibilities.map(visibility => (
                          <option key={visibility.value} value={visibility.value}>{visibility.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        تاريخ النشر
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input type="checkbox" id="comments" className="rounded" />
                      <label htmlFor="comments" className="text-sm text-gray-700 dark:text-gray-300">
                        السماح بالتعليقات
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 space-x-reverse">
                <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  حفظ كمسودة
                </button>
                <button 
                  onClick={handleUpload}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  نشر المحتوى
                </button>
              </div>
            </div>
          )}

          {/* Manage Tab */}
          {activeTab === 'manage' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">المحتوى الخاص بك</h3>
                <div className="flex space-x-2 space-x-reverse">
                  <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option>جميع الفئات</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option>جميع الحالات</option>
                    {statuses.map(status => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {mockContent.map((content) => (
                  <div key={content.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-start space-x-4 space-x-reverse">
                      <img 
                        src={content.thumbnail} 
                        alt={content.title}
                        className="w-24 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium mb-1">{content.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {content.description}
                            </p>
                            <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
                              <span className="flex items-center space-x-1 space-x-reverse">
                                <Clock size={14} />
                                <span>{content.duration}</span>
                              </span>
                              <span className="flex items-center space-x-1 space-x-reverse">
                                <Users size={14} />
                                <span>{content.views.toLocaleString()} مشاهدة</span>
                              </span>
                              <span className="flex items-center space-x-1 space-x-reverse">
                                <BarChart3 size={14} />
                                <span>{content.likes} إعجاب</span>
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                statuses.find(s => s.value === content.status)?.color
                              }`}>
                                {statuses.find(s => s.value === content.status)?.label}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <button 
                              onClick={() => handleContentAction('edit', content.id)}
                              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button 
                              onClick={() => handleContentAction('view', content.id)}
                              className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded"
                            >
                              <Eye size={16} />
                            </button>
                            <button 
                              onClick={() => handleContentAction('delete', content.id)}
                              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">إجمالي المشاهدات</p>
                      <p className="text-2xl font-bold">24,320</p>
                    </div>
                    <Eye className="text-blue-500" size={24} />
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">إجمالي الإعجابات</p>
                      <p className="text-2xl font-bold">1,348</p>
                    </div>
                    <BarChart3 className="text-green-500" size={24} />
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">المحتوى المنشور</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <Video className="text-purple-500" size={24} />
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">متوسط وقت المشاهدة</p>
                      <p className="text-2xl font-bold">8:45</p>
                    </div>
                    <Clock className="text-orange-500" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border">
                <h3 className="text-lg font-semibold mb-4">أداء المحتوى</h3>
                <div className="space-y-4">
                  {mockContent.map((content) => (
                    <div key={content.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <img 
                          src={content.thumbnail} 
                          alt={content.title}
                          className="w-12 h-8 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-medium text-sm">{content.title}</h4>
                          <p className="text-xs text-gray-500">{content.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 space-x-reverse text-sm">
                        <span>{content.views.toLocaleString()} مشاهدة</span>
                        <span>{content.likes} إعجاب</span>
                        <span className="text-green-600">+12%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">إعدادات المحتوى</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        جودة الفيديو الافتراضية
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option>1080p</option>
                        <option>720p</option>
                        <option>480p</option>
                        <option>360p</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        إعدادات التعليقات
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option>السماح بالتعليقات</option>
                        <option>تعليقات معتدلة</option>
                        <option>تعطيل التعليقات</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        إعدادات الخصوصية
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option>عام</option>
                        <option>خاص</option>
                        <option>غير مدرج</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">إعدادات الإشعارات</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">إشعارات التعليقات</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">إشعارات الإعجابات</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">إشعارات المشاهدات</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">إشعارات النظام</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}