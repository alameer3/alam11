'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  FileText,
  Code,
  Image,
  Settings,
  Save,
  Download,
  Upload,
  FolderOpen,
  Plus,
  Trash2,
  Eye,
  Edit3,
  Copy,
  Search,
  RefreshCw
} from 'lucide-react'

interface FileItem {
  id: string
  name: string
  type: 'file' | 'folder'
  extension?: string
  content?: string
  path: string
  size?: number
  modified?: Date
  children?: FileItem[]
}

export default function FileManagerPage() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [currentPath, setCurrentPath] = useState('/')
  const [isEditing, setIsEditing] = useState(false)
  const [fileContent, setFileContent] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  // ملفات الموقع الأساسية
  const siteFiles: FileItem[] = [
    {
      id: '1',
      name: 'app',
      type: 'folder',
      path: '/app',
      children: [
        {
          id: '2',
          name: 'page.tsx',
          type: 'file',
          extension: 'tsx',
          path: '/app/page.tsx',
          content: `import { MainHeader } from '@/components/layout/main-header'
import { MainMenu } from '@/components/layout/main-menu'
import { SearchBox } from '@/components/layout/search-box'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div dir="rtl" className="header-fixed body-home min-h-screen">
      {/* محتوى الصفحة الرئيسية */}
    </div>
  )
}`,
          size: 2048,
          modified: new Date()
        },
        {
          id: '3',
          name: 'layout.tsx',
          type: 'file',
          extension: 'tsx',
          path: '/app/layout.tsx',
          content: `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'اكوام | موقع التحميل و المشاهدة العربي الاول',
  description: 'شمس المواقع...'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}`,
          size: 1024,
          modified: new Date()
        },
        {
          id: '4',
          name: 'globals.css',
          type: 'file',
          extension: 'css',
          path: '/app/globals.css',
          content: `@tailwind base;
@tailwind components;
@tailwind utilities;

/* تأثيرات اكوام المخصصة */
@keyframes shimmer {
  0% { 
    transform: translateX(-100%) rotate(45deg); 
  }
  100% { 
    transform: translateX(300px) rotate(45deg); 
  }
}

.home-site-btn {
  transition: all 0.3s ease;
}

.home-site-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 20px 40px rgba(38, 186, 238, 0.4);
}`,
          size: 3072,
          modified: new Date()
        }
      ]
    },
    {
      id: '5',
      name: 'components',
      type: 'folder',
      path: '/components',
      children: [
        {
          id: '6',
          name: 'layout',
          type: 'folder',
          path: '/components/layout',
          children: [
            {
              id: '7',
              name: 'main-header.tsx',
              type: 'file',
              extension: 'tsx',
              path: '/components/layout/main-header.tsx',
              content: `'use client'

import Link from 'next/link'
import { AkwamLogo } from '@/components/ui/akwam-logo'

export function MainHeader() {
  return (
    <header className="main-header">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-auto">
            <h2 className="main-logo m-0">
              <Link href="/main" className="d-inline-flex">
                <AkwamLogo />
              </Link>
            </h2>
          </div>
          {/* باقي محتوى الهيدر */}
        </div>
      </div>
    </header>
  )
}`,
              size: 1536,
              modified: new Date()
            }
          ]
        }
      ]
    },
    {
      id: '8',
      name: 'lib',
      type: 'folder',
      path: '/lib',
      children: [
        {
          id: '9',
          name: 'site-settings.ts',
          type: 'file',
          extension: 'ts',
          path: '/lib/site-settings.ts',
          content: `import { z } from 'zod'

export const SiteConfigSchema = z.object({
  siteName: z.string().default('اكوام'),
  siteDescription: z.string().default('شمس المواقع...'),
  primaryColor: z.string().default('#26baee'),
  secondaryColor: z.string().default('#222222'),
  // ... باقي الإعدادات
})

export type SiteConfig = z.infer<typeof SiteConfigSchema>`,
          size: 2048,
          modified: new Date()
        }
      ]
    }
  ]

  useEffect(() => {
    setFiles(siteFiles)
  }, [])

  const handleFileSelect = (file: FileItem) => {
    setSelectedFile(file)
    setFileContent(file.content || '')
    setIsEditing(false)
  }

  const handleSaveFile = async () => {
    if (selectedFile) {
      // هنا سيتم حفظ الملف في النظام الفعلي
      const updatedFile = { ...selectedFile, content: fileContent }
      setSelectedFile(updatedFile)
      setIsEditing(false)
      alert('تم حفظ الملف بنجاح!')
    }
  }

  const handleCreateFile = () => {
    const fileName = prompt('اسم الملف الجديد:')
    if (fileName) {
      const newFile: FileItem = {
        id: Date.now().toString(),
        name: fileName,
        type: 'file',
        extension: fileName.split('.').pop(),
        path: `${currentPath}/${fileName}`,
        content: '',
        size: 0,
        modified: new Date()
      }
      
      setFiles([...files, newFile])
      setSelectedFile(newFile)
      setFileContent('')
      setIsEditing(true)
    }
  }

  const handleDeleteFile = (fileId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الملف؟')) {
      setFiles(files.filter(f => f.id !== fileId))
      if (selectedFile?.id === fileId) {
        setSelectedFile(null)
        setFileContent('')
      }
      alert('تم حذف الملف بنجاح!')
    }
  }

  const getFileIcon = (file: FileItem) => {
    if (file.type === 'folder') return <FolderOpen className="h-4 w-4" />
    
    switch (file.extension) {
      case 'tsx':
      case 'ts':
      case 'js':
      case 'jsx':
        return <Code className="h-4 w-4 text-blue-500" />
      case 'css':
      case 'scss':
        return <FileText className="h-4 w-4 text-green-500" />
      case 'json':
        return <Settings className="h-4 w-4 text-yellow-500" />
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'webp':
        return <Image className="h-4 w-4 text-purple-500" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const renderFileTree = (fileList: FileItem[], level = 0) => {
    return fileList.map(file => (
      <div key={file.id} style={{ paddingLeft: `${level * 20}px` }}>
        <div 
          className={`flex items-center gap-2 p-2 hover:bg-[#2a2a2a] cursor-pointer rounded ${
            selectedFile?.id === file.id ? 'bg-[#26baee] text-white' : 'text-gray-300'
          }`}
          onClick={() => file.type === 'file' && handleFileSelect(file)}
        >
          {getFileIcon(file)}
          <span className="flex-1">{file.name}</span>
          {file.type === 'file' && (
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  handleFileSelect(file)
                  setIsEditing(true)
                }}
                className="h-6 w-6 p-0"
              >
                <Edit3 className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteFile(file.id)
                }}
                className="h-6 w-6 p-0 text-red-500 hover:text-red-400"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
        {file.children && renderFileTree(file.children, level + 1)}
      </div>
    ))
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* رأس الصفحة */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <FileText className="h-10 w-10" />
            محرر ملفات الموقع
          </h1>
          <p className="text-gray-400">تحرير وإدارة جميع ملفات الموقع</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* شجرة الملفات */}
          <Card className="bg-[#1a1a1a] border-[#333]">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>ملفات الموقع</span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleCreateFile}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription className="text-gray-400">
                تصفح وإدارة ملفات المشروع
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* شريط البحث */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="البحث في الملفات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#2a2a2a] border-[#444] text-white pl-10"
                  />
                </div>
              </div>

              {/* شجرة الملفات */}
              <div className="max-h-96 overflow-y-auto">
                {renderFileTree(filteredFiles)}
              </div>
            </CardContent>
          </Card>

          {/* محرر الملفات */}
          <div className="lg:col-span-2">
            <Card className="bg-[#1a1a1a] border-[#333]">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>
                    {selectedFile ? selectedFile.name : 'اختر ملفاً للتحرير'}
                  </span>
                  {selectedFile && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                        variant={isEditing ? "default" : "outline"}
                        className={isEditing ? "bg-[#26baee] hover:bg-[#1fa3d1]" : "border-gray-600"}
                      >
                        {isEditing ? <Eye className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                        {isEditing ? 'معاينة' : 'تحرير'}
                      </Button>
                      {isEditing && (
                        <Button
                          size="sm"
                          onClick={handleSaveFile}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          حفظ
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600"
                        onClick={() => {
                          navigator.clipboard.writeText(fileContent)
                          alert('تم نسخ المحتوى!')
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardTitle>
                {selectedFile && (
                  <CardDescription className="text-gray-400">
                    المسار: {selectedFile.path} | الحجم: {selectedFile.size} بايت | 
                    آخر تعديل: {selectedFile.modified?.toLocaleString('ar-EG')}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {selectedFile ? (
                  <div className="space-y-4">
                    {isEditing ? (
                      <Textarea
                        value={fileContent}
                        onChange={(e) => setFileContent(e.target.value)}
                        className="bg-[#2a2a2a] border-[#444] text-white font-mono text-sm min-h-[500px]"
                        placeholder="محتوى الملف..."
                      />
                    ) : (
                      <div className="bg-[#2a2a2a] border border-[#444] rounded p-4">
                        <pre className="text-sm text-gray-300 overflow-auto whitespace-pre-wrap">
                          {fileContent}
                        </pre>
                      </div>
                    )}

                    {/* معلومات إضافية */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-[#2a2a2a] p-3 rounded">
                        <Label className="text-gray-400 text-xs">نوع الملف</Label>
                        <p className="text-white">{selectedFile.extension?.toUpperCase()}</p>
                      </div>
                      <div className="bg-[#2a2a2a] p-3 rounded">
                        <Label className="text-gray-400 text-xs">عدد الأسطر</Label>
                        <p className="text-white">{fileContent.split('\n').length}</p>
                      </div>
                      <div className="bg-[#2a2a2a] p-3 rounded">
                        <Label className="text-gray-400 text-xs">عدد الأحرف</Label>
                        <p className="text-white">{fileContent.length}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20 text-gray-400">
                    <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>اختر ملفاً من الشجرة لبدء التحرير</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* أدوات إضافية */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto">
            <Download className="h-6 w-6 mb-2" />
            <div>
              <div className="font-bold">تحميل المشروع</div>
              <div className="text-sm opacity-90">تصدير جميع الملفات</div>
            </div>
          </Button>

          <Button className="bg-green-600 hover:bg-green-700 text-white p-6 h-auto">
            <Upload className="h-6 w-6 mb-2" />
            <div>
              <div className="font-bold">رفع ملفات</div>
              <div className="text-sm opacity-90">استيراد ملفات جديدة</div>
            </div>
          </Button>

          <Button className="bg-purple-600 hover:bg-purple-700 text-white p-6 h-auto">
            <Code className="h-6 w-6 mb-2" />
            <div>
              <div className="font-bold">تنسيق الكود</div>
              <div className="text-sm opacity-90">تنظيف وتنسيق</div>
            </div>
          </Button>

          <Button className="bg-red-600 hover:bg-red-700 text-white p-6 h-auto">
            <RefreshCw className="h-6 w-6 mb-2" />
            <div>
              <div className="font-bold">إعادة تحميل</div>
              <div className="text-sm opacity-90">تحديث الملفات</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}