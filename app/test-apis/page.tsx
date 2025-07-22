'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'

interface APITest {
  name: string
  endpoint: string
  description: string
}

const apiTests: APITest[] = [
  {
    name: 'Movies API',
    endpoint: '/api/movies',
    description: 'جلب قائمة الأفلام'
  },
  {
    name: 'Series API', 
    endpoint: '/api/series',
    description: 'جلب قائمة المسلسلات'
  },
  {
    name: 'Search API',
    endpoint: '/api/search?q=batman',
    description: 'البحث في المحتوى'
  },
  {
    name: 'Stats API',
    endpoint: '/api/stats',
    description: 'إحصائيات الموقع'
  },
  {
    name: 'AKWAM Movies API',
    endpoint: '/api/akwam/movies',
    description: 'أفلام من بيانات اكوام الأصلية'
  },
  {
    name: 'AKWAM Episodes API',
    endpoint: '/api/akwam/episodes',
    description: 'حلقات من بيانات اكوام الأصلية'
  },
  {
    name: 'Admin Dashboard API',
    endpoint: '/api/admin/dashboard',
    description: 'لوحة تحكم الإدارة'
  }
]

export default function TestAPIsPage() {
  const [results, setResults] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})

  const testAPI = async (test: APITest) => {
    const key = test.name
    setLoading(prev => ({ ...prev, [key]: true }))

    try {
      const response = await fetch(test.endpoint)
      const data = await response.json()
      
      setResults(prev => ({
        ...prev,
        [key]: {
          success: response.ok,
          status: response.status,
          data: data,
          error: response.ok ? null : data.error || 'Unknown error'
        }
      }))
    } catch (error) {
      setResults(prev => ({
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
    for (const test of apiTests) {
      await testAPI(test)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">اختبار APIs</h1>
        <p className="text-gray-600 mb-4">
          اختبار جميع نقاط الـ API في مشروع يمن فليكس
        </p>
        <Button onClick={testAllAPIs} className="mb-6">
          اختبار جميع الـ APIs
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {apiTests.map((test) => {
          const result = results[test.name]
          const isLoading = loading[test.name]
          
          return (
            <Card key={test.name}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{test.name}</CardTitle>
                  {result && (
                    result.success ? 
                      <CheckCircle className="h-5 w-5 text-green-500" /> :
                      <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <CardDescription>{test.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="mb-4">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                    {test.endpoint}
                  </code>
                </div>

                <Button 
                  onClick={() => testAPI(test)}
                  disabled={isLoading}
                  className="w-full mb-4"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      اختبار...
                    </>
                  ) : (
                    'اختبار'
                  )}
                </Button>

                {result && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={result.success ? "default" : "destructive"}>
                        {result.status}
                      </Badge>
                      {result.success && (
                        <Badge variant="secondary">
                          نجح
                        </Badge>
                      )}
                    </div>

                    {result.error && (
                      <div className="text-red-600 text-sm">
                        خطأ: {result.error}
                      </div>
                    )}

                    {result.success && result.data && (
                      <div className="text-sm">
                        <div className="font-medium">البيانات المستلمة:</div>
                        <pre className="bg-gray-50 p-2 rounded text-xs overflow-auto max-h-32">
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {Object.keys(results).length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">ملخص النتائج</h2>
          <div className="grid gap-2">
            {Object.entries(results).map(([name, result]) => (
              <div key={name} className="flex items-center justify-between p-3 border rounded">
                <span>{name}</span>
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
        </div>
      )}
    </div>
  )
}