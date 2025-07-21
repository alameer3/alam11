import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/database/connection'
import { CountryModel } from '@/lib/database/models'

export async function GET() {
  try {
    await connectToDatabase()
    
    const countries = await CountryModel.getAll()
    
    return NextResponse.json(countries)
  } catch (error) {
    // // console.error('Error fetching countries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch countries' },
      { status: 500 }
    )
  }
}