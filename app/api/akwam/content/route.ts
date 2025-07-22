import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

// قراءة البيانات المستخرجة من ملفات اكوام الأصلية
async function getAkwamContent() {
  try {
    const serverDataDir = path.join(process.cwd(), 'serverdata')
    
    const [moviesData, seriesData] = await Promise.all([
      readFile(path.join(serverDataDir, 'akwam-movies.json'), 'utf8').catch(() => '[]'),
      readFile(path.join(serverDataDir, 'akwam-series.json'), 'utf8').catch(() => '[]')
    ])

    const movies = JSON.parse(moviesData)
    const series = JSON.parse(seriesData)

    return { movies, series }
  } catch (error) {
    console.error('خطأ في قراءة بيانات اكوام:', error)
    return { movies: [], series: [] }
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'all'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''

    const { movies, series } = await getAkwamContent()
    
    let content = []
    
    if (type === 'all' || type === 'movies') {
      const moviesWithType = movies.map(movie => ({ ...movie, type: 'movie' }))
      content = content.concat(moviesWithType)
    }
    
    if (type === 'all' || type === 'series') {
      const seriesWithType = series.map(episode => ({ ...episode, type: 'series' }))
      content = content.concat(seriesWithType)
    }

    // تطبيق البحث
    if (search) {
      content = content.filter(item => 
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase()) ||
        item.seriesTitle?.toLowerCase().includes(search.toLowerCase())
      )
    }

    // ترتيب حسب التقييم
    content.sort((a, b) => (b.rating || 0) - (a.rating || 0))

    // ترقيم الصفحات
    const skip = (page - 1) * limit
    const paginatedContent = content.slice(skip, skip + limit)
    const totalContent = content.length
    const totalPages = Math.ceil(totalContent / limit)

    return NextResponse.json({
      content: paginatedContent,
      pagination: {
        currentPage: page,
        totalPages,
        totalContent,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      stats: {
        totalMovies: movies.length,
        totalEpisodes: series.length,
        avgMovieRating: movies.length > 0 ? 
          (movies.reduce((sum, m) => sum + (m.rating || 0), 0) / movies.length).toFixed(1) : 0,
        avgSeriesRating: series.length > 0 ? 
          (series.reduce((sum, s) => sum + (s.rating || 0), 0) / series.length).toFixed(1) : 0
      },
      source: 'akwam-original-parsed',
      success: true
    })
  } catch (error) {
    console.error('خطأ في API محتوى اكوام:', error)
    return NextResponse.json(
      { error: 'فشل في جلب محتوى اكوام المستخرج', success: false },
      { status: 500 }
    )
  }
}