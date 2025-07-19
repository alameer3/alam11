import { Suspense } from 'react'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Server, 
  Link2,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'

// Mock data for servers
const servers = [
  {
    id: '1',
    name: 'السيرفر الأول',
    url: 'https://server1.example.com',
    status: 'active',
    uptime: '99.9%',
    location: 'الولايات المتحدة',
    bandwidth: '1000 Mbps',
    lastCheck: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'السيرفر الثاني',
    url: 'https://server2.example.com',
    status: 'maintenance',
    uptime: '98.5%',
    location: 'ألمانيا',
    bandwidth: '500 Mbps',
    lastCheck: '2024-01-15T10:25:00Z'
  },
  {
    id: '3',
    name: 'السيرفر الثالث',
    url: 'https://server3.example.com',
    status: 'down',
    uptime: '95.2%',
    location: 'اليابان',
    bandwidth: '750 Mbps',
    lastCheck: '2024-01-15T09:45:00Z'
  }
]

// Mock data for streaming links
const streamingLinks = [
  {
    id: '1',
    movieId: '1',
    movieTitle: 'فيلم الأكشن الملحمي',
    serverId: '1',
    serverName: 'السيرفر الأول',
    quality: 'HD',
    url: 'https://server1.example.com/stream/movie1.mp4',
    status: 'active',
    views: 1250,
    lastUpdated: '2024-01-15T08:00:00Z'
  },
  {
    id: '2',
    movieId: '1',
    movieTitle: 'فيلم الأكشن الملحمي',
    serverId: '2',
    serverName: 'السيرفر الثاني',
    quality: 'FHD',
    url: 'https://server2.example.com/stream/movie1.mp4',
    status: 'maintenance',
    views: 890,
    lastUpdated: '2024-01-14T15:30:00Z'
  }
]

export default function ServersPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'maintenance':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'down':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'نشط'
      case 'maintenance':
        return 'صيانة'
      case 'down':
        return 'معطل'
      default:
        return 'غير معروف'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AdminSidebar />
        
        <main className="flex-1 p-8">
          <div className="space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">إدارة السيرفرات</h1>
                <p className="text-muted-foreground">
                  إدارة السيرفرات وروابط البث المختلفة
                </p>
              </div>
              <Button>
                <Plus className="h-4 w-4 ml-2" />
                إضافة سيرفر جديد
              </Button>
            </div>

            {/* Servers Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Server className="h-6 w-6" />
                  السيرفرات
                </h2>
                <Button variant="outline" size="sm">
                  تحقق من جميع السيرفرات
                </Button>
              </div>

              <Suspense fallback={<LoadingSpinner />}>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {servers.map((server) => (
                    <div key={server.id} className="bg-card rounded-lg border p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">{server.name}</h3>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(server.status)}
                          <span className="text-sm font-medium">
                            {getStatusText(server.status)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span>الموقع:</span>
                          <span>{server.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>الأداء:</span>
                          <span>{server.uptime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>السرعة:</span>
                          <span>{server.bandwidth}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>آخر فحص:</span>
                          <span>{new Date(server.lastCheck).toLocaleString('ar-SA')}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 ml-1" />
                          تعديل
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Trash2 className="h-4 w-4 ml-1" />
                          حذف
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Suspense>
            </section>

            {/* Streaming Links Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Link2 className="h-6 w-6" />
                  روابط البث
                </h2>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة رابط جديد
                </Button>
              </div>

              <Suspense fallback={<LoadingSpinner />}>
                <div className="bg-card rounded-lg border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-right p-4 font-medium">الفيلم</th>
                          <th className="text-right p-4 font-medium">السيرفر</th>
                          <th className="text-right p-4 font-medium">الجودة</th>
                          <th className="text-right p-4 font-medium">الحالة</th>
                          <th className="text-right p-4 font-medium">المشاهدات</th>
                          <th className="text-right p-4 font-medium">آخر تحديث</th>
                          <th className="text-right p-4 font-medium">الإجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {streamingLinks.map((link) => (
                          <tr key={link.id} className="border-t">
                            <td className="p-4">
                              <div>
                                <div className="font-medium">{link.movieTitle}</div>
                                <div className="text-sm text-muted-foreground">
                                  ID: {link.movieId}
                                </div>
                              </div>
                            </td>
                            <td className="p-4">{link.serverName}</td>
                            <td className="p-4">
                              <span className={`quality-badge ${
                                link.quality === 'HD' ? 'quality-hd' : 
                                link.quality === 'FHD' ? 'quality-fhd' : 
                                'quality-4k'
                              }`}>
                                {link.quality}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(link.status)}
                                <span className="text-sm">
                                  {getStatusText(link.status)}
                                </span>
                              </div>
                            </td>
                            <td className="p-4">{link.views.toLocaleString('ar')}</td>
                            <td className="p-4 text-sm text-muted-foreground">
                              {new Date(link.lastUpdated).toLocaleDateString('ar-SA')}
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Suspense>
            </section>

            {/* Server Statistics */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">إحصائيات السيرفرات</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card rounded-lg border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        إجمالي السيرفرات
                      </p>
                      <p className="text-3xl font-bold">{servers.length}</p>
                    </div>
                    <Server className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>

                <div className="bg-card rounded-lg border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        السيرفرات النشطة
                      </p>
                      <p className="text-3xl font-bold text-green-600">
                        {servers.filter(s => s.status === 'active').length}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </div>

                <div className="bg-card rounded-lg border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        قيد الصيانة
                      </p>
                      <p className="text-3xl font-bold text-yellow-600">
                        {servers.filter(s => s.status === 'maintenance').length}
                      </p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>

                <div className="bg-card rounded-lg border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        روابط البث
                      </p>
                      <p className="text-3xl font-bold">{streamingLinks.length}</p>
                    </div>
                    <Link2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}