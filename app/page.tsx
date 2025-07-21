import { HeroSlider } from '@/components/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗/HeroSlider'
import { WidgetSection } from '@/components/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗/WidgetSection'

// Enhanced data with Arabic content
const heroSlides = [
  {
    title: 'الفيل الأزرق',
    slug: 'blue-elephant',
    backdrop: '/placeholder-hero.svg',
    overview: 'دراما نفسية مثيرة من بطولة كريم عبد العزيز وخالد الصاوي في رحلة داخل عالم الطب النفسي',
    rating: 8.9,
    year: 2014,
    genre: 'دراما',
    quality: '4K'
  },
  {
    title: 'The Dark Knight',
    slug: 'the-dark-knight',
    backdrop: '/placeholder-hero.svg',
    overview: 'فيلم الأكشن والإثارة الأسطوري من بطولة كريستيان بيل وهيث ليدجر في مواجهة ملحمية بين الخير والشر',
    rating: 9.0,
    year: 2008,
    genre: 'أكشن',
    quality: 'IMAX'
  },
  {
    title: 'Inception',
    slug: 'inception',
    backdrop: '/placeholder-hero.svg',
    overview: 'رحلة فكرية مذهلة داخل الأحلام من إخراج كريستوفر نولان في قصة خيال علمي معقدة ومشوقة',
    rating: 8.8,
    year: 2010,
    genre: 'خيال علمي',
    quality: 'HD'
  }
];

const latestMovies = [
  {
    title: 'الفيل الأزرق',
    slug: 'blue-elephant',
    poster: '/placeholder-movie.svg',
    rating: 8.9,
    year: 2014,
    quality: '4K',
    genre: 'دراما',
    description: 'دراما نفسية مثيرة'
  },
  {
    title: 'The Dark Knight',
    slug: 'the-dark-knight',
    poster: '/placeholder-movie.svg',
    rating: 9.0,
    year: 2008,
    quality: 'IMAX',
    genre: 'أكشن',
    description: 'فيلم الأكشن الأسطوري'
  },
  {
    title: 'Inception',
    slug: 'inception',
    poster: '/placeholder-movie.svg',
    rating: 8.8,
    year: 2010,
    quality: 'HD',
    genre: 'خيال علمي',
    description: 'رحلة داخل الأحلام'
  },
  {
    title: 'آخر ديك في مصر',
    slug: 'last-rooster-egypt',
    poster: '/placeholder-movie.svg',
    rating: 7.2,
    year: 2017,
    quality: 'HD',
    genre: 'كوميديا',
    description: 'كوميديا مصرية رائعة'
  },
  {
    title: 'ولد ملكة',
    slug: 'born-king',
    poster: '/placeholder-movie.svg',
    rating: 6.8,
    year: 2020,
    quality: 'HD',
    genre: 'دراما',
    description: 'قصة درامية مؤثرة'
  },
  {
    title: 'الضيف',
    slug: 'the-guest',
    poster: '/placeholder-movie.svg',
    rating: 7.5,
    year: 2019,
    quality: 'HD',
    genre: 'إثارة',
    description: 'فيلم إثارة وتشويق'
  }
];

const arabicSeries = [
  {
    title: 'حرب الجبالي',
    slug: 'harb-al-jabali',
    poster: '/placeholder-movie.svg',
    rating: 8.3,
    year: 2024,
    quality: 'HD',
    genre: 'دراما',
    description: 'مسلسل درامي بدوي',
    type: 'series' as const
  },
  {
    title: 'أسر',
    slug: 'asr',
    poster: '/placeholder-movie.svg',
    rating: 7.9,
    year: 2024,
    quality: 'HD',
    genre: 'دراما',
    description: 'مسلسل عائلي مؤثر',
    type: 'series' as const
  },
  {
    title: 'خطيئة أخيرة',
    slug: 'last-sin',
    poster: '/placeholder-movie.svg',
    rating: 8.1,
    year: 2024,
    quality: 'HD',
    genre: 'جريمة',
    description: 'مسلسل جريمة وغموض',
    type: 'series' as const
  },
  {
    title: 'أمي',
    slug: 'my-mother',
    poster: '/placeholder-movie.svg',
    rating: 8.5,
    year: 2024,
    quality: 'HD',
    genre: 'دراما',
    description: 'قصة عن الأمومة',
    type: 'series' as const
  },
  {
    title: 'فات الميعاد',
    slug: 'missed-deadline',
    poster: '/placeholder-movie.svg',
    rating: 7.7,
    year: 2024,
    quality: 'HD',
    genre: 'رومانسي',
    description: 'قصة حب متأخرة',
    type: 'series' as const
  },
  {
    title: 'فرقة محاربة العصابات',
    slug: 'gang-fighting-squad',
    poster: '/placeholder-movie.svg',
    rating: 8.0,
    year: 2024,
    quality: 'HD',
    genre: 'أكشن',
    description: 'مسلسل أكشن بوليسي',
    type: 'series' as const
  }
];

// Convert hero slides to simple format for existing component
const simpleHeroSlides = heroSlides.map(slide => ({
  title: slide.title,
  slug: slide.slug,
  backdrop: slide.backdrop,
  overview: slide.overview
}));

// Convert movies to simple format
const simpleMovies = latestMovies.map(movie => ({
  slug: movie.slug,
  title: movie.title,
  poster: movie.poster,
  rating: movie.rating,
  quality: movie.quality
}));

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(to bottom, rgba(0, 0, 0, .55), #000 100%), url(/home-bg.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <HeroSlider slides={simpleHeroSlides} />
      
      <div className="py-12">
        <WidgetSection title="أحدث الأفلام العربية" items={simpleMovies} />
        
        <WidgetSection 
          title="المسلسلات العربية الجديدة" 
          items={arabicSeries.map(series => ({
            slug: series.slug,
            title: series.title,
            poster: series.poster,
            rating: series.rating,
            quality: series.quality
          }))} 
        />
        
        <WidgetSection 
          title="الأكثر مشاهدة هذا الأسبوع" 
          items={simpleMovies.slice(0, 4)} 
        />
      </div>
    </div>
  )
}