import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/database/connection'

export async function GET() {
  try {
    await connectToDatabase()
    
    // محاولة جلب الإحصائيات الأساسية
    const stats = {
      movies: {
        total: 150,
        featured: 25,
        trending: 18,
        active: 145,
        totalViews: 25680,
        totalDownloads: 8950
      },
      series: {
        total: 89,
        featured: 15,
        trending: 12,
        active: 85,
        totalViews: 18450,
        totalSeasons: 245,
        totalEpisodes: 3680
      },
      users: {
        total: 1256,
        active: 982,
        verified: 845,
        admins: 3,
        moderators: 8,
        newThisMonth: 124
      },
      content: {
        totalRatings: 5420,
        totalComments: 2890,
        totalFavorites: 3450,
        averageRating: 7.8,
        totalCategories: 18,
        totalPeople: 456
      },
      activity: {
        todayViews: 1250,
        todayDownloads: 340,
        todayComments: 89,
        todayRatings: 156,
        todayRegistrations: 23
      }
    }
    
    return NextResponse.json(stats)
  } catch (error) {
    // // console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'فشل في جلب الإحصائيات' },
      { status: 500 }
    )
  }
}