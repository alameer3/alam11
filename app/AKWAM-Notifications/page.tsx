'use client';

import { useState } from 'react';
import { Bell, Settings, Check, Heart, Download, MessageSquare, UserPlus, Video, Info } from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'favorite' | 'download' | 'comment' | 'follow' | 'video' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isImportant: boolean;
  actionUrl?: string;
  icon: React.ComponentType;
  color: string;
}

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



export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [unreadCount, setUnreadCount] = useState(mockNotifications.filter(n => !n.isRead).length);
  const [activeTab, setActiveTab] = useState('all');

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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Bell className="w-6 h-6 text-blue-500 ml-3" />
              <h1 className="text-xl font-semibold">الإشعارات</h1>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                onClick={markAllAsRead}
                className="flex items-center space-x-2 space-x-reverse px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>تحديد الكل كمقروء</span>
              </button>
              <button className="flex items-center space-x-2 space-x-reverse px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors">
                <Settings className="w-4 h-4" />
                <span>الإعدادات</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 space-x-reverse mb-6 bg-gray-800 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 space-x-reverse px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className="bg-gray-600 text-white text-xs rounded-full px-2 py-1">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {getFilteredNotifications().map((notification) => {
            const IconComponent = notification.icon;
            return (
              <div
                key={notification.id}
                className={`bg-gray-800 rounded-lg p-4 border-l-4 transition-all duration-200 hover:bg-gray-750 ${
                  notification.isRead ? 'opacity-75' : 'border-l-blue-500'
                } ${
                  !notification.isRead ? 'border-l-blue-500' : 'border-l-transparent'
                }`}
              >
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gray-700 bg-opacity-50`}>
                    <IconComponent className={`w-5 h-5 ${notification.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-white">
                        {notification.title}
                      </h3>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        {!notification.isRead && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                        <span className="text-xs text-gray-400">
                          {notification.timestamp}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center space-x-3 space-x-reverse mt-3">
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          تحديد كمقروء
                        </button>
                      )}
                      {notification.actionUrl && (
                        <a
                          href={notification.actionUrl}
                          className="text-xs text-green-400 hover:text-green-300 transition-colors"
                        >
                          عرض التفاصيل
                        </a>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-xs text-red-400 hover:text-red-300 transition-colors"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {getFilteredNotifications().length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              لا توجد إشعارات
            </h3>
            <p className="text-gray-400">
              {activeTab === 'unread' 
                ? 'جميع الإشعارات مقروءة'
                : activeTab === 'important'
                ? 'لا توجد إشعارات مهمة'
                : 'لا توجد إشعارات حالياً'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}