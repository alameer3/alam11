"use client"

import { SeriesCard } from '@/components/series/series-card'

// Mock latest series
const latestSeries = [
  {
    id: '13',
    title: 'مسلسل الجاسوسية الحديث',
    slug: 'modern-spy-series',
    poster: 'https://via.placeholder.com/300x450/1e40af/ffffff?text=Series+1',
    rating: 9.3,
    year: 2024,
    episodes: 12,
    seasons: 2,
    genres: ['إثارة', 'جاسوسية']
  },
  {
    id: '14',
    title: 'دراما العائلة المعقدة',
    slug: 'complex-family-drama',
    poster: 'https://via.placeholder.com/300x450/b91c1c/ffffff?text=Series+2',
    rating: 8.8,
    year: 2024,
    episodes: 16,
    seasons: 1,
    genres: ['دراما', 'عائلي']
  },
  {
    id: '15',
    title: 'كوميديا المكتب المرحة',
    slug: 'office-comedy-series',
    poster: 'https://via.placeholder.com/300x450/059669/ffffff?text=Series+3',
    rating: 8.5,
    year: 2024,
    episodes: 22,
    seasons: 3,
    genres: ['كوميدي', 'مكتب']
  },
  {
    id: '16',
    title: 'خيال علمي المستقبل البعيد',
    slug: 'distant-future-sci-fi',
    poster: 'https://via.placeholder.com/300x450/7c2d12/ffffff?text=Series+4',
    rating: 9.1,
    year: 2024,
    episodes: 10,
    seasons: 1,
    genres: ['خيال علمي', 'دراما']
  },
  {
    id: '17',
    title: 'رعب الليالي المظلمة',
    slug: 'dark-nights-horror',
    poster: 'https://via.placeholder.com/300x450/581c87/ffffff?text=Series+5',
    rating: 8.2,
    year: 2024,
    episodes: 8,
    seasons: 1,
    genres: ['رعب', 'إثارة']
  },
  {
    id: '18',
    title: 'تاريخ الحضارات القديمة',
    slug: 'ancient-civilizations',
    poster: 'https://via.placeholder.com/300x450/a16207/ffffff?text=Series+6',
    rating: 8.7,
    year: 2024,
    episodes: 14,
    seasons: 2,
    genres: ['تاريخي', 'وثائقي']
  }
]

export function LatestSeries() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
      {latestSeries.map((series) => (
        <div key={series.id} className="relative group">
          <SeriesCard series={series} />
          {/* New Badge */}
          <div className="absolute top-2 left-2 z-10">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              جديد
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}