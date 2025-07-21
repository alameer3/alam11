'use client';

import { useState, useEffect } from 'react';
import { 
  ExclamationTriangleIcon,
  FlagIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UserIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  NoSymbolIcon as BanIcon,
  ChatBubbleLeftIcon,
  VideoCameraIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

interface Report {
  id: string;
  type: 'spam' | 'abuse' | 'inappropriate' | 'copyright' | 'violence' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'reviewing' | 'resolved' | 'dismissed';
  reporterId: string;
  reporterName: string;
  reportedContentId: string;
  reportedContentType: 'video' | 'comment' | 'user' | 'channel';
  reportedContentTitle: string;
  reportedUserId: string;
  reportedUserName: string;
  reason: string;
  description: string;
  evidence?: string[];
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  resolution?: string;
  actionTaken?: 'warning' | 'suspension' | 'ban' | 'content_removal' | 'none';
}

interface ReportStats {
  total: number;
  pending: number;
  reviewing: number;
  resolved: number;
  dismissed: number;
  byType: Record<string, number>;
  bySeverity: Record<string, number>;
}

export default function AdvancedReportingSystem() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [stats, setStats] = useState<ReportStats>({
    total: 0,
    pending: 0,
    reviewing: 0,
    resolved: 0,
    dismissed: 0,
    byType: {},
    bySeverity: {},
  });
  const [resolution, setResolution] = useState('');
  const [actionTaken, setActionTaken] = useState<'warning' | 'suspension' | 'ban' | 'content_removal' | 'none'>('none');

  // بيانات تجريبية
  useEffect(() => {
    const mockReports: Report[] = [
      {
        id: '1',
        type: 'abuse',
        severity: 'high',
        status: 'pending',
        reporterId: 'user1',
        reporterName: 'أحمد محمد',
        reportedContentId: 'content1',
        reportedContentType: 'video',
        reportedContentTitle: 'فيديو مسيء',
        reportedUserId: 'user2',
        reportedUserName: 'سارة أحمد',
        reason: 'محتوى مسيء',
        description: 'هذا الفيديو يحتوي على محتوى مسيء وغير مناسب للمشاهدة العامة',
        evidence: ['screenshot1.jpg', 'video_clip.mp4'],
        createdAt: new Date('2025-07-21T10:00:00Z'),
        updatedAt: new Date('2025-07-21T12:30:00Z'),
      },
      {
        id: '2',
        type: 'spam',
        severity: 'medium',
        status: 'reviewing',
        reporterId: 'user3',
        reporterName: 'محمد علي',
        reportedContentId: 'content2',
        reportedContentType: 'comment',
        reportedContentTitle: 'تعليق مزعج',
        reportedUserId: 'user4',
        reportedUserName: 'فاطمة حسن',
        reason: 'رسائل مزعجة',
        description: 'هذا المستخدم يرسل رسائل مزعجة ومتكررة',
        createdAt: new Date('2025-07-21T08:00:00Z'),
        updatedAt: new Date('2025-07-21T11:00:00Z'),
        assignedTo: 'mod1',
      },
      {
        id: '3',
        type: 'copyright',
        severity: 'critical',
        status: 'resolved',
        reporterId: 'user5',
        reporterName: 'خالد أحمد',
        reportedContentId: 'content3',
        reportedContentType: 'video',
        reportedContentTitle: 'فيديو منسوخ',
        reportedUserId: 'user6',
        reportedUserName: 'علي محمد',
        reason: 'انتهاك حقوق النشر',
        description: 'هذا الفيديو منسوخ من قناة أخرى بدون إذن',
        evidence: ['original_video.mp4', 'comparison.pdf'],
        createdAt: new Date('2025-07-20T14:00:00Z'),
        updatedAt: new Date('2025-07-21T02:00:00Z'),
        resolution: 'تم إزالة المحتوى وإيقاف الحساب مؤقتاً',
        actionTaken: 'content_removal',
      },
    ];

    setReports(mockReports);

    // حساب الإحصائيات
    const newStats: ReportStats = {
      total: mockReports.length,
      pending: mockReports.filter(r => r.status === 'pending').length,
      reviewing: mockReports.filter(r => r.status === 'reviewing').length,
      resolved: mockReports.filter(r => r.status === 'resolved').length,
      dismissed: mockReports.filter(r => r.status === 'dismissed').length,
      byType: {},
      bySeverity: {},
    };

    mockReports.forEach(report => {
      newStats.byType[report.type] = (newStats.byType[report.type] || 0) + 1;
      newStats.bySeverity[report.severity] = (newStats.bySeverity[report.severity] || 0) + 1;
    });

    setStats(newStats);
  }, []);

  const handleReportAction = async (reportId: string, action: string) => {
    try {
      const response = await fetch('/api/reports/action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportId,
          action,
          resolution,
          actionTaken,
        }),
      });

      if (response.ok) {
        // تحديث الحالة المحلية
        setReports(prev => prev.map(report =>
          report.id === reportId
            ? { ...report, status: 'resolved', resolution, actionTaken }
            : report
        ));
        
        setSelectedReport(null);
        setResolution('');
        setActionTaken('none');
      }
    } catch (error) {
      // // // console.error('خطأ في تنفيذ الإجراء:', error);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'abuse':
        return 'bg-red-100 text-red-800';
      case 'spam':
        return 'bg-yellow-100 text-yellow-800';
      case 'copyright':
        return 'bg-purple-100 text-purple-800';
      case 'inappropriate':
        return 'bg-orange-100 text-orange-800';
      case 'violence':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'dismissed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <VideoCameraIcon className="h-4 w-4" />;
      case 'comment':
        return <ChatBubbleLeftIcon className="h-4 w-4" />;
      case 'user':
        return <UserIcon className="h-4 w-4" />;
      case 'channel':
        return <DocumentTextIcon className="h-4 w-4" />;
      default:
        return <DocumentTextIcon className="h-4 w-4" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredReports = reports.filter(report => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return report.status === 'pending';
    if (activeTab === 'reviewing') return report.status === 'reviewing';
    if (activeTab === 'resolved') return report.status === 'resolved';
    if (activeTab === 'dismissed') return report.status === 'dismissed';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">نظام التقارير المتقدم</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            تصدير التقرير
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            إعدادات النظام
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي التقارير</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-500 rounded-full text-white">
              <FlagIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">قيد الانتظار</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="p-3 bg-yellow-500 rounded-full text-white">
              <ClockIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">قيد المراجعة</p>
              <p className="text-2xl font-bold text-blue-600">{stats.reviewing}</p>
            </div>
            <div className="p-3 bg-blue-500 rounded-full text-white">
              <EyeIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">تم الحل</p>
              <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
            </div>
            <div className="p-3 bg-green-500 rounded-full text-white">
              <CheckCircleIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">مرفوض</p>
              <p className="text-2xl font-bold text-gray-600">{stats.dismissed}</p>
            </div>
            <div className="p-3 bg-gray-500 rounded-full text-white">
              <XCircleIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'all', label: 'الكل', count: stats.total },
                  { id: 'pending', label: 'قيد الانتظار', count: stats.pending },
                  { id: 'reviewing', label: 'قيد المراجعة', count: stats.reviewing },
                  { id: 'resolved', label: 'تم الحل', count: stats.resolved },
                  { id: 'dismissed', label: 'مرفوض', count: stats.dismissed },
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
                {filteredReports.map((report) => (
                  <div
                    key={report.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedReport?.id === report.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedReport(report)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="flex items-center space-x-2">
                            {getContentTypeIcon(report.reportedContentType)}
                            <h3 className="font-medium text-gray-900">
                              {report.reportedContentTitle}
                            </h3>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(report.type)}`}>
                            {report.type === 'abuse' ? 'إساءة' :
                             report.type === 'spam' ? 'مزعج' :
                             report.type === 'copyright' ? 'حقوق نشر' :
                             report.type === 'inappropriate' ? 'غير مناسب' :
                             report.type === 'violence' ? 'عنف' : 'أخرى'}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(report.severity)}`}>
                            {report.severity === 'critical' ? 'حرج' :
                             report.severity === 'high' ? 'عالي' :
                             report.severity === 'medium' ? 'متوسط' : 'منخفض'}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(report.status)}`}>
                            {report.status === 'pending' ? 'قيد الانتظار' :
                             report.status === 'reviewing' ? 'قيد المراجعة' :
                             report.status === 'resolved' ? 'تم الحل' : 'مرفوض'}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <UserIcon className="h-4 w-4" />
                            <span>من: {report.reporterName}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <BanIcon className="h-4 w-4" />
                            <span>على: {report.reportedUserName}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ClockIcon className="h-4 w-4" />
                            <span>{formatDate(report.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Report Details */}
        <div className="space-y-6">
          {selectedReport ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">تفاصيل التقرير</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">{selectedReport.reportedContentTitle}</h4>
                  <p className="text-sm text-gray-600 mt-1">{selectedReport.description}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">النوع:</span>
                    <span className="font-medium">{selectedReport.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">الخطورة:</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(selectedReport.severity)}`}>
                      {selectedReport.severity}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">الحالة:</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedReport.status)}`}>
                      {selectedReport.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">المبلغ:</span>
                    <span className="font-medium">{selectedReport.reporterName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">المبلغ عليه:</span>
                    <span className="font-medium">{selectedReport.reportedUserName}</span>
                  </div>
                </div>

                {selectedReport.evidence && selectedReport.evidence.length > 0 && (
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">الأدلة:</h5>
                    <div className="space-y-1">
                      {selectedReport.evidence.map((evidence, index) => (
                        <div key={index} className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                          📎 {evidence}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedReport.status === 'pending' && (
                  <div className="border-t pt-4">
                    <h5 className="font-medium text-gray-900 mb-2">الإجراء المطلوب:</h5>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          القرار
                        </label>
                        <textarea
                          value={resolution}
                          onChange={(e) => setResolution(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={3}
                          placeholder="اكتب قرارك..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          الإجراء المتخذ
                        </label>
                        <select
                          value={actionTaken}
                          onChange={(e) => setActionTaken(e.target.value as any)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="none">لا إجراء</option>
                          <option value="warning">تحذير</option>
                          <option value="suspension">إيقاف مؤقت</option>
                          <option value="ban">حظر دائم</option>
                          <option value="content_removal">إزالة المحتوى</option>
                        </select>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleReportAction(selectedReport.id, 'resolve')}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          حل
                        </button>
                        <button
                          onClick={() => handleReportAction(selectedReport.id, 'dismiss')}
                          className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          رفض
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {selectedReport.resolution && (
                  <div className="border-t pt-4">
                    <h5 className="font-medium text-gray-900 mb-2">القرار النهائي:</h5>
                    <p className="text-sm text-gray-600">{selectedReport.resolution}</p>
                    {selectedReport.actionTaken && (
                      <p className="text-sm text-gray-600 mt-1">
                        الإجراء: {selectedReport.actionTaken === 'warning' ? 'تحذير' :
                                  selectedReport.actionTaken === 'suspension' ? 'إيقاف مؤقت' :
                                  selectedReport.actionTaken === 'ban' ? 'حظر دائم' :
                                  selectedReport.actionTaken === 'content_removal' ? 'إزالة المحتوى' : 'لا إجراء'}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <FlagIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">اختر تقرير لعرض التفاصيل</p>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">إجراءات سريعة</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                إعدادات المراجعة التلقائية
              </button>
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                تصدير تقرير الإساءة
              </button>
              <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                إدارة القوائم السوداء
              </button>
              <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                إعدادات المراقبة
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}