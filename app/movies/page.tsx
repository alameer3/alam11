import { Suspense } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { MovieCard } from '@/components/movies/movie-card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

// Mock data - replace with real data from database
const movies = [
  {
    id: '1',
    title: 'فيلم الأكشن الجديد',
    slug: 'new-action-movie',
    poster: 'https://via.placeholder.com/300x450/1e293b/ffffff?text=Movie+1',
    rating: 8.5,
    year: 2024,
    duration: 135,
    genres: ['أكشن', 'إثارة']
  },
  {
    id: '2',
    title: 'كوميديا رومانسية',
    slug: 'romantic-comedy',
    poster: 'https://via.placeholder.com/300x450/0f172a/ffffff?text=Movie+2',
    rating: 7.8,
    year: 2024,
    duration: 110,
    genres: ['كوميديا', 'رومانسي']
  },
  {
    id: '3',
    title: 'فيلم الخيال العلمي',
    slug: 'sci-fi-movie',
    poster: 'https://via.placeholder.com/300x450/374151/ffffff?text=Movie+3',
    rating: 9.2,
    year: 2024,
    duration: 155,
    genres: ['خيال علمي', 'دراما']
  },
  {
    id: '4',
    title: 'دراما تاريخية',
    slug: 'historical-drama',
    poster: 'https://via.placeholder.com/300x450/1f2937/ffffff?text=Movie+4',
    rating: 8.8,
    year: 2024,
    duration: 140,
    genres: ['دراما', 'تاريخي']
  },
  {
    id: '5',
    title: 'فيلم الرعب المخيف',
    slug: 'horror-movie',
    poster: 'https://via.placeholder.com/300x450/111827/ffffff?text=Movie+5',
    rating: 7.5,
    year: 2024,
    duration: 95,
    genres: ['رعب', 'إثارة']
  },
  {
    id: '6',
    title: 'مغامرة عائلية',
    slug: 'family-adventure',
    poster: 'https://via.placeholder.com/300x450/0c1017/ffffff?text=Movie+6',
    rating: 8.1,
    year: 2024,
    duration: 120,
    genres: ['مغامرة', 'عائلي']
  }
]

export default function MoviesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">الأفلام</h1>
          <p className="text-muted-foreground">
            استكشف مجموعة كبيرة من الأفلام العربية والأجنبية الحديثة والكلاسيكية
          </p>
        </div>

        {/* Filters Section */}
        <div className="mb-8 flex flex-wrap gap-4">
          <select className="bg-background border border-input rounded-md px-3 py-2 text-sm">
            <option value="">جميع الأنواع</option>
            <option value="action">أكشن</option>
            <option value="comedy">كوميديا</option>
            <option value="drama">دراما</option>
            <option value="horror">رعب</option>
            <option value="romance">رومانسي</option>
            <option value="sci-fi">خيال علمي</option>
          </select>
          
          <select className="bg-background border border-input rounded-md px-3 py-2 text-sm">
            <option value="">جميع السنوات</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
          
          <select className="bg-background border border-input rounded-md px-3 py-2 text-sm">
            <option value="rating">الأعلى تقييماً</option>
            <option value="year">الأحدث</option>
            <option value="title">الاسم</option>
          </select>
        </div>

        {/* Movies Grid */}
        <Suspense fallback={<LoadingSpinner />}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </Suspense>

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