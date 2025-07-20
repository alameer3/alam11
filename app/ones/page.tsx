import { MainHeader } from '@/components/layout/main-header'
import { MainMenu } from '@/components/layout/main-menu'
import { SearchBox } from '@/components/layout/search-box'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'الصفحة الرئيسية | اكوام',
  description: 'شمس المواقع، الموقع العربي الاول لتحميل و مشاهدة الافلام, المسلسلات, الالعاب, البرامج و التطبيقات, التلفزيون, المسرحيات, المصارعة, الرياضة, تحميل و مشاهدة مباشرة',
  openGraph: {
    title: 'الصفحة الرئيسية | اكوام',
    description: 'شمس المواقع، الموقع العربي الاول لتحميل و مشاهدة الافلام, المسلسلات, الالعاب, البرامج و التطبيقات, التلفزيون, المسرحيات, المصارعة, الرياضة, تحميل و مشاهدة مباشرة',
    url: 'https://ak.sv/main',
    type: 'article'
  },
  twitter: {
    title: 'الصفحة الرئيسية | اكوام',
    description: 'شمس المواقع، الموقع العربي الاول لتحميل و مشاهدة الافلام, المسلسلات, الالعاب, البرامج و التطبيقات, التلفزيون, المسرحيات, المصارعة, الرياضة, تحميل و مشاهدة مباشرة'
  }
}

// بيانات وهمية للمحتوى الحديث
const recentContent = [
  {
    id: 1,
    title: "Spider-Man: No Way Home",
    type: "movie",
    year: "2021",
    poster: "/images/placeholders/movie1.jpg",
    quality: "4K"
  },
  {
    id: 2,
    title: "House of the Dragon",
    type: "series",
    year: "2022",
    poster: "/images/placeholders/series1.jpg",
    quality: "FHD"
  },
  {
    id: 3,
    title: "WWE Raw",
    type: "show",
    year: "2025",
    poster: "/images/placeholders/show1.jpg",
    quality: "HD"
  }
]

export default function OnesPage() {
  return (
    <div dir="rtl" className="body-home header-fixed">
      <span className="site-overlay"></span>
      <MainMenu />
      <SearchBox />
      
      <div className="site-container">
        <div className="page-content">
          <div className="main-header-top"></div>
          <MainHeader />
          <div className="main-header-height"></div>
          
          <div className="container py-5 my-5">
            <div className="text-center mb-5">
              <h1 className="text-4xl font-bold text-white mb-3">
                شمس المواقع
              </h1>
              <p className="text-gray-300 text-lg">
                الموقع العربي الاول لتحميل و مشاهدة الافلام و المسلسلات
              </p>
            </div>

            {/* أحدث المحتوى */}
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333] mb-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="text-3xl ml-3">🔥</span>
                أحدث الإضافات
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentContent.map((item) => (
                  <div key={item.id} className="bg-[#2a2a2a] rounded-lg overflow-hidden border border-[#444] hover:border-[#26baee] transition-colors">
                    <div className="aspect-video bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">صورة المحتوى</span>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-bold text-lg mb-2 line-clamp-1">{item.title}</h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">{item.year}</span>
                        <span className="bg-[#26baee] text-white px-2 py-1 rounded text-xs">{item.quality}</span>
                      </div>
                      <div className="mt-3">
                        <button className="w-full bg-[#26baee] text-white py-2 rounded hover:bg-[#1fa3d1] transition-colors">
                          مشاهدة الآن
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* إحصائيات الموقع */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#333] text-center">
                <div className="text-2xl font-bold text-[#26baee] mb-1">15,000+</div>
                <div className="text-gray-400 text-sm">أفلام</div>
              </div>
              <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#333] text-center">
                <div className="text-2xl font-bold text-[#26baee] mb-1">8,500+</div>
                <div className="text-gray-400 text-sm">مسلسلات</div>
              </div>
              <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#333] text-center">
                <div className="text-2xl font-bold text-[#26baee] mb-1">3,200+</div>
                <div className="text-gray-400 text-sm">برامج تلفزيونية</div>
              </div>
              <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#333] text-center">
                <div className="text-2xl font-bold text-[#26baee] mb-1">1,800+</div>
                <div className="text-gray-400 text-sm">منوعات</div>
              </div>
            </div>

            {/* أقسام سريعة */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a href="/movies" className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333] hover:border-[#26baee] transition-colors text-center group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🎬</div>
                <div className="text-white font-bold">أفلام</div>
                <div className="text-gray-400 text-sm mt-1">أحدث الأفلام العالمية</div>
              </a>
              
              <a href="/series" className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333] hover:border-[#26baee] transition-colors text-center group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📺</div>
                <div className="text-white font-bold">مسلسلات</div>
                <div className="text-gray-400 text-sm mt-1">مسلسلات عربية وأجنبية</div>
              </a>
              
              <a href="/shows" className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333] hover:border-[#26baee] transition-colors text-center group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📡</div>
                <div className="text-white font-bold">تلفزيون</div>
                <div className="text-gray-400 text-sm mt-1">برامج ومصارعة</div>
              </a>
              
              <a href="/mix" className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333] hover:border-[#26baee] transition-colors text-center group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🎭</div>
                <div className="text-white font-bold">منوعات</div>
                <div className="text-gray-400 text-sm mt-1">محتوى متنوع</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}