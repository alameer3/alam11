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
                <span className="text">شمس المواقع</span>
              </div>
            </div>
            
            {/* النص الترحيبي */}
            <div className="text-center mt-4">
              <h2 className="text-white text-2xl font-bold mb-3">
                اكوام | موقع التحميل و المشاهدة العربي الاول
              </h2>
              <p className="text-gray-300 text-lg">
                شمس المواقع، الموقع العربي الاول لتحميل و مشاهدة الافلام, المسلسلات, البرامج و التطبيقات
              </p>
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
    </div>
  )
}