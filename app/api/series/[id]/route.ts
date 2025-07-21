import { NextRequest, NextResponse } from 'next/server'
import { SeriesModel } from '@/lib/database/models'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const seriesId = Number(params.id)

    if (!params.id || isNaN(seriesId)) {
      return NextResponse.json(
        { error: 'معرف المسلسل غير صحيح' },
        { status: 400 }
      )
    }

    const series = await SeriesModel.findById(seriesId)
    
    if (!series) {
      return NextResponse.json(
        { error: 'المسلسل غير موجود' },
        { status: 404 }
      )
    }

    return NextResponse.json(series)
  } catch (error) {
    // // console.error('خطأ في جلب المسلسل:', error)
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
    const seriesId = Number(params.id)

    if (!params.id || isNaN(seriesId)) {
      return NextResponse.json(
        { error: 'معرف المسلسل غير صحيح' },
        { status: 400 }
      )
    }

    const body = await request.json()
    
    // التحقق من وجود المسلسل
    const existingSeries = await SeriesModel.findById(seriesId)
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
    // // console.error('خطأ في تحديث المسلسل:', error)
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
    const seriesId = Number(params.id)

    if (!params.id || isNaN(seriesId)) {
      return NextResponse.json(
        { error: 'معرف المسلسل غير صحيح' },
        { status: 400 }
      )
    }

    const body = await request.json()
    
    // التحقق من وجود المسلسل
    const existingSeries = await SeriesModel.findById(seriesId)
    if (!existingSeries) {
      return NextResponse.json(
        { error: 'المسلسل غير موجود' },
        { status: 404 }
      )
    }

    const updatedSeries = await SeriesModel.update(seriesId, body)
    
    return NextResponse.json(updatedSeries)
  } catch (error) {
    // // console.error('خطأ في تعديل المسلسل:', error)
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
    const seriesId = Number(params.id)

    if (!params.id || isNaN(seriesId)) {
      return NextResponse.json(
        { error: 'معرف المسلسل غير صحيح' },
        { status: 400 }
      )
    }
    
    // التحقق من وجود المسلسل
    const existingSeries = await SeriesModel.findById(seriesId)
    if (!existingSeries) {
      return NextResponse.json(
        { error: 'المسلسل غير موجود' },
        { status: 404 }
      )
    }

    const success = await SeriesModel.delete(seriesId)
    
    if (!success) {
      return NextResponse.json(
        { error: 'فشل في حذف المسلسل' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: 'تم حذف المسلسل بنجاح',
      success: true 
    })
  } catch (error) {
    // // console.error('خطأ في حذف المسلسل:', error)
    return NextResponse.json(
      { error: 'خطأ في الخادم' },
      { status: 500 }
    )
  }
}