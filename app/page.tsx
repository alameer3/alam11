import { Suspense } from 'react'
import { Header } from '@/components/layout/header'
import { HeroSection } from '@/components/home/hero-section'
import { FeaturedMovies } from '@/components/home/featured-movies'
import { FeaturedSeries } from '@/components/home/featured-series'
import { GenreSection } from '@/components/home/genre-section'
import { Footer } from '@/components/layout/footer'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <HeroSection />
        </Suspense>
        
        <div className="container mx-auto px-4 py-8 space-y-12">
          <Suspense fallback={<LoadingSpinner />}>
            <FeaturedMovies />
          </Suspense>
          
          <Suspense fallback={<LoadingSpinner />}>
            <FeaturedSeries />
          </Suspense>
          
          <Suspense fallback={<LoadingSpinner />}>
            <GenreSection />
          </Suspense>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}