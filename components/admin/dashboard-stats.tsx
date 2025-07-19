"use client"

import { Film, Tv, Users, Eye } from 'lucide-react'

// Mock data - replace with real data from database
const stats = [
  {
    title: 'إجمالي الأفلام',
    value: '1,234',
    change: '+12',
    changeType: 'increase' as const,
    icon: Film
  },
  {
    title: 'إجمالي المسلسلات',
    value: '567',
    change: '+8',
    changeType: 'increase' as const,
    icon: Tv
  },
  {
    title: 'المستخدمين النشطين',
    value: '12,345',
    change: '+234',
    changeType: 'increase' as const,
    icon: Users
  },
  {
    title: 'المشاهدات اليوم',
    value: '45,678',
    change: '+1,234',
    changeType: 'increase' as const,
    icon: Eye
  }
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-card rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span
              className={`text-sm font-medium ${
                stat.changeType === 'increase'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {stat.change}
            </span>
            <span className="text-sm text-muted-foreground mr-2">
              منذ الشهر الماضي
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}