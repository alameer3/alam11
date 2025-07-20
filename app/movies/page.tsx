'use client'

import { useState, useEffect } from 'react'
import { Film } from 'lucide-react'

import { ArchiveHeader } from '@/components/akwam/ArchiveHeader'
import { FilterBar } from '@/components/akwam/FilterBar'
import { EntryCard } from '@/components/akwam/EntryCard'
import { Pagination } from '@/components/akwam/Pagination'

// بيانات تجريبية للأفلام
const moviesData = [
  {
    id: 1,
    title: "The Dark Knight",
    originalTitle: "The Dark Knight",
    slug: "the-dark-knight",
    description: "فيلم أكشن وإثارة من بطولة كريستيان بيل",
    poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
    rating: 9.0,
    year: 2008,
    duration: 152,
    quality: "HD",
    views: 1500000,
    downloads: 500000,
    likes: 25000,
    isFeatured: true,
    categories: ["Action", "Drama", "Crime"]
  },
  {
    id: 2,
    title: "Inception",
    originalTitle: "Inception",
    slug: "inception",
    description: "فيلم خيال علمي من إخراج كريستوفر نولان",
    poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
    rating: 8.8,
    year: 2010,
    duration: 148,
    quality: "FHD",
    views: 1200000,
    downloads: 400000,
    likes: 20000,
    isFeatured: true,
    categories: ["Sci-Fi", "Action", "Thriller"]
  },
  {
    id: 3,
    title: "Interstellar",
    originalTitle: "Interstellar",
    slug: "interstellar",
    description: "رحلة فضائية مذهلة من بطولة ماثيو ماكونهي",
    poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
    rating: 8.6,
    year: 2014,
    duration: 169,
    quality: "4K",
    views: 1800000,
    downloads: 600000,
    likes: 30000,
    isFeatured: true,
    categories: ["Sci-Fi", "Adventure", "Drama"]
  },
  {
    id: 4,
    title: "The Matrix",
    originalTitle: "The Matrix",
    slug: "the-matrix",
    description: "فيلم ثوري في عالم الخيال العلمي",
    poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
    rating: 8.7,
    year: 1999,
    duration: 136,
    quality: "HD",
    views: 2000000,
    downloads: 800000,
    likes: 35000,
    isFeatured: false,
    categories: ["Sci-Fi", "Action"]
  },
  {
    id: 5,
    title: "Pulp Fiction",
    originalTitle: "Pulp Fiction",
    slug: "pulp-fiction",
    description: "فيلم كلاسيكي من إخراج كوينتن تارانتينو",
    poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
    rating: 8.9,
    year: 1994,
    duration: 154,
    quality: "HD",
    views: 900000,
    downloads: 300000,
    likes: 15000,
    isFeatured: false,
    categories: ["Crime", "Drama"]
  },
  {
    id: 6,
    title: "Fight Club",
    originalTitle: "Fight Club",
    slug: "fight-club",
    description: "فيلم نفسي مثير من بطولة براد بيت",
    poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
    rating: 8.8,
    year: 1999,
    duration: 139,
    quality: "FHD",
    views: 1100000,
    downloads: 350000,
    likes: 18000,
    isFeatured: false,
    categories: ["Drama", "Thriller"]
  }
]

const categories = ["All", "Action", "Drama", "Comedy", "Thriller", "Sci-Fi", "Crime", "Adventure"]
const qualities = ["All", "HD", "FHD", "4K"]
const years = ["All", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000", "1999", "1998", "1997", "1996", "1995", "1994", "1993", "1992", "1991", "1990"]

export default function MoviesPage() {
  const [movies, setMovies] = useState(moviesData)
  const [filtered, setFiltered] = useState(moviesData)
  const [filters, setFilters] = useState({ category: 'all', quality: 'all', year: 'all' })
  const [page, setPage] = useState(1)
  const perPage = 18

  // فلترة وبحث الأفلام
  useEffect(() => {
    // apply filters whenever movies or filters change
    let list = movies.filter((m) => {
      const catOk = filters.category === 'all' || m.categories.includes(filters.category)
      const qualOk = filters.quality === 'all' || m.quality === filters.quality
      const yearOk = filters.year === 'all' || m.year.toString() === filters.year
      return catOk && qualOk && yearOk
    })
    setFiltered(list)
    setPage(1)
  }, [movies, filters])

  // Filter options
  const categoryOptions = [{ label: 'الكل', value: 'all' }, ...categories.map((c) => ({ label: c, value: c }))]
  const qualityOptions = qualities.map((q) => ({ label: q, value: q }))
  const yearOptions = years.map((y) => ({ label: y, value: y }))

  // Pagination slice
  const totalPages = Math.ceil(filtered.length / perPage)
  const pageMovies = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="bg-home min-h-screen">
      <ArchiveHeader
        title="أفلام"
        icon={<Film className="w-8 h-8" />}
        cover="https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&h=400&fit=crop"
      />

      <div className="container mx-auto px-4">
        <FilterBar
          categories={categoryOptions}
          qualities={qualityOptions}
          years={yearOptions}
          onChange={(state) => setFilters(state)}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {pageMovies.map((m) => (
            <EntryCard key={m.id} item={{ slug: m.slug, title: m.title, poster: m.poster, rating: m.rating, quality: m.quality }} />
          ))}
        </div>

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  )
}