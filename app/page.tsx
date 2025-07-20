import { MainHeader } from '@/components/layout/main-header'
import { MainMenu } from '@/components/layout/main-menu'
import { SearchBox } from '@/components/layout/search-box'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div dir="rtl" className="header-fixed body-home min-h-screen">
      <span className="site-overlay"></span>
      
      {/* القائمة الجانبية */}
      <MainMenu />
      
      {/* شريط البحث المتنقل */}
      <SearchBox />
      
      {/* حاوي الموقع */}
      <div className="site-container">
        <div className="page-home">
          <div className="main-header-top"></div>
          
          {/* رأس الموقع */}
          <MainHeader />
          
          <div className="main-header-height"></div>
          
          {/* المحتوى الرئيسي */}
          <div className="container py-5 my-5">
            {/* الزر الدائري المركزي مطابق للأصل */}
            <div className="home-site-btn-container mt-5">
              <h1>
                <Link href="/ones" className="link" style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 10
                }}>
                  <span className="sr-only">الصفحة الرئيسية</span>
                </Link>
              </h1>
              <div 
                className="home-site-btn"
                style={{
                  backgroundImage: "url('/images/site-new.webp')",
                  transition: 'background-position 5s',
                  width: '300px',
                  height: '300px',
                  borderRadius: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  position: 'relative',
                  cursor: 'pointer',
                  backgroundColor: '#26baee',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '4px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 10px 30px rgba(38, 186, 238, 0.3)',
                  overflow: 'hidden'
                }}
              >
                {/* شعار اكوام */}
                <span className="logo mb-3">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="87px" 
                    height="80px"
                    viewBox="0 0 87 80"
                    className="drop-shadow-lg"
                  >
                    <path 
                      fillRule="evenodd" 
                      fill="rgb(255, 255, 255)"
                      d="M68.479,46.753 L55.101,55.064 L59.686,64.395 L26.302,64.395 L43.500,33.248 L48.558,41.524 L61.642,34.285 L43.500,-0.001 L0.000,80.001 L87.000,80.001 L68.479,46.753 Z"
                    />
                  </svg>
                </span>
                
                {/* النص */}
                <span className="text text-white font-bold text-xl text-center leading-tight">
                  الصفحة الرئيسية
                </span>
                
                {/* تأثير الإضاءة */}
                <div className="absolute inset-0 rounded-full shimmer-effect"></div>
              </div>
            </div>
            
            {/* شريط البحث الرئيسي */}
            <div className="widget-2 widget mb-4 mt-8">
              <div className="widget-body">
                <div className="col-lg-8 mx-auto">
                  <form 
                    className="form d-flex no-gutters mb-20 max-w-4xl mx-auto" 
                    action="/search" 
                    method="get"
                  >
                    <div className="flex-1 relative">
                      <input 
                        type="text" 
                        className="form-control w-full px-6 py-4 text-lg bg-white/10 backdrop-blur-sm border border-white/20 rounded-r-lg text-white placeholder-gray-300 focus:outline-none focus:border-[#26baee] focus:bg-white/20 transition-all"
                        id="widget2SearchInput" 
                        name="q"
                        placeholder="ابحث عن فيلم او مسلسل او لعبة او برنامج ..."
                        style={{ fontFamily: 'akoam, Inter, sans-serif' }}
                      />
                    </div>
                    <div>
                      <button 
                        type="submit" 
                        className="btn btn-orange px-8 py-4 bg-[#26baee] hover:bg-[#1fa3d1] text-white font-bold rounded-l-lg transition-all duration-300 hover:shadow-lg"
                        style={{ fontFamily: 'akoam, Inter, sans-serif' }}
                      >
                        بحث
                      </button>
                    </div>
                  </form>
                  
                  {/* الأقسام الرئيسية */}
                  <div className="main-categories-list mt-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Link 
                        href="/movies" 
                        className="item block text-center text-white py-6 px-4 h-full bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-[#26baee]/50 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                      >
                        <div className="icn mb-3 text-4xl group-hover:scale-110 transition-transform">
                          🎬
                        </div>
                        <div className="text-lg font-bold" style={{ fontFamily: 'akoam, Inter, sans-serif' }}>
                          أفلام
                        </div>
                      </Link>
                      
                      <Link 
                        href="/series" 
                        className="item block text-center text-white py-6 px-4 h-full bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-[#26baee]/50 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                      >
                        <div className="icn mb-3 text-4xl group-hover:scale-110 transition-transform">
                          📺
                        </div>
                        <div className="text-lg font-bold" style={{ fontFamily: 'akoam, Inter, sans-serif' }}>
                          مسلسلات
                        </div>
                      </Link>
                      
                      <Link 
                        href="/shows" 
                        className="item block text-center text-white py-6 px-4 h-full bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-[#26baee]/50 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                      >
                        <div className="icn mb-3 text-4xl group-hover:scale-110 transition-transform">
                          📡
                        </div>
                        <div className="text-lg font-bold" style={{ fontFamily: 'akoam, Inter, sans-serif' }}>
                          تلفزيون
                        </div>
                      </Link>
                      
                      <Link 
                        href="/mix" 
                        className="item block text-center text-white py-6 px-4 h-full bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-[#26baee]/50 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                      >
                        <div className="icn mb-3 text-4xl group-hover:scale-110 transition-transform">
                          🎭
                        </div>
                        <div className="text-lg font-bold" style={{ fontFamily: 'akoam, Inter, sans-serif' }}>
                          منوعات
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="main-categories-list-end"></div>
            
            {/* مساحة الإعلانات */}
            <div className="ads mb-3">
              <div className="text-center">
                {/* إعلان الكمبيوتر */}
                <div className="hidden md:block">
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg p-8 text-center">
                    <p className="text-gray-400 text-sm">مساحة إعلانية - كمبيوتر</p>
                    <p className="text-gray-500 text-xs">728x90</p>
                  </div>
                </div>
                
                {/* إعلان الجوال */}
                <div className="md:hidden">
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg p-6 text-center">
                    <p className="text-gray-400 text-sm">مساحة إعلانية - جوال</p>
                    <p className="text-gray-500 text-xs">300x250</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}