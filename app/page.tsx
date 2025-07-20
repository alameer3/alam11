import Link from 'next/link'
import { IMAGES, optimizeImage } from '@/lib/images'
import { Sparkles, Play, TrendingUp, Flame, Star, Clock, Eye, Download, Heart } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${optimizeImage(IMAGES.hero.movie, 1920, 1080)})`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-blue-400 mr-3 rtl:ml-3 rtl:mr-0" />
              <h1 className="text-5xl lg:text-7xl font-bold text-white">
                اكوام
              </h1>
            </div>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              اكتشف عالم من الأفلام والمسلسلات والبرامج المتنوعة
              <br />
              <span className="text-blue-400">أفضل محتوى عربي وعالمي</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/movies"
                className="btn-primary text-lg px-8 py-4 flex items-center justify-center"
              >
                <Play className="w-6 h-6 mr-2 rtl:ml-2 rtl:mr-0" />
                استكشف الأفلام
              </Link>
              
              <Link 
                href="/series"
                className="btn-secondary text-lg px-8 py-4 flex items-center justify-center"
              >
                <TrendingUp className="w-6 h-6 mr-2 rtl:ml-2 rtl:mr-0" />
                المسلسلات
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">1000+</div>
                <div className="text-gray-400">فيلم</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-gray-400">مسلسل</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">50K+</div>
                <div className="text-gray-400">مستخدم</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">1M+</div>
                <div className="text-gray-400">مشاهدة</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Movies */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in-delay">
              الأفلام المميزة
            </h2>
            <p className="text-gray-400 text-lg animate-fade-in-delay-2">
              أحدث وأفضل الأفلام العربية والعالمية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="group card-hover animate-fade-in-delay-3">
                <div className="relative aspect-[2/3] overflow-hidden rounded-lg mb-4">
                  <img
                    src={optimizeImage(IMAGES.featured[`movie${i + 1}` as keyof typeof IMAGES.featured], 300, 450)}
                    alt={`فيلم مميز ${i + 1}`}
                    className="w-full h-full object-cover image-hover"
                  />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 rtl:left-3 rtl:right-auto">
                    <div className="inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold bg-black/70 text-yellow-500">
                      <Star className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
                      {8.5 + i * 0.3}
                    </div>
                  </div>

                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    فيلم رائع {i + 1}
                  </h3>
                  <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse text-sm text-gray-400">
                    <span>2024</span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
                      {120 + i * 15}م
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/movies"
              className="btn-primary text-lg px-8 py-4"
            >
              عرض جميع الأفلام
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              تصفح حسب النوع
            </h2>
            <p className="text-gray-400 text-lg">
              اختر من بين مجموعة متنوعة من التصنيفات
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'أكشن', icon: Flame, color: 'bg-red-600', href: '/movies?category=action' },
              { name: 'دراما', icon: Star, color: 'bg-blue-600', href: '/movies?category=drama' },
              { name: 'كوميدي', icon: Sparkles, color: 'bg-yellow-600', href: '/movies?category=comedy' },
              { name: 'إثارة', icon: TrendingUp, color: 'bg-purple-600', href: '/movies?category=thriller' },
            ].map((category, i) => (
              <Link key={i} href={category.href}>
                <div className={`${category.color} p-8 rounded-lg text-center group hover:scale-105 transition-transform duration-300`}>
                  <category.icon className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Content */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              أحدث المحتوى
            </h2>
            <p className="text-gray-400 text-lg">
              اكتشف أحدث الأفلام والمسلسلات المضافة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Movies */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Play className="w-6 h-6 text-blue-400 mr-3 rtl:ml-3 rtl:mr-0" />
                <h3 className="text-xl font-semibold text-white">أحدث الأفلام</h3>
              </div>
              <p className="text-gray-400 mb-4">
                اكتشف أحدث الأفلام العربية والعالمية المضافة إلى المكتبة
              </p>
              <Link href="/movies" className="text-blue-400 hover:text-blue-300 transition-colors">
                تصفح الأفلام →
              </Link>
            </div>

            {/* Series */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-400 mr-3 rtl:ml-3 rtl:mr-0" />
                <h3 className="text-xl font-semibold text-white">أحدث المسلسلات</h3>
              </div>
              <p className="text-gray-400 mb-4">
                تابع أحدث المسلسلات العربية والعالمية مع جميع الحلقات
              </p>
              <Link href="/series" className="text-green-400 hover:text-green-300 transition-colors">
                تصفح المسلسلات →
              </Link>
            </div>

            {/* Shows */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Sparkles className="w-6 h-6 text-purple-400 mr-3 rtl:ml-3 rtl:mr-0" />
                <h3 className="text-xl font-semibold text-white">أحدث البرامج</h3>
              </div>
              <p className="text-gray-400 mb-4">
                شاهد أحدث البرامج والمسلسلات الوثائقية المتنوعة
              </p>
              <Link href="/shows" className="text-purple-400 hover:text-purple-300 transition-colors">
                تصفح البرامج →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              لماذا اكوام؟
            </h2>
            <p className="text-gray-400 text-lg">
              مميزات تجعلنا الخيار الأفضل لمشاهدة المحتوى
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Eye,
                title: 'جودة عالية',
                description: 'جميع المحتوى بجودة HD و 4K'
              },
              {
                icon: Download,
                title: 'تحميل سريع',
                description: 'إمكانية التحميل بسرعة عالية'
              },
              {
                icon: Heart,
                title: 'محتوى متنوع',
                description: 'أفلام ومسلسلات من جميع أنحاء العالم'
              },
              {
                icon: Star,
                title: 'تحديث مستمر',
                description: 'إضافة محتوى جديد يومياً'
              }
            ].map((feature, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            ابدأ رحلتك مع اكوام
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف المستخدمين واستمتع بأفضل محتوى عربي وعالمي
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/movies"
              className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              ابدأ الآن
            </Link>
            <Link 
              href="/about"
              className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              تعرف علينا
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}