import { NextRequest, NextResponse } from 'next/server'
import { systemMonitor } from '@/lib/monitoring/system-monitor'
import { healthChecks } from '@/lib/monitoring/health-checks'

// GET - الحصول على حالة النظام الحالية
export async function GET(request: NextRequest) {
  try {
    // تشغيل فحص شامل
    const systemStatus = await systemMonitor.performSystemCheck()
    
    return NextResponse.json({
      success: true,
      data: systemStatus,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('خطأ في الحصول على حالة النظام:', error)
    
    // إضافة الخطأ إلى نظام المراقبة
    systemMonitor.addErrorReport({
      component: 'monitoring-api',
      severity: 'high',
      message: 'فشل في الحصول على حالة النظام',
      stackTrace: error instanceof Error ? error.stack : undefined,
      url: request.url
    })
    
    return NextResponse.json({
      success: false,
      error: 'فشل في الحصول على حالة النظام',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

// POST - تشغيل فحص فوري
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { components, securityCheck = false } = body
    
    let results: any = {}
    
    if (components && Array.isArray(components)) {
      // فحص مكونات محددة
      for (const component of components) {
        switch (component) {
          case 'database':
            results.database = await healthChecks.checkDatabase()
            break
          case 'api':
            results.api = await healthChecks.checkAPI()
            break
          case 'frontend':
            results.frontend = await healthChecks.checkFrontend()
            break
          case 'cdn':
            results.cdn = await healthChecks.checkCDN()
            break
          case 'streaming':
            results.streaming = await healthChecks.checkStreaming()
            break
        }
      }
    } else {
      // فحص جميع المكونات
      results = await healthChecks.performAllChecks()
    }
    
    // فحص أمني إضافي إذا طُلب
    if (securityCheck) {
      results.security = await healthChecks.performSecurityCheck()
    }
    
    return NextResponse.json({
      success: true,
      data: results,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('خطأ في تنفيذ الفحص:', error)
    
    systemMonitor.addErrorReport({
      component: 'monitoring-api',
      severity: 'medium',
      message: 'فشل في تنفيذ فحص المكونات',
      stackTrace: error instanceof Error ? error.stack : undefined,
      url: request.url
    })
    
    return NextResponse.json({
      success: false,
      error: 'فشل في تنفيذ الفحص',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}