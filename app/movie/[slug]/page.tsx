import { MainHeader } from '@/components/layout/main-header'
import { MainMenu } from '@/components/layout/main-menu'
import { SearchBox } from '@/components/layout/search-box'

interface MoviePageProps {
  params: {
    slug: string
  }
}

// بيانات وهمية للفيلم
const getMovieData = (slug: string) => {
  // استخراج المعرف والاسم من slug
  const parts = slug.split('/').pop()?.split('-') || []
  const id = parts[0] || '9915'
  
  return {
    id,
    title: "Spiders on a Plane",
    originalTitle: "Spiders on a Plane (2024)",
    year: "2024",
    rating: "6.2",
    duration: "90 دقيقة",
    genre: ["أكشن", "إثارة", "خيال علمي"],
    country: "أمريكا",
    language: "إنجليزي",
    quality: "4K",
    size: "2.1 GB",
    director: "John Smith",
    cast: ["Actor 1", "Actor 2", "Actor 3"],
    plot: "عندما تنطلق العناكب المميتة في طائرة تجارية، يجب على الركاب والطاقم محاربة هذه المخلوقات المرعبة للبقاء على قيد الحياة. فيلم إثارة مليء بالتشويق والأكشن.",
    poster: "/images/placeholders/movie-poster.jpg",
    trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    downloadLinks: [
      { quality: "4K", size: "2.1 GB", link: "#" },
      { quality: "FHD", size: "1.4 GB", link: "#" },
      { quality: "HD", size: "800 MB", link: "#" },
      { quality: "SD", size: "400 MB", link: "#" }
    ],
    watchLinks: [
      { server: "سيرفر 1", link: "#" },
      { server: "سيرفر 2", link: "#" },
      { server: "سيرفر 3", link: "#" }
    ]
  }
}

export default function MoviePage({ params }: MoviePageProps) {
  const movie = getMovieData(params.slug)

  return (
    <div dir="rtl" className="header-fixed header-pages">
      <span className="site-overlay"></span>
      <MainMenu />
      <SearchBox />
      
      <div className="site-container">
        <div className="page-content">
          <div className="main-header-top"></div>
          <MainHeader />
          <div className="main-header-height"></div>
          
          <div className="container py-5 my-5">
            {/* معلومات الفيلم */}
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333] mb-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* بوستر الفيلم */}
                <div className="md:col-span-1">
                  <div className="aspect-[2/3] bg-[#333] rounded-lg flex items-center justify-center text-8xl">
                    🎬
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="bg-[#26baee] text-white px-3 py-1 rounded text-center font-bold">
                      {movie.quality}
                    </div>
                    <div className="text-center text-gray-400">
                      الحجم: {movie.size}
                    </div>
                  </div>
                </div>
                
                {/* تفاصيل الفيلم */}
                <div className="md:col-span-2">
                  <h1 className="text-3xl font-bold text-white mb-2">{movie.title}</h1>
                  <h2 className="text-xl text-gray-300 mb-4">{movie.originalTitle}</h2>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <span className="text-gray-400">التقييم:</span>
                      <span className="text-[#26baee] font-bold ml-2">⭐ {movie.rating}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">المدة:</span>
                      <span className="text-white ml-2">{movie.duration}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">السنة:</span>
                      <span className="text-white ml-2">{movie.year}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">البلد:</span>
                      <span className="text-white ml-2">{movie.country}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">اللغة:</span>
                      <span className="text-white ml-2">{movie.language}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">المخرج:</span>
                      <span className="text-white ml-2">{movie.director}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-gray-400">النوع:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {movie.genre.map((g, index) => (
                        <span key={index} className="bg-[#222] text-white px-3 py-1 rounded border border-[#333]">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <span className="text-gray-400">التمثيل:</span>
                    <p className="text-white mt-2">{movie.cast.join(" • ")}</p>
                  </div>
                  
                  <div>
                    <span className="text-gray-400">القصة:</span>
                    <p className="text-white mt-2 leading-relaxed">{movie.plot}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* أزرار المشاهدة والتحميل */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* المشاهدة المباشرة */}
              <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333]">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="text-2xl ml-3">🎥</span>
                  مشاهدة مباشرة
                </h3>
                <div className="space-y-3">
                  {movie.watchLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.link}
                      className="block w-full bg-[#26baee] hover:bg-[#0d82ab] text-white font-bold py-3 px-4 rounded text-center transition-colors"
                    >
                      🎬 {link.server}
                    </a>
                  ))}
                </div>
              </div>
              
              {/* التحميل */}
              <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333]">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="text-2xl ml-3">⬇️</span>
                  تحميل مباشر
                </h3>
                <div className="space-y-3">
                  {movie.downloadLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.link}
                      className="flex justify-between items-center w-full bg-[#222] hover:bg-[#333] text-white font-bold py-3 px-4 rounded transition-colors border border-[#333] hover:border-[#26baee]"
                    >
                      <span>📥 {link.quality}</span>
                      <span className="text-sm text-gray-400">{link.size}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* التريلر */}
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333]">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="text-2xl ml-3">🎞️</span>
                المقطع الدعائي
              </h3>
              <div className="aspect-video bg-[#222] rounded-lg flex items-center justify-center">
                <a 
                  href={movie.trailer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-6xl hover:text-[#26baee] transition-colors"
                >
                  ▶️
                </a>
              </div>
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
        </nav>

        <nav className="links flex justify-center mt-3 flex-wrap">
          <a href="/" className="mx-2 text-gray-400 hover:text-white text-sm">اكوام</a>
          <a href="/old" className="mx-2 text-gray-400 hover:text-white text-sm">الموقع القديم</a>
          <a href="/dmca" className="mx-2 text-gray-400 hover:text-white text-sm">DMCA</a>
        </nav>

        <p className="copyright mb-0 text-xs text-center mt-3 text-gray-500">
          جميع الحقوق محفوظة لـ شبكة اكوام © 2025
        </p>
      </footer>
    </div>
  )
}