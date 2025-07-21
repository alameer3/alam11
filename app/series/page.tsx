'use client'

import { useState, useEffect } from 'react'
import { Monitor } from 'lucide-react'

import { ArchiveHeader } from '@/components/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗/ArchiveHeader'
import { FilterBar } from '@/components/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗/FilterBar'
import { EntryCard } from '@/components/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗/EntryCard'
import { Pagination } from '@/components/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗/Pagination'

interface Series {
  id: string
  title: string
  arabicTitle: string
  description: string
  year: number
  rating: number
  views: number
  episodes: number
  seasons: number
  genre: string[]
  quality: string
  status: 'ongoing' | 'completed'
  poster: string
  backdrop: string
  duration: string
  language: string
  country: string
  director: string
  cast: string[]
  synopsis: string
}

const seriesData: Series[] = [
  {
    id: '1',
    title: 'Breaking Bad',
    arabicTitle: 'بريكينغ باد',
    description: 'A high school chemistry teacher turned methamphetamine manufacturer',
    year: 2008,
    rating: 9.5,
    views: 2500000,
    episodes: 62,
    seasons: 5,
    genre: ['Crime', 'Drama', 'Thriller'],
    quality: '1080p',
    status: 'completed',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a9?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a9?w=1200&h=400&fit=crop',
    duration: '47 min',
    language: 'English',
    country: 'USA',
    director: 'Vince Gilligan',
    cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn'],
    synopsis: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s financial future.'
  },
  {
    id: '2',
    title: 'Game of Thrones',
    arabicTitle: 'لعبة العرش',
    description: 'Nine noble families fight for control over the lands of Westeros',
    year: 2011,
    rating: 9.3,
    views: 3200000,
    episodes: 73,
    seasons: 8,
    genre: ['Action', 'Adventure', 'Drama'],
    quality: '4K',
    status: 'completed',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=400&fit=crop',
    duration: '57 min',
    language: 'English',
    country: 'USA',
    director: 'David Benioff',
    cast: ['Emilia Clarke', 'Kit Harington', 'Peter Dinklage'],
    synopsis: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.'
  },
  {
    id: '3',
    title: 'Stranger Things',
    arabicTitle: 'أشياء غريبة',
    description: 'When a young boy disappears, his mother must confront terrifying forces',
    year: 2016,
    rating: 8.7,
    views: 1800000,
    episodes: 34,
    seasons: 4,
    genre: ['Drama', 'Fantasy', 'Horror'],
    quality: '1080p',
    status: 'ongoing',
    poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=400&fit=crop',
    duration: '51 min',
    language: 'English',
    country: 'USA',
    director: 'The Duffer Brothers',
    cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder'],
    synopsis: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying forces in order to get him back.'
  },
  {
    id: '4',
    title: 'The Crown',
    arabicTitle: 'التاج',
    description: 'Follows the political rivalries and romance of Queen Elizabeth II',
    year: 2016,
    rating: 8.6,
    views: 1200000,
    episodes: 40,
    seasons: 5,
    genre: ['Biography', 'Drama', 'History'],
    quality: '4K',
    status: 'ongoing',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=400&fit=crop',
    duration: '58 min',
    language: 'English',
    country: 'UK',
    director: 'Peter Morgan',
    cast: ['Olivia Colman', 'Emma Corrin', 'Josh O\'Connor'],
    synopsis: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.'
  }
]

export default function SeriesPage() {
  const [series] = useState<Series[]>(seriesData)
  const [filters, setFilters] = useState({ category: 'all', quality: 'all', year: 'all' })
  const [filtered, setFiltered] = useState<Series[]>(seriesData)
  const [page, setPage] = useState(1)
  const perPage = 18

  useEffect(() => {
    let list = series.filter((s) => {
      const catOk = filters.category === 'all' || s.genre.includes(filters.category)
      const qualOk = filters.quality === 'all' || s.quality === filters.quality
      const yearOk = filters.year === 'all' || s.year.toString() === filters.year
      return catOk && qualOk && yearOk
    })
    setFiltered(list)
    setPage(1)
  }, [series, filters])

  const genres = ['all', ...Array.from(new Set(series.flatMap((s) => s.genre)))]
  const years = ['all', ...Array.from(new Set(series.map((s) => s.year.toString())))]
  const qualities = ['all', ...Array.from(new Set(series.map((s) => s.quality)))]
  const statuses = ['all', 'ongoing', 'completed']

  const totalPages = Math.ceil(filtered.length / perPage)
  const pageSeries = filtered.slice((page - 1) * perPage, page * perPage)

  const getStatusColor = (status: string) => {
    return status === 'ongoing' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
  }

  const getStatusText = (status: string) => {
    return status === 'ongoing' ? 'مستمر' : 'مكتمل'
  }

  const categoryOptions = genres.map((g) => ({ label: g === 'all' ? 'الكل' : g, value: g }))
  const qualityOptions = qualities.map((q) => ({ label: q, value: q }))
  const yearOptions = years.map((y) => ({ label: y, value: y }))

  return (
    <div className="bg-home min-h-screen">
      <ArchiveHeader
        title="مسلسلات"
        icon={<Monitor className="w-8 h-8" />}
        cover="https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?w=1200&h=400&fit=crop"
      />

      <div className="container mx-auto px-4">
        <FilterBar
          categories={categoryOptions}
          qualities={qualityOptions}
          years={yearOptions}
          onChange={(state) => setFilters(state)}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {pageSeries.map((s) => (
            <EntryCard key={s.id} item={{ slug: s.id, title: s.title, poster: s.poster, rating: s.rating, quality: s.quality }} />
          ))}
        </div>

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  )
}