import { NextRequest, NextResponse } from 'next/server'

// This would normally come from a database
const mockAds = [
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
  }
]

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ad = mockAds.find(a => a.id === params.id)
    
    if (!ad) {
      return NextResponse.json(
        { error: 'Ad not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ ad })
  } catch (error) {
    console.error('Error fetching ad:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ad' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const adIndex = mockAds.findIndex(a => a.id === params.id)
    
    if (adIndex === -1) {
      return NextResponse.json(
        { error: 'Ad not found' },
        { status: 404 }
      )
    }

    const updatedAd = {
      ...mockAds[adIndex],
      ...data,
      id: params.id,
      updatedAt: new Date().toISOString()
    }

    mockAds[adIndex] = updatedAd

    return NextResponse.json({ 
      message: 'Ad updated successfully',
      ad: updatedAd 
    })
  } catch (error) {
    console.error('Error updating ad:', error)
    return NextResponse.json(
      { error: 'Failed to update ad' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const adIndex = mockAds.findIndex(a => a.id === params.id)
    
    if (adIndex === -1) {
      return NextResponse.json(
        { error: 'Ad not found' },
        { status: 404 }
      )
    }

    mockAds.splice(adIndex, 1)

    return NextResponse.json({ 
      message: 'Ad deleted successfully' 
    })
  } catch (error) {
    console.error('Error deleting ad:', error)
    return NextResponse.json(
      { error: 'Failed to delete ad' },
      { status: 500 }
    )
  }
}