'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import {
  ShieldCheckIcon,
  UserGroupIcon,
  KeyIcon,
  LockClosedIcon,
  LockOpenIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface Permission {
  id: string
  name: string
  resource: string
  action: string
  description: string
  category: 'content' | 'users' | 'system' | 'reports' | 'settings'
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
  isSystem: boolean
  color: string
  createdAt: string
  updatedAt: string
}

interface RoleAssignment {
  userId: string
  userName: string
  userEmail: string
  roles: string[]
  lastLogin: string
  status: 'active' | 'inactive'
}

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [assignments, setAssignments] = useState<RoleAssignment[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'roles' | 'permissions' | 'assignments'>('roles')
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)

  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
    color: '#3B82F6'
  })

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // محاكاة بيانات الأذونات
      const mockPermissions: Permission[] = [
        // Content permissions
        { id: 'movies.view', name: 'عرض الأفلام', resource: 'movies', action: 'view', description: 'القدرة على عرض قائمة الأفلام', category: 'content' },
        { id: 'movies.create', name: 'إضافة أفلام', resource: 'movies', action: 'create', description: 'القدرة على إضافة أفلام جديدة', category: 'content' },
        { id: 'movies.edit', name: 'تعديل الأفلام', resource: 'movies', action: 'edit', description: 'القدرة على تعديل بيانات الأفلام', category: 'content' },
        { id: 'movies.delete', name: 'حذف الأفلام', resource: 'movies', action: 'delete', description: 'القدرة على حذف الأفلام', category: 'content' },
        
        { id: 'series.view', name: 'عرض المسلسلات', resource: 'series', action: 'view', description: 'القدرة على عرض قائمة المسلسلات', category: 'content' },
        { id: 'series.create', name: 'إضافة مسلسلات', resource: 'series', action: 'create', description: 'القدرة على إضافة مسلسلات جديدة', category: 'content' },
        { id: 'series.edit', name: 'تعديل المسلسلات', resource: 'series', action: 'edit', description: 'القدرة على تعديل بيانات المسلسلات', category: 'content' },
        { id: 'series.delete', name: 'حذف المسلسلات', resource: 'series', action: 'delete', description: 'القدرة على حذف المسلسلات', category: 'content' },

        // User permissions
        { id: 'users.view', name: 'عرض المستخدمين', resource: 'users', action: 'view', description: 'القدرة على عرض قائمة المستخدمين', category: 'users' },
        { id: 'users.create', name: 'إضافة مستخدمين', resource: 'users', action: 'create', description: 'القدرة على إضافة مستخدمين جدد', category: 'users' },
        { id: 'users.edit', name: 'تعديل المستخدمين', resource: 'users', action: 'edit', description: 'القدرة على تعديل بيانات المستخدمين', category: 'users' },
        { id: 'users.delete', name: 'حذف المستخدمين', resource: 'users', action: 'delete', description: 'القدرة على حذف المستخدمين', category: 'users' },
        { id: 'users.ban', name: 'حظر المستخدمين', resource: 'users', action: 'ban', description: 'القدرة على حظر أو إلغاء حظر المستخدمين', category: 'users' },

        // System permissions
        { id: 'servers.view', name: 'عرض الخوادم', resource: 'servers', action: 'view', description: 'القدرة على عرض معلومات الخوادم', category: 'system' },
        { id: 'servers.manage', name: 'إدارة الخوادم', resource: 'servers', action: 'manage', description: 'القدرة على إدارة الخوادم', category: 'system' },
        { id: 'monitoring.view', name: 'عرض المراقبة', resource: 'monitoring', action: 'view', description: 'القدرة على عرض بيانات المراقبة', category: 'system' },
        { id: 'backups.view', name: 'عرض النسخ الاحتياطية', resource: 'backups', action: 'view', description: 'القدرة على عرض النسخ الاحتياطية', category: 'system' },
        { id: 'backups.create', name: 'إنشاء نسخ احتياطية', resource: 'backups', action: 'create', description: 'القدرة على إنشاء نسخ احتياطية', category: 'system' },
        { id: 'backups.restore', name: 'استعادة النسخ', resource: 'backups', action: 'restore', description: 'القدرة على استعادة النسخ الاحتياطية', category: 'system' },

        // Reports permissions
        { id: 'reports.view', name: 'عرض التقارير', resource: 'reports', action: 'view', description: 'القدرة على عرض التقارير والتحليلات', category: 'reports' },
        { id: 'reports.export', name: 'تصدير التقارير', resource: 'reports', action: 'export', description: 'القدرة على تصدير التقارير', category: 'reports' },

        // Settings permissions
        { id: 'settings.view', name: 'عرض الإعدادات', resource: 'settings', action: 'view', description: 'القدرة على عرض إعدادات النظام', category: 'settings' },
        { id: 'settings.edit', name: 'تعديل الإعدادات', resource: 'settings', action: 'edit', description: 'القدرة على تعديل إعدادات النظام', category: 'settings' },
        { id: 'permissions.manage', name: 'إدارة الأذونات', resource: 'permissions', action: 'manage', description: 'القدرة على إدارة الأذونات والأدوار', category: 'settings' },
      ]

      // محاكاة بيانات الأدوار
      const mockRoles: Role[] = [
        {
          id: 'super-admin',
          name: 'مدير عام',
          description: 'صلاحيات كاملة لجميع أجزاء النظام',
          permissions: mockPermissions.map(p => p.id),
          userCount: 2,
          isSystem: true,
          color: '#DC2626',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        {
          id: 'content-manager',
          name: 'مدير المحتوى',
          description: 'إدارة الأفلام والمسلسلات والمحتوى',
          permissions: [
            'movies.view', 'movies.create', 'movies.edit', 'movies.delete',
            'series.view', 'series.create', 'series.edit', 'series.delete',
            'reports.view'
          ],
          userCount: 5,
          isSystem: false,
          color: '#059669',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-10T00:00:00Z'
        },
        {
          id: 'user-manager',
          name: 'مدير المستخدمين',
          description: 'إدارة المستخدمين والعضويات',
          permissions: [
            'users.view', 'users.create', 'users.edit', 'users.ban',
            'reports.view'
          ],
          userCount: 3,
          isSystem: false,
          color: '#7C3AED',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-05T00:00:00Z'
        },
        {
          id: 'moderator',
          name: 'مشرف',
          description: 'صلاحيات الإشراف الأساسية',
          permissions: [
            'movies.view', 'series.view', 'users.view', 'users.ban'
          ],
          userCount: 12,
          isSystem: false,
          color: '#EA580C',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-15T00:00:00Z'
        },
        {
          id: 'viewer',
          name: 'مشاهد',
          description: 'صلاحيات العرض فقط',
          permissions: [
            'movies.view', 'series.view', 'reports.view'
          ],
          userCount: 8,
          isSystem: false,
          color: '#0891B2',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-12T00:00:00Z'
        }
      ]

      // محاكاة تعيينات الأدوار
      const mockAssignments: RoleAssignment[] = [
        {
          userId: '1',
          userName: 'أحمد محمد',
          userEmail: 'ahmed@example.com',
          roles: ['super-admin'],
          lastLogin: '2024-01-20T10:30:00Z',
          status: 'active'
        },
        {
          userId: '2',
          userName: 'فاطمة علي',
          userEmail: 'fatima@example.com',
          roles: ['content-manager'],
          lastLogin: '2024-01-19T14:20:00Z',
          status: 'active'
        },
        {
          userId: '3',
          userName: 'محمد حسن',
          userEmail: 'mohamed@example.com',
          roles: ['user-manager'],
          lastLogin: '2024-01-18T09:15:00Z',
          status: 'active'
        },
        {
          userId: '4',
          userName: 'سارة أحمد',
          userEmail: 'sara@example.com',
          roles: ['moderator', 'viewer'],
          lastLogin: '2024-01-17T16:45:00Z',
          status: 'active'
        },
        {
          userId: '5',
          userName: 'عبدالله يوسف',
          userEmail: 'abdullah@example.com',
          roles: ['viewer'],
          lastLogin: '2024-01-15T12:00:00Z',
          status: 'inactive'
        }
      ]

      await new Promise(resolve => setTimeout(resolve, 1000))
      setPermissions(mockPermissions)
      setRoles(mockRoles)
      setAssignments(mockAssignments)
    } catch (error) {
      // // console.error('خطأ في جلب البيانات:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'content':
        return '🎬'
      case 'users':
        return '👥'
      case 'system':
        return '⚙️'
      case 'reports':
        return '📊'
      case 'settings':
        return '🔧'
      default:
        return '🔒'
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'content':
        return 'المحتوى'
      case 'users':
        return 'المستخدمون'
      case 'system':
        return 'النظام'
      case 'reports':
        return 'التقارير'
      case 'settings':
        return 'الإعدادات'
      default:
        return category
    }
  }

  const handleCreateRole = async () => {
    try {
      const role: Role = {
        id: new Date("2025-07-21T14:00:00Z").getTime().toString(),
        name: newRole.name,
        description: newRole.description,
        permissions: newRole.permissions,
        userCount: 0,
        isSystem: false,
        color: newRole.color,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      setRoles([...roles, role])
      setNewRole({ name: '', description: '', permissions: [], color: '#3B82F6' })
      setShowCreateRoleModal(false)
    } catch (error) {
      // // console.error('خطأ في إنشاء الدور:', error)
    }
  }

  const handleDeleteRole = async (roleId: string) => {
    const role = roles.find(r => r.id === roleId)
    if (!role) return

    if (role.isSystem) {
      alert('لا يمكن حذف الأدوار الأساسية للنظام')
      return
    }

    if (!confirm(`هل أنت متأكد من حذف دور "${role.name}"؟`)) return

    try {
      setRoles(roles.filter(r => r.id !== roleId))
    } catch (error) {
      // // console.error('خطأ في حذف الدور:', error)
    }
  }

  const togglePermission = (permissionId: string) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }))
  }

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = []
    }
    acc[permission.category].push(permission)
    return acc
  }, {} as Record<string, Permission[]>)

  if (loading) {
    return (
      <div className="container mx-auto p-6" dir="rtl">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-700 rounded w-1/4"></div>
          <div className="grid gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-32 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <ShieldCheckIcon className="w-8 h-8 text-blue-500" />
            إدارة الأذونات والأدوار
          </h1>
          <p className="text-gray-400 mt-1">
            إدارة أذونات المستخدمين وتعيين الأدوار والصلاحيات
          </p>
        </div>
        
        <Button 
          onClick={() => setShowCreateRoleModal(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="w-4 h-4 ml-2" />
          دور جديد
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">إجمالي الأدوار</p>
                <p className="text-2xl font-bold text-white">{roles.length}</p>
              </div>
              <UserGroupIcon className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">إجمالي الأذونات</p>
                <p className="text-2xl font-bold text-white">{permissions.length}</p>
              </div>
              <KeyIcon className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">المستخدمون المعينون</p>
                <p className="text-2xl font-bold text-white">{assignments.length}</p>
              </div>
              <ShieldCheckIcon className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">أدوار النظام</p>
                <p className="text-2xl font-bold text-white">{roles.filter(r => r.isSystem).length}</p>
              </div>
              <LockClosedIcon className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-700 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('roles')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'roles' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-400 hover:text-white hover:bg-gray-600'
          }`}
        >
          الأدوار
        </button>
        <button
          onClick={() => setActiveTab('permissions')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'permissions' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-400 hover:text-white hover:bg-gray-600'
          }`}
        >
          الأذونات
        </button>
        <button
          onClick={() => setActiveTab('assignments')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'assignments' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-400 hover:text-white hover:bg-gray-600'
          }`}
        >
          التعيينات
        </button>
      </div>

      {/* Roles Tab */}
      {activeTab === 'roles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => (
            <Card key={role.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: role.color }}
                    ></div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">{role.name}</h3>
                      <p className="text-gray-400 text-sm">{role.description}</p>
                    </div>
                  </div>
                  
                  {role.isSystem && (
                    <Badge className="bg-yellow-600">نظام</Badge>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">عدد الأذونات:</span>
                    <span className="text-white">{role.permissions.length}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">عدد المستخدمين:</span>
                    <span className="text-white">{role.userCount}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">تم الإنشاء:</span>
                    <span className="text-white">
                      {new Date(role.createdAt).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700">
                  <Button variant="outline" size="sm" className="flex-1 border-blue-600 text-blue-400">
                    <EyeIcon className="w-4 h-4 ml-1" />
                    عرض
                  </Button>
                  {!role.isSystem && (
                    <>
                      <Button variant="outline" size="sm" className="border-green-600 text-green-400">
                        <PencilIcon className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteRole(role.id)}
                        className="border-red-600 text-red-400 hover:bg-red-600"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Permissions Tab */}
      {activeTab === 'permissions' && (
        <div className="space-y-6">
          {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
            <Card key={category} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="text-2xl">{getCategoryIcon(category)}</span>
                  {getCategoryName(category)}
                  <Badge variant="outline" className="border-gray-500 text-gray-400">
                    {categoryPermissions.length} إذن
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryPermissions.map((permission) => (
                    <div key={permission.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">{permission.name}</h4>
                        <p className="text-sm text-gray-400">{permission.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs border-blue-500 text-blue-400">
                            {permission.resource}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-green-500 text-green-400">
                            {permission.action}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          {roles.filter(r => r.permissions.includes(permission.id)).length} دور
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Assignments Tab */}
      {activeTab === 'assignments' && (
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <Card key={assignment.userId} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {assignment.userName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{assignment.userName}</h3>
                      <p className="text-gray-400 text-sm">{assignment.userEmail}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {assignment.roles.map(roleId => {
                          const role = roles.find(r => r.id === roleId)
                          return role ? (
                            <Badge 
                              key={roleId} 
                              variant="outline"
                              className="text-xs"
                              style={{ borderColor: role.color, color: role.color }}
                            >
                              {role.name}
                            </Badge>
                          ) : null
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      {assignment.status === 'active' ? (
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      ) : (
                        <XMarkIcon className="w-5 h-5 text-red-500" />
                      )}
                      <Badge className={assignment.status === 'active' ? 'bg-green-600' : 'bg-red-600'}>
                        {assignment.status === 'active' ? 'نشط' : 'غير نشط'}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">
                      آخر دخول: {new Date(assignment.lastLogin).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Role Modal */}
      {showCreateRoleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-gray-800 border-gray-700 w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
            <CardHeader>
              <CardTitle className="text-white">إنشاء دور جديد</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role-name" className="text-white">اسم الدور</Label>
                  <Input
                    id="role-name"
                    value={newRole.name}
                    onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                    placeholder="مدير المحتوى"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role-color" className="text-white">لون الدور</Label>
                  <Input
                    id="role-color"
                    type="color"
                    value={newRole.color}
                    onChange={(e) => setNewRole({...newRole, color: e.target.value})}
                    className="bg-gray-700 border-gray-600 h-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role-description" className="text-white">وصف الدور</Label>
                <Input
                  id="role-description"
                  value={newRole.description}
                  onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                  placeholder="وصف مختصر للدور ومسؤولياته"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">الأذونات</h3>
                {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                  <div key={category} className="border border-gray-600 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                      <span className="text-xl">{getCategoryIcon(category)}</span>
                      {getCategoryName(category)}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {categoryPermissions.map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <Switch
                            checked={newRole.permissions.includes(permission.id)}
                            onCheckedChange={() => togglePermission(permission.id)}
                          />
                          <div className="flex-1">
                            <p className="text-sm text-white">{permission.name}</p>
                            <p className="text-xs text-gray-400">{permission.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-700">
                <Button 
                  onClick={handleCreateRole}
                  disabled={!newRole.name || !newRole.description}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  إنشاء الدور
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreateRoleModal(false)}
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}