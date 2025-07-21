import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/database/connection'
import { CategoryModel } from '@/lib/database/models'

export async function GET() {
  try {
    await connectToDatabase()
    
    const categories = await CategoryModel.getAll()
    
    return NextResponse.json(categories)
  } catch (error) {
    // // console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}