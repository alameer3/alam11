import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/database/connection'
import { QualityModel } from '@/lib/database/models'

export async function GET() {
  try {
    await connectToDatabase()
    
    const qualities = await QualityModel.getAll()
    
    return NextResponse.json(qualities)
  } catch (error) {
    console.error('Error fetching qualities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch qualities' },
      { status: 500 }
    )
  }
}