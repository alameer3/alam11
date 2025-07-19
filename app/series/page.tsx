import { Suspense } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SeriesCard } from '@/components/series/series-card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

// Mock data - replace with real data from database
const series = [
  {
    id: '1',
    title: 'مسلسل الدراما الجديد',
    slug: 'new-drama-series',
    poster: 'https://via.placeholder.com/300x450/1e293b/ffffff?text=Series+1',
    rating: 9.2,
    year: 2024,
    seasons: 3,
    genres: ['دراما', 'رومانسي']
  },
  {
    id: '2',
    title: 'سلسلة الإثارة المشوقة',
    slug: 'thriller-series',
    poster: 'https://via.placeholder.com/300x450/0f172a/ffffff?text=Series+2',
    rating: 8.8,
    year: 2024,
    seasons: 2,
    genres: ['إثارة', 'جريمة']
  },
  {
    id: '3',
    title: 'كوميديا العائلة',
    slug: 'family-comedy',
    poster: 'https://via.placeholder.com/300x450/374151/ffffff?text=Series+3',
    rating: 8.1,
    year: 2024,
    seasons: 4,
    genres: ['كوميديا', 'عائلي']
  },
  {
    id: '4',
    title: 'مسلسل الخيال العلمي',
    slug: 'sci-fi-series',
    poster: 'https://via.placeholder.com/300x450/1f2937/ffffff?text=Series+4',
    rating: 9.0,
    year: 2024,
    seasons: 2,
    genres: ['خيال علمي', 'مغامرة']
  },
  {
    id: '5',
    title: 'جريمة ولغز',
    slug: 'crime-mystery',
    poster: 'https://via.placeholder.com/300x450/111827/ffffff?text=Series+5',
    rating: 8.6,
    year: 2024,
    seasons: 1,
    genres: ['جريمة', 'لغز']
  },
  {
    id: '6',
    title: 'رومانسية تاريخية',
    slug: 'historical-romance',
    poster: 'https://via.placeholder.com/300x450/0c1017/ffffff?text=Series+6',
    rating: 8.3,
    year: 2024,
    seasons: 2,
    genres: ['رومانسي', 'تاريخي']
  }
]

export default function SeriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">المسلسلات</h1>
          <p className="text-muted-foreground">
            استكشف مجموعة كبيرة من المسلسلات العربية والأجنبية المميزة
          </p>
        </div>

        {/* Filters Section */}
        <div className="mb-8 flex flex-wrap gap-4">
          <select className="bg-background border border-input rounded-md px-3 py-2 text-sm">
            <option value="">جميع الأنواع</option>
            <option value="drama">دراما</option>
            <option value="comedy">كوميديا</option>
            <option value="thriller">إثارة</option>
            <option value="romance">رومانسي</option>
            <option value="sci-fi">خيال علمي</option>
            <option value="crime">جريمة</option>
          </select>
          
          <select className="bg-background border border-input rounded-md px-3 py-2 text-sm">
            <option value="">جميع السنوات</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
          
          <select className="bg-background border border-input rounded-md px-3 py-2 text-sm">
            <option value="">عدد المواسم</option>
            <option value="1">موسم واحد</option>
            <option value="2-3">2-3 مواسم</option>
            <option value="4+">4+ مواسم</option>
          </select>
          
          <select className="bg-background border border-input rounded-md px-3 py-2 text-sm">
            <option value="rating">الأعلى تقييماً</option>
            <option value="year">الأحدث</option>
            <option value="title">الاسم</option>
          </select>
        </div>

        {/* Series Grid */}
        <Suspense fallback={<LoadingSpinner />}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
            {series.map((show) => (
              <SeriesCard key={show.id} series={show} />
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