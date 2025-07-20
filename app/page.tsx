import { MainHeader } from '@/components/layout/main-header'
import { MainMenu } from '@/components/layout/main-menu'
import { SearchBox } from '@/components/layout/search-box'
import { AdSystem } from '@/components/ads/ad-system'
import { MovieSlider } from '@/components/ui/movie-slider'
import { ContentWidget } from '@/components/ui/content-widget'
import { connectToDatabase } from '@/lib/database/connection'
import { MovieModel } from '@/lib/database/models/movie'
import { SeriesModel } from '@/lib/database/models/series'
import { SectionModel } from '@/lib/database/models'
import Link from 'next/link'
import Image from 'next/image'

async function getHomePageData() {
  await connectToDatabase()
  
  // جلب الأقسام
  const sections = await SectionModel.getAll()
  
  // جلب المحتوى المميز للسلايدر
  const featuredMovies = await MovieModel.getFeatured(3)
  const featuredSeries = await SeriesModel.getFeatured(2)
  
  // جلب أحدث الأفلام
  const latestMovies = await MovieModel.getLatest(8)
  const featuredMovie = await MovieModel.getFeatured(1)
  
  // جلب أحدث المسلسلات
  const latestSeries = await SeriesModel.getLatest(8)
  const featuredSeriesItem = await SeriesModel.getFeatured(1)
  
  return {
    sections,
    featuredContent: [...featuredMovies, ...featuredSeries],
    movies: {
      featured: featuredMovie[0],
      latest: latestMovies
    },
    series: {
      featured: featuredSeriesItem[0],
      latest: latestSeries
    }
  }
}

export default async function HomePage() {
  const data = await getHomePageData()
  
  // تحويل البيانات لتتناسب مع المكونات الموجودة
  const sliderItems = data.featuredContent.map(item => {
    // التحقق من نوع العنصر
    const isSeries = 'total_episodes' in item && item.total_episodes !== undefined
    
    return {
      id: item.id.toString(),
      type: (isSeries ? 'series' : 'movie') as 'movie' | 'series',
      title: item.title,
      image: item.poster || '/images/placeholder.jpg',
      url: isSeries ? `/series/${item.slug}` : `/movie/${item.slug}`,
      rating: item.imdb_rating?.toString() || item.local_rating?.toString(),
      quality: item.quality?.name || 'HD'
    }
  })
  
  // تحضير عناصر الأفلام
  const movieItems = data.movies.latest.map(movie => ({
    id: movie.id.toString(),
    title: movie.title,
    image: movie.poster || '/images/placeholder.jpg',
    rating: movie.imdb_rating?.toString() || movie.local_rating?.toString(),
    year: movie.release_date ? new Date(movie.release_date).getFullYear().toString() : '',
    genres: movie.categories ? movie.categories.map(c => c.name) : [],
    quality: movie.quality?.name || 'HD',
    url: `/movie/${movie.slug}`
  }))
  
  // تحضير عناصر المسلسلات
  const seriesItems = data.series.latest.map(series => ({
    id: series.id.toString(),
    title: series.title,
    image: series.poster || '/images/placeholder.jpg',
    rating: series.imdb_rating?.toString() || series.local_rating?.toString(),
    year: series.first_air_date ? new Date(series.first_air_date).getFullYear().toString() : '',
    genres: series.categories ? series.categories.map(c => c.name) : [],
    episodes: series.total_episodes || 0,
    quality: series.quality?.name || 'HD',
    url: `/series/${series.slug}`
  }))
  
  // تحضير العنصر المميز للأفلام
  const movieFeaturedItem = data.movies.featured ? {
    id: data.movies.featured.id.toString(),
    title: data.movies.featured.title,
    description: data.movies.featured.description || '',
    image: data.movies.featured.backdrop || '/images/placeholder.jpg',
    poster: data.movies.featured.poster || '/images/placeholder.jpg',
    rating: data.movies.featured.imdb_rating?.toString() || data.movies.featured.local_rating?.toString() || '0',
    quality: data.movies.featured.quality?.name || 'HD',
    url: `/movie/${data.movies.featured.slug}`,
    trailer: data.movies.featured.trailer_url
  } : undefined
  
  // تحضير العنصر المميز للمسلسلات
  const seriesFeaturedItem = data.series.featured ? {
    id: data.series.featured.id.toString(),
    title: data.series.featured.title,
    description: data.series.featured.description || '',
    image: data.series.featured.backdrop || '/images/placeholder.jpg',
    poster: data.series.featured.poster || '/images/placeholder.jpg',
    rating: data.series.featured.imdb_rating?.toString() || data.series.featured.local_rating?.toString() || '0',
    quality: data.series.featured.quality?.name || 'HD',
    url: `/series/${data.series.featured.slug}`,
    trailer: data.series.featured.trailer_url
  } : undefined
  
  // تحضير عناصر القائمة للأقسام
  const movieSections = data.sections.map(section => ({
    name: section.name,
    url: `/movies?section=${section.id}`
  }))
  
  const seriesSections = data.sections.map(section => ({
    name: section.name,
    url: `/series?section=${section.id}`
  }))

  return (
    <div dir="rtl" className="header-fixed body-home min-h-screen bg-gradient-to-b from-black/55 to-black" 
         style={{ backgroundImage: 'url(/images/home-bg.webp)' }}>
      <span className="site-overlay"></span>
      
      {/* القائمة الجانبية */}
      <MainMenu />
      
      {/* شريط البحث المتنقل */}
      <SearchBox />
      
      {/* حاوي الموقع */}
      <div className="site-container">
        {/* رأس الصفحة */}
        <MainHeader />
        
        {/* محتوى الصفحة الرئيسية */}
        <div className="main-content">
          {/* مساحة فاصلة */}
          <div style={{ marginBottom: '90px' }}></div>
          
          <div className="container">
            {/* ويدجت المحتوى المتميز - Swiper */}
            <div className="widget-2 widget mb-4">
              <div className="widget-body">
                <MovieSlider 
                  title="المختارات" 
                  items={sliderItems}
                />
              </div>
            </div>

            {/* إعلانات */}
            <div className="ads mb-3">
              <AdSystem 
                type="banner"
                position="content"
                width="728px"
                height="90px"
              />
            </div>

            {/* ويدجت الأفلام */}
            <ContentWidget 
              title="أفلام"
              type="movies"
              headerMenuItems={movieSections}
              moreUrl="/movies"
              featuredItem={movieFeaturedItem}
              items={movieItems}
            />

            {/* ويدجت المسلسلات */}
            <ContentWidget 
              title="مسلسلات"
              type="series"
              headerMenuItems={seriesSections}
              moreUrl="/series"
              featuredItem={seriesFeaturedItem}
              items={seriesItems}
            />

            {/* ويدجت التلفزيون */}
            <ContentWidget 
              title="تلفزيون"
              type="shows"
              headerMenuItems={[
                { name: 'برامج', url: '/shows?category=برامج' },
                { name: 'توك شو', url: '/shows?category=توك-شو' },
                { name: 'مصارعة', url: '/shows?category=مصارعة' },
                { name: 'رياضة', url: '/shows?category=رياضة' }
              ]}
              moreUrl="/shows"
              items={[]}
            />

            {/* ويدجت المنوعات */}
            <ContentWidget 
              title="منوعات"
              type="mix"
              headerMenuItems={[
                { name: 'العاب', url: '/mix?category=العاب' },
                { name: 'برامج', url: '/mix?category=برامج' },
                { name: 'تطبيقات', url: '/mix?category=تطبيقات' }
              ]}
              moreUrl="/mix"
              items={[]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}