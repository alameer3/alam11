import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// البيانات التجريبية للمسلسلات
const sampleSeries = [
  {
    title: 'Breaking Bad',
    titleAr: 'كسر سيئ',
    slug: 'breaking-bad',
    description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.',
    descriptionAr: 'معلم كيمياء في المدرسة الثانوية يُشخص بسرطان الرئة، فيتجه لتصنيع وبيع المخدرات لضمان مستقبل عائلته.',
    poster: '/placeholder-movie.svg',
    backdrop: '/placeholder-hero.svg',
    rating: 9.5,
    imdbRating: 9.5,
    year: 2008,
    status: 'published',
    featured: true,
    trending: true,
    views: 2500000,
    downloads: 800000,
    likes: 45000,
    seasons: 5,
    episodes: 62
  },
  {
    title: 'Game of Thrones',
    titleAr: 'صراع العروش',
    slug: 'game-of-thrones',
    description: 'Nine noble families fight for control over the mythical lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
    descriptionAr: 'تسع عائلات نبيلة تقاتل للسيطرة على أراضي وستروس الأسطورية، بينما يعود عدو قديم بعد خمود دام آلاف السنين.',
    poster: '/placeholder-movie.svg',
    backdrop: '/placeholder-hero.svg',
    rating: 9.3,
    imdbRating: 9.3,
    year: 2011,
    status: 'published',
    featured: true,
    trending: false,
    views: 3000000,
    downloads: 1200000,
    likes: 60000,
    seasons: 8,
    episodes: 73
  },
  {
    title: 'Stranger Things',
    titleAr: 'أشياء غريبة',
    slug: 'stranger-things',
    description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.',
    descriptionAr: 'عندما يختفي صبي صغير، يجب على والدته ورئيس الشرطة وأصدقائه مواجهة قوى خارقة مرعبة لاستعادته.',
    poster: '/placeholder-movie.svg',
    backdrop: '/placeholder-hero.svg',
    rating: 8.7,
    imdbRating: 8.7,
    year: 2016,
    status: 'published',
    featured: true,
    trending: true,
    views: 2200000,
    downloads: 900000,
    likes: 38000,
    seasons: 4,
    episodes: 34
  }
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured') === 'true'
    const trending = searchParams.get('trending') === 'true'

    const skip = (page - 1) * limit
    
    let filteredSeries = [...sampleSeries]
    
    if (featured) {
      filteredSeries = filteredSeries.filter(series => series.featured)
    }
    
    if (trending) {
      filteredSeries = filteredSeries.filter(series => series.trending)
    }

    const series = filteredSeries.slice(skip, skip + limit)
    const totalSeries = filteredSeries.length
    const totalPages = Math.ceil(totalSeries / limit)
    
    return NextResponse.json({
      series,
      pagination: {
        currentPage: page,
        totalPages,
        totalSeries,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      success: true
    })
  } catch (error) {
    console.error('Error fetching series:', error)
    return NextResponse.json(
      { error: 'فشل في جلب المسلسلات' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const newSeries = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      series: newSeries,
      message: 'تم إنشاء المسلسل بنجاح',
      success: true
    })
  } catch (error) {
    console.error('Error creating series:', error)
    return NextResponse.json(
      { error: 'فشل في إنشاء المسلسل' },
      { status: 500 }
    )
  }
}