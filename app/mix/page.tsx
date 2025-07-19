import { Suspense } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { MovieCard } from '@/components/movies/movie-card'
import { SeriesCard } from '@/components/series/series-card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

// Mock mixed content data
const mixedContent = [
  {
    id: '1',
    title: 'فيلم الأكشن الملحمي',
    slug: 'epic-action-movie',
    poster: 'https://via.placeholder.com/300x450/1e293b/ffffff?text=Movie+1',
    rating: 8.7,
    year: 2024,
    duration: 145,
    type: 'movie',
    genres: ['أكشن', 'إثارة']
  },
  {
    id: '2',
    title: 'مسلسل الغموض المثير',
    slug: 'mystery-series',
    poster: 'https://via.placeholder.com/300x450/0f172a/ffffff?text=Series+1',
    rating: 9.1,
    year: 2024,
    episodes: 12,
    seasons: 2,
    type: 'series',
    genres: ['غموض', 'دراما']
  },
  {
    id: '3',
    title: 'برنامج المنوعات الشهير',
    slug: 'famous-variety-show',
    poster: 'https://via.placeholder.com/300x450/374151/ffffff?text=Show+1',
    rating: 8.9,
    year: 2024,
    duration: 60,
    type: 'show',
    genres: ['منوعات', 'كوميدي']
  },
  {
    id: '4',
    title: 'فيلم الكوميديا الرومانسية',
    slug: 'romantic-comedy',
    poster: 'https://via.placeholder.com/300x450/1f2937/ffffff?text=Movie+2',
    rating: 8.2,
    year: 2024,
    duration: 110,
    type: 'movie',
    genres: ['كوميدي', 'رومانسي']
  },
  {
    id: '5',
    title: 'مسلسل الخيال العلمي',
    slug: 'sci-fi-series',
    poster: 'https://via.placeholder.com/300x450/111827/ffffff?text=Series+2',
    rating: 8.8,
    year: 2024,
    episodes: 10,
    seasons: 1,
    type: 'series',
    genres: ['خيال علمي', 'مغامرة']
  },
  {
    id: '6',
    title: 'برنامج الطبخ الممتع',
    slug: 'fun-cooking-show',
    poster: 'https://via.placeholder.com/300x450/0c1017/ffffff?text=Show+2',
    rating: 8.2,
    year: 2024,
    duration: 45,
    type: 'show',
    genres: ['طبخ', 'تعليمي']
  }
]

export default function MixPage() {
  const movies = mixedContent.filter(item => item.type === 'movie')
  const series = mixedContent.filter(item => item.type === 'series')
  const shows = mixedContent.filter(item => item.type === 'show')

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">المختلط</h1>
          <p className="text-muted-foreground">
            مجموعة متنوعة من أفضل الأفلام والمسلسلات والبرامج في مكان واحد
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 border-b border-border">
            <button className="px-4 py-2 text-sm font-medium border-b-2 border-primary text-primary">
              الكل
            </button>
            <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              الأفلام
            </button>
            <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              المسلسلات
            </button>
            <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              البرامج
            </button>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-16">
          {/* Trending Now */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">الأكثر رواجاً الآن</h2>
            <Suspense fallback={<LoadingSpinner />}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
                {mixedContent.slice(0, 6).map((item) => (
                  <div key={item.id} className="relative">
                    {item.type === 'series' ? (
                      <SeriesCard series={item} />
                    ) : (
                      <MovieCard movie={item} />
                    )}
                    <div className="absolute top-2 left-2">
                      <span className={`text-xs px-2 py-1 rounded-full text-white font-medium ${
                        item.type === 'movie' ? 'bg-blue-600' :
                        item.type === 'series' ? 'bg-green-600' : 'bg-purple-600'
                      }`}>
                        {item.type === 'movie' ? 'فيلم' :
                         item.type === 'series' ? 'مسلسل' : 'برنامج'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Suspense>
          </section>

          {/* Latest Movies */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">أحدث الأفلام</h2>
              <a 
                href="/movies" 
                className="text-primary hover:underline font-medium"
              >
                عرض الكل
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>

          {/* Popular Series */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">المسلسلات الشائعة</h2>
              <a 
                href="/series" 
                className="text-primary hover:underline font-medium"
              >
                عرض الكل
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
              {series.map((serie) => (
                <SeriesCard key={serie.id} series={serie} />
              ))}
            </div>
          </section>

          {/* Featured Shows */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">البرامج المميزة</h2>
              <a 
                href="/shows" 
                className="text-primary hover:underline font-medium"
              >
                عرض الكل
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
              {shows.map((show) => (
                <MovieCard key={show.id} movie={show} />
              ))}
            </div>
          </section>

          {/* Random Mix */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">اختيارات عشوائية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mixedContent.slice(0, 3).map((item) => (
                <div key={item.id} className="bg-card rounded-lg border overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <img
                      src={item.poster}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`text-xs px-2 py-1 rounded-full text-white font-medium ${
                        item.type === 'movie' ? 'bg-blue-600' :
                        item.type === 'series' ? 'bg-green-600' : 'bg-purple-600'
                      }`}>
                        {item.type === 'movie' ? 'فيلم' :
                         item.type === 'series' ? 'مسلسل' : 'برنامج'}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          ⭐ {item.rating}
                        </span>
                        <span>{item.year}</span>
                        {item.type === 'series' ? (
                          <span>{item.episodes} حلقة</span>
                        ) : (
                          <span>{item.duration} دقيقة</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.genres.map((genre) => (
                          <span key={genre} className="text-xs bg-white/20 px-2 py-1 rounded">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Load More */}
        <div className="mt-16 text-center">
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-md hover:bg-primary/90 transition-colors">
            تحميل المزيد من المحتوى
          </button>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}