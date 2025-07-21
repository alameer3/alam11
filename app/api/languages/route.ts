import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/database/connection'
import { LanguageModel } from '@/lib/database/models'

export async function GET() {
  try {
    await connectToDatabase()
    
    const languages = await LanguageModel.getAll()
    
    return NextResponse.json(languages)
  } catch (error) {
    // // // console.error('Error fetching languages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch languages' },
      { status: 500 }
    )
  }
}