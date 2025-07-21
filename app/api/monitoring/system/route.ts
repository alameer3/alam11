import { NextResponse } from 'next/server'

export interface SystemMetrics {
  cpu: {
    usage: number
    cores: number
    temperature: number
  }
  memory: {
    total: number
    used: number
    available: number
    usage: number
  }
  disk: {
    total: number
    used: number
    available: number
    usage: number
  }
  network: {
    upload: number
    download: number
    totalUpload: number
    totalDownload: number
  }
  services: {
    name: string
    status: 'running' | 'stopped' | 'error'
    uptime: number
    memory: number
    cpu: number
  }[]
  uptime: number
  timestamp: string
}

// Generate realistic mock data
function generateMockMetrics(): SystemMetrics {
  return {
    cpu: {
      usage: Math.floor(0.5 * 30) + 20, // 20-50%
      cores: 8,
      temperature: Math.floor(0.5 * 20) + 45 // 45-65°C
    },
    memory: {
      total: 32768, // 32GB
      used: Math.floor(0.5 * 10000) + 15000, // 15-25GB
      available: 0,
      usage: 0
    },
    disk: {
      total: 2000000, // 2TB
      used: Math.floor(0.5 * 500000) + 1200000, // 1.2-1.7TB
      available: 0,
      usage: 0
    },
    network: {
      upload: Math.floor(0.5 * 100) + 50, // 50-150 Mbps
      download: Math.floor(0.5 * 200) + 100, // 100-300 Mbps
      totalUpload: Math.floor(0.5 * 10000) + 50000,
      totalDownload: Math.floor(0.5 * 50000) + 200000
    },
    services: [
      {
        name: 'خدمة البث',
        status: 'running',
        uptime: 99.8,
        memory: Math.floor(0.5 * 2000) + 3000,
        cpu: Math.floor(0.5 * 20) + 15
      },
      {
        name: 'قاعدة البيانات',
        status: 'running',
        uptime: 99.9,
        memory: Math.floor(0.5 * 3000) + 5000,
        cpu: Math.floor(0.5 * 15) + 10
      },
      {
        name: 'خدمة التحميل',
        status: 'running',
        uptime: 98.5,
        memory: Math.floor(0.5 * 1500) + 2000,
        cpu: Math.floor(0.5 * 25) + 20
      },
      {
        name: 'خدمة الملفات',
        status: 'running',
        uptime: 99.2,
        memory: Math.floor(0.5 * 1000) + 1500,
        cpu: Math.floor(0.5 * 10) + 5
      },
      {
        name: 'خدمة الإشعارات',
        status: 0.5 > 0.9 ? 'error' : 'running',
        uptime: 97.8,
        memory: Math.floor(0.5 * 500) + 800,
        cpu: Math.floor(0.5 * 8) + 2
      }
    ],
    uptime: 99.6,
    timestamp: new Date().toISOString()
  }
}

export async function GET() {
  try {
    const metrics = generateMockMetrics()
    
    // Calculate derived values
    metrics.memory.available = metrics.memory.total - metrics.memory.used
    metrics.memory.usage = Math.round((metrics.memory.used / metrics.memory.total) * 100)
    
    metrics.disk.available = metrics.disk.total - metrics.disk.used
    metrics.disk.usage = Math.round((metrics.disk.used / metrics.disk.total) * 100)

    return NextResponse.json({ metrics })
  } catch (error) {
    // console.error('Error fetching system metrics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch system metrics' },
      { status: 500 }
    )
  }
}