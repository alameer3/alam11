import { MainHeader } from '@/components/layout/main-header'
import { MainMenu } from '@/components/layout/main-menu'
import { SearchBox } from '@/components/layout/search-box'

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
        <div className="page-home">
          <div className="main-header-top"></div>
          <MainHeader />
          <div className="main-header-height"></div>
          
          <div className="container py-5 my-5">
            {/* المحتوى الرئيسي */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                🌟 شمس المواقع 🌟
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                الموقع العربي الأول لتحميل ومشاهدة الأفلام والمسلسلات
              </p>
            </div>

            {/* شريط البحث المتقدم */}
            <div className="bg-[#1a1a1a] rounded-lg p-6 mb-8 border border-[#333]">
              <form className="flex flex-col md:flex-row gap-4" action="/search" method="get">
                <input 
                  type="text" 
                  name="q"
                  placeholder="ابحث عن فيلم او مسلسل او لعبة او برنامج ..." 
                  className="flex-1 px-4 py-3 bg-[#222] border border-[#333] rounded text-white placeholder-gray-400 focus:border-[#26baee] focus:outline-none"
                />
                <button 
                  type="submit"
                  className="px-8 py-3 bg-[#26baee] hover:bg-[#0d82ab] text-white font-bold rounded transition-colors"
                >
                  🔍 بحث
                </button>
              </form>
            </div>

            {/* الأقسام الرئيسية */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <a href="/movies" className="group bg-[#1a1a1a] border border-[#333] rounded-xl p-6 text-center hover:border-[#26baee] transition-all duration-300 hover:bg-[#26baee]/10">
                <div className="text-4xl mb-3">🎬</div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#26baee] transition-colors">أفلام</h3>
                <p className="text-gray-400 text-sm">15,000+ فيلم</p>
              </a>
              
              <a href="/series" className="group bg-[#1a1a1a] border border-[#333] rounded-xl p-6 text-center hover:border-[#26baee] transition-all duration-300 hover:bg-[#26baee]/10">
                <div className="text-4xl mb-3">📺</div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#26baee] transition-colors">مسلسلات</h3>
                <p className="text-gray-400 text-sm">8,500+ مسلسل</p>
              </a>
              
              <a href="/shows" className="group bg-[#1a1a1a] border border-[#333] rounded-xl p-6 text-center hover:border-[#26baee] transition-all duration-300 hover:bg-[#26baee]/10">
                <div className="text-4xl mb-3">📡</div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#26baee] transition-colors">تلفزيون</h3>
                <p className="text-gray-400 text-sm">2,300+ برنامج</p>
              </a>
              
              <a href="/mix" className="group bg-[#1a1a1a] border border-[#333] rounded-xl p-6 text-center hover:border-[#26baee] transition-all duration-300 hover:bg-[#26baee]/10">
                <div className="text-4xl mb-3">🎭</div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#26baee] transition-colors">منوعات</h3>
                <p className="text-gray-400 text-sm">3,200+ محتوى</p>
              </a>
            </div>

            {/* المحتوى الأحدث */}
            <div className="bg-[#1a1a1a] rounded-lg p-6 mb-8 border border-[#333]">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="text-3xl ml-3">⭐</span>
                أحدث الإضافات
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentContent.map((item) => (
                  <div key={item.id} className="bg-[#222] rounded-lg p-4 border border-[#333] hover:border-[#26baee] transition-all duration-300 group">
                    <div className="aspect-[2/3] bg-[#333] rounded-lg mb-4 flex items-center justify-center text-6xl">
                      {item.type === 'movie' ? '🎬' : item.type === 'series' ? '📺' : '📡'}
                    </div>
                    
                    <h3 className="text-white font-bold mb-2 group-hover:text-[#26baee] transition-colors">
                      {item.title}
                    </h3>
                    
                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <span>{item.year}</span>
                      <span className="bg-[#26baee] text-white px-2 py-1 rounded text-xs">
                        {item.quality}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* الإحصائيات */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center bg-[#1a1a1a] rounded-lg p-6 border border-[#333]">
                <div className="text-3xl font-bold text-[#26baee] mb-2">15,000+</div>
                <div className="text-gray-300">فيلم</div>
              </div>
              <div className="text-center bg-[#1a1a1a] rounded-lg p-6 border border-[#333]">
                <div className="text-3xl font-bold text-[#26baee] mb-2">8,500+</div>
                <div className="text-gray-300">مسلسل</div>
              </div>
              <div className="text-center bg-[#1a1a1a] rounded-lg p-6 border border-[#333]">
                <div className="text-3xl font-bold text-[#26baee] mb-2">2,300+</div>
                <div className="text-gray-300">برنامج</div>
              </div>
              <div className="text-center bg-[#1a1a1a] rounded-lg p-6 border border-[#333]">
                <div className="text-3xl font-bold text-[#26baee] mb-2">500K+</div>
                <div className="text-gray-300">مستخدم</div>
              </div>
            </div>

            {/* زر الانتقال للمحتوى الحديث */}
            <div className="text-center">
              <a href="/recent" className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#26baee] to-[#0d82ab] text-white font-bold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                <span className="ml-2">أضيف حديثاً</span>
                <span>✨</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="main-footer py-5">
        <nav className="social flex justify-center flex-wrap">
          <a href="https://akw.to" target="_blank" className="mx-2 mb-2" title="الموقع الرئيسي" rel="noopener noreferrer">
            <span className="text-xl">🏠</span>
          </a>
          <a href="https://www.facebook.com/akwamnet" target="_blank" className="mx-2 mb-2" title="فيسبوك" rel="noopener noreferrer">
            <span className="text-xl">📘</span>
          </a>
          <a href="https://www.facebook.com/groups/AKOAMweb" target="_blank" className="mx-2 mb-2" title="مجموعة فيسبوك" rel="noopener noreferrer">
            <span className="text-xl">👥</span>
          </a>
          <a href="https://akw.net.in/" target="_blank" className="mx-2 mb-2" title="التطبيق" rel="noopener noreferrer">
            <span className="text-xl">📱</span>
          </a>
          <a href="https://www.youtube.com/c/AKWAMnetwork" target="_blank" className="mx-2 mb-2" title="يوتيوب" rel="noopener noreferrer">
            <span className="text-xl">📺</span>
          </a>
          <a href="/AKWAM-Notifications" target="_self" className="mx-2 mb-2" title="الإشعارات">
            <span className="text-xl">🔔</span>
          </a>
          <a href="/contactus" target="_self" className="mx-2 mb-2" title="اتصل بنا">
            <span className="text-xl">✉️</span>
          </a>
        </nav>

        <nav className="links flex justify-center mt-3 flex-wrap">
          <a href="/" className="mx-2 text-gray-400 hover:text-white text-sm">اكوام</a>
          <a href="/old" className="mx-2 text-gray-400 hover:text-white text-sm">الموقع القديم</a>
          <a href="/dmca" className="mx-2 text-gray-400 hover:text-white text-sm">DMCA</a>
          <a href="/ad-policy" className="mx-2 text-gray-400 hover:text-white text-sm">AD-P</a>
          <a href="https://ak-news.com" target="_blank" className="mx-2 text-gray-400 hover:text-white text-sm">اكوام نيوز</a>
          <a href="https://akw.net.co" target="_blank" className="mx-2 text-gray-400 hover:text-white text-sm">شبكة اكوام</a>
        </nav>

        <p className="copyright mb-0 text-xs text-center mt-3 text-gray-500">
          جميع الحقوق محفوظة لـ شبكة اكوام © 2025
        </p>
      </footer>
    </div>
  )
}