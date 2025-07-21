import { NextRequest, NextResponse } from 'next/server'

export interface Server {
  id: string
  name: string
  type: 'streaming' | 'download' | 'backup' | 'cdn'
  url: string
  location: string
  status: 'online' | 'offline' | 'maintenance' | 'error'
  capacity: number
  currentLoad: number
  bandwidth: number
  storage: {
    total: number
    used: number
    available: number
  }
  uptime: number
  lastCheck: string
  version: string
  features: string[]
  createdAt: string
  updatedAt: string
}

// Mock data
const mockServers: Server[] = [
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
  },
  {
    id: '3',
    name: 'خادم النسخ الاحتياطي',
    type: 'backup',
    url: 'https://backup1.example.com',
    location: 'القاهرة، مصر',
    status: 'maintenance',
    capacity: 100,
    currentLoad: 45,
    bandwidth: 2000,
    storage: {
      total: 20000,
      used: 15000,
      available: 5000
    },
    uptime: 98.2,
    lastCheck: '2024-01-15T10:30:00Z',
    version: '3.0.1',
    features: ['Encryption', 'Compression'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '4',
    name: 'شبكة التوصيل CDN',
    type: 'cdn',
    url: 'https://cdn1.example.com',
    location: 'الكويت، الكويت',
    status: 'online',
    capacity: 2000,
    currentLoad: 1200,
    bandwidth: 15000,
    storage: {
      total: 8000,
      used: 4800,
      available: 3200
    },
    uptime: 99.9,
    lastCheck: '2024-01-15T12:05:00Z',
    version: '4.2.0',
    features: ['Cache', 'Geo-routing', 'DDoS Protection'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T12:05:00Z'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const type = searchParams.get('type') || ''
    const status = searchParams.get('status') || ''
    const location = searchParams.get('location') || ''

    let filteredServers = [...mockServers]

    // Search filter
    if (search) {
      filteredServers = filteredServers.filter(server =>
        server.name.toLowerCase().includes(search.toLowerCase()) ||
        server.url.toLowerCase().includes(search.toLowerCase()) ||
        server.location.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Type filter
    if (type) {
      filteredServers = filteredServers.filter(server => server.type === type)
    }

    // Status filter
    if (status) {
      filteredServers = filteredServers.filter(server => server.status === status)
    }

    // Location filter
    if (location) {
      filteredServers = filteredServers.filter(server =>
        server.location.toLowerCase().includes(location.toLowerCase())
      )
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedServers = filteredServers.slice(startIndex, endIndex)

    const totalPages = Math.ceil(filteredServers.length / limit)

    return NextResponse.json({
      servers: paginatedServers,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: filteredServers.length,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    // console.error('Error fetching servers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch servers' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const newServer: Server = {
      id: (mockServers.length + 1).toString(),
      name: data.name,
      type: data.type,
      url: data.url,
      location: data.location,
      status: data.status || 'offline',
      capacity: data.capacity || 100,
      currentLoad: 0,
      bandwidth: data.bandwidth || 1000,
      storage: data.storage || {
        total: 1000,
        used: 0,
        available: 1000
      },
      uptime: 100,
      lastCheck: new Date().toISOString(),
      version: data.version || '1.0.0',
      features: data.features || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    mockServers.push(newServer)

    return NextResponse.json({ 
      message: 'Server created successfully',
      server: newServer 
    }, { status: 201 })
  } catch (error) {
    // console.error('Error creating server:', error)
    return NextResponse.json(
      { error: 'Failed to create server' },
      { status: 500 }
    )
  }
}