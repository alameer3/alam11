'use client';

import { useState, useEffect } from 'react';
import { 
  Bell, 
  Settings, 
  Check, 
  X, 
  Eye, 
  EyeOff, 
  Star,
  Heart,
  Download,
  Share2,
  MessageSquare,
  UserPlus,
  Video,
  AlertCircle,
  Info,
  Clock,
  Trash2,
  Filter,
  Search,
  MoreVertical,
  Volume2,
  VolumeX,
  Smartphone,
  Mail,
  Globe
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'favorite' | 'download' | 'comment' | 'follow' | 'video';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isImportant: boolean;
  actionUrl?: string;
  icon: any;
  color: string;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  inApp: boolean;
  sound: boolean;
  favorites: boolean;
  downloads: boolean;
  comments: boolean;
  follows: boolean;
  recommendations: boolean;
  system: boolean;
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const [settings, setSettings] = useState<NotificationSettings>({
    email: true,
    push: true,
    inApp: true,
    sound: true,
    favorites: true,
    downloads: true,
    comments: true,
    follows: true,
    recommendations: true,
    system: true
  });

  const mockNotifications: Notification[] = [
    {
      id: '1',
      type: 'favorite',
      title: 'تم إضافة فيلم إلى المفضلة',
      message: 'تم إضافة "فيلم الأكشن الجديد" إلى قائمة المفضلة',
      timestamp: 'منذ 5 دقائق',
      isRead: false,
      isImportant: false,
      actionUrl: '/video/1',
      icon: Heart,
      color: 'text-red-500'
    },
    {
      id: '2',
      type: 'download',
      title: 'اكتمل التحميل',
      message: 'تم تحميل "مسلسل درامي" بنجاح',
      timestamp: 'منذ 15 دقيقة',
      isRead: false,
      isImportant: false,
      actionUrl: '/downloads',
      icon: Download,
      color: 'text-green-500'
    },
    {
      id: '3',
      type: 'comment',
      title: 'تعليق جديد',
      message: 'علق أحمد محمد على "وثائقي طبيعي"',
      timestamp: 'منذ ساعة',
      isRead: true,
      isImportant: false,
      actionUrl: '/video/3',
      icon: MessageSquare,
      color: 'text-blue-500'
    },
    {
      id: '4',
      type: 'follow',
      title: 'متابع جديد',
      message: 'بدأ سارة أحمد متابعتك',
      timestamp: 'منذ 3 ساعات',
      isRead: true,
      isImportant: false,
      actionUrl: '/profile/sara',
      icon: UserPlus,
      color: 'text-purple-500'
    },
    {
      id: '5',
      type: 'video',
      title: 'فيديو جديد متاح',
      message: 'تم إضافة "فيلم كوميدي جديد" إلى المكتبة',
      timestamp: 'منذ 5 ساعات',
      isRead: true,
      isImportant: true,
      actionUrl: '/video/5',
      icon: Video,
      color: 'text-orange-500'
    },
    {
      id: '6',
      type: 'system',
      title: 'تحديث النظام',
      message: 'تم تحديث النظام بنجاح. استمتع بالمميزات الجديدة!',
      timestamp: 'منذ يوم',
      isRead: true,
      isImportant: false,
      icon: Info,
      color: 'text-gray-500'
    }
  ];

  const tabs = [
    { id: 'all', label: 'الكل', count: mockNotifications.length },
    { id: 'unread', label: 'غير مقروء', count: mockNotifications.filter(n => !n.isRead).length },
    { id: 'important', label: 'مهم', count: mockNotifications.filter(n => n.isImportant).length },
    { id: 'settings', label: 'الإعدادات', count: 0 }
  ];

  const notificationTypes = [
    { type: 'favorite', label: 'المفضلة', icon: Heart, color: 'text-red-500' },
    { type: 'download', label: 'التحميلات', icon: Download, color: 'text-green-500' },
    { type: 'comment', label: 'التعليقات', icon: MessageSquare, color: 'text-blue-500' },
    { type: 'follow', label: 'المتابعون', icon: UserPlus, color: 'text-purple-500' },
    { type: 'video', label: 'الفيديوهات', icon: Video, color: 'text-orange-500' },
    { type: 'system', label: 'النظام', icon: Info, color: 'text-gray-500' }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
  }, []);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
    setUnreadCount(0);
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const toggleSetting = (setting: keyof NotificationSettings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case 'unread':
        return notifications.filter(n => !n.isRead);
      case 'important':
        return notifications.filter(n => n.isImportant);
      default:
        return notifications;
    }
  };

  const getNotificationIcon = (type: string) => {
    const notificationType = notificationTypes.find(nt => nt.type === type);
    return notificationType?.icon || Info;
  };

  const getNotificationColor = (type: string) => {
    const notificationType = notificationTypes.find(nt => nt.type === type);
    return notificationType?.color || 'text-gray-500';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">الإشعارات</h1>
          <p className="text-gray-600 dark:text-gray-400">
            إدارة الإشعارات والإعدادات
          </p>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {unreadCount}
            </span>
          )}
          <button 
            onClick={markAllAsRead}
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            تحديد الكل كمقروء
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 space-x-reverse px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 space-x-reverse ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab !== 'settings' ? (
            <div className="space-y-4">
              {getFilteredNotifications().map((notification) => {
                const Icon = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`flex items-start space-x-4 space-x-reverse p-4 rounded-lg border ${
                      notification.isRead 
                        ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600' 
                        : 'bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700'
                    }`}
                  >
                    <div className={`p-2 rounded-full ${notification.color} bg-opacity-10`}>
                      <Icon size={20} className={notification.color} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className={`font-medium ${notification.isRead ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-4 space-x-reverse mt-2">
                            <span className="text-xs text-gray-500">
                              {notification.timestamp}
                            </span>
                            {notification.isImportant && (
                              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                مهم
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1 space-x-reverse">
                          {!notification.isRead && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 text-gray-400 hover:text-green-600"
                              title="تحديد كمقروء"
                            >
                              <Check size={16} />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                            title="حذف"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {getFilteredNotifications().length === 0 && (
                <div className="text-center py-8">
                  <Bell size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    لا توجد إشعارات
                  </h3>
                  <p className="text-gray-500">
                    {activeTab === 'unread' ? 'لا توجد إشعارات غير مقروءة' :
                     activeTab === 'important' ? 'لا توجد إشعارات مهمة' :
                     'ستظهر الإشعارات هنا عند وصولها'}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">إعدادات الإشعارات</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-4">طرق الإرسال</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Mail size={16} className="text-gray-500" />
                          <span className="text-sm">البريد الإلكتروني</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.email}
                          onChange={() => toggleSetting('email')}
                          className="rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Smartphone size={16} className="text-gray-500" />
                          <span className="text-sm">إشعارات الدفع</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.push}
                          onChange={() => toggleSetting('push')}
                          className="rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Globe size={16} className="text-gray-500" />
                          <span className="text-sm">إشعارات الموقع</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.inApp}
                          onChange={() => toggleSetting('inApp')}
                          className="rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Volume2 size={16} className="text-gray-500" />
                          <span className="text-sm">الأصوات</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.sound}
                          onChange={() => toggleSetting('sound')}
                          className="rounded"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">أنواع الإشعارات</h4>
                    <div className="space-y-4">
                      {notificationTypes.map((type) => (
                        <div key={type.type} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <type.icon size={16} className={type.color} />
                            <span className="text-sm">{type.label}</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={settings[type.type as keyof NotificationSettings]}
                            onChange={() => toggleSetting(type.type as keyof NotificationSettings)}
                            className="rounded"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">إعدادات متقدمة</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      وقت الإشعارات
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>24/7</option>
                      <option>8:00 ص - 10:00 م</option>
                      <option>9:00 ص - 9:00 م</option>
                      <option>مخصص</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      تكرار الإشعارات
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>فوراً</option>
                      <option>كل 5 دقائق</option>
                      <option>كل 15 دقيقة</option>
                      <option>كل ساعة</option>
                    </select>
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