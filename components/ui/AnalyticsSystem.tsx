'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Eye, 
  Play, 
  Download, 
  Heart, 
  Star, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  BarChart3,
  PieChart,
  Activity,
  Target
} from 'lucide-react';

interface AnalyticsData {
  overview: {
    totalUsers: number;
    totalViews: number;
    totalPlays: number;
    totalDownloads: number;
    totalFavorites: number;
    totalRatings: number;
  };
  trends: {
    dailyViews: number;
    weeklyViews: number;
    monthlyViews: number;
    dailyGrowth: number;
    weeklyGrowth: number;
    monthlyGrowth: number;
  };
  topContent: Array<{
    id: string;
    title: string;
    type: string;
    views: number;
    rating: number;
    image: string;
  }>;
  userActivity: {
    activeUsers: number;
    newUsers: number;
    returningUsers: number;
    averageSessionTime: string;
  };
  deviceStats: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  geographicStats: {
    topCountries: Array<{
      country: string;
      users: number;
      percentage: number;
    }>;
  };
}

export default function AnalyticsSystem() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    overview: {
      totalUsers: 1250000,
      totalViews: 85000000,
      totalPlays: 45000000,
      totalDownloads: 12000000,
      totalFavorites: 8500000,
      totalRatings: 3200000
    },
    trends: {
      dailyViews: 2800000,
      weeklyViews: 19500000,
      monthlyViews: 85000000,
      dailyGrowth: 12.5,
      weeklyGrowth: 8.3,
      monthlyGrowth: 15.7
    },
    topContent: [
      {
        id: '1',
        title: 'المصفوفة',
        type: 'movie',
        views: 2500000,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1624138784728-4e49e5a3c0c5?w=100&h=150&fit=crop'
      },
      {
        id: '2',
        title: 'بريكينغ باد',
        type: 'series',
        views: 2200000,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1624138784728-4e49e5a3c0c5?w=100&h=150&fit=crop'
      },
      {
        id: '3',
        title: 'البداية',
        type: 'movie',
        views: 1800000,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1624138784728-4e49e5a3c0c5?w=100&h=150&fit=crop'
      },
      {
        id: '4',
        title: 'لعبة العرش',
        type: 'series',
        views: 1600000,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1624138784728-4e49e5a3c0c5?w=100&h=150&fit=crop'
      },
      {
        id: '5',
        title: 'أفتر',
        type: 'movie',
        views: 1400000,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1624138784728-4e49e5a3c0c5?w=100&h=150&fit=crop'
      }
    ],
    userActivity: {
      activeUsers: 45000,
      newUsers: 2500,
      returningUsers: 42500,
      averageSessionTime: '32 دقيقة'
    },
    deviceStats: {
      desktop: 45,
      mobile: 40,
      tablet: 15
    },
    geographicStats: {
      topCountries: [
        { country: 'مصر', users: 350000, percentage: 28 },
        { country: 'السعودية', users: 280000, percentage: 22.4 },
        { country: 'الإمارات', users: 200000, percentage: 16 },
        { country: 'الكويت', users: 150000, percentage: 12 },
        { country: 'قطر', users: 120000, percentage: 9.6 },
        { country: 'البحرين', users: 50000, percentage: 4 },
        { country: 'عمان', users: 30000, percentage: 2.4 },
        { country: 'أخرى', users: 70000, percentage: 5.6 }
      ]
    }
  });

  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('month');
  const [selectedMetric, setSelectedMetric] = useState<'views' | 'users' | 'plays' | 'downloads'>('views');

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? (
      <TrendingUp className="w-4 h-4 text-green-500" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-500" />
    );
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          إحصائيات الموقع
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          نظرة شاملة على أداء منصة أكوام
        </p>
      </div>

      {/* نظرة عامة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي المستخدمين</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(analyticsData.overview.totalUsers)}
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي المشاهدات</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(analyticsData.overview.totalViews)}
              </p>
            </div>
            <Eye className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي التشغيل</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(analyticsData.overview.totalPlays)}
              </p>
            </div>
            <Play className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي التحميل</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(analyticsData.overview.totalDownloads)}
              </p>
            </div>
            <Download className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي المفضلة</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(analyticsData.overview.totalFavorites)}
              </p>
            </div>
            <Heart className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي التقييمات</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(analyticsData.overview.totalRatings)}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* الاتجاهات والنمو */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            اتجاهات المشاهدات
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">اليوم</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatNumber(analyticsData.trends.dailyViews)}
                </span>
                <div className="flex items-center space-x-1 space-x-reverse">
                  {getGrowthIcon(analyticsData.trends.dailyGrowth)}
                  <span className={`text-sm font-medium ${getGrowthColor(analyticsData.trends.dailyGrowth)}`}>
                    {analyticsData.trends.dailyGrowth}%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">الأسبوع</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatNumber(analyticsData.trends.weeklyViews)}
                </span>
                <div className="flex items-center space-x-1 space-x-reverse">
                  {getGrowthIcon(analyticsData.trends.weeklyGrowth)}
                  <span className={`text-sm font-medium ${getGrowthColor(analyticsData.trends.weeklyGrowth)}`}>
                    {analyticsData.trends.weeklyGrowth}%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">الشهر</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatNumber(analyticsData.trends.monthlyViews)}
                </span>
                <div className="flex items-center space-x-1 space-x-reverse">
                  {getGrowthIcon(analyticsData.trends.monthlyGrowth)}
                  <span className={`text-sm font-medium ${getGrowthColor(analyticsData.trends.monthlyGrowth)}`}>
                    {analyticsData.trends.monthlyGrowth}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            نشاط المستخدمين
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">المستخدمين النشطين</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatNumber(analyticsData.userActivity.activeUsers)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">مستخدمين جدد</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatNumber(analyticsData.userActivity.newUsers)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">مستخدمين عائدين</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatNumber(analyticsData.userActivity.returningUsers)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">متوسط وقت الجلسة</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {analyticsData.userActivity.averageSessionTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* المحتوى الأكثر مشاهدة */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          المحتوى الأكثر مشاهدة
        </h3>
        <div className="space-y-4">
          {analyticsData.topContent.map((content, index) => (
            <div key={content.id} className="flex items-center space-x-4 space-x-reverse">
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
              <div className="flex items-center space-x-4 space-x-reverse ml-auto">
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">المشاهدات</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatNumber(content.views)}
                  </p>
                </div>
                <div className="text-right">
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

      {/* إحصائيات الأجهزة والجغرافيا */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            استخدام الأجهزة
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Monitor className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">سطح المكتب</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {analyticsData.deviceStats.desktop}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Smartphone className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">الهاتف المحمول</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {analyticsData.deviceStats.mobile}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Tablet className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">التابلت</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {analyticsData.deviceStats.tablet}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            التوزيع الجغرافي
          </h3>
          <div className="space-y-3">
            {analyticsData.geographicStats.topCountries.map((country, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {country.country}
                  </span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatNumber(country.users)}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({country.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}