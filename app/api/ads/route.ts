import { NextRequest, NextResponse } from 'next/server'

export interface Ad {
  id: string
  title: string
  type: 'banner' | 'popup' | 'video' | 'native'
  position: 'header' | 'sidebar' | 'footer' | 'content' | 'popup'
  content: string
  url?: string
  imageUrl?: string
  videoUrl?: string
  startDate: string
  endDate: string
  isActive: boolean
  targetAudience: string[]
  clickCount: number
  impressionCount: number
  budget: number
  spent: number
  createdAt: string
  updatedAt: string
}

// Mock data
const mockAds: Ad[] = [
  {
    id: '1',
    title: 'إعلان فيلم جديد',
    type: 'banner',
    position: 'header',
    content: 'شاهد أحدث الأفلام المثيرة',
    url: '/movies/new-movie',
    imageUrl: '/ads/banner1.jpg',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    isActive: true,
    targetAudience: ['action', 'drama'],
    clickCount: 1250,
    impressionCount: 45000,
    budget: 5000,
    spent: 3200,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    title: 'إعلان مسلسل كوميدي',
    type: 'popup',
    position: 'popup',
    content: 'استمتع بأفضل المسلسلات الكوميدية',
    url: '/series/comedy-series',
    imageUrl: '/ads/popup1.jpg',
    startDate: '2024-02-01',
    endDate: '2024-11-30',
    isActive: true,
    targetAudience: ['comedy', 'family'],
    clickCount: 890,
    impressionCount: 32000,
    budget: 3000,
    spent: 1800,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-10T00:00:00Z'
  },
  {
    id: '3',
    title: 'إعلان اشتراك مميز',
    type: 'native',
    position: 'content',
    content: 'احصل على اشتراك مميز بسعر مخفض',
    url: '/subscription',
    startDate: '2024-03-01',
    endDate: '2024-06-30',
    isActive: false,
    targetAudience: ['premium'],
    clickCount: 450,
    impressionCount: 18000,
    budget: 2000,
    spent: 1200,
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-05T00:00:00Z'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const type = searchParams.get('type') || ''
    const position = searchParams.get('position') || ''
    const status = searchParams.get('status') || ''

    let filteredAds = [...mockAds]

    // Search filter
    if (search) {
      filteredAds = filteredAds.filter(ad =>
        ad.title.toLowerCase().includes(search.toLowerCase()) ||
        ad.content.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Type filter
    if (type) {
      filteredAds = filteredAds.filter(ad => ad.type === type)
    }

    // Position filter
    if (position) {
      filteredAds = filteredAds.filter(ad => ad.position === position)
    }

    // Status filter
    if (status) {
      const isActive = status === 'active'
      filteredAds = filteredAds.filter(ad => ad.isActive === isActive)
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedAds = filteredAds.slice(startIndex, endIndex)

    const totalPages = Math.ceil(filteredAds.length / limit)

    return NextResponse.json({
      ads: paginatedAds,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: filteredAds.length,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    // // // console.error('Error fetching ads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ads' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const newAd: Ad = {
      id: (mockAds.length + 1).toString(),
      title: data.title,
      type: data.type,
      position: data.position,
      content: data.content,
      url: data.url,
      imageUrl: data.imageUrl,
      videoUrl: data.videoUrl,
      startDate: data.startDate,
      endDate: data.endDate,
      isActive: data.isActive || true,
      targetAudience: data.targetAudience || [],
      clickCount: 0,
      impressionCount: 0,
      budget: data.budget || 0,
      spent: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    mockAds.push(newAd)

    return NextResponse.json({ 
      message: 'Ad created successfully',
      ad: newAd 
    }, { status: 201 })
  } catch (error) {
    // // // console.error('Error creating ad:', error)
    return NextResponse.json(
      { error: 'Failed to create ad' },
      { status: 500 }
    )
  }
}