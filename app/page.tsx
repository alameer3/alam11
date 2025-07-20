import { HeroSlider } from '@/components/akwam/HeroSlider'
import { WidgetSection } from '@/components/akwam/WidgetSection'

// Dummy data
const heroSlides = [
  {
    title: 'The Dark Knight',
    slug: 'the-dark-knight',
    backdrop: 'https://images.unsplash.com/photo-1502139214982-d0ad755818cc?w=1920&h=1080&fit=crop',
    overview: 'فيلم أكشن وإثارة من بطولة كريستيان بيل'
  },
  {
    title: 'Inception',
    slug: 'inception',
    backdrop: 'https://images.unsplash.com/photo-1482933284235-a5d8b219a5bb?w=1920&h=1080&fit=crop',
    overview: 'رحلة داخل الأحلام من إخراج كريستوفر نولان'
  },
  {
    title: 'Interstellar',
    slug: 'interstellar',
    backdrop: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?w=1920&h=1080&fit=crop',
    overview: 'مغامرة فضائية ملحمية'
  }
]

const latestMovies = heroSlides.map((s) => ({
  slug: s.slug,
  title: s.title,
  poster: s.backdrop,
  rating: 8.5,
  quality: 'HD'
}))

export default function HomePage() {
  return (
    <div className="bg-home min-h-screen">
      <HeroSlider slides={heroSlides} />

      <WidgetSection title="أحدث الأفلام" items={latestMovies} />
    </div>
  )
}