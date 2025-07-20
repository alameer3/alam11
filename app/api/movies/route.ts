import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const quality = searchParams.get('quality') || ''
    const year = searchParams.get('year') || ''
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const skip = (page - 1) * limit

    // بناء شروط البحث
    const where: any = {
      isActive: true,
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { originalTitle: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { director: { contains: search, mode: 'insensitive' } },
        { cast: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (category) {
      where.categories = {
        some: {
          category: {
            slug: category
          }
        }
      }
    }

    if (quality) {
      where.quality = quality
    }

    if (year) {
      where.year = parseInt(year)
    }

    // الحصول على الأفلام مع التصنيفات
    const movies = await prisma.movie.findMany({
      where,
      include: {
        section: true,
        categories: {
          include: {
            category: true
          }
        }
      },
      orderBy: {
        [sortBy]: sortOrder
      },
      skip,
      take: limit,
    })

    // الحصول على العدد الإجمالي
    const total = await prisma.movie.count({ where })

    // الحصول على إحصائيات إضافية
    const stats = await prisma.movie.aggregate({
      where: { isActive: true },
      _count: { id: true },
      _avg: { rating: true },
      _sum: { views: true, downloads: true, likes: true }
    })

    return NextResponse.json({
      success: true,
      data: movies,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      },
      stats: {
        totalMovies: stats._count.id,
        averageRating: stats._avg.rating,
        totalViews: stats._sum.views,
        totalDownloads: stats._sum.downloads,
        totalLikes: stats._sum.likes
      }
    })

  } catch (error) {
    console.error('Error fetching movies:', error)
    return NextResponse.json(
      { success: false, error: 'فشل في جلب الأفلام' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // التحقق من الصلاحيات (يجب أن يكون المستخدم مدير)
    // TODO: إضافة middleware للتحقق من الصلاحيات
    
    const movie = await prisma.movie.create({
      data: {
        title: body.title,
        originalTitle: body.originalTitle,
        slug: body.slug,
        description: body.description,
        poster: body.poster,
        backdrop: body.backdrop,
        trailer: body.trailer,
        rating: body.rating,
        imdbRating: body.imdbRating,
        year: body.year,
        duration: body.duration,
        releaseDate: body.releaseDate ? new Date(body.releaseDate) : null,
        country: body.country,
        language: body.language,
        budget: body.budget,
        boxOffice: body.boxOffice,
        director: body.director,
        cast: body.cast ? JSON.stringify(body.cast) : null,
        awards: body.awards ? JSON.stringify(body.awards) : null,
        quality: body.quality || 'HD',
        size: body.size,
        isActive: body.isActive !== undefined ? body.isActive : true,
        isFeatured: body.isFeatured !== undefined ? body.isFeatured : false,
        sectionId: body.sectionId,
      },
      include: {
        section: true,
        categories: {
          include: {
            category: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: movie,
      message: 'تم إنشاء الفيلم بنجاح'
    })

  } catch (error) {
    console.error('Error creating movie:', error)
    return NextResponse.json(
      { success: false, error: 'فشل في إنشاء الفيلم' },
      { status: 500 }
    )
  }
}