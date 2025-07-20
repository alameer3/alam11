import { NextRequest, NextResponse } from 'next/server'
import { MovieModel } from '@/lib/database/models'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const movieId = Number(params.id)

    if (!params.id || isNaN(movieId)) {
      return NextResponse.json(
        { error: 'معرف الفيلم غير صحيح' },
        { status: 400 }
      )
    }

    const movie = await MovieModel.findById(movieId)
    
    if (!movie) {
      return NextResponse.json(
        { error: 'الفيلم غير موجود' },
        { status: 404 }
      )
    }

    return NextResponse.json(movie)
  } catch (error) {
    console.error('خطأ في جلب الفيلم:', error)
    return NextResponse.json(
      { error: 'خطأ في الخادم' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const movieId = Number(params.id)

    if (!params.id || isNaN(movieId)) {
      return NextResponse.json(
        { error: 'معرف الفيلم غير صحيح' },
        { status: 400 }
      )
    }

    const body = await request.json()
    
    // التحقق من وجود الفيلم
    const existingMovie = await MovieModel.findById(movieId)
    if (!existingMovie) {
      return NextResponse.json(
        { error: 'الفيلم غير موجود' },
        { status: 404 }
      )
    }

    const updatedMovie = await MovieModel.update(movieId, body)
    
    if (!updatedMovie) {
      return NextResponse.json(
        { error: 'فشل في تحديث الفيلم' },
        { status: 500 }
      )
    }

    return NextResponse.json(updatedMovie)
  } catch (error) {
    console.error('خطأ في تحديث الفيلم:', error)
    return NextResponse.json(
      { error: 'خطأ في الخادم' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const movieId = Number(params.id)

    if (!params.id || isNaN(movieId)) {
      return NextResponse.json(
        { error: 'معرف الفيلم غير صحيح' },
        { status: 400 }
      )
    }

    const body = await request.json()
    
    // التحقق من وجود الفيلم
    const existingMovie = await MovieModel.findById(movieId)
    if (!existingMovie) {
      return NextResponse.json(
        { error: 'الفيلم غير موجود' },
        { status: 404 }
      )
    }

    const updatedMovie = await MovieModel.update(movieId, body)
    
    return NextResponse.json(updatedMovie)
  } catch (error) {
    console.error('خطأ في تعديل الفيلم:', error)
    return NextResponse.json(
      { error: 'خطأ في الخادم' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const movieId = Number(params.id)

    if (!params.id || isNaN(movieId)) {
      return NextResponse.json(
        { error: 'معرف الفيلم غير صحيح' },
        { status: 400 }
      )
    }
    
    // التحقق من وجود الفيلم
    const existingMovie = await MovieModel.findById(movieId)
    if (!existingMovie) {
      return NextResponse.json(
        { error: 'الفيلم غير موجود' },
        { status: 404 }
      )
    }

    const success = await MovieModel.delete(movieId)
    
    if (!success) {
      return NextResponse.json(
        { error: 'فشل في حذف الفيلم' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: 'تم حذف الفيلم بنجاح',
      success: true 
    })
  } catch (error) {
    console.error('خطأ في حذف الفيلم:', error)
    return NextResponse.json(
      { error: 'خطأ في الخادم' },
      { status: 500 }
    )
  }
}