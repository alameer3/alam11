"use client"

import { SeriesCard } from '@/components/series/series-card'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

// Mock data - replace with real data from database
const featuredSeries = [
  {
    id: '1',
    title: 'مسلسل الدراما الجديد',
    slug: 'new-drama-series',
    poster: 'https://via.placeholder.com/300x450/1e293b/ffffff?text=Series+1',
    rating: 9.2,
    year: 2024,
    seasons: 3
  },
  {
    id: '2',
    title: 'سلسلة الإثارة المشوقة',
    slug: 'thriller-series',
    poster: 'https://via.placeholder.com/300x450/0f172a/ffffff?text=Series+2',
    rating: 8.8,
    year: 2024,
    seasons: 2
  },
  {
    id: '3',
    title: 'كوميديا العائلة',
    slug: 'family-comedy',
    poster: 'https://via.placeholder.com/300x450/374151/ffffff?text=Series+3',
    rating: 8.1,
    year: 2024,
    seasons: 4
  },
  {
    id: '4',
    title: 'مسلسل الخيال العلمي',
    slug: 'sci-fi-series',
    poster: 'https://via.placeholder.com/300x450/1f2937/ffffff?text=Series+4',
    rating: 9.0,
    year: 2024,
    seasons: 2
  },
  {
    id: '5',
    title: 'جريمة ولغز',
    slug: 'crime-mystery',
    poster: 'https://via.placeholder.com/300x450/111827/ffffff?text=Series+5',
    rating: 8.6,
    year: 2024,
    seasons: 1
  },
  {
    id: '6',
    title: 'رومانسية تاريخية',
    slug: 'historical-romance',
    poster: 'https://via.placeholder.com/300x450/0c1017/ffffff?text=Series+6',
    rating: 8.3,
    year: 2024,
    seasons: 2
  }
]

export function FeaturedSeries() {
  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold">المسلسلات المميزة</h2>
        <Button asChild variant="ghost" className="text-primary hover:text-primary/80">
          <Link href="/series" className="flex items-center space-x-2 space-x-reverse">
            <span>عرض المزيد</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Series Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
        {featuredSeries.map((series) => (
          <SeriesCard key={series.id} series={series} />
        ))}
      </div>
    </section>
  )
}