import { NextRequest, NextResponse } from 'next/server'
import { systemMonitor } from '@/lib/monitoring/system-monitor'

// GET - الحصول على الاقتراحات الذكية
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const priority = searchParams.get('priority')
    
    // الحصول على حالة النظام الحالية للحصول على الاقتراحات
    const systemStatus = await systemMonitor.performSystemCheck()
    
    let suggestions = systemStatus.suggestions
    
    // فلترة حسب النوع
    if (type) {
      suggestions = suggestions.filter(s => s.type === type)
    }
    
    // فلترة حسب الأولوية
    if (priority) {
      suggestions = suggestions.filter(s => s.priority === priority)
    }
    
    // ترتيب حسب الأولوية والوقت
    suggestions.sort((a, b) => {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
      if (priorityDiff !== 0) return priorityDiff
      
      return new Date(b.id.split('-')[1]).getTime() - new Date(a.id.split('-')[1]).getTime()
    })
    
    return NextResponse.json({
      success: true,
      data: {
        suggestions,
        count: suggestions.length,
        summary: {
          urgent: suggestions.filter(s => s.priority === 'urgent').length,
          high: suggestions.filter(s => s.priority === 'high').length,
          medium: suggestions.filter(s => s.priority === 'medium').length,
          low: suggestions.filter(s => s.priority === 'low').length,
          autoImplementable: suggestions.filter(s => s.autoImplementable).length,
          implemented: suggestions.filter(s => s.implemented).length
        }
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('خطأ في الحصول على الاقتراحات:', error)
    
    return NextResponse.json({
      success: false,
      error: 'فشل في الحصول على الاقتراحات',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

// POST - تطبيق اقتراح ذكي
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { suggestionId, action } = body
    
    if (!suggestionId) {
      return NextResponse.json({
        success: false,
        error: 'معرف الاقتراح مطلوب',
        timestamp: new Date().toISOString()
      }, { status: 400 })
    }
    
    if (action === 'implement') {
      // تطبيق الاقتراح
      const success = await systemMonitor.implementSuggestion(suggestionId)
      
      if (success) {
        return NextResponse.json({
          success: true,
          message: 'تم تطبيق الاقتراح بنجاح',
          timestamp: new Date().toISOString()
        })
      } else {
        return NextResponse.json({
          success: false,
          error: 'فشل في تطبيق الاقتراح',
          timestamp: new Date().toISOString()
        }, { status: 500 })
      }
    } else if (action === 'dismiss') {
      // رفض الاقتراح (يمكن إضافة منطق لإخفائه)
      return NextResponse.json({
        success: true,
        message: 'تم رفض الاقتراح',
        timestamp: new Date().toISOString()
      })
    } else {
      return NextResponse.json({
        success: false,
        error: 'إجراء غير صالح',
        timestamp: new Date().toISOString()
      }, { status: 400 })
    }
  } catch (error) {
    console.error('خطأ في معالجة الاقتراح:', error)
    
    return NextResponse.json({
      success: false,
      error: 'فشل في معالجة الاقتراح',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}