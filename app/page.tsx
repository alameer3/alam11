import Link from 'next/link'
import { Sparkles, Play, TrendingUp, Flame, Star, Clock, ArrowRight, Search } from 'lucide-react'

// بيانات تجريبية للأفلام المميزة
const featuredMovies = [
  {
    id: 1,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    genre: "Action",
    image: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=400&h=600&fit=crop",
    slug: "the-dark-knight"
  },
  {
    id: 2,
    title: "Inception",
    year: 2010,
    rating: 8.8,
    genre: "Sci-Fi",
    image: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=400&h=600&fit=crop",
    slug: "inception"
  },
  {
    id: 3,
    title: "Interstellar",
    year: 2014,
    rating: 8.6,
    genre: "Adventure",
    image: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=400&h=600&fit=crop",
    slug: "interstellar"
  },
  {
    id: 4,
    title: "The Matrix",
    year: 1999,
    rating: 8.7,
    genre: "Sci-Fi",
    image: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=400&h=600&fit=crop",
    slug: "the-matrix"
  }
]

// بيانات الأقسام
const sections = [
  {
    title: "أحدث الأفلام",
    icon: Clock,
    href: "/movies",
    count: 150,
    color: "blue"
  },
  {
    title: "أفضل المسلسلات",
    icon: Star,
    href: "/series",
    count: 89,
    color: "purple"
  },
  {
    title: "البرامج الحصرية",
    icon: Flame,
    href: "/shows",
    count: 45,
    color: "orange"
  },
  {
    title: "المنوعات",
    icon: Sparkles,
    href: "/mix",
    count: 234,
    color: "pink"
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=1920&h=1080&fit=crop)`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              اكتشف عالم السينما
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
              شاهد أفضل الأفلام والمسلسلات والبرامج الحصرية بجودة عالية
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ابحث عن فيلم أو مسلسل..."
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/movies"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2" />
                ابدأ المشاهدة
              </Link>
              <Link 
                href="/series"
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                استكشف المسلسلات
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Movies Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">الأفلام المميزة</h2>
            <p className="text-gray-400 text-lg">اكتشف أفضل الأفلام المختارة خصيصاً لك</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMovies.map((movie) => (
              <Link 
                key={movie.id}
                href={`/movie/${movie.slug}`}
                className="group relative overflow-hidden rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
              >
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" fill="white" />
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-yellow-500 text-black px-2 py-1 rounded text-sm font-bold">
                    {movie.rating}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-white font-semibold text-lg mb-1">{movie.title}</h3>
                  <div className="flex items-center justify-between text-gray-400 text-sm">
                    <span>{movie.year}</span>
                    <span className="bg-gray-700 px-2 py-1 rounded">{movie.genre}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/movies"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300"
            >
              عرض جميع الأفلام
              <ArrowRight className="w-4 h-4 mr-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">استكشف المحتوى</h2>
            <p className="text-gray-400 text-lg">اختر من بين آلاف الأفلام والمسلسلات</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section) => {
              const IconComponent = section.icon
              return (
                <Link
                  key={section.title}
                  href={section.href}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 p-6 transition-all duration-300 transform hover:scale-105 border border-gray-700 hover:border-gray-600"
                >
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className={`w-8 h-8 text-${section.color}-400`} />
                    <span className="text-gray-400 text-sm">{section.count}+</span>
                  </div>
                  
                  <h3 className="text-white font-semibold text-xl mb-2">{section.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    اكتشف مجموعة متنوعة من المحتوى المميز
                  </p>
                  
                  <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                    <span className="text-sm font-medium">استكشف الآن</span>
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-400">10K+</div>
              <div className="text-gray-400">فيلم ومسلسل</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-400">50K+</div>
              <div className="text-gray-400">مستخدم نشط</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-green-400">99%</div>
              <div className="text-gray-400">جودة عالية</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-orange-400">24/7</div>
              <div className="text-gray-400">دعم فني</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}