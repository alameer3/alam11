'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp, Users, Play, Clock, Download, Eye, Star, Activity, Calendar, Filter, Download as DownloadIcon } from 'lucide-react';

interface Metric {
  id: string;
  label: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: any;
  color: string;
}

interface ChartData {
  date: string;
  views: number;
  watchTime: number;
  downloads: number;
  revenue: number;
}

const mockMetrics: Metric[] = [
  {
    id: '1',
    label: 'Total Views',
    value: '2.4M',
    change: 12.5,
    changeType: 'increase',
    icon: Eye,
    color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
  },
  {
    id: '2',
    label: 'Watch Time',
    value: '156K hrs',
    change: 8.2,
    changeType: 'increase',
    icon: Clock,
    color: 'text-green-600 bg-green-100 dark:bg-green-900/30'
  },
  {
    id: '3',
    label: 'Active Users',
    value: '89.2K',
    change: -2.1,
    changeType: 'decrease',
    icon: Users,
    color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30'
  },
  {
    id: '4',
    label: 'Downloads',
    value: '45.7K',
    change: 15.3,
    changeType: 'increase',
    icon: Download,
    color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30'
  },
  {
    id: '5',
    label: 'Revenue',
    value: '$124.5K',
    change: 18.7,
    changeType: 'increase',
    icon: TrendingUp,
    color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30'
  },
  {
    id: '6',
    label: 'Avg Rating',
    value: '4.6/5',
    change: 0.2,
    changeType: 'increase',
    icon: Star,
    color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
  }
];

const mockChartData: ChartData[] = [
  { date: 'Jan 1', views: 45000, watchTime: 3200, downloads: 1200, revenue: 8500 },
  { date: 'Jan 2', views: 52000, watchTime: 3800, downloads: 1400, revenue: 9200 },
  { date: 'Jan 3', views: 48000, watchTime: 3500, downloads: 1300, revenue: 8800 },
  { date: 'Jan 4', views: 61000, watchTime: 4200, downloads: 1600, revenue: 10500 },
  { date: 'Jan 5', views: 55000, watchTime: 3900, downloads: 1500, revenue: 9800 },
  { date: 'Jan 6', views: 67000, watchTime: 4600, downloads: 1800, revenue: 11200 },
  { date: 'Jan 7', views: 72000, watchTime: 5100, downloads: 2000, revenue: 12500 }
];

const mockTopContent = [
  {
    id: '1',
    title: 'Breaking Bad',
    type: 'Series',
    views: 245000,
    watchTime: 18500,
    rating: 4.8,
    genre: 'Drama'
  },
  {
    id: '2',
    title: 'The Dark Knight',
    type: 'Movie',
    views: 189000,
    watchTime: 14200,
    rating: 4.7,
    genre: 'Action'
  },
  {
    id: '3',
    title: 'Stranger Things',
    type: 'Series',
    views: 167000,
    watchTime: 12800,
    rating: 4.6,
    genre: 'Sci-Fi'
  },
  {
    id: '4',
    title: 'Inception',
    type: 'Movie',
    views: 145000,
    watchTime: 11200,
    rating: 4.5,
    genre: 'Thriller'
  },
  {
    id: '5',
    title: 'Game of Thrones',
    type: 'Series',
    views: 134000,
    watchTime: 9800,
    rating: 4.4,
    genre: 'Fantasy'
  }
];

const mockUserDemographics = [
  { age: '18-24', percentage: 25, count: 22300 },
  { age: '25-34', percentage: 35, count: 31200 },
  { age: '35-44', percentage: 22, count: 19600 },
  { age: '45-54', percentage: 12, count: 10700 },
  { age: '55+', percentage: 6, count: 5400 }
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('views');

  const getMaxValue = (data: ChartData[], key: keyof ChartData) => {
    return Math.max(...data.map(item => item[key] as number));
  };

  const renderChartBar = (value: number, maxValue: number, color: string) => {
    const percentage = (value / maxValue) * 100;
    return (
      <div className="flex items-end h-32">
        <div
          className={`w-8 ${color} rounded-t transition-all duration-300 hover:opacity-80`}
          style={{ height: `${percentage}%` }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Analytics & Reports
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Track performance and insights
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                <DownloadIcon className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mockMetrics.map((metric) => (
            <div
              key={metric.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${metric.color}`}>
                  <metric.icon className="w-5 h-5" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.changeType === 'increase' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <Activity className="w-4 h-4" />
                  )}
                  <span>{metric.change}%</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {metric.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {metric.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Performance Overview
              </h2>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="views">Views</option>
                <option value="watchTime">Watch Time</option>
                <option value="downloads">Downloads</option>
                <option value="revenue">Revenue</option>
              </select>
            </div>
            <div className="flex items-end justify-between h-32">
              {mockChartData.map((data, index) => {
                const value = data[selectedMetric as keyof ChartData] as number;
                const maxValue = getMaxValue(mockChartData, selectedMetric as keyof ChartData);
                const color = selectedMetric === 'revenue' ? 'bg-emerald-500' : 
                             selectedMetric === 'downloads' ? 'bg-orange-500' :
                             selectedMetric === 'watchTime' ? 'bg-green-500' : 'bg-blue-500';
                
                return (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    {renderChartBar(value, maxValue, color)}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {data.date}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* User Demographics */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              User Demographics
            </h2>
            <div className="space-y-4">
              {mockUserDemographics.map((demo, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {demo.age}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-32">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${demo.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[60px]">
                      {demo.percentage}%
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 min-w-[80px]">
                      {demo.count.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Top Performing Content
            </h2>
            <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Content
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Watch Time (hrs)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Genre
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {mockTopContent.map((content) => (
                  <tr key={content.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded mr-3"></div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {content.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                        {content.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {content.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {content.watchTime.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {content.rating}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {content.genre}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Peak Hours */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Peak Viewing Hours
            </h3>
            <div className="space-y-3">
              {[
                { hour: '8 PM', percentage: 85 },
                { hour: '9 PM', percentage: 92 },
                { hour: '10 PM', percentage: 78 },
                { hour: '7 PM', percentage: 65 },
                { hour: '11 PM', percentage: 45 }
              ].map((peak, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {peak.hour}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${peak.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 w-8">
                      {peak.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device Usage */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Device Usage
            </h3>
            <div className="space-y-4">
              {[
                { device: 'Mobile', percentage: 45, color: 'bg-blue-500' },
                { device: 'Desktop', percentage: 35, color: 'bg-green-500' },
                { device: 'Tablet', percentage: 15, color: 'bg-purple-500' },
                { device: 'TV', percentage: 5, color: 'bg-orange-500' }
              ].map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {device.device}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${device.color}`}
                        style={{ width: `${device.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 w-8">
                      {device.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}