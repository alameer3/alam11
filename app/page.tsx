import { Suspense } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/home/hero-section'
import { TrendingSection } from '@/components/home/trending-section'
import { LatestMovies } from '@/components/home/latest-movies'
import { LatestSeries } from '@/components/home/latest-series'
import { TopRated } from '@/components/home/top-rated'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <Suspense fallback={<LoadingSpinner />}>
          <HeroSection />
        </Suspense>

        {/* Content Sections */}
        <div className="container mx-auto px-4 py-8 space-y-12">
          {/* Trending Now */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                <span className="w-1 h-8 bg-red-600 rounded"></span>
                الأكثر مشاهدة الآن
              </h2>
              <a href="/movies" className="text-red-500 hover:text-red-400 font-medium">
                عرض الكل ←
              </a>
            </div>
            <Suspense fallback={<LoadingSpinner />}>
              <TrendingSection />
            </Suspense>
          </section>

          {/* Latest Movies */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                <span className="w-1 h-8 bg-red-600 rounded"></span>
                أحدث الأفلام
              </h2>
              <a href="/movies" className="text-red-500 hover:text-red-400 font-medium">
                عرض الكل ←
              </a>
            </div>
            <Suspense fallback={<LoadingSpinner />}>
              <LatestMovies />
            </Suspense>
          </section>

          {/* Latest Series */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                <span className="w-1 h-8 bg-red-600 rounded"></span>
                أحدث المسلسلات
              </h2>
              <a href="/series" className="text-red-500 hover:text-red-400 font-medium">
                عرض الكل ←
              </a>
            </div>
            <Suspense fallback={<LoadingSpinner />}>
              <LatestSeries />
            </Suspense>
          </section>

          {/* Top Rated */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                <span className="w-1 h-8 bg-red-600 rounded"></span>
                الأعلى تقييماً
              </h2>
              <a href="/mix" className="text-red-500 hover:text-red-400 font-medium">
                عرض الكل ←
              </a>
            </div>
            <Suspense fallback={<LoadingSpinner />}>
              <TopRated />
            </Suspense>
          </section>

          {/* Categories Quick Access */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                <span className="w-1 h-8 bg-red-600 rounded"></span>
                تصفح حسب النوع
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: 'أكشن', href: '/movies?genre=action', color: 'from-red-600 to-red-800' },
                { name: 'كوميدي', href: '/movies?genre=comedy', color: 'from-yellow-600 to-yellow-800' },
                { name: 'دراما', href: '/movies?genre=drama', color: 'from-blue-600 to-blue-800' },
                { name: 'رعب', href: '/movies?genre=horror', color: 'from-purple-600 to-purple-800' },
                { name: 'رومانسي', href: '/movies?genre=romance', color: 'from-pink-600 to-pink-800' },
                { name: 'خيال علمي', href: '/movies?genre=sci-fi', color: 'from-green-600 to-green-800' },
              ].map((genre) => (
                <a
                  key={genre.name}
                  href={genre.href}
                  className={`bg-gradient-to-br ${genre.color} p-6 rounded-lg text-center hover:scale-105 transition-transform duration-300 group`}
                >
                  <h3 className="text-white font-semibold group-hover:text-gray-200">
                    {genre.name}
                  </h3>
                </a>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section className="bg-gray-900 rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-red-500 mb-2">15,000+</div>
                <div className="text-gray-400">فيلم</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-500 mb-2">8,500+</div>
                <div className="text-gray-400">مسلسل</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-500 mb-2">2,300+</div>
                <div className="text-gray-400">برنامج</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-500 mb-2">500K+</div>
                <div className="text-gray-400">مستخدم</div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}