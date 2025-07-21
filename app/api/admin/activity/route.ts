import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/database/connection'

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()
    
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    
    // بيانات تجريبية للنشاطات الحديثة
    const activities = [
      {
        id: 1,
        type: 'view',
        user: 'أحمد محمد',
        content: 'فيلم Spider-Man: No Way Home',
        timestamp: new Date(new Date("2025-07-21T14:00:00Z").getTime() - 5 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        type: 'rating',
        user: 'فاطمة علي',
        content: 'مسلسل The Crown',
        timestamp: new Date(new Date("2025-07-21T14:00:00Z").getTime() - 12 * 60 * 1000).toISOString(),
        rating: 9
      },
      {
        id: 3,
        type: 'comment',
        user: 'محمد عبدالله',
        content: 'فيلم Dune',
        timestamp: new Date(new Date("2025-07-21T14:00:00Z").getTime() - 18 * 60 * 1000).toISOString()
      },
      {
        id: 4,
        type: 'favorite',
        user: 'نور الدين',
        content: 'مسلسل Stranger Things',
        timestamp: new Date(new Date("2025-07-21T14:00:00Z").getTime() - 25 * 60 * 1000).toISOString()
      },
      {
        id: 5,
        type: 'registration',
        user: 'سارة أحمد',
        timestamp: new Date(new Date("2025-07-21T14:00:00Z").getTime() - 35 * 60 * 1000).toISOString()
      },
      {
        id: 6,
        type: 'view',
        user: 'خالد عبدالرحمن',
        content: 'فيلم Top Gun: Maverick',
        timestamp: new Date(new Date("2025-07-21T14:00:00Z").getTime() - 45 * 60 * 1000).toISOString()
      },
      {
        id: 7,
        type: 'rating',
        user: 'مريم حسن',
        content: 'مسلسل House of the Dragon',
        timestamp: new Date(new Date("2025-07-21T14:00:00Z").getTime() - 1 * 60 * 60 * 1000).toISOString(),
        rating: 8
      },
      {
        id: 8,
        type: 'comment',
        user: 'عبدالعزيز فهد',
        content: 'فيلم Avatar: The Way of Water',
        timestamp: new Date(new Date("2025-07-21T14:00:00Z").getTime() - 1.5 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 9,
        type: 'favorite',
        user: 'أميرة محمود',
        content: 'مسلسل Wednesday',
        timestamp: new Date(new Date("2025-07-21T14:00:00Z").getTime() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 10,
        type: 'view',
        user: 'ياسر العثمان',
        content: 'فيلم Black Panther: Wakanda Forever',
        timestamp: new Date(new Date("2025-07-21T14:00:00Z").getTime() - 2.5 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 11,
        type: 'registration',
        user: 'ليلى عبدالله',
        timestamp: new Date(new Date("2025-07-21T14:00:00Z").getTime() - 3 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 12,
        type: 'rating',
        user: 'حسام الدين',
        content: 'فيلم The Batman',
        timestamp: new Date(new Date("2025-07-21T14:00:00Z").getTime() - 4 * 60 * 60 * 1000).toISOString(),
        rating: 7
      },
      {
        id: 13,
        type: 'comment',
        user: 'رنا سعيد',
        content: 'مسلسل The Last of Us',
        timestamp: new Date(new Date("2025-07-21T14:00:00Z").getTime() - 5 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 14,
        type: 'favorite',
        user: 'طارق الشامي',
        content: 'فيلم Everything Everywhere All at Once',
        timestamp: new Date(new Date("2025-07-21T14:00:00Z").getTime() - 6 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 15,
        type: 'view',
        user: 'هند العمري',
        content: 'مسلسل The Bear',
        timestamp: new Date(new Date("2025-07-21T14:00:00Z").getTime() - 7 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 16,
        type: 'registration',
        user: 'عمر الحربي',
        timestamp: new Date(new Date("2025-07-21T14:00:00Z").getTime() - 8 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 17,
        type: 'rating',
        user: 'سلمى كمال',
        content: 'مسلسل Euphoria',
        timestamp: new Date(new Date("2025-07-21T14:00:00Z").getTime() - 9 * 60 * 60 * 1000).toISOString(),
        rating: 6
      },
      {
        id: 18,
        type: 'comment',
        user: 'راشد المطيري',
        content: 'فيلم The Menu',
        timestamp: new Date(new Date("2025-07-21T14:00:00Z").getTime() - 10 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 19,
        type: 'favorite',
        user: 'دانا عبدالوهاب',
        content: 'مسلسل Abbott Elementary',
        timestamp: new Date(new Date("2025-07-21T14:00:00Z").getTime() - 11 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 20,
        type: 'view',
        user: 'معاذ الصالح',
        content: 'فيلم Glass Onion',
        timestamp: new Date(new Date("2025-07-21T14:00:00Z").getTime() - 12 * 60 * 60 * 1000).toISOString()
      }
    ]
    
    // إرجاع النشاطات مع التحديد بحسب limit
    const limitedActivities = activities.slice(0, limit)
    
    return NextResponse.json(limitedActivities)
  } catch (error) {
    // console.error('Error fetching activities:', error)
    return NextResponse.json(
      { error: 'فشل في جلب النشاطات' },
      { status: 500 }
    )
  }
}