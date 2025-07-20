import { NextRequest, NextResponse } from 'next/server'

// محاكاة قاعدة البيانات
const mockData = [
  {
    id: 1,
    title: "فيلم الإثارة الجديد",
    poster: "/api/placeholder/200/300",
    year: 2024,
    rating: 8.7,
    type: "movie",
    genre: ["إثارة", "دراما"],
    description: "فيلم مثير يحكي قصة..."
  },
  {
    id: 2,
    title: "مسلسل الجريمة",
    poster: "/api/placeholder/200/300",
    year: 2024,
    rating: 9.1,
    type: "series",
    genre: ["جريمة", "دراما"],
    description: "مسلسل بوليسي مشوق..."
  },
  {
    id: 3,
    title: "برنامج الحوار",
    poster: "/api/placeholder/200/300",
    year: 2024,
    rating: 8.3,
    type: "show",
    genre: ["حوار", "ثقافة"],
    description: "برنامج حواري يناقش..."
  },
  {
    id: 4,
    title: "فيلم الكوميديا",
    poster: "/api/placeholder/200/300",
    year: 2023,
    rating: 7.9,
    type: "movie",
    genre: ["كوميديا"],
    description: "فيلم كوميدي خفيف..."
  },
  {
    id: 5,
    title: "مسلسل الخيال العلمي",
    poster: "/api/placeholder/200/300",
    year: 2024,
    rating: 8.8,
    type: "series",
    genre: ["خيال علمي", "إثارة"],
    description: "مسلسل خيال علمي..."
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase() || ''
  const type = searchParams.get('type') || 'all'
  const limit = parseInt(searchParams.get('limit') || '10')

  try {
    if (!query || query.length < 2) {
      return NextResponse.json({
        success: true,
        results: [],
        suggestions: [
          "أفلام 2024",
          "مسلسلات عربية",
          "أفلام إثارة",
          "برامج حوارية",
          "مسلسلات كوميدية"
        ],
        total: 0
      })
    }

    // فلترة النتائج بناءً على البحث
    let filteredResults = mockData.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(query)
      const genreMatch = item.genre.some(g => g.toLowerCase().includes(query))
      const descriptionMatch = item.description.toLowerCase().includes(query)
      
      return titleMatch || genreMatch || descriptionMatch
    })

    // فلترة بناءً على النوع
    if (type !== 'all') {
      filteredResults = filteredResults.filter(item => item.type === type)
    }

    // ترتيب النتائج (الأعلى تقييماً أولاً)
    filteredResults.sort((a, b) => b.rating - a.rating)

    // تحديد عدد النتائج
    const results = filteredResults.slice(0, limit)

    // اقتراحات البحث الذكية
    const suggestions = [
      ...new Set([
        ...mockData
          .filter(item => item.title.toLowerCase().includes(query))
          .map(item => item.title),
        ...mockData
          .flatMap(item => item.genre)
          .filter(genre => genre.toLowerCase().includes(query)),
        `${query} 2024`,
        `أفلام ${query}`,
        `مسلسلات ${query}`
      ])
    ].slice(0, 5)

    return NextResponse.json({
      success: true,
      results: results.map(item => ({
        id: item.id,
        title: item.title,
        poster: item.poster,
        year: item.year,
        rating: item.rating,
        type: item.type === 'movie' ? 'فيلم' : 
              item.type === 'series' ? 'مسلسل' : 'برنامج',
        genres: item.genre,
        url: `/${item.type}/${item.id}`
      })),
      suggestions,
      total: filteredResults.length,
      query,
      searchTime: Date.now()
    })

  } catch (error) {
    console.error('Search API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'خطأ في البحث',
      results: [],
      suggestions: [],
      total: 0
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, filters, sort } = body

    // معالجة البحث المتقدم مع الفلاتر
    let results = mockData

    // تطبيق الفلاتر
    if (filters?.type && filters.type !== 'all') {
      results = results.filter(item => item.type === filters.type)
    }

    if (filters?.genre) {
      results = results.filter(item => 
        item.genre.some(g => g.toLowerCase().includes(filters.genre.toLowerCase()))
      )
    }

    if (filters?.year) {
      results = results.filter(item => item.year === parseInt(filters.year))
    }

    if (filters?.rating) {
      results = results.filter(item => item.rating >= parseFloat(filters.rating))
    }

    // البحث النصي
    if (query && query.length >= 2) {
      results = results.filter(item => {
        return item.title.toLowerCase().includes(query.toLowerCase()) ||
               item.description.toLowerCase().includes(query.toLowerCase()) ||
               item.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))
      })
    }

    // ترتيب النتائج
    switch (sort) {
      case 'rating':
        results.sort((a, b) => b.rating - a.rating)
        break
      case 'year':
        results.sort((a, b) => b.year - a.year)
        break
      case 'title':
        results.sort((a, b) => a.title.localeCompare(b.title, 'ar'))
        break
      default:
        // ترتيب افتراضي: الأحدث ثم الأعلى تقييماً
        results.sort((a, b) => {
          if (a.year !== b.year) return b.year - a.year
          return b.rating - a.rating
        })
    }

    return NextResponse.json({
      success: true,
      results: results.map(item => ({
        id: item.id,
        title: item.title,
        poster: item.poster,
        year: item.year,
        rating: item.rating,
        type: item.type === 'movie' ? 'فيلم' : 
              item.type === 'series' ? 'مسلسل' : 'برنامج',
        genres: item.genre,
        url: `/${item.type}/${item.id}`
      })),
      total: results.length,
      applied_filters: filters,
      sort_by: sort
    })

  } catch (error) {
    console.error('Advanced Search API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'خطأ في البحث المتقدم'
    }, { status: 500 })
  }
}