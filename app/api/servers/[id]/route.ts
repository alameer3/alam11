import { NextRequest, NextResponse } from 'next/server'

// This would normally come from a database
const mockServers = [
  {
    id: '1',
    name: 'خادم البث الرئيسي',
    type: 'streaming',
    url: 'https://stream1.example.com',
    location: 'الرياض، السعودية',
    status: 'online',
    capacity: 1000,
    currentLoad: 650,
    bandwidth: 10000,
    storage: {
      total: 5000,
      used: 3200,
      available: 1800
    },
    uptime: 99.8,
    lastCheck: '2024-01-15T12:00:00Z',
    version: '2.1.5',
    features: ['4K', 'HDR', 'DRM'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z'
  },
  {
    id: '2',
    name: 'خادم التحميل المحلي',
    type: 'download',
    url: 'https://download1.example.com',
    location: 'دبي، الإمارات',
    status: 'online',
    capacity: 500,
    currentLoad: 320,
    bandwidth: 5000,
    storage: {
      total: 10000,
      used: 7500,
      available: 2500
    },
    uptime: 99.5,
    lastCheck: '2024-01-15T11:55:00Z',
    version: '1.8.2',
    features: ['Resume', 'MultiThread'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T11:55:00Z'
  }
]

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const server = mockServers.find(s => s.id === params.id)
    
    if (!server) {
      return NextResponse.json(
        { error: 'Server not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ server })
  } catch (error) {
    // console.error('Error fetching server:', error)
    return NextResponse.json(
      { error: 'Failed to fetch server' },
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
    const serverIndex = mockServers.findIndex(s => s.id === params.id)
    
    if (serverIndex === -1) {
      return NextResponse.json(
        { error: 'Server not found' },
        { status: 404 }
      )
    }

    const updatedServer = {
      ...mockServers[serverIndex],
      ...data,
      id: params.id,
      updatedAt: new Date().toISOString()
    }

    mockServers[serverIndex] = updatedServer

    return NextResponse.json({ 
      message: 'Server updated successfully',
      server: updatedServer 
    })
  } catch (error) {
    // console.error('Error updating server:', error)
    return NextResponse.json(
      { error: 'Failed to update server' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const serverIndex = mockServers.findIndex(s => s.id === params.id)
    
    if (serverIndex === -1) {
      return NextResponse.json(
        { error: 'Server not found' },
        { status: 404 }
      )
    }

    mockServers.splice(serverIndex, 1)

    return NextResponse.json({ 
      message: 'Server deleted successfully' 
    })
  } catch (error) {
    // console.error('Error deleting server:', error)
    return NextResponse.json(
      { error: 'Failed to delete server' },
      { status: 500 }
    )
  }
}