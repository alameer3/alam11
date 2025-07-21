'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain,
  TrendingUp,
  Users,
  Target,
  Settings,
  Play,
  Clock,
  Star,
  Eye,
  Heart,
  Share,
  Download,
  BarChart3,
  Zap,
  Cpu,
  Database,
  RefreshCw,
  TestTube
} from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  type: 'content' | 'user' | 'category' | 'trending';
  confidence: number;
  algorithm: string;
  targetAudience: string[];
  metrics: {
    clickRate: number;
    watchTime: number;
    engagement: number;
    conversion: number;
  };
  createdAt: string;
  isActive: boolean;
}

interface AIModel {
  id: string;
  name: string;
  type: 'recommendation' | 'content_analysis' | 'user_behavior' | 'trend_prediction';
  status: 'active' | 'training' | 'inactive' | 'error';
  accuracy: number;
  lastUpdated: string;
  version: string;
  performance: {
    precision: number;
    recall: number;
    f1Score: number;
  };
}

interface UserBehavior {
  userId: string;
  userName: string;
  watchHistory: string[];
  preferences: string[];
  engagementScore: number;
  lastActivity: string;
  recommendations: string[];
  feedback: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

export default function AIRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [aiModels, setAiModels] = useState<AIModel[]>([]);
  const [userBehaviors, setUserBehaviors] = useState<UserBehavior[]>([]);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [aiConfig, setAiConfig] = useState({
    openaiApiKey: 'your-openai-api-key',
    modelEndpoint: 'https://api.openai.com/v1/chat/completions',
    maxTokens: 1000,
    temperature: 0.7,
    isEnabled: true
  });

  useEffect(() => {
    // Load AI data
    setRecommendations([
      {
        id: '1',
        title: 'توصيات أفلام أكشن بناءً على المشاهدة الأخيرة',
        type: 'content',
        confidence: 0.89,
        algorithm: 'collaborative_filtering',
        targetAudience: ['action_fans', 'young_adults'],
        metrics: {
          clickRate: 23.5,
          watchTime: 78.2,
          engagement: 65.8,
          conversion: 12.3
        },
        createdAt: '2024-01-20T10:30:00',
        isActive: true
      },
      {
        id: '2',
        title: 'توصيات مسلسلات درامية للمشاهدين المميزين',
        type: 'user',
        confidence: 0.92,
        algorithm: 'content_based',
        targetAudience: ['premium_users', 'drama_lovers'],
        metrics: {
          clickRate: 31.2,
          watchTime: 85.6,
          engagement: 72.4,
          conversion: 18.7
        },
        createdAt: '2024-01-19T15:20:00',
        isActive: true
      },
      {
        id: '3',
        title: 'توصيات المحتوى الرائج هذا الأسبوع',
        type: 'trending',
        confidence: 0.76,
        algorithm: 'trend_analysis',
        targetAudience: ['all_users'],
        metrics: {
          clickRate: 45.8,
          watchTime: 92.1,
          engagement: 88.3,
          conversion: 25.4
        },
        createdAt: '2024-01-18T09:15:00',
        isActive: true
      }
    ]);

    setAiModels([
      {
        id: '1',
        name: 'Content Recommendation Engine',
        type: 'recommendation',
        status: 'active',
        accuracy: 89.5,
        lastUpdated: '2024-01-20T12:00:00',
        version: '2.1.0',
        performance: {
          precision: 0.87,
          recall: 0.91,
          f1Score: 0.89
        }
      },
      {
        id: '2',
        name: 'User Behavior Analyzer',
        type: 'user_behavior',
        status: 'active',
        accuracy: 92.3,
        lastUpdated: '2024-01-20T11:30:00',
        version: '1.8.2',
        performance: {
          precision: 0.90,
          recall: 0.94,
          f1Score: 0.92
        }
      },
      {
        id: '3',
        name: 'Trend Prediction Model',
        type: 'trend_prediction',
        status: 'training',
        accuracy: 78.9,
        lastUpdated: '2024-01-20T10:00:00',
        version: '1.5.1',
        performance: {
          precision: 0.76,
          recall: 0.82,
          f1Score: 0.79
        }
      }
    ]);

    setUserBehaviors([
      {
        userId: 'user1',
        userName: 'أحمد محمد',
        watchHistory: ['movie1', 'movie2', 'series1'],
        preferences: ['action', 'drama', 'comedy'],
        engagementScore: 85.6,
        lastActivity: '2024-01-20T10:30:00',
        recommendations: ['movie3', 'series2', 'movie4'],
        feedback: {
          positive: 12,
          negative: 2,
          neutral: 3
        }
      },
      {
        userId: 'user2',
        userName: 'سارة أحمد',
        watchHistory: ['series1', 'movie3', 'series2'],
        preferences: ['drama', 'romance', 'thriller'],
        engagementScore: 92.3,
        lastActivity: '2024-01-20T09:15:00',
        recommendations: ['series3', 'movie5', 'series4'],
        feedback: {
          positive: 18,
          negative: 1,
          neutral: 2
        }
      }
    ]);
  }, []);

  const testAIRecommendation = async () => {
    // console.log('Testing AI recommendation...');
    // Simulate AI recommendation test
  };

  const retrainModel = async (modelId: string) => {
    // console.log(`Retraining model: ${modelId}`);
    // Simulate model retraining
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'training': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlgorithmColor = (algorithm: string) => {
    switch (algorithm) {
      case 'collaborative_filtering': return 'bg-blue-100 text-blue-800';
      case 'content_based': return 'bg-purple-100 text-purple-800';
      case 'trend_analysis': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">توصيات الذكاء الاصطناعي</h1>
          <p className="text-gray-600">إدارة وتطوير نظام التوصيات الذكي</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={testAIRecommendation}>
            <TestTube className="h-4 w-4 mr-2" />
            اختبار التوصيات
          </Button>
          <Button>
            <Brain className="h-4 w-4 mr-2" />
            تحسين النموذج
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">دقة التوصيات</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89.5%</div>
            <p className="text-xs text-muted-foreground">+2.3% من الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">معدل النقر</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23.8%</div>
            <p className="text-xs text-muted-foreground">+5.2% من الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">وقت المشاهدة</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.4%</div>
            <p className="text-xs text-muted-foreground">+3.1% من الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">التحويل</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15.7%</div>
            <p className="text-xs text-muted-foreground">+1.8% من الشهر الماضي</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="recommendations">التوصيات</TabsTrigger>
          <TabsTrigger value="models">النماذج</TabsTrigger>
          <TabsTrigger value="users">سلوك المستخدمين</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>أداء التوصيات</CardTitle>
                <CardDescription>إحصائيات أداء نظام التوصيات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>دقة التوصيات</span>
                    <span className="font-medium">89.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>معدل النقر</span>
                    <span className="font-medium">23.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>وقت المشاهدة</span>
                    <span className="font-medium">78.4%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>معدل التحويل</span>
                    <span className="font-medium">15.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>رضا المستخدمين</span>
                    <span className="font-medium">4.2/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>أفضل الخوارزميات</CardTitle>
                <CardDescription>أداء خوارزميات التوصيات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Collaborative Filtering</span>
                    <span className="font-medium">92.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Content-Based</span>
                    <span className="font-medium">88.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Deep Learning</span>
                    <span className="font-medium">94.1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Hybrid Model</span>
                    <span className="font-medium">96.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>التوصيات النشطة</CardTitle>
              <CardDescription>إدارة التوصيات الحالية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((recommendation) => (
                  <div key={recommendation.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{recommendation.title}</h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge className={getAlgorithmColor(recommendation.algorithm)}>
                            {recommendation.algorithm}
                          </Badge>
                          <Badge variant="outline">
                            الثقة: {Math.round(recommendation.confidence * 100)}%
                          </Badge>
                          <Badge variant={recommendation.isActive ? 'default' : 'secondary'}>
                            {recommendation.isActive ? 'نشط' : 'غير نشط'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-4 gap-4 mt-3">
                          <div>
                            <p className="text-sm text-gray-500">معدل النقر</p>
                            <p className="font-medium">{recommendation.metrics.clickRate}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">وقت المشاهدة</p>
                            <p className="font-medium">{recommendation.metrics.watchTime}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">التفاعل</p>
                            <p className="font-medium">{recommendation.metrics.engagement}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">التحويل</p>
                            <p className="font-medium">{recommendation.metrics.conversion}%</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm text-gray-600">الجمهور المستهدف:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {recommendation.targetAudience.map((audience) => (
                              <Badge key={audience} variant="outline" className="text-xs">
                                {audience}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Models Tab */}
        <TabsContent value="models" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>نماذج الذكاء الاصطناعي</CardTitle>
              <CardDescription>إدارة نماذج ML و AI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiModels.map((model) => (
                  <div key={model.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{model.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">الإصدار: {model.version}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge className={getStatusColor(model.status)}>
                            {model.status === 'active' ? 'نشط' : 
                             model.status === 'training' ? 'قيد التدريب' : 
                             model.status === 'inactive' ? 'غير نشط' : 'خطأ'}
                          </Badge>
                          <Badge variant="outline">
                            الدقة: {model.accuracy}%
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-3">
                          <div>
                            <p className="text-sm text-gray-500">Precision</p>
                            <p className="font-medium">{model.performance.precision}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Recall</p>
                            <p className="font-medium">{model.performance.recall}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">F1 Score</p>
                            <p className="font-medium">{model.performance.f1Score}</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          آخر تحديث: {model.lastUpdated}
                        </p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => retrainModel(model.id)}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تحليل سلوك المستخدمين</CardTitle>
              <CardDescription>فهم سلوك المستخدمين لتحسين التوصيات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userBehaviors.map((user) => (
                  <div key={user.userId} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{user.userName}</h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="outline">
                            التفاعل: {user.engagementScore}%
                          </Badge>
                          <span className="text-sm text-gray-500">
                            آخر نشاط: {user.lastActivity}
                          </span>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm font-medium">التفضيلات:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {user.preferences.map((pref) => (
                              <Badge key={pref} variant="outline" className="text-xs">
                                {pref}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm font-medium">التوصيات الحالية:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {user.recommendations.map((rec) => (
                              <Badge key={rec} variant="secondary" className="text-xs">
                                {rec}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-3">
                          <div>
                            <p className="text-sm text-gray-500">إيجابي</p>
                            <p className="font-medium text-green-600">{user.feedback.positive}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">سلبي</p>
                            <p className="font-medium text-red-600">{user.feedback.negative}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">محايد</p>
                            <p className="font-medium text-gray-600">{user.feedback.neutral}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الذكاء الاصطناعي</CardTitle>
              <CardDescription>تكوين إعدادات نظام التوصيات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>مفتاح API الخاص بـ OpenAI</Label>
                <Input
                  value={aiConfig.openaiApiKey}
                  onChange={(e) => setAiConfig(prev => ({ ...prev, openaiApiKey: e.target.value }))}
                  type="password"
                  placeholder="أدخل مفتاح API"
                />
              </div>

              <div className="space-y-2">
                <Label>نقطة النهاية</Label>
                <Input
                  value={aiConfig.modelEndpoint}
                  onChange={(e) => setAiConfig(prev => ({ ...prev, modelEndpoint: e.target.value }))}
                  placeholder="رابط نقطة النهاية"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>الحد الأقصى للرموز</Label>
                  <Input
                    type="number"
                    value={aiConfig.maxTokens}
                    onChange={(e) => setAiConfig(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>درجة الحرارة</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={aiConfig.temperature}
                    onChange={(e) => setAiConfig(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>تفعيل نظام التوصيات</Label>
                <Switch
                  checked={aiConfig.isEnabled}
                  onCheckedChange={(checked) => setAiConfig(prev => ({ ...prev, isEnabled: checked }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}