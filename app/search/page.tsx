'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EntryMiniCard } from '@/components/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗/EntryMiniCard'
import { Film, Monitor, Tv, Music, Mic, BookOpen, Video } from 'lucide-react'

interface SearchResult {
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
  type: 'movie' | 'series' | 'show' | 'music' | 'podcast' | 'audiobook' | 'documentary'
  poster: string
  language: string
  country: string
  director?: string
  cast?: string[]
  artist?: string
  album?: string
  author?: string
  host?: string
  synopsis: string
  isTrending?: boolean
  isNew?: boolean
  isFeatured?: boolean
}

const dataset: SearchResult[] = [
  {
    id: '1',
    title: 'The Dark Knight',
    arabicTitle: 'الفرسان المظلم',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    year: 2008,
    rating: 9.0,
    views: 1800000,
    duration: '2:32:00',
    genre: ['Action', 'Crime', 'Drama'],
    quality: '4K',
    type: 'movie',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
    language: 'English',
    country: 'USA',
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    synopsis: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    isTrending: true
  },
  {
    id: '2',
    title: 'Breaking Bad',
    arabicTitle: 'بريكينغ باد',
    description: 'A high school chemistry teacher turned methamphetamine manufacturer',
    year: 2008,
    rating: 9.5,
    views: 2500000,
    duration: '47 min',
    genre: ['Crime', 'Drama', 'Thriller'],
    quality: '1080p',
    type: 'series',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a9?w=300&h=450&fit=crop',
    language: 'English',
    country: 'USA',
    director: 'Vince Gilligan',
    cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn'],
    synopsis: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s financial future.',
    isFeatured: true
  },
  {
    id: '3',
    title: 'Bohemian Rhapsody',
    arabicTitle: 'رابسودي بوهيمي',
    description: 'One of the most iconic songs in rock music history',
    year: 1975,
    rating: 9.8,
    views: 2500000,
    duration: '5:55',
    genre: ['Rock', 'Progressive Rock', 'Opera'],
    quality: 'Lossless',
    type: 'music',
    poster: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=450&fit=crop',
    language: 'English',
    country: 'UK',
    artist: 'Queen',
    album: 'A Night at the Opera',
    synopsis: 'Bohemian Rhapsody is a song by the British rock band Queen.',
    isTrending: true
  },
  {
    id: '4',
    title: 'The Joe Rogan Experience',
    arabicTitle: 'تجربة جو روغان',
    description: 'The most popular podcast in the world',
    year: 2009,
    rating: 8.9,
    views: 1800000,
    duration: '2:30:00',
    genre: ['Podcast', 'Interview', 'Comedy'],
    quality: 'HD',
    type: 'podcast',
    poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop',
    language: 'English',
    country: 'USA',
    host: 'Joe Rogan',
    synopsis: 'The Joe Rogan Experience is a podcast hosted by American comedian Joe Rogan.',
    isNew: true
  },
  {
    id: '5',
    title: 'The Great Gatsby',
    arabicTitle: 'غاتسبي العظيم',
    description: 'A classic American novel by F. Scott Fitzgerald',
    year: 1925,
    rating: 9.2,
    views: 1200000,
    duration: '8:45:00',
    genre: ['Fiction', 'Classic', 'Drama'],
    quality: 'HD',
    type: 'audiobook',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
    language: 'English',
    country: 'USA',
    author: 'F. Scott Fitzgerald',
    synopsis: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald.',
    isFeatured: true
  },
  {
    id: '6',
    title: 'Cosmos: A Spacetime Odyssey',
    arabicTitle: 'الكون: رحلة عبر الزمكان',
    description: 'A documentary series about the universe',
    year: 2014,
    rating: 9.4,
    views: 3500000,
    duration: '45:00',
    genre: ['Documentary', 'Science', 'Educational'],
    quality: '4K',
    type: 'documentary',
    poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop',
    language: 'English',
    country: 'USA',
    director: 'Neil deGrasse Tyson',
    synopsis: 'Cosmos: A Spacetime Odyssey is an American science documentary television series.',
    isTrending: true
  }
]

export default function SearchPage() {
  const params = useSearchParams()
  const q = params.get('q')?.toLowerCase() || ''

  const filtered = useMemo(() => {
    if (!q) return dataset
    return dataset.filter((r) =>
      r.title.toLowerCase().includes(q) ||
      r.arabicTitle.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q)
    )
  }, [q])

  const byType = useMemo(() => {
    const map: Record<string, SearchResult[]> = { all: filtered }
    filtered.forEach((r) => {
      map[r.type] = map[r.type] ? [...map[r.type], r] : [r]
    })
    return map
  }, [filtered])

  const tabDefs = [
    { id: 'all', label: 'الكل', icon: null as any },
    { id: 'movie', label: 'أفلام', icon: Film },
    { id: 'series', label: 'مسلسلات', icon: Monitor },
    { id: 'show', label: 'عروض', icon: Tv },
    { id: 'music', label: 'موسيقى', icon: Music },
    { id: 'podcast', label: 'بودكاست', icon: Mic },
    { id: 'audiobook', label: 'كتب صوتية', icon: BookOpen },
    { id: 'documentary', label: 'وثائقي', icon: Video },
  ]

  return (
    <div className="bg-home min-h-screen pt-24 px-4">
      <div className="container mx-auto">
        <h1 className="text-white text-2xl font-bold mb-6">نتائج البحث عن: {q || 'كل شيء'}</h1>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-dark p-2 rounded mb-6 overflow-auto flex whitespace-nowrap">
            {tabDefs.map(({ id, label, icon: Icon }) => {
              const count = byType[id]?.length || 0
              if (count === 0) return null
              return (
                <TabsTrigger key={id} value={id} className="text-white data-[state=active]:bg-brand data-[state=active]:text-white px-3 py-1 rounded ml-2 first:ml-0">
                  {Icon && <Icon className="w-4 h-4 inline ml-1" />} {label} ({count})
                </TabsTrigger>
              )
            })}
          </TabsList>

          {tabDefs.map(({ id }) => (
            <TabsContent key={id} value={id} className="space-y-3">
              {byType[id]?.map((item) => (
                <EntryMiniCard key={item.id} item={{ slug: item.id, title: item.title, poster: item.poster, rating: item.rating, quality: item.quality }} />
              )) || <p className="text-gray-400">لا توجد نتائج</p>}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}