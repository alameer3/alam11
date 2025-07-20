import { MainHeader } from '@/components/layout/main-header'
import { MainMenu } from '@/components/layout/main-menu'
import { SearchBox } from '@/components/layout/search-box'
import { Footer } from '@/components/layout/footer'
import { AdSystem } from '@/components/ads/ad-system'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div dir="rtl" className="header-fixed body-home min-h-screen" style={{ 
      background: 'linear-gradient(to bottom, rgba(0, 0, 0, .55), #000 100%), url(/images/home-bg.webp)' 
    }}>
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
                <Link href="/main" className="link" style={{
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
                  margin: '0 auto',
                  borderRadius: '50%',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  backgroundColor: '#2a2a2a',
                  border: '3px solid #ff6b35'
                }}
              >
                <span className="logo mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="87px" height="80px">
                    <path fillRule="evenodd" fill="rgb(255, 255, 255)"
                      d="M68.479,46.753 L55.101,55.064 L59.686,64.395 L26.302,64.395 L43.500,33.248 L48.558,41.524 L61.642,34.285 L43.500,-0.001 L0.000,80.001 L87.000,80.001 L68.479,46.753 Z"/>
                  </svg>
                </span>
                <span className="text font-size-20 font-weight-medium text-white">الصفحة الرئيسية</span>
              </div>
            </div>

            {/* صندوق البحث والقوائم الرئيسية */}
            <div className="widget-2 widget mb-4">
              <div className="widget-body row">
                <div className="col-lg-8 mx-auto">
                  <form className="form d-flex no-gutters mb-4" action="/search" method="get">
                    <div className="col pr-3">
                      <input 
                        type="text" 
                        className="form-control bg-gray-800 border-gray-600 text-white text-right"
                        id="widget2SearchInput" 
                        name="q"
                        placeholder="ابحث عن فيلم او مسلسل او لعبة او برنامج ..."
                        style={{ 
                          borderRadius: '6px 0 0 6px',
                          padding: '12px 16px',
                          fontSize: '16px',
                          border: '1px solid #444'
                        }}
                      />
                    </div>
                    <div className="col-auto">
                      <button 
                        type="submit" 
                        className="btn font-weight-bold text-white px-6 py-3"
                        style={{ 
                          backgroundColor: '#ff6b35',
                          borderRadius: '0 6px 6px 0',
                          border: 'none',
                          fontSize: '16px'
                        }}
                      >
                        بحث
                      </button>
                    </div>
                  </form>

                  {/* القوائم الرئيسية */}
                  <div className="main-categories-list">
                    <div className="row">
                      <div className="col-lg col-4">
                        <Link href="/movies" className="item d-block text-center text-white py-4 h-100 hover:bg-gray-700 transition-colors rounded">
                          <div className="icn mb-2">
                            <i className="text-4xl text-orange-500">🎬</i>
                          </div>
                          <div className="font-size-16 font-weight-medium">أفلام</div>
                        </Link>
                      </div>
                      <div className="col-lg col-4">
                        <Link href="/series" className="item d-block text-center text-white py-4 h-100 hover:bg-gray-700 transition-colors rounded">
                          <div className="icn mb-2">
                            <i className="text-4xl text-orange-500">📺</i>
                          </div>
                          <div className="font-size-16 font-weight-medium">مسلسلات</div>
                        </Link>
                      </div>
                      <div className="col-lg col-4">
                        <Link href="/shows" className="item d-block text-center text-white py-4 h-100 hover:bg-gray-700 transition-colors rounded">
                          <div className="icn mb-2">
                            <i className="text-4xl text-orange-500">📡</i>
                          </div>
                          <div className="font-size-16 font-weight-medium">تلفزيون</div>
                        </Link>
                      </div>
                      <div className="col-lg col-4">
                        <Link href="/mix" className="item d-block text-center text-white py-4 h-100 hover:bg-gray-700 transition-colors rounded">
                          <div className="icn mb-2">
                            <i className="text-4xl text-orange-500">🎭</i>
                          </div>
                          <div className="font-size-16 font-weight-medium">منوعات</div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* إعلانات الصفحة الرئيسية */}
            <div className="ads mb-3">
              <center>
                {/* إعلان للكمبيوتر */}
                <div className="d-none d-md-block">
                  <AdSystem
                    adType="banner"
                    placement="homepage-desktop"
                    dimensions={{ width: 728, height: 90 }}
                    showCloseButton={false}
                  />
                </div>

                {/* إعلان للجوال */}
                <div className="d-md-none">
                  <AdSystem
                    adType="banner"
                    placement="homepage-mobile"
                    dimensions={{ width: 300, height: 250 }}
                    showCloseButton={false}
                  />
                </div>
              </center>
            </div>
          </div>
        </div>

        {/* التذييل */}
        <Footer />
      </div>
    </div>
  )
}