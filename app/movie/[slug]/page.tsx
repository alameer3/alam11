

// Removed 'use client' to fix async Server Component error

import { MovieDetailsHeader } from '@/components/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗/MovieDetailsHeader'
import { WatchServers } from '@/components/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗/WatchServers'
import { DownloadLinks } from '@/components/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗/DownloadLinks'
import { CastSlider } from '@/components/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗/CastSlider'
import { GallerySlider } from '@/components/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗/GallerySlider'
import { Metadata } from 'next'

// temporary dataset
const movies = [
  {
    slug: 'the-dark-knight',
    title: 'The Dark Knight',
    originalTitle: 'The Dark Knight',
    year: 2008,
    rating: 9.0,
    quality: '4K',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=350&h=525&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1502139214982-d0ad755818cc?w=1280&h=720&fit=crop',
    description: 'فيلم أكشن وإثارة من بطولة كريستيان بيل…',
  },
]

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const movie = movies.find((m) => m.slug === slug) || movies[0]
  
  return {
    title: `${movie.title} | 𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗`,
    description: movie.description,
    openGraph: {
      title: movie.title,
      description: movie.description,
      images: [movie.poster],
    }
  }
}

export default async function MoviePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const movie = movies.find((m) => m.slug === slug) || movies[0]

  return (
    <div className="bg-home min-h-screen">
{/* Metadata moved to generateMetadata function */}

      <MovieDetailsHeader
        poster={movie.poster}
        backdrop={movie.backdrop}
        title={movie.title}
        originalTitle={movie.originalTitle}
        year={movie.year}
        rating={movie.rating}
        quality={movie.quality}
      />

      {/* Placeholder for watch servers, download links, description */}
      <div className="container mx-auto px-4 py-8 text-white">

        <WatchServers
          servers={[
            { name: 'S1', quality: '4K', url: '#' },
            { name: 'S2', quality: '1080p', url: '#' },
            { name: 'S3', quality: '720p', url: '#' },
          ]}
        />

        <DownloadLinks
          downloads={[
            { quality: '4K', size: '8 GB', url: '#' },
            { quality: '1080p', size: '4 GB', url: '#' },
            { quality: '720p', size: '2 GB', url: '#' },
          ]}
        />

        <CastSlider
          cast={[
            { name: 'Christian Bale', photo: 'https://randomuser.me/api/portraits/men/32.jpg' },
            { name: 'Heath Ledger', photo: 'https://randomuser.me/api/portraits/men/52.jpg' },
            { name: 'Aaron Eckhart', photo: 'https://randomuser.me/api/portraits/men/44.jpg' },
            { name: 'Gary Oldman', photo: 'https://randomuser.me/api/portraits/men/66.jpg' },
          ]}
        />

        <GallerySlider
          images={[
            'https://images.unsplash.com/photo-1520092312209-685e0bb1ecc9?w=400',
            'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400',
            'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?w=400',
            'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400',
          ]}
        />

        <h2 className="text-lg font-semibold mb-4">الوصف</h2>
        <p className="text-gray-300 leading-relaxed max-w-3xl">{movie.description}</p>
      </div>
    </div>
  )
}