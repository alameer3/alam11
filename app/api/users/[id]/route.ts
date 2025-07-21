import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/database/connection'
import { UserModel } from '@/lib/database/models'

// GET /api/users/[id] - جلب مستخدم محدد
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    
    const userId = parseInt(params.id)
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'معرف المستخدم غير صحيح' },
        { status: 400 }
      )
    }

    const user = await UserModel.findById(userId)
    
    if (!user) {
      return NextResponse.json(
        { error: 'المستخدم غير موجود' },
        { status: 404 }
      )
    }

    // إزالة كلمة المرور من الاستجابة
    const { password, ...userWithoutPassword } = user
    
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    // console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'فشل في جلب المستخدم' },
      { status: 500 }
    )
  }
}

// PUT /api/users/[id] - تحديث مستخدم كامل
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    
    const userId = parseInt(params.id)
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'معرف المستخدم غير صحيح' },
        { status: 400 }
      )
    }

    const body = await request.json()
    
    // التحقق من وجود المستخدم
    const existingUser = await UserModel.findById(userId)
    if (!existingUser) {
      return NextResponse.json(
        { error: 'المستخدم غير موجود' },
        { status: 404 }
      )
    }

    // التحقق من عدم تضارب اسم المستخدم أو البريد الإلكتروني
    if (body.username || body.email) {
      const conflictUser = await UserModel.findByEmail(
        body.email || existingUser.email
      )
      
      if (conflictUser && conflictUser.id !== userId) {
        return NextResponse.json(
          { error: 'اسم المستخدم أو البريد الإلكتروني مستخدم بالفعل' },
          { status: 409 }
        )
      }
    }

    const updatedUser = await UserModel.update(userId, body)
    
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'فشل في تحديث المستخدم' },
        { status: 500 }
      )
    }

    // إزالة كلمة المرور من الاستجابة
    const { password, ...userWithoutPassword } = updatedUser
    
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    // console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'فشل في تحديث المستخدم' },
      { status: 500 }
    )
  }
}

// PATCH /api/users/[id] - تحديث جزئي للمستخدم
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    
    const userId = parseInt(params.id)
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'معرف المستخدم غير صحيح' },
        { status: 400 }
      )
    }

    const body = await request.json()
    
    // التحقق من وجود المستخدم
    const existingUser = await UserModel.findById(userId)
    if (!existingUser) {
      return NextResponse.json(
        { error: 'المستخدم غير موجود' },
        { status: 404 }
      )
    }

    // التحقق من عدم تضارب اسم المستخدم أو البريد الإلكتروني (فقط إذا تم تغييرهما)
    if (body.username && body.username !== existingUser.username) {
      const conflictUser = await UserModel.findByUsername(body.username)
      if (conflictUser) {
        return NextResponse.json(
          { error: 'اسم المستخدم مستخدم بالفعل' },
          { status: 409 }
        )
      }
    }

    if (body.email && body.email !== existingUser.email) {
      const conflictUser = await UserModel.findByEmail(body.email)
      if (conflictUser) {
        return NextResponse.json(
          { error: 'البريد الإلكتروني مستخدم بالفعل' },
          { status: 409 }
        )
      }
    }

    const updatedUser = await UserModel.update(userId, body)
    
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'فشل في تحديث المستخدم' },
        { status: 500 }
      )
    }

    // إزالة كلمة المرور من الاستجابة
    const { password, ...userWithoutPassword } = updatedUser
    
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    // console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'فشل في تحديث المستخدم' },
      { status: 500 }
    )
  }
}

// DELETE /api/users/[id] - حذف مستخدم
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    
    const userId = parseInt(params.id)
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'معرف المستخدم غير صحيح' },
        { status: 400 }
      )
    }

    // التحقق من وجود المستخدم
    const existingUser = await UserModel.findById(userId)
    if (!existingUser) {
      return NextResponse.json(
        { error: 'المستخدم غير موجود' },
        { status: 404 }
      )
    }

    // منع حذف المدير الأساسي
    if (existingUser.role === 'admin' && existingUser.username === 'admin') {
      return NextResponse.json(
        { error: 'لا يمكن حذف المدير الأساسي' },
        { status: 403 }
      )
    }

    const deleted = await UserModel.delete(userId)
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'فشل في حذف المستخدم' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: 'تم حذف المستخدم بنجاح',
      id: userId 
    })
  } catch (error) {
    // console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'فشل في حذف المستخدم' },
      { status: 500 }
    )
  }
}