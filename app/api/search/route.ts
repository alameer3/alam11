import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/database/connection'
import { SearchModel } from '@/lib/database/models'

// GET /api/search - البحث العام
export async function GET(request: NextRequest) {
  try {
    // التأكد من الاتصال بقاعدة البيانات
    await connectToDatabase()
    
    const { searchParams } = new URL(request.url)
    
    const query = searchParams.get('q')
    const limit = parseInt(searchParams.get('limit') || '20')
    const type = searchParams.get('type') // movies, series, people, all

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'استعلام البحث مطلوب',
          message: 'يجب أن يكون طول البحث على الأقل حرفين'
        },
        { status: 400 }
      )
    }

    let results

    if (type === 'all' || !type) {
      // البحث الشامل
      results = await SearchModel.globalSearch(query, limit)
    } else {
      // البحث المحدد
      switch (type) {
        case 'movies':
          const { MovieModel } = await import('@/lib/database/models')
          const movieResults = await MovieModel.searchMovies(query, 1, limit)
          results = { movies: movieResults.data, series: [], people: [] }
          break
          
        case 'series':
          const { SeriesModel } = await import('@/lib/database/models')
          const seriesResults = await SeriesModel.searchSeries(query, 1, limit)
          results = { movies: [], series: seriesResults.data, people: [] }
          break
          
        case 'people':
          const { PersonModel } = await import('@/lib/database/models')
          const people = await PersonModel.searchPeople(query, limit)
          results = { movies: [], series: [], people }
          break
          
        default:
          return NextResponse.json(
            { 
              success: false, 
              error: 'نوع البحث غير صحيح',
              message: 'الأنواع المدعومة: movies, series, people, all'
            },
            { status: 400 }
          )
      }
    }

    // حساب إجمالي النتائج
    const totalResults = results.movies.length + results.series.length + results.people.length

    return NextResponse.json({
      success: true,
      query,
      total_results: totalResults,
      results,
      suggestions: totalResults === 0 ? await getSearchSuggestions(query) : []
    })

  } catch (error) {
    console.error('خطأ في البحث:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'خطأ في الخادم الداخلي',
        message: error instanceof Error ? error.message : 'خطأ غير معروف'
      },
      { status: 500 }
    )
  }
}

// اقتراحات البحث - دالة مساعدة داخلية
async function getSearchSuggestions(query: string): Promise<string[]> {
  try {
    // يمكن تحسين هذا لاحقاً بناءً على تاريخ البحث والشعبية
    const popularSearches = await SearchModel.getPopularSearches(10)
    
    // إرجاع اقتراحات تحتوي على النص المبحوث عنه
    return popularSearches.filter(search => 
      search.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5)
    
  } catch (error) {
    console.error('خطأ في الحصول على اقتراحات البحث:', error)
    return []
  }
}