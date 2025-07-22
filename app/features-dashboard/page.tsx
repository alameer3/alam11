'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Film, 
  Tv, 
  Search, 
  BarChart3, 
  Shield, 
  User,
  Database,
  Globe,
  Settings
} from 'lucide-react'
import Link from 'next/link'

interface FeatureTest {
  name: string
  endpoint?: string
  route?: string
  description: string
  category: string
  status?: 'success' | 'error' | 'loading' | 'pending'
  result?: any
}

const features: FeatureTest[] = [
  // APIs
  {
    name: 'Movies API',
    endpoint: '/api/movies',
    description: 'جلب قائمة الأفلام مع ترقيم الصفحات والتصنيفات',
    category: 'api'
  },
  {
    name: 'Series API', 
    endpoint: '/api/series',
    description: 'جلب قائمة المسلسلات والحلقات',
    category: 'api'
  },
  {
    name: 'Search API',
    endpoint: '/api/search?q=batman',
    description: 'البحث المتقدم في المحتوى',
    category: 'api'
  },
  {
    name: 'Stats API',
    endpoint: '/api/stats',
    description: 'إحصائيات شاملة للموقع',
    category: 'api'
  },
  {
    name: 'AKWAM Movies API',
    endpoint: '/api/akwam/movies',
    description: 'أفلام من البيانات الأصلية لاكوام',
    category: 'api'
  },
  {
    name: 'AKWAM Parser API',
    endpoint: '/api/akwam/parse?limit=5',
    description: 'تحليل مباشر للبيانات الحقيقية',
    category: 'api'
  },
  {
    name: 'Admin Dashboard API',
    endpoint: '/api/admin/dashboard',
    description: 'بيانات لوحة تحكم الإدارة',
    category: 'api'
  },

  // Pages
  {
    name: 'الصفحة الرئيسية',
    route: '/',
    description: 'الصفحة الرئيسية مع التنقل للترحيب',
    category: 'pages'
  },
  {
    name: 'صفحة الترحيب',
    route: '/welcome',
    description: 'صفحة الترحيب الرئيسية ليمن فليكس',
    category: 'pages'
  },
  {
    name: 'صفحة اكوام الأصلية',
    route: '/akwam',
    description: 'واجهة اكوام المطابقة للأصل',
    category: 'pages'
  },
  {
    name: 'صفحة الأفلام',
    route: '/movies',
    description: 'عرض وتصفح الأفلام',
    category: 'pages'
  },
  {
    name: 'صفحة المسلسلات',
    route: '/series',
    description: 'عرض وتصفح المسلسلات',
    category: 'pages'
  },
  {
    name: 'صفحة البحث',
    route: '/search',
    description: 'البحث في المحتوى',
    category: 'pages'
  },
  {
    name: 'لوحة التحكم',
    route: '/admin',
    description: 'لوحة تحكم الإدارة الشاملة',
    category: 'pages'
  },
  {
    name: 'تسجيل الدخول',
    route: '/auth/signin',
    description: 'صفحة تسجيل الدخول للإدارة',
    category: 'pages'
  },
  {
    name: 'اختبار APIs',
    route: '/test-apis',
    description: 'اختبار جميع نقاط الـ API',
    category: 'pages'
  },
  {
    name: 'مستكشف اكوام',
    route: '/akwam-explorer',
    description: 'استكشاف البيانات الأصلية من اكوام',
    category: 'pages'
  }
]

export default function FeaturesDashboard() {
  const [testResults, setTestResults] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})

  const testAPI = async (feature: FeatureTest) => {
    if (!feature.endpoint) return
    
    const key = feature.name
    setLoading(prev => ({ ...prev, [key]: true }))

    try {
      const response = await fetch(feature.endpoint)
      const data = await response.json()
      
      setTestResults(prev => ({
        ...prev,
        [key]: {
          success: response.ok,
          status: response.status,
          data: data,
          error: response.ok ? null : data.error || 'Unknown error'
        }
      }))
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [key]: {
          success: false,
          status: 'Network Error',
          data: null,
          error: error instanceof Error ? error.message : 'Network error'
        }
      }))
    }

    setLoading(prev => ({ ...prev, [key]: false }))
  }

  const testAllAPIs = async () => {
    const apiFeatures = features.filter(f => f.endpoint)
    for (const feature of apiFeatures) {
      await testAPI(feature)
      await new Promise(resolve => setTimeout(resolve, 100)) // تأخير قصير
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'api': return <Database className="h-5 w-5" />
      case 'pages': return <Globe className="h-5 w-5" />
      case 'admin': return <Shield className="h-5 w-5" />
      default: return <Settings className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'api': return 'bg-blue-100 text-blue-800'
      case 'pages': return 'bg-green-100 text-green-800'
      case 'admin': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const apiFeatures = features.filter(f => f.category === 'api')
  const pageFeatures = features.filter(f => f.category === 'pages')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-center">
          لوحة مزايا يمن فليكس
        </h1>
        <p className="text-gray-600 text-center mb-6">
          جميع المزايا والأنظمة في المشروع - متكاملة وجاهزة للعمل
        </p>

        {/* إحصائيات سريعة */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">APIs المتاحة</p>
                  <p className="text-2xl font-bold">{apiFeatures.length}</p>
                </div>
                <Database className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">الصفحات</p>
                  <p className="text-2xl font-bold">{pageFeatures.length}</p>
                </div>
                <Globe className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">APIs تم اختبارها</p>
                  <p className="text-2xl font-bold">{Object.keys(testResults).length}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">معدل النجاح</p>
                  <p className="text-2xl font-bold">
                    {Object.keys(testResults).length > 0 
                      ? Math.round((Object.values(testResults).filter((r: any) => r.success).length / Object.keys(testResults).length) * 100)
                      : 0}%
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-3 justify-center mb-6">
          <Button onClick={testAllAPIs} size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Database className="mr-2 h-4 w-4" />
            اختبار جميع APIs
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/akwam-explorer">
              <Search className="mr-2 h-4 w-4" />
              مستكشف اكوام
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/admin">
              <Shield className="mr-2 h-4 w-4" />
              لوحة التحكم
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="apis">APIs</TabsTrigger>
          <TabsTrigger value="pages">الصفحات</TabsTrigger>
          <TabsTrigger value="results">نتائج الاختبار</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.name} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getCategoryColor(feature.category)}>
                      {getCategoryIcon(feature.category)}
                      <span className="ml-1">
                        {feature.category === 'api' ? 'API' : feature.category === 'pages' ? 'صفحة' : 'أخرى'}
                      </span>
                    </Badge>
                    
                    {feature.endpoint && testResults[feature.name] && (
                      testResults[feature.name].success ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )
                    )}
                  </div>
                  <CardTitle className="text-lg">{feature.name}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex gap-2">
                    {feature.endpoint && (
                      <Button
                        size="sm"
                        onClick={() => testAPI(feature)}
                        disabled={loading[feature.name]}
                        className="flex-1"
                      >
                        {loading[feature.name] ? (
                          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                        ) : (
                          <Database className="mr-2 h-3 w-3" />
                        )}
                        اختبار
                      </Button>
                    )}
                    
                    {feature.route && (
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="flex-1"
                      >
                        <Link href={feature.route}>
                          <Globe className="mr-2 h-3 w-3" />
                          زيارة
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="apis" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {apiFeatures.map((feature) => {
              const result = testResults[feature.name]
              const isLoading = loading[feature.name]
              
              return (
                <Card key={feature.name}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{feature.name}</CardTitle>
                      {result && (
                        result.success ? 
                          <CheckCircle className="h-5 w-5 text-green-500" /> :
                          <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <CardDescription>{feature.description}</CardDescription>
                    {feature.endpoint && (
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {feature.endpoint}
                      </code>
                    )}
                  </CardHeader>
                  
                  <CardContent>
                    <Button 
                      onClick={() => testAPI(feature)}
                      disabled={isLoading}
                      className="w-full mb-3"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          اختبار...
                        </>
                      ) : (
                        <>
                          <Database className="mr-2 h-4 w-4" />
                          اختبار API
                        </>
                      )}
                    </Button>

                    {result && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={result.success ? "default" : "destructive"}>
                            {result.status}
                          </Badge>
                        </div>

                        {result.success && result.data && (
                          <div className="text-sm">
                            <div className="font-medium">نتيجة ناجحة:</div>
                            <pre className="bg-gray-50 p-2 rounded text-xs overflow-auto max-h-32">
                              {JSON.stringify(result.data, null, 2)}
                            </pre>
                          </div>
                        )}

                        {!result.success && result.error && (
                          <div className="text-red-600 text-sm">
                            خطأ: {result.error}
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="pages" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pageFeatures.map((feature) => (
              <Card key={feature.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{feature.name}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                  {feature.route && (
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {feature.route}
                    </code>
                  )}
                </CardHeader>
                
                <CardContent>
                  {feature.route && (
                    <Button asChild className="w-full">
                      <Link href={feature.route}>
                        <Globe className="mr-2 h-4 w-4" />
                        زيارة الصفحة
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results" className="mt-6">
          {Object.keys(testResults).length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <BarChart3 className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">لم يتم إجراء أي اختبار بعد</p>
                <Button onClick={testAllAPIs} className="mt-4">
                  اختبار جميع APIs
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>ملخص النتائج</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    {Object.entries(testResults).map(([name, result]) => (
                      <div key={name} className="flex items-center justify-between p-3 border rounded">
                        <span className="font-medium">{name}</span>
                        <div className="flex items-center gap-2">
                          {result.success ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <Badge variant={result.success ? "default" : "destructive"}>
                            {result.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}