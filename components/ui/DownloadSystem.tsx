'use client';

import { useState } from 'react';
import { Download, Pause, Play, CheckCircle, AlertCircle, Clock, HardDrive, Wifi, WifiOff } from 'lucide-react';

interface DownloadItem {
  id: string;
  title: string;
  type: 'movie' | 'series' | 'show';
  image: string;
  size: string;
  quality: '480p' | '720p' | '1080p' | '4K';
  progress: number;
  status: 'queued' | 'downloading' | 'paused' | 'completed' | 'error';
  speed: string;
  remainingTime: string;
  createdAt: Date;
}

export default function DownloadSystem() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([
    {
      id: '1',
      title: 'المصفوفة',
      type: 'movie',
      image: 'https://images.unsplash.com/photo-1624138784728-4e49e5a3c0c5?w=100&h=150&fit=crop',
      size: '2.5 GB',
      quality: '1080p',
      progress: 75,
      status: 'downloading',
      speed: '2.1 MB/s',
      remainingTime: '5 دقائق',
      createdAt: new Date(new Date("2025-07-21T14:00:00Z").getTime() - 1000 * 60 * 30)
    },
    {
      id: '2',
      title: 'بريكينغ باد - الموسم الأول',
      type: 'series',
      image: 'https://images.unsplash.com/photo-1624138784728-4e49e5a3c0c5?w=100&h=150&fit=crop',
      size: '8.2 GB',
      quality: '720p',
      progress: 100,
      status: 'completed',
      speed: '0 MB/s',
      remainingTime: 'مكتمل',
      createdAt: new Date(new Date("2025-07-21T14:00:00Z").getTime() - 1000 * 60 * 60 * 2)
    },
    {
      id: '3',
      title: 'البداية',
      type: 'movie',
      image: 'https://images.unsplash.com/photo-1624138784728-4e49e5a3c0c5?w=100&h=150&fit=crop',
      size: '3.1 GB',
      quality: '4K',
      progress: 0,
      status: 'queued',
      speed: '0 MB/s',
      remainingTime: 'في الانتظار',
      createdAt: new Date()
    }
  ]);

  const [isOnline, setIsOnline] = useState(true);
  const [downloadSettings, setDownloadSettings] = useState({
    maxConcurrent: 3,
    defaultQuality: '720p' as DownloadItem['quality'],
    downloadPath: '/Downloads/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗',
    autoDownload: false
  });

  const pauseDownload = (id: string) => {
    setDownloads(downloads.map(item =>
      item.id === id ? { ...item, status: 'paused' } : item
    ));
  };

  const resumeDownload = (id: string) => {
    setDownloads(downloads.map(item =>
      item.id === id ? { ...item, status: 'downloading' } : item
    ));
  };

  const cancelDownload = (id: string) => {
    setDownloads(downloads.filter(item => item.id !== id));
  };

  const getStatusIcon = (status: DownloadItem['status']) => {
    switch (status) {
      case 'queued':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'downloading':
        return <Download className="w-4 h-4 text-blue-500 animate-pulse" />;
      case 'paused':
        return <Pause className="w-4 h-4 text-orange-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: DownloadItem['status']) => {
    switch (status) {
      case 'queued':
        return 'في الانتظار';
      case 'downloading':
        return 'جاري التحميل';
      case 'paused':
        return 'متوقف مؤقتاً';
      case 'completed':
        return 'مكتمل';
      case 'error':
        return 'خطأ في التحميل';
      default:
        return 'غير معروف';
    }
  };

  const getStatusColor = (status: DownloadItem['status']) => {
    switch (status) {
      case 'queued':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'downloading':
        return 'text-blue-600 dark:text-blue-400';
      case 'paused':
        return 'text-orange-600 dark:text-orange-400';
      case 'completed':
        return 'text-green-600 dark:text-green-400';
      case 'error':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const formatFileSize = (size: string) => {
    return size;
  };

  const getQualityColor = (quality: DownloadItem['quality']) => {
    switch (quality) {
      case '4K':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case '1080p':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case '720p':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case '480p':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            التحميلات
          </h3>
          
          {/* حالة الاتصال */}
          <div className="flex items-center space-x-2 space-x-reverse">
            {isOnline ? (
              <Wifi className="w-5 h-5 text-green-500" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-500" />
            )}
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {isOnline ? 'متصل' : 'غير متصل'}
            </span>
          </div>
        </div>

        {/* إحصائيات التحميل */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">جاري التحميل</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {downloads.filter(d => d.status === 'downloading').length}
                </p>
              </div>
              <Download className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">مكتمل</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {downloads.filter(d => d.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">في الانتظار</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {downloads.filter(d => d.status === 'queued').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">المساحة المستخدمة</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  15.8 GB
                </p>
              </div>
              <HardDrive className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* قائمة التحميلات */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              التحميلات النشطة
            </h4>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {downloads.map((download) => (
              <div key={download.id} className="p-6">
                <div className="flex items-start space-x-4 space-x-reverse">
                  {/* صورة المحتوى */}
                  <img
                    src={download.image}
                    alt={download.title}
                    className="w-16 h-24 object-cover rounded-lg"
                  />
                  
                  {/* تفاصيل التحميل */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white text-lg">
                          {download.title}
                        </h5>
                        <div className="flex items-center space-x-2 space-x-reverse mt-1">
                          <span className={`badge ${getQualityColor(download.quality)}`}>
                            {download.quality}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {download.size}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 space-x-reverse">
                        {getStatusIcon(download.status)}
                        <span className={`text-sm font-medium ${getStatusColor(download.status)}`}>
                          {getStatusText(download.status)}
                        </span>
                      </div>
                    </div>
                    
                    {/* شريط التقدم */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <span>{download.progress}%</span>
                        <span>{download.speed} • {download.remainingTime}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            download.status === 'completed' 
                              ? 'bg-green-500' 
                              : download.status === 'error'
                              ? 'bg-red-500'
                              : 'bg-blue-500'
                          }`}
                          style={{ width: `${download.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* أزرار التحكم */}
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {download.status === 'downloading' && (
                        <button
                          onClick={() => pauseDownload(download.id)}
                          className="btn-secondary text-sm"
                        >
                          <Pause className="w-4 h-4 ml-1" />
                          إيقاف مؤقت
                        </button>
                      )}
                      
                      {download.status === 'paused' && (
                        <button
                          onClick={() => resumeDownload(download.id)}
                          className="btn-primary text-sm"
                        >
                          <Play className="w-4 h-4 ml-1" />
                          استئناف
                        </button>
                      )}
                      
                      {download.status !== 'completed' && (
                        <button
                          onClick={() => cancelDownload(download.id)}
                          className="btn-danger text-sm"
                        >
                          إلغاء
                        </button>
                      )}
                      
                      {download.status === 'completed' && (
                        <button className="btn-primary text-sm">
                          <Play className="w-4 h-4 ml-1" />
                          تشغيل
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {downloads.length === 0 && (
            <div className="p-12 text-center">
              <Download className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                لا توجد تحميلات
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                ابدأ بتحميل المحتوى من صفحة الفيلم أو المسلسل
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}