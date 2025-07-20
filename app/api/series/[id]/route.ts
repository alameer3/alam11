import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/database/connection'
import { SeriesModel } from '@/lib/database/models/series'

// GET /api/series/[id] - جلب مسلسل محدد
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    
    const seriesId = parseInt(params.id)
    if (isNaN(seriesId)) {
      return NextResponse.json(
        { error: 'معرف المسلسل غير صحيح' },
        { status: 400 }
      )
    }

    const series = await SeriesModel.getWithDetails(seriesId)
    
    if (!series) {
      return NextResponse.json(
        { error: 'المسلسل غير موجود' },
        { status: 404 }
      )
    }

    return NextResponse.json(series)
  } catch (error) {
    console.error('Error fetching series:', error)
    return NextResponse.json(
      { error: 'فشل في جلب المسلسل' },
      { status: 500 }
    )
  }
}

// PUT /api/series/[id] - تحديث مسلسل كامل
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    
    const seriesId = parseInt(params.id)
    if (isNaN(seriesId)) {
      return NextResponse.json(
        { error: 'معرف المسلسل غير صحيح' },
        { status: 400 }
      )
    }

    const body = await request.json()
    
    // التحقق من وجود المسلسل
    const existingSeries = await SeriesModel.getWithDetails(seriesId)
    if (!existingSeries) {
      return NextResponse.json(
        { error: 'المسلسل غير موجود' },
        { status: 404 }
      )
    }

    const updatedSeries = await SeriesModel.update(seriesId, body)
    
    if (!updatedSeries) {
      return NextResponse.json(
        { error: 'فشل في تحديث المسلسل' },
        { status: 500 }
      )
    }

    return NextResponse.json(updatedSeries)
  } catch (error) {
    console.error('Error updating series:', error)
    return NextResponse.json(
      { error: 'فشل في تحديث المسلسل' },
      { status: 500 }
    )
  }
}

// PATCH /api/series/[id] - تحديث جزئي للمسلسل
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    
    const seriesId = parseInt(params.id)
    if (isNaN(seriesId)) {
      return NextResponse.json(
        { error: 'معرف المسلسل غير صحيح' },
        { status: 400 }
      )
    }

    const body = await request.json()
    
    // التحقق من وجود المسلسل
    const existingSeries = await SeriesModel.getWithDetails(seriesId)
    if (!existingSeries) {
      return NextResponse.json(
        { error: 'المسلسل غير موجود' },
        { status: 404 }
      )
    }

    const updatedSeries = await SeriesModel.update(seriesId, body)
    
    if (!updatedSeries) {
      return NextResponse.json(
        { error: 'فشل في تحديث المسلسل' },
        { status: 500 }
      )
    }

    return NextResponse.json(updatedSeries)
  } catch (error) {
    console.error('Error updating series:', error)
    return NextResponse.json(
      { error: 'فشل في تحديث المسلسل' },
      { status: 500 }
    )
  }
}

// DELETE /api/series/[id] - حذف مسلسل
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    
    const seriesId = parseInt(params.id)
    if (isNaN(seriesId)) {
      return NextResponse.json(
        { error: 'معرف المسلسل غير صحيح' },
        { status: 400 }
      )
    }

    // التحقق من وجود المسلسل
    const existingSeries = await SeriesModel.getWithDetails(seriesId)
    if (!existingSeries) {
      return NextResponse.json(
        { error: 'المسلسل غير موجود' },
        { status: 404 }
      )
    }

    const deleted = await SeriesModel.delete(seriesId)
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'فشل في حذف المسلسل' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: 'تم حذف المسلسل بنجاح',
      id: seriesId 
    })
  } catch (error) {
    console.error('Error deleting series:', error)
    return NextResponse.json(
      { error: 'فشل في حذف المسلسل' },
      { status: 500 }
    )
  }
}