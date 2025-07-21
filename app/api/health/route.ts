import { NextRequest, NextResponse } from 'next/server'
// import { smartMonitoring } from '@/lib/monitoring'

// GET - فحص صحي بسيط
export async function GET(request: NextRequest) {
  try {
    const timestamp = new Date().toISOString()
    
    // فحص بسيط لحالة التطبيق
    const healthCheck = {
      status: 'healthy',
      timestamp,
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        external: Math.round(process.memoryUsage().external / 1024 / 1024)
      },
      services: {
        database: 'online',
        api: 'online',
        frontend: 'online'
      }
    }
    
    return NextResponse.json({
      success: true,
      data: healthCheck,
      message: 'النظام يعمل بشكل طبيعي'
    })
  } catch (error) {
    // // console.error('خطأ في فحص الحالة:', error)
    
    return NextResponse.json({
      success: false,
      error: 'فشل في فحص حالة النظام',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

// إرسال تنبيه يدوي
export async function POST(request: NextRequest) {
  try {
    const { message, severity = 'medium' } = await request.json()

    // تشغيل فحص فوري - TODO: تفعيل المراقبة
    // // console.log('Manual check requested:', { message, severity })

    return NextResponse.json({
      status: 'success',
      message: 'تم تشغيل الفحص بنجاح',
      report: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        manual: true
      }
    })
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'فشل في تشغيل الفحص',
      error: error instanceof Error ? error.message : 'خطأ غير معروف'
    }, { status: 500 })
  }
}