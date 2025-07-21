import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/database/connection'
import { SectionModel } from '@/lib/database/models'

export async function GET() {
  try {
    await connectToDatabase()
    
    const sections = await SectionModel.getAll()
    
    return NextResponse.json(sections)
  } catch (error) {
    // // // console.error('Error fetching sections:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sections' },
      { status: 500 }
    )
  }
}