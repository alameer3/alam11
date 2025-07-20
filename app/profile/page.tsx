'use client'

import { useState } from 'react'
import { 
  User, 
  Settings, 
  Heart, 
  Bookmark, 
  History, 
  Download, 
  Star, 
  Eye,
  Edit,
  Camera,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Play,
  Clock,
  Calendar,
  Filter,
  Grid,
  List
} from 'lucide-react'

// Mock user data
const userData = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  username: "johndoe",
  avatar: "/api/placeholder/150/150",
  joinDate: "2023-01-15",
  totalWatched: 1250,
  totalFavorites: 89,
  totalDownloads: 45,
  membership: "Premium",
  watchHistory: [
    {
      id: 1,
      title: "Breaking Bad",
      type: "series",
      episode: "S01E01 - Pilot",
      poster: "/api/placeholder/200/300",
      progress: 85,
      lastWatched: "2024-01-20T10:30:00Z",
      duration: "58 min",
      rating: 9.5
    },
    {
      id: 2,
      title: "The Dark Knight",
      type: "movie",
      poster: "/api/placeholder/200/300",
      progress: 100,
      lastWatched: "2024-01-19T15:45:00Z",
      duration: "152 min",
      rating: 9.0
    },
    {
      id: 3,
      title: "The Tonight Show",
      type: "show",
      episode: "Episode 1 - Tom Hanks & Lady Gaga",
      poster: "/api/placeholder/200/300",
      progress: 60,
      lastWatched: "2024-01-18T20:15:00Z",
      duration: "60 min",
      rating: 8.5
    }
  ],
  favorites: [
    {
      id: 1,
      title: "Breaking Bad",
      type: "series",
      poster: "/api/placeholder/200/300",
      rating: 9.5,
      year: 2008,
      addedDate: "2024-01-10"
    },
    {
      id: 2,
      title: "The Dark Knight",
      type: "movie",
      poster: "/api/placeholder/200/300",
      rating: 9.0,
      year: 2008,
      addedDate: "2024-01-08"
    },
    {
      id: 3,
      title: "Game of Thrones",
      type: "series",
      poster: "/api/placeholder/200/300",
      rating: 9.3,
      year: 2011,
      addedDate: "2024-01-05"
    }
  ],
  downloads: [
    {
      id: 1,
      title: "Breaking Bad S01E01",
      type: "episode",
      poster: "/api/placeholder/200/300",
      size: "1.2 GB",
      downloadDate: "2024-01-15",
      quality: "1080p"
    },
    {
      id: 2,
      title: "The Dark Knight",
      type: "movie",
      poster: "/api/placeholder/200/300",
      size: "2.8 GB",
      downloadDate: "2024-01-12",
      quality: "1080p"
    }
  ]
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [editMode, setEditMode] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    return formatDate(dateString)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Profile Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <img 
                src={userData.avatar} 
                alt={userData.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold">{userData.name}</h1>
                <button 
                  onClick={() => setEditMode(!editMode)}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-400 mb-2">@{userData.username}</p>
              <p className="text-gray-400 mb-4">Member since {formatDate(userData.joinDate)}</p>
              
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{userData.totalWatched} watched</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span className="text-gray-300">{userData.totalFavorites} favorites</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300">{userData.totalDownloads} downloads</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300">{userData.membership}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="border-b border-gray-700 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'history', label: 'Watch History', icon: History },
              { id: 'favorites', label: 'Favorites', icon: Heart },
              { id: 'downloads', label: 'Downloads', icon: Download },
              { id: 'settings', label: 'Settings', icon: Settings }
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {userData.watchHistory.slice(0, 5).map(item => (
                    <div key={item.id} className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <img 
                          src={item.poster} 
                          alt={item.title}
                          className="w-16 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold mb-1">{item.title}</h4>
                              {item.episode && (
                                <p className="text-gray-400 text-sm mb-1">{item.episode}</p>
                              )}
                              <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                                <span>{item.duration}</span>
                                <span>•</span>
                                <span>{formatTimeAgo(item.lastWatched)}</span>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-400" />
                                  <span>{item.rating}</span>
                                </div>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-red-600 h-2 rounded-full" 
                                  style={{ width: `${item.progress}%` }}
                                />
                              </div>
                              <p className="text-xs text-gray-400 mt-1">{item.progress}% watched</p>
                            </div>
                            <button className="p-2 bg-red-600 hover:bg-red-700 rounded">
                              <Play className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-6">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h4 className="font-semibold mb-4">This Month</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Hours Watched</span>
                        <span className="font-semibold">45.2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Movies</span>
                        <span className="font-semibold">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Episodes</span>
                        <span className="font-semibold">28</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Shows</span>
                        <span className="font-semibold">5</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h4 className="font-semibold mb-4">Favorite Genres</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Drama</span>
                        <span className="font-semibold">35%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Action</span>
                        <span className="font-semibold">25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Comedy</span>
                        <span className="font-semibold">20%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Thriller</span>
                        <span className="font-semibold">15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Other</span>
                        <span className="font-semibold">5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Watch History</h3>
                <div className="flex items-center gap-4">
                  <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded">
                    <Filter className="w-4 h-4" />
                  </button>
                  <div className="flex bg-gray-700 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-600' : ''}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-600' : ''}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {userData.watchHistory.map(item => (
                    <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors">
                      <div className="relative">
                        <img 
                          src={item.poster} 
                          alt={item.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <button className="p-1 bg-black bg-opacity-50 rounded">
                            <Play className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                          <div className="w-full bg-gray-700 rounded-full h-1">
                            <div 
                              className="bg-red-600 h-1 rounded-full" 
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-semibold text-sm mb-1 truncate">{item.title}</h4>
                        {item.episode && (
                          <p className="text-gray-400 text-xs mb-1 truncate">{item.episode}</p>
                        )}
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>{formatTimeAgo(item.lastWatched)}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400" />
                            <span>{item.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {userData.watchHistory.map(item => (
                    <div key={item.id} className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <img 
                          src={item.poster} 
                          alt={item.title}
                          className="w-20 h-28 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold mb-1">{item.title}</h4>
                              {item.episode && (
                                <p className="text-gray-400 text-sm mb-2">{item.episode}</p>
                              )}
                              <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                                <span>{item.duration}</span>
                                <span>•</span>
                                <span>{formatTimeAgo(item.lastWatched)}</span>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-400" />
                                  <span>{item.rating}</span>
                                </div>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-red-600 h-2 rounded-full" 
                                  style={{ width: `${item.progress}%` }}
                                />
                              </div>
                              <p className="text-xs text-gray-400 mt-1">{item.progress}% watched</p>
                            </div>
                            <button className="p-2 bg-red-600 hover:bg-red-700 rounded">
                              <Play className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'favorites' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">My Favorites</h3>
                <div className="flex items-center gap-4">
                  <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded">
                    <Filter className="w-4 h-4" />
                  </button>
                  <div className="flex bg-gray-700 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-600' : ''}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-600' : ''}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {userData.favorites.map(item => (
                    <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors">
                      <img 
                        src={item.poster} 
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-3">
                        <h4 className="font-semibold text-sm mb-1 truncate">{item.title}</h4>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>{item.year}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400" />
                            <span>{item.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Added {formatDate(item.addedDate)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {userData.favorites.map(item => (
                    <div key={item.id} className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <img 
                          src={item.poster} 
                          alt={item.title}
                          className="w-20 h-28 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold mb-1">{item.title}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                                <span>{item.year}</span>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-400" />
                                  <span>{item.rating}</span>
                                </div>
                                <span>•</span>
                                <span>Added {formatDate(item.addedDate)}</span>
                              </div>
                            </div>
                            <button className="p-2 bg-red-600 hover:bg-red-700 rounded">
                              <Play className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'downloads' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Downloads</h3>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium">
                  Manage Downloads
                </button>
              </div>

              <div className="space-y-4">
                {userData.downloads.map(item => (
                  <div key={item.id} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <img 
                        src={item.poster} 
                        alt={item.title}
                        className="w-20 h-28 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold mb-1">{item.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                              <span>{item.size}</span>
                              <span>•</span>
                              <span>{item.quality}</span>
                              <span>•</span>
                              <span>Downloaded {formatDate(item.downloadDate)}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-2 bg-red-600 hover:bg-red-700 rounded">
                              <Play className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-2xl">
              <h3 className="text-xl font-semibold mb-6">Account Settings</h3>
              
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h4 className="font-semibold mb-4">Profile Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                      <input 
                        type="text" 
                        defaultValue={userData.name}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input 
                        type="email" 
                        defaultValue={userData.email}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                      <input 
                        type="text" 
                        defaultValue={userData.username}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h4 className="font-semibold mb-4">Preferences</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Email Notifications</h5>
                        <p className="text-sm text-gray-400">Receive email updates about new content</p>
                      </div>
                      <button className="w-12 h-6 bg-gray-700 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Push Notifications</h5>
                        <p className="text-sm text-gray-400">Receive push notifications on your device</p>
                      </div>
                      <button className="w-12 h-6 bg-red-600 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Auto-play</h5>
                        <p className="text-sm text-gray-400">Automatically play next episode</p>
                      </div>
                      <button className="w-12 h-6 bg-red-600 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h4 className="font-semibold mb-4">Account Actions</h4>
                  <div className="space-y-3">
                    <button className="flex items-center gap-3 w-full p-3 text-left hover:bg-gray-700 rounded-lg transition-colors">
                      <Shield className="w-5 h-5 text-gray-400" />
                      <span>Privacy Settings</span>
                    </button>
                    <button className="flex items-center gap-3 w-full p-3 text-left hover:bg-gray-700 rounded-lg transition-colors">
                      <HelpCircle className="w-5 h-5 text-gray-400" />
                      <span>Help & Support</span>
                    </button>
                    <button className="flex items-center gap-3 w-full p-3 text-left hover:bg-gray-700 rounded-lg transition-colors">
                      <LogOut className="w-5 h-5 text-red-400" />
                      <span className="text-red-400">Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}