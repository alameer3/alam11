'use client'

import { SeriesDetailsHeader } from '@/components/akwam/SeriesDetailsHeader'
import { SeasonsTabs } from '@/components/akwam/SeasonsTabs'
import { WatchServers } from '@/components/akwam/WatchServers'
import { DownloadLinks } from '@/components/akwam/DownloadLinks'
import { CastSlider } from '@/components/akwam/CastSlider'
import { GallerySlider } from '@/components/akwam/GallerySlider'
import Head from 'next/head'

// dummy data
const seriesList = [
  {
    slug: 'breaking-bad',
    title: 'Breaking Bad',
    originalTitle: 'Breaking Bad',
    years: '2008 - 2013',
    rating: 9.5,
    seasons: 5,
    quality: '1080p',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a9?w=350&h=525&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1280&h=720&fit=crop',
    description: 'قصة معلم كيمياء يتحول إلى تصنيع الميث لتحقيق مستقبل أسرته.',
    seasonsData: [
      {
        season: 1,
        episodes: [
          { number: 1, title: 'Pilot', duration: '58m' },
          { number: 2, title: 'Cat’s in the Bag…', duration: '48m' },
        ],
      },
      {
        season: 2,
        episodes: [
          { number: 1, title: 'Seven Thirty-Seven', duration: '47m' },
          { number: 2, title: 'Grilled', duration: '47m' },
        ],
      },
    ],
  },
]

export default function SeriesPage({ params }: { params: { slug: string } }) {
  const series = seriesList.find((s) => s.slug === params.slug) || seriesList[0]

  return (
    <div className="bg-home min-h-screen">
      <Head>
        <title>{series.title} | اكوام</title>
        <meta property="og:title" content={series.title} />
        <meta property="og:image" content={series.poster} />
        <meta property="og:description" content={series.description} />
      </Head>

      <SeriesDetailsHeader
        poster={series.poster}
        backdrop={series.backdrop}
        title={series.title}
        originalTitle={series.originalTitle}
        years={series.years}
        seasonsCount={series.seasons}
        rating={series.rating}
        quality={series.quality}
      />

      <div className="container mx-auto px-4 py-8 text-white">
        <SeasonsTabs seasons={series.seasonsData} />

        {/* Optional: global watch/download servers for latest episode */}
        <WatchServers servers={[{ name: 'S1', quality: '1080p', url: '#' }]} />
        <DownloadLinks downloads={[{ quality: '1080p', size: '1.2 GB', url: '#' }]} />

        <CastSlider
          cast={[
            { name: 'Bryan Cranston', photo: 'https://randomuser.me/api/portraits/men/12.jpg' },
            { name: 'Aaron Paul', photo: 'https://randomuser.me/api/portraits/men/13.jpg' },
          ]}
        />
        <GallerySlider images={[series.backdrop]} />

        <h2 className="text-lg font-semibold mb-4">الوصف</h2>
        <p className="text-gray-300 leading-relaxed max-w-3xl">{series.description}</p>
      </div>
    </div>
  )
}