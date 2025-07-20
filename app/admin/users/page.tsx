'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  MagnifyingGlassIcon,
  UserIcon,
  ShieldCheckIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

interface User {
  id: number
  username: string
  email: string
  full_name?: string
  avatar?: string
  role: 'admin' | 'moderator' | 'user'
  is_active: boolean
  is_verified: boolean
  created_at: string
  last_login?: string
  total_ratings?: number
  total_comments?: number
  total_favorites?: number
}

interface PaginationResult {
  data: User[]
  pagination: {
    page: number
    perPage: number
    total: number
    pages: number
  }
}

export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)

  const perPage = 20

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        perPage: perPage.toString(),
        ...(searchTerm && { search: searchTerm }),
        ...(roleFilter && { role: roleFilter }),
        ...(statusFilter && { status: statusFilter })
      })

      const response = await fetch(`/api/users?${params}`)
      if (response.ok) {
        const data: PaginationResult = await response.json()
        setUsers(data.data)
        setTotalPages(data.pagination.pages)
        setTotalUsers(data.pagination.total)
      } else {
        console.error('فشل في جلب المستخدمين')
      }
    } catch (error) {
      console.error('خطأ في جلب المستخدمين:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (userId: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return

    try {
      setIsDeleting(userId)
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setUsers(users.filter(user => user.id !== userId))
        setTotalUsers(prev => prev - 1)
      } else {
        alert('فشل في حذف المستخدم')
      }
    } catch (error) {
      console.error('خطأ في حذف المستخدم:', error)
      alert('خطأ في حذف المستخدم')
    } finally {
      setIsDeleting(null)
    }
  }

  const toggleUserStatus = async (userId: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          is_active: !currentStatus
        })
      })

      if (response.ok) {
        setUsers(users.map(user => 
          user.id === userId 
            ? { ...user, is_active: !currentStatus }
            : user
        ))
      }
    } catch (error) {
      console.error('خطأ في تحديث حالة المستخدم:', error)
    }
  }

  const updateUserRole = async (userId: number, newRole: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          role: newRole
        })
      })

      if (response.ok) {
        setUsers(users.map(user => 
          user.id === userId 
            ? { ...user, role: newRole as any }
            : user
        ))
      }
    } catch (error) {
      console.error('خطأ في تحديث دور المستخدم:', error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [currentPage, searchTerm, roleFilter, statusFilter])

  const handleSearch = () => {
    setCurrentPage(1)
    fetchUsers()
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-red-600">مدير</Badge>
      case 'moderator':
        return <Badge className="bg-orange-600">مشرف</Badge>
      case 'user':
        return <Badge className="bg-blue-600">مستخدم</Badge>
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  const getStatusBadge = (isActive: boolean, isVerified: boolean) => {
    if (!isActive) {
      return <Badge className="bg-red-600">معطل</Badge>
    }
    if (isVerified) {
      return <Badge className="bg-green-600">موثق</Badge>
    }
    return <Badge className="bg-yellow-600">غير موثق</Badge>
  }

  return (
    <div className="container mx-auto p-6" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <UserGroupIcon className="w-8 h-8 text-blue-500" />
            إدارة المستخدمين
          </h1>
          <p className="text-gray-400 mt-1">
            إجمالي المستخدمين: {totalUsers}
          </p>
        </div>
        
        <Link href="/admin/users/create">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <PlusIcon className="w-5 h-5 ml-2" />
            إضافة مستخدم جديد
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6 bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="البحث في المستخدمين..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pr-10 bg-gray-700 border-gray-600 text-white"
              />
            </div>
            
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            >
              <option value="">جميع الأدوار</option>
              <option value="admin">مدير</option>
              <option value="moderator">مشرف</option>
              <option value="user">مستخدم</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            >
              <option value="">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="inactive">معطل</option>
              <option value="verified">موثق</option>
              <option value="unverified">غير موثق</option>
            </select>

            <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
              بحث
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      {loading ? (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="space-y-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4 space-x-reverse animate-pulse">
                  <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/3"></div>
                  </div>
                  <div className="w-20 h-8 bg-gray-700 rounded"></div>
                  <div className="w-20 h-8 bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : users.length === 0 ? (
        <Card className="bg-gray-800 border-gray-700 text-center py-12">
          <CardContent>
            <UserGroupIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">لا يوجد مستخدمين</h3>
            <p className="text-gray-400 mb-4">
              {searchTerm ? 'لم يتم العثور على مستخدمين يطابقون البحث' : 'لم يتم تسجيل أي مستخدمين بعد'}
            </p>
            <Link href="/admin/users/create">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <PlusIcon className="w-5 h-5 ml-2" />
                إضافة أول مستخدم
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="text-right p-4 text-white font-semibold">المستخدم</th>
                      <th className="text-right p-4 text-white font-semibold">الدور</th>
                      <th className="text-right p-4 text-white font-semibold">الحالة</th>
                      <th className="text-right p-4 text-white font-semibold">تاريخ التسجيل</th>
                      <th className="text-right p-4 text-white font-semibold">آخر دخول</th>
                      <th className="text-right p-4 text-white font-semibold">الإحصائيات</th>
                      <th className="text-center p-4 text-white font-semibold">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-t border-gray-700 hover:bg-gray-750">
                        <td className="p-4">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
                              {user.avatar ? (
                                <img 
                                  src={user.avatar} 
                                  alt={user.full_name || user.username}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <UserIcon className="w-6 h-6 text-gray-400" />
                              )}
                            </div>
                            <div>
                              <div className="text-white font-medium">
                                {user.full_name || user.username}
                              </div>
                              <div className="text-gray-400 text-sm">{user.email}</div>
                              {user.username !== user.full_name && (
                                <div className="text-gray-500 text-xs">@{user.username}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <select
                            value={user.role}
                            onChange={(e) => updateUserRole(user.id, e.target.value)}
                            className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-sm"
                          >
                            <option value="user">مستخدم</option>
                            <option value="moderator">مشرف</option>
                            <option value="admin">مدير</option>
                          </select>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col gap-1">
                            {getStatusBadge(user.is_active, user.is_verified)}
                            <button
                              onClick={() => toggleUserStatus(user.id, user.is_active)}
                              className="text-xs text-blue-400 hover:text-blue-300"
                            >
                              {user.is_active ? 'تعطيل' : 'تفعيل'}
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-gray-300 text-sm">
                          {new Date(user.created_at).toLocaleDateString('ar-SA')}
                        </td>
                        <td className="p-4 text-gray-300 text-sm">
                          {user.last_login 
                            ? new Date(user.last_login).toLocaleDateString('ar-SA')
                            : 'لم يدخل بعد'
                          }
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-gray-300 space-y-1">
                            <div>التقييمات: {user.total_ratings || 0}</div>
                            <div>التعليقات: {user.total_comments || 0}</div>
                            <div>المفضلة: {user.total_favorites || 0}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center gap-2">
                            <Link href={`/admin/users/${user.id}`}>
                              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                                <EyeIcon className="w-4 h-4" />
                              </Button>
                            </Link>
                            
                            <Link href={`/admin/users/${user.id}/edit`}>
                              <Button variant="outline" size="sm" className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white">
                                <PencilIcon className="w-4 h-4" />
                              </Button>
                            </Link>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(user.id)}
                              disabled={isDeleting === user.id}
                              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                السابق
              </Button>
              
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page 
                        ? "bg-blue-600 text-white" 
                        : "border-gray-600 text-gray-300 hover:bg-gray-700"
                      }
                    >
                      {page}
                    </Button>
                  )
                })}
              </div>
              
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                التالي
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}