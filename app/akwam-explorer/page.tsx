'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2, Film, Tv, BarChart3 } from 'lucide-react'

interface AkwamContent {
  id: string
  title: string
  description: string
  poster: string
  rating: number
  views?: number
  source: string
  seriesTitle?: string
  episodeNumber?: number
  quality?: string
  year?: number
}

interface AkwamStats {
  moviesCount: number
  seriesCount: number
  totalFiles: number
  parsedMovies: number
  parsedSeries: number
  message: string
}

export default function AkwamExplorerPage() {
  const [data, setData] = useState<AkwamContent[]>([])
  const [stats, setStats] = useState<AkwamStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const loadAkwamData = async (type: string = 'all') => {
    setLoading(true)
    try {
      const response = await fetch(`/api/akwam/parse?type=${type}&limit=30`)
      const result = await response.json()
      
      if (result.success) {
        setData(result.data)
        setStats(result.stats)
      } else {
        console.error('خطأ في جلب البيانات:', result.error)
      }
    } catch (error) {
      console.error('خطأ في الاتصال:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadAkwamData()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-center">
          🎬 مستكشف محتوى اكوام الأصلي
        </h1>
        <p className="text-gray-600 text-center mb-6">
          استكشاف وتحليل البيانات الحقيقية من مجلد ak.sv
        </p>

        {stats && (
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">إجمالي الأفلام</p>
                    <p className="text-2xl font-bold">{stats.moviesCount.toLocaleString()}</p>
                  </div>
                  <Film className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">إجمالي الحلقات</p>
                    <p className="text-2xl font-bold">{stats.seriesCount.toLocaleString()}</p>
                  </div>
                  <Tv className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">تم تحليله</p>
                    <p className="text-2xl font-bold">{stats.totalFiles}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">معدل التحليل</p>
                    <p className="text-2xl font-bold">
                      {((stats.totalFiles / (stats.moviesCount + stats.seriesCount)) * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-bold">%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="movies">الأفلام</TabsTrigger>
          <TabsTrigger value="series">المسلسلات</TabsTrigger>
          <TabsTrigger value="actions">الإجراءات</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.slice(0, 12).map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="mb-2">
                      {item.source}
                    </Badge>
                    <Badge variant="outline">
                      ⭐ {item.rating}/10
                    </Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                  {item.seriesTitle && (
                    <CardDescription>
                      مسلسل: {item.seriesTitle} - الحلقة {item.episodeNumber}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    {item.views && <span>👀 {item.views.toLocaleString()}</span>}
                    {item.quality && <span>🎥 {item.quality}</span>}
                    {item.year && <span>📅 {item.year}</span>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="movies" className="mt-6">
          <Button 
            onClick={() => loadAkwamData('movies')} 
            disabled={loading}
            className="mb-4"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            تحليل الأفلام
          </Button>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.filter(item => !item.seriesTitle).map((movie) => (
              <Card key={movie.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{movie.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge>⭐ {movie.rating}</Badge>
                    {movie.quality && <Badge variant="secondary">{movie.quality}</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {movie.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="series" className="mt-6">
          <Button 
            onClick={() => loadAkwamData('series')} 
            disabled={loading}
            className="mb-4"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            تحليل المسلسلات
          </Button>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.filter(item => item.seriesTitle).map((episode) => (
              <Card key={episode.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{episode.seriesTitle}</CardTitle>
                  <CardDescription>الحلقة {episode.episodeNumber}</CardDescription>
                  <Badge className="w-fit">⭐ {episode.rating}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {episode.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="actions" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>تحليل شامل</CardTitle>
                <CardDescription>
                  تحليل جميع ملفات اكوام واستخراج البيانات
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => loadAkwamData('all')}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  تحليل شامل
                </Button>
                
                <Button 
                  onClick={() => loadAkwamData('movies')}
                  disabled={loading}
                  variant="outline"
                  className="w-full"
                >
                  تحليل الأفلام فقط
                </Button>
                
                <Button 
                  onClick={() => loadAkwamData('series')}
                  disabled={loading}
                  variant="outline"
                  className="w-full"
                >
                  تحليل المسلسلات فقط
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>معلومات التحليل</CardTitle>
                <CardDescription>
                  إحصائيات عن عملية التحليل الحالية
                </CardDescription>
              </CardHeader>
              <CardContent>
                {stats ? (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>الأفلام المكتشفة:</span>
                      <span className="font-mono">{stats.moviesCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>الحلقات المكتشفة:</span>
                      <span className="font-mono">{stats.seriesCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>تم تحليله:</span>
                      <span className="font-mono">{stats.totalFiles}</span>
                    </div>
                    <div className="pt-2 mt-3 border-t">
                      <p className="text-xs text-gray-600">{stats.message}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">لم يتم التحليل بعد</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}