import { Suspense } from 'react'
import { Header } from '@/components/layout/header'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { DashboardStats } from '@/components/admin/dashboard-stats'
import { RecentActivity } from '@/components/admin/recent-activity'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <AdminSidebar />
        
        <main className="flex-1 p-6">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">لوحة التحكم</h1>
            <p className="text-muted-foreground">
              مرحباً بك في لوحة التحكم الخاصة بإدارة الموقع
            </p>
          </div>

          {/* Stats Section */}
          <Suspense fallback={<LoadingSpinner />}>
            <DashboardStats />
          </Suspense>

          {/* Recent Activity */}
          <div className="mt-8">
            <Suspense fallback={<LoadingSpinner />}>
              <RecentActivity />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}