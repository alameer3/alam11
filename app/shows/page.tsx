import { Suspense } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { MovieCard } from '@/components/movies/movie-card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

// Mock data - replace with real data from database
const shows = [
  {
    id: '1',
    title: 'برنامج المنوعات الشهير',
    slug: 'famous-variety-show',
    poster: 'https://via.placeholder.com/300x450/1e293b/ffffff?text=Show+1',
    rating: 8.9,
    year: 2024,
    duration: 60,
    genres: ['منوعات', 'كوميدي']
  },
  {
    id: '2',
    title: 'برنامج الطبخ الممتع',
    slug: 'fun-cooking-show',
    poster: 'https://via.placeholder.com/300x450/0f172a/ffffff?text=Show+2',
    rating: 8.2,
    year: 2024,
    duration: 45,
    genres: ['طبخ', 'تعليمي']
  },
  {
    id: '3',
    title: 'برنامج المسابقات',
    slug: 'quiz-show',
    poster: 'https://via.placeholder.com/300x450/374151/ffffff?text=Show+3',
    rating: 7.8,
    year: 2024,
    duration: 90,
    genres: ['مسابقات', 'ترفيه']
  },
  {
    id: '4',
    title: 'برنامج السفر والرحلات',
    slug: 'travel-show',
    poster: 'https://via.placeholder.com/300x450/1f2937/ffffff?text=Show+4',
    rating: 8.5,
    year: 2024,
    duration: 30,
    genres: ['سفر', 'وثائقي']
  },
  {
    id: '5',
    title: 'برنامج الموسيقى والفن',
    slug: 'music-art-show',
    poster: 'https://via.placeholder.com/300x450/111827/ffffff?text=Show+5',
    rating: 8.7,
    year: 2024,
    duration: 75,
    genres: ['موسيقى', 'فن']
  },
  {
    id: '6',
    title: 'برنامج الرياضة اليومي',
    slug: 'daily-sports-show',
    poster: 'https://via.placeholder.com/300x450/0c1017/ffffff?text=Show+6',
    rating: 8.0,
    year: 2024,
    duration: 120,
    genres: ['رياضة', 'إخباري']
  }
]

export default function ShowsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">البرامج التلفزيونية</h1>
          <p className="text-muted-foreground">
            استمتع بمشاهدة أفضل البرامج التلفزيونية المتنوعة من منوعات وطبخ ومسابقات
          </p>
        </div>

        {/* Filters Section */}
        <div className="mb-8 flex flex-wrap gap-4">
          <select className="bg-background border border-input rounded-md px-3 py-2 text-sm">
            <option value="">جميع الأنواع</option>
            <option value="variety">منوعات</option>
            <option value="cooking">طبخ</option>
            <option value="quiz">مسابقات</option>
            <option value="travel">سفر</option>
            <option value="music">موسيقى</option>
            <option value="sports">رياضة</option>
          </select>
          
          <select className="bg-background border border-input rounded-md px-3 py-2 text-sm">
            <option value="">جميع السنوات</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
          
          <select className="bg-background border border-input rounded-md px-3 py-2 text-sm">
            <option value="">مدة الحلقة</option>
            <option value="short">قصيرة (أقل من 30 دقيقة)</option>
            <option value="medium">متوسطة (30-60 دقيقة)</option>
            <option value="long">طويلة (أكثر من 60 دقيقة)</option>
          </select>
          
          <select className="bg-background border border-input rounded-md px-3 py-2 text-sm">
            <option value="rating">الأعلى تقييماً</option>
            <option value="year">الأحدث</option>
            <option value="title">الاسم</option>
            <option value="duration">المدة</option>
          </select>
        </div>

        {/* Shows Grid */}
        <Suspense fallback={<LoadingSpinner />}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
            {shows.map((show) => (
              <MovieCard key={show.id} movie={show} />
            ))}
          </div>
        </Suspense>

        {/* Featured Shows Section */}
        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">البرامج المميزة هذا الأسبوع</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shows.slice(0, 3).map((show) => (
              <div key={show.id} className="bg-card rounded-lg border overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={show.poster}
                    alt={show.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-bold text-lg mb-2">{show.title}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        ⭐ {show.rating}
                      </span>
                      <span>{show.year}</span>
                      <span>{show.duration} دقيقة</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-md hover:bg-primary/90 transition-colors">
            تحميل المزيد
          </button>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}