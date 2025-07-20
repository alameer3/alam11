'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  Heart, 
  MessageSquare, 
  Download,
  Clock,
  Calendar,
  Filter,
  Download as DownloadIcon,
  Share2,
  RefreshCw,
  Settings,
  Target,
  Activity,
  Globe,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';

interface AnalyticsData {
  overview: {
    totalViews: number;
    totalLikes: number;
    totalComments: number;
    totalDownloads: number;
    growthRate: number;
    engagementRate: number;
  };
  viewsByDay: Array<{
    date: string;
    views: number;
    likes: number;
    comments: number;
  }>;
  topContent: Array<{
    id: string;
    title: string;
    views: number;
    likes: number;
    comments: number;
    category: string;
  }>;
  userDemographics: {
    ageGroups: Array<{ age: string; percentage: number }>;
    countries: Array<{ country: string; users: number }>;
    devices: Array<{ device: string; percentage: number }>;
  };
  engagementMetrics: {
    averageWatchTime: number;
    completionRate: number;
    bounceRate: number;
    returnRate: number;
  };
}

const mockAnalyticsData: AnalyticsData = {
  overview: {
    totalViews: 1542078,
    totalLikes: 89234,
    totalComments: 45678,
    totalDownloads: 23456,
    growthRate: 12.5,
    engagementRate: 8.7
  },
  viewsByDay: [
    { date: '2024-01-01', views: 15420, likes: 892, comments: 456 },
    { date: '2024-01-02', views: 16234, likes: 945, comments: 478 },
    { date: '2024-01-03', views: 15890, likes: 912, comments: 467 },
    { date: '2024-01-04', views: 17123, likes: 987, comments: 512 },
    { date: '2024-01-05', views: 16567, likes: 934, comments: 489 },
    { date: '2024-01-06', views: 18234, likes: 1056, comments: 534 },
    { date: '2024-01-07', views: 17543, likes: 1012, comments: 523 }
  ],
  topContent: [
    {
      id: '1',
      title: 'The Matrix',
      views: 125430,
      likes: 8923,
      comments: 4567,
      category: 'أفلام'
    },
    {
      id: '2',
      title: 'Breaking Bad',
      views: 98765,
      likes: 6543,
      comments: 3210,
      category: 'مسلسلات'
    },
    {
      id: '3',
      title: 'Attack on Titan',
      views: 87654,
      likes: 5432,
      comments: 2987,
      category: 'أنمي'
    },
    {
      id: '4',
      title: 'Inception',
      views: 76543,
      likes: 4321,
      comments: 2156,
      category: 'أفلام'
    },
    {
      id: '5',
      title: 'Game of Thrones',
      views: 65432,
      likes: 3987,
      comments: 1987,
      category: 'مسلسلات'
    }
  ],
  userDemographics: {
    ageGroups: [
      { age: '13-17', percentage: 15 },
      { age: '18-24', percentage: 35 },
      { age: '25-34', percentage: 28 },
      { age: '35-44', percentage: 15 },
      { age: '45+', percentage: 7 }
    ],
    countries: [
      { country: 'مصر', users: 45678 },
      { country: 'السعودية', users: 34567 },
      { country: 'الإمارات', users: 23456 },
      { country: 'الكويت', users: 12345 },
      { country: 'عمان', users: 9876 }
    ],
    devices: [
      { device: 'موبايل', percentage: 65 },
      { device: 'ديسكتوب', percentage: 25 },
      { device: 'تابلت', percentage: 10 }
    ]
  },
  engagementMetrics: {
    averageWatchTime: 45.2,
    completionRate: 78.5,
    bounceRate: 12.3,
    returnRate: 85.7
  }
};

export default function AdvancedAnalyticsSystem() {
  const [data, setData] = useState<AnalyticsData>(mockAnalyticsData);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('7d');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<'views' | 'likes' | 'comments' | 'downloads'>('views');

  useEffect(() => {
    // محاكاة تحميل البيانات
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [timeRange]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getGrowthIcon = (rate: number) => {
    return rate > 0 ? (
      <TrendingUp className="w-4 h-4 text-green-500" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-500" />
    );
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'موبايل':
        return <Smartphone className="w-4 h-4" />;
      case 'ديسكتوب':
        return <Monitor className="w-4 h-4" />;
      case 'تابلت':
        return <Tablet className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">التحليلات المتقدمة</h1>
            <p className="text-slate-300">تتبع أداء المحتوى وتحليل سلوك المستخدمين</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <DownloadIcon className="w-4 h-4 mr-2" />
              تصدير التقرير
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              مشاركة
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              الإعدادات
            </Button>
          </div>
        </div>

        {/* نظرة عامة */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">إجمالي المشاهدات</p>
                  <p className="text-3xl font-bold text-white">{formatNumber(data.overview.totalViews)}</p>
                </div>
                <Eye className="w-8 h-8 text-blue-500" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                {getGrowthIcon(data.overview.growthRate)}
                <span className="text-green-500 text-sm">+{data.overview.growthRate}%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">إجمالي الإعجابات</p>
                  <p className="text-3xl font-bold text-white">{formatNumber(data.overview.totalLikes)}</p>
                </div>
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                {getGrowthIcon(8.2)}
                <span className="text-green-500 text-sm">+8.2%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">إجمالي التعليقات</p>
                  <p className="text-3xl font-bold text-white">{formatNumber(data.overview.totalComments)}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-green-500" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                {getGrowthIcon(15.3)}
                <span className="text-green-500 text-sm">+15.3%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">إجمالي التحميلات</p>
                  <p className="text-3xl font-bold text-white">{formatNumber(data.overview.totalDownloads)}</p>
                </div>
                <Download className="w-8 h-8 text-purple-500" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                {getGrowthIcon(5.7)}
                <span className="text-green-500 text-sm">+5.7%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* التبويبات الرئيسية */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="content">المحتوى</TabsTrigger>
            <TabsTrigger value="demographics">الجمهور</TabsTrigger>
            <TabsTrigger value="engagement">التفاعل</TabsTrigger>
            <TabsTrigger value="realtime">مباشر</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* رسم بياني للمشاهدات */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">المشاهدات اليومية</CardTitle>
                  <CardDescription className="text-slate-400">
                    تتبع المشاهدات خلال آخر 7 أيام
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {data.viewsByDay.map((day, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="w-8 bg-blue-500 rounded-t"
                          style={{ 
                            height: `${(day.views / Math.max(...data.viewsByDay.map(d => d.views))) * 200}px` 
                          }}
                        />
                        <span className="text-xs text-slate-400 mt-2">
                          {new Date(day.date).toLocaleDateString('ar-EG', { day: 'numeric' })}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* معدل النمو */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">معدل النمو</CardTitle>
                  <CardDescription className="text-slate-400">
                    مقارنة مع الفترة السابقة
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">المشاهدات</span>
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">+{data.overview.growthRate}%</span>
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">الإعجابات</span>
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">+8.2%</span>
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">التعليقات</span>
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">+15.3%</span>
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">التحميلات</span>
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">+5.7%</span>
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">أفضل المحتوى</CardTitle>
                <CardDescription className="text-slate-400">
                  المحتوى الأكثر مشاهدة وتفاعلاً
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.topContent.map((content, index) => (
                    <div key={content.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary">{index + 1}</Badge>
                        <div>
                          <h4 className="text-white font-semibold">{content.title}</h4>
                          <p className="text-slate-400 text-sm">{content.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-white font-semibold">{formatNumber(content.views)}</p>
                          <p className="text-slate-400 text-xs">مشاهدة</p>
                        </div>
                        <div className="text-center">
                          <p className="text-white font-semibold">{formatNumber(content.likes)}</p>
                          <p className="text-slate-400 text-xs">إعجاب</p>
                        </div>
                        <div className="text-center">
                          <p className="text-white font-semibold">{formatNumber(content.comments)}</p>
                          <p className="text-slate-400 text-xs">تعليق</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* الفئات العمرية */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">الفئات العمرية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {data.userDemographics.ageGroups.map((group) => (
                      <div key={group.age} className="flex items-center justify-between">
                        <span className="text-slate-300">{group.age}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-700 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${group.percentage}%` }}
                            />
                          </div>
                          <span className="text-white text-sm">{group.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* الدول */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">أفضل الدول</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {data.userDemographics.countries.map((country) => (
                      <div key={country.country} className="flex items-center justify-between">
                        <span className="text-slate-300">{country.country}</span>
                        <span className="text-white font-semibold">{formatNumber(country.users)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* الأجهزة */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">الأجهزة المستخدمة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {data.userDemographics.devices.map((device) => (
                      <div key={device.device} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getDeviceIcon(device.device)}
                          <span className="text-slate-300">{device.device}</span>
                        </div>
                        <span className="text-white font-semibold">{device.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* مقاييس التفاعل */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">مقاييس التفاعل</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">متوسط وقت المشاهدة</span>
                      <span className="text-white font-semibold">{data.engagementMetrics.averageWatchTime} دقيقة</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">معدل الإكمال</span>
                      <span className="text-white font-semibold">{data.engagementMetrics.completionRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">معدل الارتداد</span>
                      <span className="text-white font-semibold">{data.engagementMetrics.bounceRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">معدل العودة</span>
                      <span className="text-white font-semibold">{data.engagementMetrics.returnRate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* معدل التفاعل */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">معدل التفاعل</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">
                      {data.overview.engagementRate}%
                    </div>
                    <p className="text-slate-400">معدل التفاعل الإجمالي</p>
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-green-500">+2.3% من الشهر الماضي</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="realtime" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-500" />
                  النشاط المباشر
                </CardTitle>
                <CardDescription className="text-slate-400">
                  تحديثات فورية للنشاط الحالي
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-white">1,247</div>
                    <p className="text-slate-400 text-sm">مشاهد الآن</p>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-white">89</div>
                    <p className="text-slate-400 text-sm">تعليق جديد</p>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-white">234</div>
                    <p className="text-slate-400 text-sm">إعجاب جديد</p>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-white">45</div>
                    <p className="text-slate-400 text-sm">تحميل جديد</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}