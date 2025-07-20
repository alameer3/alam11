import { Suspense } from 'react'
import { MainHeader } from '@/components/layout/main-header'
import { MainMenu } from '@/components/layout/main-menu'
import { SearchBox } from '@/components/layout/search-box'
import { AkwamLogo } from '@/components/ui/akwam-logo'

export default function HomePage() {
  return (
    <div dir="rtl" className="body-home header-fixed">
      <span className="site-overlay"></span>
      
      {/* القائمة الجانبية */}
      <MainMenu />
      
      {/* شريط البحث المتنقل */}
      <SearchBox />
      
      {/* حاوي الموقع */}
      <div className="site-container">
        <div className="page-home">
          {/* مساحة فارغة للهيدر */}
          <div className="main-header-top"></div>
          
          {/* رأس الموقع */}
          <MainHeader />
          
          {/* مساحة فارغة للهيدر */}
          <div className="main-header-height"></div>
          
          {/* المحتوى الرئيسي */}
          <div className="container py-5 my-5">
            {/* زر الموقع الرئيسي الدائري */}
            <div className="home-site-btn-container mt-5">
              <h1>
                <a href="/ones" className="link" style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 10
                }}></a>
              </h1>
              <div 
                className="home-site-btn"
                style={{
                  backgroundImage: "url('/images/site-new.webp')",
                  transition: 'background-position 5s'
                }}
              >
                <span className="logo">
                  <AkwamLogo />
                </span>
                <span className="text font-size-20 font-weight-medium text-white">الصفحة الرئيسية</span>
              </div>
            </div>
            
            {/* شريط البحث الرئيسي */}
            <div className="widget-2 widget mb-4">
              <div className="widget-body row">
                <div className="col-lg-8 mx-auto">
                  <form className="form d-flex no-gutters mb-20" action="/search" method="get">
                    <div className="col pl-12">
                      <input 
                        type="text" 
                        className="form-control bg-transparent border border-gray-600 text-white rounded-r-none" 
                        id="widget2SearchInput" 
                        name="q"
                        placeholder="ابحث عن فيلم او مسلسل او لعبة او برنامج ..."
                      />
                    </div>
                    <div className="col-auto">
                      <button type="submit" className="btn bg-[#26baee] hover:bg-[#0d82ab] text-white px-6 py-2 rounded-l-none border-0">
                        بحث
                      </button>
                    </div>
                  </form>
                  
                  {/* الأقسام الرئيسية مطابقة للأصل */}
                  <div className="main-categories-list">
                    <div className="row grid grid-cols-4 gap-2">
                      <div className="col-lg col-4">
                        <a href="/movies" className="item d-block text-center text-white py-3 h-100 bg-[#1a1a1a] rounded border border-[#333] hover:border-[#26baee] transition-all">
                          <div className="icn mb-2">
                            <i className="icon-video-camera text-2xl">🎬</i>
                          </div>
                          <div className="font-size-16">أفلام</div>
                        </a>
                      </div>
                      <div className="col-lg col-4">
                        <a href="/series" className="item d-block text-center text-white py-3 h-100 bg-[#1a1a1a] rounded border border-[#333] hover:border-[#26baee] transition-all">
                          <div className="icn mb-2">
                            <i className="icon-monitor text-2xl">📺</i>
                          </div>
                          <div className="font-size-16">مسلسلات</div>
                        </a>
                      </div>
                      <div className="col-lg col-4">
                        <a href="/shows" className="item d-block text-center text-white py-3 h-100 bg-[#1a1a1a] rounded border border-[#333] hover:border-[#26baee] transition-all">
                          <div className="icn mb-2">
                            <i className="icon-tv text-2xl">📡</i>
                          </div>
                          <div className="font-size-16">تلفزيون</div>
                        </a>
                      </div>
                      <div className="col-lg col-4">
                        <a href="/mix" className="item d-block text-center text-white py-3 h-100 bg-[#1a1a1a] rounded border border-[#333] hover:border-[#26baee] transition-all">
                          <div className="icn mb-2">
                            <i className="icon-mix text-2xl">🎭</i>
                          </div>
                          <div className="font-size-16">منوعات</div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* إحصائيات الموقع */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#26baee] mb-2">15,000+</div>
                <div className="text-gray-300 text-sm">فيلم</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#26baee] mb-2">8,500+</div>
                <div className="text-gray-300 text-sm">مسلسل</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#26baee] mb-2">2,300+</div>
                <div className="text-gray-300 text-sm">برنامج</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#26baee] mb-2">500K+</div>
                <div className="text-gray-300 text-sm">مستخدم</div>
              </div>
            </div>
            
            {/* أقسام التصفح السريع */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { name: 'أفلام', href: '/movies', icon: '🎬', count: '15,000+' },
                { name: 'مسلسلات', href: '/series', icon: '📺', count: '8,500+' },
                { name: 'تلفزيون', href: '/shows', icon: '📡', count: '2,300+' },
                { name: 'منوعات', href: '/mix', icon: '🎭', count: '3,200+' }
              ].map((item) => (
                <a 
                  key={item.name}
                  href={item.href}
                  className="group bg-[#1a1a1a] border border-[#333] rounded-xl p-6 text-center hover:border-[#26baee] transition-all duration-300 hover:bg-[#26baee]/10"
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#26baee] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{item.count}</p>
                </a>
              ))}
            </div>
            
            {/* تحديثات حديثة */}
            <div className="mt-12 text-center">
              <a 
                href="/recent" 
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#26baee] to-[#0d82ab] text-white font-bold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <span className="ml-2">أضيف حديثاً</span>
                <span>✨</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer مطابق للموقع الأصلي */}
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