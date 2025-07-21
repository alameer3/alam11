'use client'

import { useState, useEffect } from 'react'
import { Grid3X3 } from 'lucide-react'

import { ArchiveHeader } from '@/components/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗/ArchiveHeader'
import { FilterBar } from '@/components/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗/FilterBar'
import { EntryCard } from '@/components/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗/EntryCard'
import { Pagination } from '@/components/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗/Pagination'

interface MixContent {
  id: string
  title: string
  arabicTitle: string
  description: string
  year: number
  rating: number
  views: number
  duration: string
  genre: string[]
  quality: string
  status: 'available' | 'premium' | 'new'
  poster: string
  backdrop: string
  language: string
  country: string
  artist?: string
  album?: string
  author?: string
  synopsis: string
  type: 'music' | 'podcast' | 'audiobook' | 'documentary' | 'lecture' | 'comedy'
}

const mixData: MixContent[] = [
  {
    id: '1',
    title: 'Bohemian Rhapsody',
    arabicTitle: 'رابسودي بوهيمي',
    description: 'One of the most iconic songs in rock music history',
    year: 1975,
    rating: 9.8,
    views: 2500000,
    duration: '5:55',
    genre: ['Rock', 'Progressive Rock', 'Opera'],
    quality: 'Lossless',
    status: 'available',
    poster: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=400&fit=crop',
    language: 'English',
    country: 'UK',
    artist: 'Queen',
    album: 'A Night at the Opera',
    synopsis: 'Bohemian Rhapsody is a song by the British rock band Queen.',
    type: 'music'
  },
  {
    id: '2',
    title: 'The Joe Rogan Experience',
    arabicTitle: 'تجربة جو روغان',
    description: 'The most popular podcast in the world',
    year: 2009,
    rating: 8.9,
    views: 1800000,
    duration: '2:30:00',
    genre: ['Podcast', 'Interview', 'Comedy'],
    quality: 'HD',
    status: 'premium',
    poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=400&fit=crop',
    language: 'English',
    country: 'USA',
    author: 'Joe Rogan',
    synopsis: 'The Joe Rogan Experience is a podcast hosted by American comedian Joe Rogan.',
    type: 'podcast'
  },
  {
    id: '3',
    title: 'The Great Gatsby',
    arabicTitle: 'غاتسبي العظيم',
    description: 'A classic American novel by F. Scott Fitzgerald',
    year: 1925,
    rating: 9.2,
    views: 1200000,
    duration: '8:45:00',
    genre: ['Fiction', 'Classic', 'Drama'],
    quality: 'HD',
    status: 'available',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=400&fit=crop',
    language: 'English',
    country: 'USA',
    author: 'F. Scott Fitzgerald',
    synopsis: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald.',
    type: 'audiobook'
  },
  {
    id: '4',
    title: 'Cosmos: A Spacetime Odyssey',
    arabicTitle: 'الكون: رحلة عبر الزمكان',
    description: 'A documentary series about the universe',
    year: 2014,
    rating: 9.4,
    views: 3500000,
    duration: '45:00',
    genre: ['Documentary', 'Science', 'Educational'],
    quality: '4K',
    status: 'premium',
    poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop',
    language: 'English',
    country: 'USA',
    author: 'Neil deGrasse Tyson',
    synopsis: 'Cosmos: A Spacetime Odyssey is an American science documentary television series.',
    type: 'documentary'
  },
  {
    id: '5',
    title: 'The Art of War',
    arabicTitle: 'فن الحرب',
    description: 'Ancient Chinese text on military strategy',
    year: -500,
    rating: 8.7,
    views: 800000,
    duration: '3:20:00',
    genre: ['Philosophy', 'Military', 'Classic'],
    quality: 'HD',
    status: 'available',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a9?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a9?w=1200&h=400&fit=crop',
    language: 'Chinese',
    country: 'China',
    author: 'Sun Tzu',
    synopsis: 'The Art of War is an ancient Chinese text on military strategy.',
    type: 'audiobook'
  },
  {
    id: '6',
    title: 'Comedy Central Stand-Up',
    arabicTitle: 'كوميدي سنترال ستاند أب',
    description: 'The best stand-up comedy specials',
    year: 2023,
    rating: 8.5,
    views: 1500000,
    duration: '1:15:00',
    genre: ['Comedy', 'Stand-Up', 'Entertainment'],
    quality: '1080p',
    status: 'new',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=400&fit=crop',
    language: 'English',
    country: 'USA',
    author: 'Various Comedians',
    synopsis: 'Comedy Central Stand-Up features the best stand-up comedy specials.',
    type: 'comedy'
  },
  {
    id: '7',
    title: 'Harvard Business Review',
    arabicTitle: 'هارفارد بيزنس ريفيو',
    description: 'Insights from Harvard Business School',
    year: 2024,
    rating: 8.9,
    views: 900000,
    duration: '45:00',
    genre: ['Business', 'Education', 'Leadership'],
    quality: 'HD',
    status: 'premium',
    poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=400&fit=crop',
    language: 'English',
    country: 'USA',
    author: 'Harvard Business School',
    synopsis: 'Harvard Business Review provides insights from Harvard Business School.',
    type: 'lecture'
  },
  {
    id: '8',
    title: 'Pink Floyd - Dark Side of the Moon',
    arabicTitle: 'بينك فلويد - الجانب المظلم من القمر',
    description: 'One of the greatest albums ever recorded',
    year: 1973,
    rating: 9.6,
    views: 3200000,
    duration: '42:50',
    genre: ['Rock', 'Progressive Rock', 'Psychedelic'],
    quality: 'Lossless',
    status: 'available',
    poster: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=400&fit=crop',
    language: 'English',
    country: 'UK',
    artist: 'Pink Floyd',
    album: 'The Dark Side of the Moon',
    synopsis: 'The Dark Side of the Moon is the eighth studio album by English rock band Pink Floyd.',
    type: 'music'
  }
]

export default function MixPage() {
  const [contents] = useState<MixContent[]>(mixData)
  const [filters, setFilters] = useState({ category: 'all', quality: 'all', year: 'all' })
  const [filtered, setFiltered] = useState<MixContent[]>(mixData)
  const [page, setPage] = useState(1)
  const perPage = 18

  const genres = ['all', ...Array.from(new Set(contents.flatMap((c) => c.genre)))]
  const years = ['all', ...Array.from(new Set(contents.map((c) => c.year.toString())))]
  const qualities = ['all', ...Array.from(new Set(contents.map((c) => c.quality)))]
  const statuses = ['all', 'available', 'premium', 'new']
  const types = ['all', 'music', 'podcast', 'audiobook', 'documentary', 'lecture', 'comedy']

  useEffect(() => {
    const list = contents.filter((c) => {
      const catOk = filters.category === 'all' || c.genre.includes(filters.category)
      const qualOk = filters.quality === 'all' || c.quality === filters.quality
      const yearOk = filters.year === 'all' || c.year.toString() === filters.year
      return catOk && qualOk && yearOk
    })
    setFiltered(list)
    setPage(1)
  }, [contents, filters])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'premium': return 'bg-yellow-100 text-yellow-800'
      case 'new': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'متاح'
      case 'premium': return 'مميز'
      case 'new': return 'جديد'
      default: return status
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'music': return 'موسيقى'
      case 'podcast': return 'بودكاست'
      case 'audiobook': return 'كتاب صوتي'
      case 'documentary': return 'وثائقي'
      case 'lecture': return 'محاضرة'
      case 'comedy': return 'كوميدي'
      default: return type
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'music': return <Music className="w-4 h-4" />
      case 'podcast': return <Mic className="w-4 h-4" />
      case 'audiobook': return <BookOpen className="w-4 h-4" />
      case 'documentary': return <Video className="w-4 h-4" />
      case 'lecture': return <BookOpen className="w-4 h-4" />
      case 'comedy': return <Mic className="w-4 h-4" />
      default: return <Video className="w-4 h-4" />
    }
  }

  const totalPages = Math.ceil(filtered.length / perPage)
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage)

  const categoryOptions = genres.map((g) => ({ label: g === 'all' ? 'الكل' : g, value: g }))
  const qualityOptions = qualities.map((q) => ({ label: q, value: q }))
  const yearOptions = years.map((y) => ({ label: y, value: y }))

  return (
    <div className="bg-home min-h-screen">
      <ArchiveHeader
        title="منوعات"
        icon={<Grid3X3 className="w-8 h-8" />}
        cover="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=400&fit=crop"
      />

      <div className="container mx-auto px-4">
        <FilterBar categories={categoryOptions} qualities={qualityOptions} years={yearOptions} onChange={(state) => setFilters(state)} />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {pageItems.map((item) => (
            <EntryCard key={item.id} item={{ slug: item.id, title: item.title, poster: item.poster, rating: item.rating, quality: item.quality }} />
          ))}
        </div>

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  )
}