import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// البيانات التجريبية للأفلام
const sampleMovies = [
  {
    title: 'The Dark Knight',
    titleAr: 'الفارس الأسود',
    slug: 'the-dark-knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    descriptionAr: 'عندما يعيث الجوكر فساداً في مدينة جوثام، يجب على باتمان أن يواجه أحد أعظم الاختبارات النفسية والجسدية لقدرته على محاربة الظلم.',
    poster: '/placeholder-movie.svg',
    backdrop: '/placeholder-hero.svg',
    rating: 9.0,
    imdbRating: 9.0,
    year: 2008,
    duration: 152,
    quality: '4K',
    status: 'published',
    featured: true,
    trending: true,
    views: 1800000,
    downloads: 500000,
    likes: 25000
  },
  {
    title: 'Inception',
    titleAr: 'البداية',
    slug: 'inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    descriptionAr: 'لص يسرق أسرار الشركات من خلال تقنية مشاركة الأحلام، يُكلف بمهمة معاكسة وهي زرع فكرة في عقل رئيس تنفيذي.',
    poster: '/placeholder-movie.svg',
    backdrop: '/placeholder-hero.svg',
    rating: 8.8,
    imdbRating: 8.8,
    year: 2010,
    duration: 148,
    quality: 'HD',
    status: 'published',
    featured: true,
    trending: false,
    views: 1200000,
    downloads: 400000,
    likes: 20000
  },
  {
    title: 'Interstellar',
    titleAr: 'بين النجوم',
    slug: 'interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    descriptionAr: 'فريق من المستكشفين يسافر عبر ثقب دودي في الفضاء في محاولة لضمان بقاء البشرية.',
    poster: '/placeholder-movie.svg',
    backdrop: '/placeholder-hero.svg',
    rating: 8.6,
    imdbRating: 8.6,
    year: 2014,
    duration: 169,
    quality: '4K',
    status: 'published',
    featured: true,
    trending: true,
    views: 1500000,
    downloads: 600000,
    likes: 30000
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

    // حساب البداية والنهاية للصفحة
    const skip = (page - 1) * limit
    
    // تطبيق المرشحات
    let filteredMovies = [...sampleMovies]
    
    if (featured) {
      filteredMovies = filteredMovies.filter(movie => movie.featured)
    }
    
    if (trending) {
      filteredMovies = filteredMovies.filter(movie => movie.trending)
    }

    // ترقيم الصفحات
    const movies = filteredMovies.slice(skip, skip + limit)
    const totalMovies = filteredMovies.length
    const totalPages = Math.ceil(totalMovies / limit)
    
    return NextResponse.json({
      movies,
      pagination: {
        currentPage: page,
        totalPages,
        totalMovies,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      success: true
    })
  } catch (error) {
    console.error('Error fetching movies:', error)
    return NextResponse.json(
      { error: 'فشل في جلب الأفلام' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // إنشاء فيلم جديد (تجريبي)
    const newMovie = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      movie: newMovie,
      message: 'تم إنشاء الفيلم بنجاح',
      success: true
    })
  } catch (error) {
    console.error('Error creating movie:', error)
    return NextResponse.json(
      { error: 'فشل في إنشاء الفيلم' },
      { status: 500 }
    )
  }
}