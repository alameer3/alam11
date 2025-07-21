import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    const movie = await prisma.movie.findUnique({
      where: { slug },
      include: {
        section: true,
        categories: {
          include: {
            category: true
          }
        }
      }
    })

    if (!movie) {
      return NextResponse.json(
        { success: false, error: 'لم يتم العثور على الفيلم' },
        { status: 404 }
      )
    }

    // زيادة عدد المشاهدات
    await prisma.movie.update({
      where: { id: movie.id },
      data: { views: { increment: 1 } }
    })

    return NextResponse.json({
      success: true,
      data: movie
    })

  } catch (error) {
    // // console.error('Error fetching movie:', error)
    return NextResponse.json(
      { success: false, error: 'فشل في جلب تفاصيل الفيلم' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const body = await request.json()

    // التحقق من الصلاحيات (يجب أن يكون المستخدم مدير)
    // TODO: إضافة middleware للتحقق من الصلاحيات

    const movie = await prisma.movie.update({
      where: { slug },
      data: {
        title: body.title,
        originalTitle: body.originalTitle,
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
        quality: body.quality,
        size: body.size,
        isActive: body.isActive !== undefined ? body.isActive : true,
        isFeatured: body.isFeatured !== undefined ? body.isFeatured : false,
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
      message: 'تم تحديث الفيلم بنجاح'
    })

  } catch (error) {
    // // console.error('Error updating movie:', error)
    return NextResponse.json(
      { success: false, error: 'فشل في تحديث الفيلم' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    // التحقق من الصلاحيات (يجب أن يكون المستخدم مدير)
    // TODO: إضافة middleware للتحقق من الصلاحيات

    await prisma.movie.delete({
      where: { slug }
    })

    return NextResponse.json({
      success: true,
      message: 'تم حذف الفيلم بنجاح'
    })

  } catch (error) {
    // // console.error('Error deleting movie:', error)
    return NextResponse.json(
      { success: false, error: 'فشل في حذف الفيلم' },
      { status: 500 }
    )
  }
}