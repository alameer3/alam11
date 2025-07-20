'use client'

import { useState } from 'react'
import { 
  Users, 
  Film, 
  Tv, 
  Eye, 
  Download, 
  Star, 
  TrendingUp, 
  TrendingDown,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Calendar,
  BarChart3,
  Settings,
  UserPlus,
  Upload,
  Edit,
  Trash2,
  MoreHorizontal,
  Search,
  Filter,
  ChevronDown,
  MessageSquare,
  CreditCard,
  Bell,
  FileText
} from 'lucide-react'
import AnalyticsSystem from '@/components/ui/AnalyticsSystem';
import DownloadSystem from '@/components/ui/DownloadSystem';
import SiteSettings from '@/components/ui/SiteSettings';
import ReportingSystem from '@/components/ui/ReportingSystem';
import SupportSystem from '@/components/ui/SupportSystem';
import UserProfile from '@/components/ui/UserProfile';
import ContentManagement from '@/components/ui/ContentManagement';
import SubscriptionSystem from '@/components/ui/SubscriptionSystem';
import NotificationSystem from '@/components/ui/NotificationSystem';

// Mock admin data
const adminData = {
  stats: {
    totalUsers: 15420,
    totalMovies: 2847,
    totalSeries: 1256,
    totalShows: 892,
    totalViews: 2847500,
    totalDownloads: 456200,
    avgRating: 8.4,
    activeUsers: 3240
  },
  recentActivity: [
    {
      id: 1,
      type: 'user',
      action: 'New user registered',
      user: 'john.doe@example.com',
      time: '2 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'content',
      action: 'New movie uploaded',
      user: 'admin@example.com',
      time: '15 minutes ago',
      status: 'success'
    },
    {
      id: 3,
      type: 'system',
      action: 'Server maintenance completed',
      user: 'system',
      time: '1 hour ago',
      status: 'info'
    },
    {
      id: 4,
      type: 'error',
      action: 'Upload failed',
      user: 'content@example.com',
      time: '2 hours ago',
      status: 'error'
    }
  ],
  topContent: [
    {
      id: 1,
      title: 'Breaking Bad',
      type: 'series',
      views: 2500000,
      rating: 9.5,
      uploadDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'The Dark Knight',
      type: 'movie',
      views: 1800000,
      rating: 9.0,
      uploadDate: '2024-01-10'
    },
    {
      id: 3,
      title: 'Game of Thrones',
      type: 'series',
      views: 3200000,
      rating: 9.3,
      uploadDate: '2024-01-08'
    }
  ],
  systemStatus: {
    server: 'Online',
    database: 'Online',
    storage: 'Online',
    cdn: 'Online',
    uptime: '99.9%',
    lastBackup: '2 hours ago'
  }
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedPeriod, setSelectedPeriod] = useState('7d')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-400'
      case 'error': return 'text-red-400'
      case 'info': return 'text-blue-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'error': return <AlertCircle className="w-4 h-4 text-red-400" />
      case 'info': return <Activity className="w-4 h-4 text-blue-400" />
      default: return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-gray-400">Manage your streaming platform</p>
            </div>
            
            <div className="flex items-center gap-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-700 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'content', label: 'Content', icon: Film },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'downloads', label: 'Downloads', icon: Download },
              { id: 'reports', label: 'Reports', icon: FileText },
              { id: 'settings', label: 'Settings', icon: Settings },
              { id: 'system', label: 'System', icon: Activity },
              { id: 'support', label: 'Support', icon: MessageSquare },
              { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
              { id: 'notifications', label: 'Notifications', icon: Bell }
            ].map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-gray-300 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Users</p>
                      <p className="text-2xl font-bold">{adminData.stats.totalUsers.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-blue-600 rounded-lg">
                      <Users className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">+12.5%</span>
                    <span className="text-gray-400">from last month</span>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Views</p>
                      <p className="text-2xl font-bold">{adminData.stats.totalViews.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-green-600 rounded-lg">
                      <Eye className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">+8.3%</span>
                    <span className="text-gray-400">from last month</span>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Content</p>
                      <p className="text-2xl font-bold">{adminData.stats.totalMovies + adminData.stats.totalSeries + adminData.stats.totalShows}</p>
                    </div>
                    <div className="p-3 bg-purple-600 rounded-lg">
                      <Film className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">+5.2%</span>
                    <span className="text-gray-400">from last month</span>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Avg Rating</p>
                      <p className="text-2xl font-bold">{adminData.stats.avgRating}</p>
                    </div>
                    <div className="p-3 bg-yellow-600 rounded-lg">
                      <Star className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">+0.2</span>
                    <span className="text-gray-400">from last month</span>
                  </div>
                </div>
              </div>

              {/* Content Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Content Breakdown</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>Movies</span>
                      </div>
                      <span className="font-semibold">{adminData.stats.totalMovies}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Series</span>
                      </div>
                      <span className="font-semibold">{adminData.stats.totalSeries}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span>Shows</span>
                      </div>
                      <span className="font-semibold">{adminData.stats.totalShows}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">System Status</h3>
                  <div className="space-y-3">
                    {Object.entries(adminData.systemStatus).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${value === 'Online' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                          <span className={value === 'Online' ? 'text-green-400' : 'text-red-400'}>{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                      <UserPlus className="w-4 h-4" />
                      <span>Add User</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>Upload Content</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                      <Settings className="w-4 h-4" />
                      <span>System Settings</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Activity & Top Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {adminData.recentActivity.map(activity => (
                      <div key={activity.id} className="flex items-start gap-3">
                        {getStatusIcon(activity.status)}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-gray-400">{activity.user} • {activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Top Content</h3>
                  <div className="space-y-4">
                    {adminData.topContent.map(content => (
                      <div key={content.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{content.title}</p>
                          <p className="text-sm text-gray-400">{content.type} • {content.views.toLocaleString()} views</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm">{content.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">User Management</h2>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </button>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4">User</th>
                        <th className="text-left py-3 px-4">Email</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Joined</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4, 5].map(user => (
                        <tr key={user} className="border-b border-gray-700 hover:bg-gray-700">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                              <span>User {user}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">user{user}@example.com</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-green-900 text-green-400 rounded text-xs">Active</span>
                          </td>
                          <td className="py-3 px-4">2024-01-{user.toString().padStart(2, '0')}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <button className="p-1 hover:bg-gray-600 rounded">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-1 hover:bg-gray-600 rounded">
                                <Trash2 className="w-4 h-4 text-red-400" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Content Management</h2>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Content
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Film className="w-6 h-6 text-blue-400" />
                    <h3 className="text-lg font-semibold">Movies</h3>
                  </div>
                  <p className="text-3xl font-bold mb-2">{adminData.stats.totalMovies}</p>
                  <p className="text-gray-400 text-sm">Total movies uploaded</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Tv className="w-6 h-6 text-green-400" />
                    <h3 className="text-lg font-semibold">Series</h3>
                  </div>
                  <p className="text-3xl font-bold mb-2">{adminData.stats.totalSeries}</p>
                  <p className="text-gray-400 text-sm">Total series uploaded</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Tv className="w-6 h-6 text-purple-400" />
                    <h3 className="text-lg font-semibold">Shows</h3>
                  </div>
                  <p className="text-3xl font-bold mb-2">{adminData.stats.totalShows}</p>
                  <p className="text-gray-400 text-sm">Total shows uploaded</p>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Uploads</h3>
                <div className="space-y-4">
                  {adminData.topContent.map(content => (
                    <div key={content.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-600 rounded"></div>
                        <div>
                          <p className="font-medium">{content.title}</p>
                          <p className="text-sm text-gray-400">{content.type} • {content.views.toLocaleString()} views</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-600 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-gray-600 rounded">
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="bg-gray-50 dark:bg-gray-900">
              <AnalyticsSystem />
            </div>
          )}

          {activeTab === 'downloads' && (
            <div className="bg-gray-50 dark:bg-gray-900">
              <DownloadSystem />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-gray-50 dark:bg-gray-900">
              <SiteSettings />
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="bg-gray-50 dark:bg-gray-900">
              <ReportingSystem />
            </div>
          )}

          {activeTab === 'system' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">System Monitoring</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">System Status</h3>
                  <div className="space-y-4">
                    {Object.entries(adminData.systemStatus).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${value === 'Online' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                          <span className={value === 'Online' ? 'text-green-400' : 'text-red-400'}>{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>CPU Usage</span>
                      <span className="font-semibold">45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Memory Usage</span>
                      <span className="font-semibold">62%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Disk Usage</span>
                      <span className="font-semibold">78%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Network Load</span>
                      <span className="font-semibold">34%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'support' && (
            <div className="bg-gray-50 dark:bg-gray-900">
              <SupportSystem />
            </div>
          )}

          {activeTab === 'subscriptions' && (
            <div className="bg-gray-50 dark:bg-gray-900">
              <SubscriptionSystem />
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-gray-50 dark:bg-gray-900">
              <NotificationSystem />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}