import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// تشغيل نظام المراقبة مرة واحدة عند بدء التطبيق
let monitoringStarted = false

export function middleware(request: NextRequest) {
  // تشغيل نظام المراقبة عند أول طلب
  if (!monitoringStarted) {
    monitoringStarted = true
    
    // تشغيل نظام المراقبة في الخلفية (فقط على الخادم)
    if (typeof window === 'undefined') {
      startMonitoringSystems()
    }
  }

  return NextResponse.next()
}

async function startMonitoringSystems() {
  try {
    console.log('🚀 بدء تشغيل أنظمة المراقبة الذكية...')
    
    // TODO: تشغيل نظام المراقبة التلقائي
    console.log('📊 نظام المراقبة: قيد التطوير')
    // const { autoMonitor } = await import('@/lib/monitoring')
    // autoMonitor.start(5) // كل 5 دقائق
    
    // TODO: تشغيل نظام الإشعارات التلقائي  
    console.log('🔔 نظام الإشعارات: قيد التطوير')
    // const { autoNotificationManager } = await import('@/lib/notifications')
    // autoNotificationManager.start()
    
    console.log('✅ تم تشغيل أنظمة المراقبة بنجاح')
    
    // TODO: إضافة معالج للإغلاق النظيف
    // process.on('SIGTERM', () => {
    //   console.log('⏹️ إيقاف أنظمة المراقبة...')
    //   autoMonitor.stop()
    //   autoNotificationManager.stop()
    // })
    
    // process.on('SIGINT', () => {
    //   console.log('⏹️ إيقاف أنظمة المراقبة...')
    //   autoMonitor.stop()
    //   autoNotificationManager.stop()
    //   process.exit(0)
    // })
    
  } catch (error) {
    console.error('❌ فشل في تشغيل أنظمة المراقبة:', error)
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}