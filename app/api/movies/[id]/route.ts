import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/database/connection'
import { MovieModel } from '@/lib/database/models/movie'

// GET /api/movies/[id] - جلب فيلم محدد
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    
    const movieId = parseInt(params.id)
    if (isNaN(movieId)) {
      return NextResponse.json(
        { error: 'معرف الفيلم غير صحيح' },
        { status: 400 }
      )
    }

    const movie = await MovieModel.getWithDetails(movieId)
    
    if (!movie) {
      return NextResponse.json(
        { error: 'الفيلم غير موجود' },
        { status: 404 }
      )
    }

    return NextResponse.json(movie)
  } catch (error) {
    console.error('Error fetching movie:', error)
    return NextResponse.json(
      { error: 'فشل في جلب الفيلم' },
      { status: 500 }
    )
  }
}

// PUT /api/movies/[id] - تحديث فيلم كامل
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    
    const movieId = parseInt(params.id)
    if (isNaN(movieId)) {
      return NextResponse.json(
        { error: 'معرف الفيلم غير صحيح' },
        { status: 400 }
      )
    }

    const body = await request.json()
    
    // التحقق من وجود الفيلم
    const existingMovie = await MovieModel.getWithDetails(movieId)
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
    console.error('Error updating movie:', error)
    return NextResponse.json(
      { error: 'فشل في تحديث الفيلم' },
      { status: 500 }
    )
  }
}

// PATCH /api/movies/[id] - تحديث جزئي للفيلم
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    
    const movieId = parseInt(params.id)
    if (isNaN(movieId)) {
      return NextResponse.json(
        { error: 'معرف الفيلم غير صحيح' },
        { status: 400 }
      )
    }

    const body = await request.json()
    
    // التحقق من وجود الفيلم
    const existingMovie = await MovieModel.getWithDetails(movieId)
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
    console.error('Error updating movie:', error)
    return NextResponse.json(
      { error: 'فشل في تحديث الفيلم' },
      { status: 500 }
    )
  }
}

// DELETE /api/movies/[id] - حذف فيلم
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    
    const movieId = parseInt(params.id)
    if (isNaN(movieId)) {
      return NextResponse.json(
        { error: 'معرف الفيلم غير صحيح' },
        { status: 400 }
      )
    }

    // التحقق من وجود الفيلم
    const existingMovie = await MovieModel.getWithDetails(movieId)
    if (!existingMovie) {
      return NextResponse.json(
        { error: 'الفيلم غير موجود' },
        { status: 404 }
      )
    }

    const deleted = await MovieModel.delete(movieId)
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'فشل في حذف الفيلم' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: 'تم حذف الفيلم بنجاح',
      id: movieId 
    })
  } catch (error) {
    console.error('Error deleting movie:', error)
    return NextResponse.json(
      { error: 'فشل في حذف الفيلم' },
      { status: 500 }
    )
  }
}