'use client'

import { useState, useEffect } from 'react'
import { Tv } from 'lucide-react'

import { ArchiveHeader } from '@/components/akwam/ArchiveHeader'
import { FilterBar } from '@/components/akwam/FilterBar'
import { EntryCard } from '@/components/akwam/EntryCard'
import { Pagination } from '@/components/akwam/Pagination'

interface Show {
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
  status: 'ongoing' | 'completed' | 'cancelled'
  poster: string
  backdrop: string
  duration: string
  language: string
  country: string
  host: string
  guests: string[]
  synopsis: string
  type: 'talk' | 'reality' | 'variety' | 'game' | 'documentary'
}

const showsData: Show[] = [
  {
    id: '1',
    title: 'The Oprah Winfrey Show',
    arabicTitle: 'برنامج أوبرا وينفري',
    description: 'The most successful talk show in television history',
    year: 1986,
    rating: 8.9,
    views: 1500000,
    episodes: 4561,
    seasons: 25,
    genre: ['Talk Show', 'Interview', 'Entertainment'],
    quality: '1080p',
    status: 'completed',
    poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=400&fit=crop',
    duration: '60 min',
    language: 'English',
    country: 'USA',
    host: 'Oprah Winfrey',
    guests: ['Celebrities', 'Authors', 'Experts'],
    synopsis: 'The Oprah Winfrey Show was an American syndicated talk show that aired nationally for 25 seasons.',
    type: 'talk'
  },
  {
    id: '2',
    title: 'American Idol',
    arabicTitle: 'أمريكان أيدول',
    description: 'The most successful singing competition show',
    year: 2002,
    rating: 7.8,
    views: 2200000,
    episodes: 570,
    seasons: 21,
    genre: ['Reality', 'Music', 'Competition'],
    quality: '4K',
    status: 'ongoing',
    poster: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=400&fit=crop',
    duration: '90 min',
    language: 'English',
    country: 'USA',
    host: 'Ryan Seacrest',
    guests: ['Contestants', 'Judges', 'Celebrities'],
    synopsis: 'American Idol is an American singing competition television series created by Simon Fuller.',
    type: 'reality'
  },
  {
    id: '3',
    title: 'The Tonight Show',
    arabicTitle: 'برنامج الليلة',
    description: 'The longest-running talk show in American television history',
    year: 1954,
    rating: 8.2,
    views: 1800000,
    episodes: 15000,
    seasons: 68,
    genre: ['Talk Show', 'Comedy', 'Entertainment'],
    quality: '1080p',
    status: 'ongoing',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=400&fit=crop',
    duration: '60 min',
    language: 'English',
    country: 'USA',
    host: 'Jimmy Fallon',
    guests: ['Celebrities', 'Comedians', 'Musicians'],
    synopsis: 'The Tonight Show is an American late-night talk show that has aired on NBC since 1954.',
    type: 'talk'
  },
  {
    id: '4',
    title: 'Who Wants to Be a Millionaire',
    arabicTitle: 'من يريد أن يكون مليونير',
    description: 'The most successful quiz show in television history',
    year: 1998,
    rating: 7.5,
    views: 1200000,
    episodes: 2000,
    seasons: 25,
    genre: ['Game Show', 'Quiz', 'Entertainment'],
    quality: '1080p',
    status: 'ongoing',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a9?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a9?w=1200&h=400&fit=crop',
    duration: '45 min',
    language: 'English',
    country: 'UK',
    host: 'Chris Tarrant',
    guests: ['Contestants', 'Celebrities'],
    synopsis: 'Who Wants to Be a Millionaire is a British television quiz show based on the format devised by David Briggs.',
    type: 'game'
  },
  {
    id: '5',
    title: 'Planet Earth',
    arabicTitle: 'كوكب الأرض',
    description: 'The most successful nature documentary series',
    year: 2006,
    rating: 9.4,
    views: 3500000,
    episodes: 11,
    seasons: 2,
    genre: ['Documentary', 'Nature', 'Educational'],
    quality: '4K',
    status: 'completed',
    poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop',
    duration: '50 min',
    language: 'English',
    country: 'UK',
    host: 'David Attenborough',
    guests: ['Scientists', 'Photographers'],
    synopsis: 'Planet Earth is a 2006 British television series produced by the BBC Natural History Unit.',
    type: 'documentary'
  },
  {
    id: '6',
    title: 'Saturday Night Live',
    arabicTitle: 'عرض السبت ليلة حية',
    description: 'The longest-running sketch comedy show in television history',
    year: 1975,
    rating: 8.1,
    views: 1600000,
    episodes: 900,
    seasons: 48,
    genre: ['Comedy', 'Sketch', 'Entertainment'],
    quality: '1080p',
    status: 'ongoing',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=400&fit=crop',
    duration: '90 min',
    language: 'English',
    country: 'USA',
    host: 'Lorne Michaels',
    guests: ['Celebrities', 'Comedians', 'Musicians'],
    synopsis: 'Saturday Night Live is an American late-night live television sketch comedy and variety show.',
    type: 'variety'
  }
]

export default function ShowsPage() {
  const [shows] = useState<Show[]>(showsData)
  const [filters, setFilters] = useState({ category: 'all', quality: 'all', year: 'all' })
  const [filtered, setFiltered] = useState<Show[]>(showsData)
  const [page, setPage] = useState(1)
  const perPage = 18

  const genres = ['all', ...Array.from(new Set(shows.flatMap((s) => s.genre)))]
  const years = ['all', ...Array.from(new Set(shows.map((s) => s.year.toString())))]
  const qualities = ['all', ...Array.from(new Set(shows.map((s) => s.quality)))]

  useEffect(() => {
    const list = shows.filter((s) => {
      const catOk = filters.category === 'all' || s.genre.includes(filters.category)
      const qualOk = filters.quality === 'all' || s.quality === filters.quality
      const yearOk = filters.year === 'all' || s.year.toString() === filters.year
      return catOk && qualOk && yearOk
    })
    setFiltered(list)
    setPage(1)
  }, [shows, filters])

  const totalPages = Math.ceil(filtered.length / perPage)
  const pageShows = filtered.slice((page - 1) * perPage, page * perPage)

  const categoryOptions = genres.map((g) => ({ label: g === 'all' ? 'الكل' : g, value: g }))
  const qualityOptions = qualities.map((q) => ({ label: q, value: q }))
  const yearOptions = years.map((y) => ({ label: y, value: y }))

  return (
    <div className="bg-home min-h-screen">
      <ArchiveHeader
        title="عروض تلفزيونية"
        icon={<Tv className="w-8 h-8" />}
        cover="https://images.unsplash.com/photo-1505245208761-ba872912fac0?w=1200&h=400&fit=crop"
      />

      <div className="container mx-auto px-4">
        <FilterBar categories={categoryOptions} qualities={qualityOptions} years={yearOptions} onChange={(state) => setFilters(state)} />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {pageShows.map((show) => (
            <EntryCard key={show.id} item={{ slug: show.id, title: show.title, poster: show.poster, rating: show.rating, quality: show.quality }} />
          ))}
        </div>

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  )
}