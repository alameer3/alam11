import { Suspense } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { VideoPlayer } from '@/components/video/video-player'
import { RelatedMovies } from '@/components/movies/related-movies'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Button } from '@/components/ui/button'
import { 
  Download, 
  Share2, 
  Flag, 
  Star,
  Eye,
  Calendar,
  Play
} from 'lucide-react'

// Mock data - في التطبيق الحقيقي، سيتم جلب البيانات من قاعدة البيانات
const movie = {
  id: '1',
  title: 'فيلم الأكشن الملحمي',
  slug: 'epic-action-movie',
  description: 'قصة مشوقة مليئة بالأحداث المثيرة والمفاجآت',
  videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
  poster: 'https://via.placeholder.com/300x450/1e293b/ffffff?text=Movie+Poster',
  year: 2024,
  duration: 145,
  rating: 8.7,
  views: 12540,
  genre: ['أكشن', 'إثارة', 'مغامرة']
}

interface WatchPageProps {
  params: {
    slug: string
  }
  searchParams: {
    quality?: string
    episode?: string
  }
}

export default function WatchPage({ params, searchParams }: WatchPageProps) {
  const quality = searchParams.quality || 'hd'

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Movie Info Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{movie.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span>{movie.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{movie.views.toLocaleString('ar')} مشاهدة</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 ml-1" />
                تحميل
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 ml-1" />
                مشاركة
              </Button>
              <Button variant="outline" size="sm">
                <Flag className="h-4 w-4 ml-1" />
                إبلاغ
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Video Player */}
          <div className="lg:col-span-3">
            <div className="mb-4">
              {/* Quality Selector */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">الجودة:</span>
                  <div className="flex gap-2">
                    {['480p', 'HD', 'FHD', '4K'].map((q) => (
                      <Button
                        key={q}
                        variant={quality === q.toLowerCase() ? 'default' : 'outline'}
                        size="sm"
                      >
                        {q}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">السيرفر:</span>
                  <select className="bg-background border border-input rounded px-2 py-1 text-sm">
                    <option value="server1">السيرفر الأول</option>
                    <option value="server2">السيرفر الثاني</option>
                    <option value="server3">السيرفر الثالث</option>
                  </select>
                </div>
              </div>

              {/* Video Player */}
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <Suspense fallback={<LoadingSpinner />}>
                  <VideoPlayer 
                    url={movie.videoUrl}
                    poster={movie.poster}
                    className="w-full h-full"
                  />
                </Suspense>
              </div>
            </div>

            {/* Movie Description */}
            <div className="bg-card rounded-lg border p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">نبذة عن الفيلم</h3>
              <p className="text-muted-foreground leading-relaxed">
                {movie.description}
              </p>
              
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {movie.genre.map((genre) => (
                    <span key={genre} className="genre-badge">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Alternative Servers */}
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">سيرفرات بديلة</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((server) => (
                  <Button
                    key={server}
                    variant="outline"
                    className="flex items-center justify-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    السيرفر {server}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Suspense fallback={<LoadingSpinner />}>
              <RelatedMovies currentMovieId={movie.id} />
            </Suspense>
          </div>
        </div>

        {/* Warning Notice */}
        <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-start gap-3">
            <Flag className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800 dark:text-yellow-200">
              <p className="font-medium mb-1">تنبيه مهم:</p>
              <p>
                يُرجى عدم مشاركة روابط الموقع على وسائل التواصل الاجتماعي للحفاظ على استمرارية الخدمة.
                في حالة عدم عمل أي رابط، يُرجى التبليغ عنه لنتمكن من إصلاحه.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}