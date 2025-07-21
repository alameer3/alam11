import { HeroSlider } from '@/components/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗/HeroSlider'
import { WidgetSection } from '@/components/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗/WidgetSection'
import { MainHeader } from '@/components/Main/MainHeader'
import { MainSearch } from '@/components/Main/MainSearch'

export const metadata = {
  title: 'الصفحة الرئيسية | 𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗',
  description: 'شمس المواقع، الموقع العربي الأول لتحميل ومشاهدة الأفلام والمسلسلات والبرامج والألعاب بجودة عالية',
}

// Enhanced data with Arabic content
const heroSlides = [
  {
    title: 'الفيل الأزرق',
    slug: 'blue-elephant',
    backdrop: '/placeholder-hero.svg',
    overview: 'دراما نفسية مثيرة من بطولة كريم عبد العزيز وخالد الصاوي في رحلة داخل عالم الطب النفسي'
  },
  {
    title: 'The Dark Knight',
    slug: 'the-dark-knight',
    backdrop: '/placeholder-hero.svg',
    overview: 'فيلم الأكشن والإثارة الأسطوري من بطولة كريستيان بيل وهيث ليدجر في مواجهة ملحمية بين الخير والشر'
  },
  {
    title: 'Inception',
    slug: 'inception',
    backdrop: '/placeholder-hero.svg',
    overview: 'رحلة فكرية مذهلة داخل الأحلام من إخراج كريستوفر نولان في قصة خيال علمي معقدة ومشوقة'
  }
];

const latestMovies = [
  {
    slug: 'blue-elephant',
    title: 'الفيل الأزرق',
    poster: '/placeholder-movie.svg',
    rating: 8.9,
    quality: '4K'
  },
  {
    slug: 'the-dark-knight',
    title: 'The Dark Knight',
    poster: '/placeholder-movie.svg',
    rating: 9.0,
    quality: 'IMAX'
  },
  {
    slug: 'inception',
    title: 'Inception',
    poster: '/placeholder-movie.svg',
    rating: 8.8,
    quality: 'HD'
  },
  {
    slug: 'last-rooster-egypt',
    title: 'آخر ديك في مصر',
    poster: '/placeholder-movie.svg',
    rating: 7.2,
    quality: 'HD'
  },
  {
    slug: 'born-king',
    title: 'ولد ملكة',
    poster: '/placeholder-movie.svg',
    rating: 6.8,
    quality: 'HD'
  },
  {
    slug: 'the-guest',
    title: 'الضيف',
    poster: '/placeholder-movie.svg',
    rating: 7.5,
    quality: 'HD'
  }
];

const arabicSeries = [
  {
    slug: 'harb-al-jabali',
    title: 'حرب الجبالي',
    poster: '/placeholder-movie.svg',
    rating: 8.3,
    quality: 'HD'
  },
  {
    slug: 'asr',
    title: 'أسر',
    poster: '/placeholder-movie.svg',
    rating: 7.9,
    quality: 'HD'
  },
  {
    slug: 'last-sin',
    title: 'خطيئة أخيرة',
    poster: '/placeholder-movie.svg',
    rating: 8.1,
    quality: 'HD'
  },
  {
    slug: 'my-mother',
    title: 'أمي',
    poster: '/placeholder-movie.svg',
    rating: 8.5,
    quality: 'HD'
  },
  {
    slug: 'missed-deadline',
    title: 'فات الميعاد',
    poster: '/placeholder-movie.svg',
    rating: 7.7,
    quality: 'HD'
  },
  {
    slug: 'gang-fighting-squad',
    title: 'فرقة محاربة العصابات',
    poster: '/placeholder-movie.svg',
    rating: 8.0,
    quality: 'HD'
  }
];

export default function MainPage() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <MainHeader />
      <MainSearch />
      
      <div className="pt-24">
        <HeroSlider slides={heroSlides} />
        
        <div className="py-12">
          <WidgetSection title="أحدث الأفلام العربية" items={latestMovies} />
          <WidgetSection title="المسلسلات العربية الجديدة" items={arabicSeries} />
          <WidgetSection title="الأكثر مشاهدة هذا الأسبوع" items={latestMovies.slice(0, 4)} />
        </div>
      </div>
    </div>
  )
}