'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
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
  Zap,
  Sparkles,
  TrendingUp,
  Crown,
  Shield,
  Award,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RefreshCw,
  Archive,
  Pin,
  Settings2,
  BellOff,
  BellRing,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info as InfoIcon,
  Clock as ClockIcon,
  Calendar,
  User,
  Users,
  Globe,
  Lock,
  Unlock,
  Key,
  Mail,
  Phone,
  MapPin,
  Tag,
  Hash,
  HashIcon,
  ExternalLink,
  Copy,
  Link,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Brain,
  Target,
  Lightbulb
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'favorite' | 'download' | 'comment' | 'follow' | 'video' | 'system' | 'trending' | 'recommendation' | 'security' | 'update' | 'promotion';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isImportant: boolean;
  isPinned: boolean;
  isArchived: boolean;
  actionUrl?: string;
  icon: any;
  color: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'general' | 'content' | 'social' | 'system' | 'security' | 'promotion';
  metadata?: {
    userId?: string;
    contentId?: string;
    contentType?: string;
    actionType?: string;
    value?: any;
  };
  expiresAt?: string;
  canDismiss: boolean;
  requiresAction: boolean;
  actionButtons?: {
    label: string;
    action: string;
    color: string;
    icon: any;
  }[];
}

interface AdvancedNotificationSystemProps {
  userId?: string;
  showUnreadOnly?: boolean;
  enableSound?: boolean;
  enablePush?: boolean;
  enableEmail?: boolean;
  maxNotifications?: number;
  onNotificationClick?: (notification: Notification) => void;
  onNotificationAction?: (notificationId: string, action: string) => void;
  onNotificationDismiss?: (notificationId: string) => void;
  onNotificationArchive?: (notificationId: string) => void;
  onNotificationPin?: (notificationId: string) => void;
  onMarkAllRead?: () => void;
  onClearAll?: () => void;
}

export default function AdvancedNotificationSystem({
  userId,
  showUnreadOnly = false,
  enableSound = true,
  enablePush = true,
  enableEmail = true,
  maxNotifications = 50,
  onNotificationClick,
  onNotificationAction,
  onNotificationDismiss,
  onNotificationArchive,
  onNotificationPin,
  onMarkAllRead,
  onClearAll
}: AdvancedNotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high' | 'urgent'>('all');
  const [filterCategory, setFilterCategory] = useState<'all' | 'general' | 'content' | 'social' | 'system' | 'security' | 'promotion'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'priority' | 'category'>('newest');

  // بيانات تجريبية للإشعارات
  const mockNotifications: Notification[] = [
    {
      id: '1',
      type: 'trending',
      title: 'فيلم جديد في الترند',
      message: 'فيلم "The Matrix Resurrections" أصبح في الترند! شاهد الآن.',
      timestamp: 'منذ 5 دقائق',
      isRead: false,
      isImportant: true,
      isPinned: false,
      isArchived: false,
      actionUrl: '/movie/the-matrix-resurrections',
      icon: TrendingUp,
      color: 'bg-red-500 hover:bg-red-600',
      priority: 'high',
      category: 'content',
      metadata: {
        contentId: 'matrix-resurrections',
        contentType: 'movie',
        actionType: 'view'
      },
      canDismiss: true,
      requiresAction: false,
      actionButtons: [
        { label: 'شاهد الآن', action: 'watch', color: 'bg-blue-600', icon: Play },
        { label: 'أضف للمفضلة', action: 'favorite', color: 'bg-red-600', icon: Heart }
      ]
    },
    {
      id: '2',
      type: 'recommendation',
      title: 'توصية شخصية لك',
      message: 'بناءً على مشاهداتك، نوصي بـ "Breaking Bad"',
      timestamp: 'منذ 15 دقيقة',
      isRead: false,
      isImportant: false,
      isPinned: false,
      isArchived: false,
      actionUrl: '/series/breaking-bad',
      icon: Brain,
      color: 'bg-blue-500 hover:bg-blue-600',
      priority: 'medium',
      category: 'content',
      metadata: {
        contentId: 'breaking-bad',
        contentType: 'series',
        actionType: 'recommend'
      },
      canDismiss: true,
      requiresAction: false,
      actionButtons: [
        { label: 'شاهد', action: 'watch', color: 'bg-blue-600', icon: Play },
        { label: 'ليس الآن', action: 'dismiss', color: 'bg-gray-600', icon: X }
      ]
    },
    {
      id: '3',
      type: 'comment',
      title: 'رد جديد على تعليقك',
      message: 'أحمد محمد رد على تعليقك في فيلم "Inception"',
      timestamp: 'منذ ساعة',
      isRead: true,
      isImportant: false,
      isPinned: false,
      isArchived: false,
      actionUrl: '/movie/inception#comment-123',
      icon: MessageSquare,
      color: 'bg-green-500 hover:bg-green-600',
      priority: 'medium',
      category: 'social',
      metadata: {
        userId: 'ahmed-mohamed',
        contentId: 'inception',
        contentType: 'movie',
        actionType: 'reply'
      },
      canDismiss: true,
      requiresAction: false,
      actionButtons: [
        { label: 'عرض الرد', action: 'view_reply', color: 'bg-green-600', icon: Eye },
        { label: 'رد', action: 'reply', color: 'bg-blue-600', icon: MessageSquare }
      ]
    },
    {
      id: '4',
      type: 'security',
      title: 'تسجيل دخول جديد',
      message: 'تم تسجيل دخول جديد من جهاز غير معروف في القاهرة، مصر',
      timestamp: 'منذ 3 ساعات',
      isRead: false,
      isImportant: true,
      isPinned: false,
      isArchived: false,
      actionUrl: '/profile/security',
      icon: Shield,
      color: 'bg-yellow-500 hover:bg-yellow-600',
      priority: 'urgent',
      category: 'security',
      metadata: {
        actionType: 'login',
        value: { location: 'Cairo, Egypt', device: 'Unknown' }
      },
      canDismiss: false,
      requiresAction: true,
      actionButtons: [
        { label: 'هذا أنا', action: 'confirm_login', color: 'bg-green-600', icon: Check },
        { label: 'ليس أنا', action: 'report_login', color: 'bg-red-600', icon: AlertTriangle }
      ]
    },
    {
      id: '5',
      type: 'update',
      title: 'تحديث النظام متاح',
      message: 'تم إطلاق تحديث جديد يحسن الأداء ويضيف ميزات جديدة',
      timestamp: 'منذ 6 ساعات',
      isRead: true,
      isImportant: false,
      isPinned: true,
      isArchived: false,
      actionUrl: '/settings/updates',
      icon: Zap,
      color: 'bg-purple-500 hover:bg-purple-600',
      priority: 'medium',
      category: 'system',
      metadata: {
        actionType: 'update',
        value: { version: '2.1.0', size: '15MB' }
      },
      canDismiss: true,
      requiresAction: false,
      actionButtons: [
        { label: 'تحديث الآن', action: 'update_now', color: 'bg-purple-600', icon: Zap },
        { label: 'لاحقاً', action: 'update_later', color: 'bg-gray-600', icon: Clock }
      ]
    },
    {
      id: '6',
      type: 'promotion',
      title: 'عرض خاص!',
      message: 'احصل على 50% خصم على الاشتراك السنوي لفترة محدودة',
      timestamp: 'منذ يوم',
      isRead: false,
      isImportant: false,
      isPinned: false,
      isArchived: false,
      actionUrl: '/subscription',
      icon: Crown,
      color: 'bg-orange-500 hover:bg-orange-600',
      priority: 'low',
      category: 'promotion',
      metadata: {
        actionType: 'promotion',
        value: { discount: 50, duration: 'limited' }
      },
      canDismiss: true,
      requiresAction: false,
      actionButtons: [
        { label: 'احصل على العرض', action: 'get_offer', color: 'bg-orange-600', icon: Crown },
        { label: 'إغلاق', action: 'dismiss', color: 'bg-gray-600', icon: X }
      ]
    }
  ];

  // تحميل الإشعارات
  const loadNotifications = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // محاكاة تحميل الإشعارات من الخادم
      await new Promise(resolve => setTimeout(resolve, 500));
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
    } catch (error) {
      // console.error('Error loading notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // معالجة النقر على الإشعار
  const handleNotificationClick = useCallback((notification: Notification) => {
    if (!notification.isRead) {
      setNotifications(prev => 
        prev.map(n => 
          n.id === notification.id ? { ...n, isRead: true } : n
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
    
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
  }, [onNotificationClick]);

  // معالجة إجراء الإشعار
  const handleNotificationAction = useCallback((notificationId: string, action: string) => {
    if (onNotificationAction) {
      onNotificationAction(notificationId, action);
    }
    
    // معالجة الإجراءات المحلية
    switch (action) {
      case 'dismiss':
        handleNotificationDismiss(notificationId);
        break;
      case 'archive':
        handleNotificationArchive(notificationId);
        break;
      case 'pin':
        handleNotificationPin(notificationId);
        break;
      case 'unpin':
        handleNotificationUnpin(notificationId);
        break;
    }
  }, [onNotificationAction]);

  // إغلاق الإشعار
  const handleNotificationDismiss = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    
    if (onNotificationDismiss) {
      onNotificationDismiss(notificationId);
    }
  }, [onNotificationDismiss]);

  // أرشفة الإشعار
  const handleNotificationArchive = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isArchived: true } : n
      )
    );
    
    if (onNotificationArchive) {
      onNotificationArchive(notificationId);
    }
  }, [onNotificationArchive]);

  // تثبيت الإشعار
  const handleNotificationPin = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isPinned: true } : n
      )
    );
    
    if (onNotificationPin) {
      onNotificationPin(notificationId);
    }
  }, [onNotificationPin]);

  // إلغاء تثبيت الإشعار
  const handleNotificationUnpin = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isPinned: false } : n
      )
    );
  }, []);

  // تحديد الكل كمقروء
  const handleMarkAllRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
    setUnreadCount(0);
    
    if (onMarkAllRead) {
      onMarkAllRead();
    }
  }, [onMarkAllRead]);

  // مسح الكل
  const handleClearAll = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
    
    if (onClearAll) {
      onClearAll();
    }
  }, [onClearAll]);

  // تصفية وترتيب الإشعارات
  const filteredNotifications = useMemo(() => {
    let filtered = [...notifications];
    
    // فلترة حسب التبويب
    switch (activeTab) {
      case 'unread':
        filtered = filtered.filter(n => !n.isRead);
        break;
      case 'important':
        filtered = filtered.filter(n => n.isImportant);
        break;
      case 'pinned':
        filtered = filtered.filter(n => n.isPinned);
        break;
      case 'archived':
        filtered = filtered.filter(n => n.isArchived);
        break;
    }
    
    // فلترة حسب البحث
    if (searchQuery) {
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // فلترة حسب الأولوية
    if (filterPriority !== 'all') {
      filtered = filtered.filter(n => n.priority === filterPriority);
    }
    
    // فلترة حسب الفئة
    if (filterCategory !== 'all') {
      filtered = filtered.filter(n => n.category === filterCategory);
    }
    
    // ترتيب الإشعارات
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        break;
      case 'priority':
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        filtered.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
        break;
      case 'category':
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
    }
    
    return filtered.slice(0, maxNotifications);
  }, [notifications, activeTab, searchQuery, filterPriority, filterCategory, sortBy, maxNotifications]);

  // إحصائيات الإشعارات
  const notificationStats = useMemo(() => {
    const total = notifications.length;
    const unread = notifications.filter(n => !n.isRead).length;
    const important = notifications.filter(n => n.isImportant).length;
    const pinned = notifications.filter(n => n.isPinned).length;
    const archived = notifications.filter(n => n.isArchived).length;
    
    return { total, unread, important, pinned, archived };
  }, [notifications]);

  // تحميل البيانات
  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* رأس النظام */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3 space-x-reverse">
          <Bell className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-bold text-white">الإشعارات</h2>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
          <Sparkles className="w-4 h-4 text-yellow-400" />
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0}
            className="text-blue-400 hover:text-blue-300 disabled:text-gray-500 transition-colors"
          >
            تحديد الكل كمقروء
          </button>
        </div>
      </div>

      {/* إعدادات الإشعارات */}
      {showSettings && (
        <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-4">إعدادات الإشعارات</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">الصوت</span>
              <button className={`w-10 h-6 rounded-full transition-colors ${enableSound ? 'bg-blue-600' : 'bg-gray-600'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${enableSound ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">الإشعارات الفورية</span>
              <button className={`w-10 h-6 rounded-full transition-colors ${enablePush ? 'bg-blue-600' : 'bg-gray-600'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${enablePush ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">البريد الإلكتروني</span>
              <button className={`w-10 h-6 rounded-full transition-colors ${enableEmail ? 'bg-blue-600' : 'bg-gray-600'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${enableEmail ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* تبويبات الإشعارات */}
      <div className="flex space-x-1 space-x-reverse mb-6 bg-gray-800 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 flex items-center justify-center space-x-2 space-x-reverse px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'all'
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>الكل ({notificationStats.total})</span>
        </button>
        
        <button
          onClick={() => setActiveTab('unread')}
          className={`flex-1 flex items-center justify-center space-x-2 space-x-reverse px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'unread'
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>غير مقروء ({notificationStats.unread})</span>
        </button>
        
        <button
          onClick={() => setActiveTab('important')}
          className={`flex-1 flex items-center justify-center space-x-2 space-x-reverse px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'important'
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
        >
          <Star className="w-4 h-4" />
          <span>مهم ({notificationStats.important})</span>
        </button>
        
        <button
          onClick={() => setActiveTab('pinned')}
          className={`flex-1 flex items-center justify-center space-x-2 space-x-reverse px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'pinned'
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
        >
          <Pin className="w-4 h-4" />
          <span>مثبت ({notificationStats.pinned})</span>
        </button>
      </div>

      {/* فلاتر وبحث */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 space-x-reverse">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="البحث في الإشعارات..."
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 text-sm"
          />
          
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as any)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
          >
            <option value="all">كل الأولويات</option>
            <option value="urgent">عاجل</option>
            <option value="high">عالية</option>
            <option value="medium">متوسطة</option>
            <option value="low">منخفضة</option>
          </select>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as any)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
          >
            <option value="all">كل الفئات</option>
            <option value="general">عام</option>
            <option value="content">محتوى</option>
            <option value="social">اجتماعي</option>
            <option value="system">نظام</option>
            <option value="security">أمان</option>
            <option value="promotion">ترويج</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
          >
            <option value="newest">الأحدث</option>
            <option value="oldest">الأقدم</option>
            <option value="priority">الأولوية</option>
            <option value="category">الفئة</option>
          </select>
        </div>
        
        <button
          onClick={handleClearAll}
          className="text-red-400 hover:text-red-300 text-sm"
        >
          مسح الكل
        </button>
      </div>

      {/* قائمة الإشعارات */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Bell className="w-6 h-6 text-blue-500 animate-pulse" />
            <span className="text-gray-300">جاري تحميل الإشعارات...</span>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-gray-800 rounded-lg p-4 border transition-all duration-200 hover:scale-105 cursor-pointer ${
                notification.isRead 
                  ? 'border-gray-700 opacity-75' 
                  : 'border-blue-500'
              } ${notification.isPinned ? 'border-yellow-500' : ''}`}
              onClick={() => handleNotificationClick(notification)}
            >
              {/* رأس الإشعار */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className={`p-2 rounded-lg ${notification.color}`}>
                    <notification.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <h4 className="text-white font-semibold">{notification.title}</h4>
                      {notification.isPinned && <Pin className="w-4 h-4 text-yellow-400" />}
                      {notification.isImportant && <Star className="w-4 h-4 text-yellow-400" />}
                      {!notification.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{notification.timestamp}</span>
                      <span>•</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        notification.priority === 'urgent' ? 'bg-red-600 text-white' :
                        notification.priority === 'high' ? 'bg-orange-600 text-white' :
                        notification.priority === 'medium' ? 'bg-yellow-600 text-black' :
                        'bg-gray-600 text-white'
                      }`}>
                        {notification.priority === 'urgent' ? 'عاجل' :
                         notification.priority === 'high' ? 'عالية' :
                         notification.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  {notification.canDismiss && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNotificationDismiss(notification.id);
                      }}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (notification.isPinned) {
                        handleNotificationUnpin(notification.id);
                      } else {
                        handleNotificationPin(notification.id);
                      }
                    }}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                                         {notification.isPinned ? <Pin className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* محتوى الإشعار */}
              <div className="mb-3">
                <p className="text-gray-300 leading-relaxed">{notification.message}</p>
              </div>
              
              {/* أزرار الإجراءات */}
              {notification.actionButtons && notification.actionButtons.length > 0 && (
                <div className="flex items-center space-x-2 space-x-reverse">
                  {notification.actionButtons.map((button, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNotificationAction(notification.id, button.action);
                      }}
                      className={`flex items-center space-x-1 space-x-reverse px-3 py-1 rounded text-sm transition-colors ${button.color} text-white`}
                    >
                      <button.icon className="w-3 h-3" />
                      <span>{button.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* رسالة إذا لم توجد إشعارات */}
      {!isLoading && filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-300 mb-2">
            لا توجد إشعارات
          </h3>
          <p className="text-gray-400">
            {activeTab === 'unread' ? 'جميع الإشعارات مقروءة' :
             activeTab === 'important' ? 'لا توجد إشعارات مهمة' :
             activeTab === 'pinned' ? 'لا توجد إشعارات مثبتة' :
             'ستظهر الإشعارات الجديدة هنا'}
          </p>
        </div>
      )}
    </div>
  );
}