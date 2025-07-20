'use client';

import { useState } from 'react';
import { 
  FileText, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Download, 
  Calendar,
  Filter,
  RefreshCw,
  Eye,
  Users,
  Play,
  Star,
  Heart,
  Share2,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';

interface ReportData {
  userActivity: {
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
    returningUsers: number;
    averageSessionTime: string;
    bounceRate: number;
  };
  contentPerformance: {
    totalViews: number;
    totalPlays: number;
    totalDownloads: number;
    totalFavorites: number;
    totalRatings: number;
    averageRating: number;
  };
  topContent: Array<{
    id: string;
    title: string;
    type: string;
    views: number;
    plays: number;
    rating: number;
    image: string;
  }>;
  deviceUsage: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  geographicData: Array<{
    country: string;
    users: number;
    views: number;
    percentage: number;
  }>;
  timeSeriesData: Array<{
    date: string;
    views: number;
    users: number;
    plays: number;
  }>;
}

export default function ReportingSystem() {
  const [reportData, setReportData] = useState<ReportData>({
    userActivity: {
      totalUsers: 1250000,
      activeUsers: 45000,
      newUsers: 2500,
      returningUsers: 42500,
      averageSessionTime: '32 دقيقة',
      bounceRate: 23
    },
    contentPerformance: {
      totalViews: 85000000,
      totalPlays: 45000000,
      totalDownloads: 12000000,
      totalFavorites: 8500000,
      totalRatings: 3200000,
      averageRating: 4.6
    },
    topContent: [
      {
        id: '1',
        title: 'المصفوفة',
        type: 'movie',
        views: 2500000,
        plays: 1800000,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1624138784728-4e49e5a3c0c5?w=100&h=150&fit=crop'
      },
      {
        id: '2',
        title: 'بريكينغ باد',
        type: 'series',
        views: 2200000,
        plays: 1600000,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1624138784728-4e49e5a3c0c5?w=100&h=150&fit=crop'
      },
      {
        id: '3',
        title: 'البداية',
        type: 'movie',
        views: 1800000,
        plays: 1200000,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1624138784728-4e49e5a3c0c5?w=100&h=150&fit=crop'
      }
    ],
    deviceUsage: {
      desktop: 45,
      mobile: 40,
      tablet: 15
    },
    geographicData: [
      { country: 'مصر', users: 350000, views: 28000000, percentage: 28 },
      { country: 'السعودية', users: 280000, views: 22400000, percentage: 22.4 },
      { country: 'الإمارات', users: 200000, views: 16000000, percentage: 16 },
      { country: 'الكويت', users: 150000, views: 12000000, percentage: 12 },
      { country: 'قطر', users: 120000, views: 9600000, percentage: 9.6 }
    ],
    timeSeriesData: [
      { date: '2024-01-01', views: 2800000, users: 45000, plays: 1500000 },
      { date: '2024-01-02', views: 2950000, users: 47000, plays: 1580000 },
      { date: '2024-01-03', views: 3100000, users: 49000, plays: 1650000 },
      { date: '2024-01-04', views: 3250000, users: 51000, plays: 1720000 },
      { date: '2024-01-05', views: 3400000, users: 53000, plays: 1790000 },
      { date: '2024-01-06', views: 3550000, users: 55000, plays: 1860000 },
      { date: '2024-01-07', views: 3700000, users: 57000, plays: 1930000 }
    ]
  });

  const [reportType, setReportType] = useState<'overview' | 'users' | 'content' | 'geographic' | 'devices'>('overview');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [isGenerating, setIsGenerating] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const generateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const downloadReport = (format: 'pdf' | 'excel' | 'csv') => {
    alert(`سيتم تحميل التقرير بصيغة ${format.toUpperCase()} قريباً`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              نظام التقارير
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              تحليل شامل لأداء منصة أكوام
            </p>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
              className="input text-sm"
            >
              <option value="7d">آخر 7 أيام</option>
              <option value="30d">آخر 30 يوم</option>
              <option value="90d">آخر 90 يوم</option>
              <option value="1y">آخر سنة</option>
            </select>
            
            <button
              onClick={generateReport}
              disabled={isGenerating}
              className="btn-primary text-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ml-1 ${isGenerating ? 'animate-spin' : ''}`} />
              تحديث التقرير
            </button>
          </div>
        </div>
      </div>

      {/* أنواع التقارير */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {[
          { id: 'overview', label: 'نظرة عامة', icon: BarChart3 },
          { id: 'users', label: 'المستخدمين', icon: Users },
          { id: 'content', label: 'المحتوى', icon: Play },
          { id: 'geographic', label: 'الجغرافيا', icon: Globe },
          { id: 'devices', label: 'الأجهزة', icon: Monitor }
        ].map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setReportType(type.id as any)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                reportType === type.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex flex-col items-center space-y-2 space-y-reverse">
                <Icon className={`w-6 h-6 ${
                  reportType === type.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                }`} />
                <span className={`text-sm font-medium ${
                  reportType === type.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {type.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* محتوى التقرير */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {reportType === 'overview' && (
          <div className="space-y-8">
            {/* إحصائيات عامة */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 dark:text-blue-400">إجمالي المستخدمين</p>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      {formatNumber(reportData.userActivity.totalUsers)}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 dark:text-green-400">إجمالي المشاهدات</p>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                      {formatNumber(reportData.contentPerformance.totalViews)}
                    </p>
                  </div>
                  <Eye className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600 dark:text-purple-400">إجمالي التشغيل</p>
                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                      {formatNumber(reportData.contentPerformance.totalPlays)}
                    </p>
                  </div>
                  <Play className="w-8 h-8 text-purple-500" />
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-orange-600 dark:text-orange-400">متوسط التقييم</p>
                    <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                      {reportData.contentPerformance.averageRating}/5
                    </p>
                  </div>
                  <Star className="w-8 h-8 text-orange-500" />
                </div>
              </div>
            </div>

            {/* المحتوى الأكثر مشاهدة */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                المحتوى الأكثر مشاهدة
              </h3>
              <div className="space-y-4">
                {reportData.topContent.map((content, index) => (
                  <div key={content.id} className="flex items-center space-x-4 space-x-reverse p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <span className="text-lg font-bold text-gray-400 w-8">
                        #{index + 1}
                      </span>
                      <img
                        src={content.image}
                        alt={content.title}
                        className="w-12 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {content.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {content.type === 'movie' ? 'فيلم' : 'مسلسل'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 space-x-reverse ml-auto">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">المشاهدات</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {formatNumber(content.views)}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">التشغيل</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {formatNumber(content.plays)}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">التقييم</p>
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {content.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {reportType === 'users' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">المستخدمين النشطين</h4>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {formatNumber(reportData.userActivity.activeUsers)}
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                  {((reportData.userActivity.activeUsers / reportData.userActivity.totalUsers) * 100).toFixed(1)}% من إجمالي المستخدمين
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">مستخدمين جدد</h4>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {formatNumber(reportData.userActivity.newUsers)}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  هذا الشهر
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">مستخدمين عائدين</h4>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {formatNumber(reportData.userActivity.returningUsers)}
                </p>
                <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                  {((reportData.userActivity.returningUsers / reportData.userActivity.activeUsers) * 100).toFixed(1)}% من النشطين
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">معدل الارتداد</h4>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${reportData.userActivity.bounceRate}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {reportData.userActivity.bounceRate}%
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">متوسط وقت الجلسة</h4>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Clock className="w-6 h-6 text-blue-500" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {reportData.userActivity.averageSessionTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {reportType === 'content' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">إجمالي المشاهدات</h4>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {formatNumber(reportData.contentPerformance.totalViews)}
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">إجمالي التشغيل</h4>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {formatNumber(reportData.contentPerformance.totalPlays)}
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">إجمالي التحميل</h4>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {formatNumber(reportData.contentPerformance.totalDownloads)}
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">إجمالي المفضلة</h4>
                <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                  {formatNumber(reportData.contentPerformance.totalFavorites)}
                </p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">إجمالي التقييمات</h4>
                <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                  {formatNumber(reportData.contentPerformance.totalRatings)}
                </p>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">متوسط التقييم</h4>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                  {reportData.contentPerformance.averageRating}/5
                </p>
              </div>
            </div>
          </div>
        )}

        {reportType === 'geographic' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">التوزيع الجغرافي</h4>
                <div className="space-y-3">
                  {reportData.geographicData.map((country, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Globe className="w-5 h-5 text-blue-500" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {country.country}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {formatNumber(country.users)}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {country.percentage}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">إحصائيات المشاهدات</h4>
                <div className="space-y-3">
                  {reportData.geographicData.map((country, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Eye className="w-5 h-5 text-green-500" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {country.country}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {formatNumber(country.views)}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          مشاهدات
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {reportType === 'devices' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <Monitor className="w-8 h-8 text-blue-500" />
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100">سطح المكتب</h4>
                </div>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                  {reportData.deviceUsage.desktop}%
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                  من إجمالي المستخدمين
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <Smartphone className="w-8 h-8 text-green-500" />
                  <h4 className="font-semibold text-green-900 dark:text-green-100">الهاتف المحمول</h4>
                </div>
                <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                  {reportData.deviceUsage.mobile}%
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  من إجمالي المستخدمين
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <Tablet className="w-8 h-8 text-purple-500" />
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100">التابلت</h4>
                </div>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                  {reportData.deviceUsage.tablet}%
                </p>
                <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                  من إجمالي المستخدمين
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">توزيع الأجهزة</h4>
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: `${reportData.deviceUsage.desktop}%` }}
                  />
                </div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{ width: `${reportData.deviceUsage.mobile}%` }}
                  />
                </div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-4">
                  <div
                    className="bg-purple-500 h-4 rounded-full"
                    style={{ width: `${reportData.deviceUsage.tablet}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                <span>سطح المكتب</span>
                <span>الهاتف</span>
                <span>التابلت</span>
              </div>
            </div>
          </div>
        )}

        {/* أزرار التحميل */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900 dark:text-white">تحميل التقرير</h4>
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => downloadReport('pdf')}
                className="btn-secondary text-sm"
              >
                <FileText className="w-4 h-4 ml-1" />
                PDF
              </button>
              <button
                onClick={() => downloadReport('excel')}
                className="btn-secondary text-sm"
              >
                <BarChart3 className="w-4 h-4 ml-1" />
                Excel
              </button>
              <button
                onClick={() => downloadReport('csv')}
                className="btn-secondary text-sm"
              >
                <Download className="w-4 h-4 ml-1" />
                CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}