import { MainHeader } from '@/components/layout/main-header'
import { MainMenu } from '@/components/layout/main-menu'
import { SearchBox } from '@/components/layout/search-box'
import { Metadata } from 'next'

interface MoviePageProps {
  params: {
    slug: string
  }
}

// بيانات وهمية للفيلم - مطابقة للموقع الأصلي
const getMovieData = (slug: string) => {
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
    plot: "تكتشف مجموعة من المسافرين الشباب أن عطلة أحلامهم تحولت إلى كابوس عندما يهرب غزو العناكب القاتلة.",
    poster: "https://img.downet.net/thumb/830x506/uploads/Jx74g.webp",
    releaseDate: "2025-07-13"
  }
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const movie = getMovieData(params.slug)
  
  return {
    title: `${movie.title} | اكوام`,
    description: `مشاهدة و تحميل فيلم ${movie.title} حيث يدور العمل حول ${movie.plot}`,
    keywords: `مشاهدة و تحميل فيلم ${movie.title},${movie.title},العناكب على متن طائرة`,
    openGraph: {
      title: `${movie.title} | اكوام`,
      description: `مشاهدة و تحميل فيلم ${movie.title} حيث يدور العمل حول ${movie.plot}`,
      url: `https://ak.sv/movie/${movie.id}/${movie.title.toLowerCase().replace(/\s+/g, '-')}`,
      type: 'article',
      images: [
        {
          url: movie.poster,
          width: 573,
          height: 300
        }
      ],
      publishedTime: movie.releaseDate,
      modifiedTime: movie.releaseDate
    },
    twitter: {
      title: `${movie.title} | اكوام`,
      description: `مشاهدة و تحميل فيلم ${movie.title} حيث يدور العمل حول ${movie.plot}`,
      images: [movie.poster]
    }
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
          
          <div className="container py-5">
            {/* Breadcrumb */}
            <nav className="breadcrumb mb-4 text-sm">
              <a href="/" className="text-gray-400 hover:text-white">اكوام</a>
              <span className="mx-2 text-gray-500">&gt;</span>
              <a href="/movies" className="text-gray-400 hover:text-white">أفلام</a>
              <span className="mx-2 text-gray-500">&gt;</span>
              <span className="text-white">{movie.title}</span>
            </nav>

            <div className="movie-details bg-[#1a1a1a] rounded-lg p-6 border border-[#333]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* صورة الفيلم */}
                <div className="lg:col-span-1">
                                     <div className="movie-poster aspect-[2/3] bg-gray-700 rounded-lg overflow-hidden">
                     <img 
                       src={movie.poster} 
                       alt={movie.title}
                       className="w-full h-full object-cover"
                       onError={(e) => {
                         e.currentTarget.style.display = 'none'
                         const nextSibling = e.currentTarget.nextElementSibling as HTMLElement
                         if (nextSibling) nextSibling.style.display = 'flex'
                       }}
                     />
                     <div className="w-full h-full flex items-center justify-center text-gray-400" style={{display: 'none'}}>
                       ملصق الفيلم
                     </div>
                   </div>
                </div>

                {/* تفاصيل الفيلم */}
                <div className="lg:col-span-2">
                  <h1 className="text-3xl font-bold text-white mb-4">{movie.title}</h1>
                  <h2 className="text-xl text-gray-300 mb-4">{movie.originalTitle}</h2>
                  
                  <div className="movie-info grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="info-item">
                      <span className="label text-gray-400">التقييم:</span>
                      <span className="value text-white mr-2">⭐ {movie.rating}/10</span>
                    </div>
                    <div className="info-item">
                      <span className="label text-gray-400">السنة:</span>
                      <span className="value text-white mr-2">{movie.year}</span>
                    </div>
                    <div className="info-item">
                      <span className="label text-gray-400">المدة:</span>
                      <span className="value text-white mr-2">{movie.duration}</span>
                    </div>
                    <div className="info-item">
                      <span className="label text-gray-400">الجودة:</span>
                      <span className="value bg-[#26baee] text-white px-2 py-1 rounded text-sm mr-2">{movie.quality}</span>
                    </div>
                    <div className="info-item">
                      <span className="label text-gray-400">الحجم:</span>
                      <span className="value text-white mr-2">{movie.size}</span>
                    </div>
                    <div className="info-item">
                      <span className="label text-gray-400">البلد:</span>
                      <span className="value text-white mr-2">{movie.country}</span>
                    </div>
                    <div className="info-item">
                      <span className="label text-gray-400">اللغة:</span>
                      <span className="value text-white mr-2">{movie.language}</span>
                    </div>
                    <div className="info-item">
                      <span className="label text-gray-400">الإخراج:</span>
                      <span className="value text-white mr-2">{movie.director}</span>
                    </div>
                  </div>

                  {/* النوع */}
                  <div className="genre mb-4">
                    <span className="label text-gray-400 mb-2 block">النوع:</span>
                    <div className="genre-tags flex flex-wrap gap-2">
                      {movie.genre.map((g, index) => (
                        <span key={index} className="bg-[#333] text-white px-3 py-1 rounded text-sm">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* الممثلون */}
                  <div className="cast mb-6">
                    <span className="label text-gray-400 mb-2 block">الممثلون:</span>
                    <div className="cast-list text-white">
                      {movie.cast.join(' • ')}
                    </div>
                  </div>

                  {/* أزرار المشاهدة والتحميل */}
                  <div className="action-buttons flex flex-wrap gap-4">
                    <button className="btn-watch bg-[#26baee] hover:bg-[#1fa3d1] text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center">
                      <span className="text-xl ml-2">▶️</span>
                      مشاهدة مباشرة
                    </button>
                    <button className="btn-download bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center">
                      <span className="text-xl ml-2">⬇️</span>
                      تحميل
                    </button>
                    <button className="btn-favorite bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors">
                      <span className="text-xl">❤️</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* القصة */}
              <div className="movie-plot mt-8 pt-6 border-t border-[#333]">
                <h3 className="text-xl font-bold text-white mb-3">القصة</h3>
                <p className="text-gray-300 leading-relaxed">
                  {movie.plot}
                </p>
              </div>
            </div>

            {/* أفلام مشابهة */}
            <div className="related-movies mt-8">
              <h3 className="text-2xl font-bold text-white mb-4">أفلام مشابهة</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[1,2,3,4,5,6].map((item) => (
                  <div key={item} className="movie-card bg-[#2a2a2a] rounded-lg overflow-hidden border border-[#444] hover:border-[#26baee] transition-colors">
                    <div className="aspect-[2/3] bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">ملصق فيلم</span>
                    </div>
                    <div className="p-3">
                      <h4 className="text-white text-sm font-bold line-clamp-2">فيلم مشابه {item}</h4>
                      <div className="text-xs text-gray-400 mt-1">2024</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}