'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Play, 
  Download, 
  Heart, 
  Share2, 
  Star, 
  Clock, 
  Calendar, 
  Eye, 
  Users, 
  ThumbsUp, 
  MessageCircle,
  ArrowLeft,
  Bookmark,
  Flag,
  Volume2,
  Subtitles,
  Settings,
  Fullscreen,
  Maximize2,
  Minimize2
} from 'lucide-react'

// بيانات تجريبية للفيلم
const movieData = {
  id: 1,
  title: "The Dark Knight",
  originalTitle: "The Dark Knight",
  slug: "the-dark-knight",
  description: "فيلم أكشن وإثارة من بطولة كريستيان بيل في دور باتمان، حيث يواجه أعداء جدد في مدينة جوثام المظلمة. الفيلم من إخراج كريستوفر نولان ويحكي قصة البطل الخارق في مواجهة الفوضى والشر.",
  longDescription: "في مدينة جوثام المظلمة، يواجه باتمان (كريستيان بيل) تحدياً جديداً عندما يظهر جوكر (هيث ليدجر) كقوة فوضوية تهدد النظام الاجتماعي. مع تزايد الفوضى، يجب على باتمان أن يتخذ قرارات صعبة لحماية المدينة التي يحبها. الفيلم يستكشف موضوعات العدالة والشر والخيارات الأخلاقية الصعبة.",
  poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=300&h=450&fit=crop",
  backdrop: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=1920&h=1080&fit=crop",
  rating: 9.0,
  year: 2008,
  duration: 152,
  quality: "4K",
  views: 1500000,
  downloads: 500000,
  likes: 25000,
  dislikes: 500,
  director: "كريستوفر نولان",
  cast: ["كريستيان بيل", "هيث ليدجر", "آرون إيكهارت", "ماغي جيلنهال", "غاري أولدمان"],
  genres: ["Action", "Drama", "Crime", "Thriller"],
  country: "الولايات المتحدة",
  language: "الإنجليزية",
  subtitles: ["العربية", "الإنجليزية", "الفرنسية", "الإسبانية"],
  audio: ["الإنجليزية", "العربية"],
  budget: "$185,000,000",
  boxOffice: "$1,005,000,000",
  awards: ["جائزة الأوسكار لأفضل ممثل مساعد", "جائزة الأوسكار لأفضل مونتاج صوتي"],
  nominations: ["جائزة الأوسكار لأفضل فيلم", "جائزة الأوسكار لأفضل إخراج"],
  trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
  relatedMovies: [
    {
      id: 2,
      title: "Batman Begins",
      poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=200&h=300&fit=crop",
      rating: 8.5,
      year: 2005
    },
    {
      id: 3,
      title: "The Dark Knight Rises",
      poster: "https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=200&h=300&fit=crop",
      rating: 8.4,
      year: 2012
    }
  ],
  reviews: [
    {
      id: 1,
      user: "أحمد محمد",
      rating: 5,
      comment: "فيلم رائع وممتع جداً، التمثيل والإخراج على أعلى مستوى",
      date: "2024-01-15",
      likes: 45
    },
    {
      id: 2,
      user: "سارة أحمد",
      rating: 4,
      comment: "فيلم جيد جداً، لكن كان يمكن أن يكون أفضل",
      date: "2024-01-10",
      likes: 23
    }
  ]
}

export default function MovieDetailPage({ params }: { params: { slug: string } }) {
  const [movie, setMovie] = useState(movieData)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showTrailer, setShowTrailer] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} 
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Poster */}
              <div className="flex-shrink-0">
                <div className="relative w-80 h-120 rounded-xl overflow-hidden shadow-2xl">
                  <img 
                    src={movie.poster} 
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-500 text-black px-2 py-1 rounded text-sm font-bold">
                    {movie.rating}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-white">
                <div className="mb-6">
                  <h1 className="text-4xl lg:text-6xl font-bold mb-4">{movie.title}</h1>
                  <p className="text-xl text-gray-300 mb-6 max-w-3xl">{movie.description}</p>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-lg">{movie.rating}/10</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span>{movie.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span>{formatDuration(movie.duration)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-gray-400" />
                    <span>{formatNumber(movie.views)} مشاهدة</span>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {movie.genres.map((genre, index) => (
                    <span 
                      key={index}
                      className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
                    <Play className="w-5 h-5" />
                    مشاهدة الآن
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
                    <Download className="w-5 h-5" />
                    تحميل
                  </button>
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`px-4 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
                      isLiked 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-800 hover:bg-gray-700 text-white'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    {isLiked ? 'أعجبني' : 'إعجاب'}
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
                    <Share2 className="w-5 h-5" />
                    مشاركة
                  </button>
                  <button 
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`px-4 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
                      isBookmarked 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-800 hover:bg-gray-700 text-white'
                    }`}
                  >
                    <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                    {isBookmarked ? 'محفوظ' : 'حفظ'}
                  </button>
                </div>

                {/* Cast */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">طاقم التمثيل:</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.cast.map((actor, index) => (
                      <span key={index} className="text-gray-300 text-sm">
                        {actor}{index < movie.cast.length - 1 ? '،' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gray-900 rounded-xl p-6">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-800">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2 px-4 font-semibold transition-colors ${
                activeTab === 'overview' 
                  ? 'text-white border-b-2 border-red-600' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              نظرة عامة
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-2 px-4 font-semibold transition-colors ${
                activeTab === 'details' 
                  ? 'text-white border-b-2 border-red-600' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              التفاصيل
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-2 px-4 font-semibold transition-colors ${
                activeTab === 'reviews' 
                  ? 'text-white border-b-2 border-red-600' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              التقييمات
            </button>
            <button
              onClick={() => setActiveTab('related')}
              className={`pb-2 px-4 font-semibold transition-colors ${
                activeTab === 'related' 
                  ? 'text-white border-b-2 border-red-600' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              أفلام مشابهة
            </button>
          </div>

          {/* Tab Content */}
          <div className="text-white">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-2xl font-bold mb-4">القصة</h3>
                <p className="text-gray-300 leading-relaxed mb-6">{movie.longDescription}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">المعلومات الأساسية</h4>
                    <div className="space-y-2 text-gray-300">
                      <div><span className="font-semibold">المخرج:</span> {movie.director}</div>
                      <div><span className="font-semibold">البلد:</span> {movie.country}</div>
                      <div><span className="font-semibold">اللغة:</span> {movie.language}</div>
                      <div><span className="font-semibold">الميزانية:</span> {movie.budget}</div>
                      <div><span className="font-semibold">الإيرادات:</span> {movie.boxOffice}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-3">الترجمات واللغات</h4>
                    <div className="space-y-2 text-gray-300">
                      <div><span className="font-semibold">الترجمات:</span> {movie.subtitles.join('، ')}</div>
                      <div><span className="font-semibold">الصوت:</span> {movie.audio.join('، ')}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div>
                <h3 className="text-2xl font-bold mb-4">تفاصيل الفيلم</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">الجوائز والترشيحات</h4>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-semibold text-green-400 mb-1">الجوائز:</h5>
                        <ul className="text-gray-300 space-y-1">
                          {movie.awards.map((award, index) => (
                            <li key={index}>• {award}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-yellow-400 mb-1">الترشيحات:</h5>
                        <ul className="text-gray-300 space-y-1">
                          {movie.nominations.map((nomination, index) => (
                            <li key={index}>• {nomination}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-3">الإحصائيات</h4>
                    <div className="space-y-2 text-gray-300">
                      <div><span className="font-semibold">المشاهدات:</span> {formatNumber(movie.views)}</div>
                      <div><span className="font-semibold">التحميلات:</span> {formatNumber(movie.downloads)}</div>
                      <div><span className="font-semibold">الإعجابات:</span> {formatNumber(movie.likes)}</div>
                      <div><span className="font-semibold">عدم الإعجاب:</span> {formatNumber(movie.dislikes)}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-2xl font-bold mb-4">تقييمات المشاهدين</h3>
                
                <div className="space-y-6">
                  {movie.reviews.map((review) => (
                    <div key={review.id} className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">
                              {review.user.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold">{review.user}</div>
                            <div className="text-sm text-gray-400">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text-gray-300 mb-3">{review.comment}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <button className="flex items-center gap-1 hover:text-white transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          {review.likes}
                        </button>
                        <button className="flex items-center gap-1 hover:text-white transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          رد
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'related' && (
              <div>
                <h3 className="text-2xl font-bold mb-4">أفلام مشابهة</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {movie.relatedMovies.map((relatedMovie) => (
                    <Link 
                      key={relatedMovie.id}
                      href={`/movie/${relatedMovie.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="group"
                    >
                      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                        <img
                          src={relatedMovie.poster}
                          alt={relatedMovie.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-2 right-2 bg-yellow-500 text-black px-1 py-0.5 rounded text-xs font-bold">
                          {relatedMovie.rating}
                        </div>
                      </div>
                      <div className="mt-2">
                        <h4 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-red-400 transition-colors">
                          {relatedMovie.title}
                        </h4>
                        <p className="text-gray-400 text-xs">{relatedMovie.year}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}