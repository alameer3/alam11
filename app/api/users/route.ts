import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/database/connection'
import { UserModel } from '@/lib/database/models'

// GET /api/users - جلب المستخدمين مع دعم البحث والترشيح والترقيم
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const perPage = parseInt(searchParams.get('perPage') || '20')
    const search = searchParams.get('search') || ''
    const role = searchParams.get('role') || ''
    const status = searchParams.get('status') || ''
    
    // بناء شروط البحث
    const filters: {
      search?: string;
      role?: string;
      is_active?: boolean;
      is_verified?: boolean;
    } = {}
    
    if (search) {
      filters.search = search
    }
    
    if (role) {
      filters.role = role
    }
    
    if (status) {
      switch (status) {
        case 'active':
          filters.is_active = true
          break
        case 'inactive':
          filters.is_active = false
          break
        case 'verified':
          filters.is_verified = true
          break
        case 'unverified':
          filters.is_verified = false
          break
      }
    }

    const result = await UserModel.paginate(filters, page, perPage)
    
    return NextResponse.json(result)
  } catch (error) {
    // // console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'فشل في جلب المستخدمين' },
      { status: 500 }
    )
  }
}

// POST /api/users - إنشاء مستخدم جديد
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()
    
    const body = await request.json()
    
    // التحقق من البيانات المطلوبة
    if (!body.username || !body.email || !body.password) {
      return NextResponse.json(
        { error: 'اسم المستخدم والبريد الإلكتروني وكلمة المرور مطلوبة' },
        { status: 400 }
      )
    }

    // التحقق من عدم وجود مستخدم بنفس اسم المستخدم أو البريد الإلكتروني
    const existingUserByUsername = await UserModel.findByUsername(body.username)
    const existingUserByEmail = await UserModel.findByEmail(body.email)
    
    if (existingUserByUsername || existingUserByEmail) {
      return NextResponse.json(
        { error: 'اسم المستخدم أو البريد الإلكتروني مستخدم بالفعل' },
        { status: 409 }
      )
    }

    const newUser = await UserModel.create(body)
    
    if (!newUser) {
      return NextResponse.json(
        { error: 'فشل في إنشاء المستخدم' },
        { status: 500 }
      )
    }

    // إزالة كلمة المرور من الاستجابة
    const { password, ...userWithoutPassword } = newUser
    
    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error) {
    // // console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'فشل في إنشاء المستخدم' },
      { status: 500 }
    )
  }
}