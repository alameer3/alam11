import { NextRequest, NextResponse } from 'next/server'

export interface FileItem {
  id: string
  name: string
  type: 'file' | 'folder'
  size: number
  path: string
  parentId?: string
  mimeType?: string
  extension?: string
  createdAt: string
  updatedAt: string
  permissions: {
    read: boolean
    write: boolean
    delete: boolean
  }
  metadata?: {
    width?: number
    height?: number
    duration?: number
    bitrate?: number
    quality?: string
  }
}

// Mock file system data
const mockFiles: FileItem[] = [
  // Root folders
  {
    id: '1',
    name: 'الأفلام',
    type: 'folder',
    size: 0,
    path: '/movies',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    permissions: { read: true, write: true, delete: false }
  },
  {
    id: '2',
    name: 'المسلسلات',
    type: 'folder',
    size: 0,
    path: '/series',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    permissions: { read: true, write: true, delete: false }
  },
  {
    id: '3',
    name: 'الصور',
    type: 'folder',
    size: 0,
    path: '/images',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    permissions: { read: true, write: true, delete: true }
  },
  {
    id: '4',
    name: 'الترجمات',
    type: 'folder',
    size: 0,
    path: '/subtitles',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    permissions: { read: true, write: true, delete: true }
  },
  
  // Movie files
  {
    id: '5',
    name: 'فيلم الحركة الجديد 2024.mp4',
    type: 'file',
    size: 2684354560, // 2.5GB
    path: '/movies/action_movie_2024.mp4',
    parentId: '1',
    mimeType: 'video/mp4',
    extension: 'mp4',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
    permissions: { read: true, write: false, delete: true },
    metadata: {
      width: 1920,
      height: 1080,
      duration: 7200, // 2 hours
      bitrate: 4500,
      quality: '1080p'
    }
  },
  {
    id: '6',
    name: 'كوميديا رومانسية.mkv',
    type: 'file',
    size: 4294967296, // 4GB
    path: '/movies/romantic_comedy.mkv',
    parentId: '1',
    mimeType: 'video/x-matroska',
    extension: 'mkv',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
    permissions: { read: true, write: false, delete: true },
    metadata: {
      width: 3840,
      height: 2160,
      duration: 6300, // 1h 45m
      bitrate: 8000,
      quality: '4K'
    }
  },

  // Series folder and files
  {
    id: '7',
    name: 'مسلسل الدراما العائلية',
    type: 'folder',
    size: 0,
    path: '/series/family_drama',
    parentId: '2',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    permissions: { read: true, write: true, delete: true }
  },
  {
    id: '8',
    name: 'الحلقة 01.mp4',
    type: 'file',
    size: 1073741824, // 1GB
    path: '/series/family_drama/episode_01.mp4',
    parentId: '7',
    mimeType: 'video/mp4',
    extension: 'mp4',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
    permissions: { read: true, write: false, delete: true },
    metadata: {
      width: 1920,
      height: 1080,
      duration: 2700, // 45 minutes
      bitrate: 3500,
      quality: '1080p'
    }
  },
  {
    id: '9',
    name: 'الحلقة 02.mp4',
    type: 'file',
    size: 1099511627776, // ~1GB
    path: '/series/family_drama/episode_02.mp4',
    parentId: '7',
    mimeType: 'video/mp4',
    extension: 'mp4',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
    permissions: { read: true, write: false, delete: true },
    metadata: {
      width: 1920,
      height: 1080,
      duration: 2800, // 46m 40s
      bitrate: 3500,
      quality: '1080p'
    }
  },

  // Image files
  {
    id: '10',
    name: 'poster_action_movie.jpg',
    type: 'file',
    size: 2097152, // 2MB
    path: '/images/poster_action_movie.jpg',
    parentId: '3',
    mimeType: 'image/jpeg',
    extension: 'jpg',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
    permissions: { read: true, write: true, delete: true },
    metadata: {
      width: 1200,
      height: 1800
    }
  },
  {
    id: '11',
    name: 'backdrop_comedy.webp',
    type: 'file',
    size: 1048576, // 1MB
    path: '/images/backdrop_comedy.webp',
    parentId: '3',
    mimeType: 'image/webp',
    extension: 'webp',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
    permissions: { read: true, write: true, delete: true },
    metadata: {
      width: 1920,
      height: 1080
    }
  },

  // Subtitle files
  {
    id: '12',
    name: 'action_movie_arabic.srt',
    type: 'file',
    size: 51200, // 50KB
    path: '/subtitles/action_movie_arabic.srt',
    parentId: '4',
    mimeType: 'text/srt',
    extension: 'srt',
    createdAt: '2024-01-06T00:00:00Z',
    updatedAt: '2024-01-06T00:00:00Z',
    permissions: { read: true, write: true, delete: true }
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const parentId = searchParams.get('parentId') || null
    const search = searchParams.get('search') || ''
    const type = searchParams.get('type') || ''
    const extension = searchParams.get('extension') || ''

    let filteredFiles = [...mockFiles]

    // Filter by parent directory
    if (parentId) {
      filteredFiles = filteredFiles.filter(file => file.parentId === parentId)
    } else {
      // Show root level items when no parentId is specified
      filteredFiles = filteredFiles.filter(file => !file.parentId)
    }

    // Search filter
    if (search) {
      filteredFiles = filteredFiles.filter(file =>
        file.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Type filter
    if (type) {
      filteredFiles = filteredFiles.filter(file => file.type === type)
    }

    // Extension filter
    if (extension) {
      filteredFiles = filteredFiles.filter(file => file.extension === extension)
    }

    // Sort: folders first, then by name
    filteredFiles.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === 'folder' ? -1 : 1
      }
      return a.name.localeCompare(b.name, 'ar')
    })

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedFiles = filteredFiles.slice(startIndex, endIndex)

    const totalPages = Math.ceil(filteredFiles.length / limit)

    // Calculate directory stats
    const stats = {
      totalFiles: mockFiles.filter(f => f.type === 'file').length,
      totalFolders: mockFiles.filter(f => f.type === 'folder').length,
      totalSize: mockFiles.filter(f => f.type === 'file').reduce((sum, f) => sum + f.size, 0)
    }

    return NextResponse.json({
      files: paginatedFiles,
      stats,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: filteredFiles.length,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('Error fetching files:', error)
    return NextResponse.json(
      { error: 'Failed to fetch files' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const newFile: FileItem = {
      id: (mockFiles.length + 1).toString(),
      name: data.name,
      type: data.type || 'file',
      size: data.size || 0,
      path: data.path,
      parentId: data.parentId,
      mimeType: data.mimeType,
      extension: data.extension,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      permissions: data.permissions || { read: true, write: true, delete: true },
      metadata: data.metadata
    }

    mockFiles.push(newFile)

    return NextResponse.json({ 
      message: 'File created successfully',
      file: newFile 
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating file:', error)
    return NextResponse.json(
      { error: 'Failed to create file' },
      { status: 500 }
    )
  }
}