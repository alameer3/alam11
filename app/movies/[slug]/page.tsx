import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { VideoPlayer } from '@/components/video/video-player'
import { MovieDetails } from '@/components/movies/movie-details'
import { RelatedMovies } from '@/components/movies/related-movies'
import { CommentsSection } from '@/components/movies/comments-section'
import { DownloadSection } from '@/components/movies/download-section'
import { 
  Play, 
  Plus, 
  Share, 
  Star, 
  Calendar, 
  Clock, 
  Eye,
  Download,
  BookmarkPlus
} from 'lucide-react'

// Mock data - في التطبيق الحقيقي، سيتم جلب البيانات من قاعدة البيانات
const movie = {
  id: '1',
  title: 'فيلم الأكشن الملحمي',
  slug: 'epic-action-movie',
  description: 'قصة مشوقة مليئة بالأحداث المثيرة والمفاجآت التي ستجعلك على حافة مقعدك طوال الوقت. فيلم يحكي قصة بطل شجاع يواجه قوى الشر في معركة ملحمية لإنقاذ العالم من الدمار المحقق.',
  poster: 'https://via.placeholder.com/400x600/1e293b/ffffff?text=Movie+Poster',
  backdrop: 'https://via.placeholder.com/1920x1080/0f172a/ffffff?text=Movie+Backdrop',
  trailer: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
  year: 2024,
  duration: 145,
  rating: 8.7,
  imdbRating: 8.5,
  genre: ['أكشن', 'إثارة', 'مغامرة'],
  country: 'الولايات المتحدة',
  language: 'إنجليزية',
  director: 'المخرج الشهير',
  cast: ['النجم الأول', 'النجمة الثانية', 'الممثل الثالث'],
  views: 12540,
  releaseDate: '2024-01-15',
  quality: ['HD', 'FHD', '4K'],
  sources: [
    {
      quality: 'HD',
      size: '1.2 GB',
      url: '/watch/epic-action-movie?quality=hd'
    },
    {
      quality: 'FHD',
      size: '2.1 GB', 
      url: '/watch/epic-action-movie?quality=fhd'
    },
    {
      quality: '4K',
      size: '4.8 GB',
      url: '/watch/epic-action-movie?quality=4k'
    }
  ]
}

interface MoviePageProps {
  params: {
    slug: string
  }
}

export default function MoviePage({ params }: MoviePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section with Backdrop */}
        <section className="relative h-[70vh] overflow-hidden">
          <Image
            src={movie.backdrop}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          {/* Movie Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
                {/* Poster */}
                <div className="lg:col-span-1">
                  <div className="relative w-64 h-96 mx-auto lg:mx-0">
                    <Image
                      src={movie.poster}
                      alt={movie.title}
                      fill
                      className="object-cover rounded-lg shadow-2xl"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="quality-badge quality-4k">4K</span>
                    </div>
                  </div>
                </div>
                
                {/* Movie Details */}
                <div className="lg:col-span-2 text-white">
                  <h1 className="text-4xl lg:text-6xl font-bold mb-4">{movie.title}</h1>
                  
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-6 mb-6 text-lg">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span>{movie.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <span>{movie.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      <span>{Math.floor(movie.duration / 60)}س {movie.duration % 60}د</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      <span>{movie.views.toLocaleString('ar')} مشاهدة</span>
                    </div>
                  </div>
                  
                  {/* Genres */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {movie.genre.map((genre) => (
                      <span key={genre} className="genre-badge">
                        {genre}
                      </span>
                    ))}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <Button size="lg" className="px-8 py-3 text-lg" asChild>
                      <Link href={`/watch/${movie.slug}`}>
                        <Play className="h-6 w-6 ml-2" />
                        مشاهدة الآن
                      </Link>
                    </Button>
                    
                    <Button variant="secondary" size="lg" className="px-6 py-3">
                      <Plus className="h-5 w-5 ml-2" />
                      إضافة للقائمة
                    </Button>
                    
                    <Button variant="outline" size="lg" className="px-6 py-3">
                      <Download className="h-5 w-5 ml-2" />
                      تحميل
                    </Button>
                    
                    <Button variant="ghost" size="lg" className="px-6 py-3">
                      <Share className="h-5 w-5 ml-2" />
                      مشاركة
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Movie Description */}
              <section>
                <h2 className="text-2xl font-bold mb-4">القصة</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {movie.description}
                </p>
              </section>

              {/* Video Player Section */}
              <section>
                <h2 className="text-2xl font-bold mb-4">الإعلان الترويجي</h2>
                <Suspense fallback={<LoadingSpinner />}>
                  <VideoPlayer url={movie.trailer} />
                </Suspense>
              </section>

              {/* Movie Details */}
              <Suspense fallback={<LoadingSpinner />}>
                <MovieDetails movie={movie} />
              </Suspense>

              {/* Comments Section */}
              <Suspense fallback={<LoadingSpinner />}>
                <CommentsSection movieId={movie.id} />
              </Suspense>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Download Section */}
              <Suspense fallback={<LoadingSpinner />}>
                <DownloadSection sources={movie.sources} />
              </Suspense>

              {/* Related Movies */}
              <Suspense fallback={<LoadingSpinner />}>
                <RelatedMovies currentMovieId={movie.id} />
              </Suspense>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}