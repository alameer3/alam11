import { NextResponse } from 'next/server'

// إحصائيات تجريبية للموقع
const siteStats = {
  movies: {
    total: 15420,
    thisMonth: 245,
    trending: 28,
    featured: 156
  },
  series: {
    total: 3280,
    thisMonth: 67,
    trending: 15,
    featured: 89
  },
  shows: {
    total: 890,
    thisMonth: 23,
    trending: 8,
    featured: 34
  },
  users: {
    total: 128450,
    active: 23840,
    premium: 5670,
    thisMonth: 3420
  },
  views: {
    total: 45280000,
    thisMonth: 2340000,
    today: 89500,
    thisWeek: 687000
  },
  downloads: {
    total: 12450000,
    thisMonth: 890000,
    today: 23400,
    thisWeek: 234000
  },
  bandwidth: {
    total: '2.4 TB',
    thisMonth: '340 GB',
    today: '12 GB',
    avgPerUser: '2.3 MB'
  },
  performance: {
    uptime: '99.8%',
    avgResponseTime: '245ms',
    errorRate: '0.12%',
    satisfaction: '94.5%'
  }
}

const recentActivity = [
  {
    id: 1,
    type: 'movie',
    action: 'added',
    title: 'The Dark Knight',
    user: 'Admin',
    timestamp: new Date(Date.now() - 30 * 60000).toISOString()
  },
  {
    id: 2,
    type: 'series',
    action: 'updated',
    title: 'Breaking Bad',
    user: 'Moderator',
    timestamp: new Date(Date.now() - 60 * 60000).toISOString()
  },
  {
    id: 3,
    type: 'user',
    action: 'registered',
    title: 'New user registration',
    user: 'System',
    timestamp: new Date(Date.now() - 90 * 60000).toISOString()
  },
  {
    id: 4,
    type: 'movie',
    action: 'featured',
    title: 'Inception',
    user: 'Admin',
    timestamp: new Date(Date.now() - 120 * 60000).toISOString()
  }
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'overview'

    switch (type) {
      case 'overview':
        return NextResponse.json({
          stats: siteStats,
          recentActivity: recentActivity.slice(0, 5),
          success: true
        })

      case 'detailed':
        return NextResponse.json({
          stats: {
            ...siteStats,
            detailedMetrics: {
              topMovies: [
                { title: 'The Dark Knight', views: 1800000, rating: 9.0 },
                { title: 'Inception', views: 1200000, rating: 8.8 },
                { title: 'Interstellar', views: 1500000, rating: 8.6 }
              ],
              topSeries: [
                { title: 'Breaking Bad', views: 2500000, rating: 9.5 },
                { title: 'Game of Thrones', views: 3000000, rating: 9.3 },
                { title: 'Stranger Things', views: 2200000, rating: 8.7 }
              ],
              userEngagement: {
                avgSessionTime: '24 minutes',
                pageViews: 156780,
                bounceRate: '23.4%',
                returnVisitors: '67.8%'
              }
            }
          },
          recentActivity,
          success: true
        })

      case 'activity':
        return NextResponse.json({
          recentActivity,
          success: true
        })

      default:
        return NextResponse.json({
          stats: siteStats,
          success: true
        })
    }
  } catch (error) {
    console.error('Stats API error:', error)
    return NextResponse.json(
      { error: 'فشل في جلب الإحصائيات', success: false },
      { status: 500 }
    )
  }
}