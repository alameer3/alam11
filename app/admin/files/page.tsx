'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  FolderIcon,
  DocumentIcon,
  PhotoIcon,
  FilmIcon,
  MusicalNoteIcon,
  CodeBracketIcon,
  ArchiveBoxIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  CloudArrowUpIcon,
  CloudArrowDownIcon,
  TrashIcon,
  PencilIcon,
  EyeIcon,
  FolderPlusIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline'

interface FileItem {
  id: number
  name: string
  type: 'file' | 'folder'
  size?: number
  extension?: string
  path: string
  parent_id?: number
  created_at: string
  modified_at: string
  mime_type?: string
  is_public: boolean
  download_count: number
  file_type: 'image' | 'video' | 'audio' | 'document' | 'code' | 'archive' | 'other'
}

export default function FilesManagementPage() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [currentPath, setCurrentPath] = useState('/')
  const [selectedFiles, setSelectedFiles] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [newFolderName, setNewFolderName] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const fetchFiles = async (path: string = '/') => {
    try {
      setLoading(true)
      // محاكاة البيانات
      const mockFiles: FileItem[] = [
        {
          id: 1,
          name: 'images',
          type: 'folder',
          path: '/images',
          created_at: '2024-01-01T00:00:00Z',
          modified_at: '2024-01-15T10:30:00Z',
          is_public: true,
          download_count: 0,
          file_type: 'other'
        },
        {
          id: 2,
          name: 'videos',
          type: 'folder',
          path: '/videos',
          created_at: '2024-01-01T00:00:00Z',
          modified_at: '2024-01-20T14:20:00Z',
          is_public: true,
          download_count: 0,
          file_type: 'other'
        },
        {
          id: 3,
          name: 'documents',
          type: 'folder',
          path: '/documents',
          created_at: '2024-01-05T00:00:00Z',
          modified_at: '2024-01-18T09:15:00Z',
          is_public: false,
          download_count: 0,
          file_type: 'other'
        },
        {
          id: 4,
          name: 'poster-avatar-2.jpg',
          type: 'file',
          size: 2048576, // 2MB
          extension: 'jpg',
          path: '/images/poster-avatar-2.jpg',
          parent_id: 1,
          created_at: '2024-01-10T12:00:00Z',
          modified_at: '2024-01-10T12:00:00Z',
          mime_type: 'image/jpeg',
          is_public: true,
          download_count: 156,
          file_type: 'image'
        },
        {
          id: 5,
          name: 'movie-trailer.mp4',
          type: 'file',
          size: 104857600, // 100MB
          extension: 'mp4',
          path: '/videos/movie-trailer.mp4',
          parent_id: 2,
          created_at: '2024-01-12T15:30:00Z',
          modified_at: '2024-01-12T15:30:00Z',
          mime_type: 'video/mp4',
          is_public: true,
          download_count: 892,
          file_type: 'video'
        },
        {
          id: 6,
          name: 'privacy-policy.pdf',
          type: 'file',
          size: 524288, // 512KB
          extension: 'pdf',
          path: '/documents/privacy-policy.pdf',
          parent_id: 3,
          created_at: '2024-01-08T11:45:00Z',
          modified_at: '2024-01-18T09:15:00Z',
          mime_type: 'application/pdf',
          is_public: false,
          download_count: 234,
          file_type: 'document'
        },
        {
          id: 7,
          name: 'config.json',
          type: 'file',
          size: 1024, // 1KB
          extension: 'json',
          path: '/config.json',
          created_at: '2024-01-01T00:00:00Z',
          modified_at: '2024-01-20T16:45:00Z',
          mime_type: 'application/json',
          is_public: false,
          download_count: 12,
          file_type: 'code'
        },
        {
          id: 8,
          name: 'backup.zip',
          type: 'file',
          size: 1073741824, // 1GB
          extension: 'zip',
          path: '/backup.zip',
          created_at: '2024-01-19T20:00:00Z',
          modified_at: '2024-01-19T20:00:00Z',
          mime_type: 'application/zip',
          is_public: false,
          download_count: 5,
          file_type: 'archive'
        }
      ]
      
      setFiles(mockFiles)
    } catch (error) {
      console.error('خطأ في جلب الملفات:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFiles(currentPath)
  }, [currentPath])

  const getFileIcon = (item: FileItem) => {
    if (item.type === 'folder') {
      return <FolderIcon className="w-8 h-8 text-blue-400" />
    }

    switch (item.file_type) {
      case 'image':
        return <PhotoIcon className="w-8 h-8 text-green-400" />
      case 'video':
        return <FilmIcon className="w-8 h-8 text-red-400" />
      case 'audio':
        return <MusicalNoteIcon className="w-8 h-8 text-purple-400" />
      case 'document':
        return <DocumentIcon className="w-8 h-8 text-orange-400" />
      case 'code':
        return <CodeBracketIcon className="w-8 h-8 text-cyan-400" />
      case 'archive':
        return <ArchiveBoxIcon className="w-8 h-8 text-yellow-400" />
      default:
        return <DocumentIcon className="w-8 h-8 text-gray-400" />
    }
  }

  const formatFileSize = (bytes: number | undefined) => {
    if (!bytes) return '-'
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileTypeBadge = (fileType: string) => {
    switch (fileType) {
      case 'image':
        return <Badge className="bg-green-600">صورة</Badge>
      case 'video':
        return <Badge className="bg-red-600">فيديو</Badge>
      case 'audio':
        return <Badge className="bg-purple-600">صوت</Badge>
      case 'document':
        return <Badge className="bg-orange-600">مستند</Badge>
      case 'code':
        return <Badge className="bg-cyan-600">كود</Badge>
      case 'archive':
        return <Badge className="bg-yellow-600">أرشيف</Badge>
      default:
        return <Badge variant="secondary">أخرى</Badge>
    }
  }

  const handleFileSelect = (fileId: number) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    )
  }

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([])
    } else {
      setSelectedFiles(filteredFiles.map(file => file.id))
    }
  }

  const handleDeleteSelected = async () => {
    if (selectedFiles.length === 0) return
    
    if (!confirm(`هل أنت متأكد من حذف ${selectedFiles.length} عنصر؟`)) return

    try {
      // محاكاة حذف الملفات
      setFiles(files.filter(file => !selectedFiles.includes(file.id)))
      setSelectedFiles([])
    } catch (error) {
      console.error('خطأ في حذف الملفات:', error)
    }
  }

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    try {
      setUploadProgress(0)
      
      // محاكاة رفع الملفات
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        // محاكاة تقدم الرفع
        for (let progress = 0; progress <= 100; progress += 10) {
          setUploadProgress(progress)
          await new Promise(resolve => setTimeout(resolve, 100))
        }
        
        // إضافة الملف للقائمة
        const newFile: FileItem = {
          id: Date.now() + i,
          name: file.name,
          type: 'file',
          size: file.size,
          extension: file.name.split('.').pop()?.toLowerCase(),
          path: `${currentPath}/${file.name}`,
          created_at: new Date().toISOString(),
          modified_at: new Date().toISOString(),
          mime_type: file.type,
          is_public: false,
          download_count: 0,
          file_type: file.type.startsWith('image/') ? 'image' :
                    file.type.startsWith('video/') ? 'video' :
                    file.type.startsWith('audio/') ? 'audio' :
                    file.type.includes('pdf') || file.type.includes('document') ? 'document' :
                    file.type.includes('zip') || file.type.includes('archive') ? 'archive' :
                    file.name.match(/\.(js|ts|jsx|tsx|html|css|json|xml)$/i) ? 'code' : 'other'
        }
        
        setFiles(prev => [...prev, newFile])
      }
      
      setShowUploadModal(false)
      setUploadProgress(0)
    } catch (error) {
      console.error('خطأ في رفع الملفات:', error)
    }
  }

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return

    try {
      const newFolder: FileItem = {
        id: Date.now(),
        name: newFolderName,
        type: 'folder',
        path: `${currentPath}/${newFolderName}`,
        created_at: new Date().toISOString(),
        modified_at: new Date().toISOString(),
        is_public: false,
        download_count: 0,
        file_type: 'other'
      }

      setFiles(prev => [...prev, newFolder])
      setNewFolderName('')
      setShowCreateFolderModal(false)
    } catch (error) {
      console.error('خطأ في إنشاء المجلد:', error)
    }
  }

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'folders' && file.type === 'folder') ||
                         (selectedFilter !== 'folders' && file.file_type === selectedFilter)
    
    return matchesSearch && matchesFilter
  })

  return (
    <div className="container mx-auto p-6" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <FolderIcon className="w-8 h-8 text-blue-500" />
            إدارة الملفات
          </h1>
          <p className="text-gray-400 mt-1">
            المسار الحالي: {currentPath} | {filteredFiles.length} عنصر
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowCreateFolderModal(true)}
            variant="outline" 
            className="border-green-600 text-green-400 hover:bg-green-600"
          >
            <FolderPlusIcon className="w-5 h-5 ml-2" />
            مجلد جديد
          </Button>
          
          <Button 
            onClick={() => setShowUploadModal(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <CloudArrowUpIcon className="w-5 h-5 ml-2" />
            رفع ملفات
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6 bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="البحث في الملفات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 bg-gray-700 border-gray-600 text-white"
              />
            </div>
            
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            >
              <option value="all">جميع الملفات</option>
              <option value="folders">المجلدات</option>
              <option value="image">الصور</option>
              <option value="video">الفيديوهات</option>
              <option value="audio">الصوتيات</option>
              <option value="document">المستندات</option>
              <option value="code">ملفات الكود</option>
              <option value="archive">الأرشيف</option>
            </select>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant={selectedFiles.length === filteredFiles.length ? "default" : "outline"}
                onClick={handleSelectAll}
                className="flex-1"
              >
                {selectedFiles.length === filteredFiles.length ? 'إلغاء الكل' : 'تحديد الكل'}
              </Button>
              
              {selectedFiles.length > 0 && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDeleteSelected}
                  className="border-red-600 text-red-400 hover:bg-red-600"
                >
                  <TrashIcon className="w-4 h-4 ml-1" />
                  حذف ({selectedFiles.length})
                </Button>
              )}
            </div>

            <Button onClick={() => fetchFiles(currentPath)} className="bg-blue-600 hover:bg-blue-700">
              تحديث
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Files Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700 animate-pulse">
              <CardContent className="p-4">
                <div className="h-8 bg-gray-700 rounded mb-3"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredFiles.length === 0 ? (
        <Card className="bg-gray-800 border-gray-700 text-center py-12">
          <CardContent>
            <FolderIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">لا توجد ملفات</h3>
            <p className="text-gray-400 mb-4">
              {searchTerm ? 'لم يتم العثور على ملفات تطابق البحث' : 'هذا المجلد فارغ'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredFiles.map((file) => (
            <Card 
              key={file.id} 
              className={`bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors cursor-pointer ${
                selectedFiles.includes(file.id) ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleFileSelect(file.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getFileIcon(file)}
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => handleFileSelect(file.id)}
                      className="form-checkbox text-blue-600"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  
                  {file.type === 'file' && (
                    <div className="flex items-center gap-1">
                      {getFileTypeBadge(file.file_type)}
                      {file.is_public ? (
                        <Badge className="bg-green-600">عام</Badge>
                      ) : (
                        <Badge className="bg-red-600">خاص</Badge>
                      )}
                    </div>
                  )}
                </div>

                <h3 className="font-medium text-white mb-2 line-clamp-2" title={file.name}>
                  {file.name}
                </h3>

                <div className="space-y-1 text-sm text-gray-400 mb-3">
                  {file.size && (
                    <div className="flex justify-between">
                      <span>الحجم:</span>
                      <span>{formatFileSize(file.size)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>تم إنشاؤه:</span>
                    <span>{new Date(file.created_at).toLocaleDateString('ar-SA')}</span>
                  </div>
                  
                  {file.type === 'file' && (
                    <div className="flex justify-between">
                      <span>التحميلات:</span>
                      <span>{file.download_count}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                  <Button variant="outline" size="sm" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">
                    <EyeIcon className="w-4 h-4 ml-1" />
                    عرض
                  </Button>
                  
                  <Button variant="outline" size="sm" className="border-blue-600 text-blue-400 hover:bg-blue-600">
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                  
                  {file.type === 'file' && (
                    <Button variant="outline" size="sm" className="border-green-600 text-green-400 hover:bg-green-600">
                      <CloudArrowDownIcon className="w-4 h-4" />
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm" className="border-red-600 text-red-400 hover:bg-red-600">
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-gray-800 border-gray-700 w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle className="text-white">رفع ملفات جديدة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300 mb-4">اسحب الملفات هنا أو انقر للاختيار</p>
                <input
                  type="file"
                  multiple
                  onChange={handleUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
                    <ArrowUpTrayIcon className="w-4 h-4 ml-2" />
                    اختر الملفات
                  </Button>
                </label>
              </div>

              {uploadProgress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">جاري الرفع...</span>
                    <span className="text-white">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Create Folder Modal */}
      {showCreateFolderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-gray-800 border-gray-700 w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle className="text-white">إنشاء مجلد جديد</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="folder-name" className="text-white">اسم المجلد</Label>
                <Input
                  id="folder-name"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="أدخل اسم المجلد"
                  className="bg-gray-700 border-gray-600 text-white"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateFolder()
                    }
                  }}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleCreateFolder}
                  disabled={!newFolderName.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  إنشاء
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowCreateFolderModal(false)
                    setNewFolderName('')
                  }}
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