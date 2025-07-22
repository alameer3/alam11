import { NextResponse } from 'next/server'

// بيانات تجريبية للبحث
const searchData = [
  // أفلام
  {
    id: '1',
    title: 'The Dark Knight',
    titleAr: 'الفارس الأسود',
    type: 'movie',
    year: 2008,
    rating: 9.0,
    poster: '/placeholder-movie.svg',
    description: 'فيلم الأكشن والإثارة الأسطوري',
    genre: ['Action', 'Crime', 'Drama'],
    views: 1800000
  },
  {
    id: '2',
    title: 'Inception',
    titleAr: 'البداية',
    type: 'movie',
    year: 2010,
    rating: 8.8,
    poster: '/placeholder-movie.svg',
    description: 'رحلة فكرية مذهلة داخل الأحلام',
    genre: ['Sci-Fi', 'Action', 'Thriller'],
    views: 1200000
  },
  // مسلسلات
  {
    id: '3',
    title: 'Breaking Bad',
    titleAr: 'كسر سيئ',
    type: 'series',
    year: 2008,
    rating: 9.5,
    poster: '/placeholder-movie.svg',
    description: 'مسلسل دراما إجرامية أسطوري',
    genre: ['Drama', 'Crime', 'Thriller'],
    views: 2500000,
    seasons: 5
  },
  {
    id: '4',
    title: 'Game of Thrones',
    titleAr: 'صراع العروش',
    type: 'series',
    year: 2011,
    rating: 9.3,
    poster: '/placeholder-movie.svg',
    description: 'ملحمة خيالية عن الصراع على العرش',
    genre: ['Drama', 'Action', 'Adventure'],
    views: 3000000,
    seasons: 8
  },
  // برامج
  {
    id: '5',
    title: 'The Tonight Show',
    titleAr: 'برنامج الليلة',
    type: 'show',
    year: 2014,
    rating: 7.5,
    poster: '/placeholder-movie.svg',
    description: 'برنامج حواري ترفيهي',
    genre: ['Talk Show', 'Comedy'],
    views: 800000
  }
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const type = searchParams.get('type') || 'all'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    if (!query.trim()) {
      return NextResponse.json({
        results: [],
        total: 0,
        message: 'يرجى إدخال كلمة البحث',
        success: false
      })
    }

    // تطبيق البحث
    let results = searchData.filter(item => {
      const searchInTitle = item.title.toLowerCase().includes(query.toLowerCase()) ||
                           item.titleAr.includes(query)
      const searchInDescription = item.description.toLowerCase().includes(query.toLowerCase())
      const searchInGenre = item.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))
      
      return searchInTitle || searchInDescription || searchInGenre
    })

    // تطبيق مرشح النوع
    if (type !== 'all') {
      results = results.filter(item => item.type === type)
    }

    // ترقيم الصفحات
    const skip = (page - 1) * limit
    const paginatedResults = results.slice(skip, skip + limit)
    
    return NextResponse.json({
      results: paginatedResults,
      total: results.length,
      query,
      type,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(results.length / limit),
        hasNextPage: page < Math.ceil(results.length / limit),
        hasPrevPage: page > 1
      },
      success: true
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'فشل في البحث', success: false },
      { status: 500 }
    )
  }
}