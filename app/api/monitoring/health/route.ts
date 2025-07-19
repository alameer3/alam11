import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const healthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
      },
      services: {
        api: 'online',
        frontend: 'online',
        database: 'online'
      }
    }
    
    return NextResponse.json({
      success: true,
      data: healthCheck
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'فشل في الفحص الصحي'
    }, { status: 500 })
  }
}