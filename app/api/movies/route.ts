import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/database/connection'
import { MovieModel } from '@/lib/database/models'

// GET /api/movies - الحصول على قائمة الأفلام
export async function GET(request: NextRequest) {
  try {
    // التأكد من الاتصال بقاعدة البيانات
    await connectToDatabase()
    
    const { searchParams } = new URL(request.url)
    
    // معاملات البحث والفلترة
    const page = parseInt(searchParams.get('page') || '1')
    const perPage = parseInt(searchParams.get('per_page') || '20')
    const section = searchParams.get('section')
    const category = searchParams.get('category')
    const country = searchParams.get('country')
    const language = searchParams.get('language')
    const quality = searchParams.get('quality')
    const year = searchParams.get('year')
    const rating = searchParams.get('rating')
    const sort = searchParams.get('sort') || 'created_at'
    const order = (searchParams.get('order') || 'DESC').toUpperCase() as 'ASC' | 'DESC'
    const search = searchParams.get('search')
    const featured = searchParams.get('featured') === 'true'
    const trending = searchParams.get('trending') === 'true'

    let result

    if (search) {
      // البحث في الأفلام
      result = await MovieModel.searchMovies(search, page, perPage)
    } else if (featured) {
      // الأفلام المميزة
      const movies = await MovieModel.getFeatured(perPage)
      result = {
        data: movies,
        pagination: {
          page: 1,
          perPage,
          total: movies.length,
          totalPages: 1,
          hasNext: false,
          hasPrev: false
        }
      }
    } else if (section) {
      // الأفلام حسب القسم مع الفلاتر
      const filters = {
        category_id: category ? parseInt(category) : undefined,
        country_id: country ? parseInt(country) : undefined,
        language_id: language ? parseInt(language) : undefined,
        quality_id: quality ? parseInt(quality) : undefined,
        year: year ? parseInt(year) : undefined,
        rating_min: rating ? parseFloat(rating) : undefined,
        sort,
        order
      }
      
      result = await MovieModel.findBySection(parseInt(section), page, perPage, filters)
    } else {
      // جميع الأفلام مع الفلاتر
      const conditions: any = {}
      
      if (category) conditions['mc.category_id'] = parseInt(category)
      if (country) conditions.country_id = parseInt(country)
      if (language) conditions.language_id = parseInt(language)
      if (quality) conditions.quality_id = parseInt(quality)
      if (year) conditions['strftime("%Y", release_date)'] = year
      if (rating) conditions['imdb_rating >='] = parseFloat(rating)
      if (trending) conditions.is_trending = true

      result = await MovieModel.paginate(conditions, page, perPage, { orderBy: sort, order })
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      pagination: result.pagination
    })

  } catch (error) {
    console.error('خطأ في API الأفلام:', error)
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

// POST /api/movies - إضافة فيلم جديد
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // التحقق من الحقول المطلوبة
    if (!body.title || !body.slug || !body.section_id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'الحقول المطلوبة مفقودة',
          message: 'العنوان والرابط المختصر ومعرف القسم مطلوبة'
        },
        { status: 400 }
      )
    }

    // إنشاء الفيلم
    const movie = await MovieModel.create(body)
    
    if (movie) {
      return NextResponse.json({
        success: true,
        data: movie,
        message: 'تم إضافة الفيلم بنجاح'
      }, { status: 201 })
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'فشل في إضافة الفيلم'
        },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('خطأ في إضافة فيلم:', error)
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