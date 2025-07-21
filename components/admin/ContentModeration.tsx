'use client';

import { useState } from 'react';
import { 
  EyeIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon,
  ExclamationTriangleIcon,
  FlagIcon,
  UserIcon,
  CalendarIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';

interface ContentItem {
  id: string;
  title: string;
  type: 'video' | 'image' | 'text';
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  submittedBy: string;
  submittedAt: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  flags: number;
  description: string;
  thumbnail?: string;
}

interface ModerationAction {
  id: string;
  contentId: string;
  moderatorId: string;
  action: 'approve' | 'reject' | 'flag';
  reason?: string;
  timestamp: string;
}

export default function ContentModeration() {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [moderationReason, setModerationReason] = useState('');

  const contentItems: ContentItem[] = [
    {
      id: '1',
      title: 'فيديو جديد عن التكنولوجيا',
      type: 'video',
      status: 'pending',
      submittedBy: 'أحمد محمد',
      submittedAt: '2024-01-15T10:30:00Z',
      category: 'تكنولوجيا',
      priority: 'high',
      flags: 0,
      description: 'فيديو تعليمي عن أحدث التقنيات',
      thumbnail: '/thumbnails/video1.jpg',
    },
    {
      id: '2',
      title: 'صورة غير مناسبة',
      type: 'image',
      status: 'flagged',
      submittedBy: 'سارة أحمد',
      submittedAt: '2024-01-14T15:45:00Z',
      category: 'فنون',
      priority: 'high',
      flags: 3,
      description: 'صورة قد تحتوي على محتوى غير مناسب',
    },
    {
      id: '3',
      title: 'مقال عن السفر',
      type: 'text',
      status: 'pending',
      submittedBy: 'محمد علي',
      submittedAt: '2024-01-13T09:15:00Z',
      category: 'سفر',
      priority: 'medium',
      flags: 0,
      description: 'مقال مفيد عن أفضل وجهات السفر',
    },
  ];

  const moderationActions: ModerationAction[] = [
    {
      id: '1',
      contentId: '1',
      moderatorId: 'mod1',
      action: 'approve',
      reason: 'محتوى مناسب ومفيد',
      timestamp: '2024-01-15T11:00:00Z',
    },
  ];

  const handleModerationAction = async (action: 'approve' | 'reject' | 'flag') => {
    if (!selectedContent) return;

    try {
      const response = await fetch('/api/moderation/action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentId: selectedContent.id,
          action,
          reason: moderationReason,
        }),
      });

      if (response.ok) {
        // Update local state
        const updatedItems = contentItems.map(item =>
          item.id === selectedContent.id
            ? { ...item, status: action === 'approve' ? 'approved' : 'rejected' }
            : item
        );
        
        setSelectedContent(null);
        setModerationReason('');
        // Refresh the list
        window.location.reload();
      }
    } catch (error) {
      // // console.error('خطأ في تنفيذ الإجراء:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'flagged':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">مراجعة المحتوى</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            إعدادات المراجعة
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            تصدير التقرير
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'pending', label: 'قيد الانتظار', count: 15 },
                  { id: 'flagged', label: 'مُعلَّم', count: 8 },
                  { id: 'approved', label: 'مُوافق عليه', count: 124 },
                  { id: 'rejected', label: 'مرفوض', count: 23 },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {tab.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {contentItems
                  .filter(item => 
                    activeTab === 'pending' ? item.status === 'pending' :
                    activeTab === 'flagged' ? item.status === 'flagged' :
                    activeTab === 'approved' ? item.status === 'approved' :
                    activeTab === 'rejected' ? item.status === 'rejected' : true
                  )
                  .map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedContent?.id === item.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedContent(item)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-medium text-gray-900">{item.title}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                              {item.status === 'pending' ? 'قيد الانتظار' :
                               item.status === 'approved' ? 'موافق عليه' :
                               item.status === 'rejected' ? 'مرفوض' : 'مُعلَّم'}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(item.priority)}`}>
                              {item.priority === 'high' ? 'عالي' :
                               item.priority === 'medium' ? 'متوسط' : 'منخفض'}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <UserIcon className="h-4 w-4" />
                              <span>{item.submittedBy}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{formatDate(item.submittedAt)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <FlagIcon className="h-4 w-4" />
                              <span>{item.flags} إشارة</span>
                            </div>
                          </div>
                        </div>
                        
                        {item.thumbnail && (
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0">
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Moderation Panel */}
        <div className="space-y-6">
          {selectedContent ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">مراجعة المحتوى</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">{selectedContent.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{selectedContent.description}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">النوع:</span>
                    <span className="font-medium">{selectedContent.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">الفئة:</span>
                    <span className="font-medium">{selectedContent.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">الأولوية:</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(selectedContent.priority)}`}>
                      {selectedContent.priority === 'high' ? 'عالي' :
                       selectedContent.priority === 'medium' ? 'متوسط' : 'منخفض'}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    سبب القرار (اختياري)
                  </label>
                  <textarea
                    value={moderationReason}
                    onChange={(e) => setModerationReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="اكتب سبب القرار..."
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleModerationAction('approve')}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <CheckCircleIcon className="h-5 w-5" />
                    <span>موافقة</span>
                  </button>
                  <button
                    onClick={() => handleModerationAction('reject')}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <XCircleIcon className="h-5 w-5" />
                    <span>رفض</span>
                  </button>
                </div>

                <button
                  onClick={() => handleModerationAction('flag')}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <FlagIcon className="h-5 w-5" />
                  <span>إشارة للمراجعة</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <EyeIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">اختر محتوى للمراجعة</p>
            </div>
          )}

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">إحصائيات سريعة</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">قيد المراجعة:</span>
                <span className="font-medium">15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">مُوافق عليه اليوم:</span>
                <span className="font-medium text-green-600">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">مرفوض اليوم:</span>
                <span className="font-medium text-red-600">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">متوسط وقت المراجعة:</span>
                <span className="font-medium">2.5 ساعة</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}