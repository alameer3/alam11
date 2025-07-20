'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  Pause, 
  Play, 
  Trash2, 
  Settings, 
  Clock, 
  Wifi, 
  HardDrive,
  Smartphone,
  Monitor,
  Zap,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface DownloadItem {
  id: string;
  title: string;
  size: number;
  progress: number;
  status: 'queued' | 'downloading' | 'paused' | 'completed' | 'error';
  priority: 'high' | 'normal' | 'low';
  type: 'video' | 'audio' | 'document' | 'image';
  estimatedTime: number;
  speed: number;
  url: string;
}

interface Device {
  id: string;
  name: string;
  type: 'mobile' | 'desktop' | 'tablet';
  storage: number;
  usedStorage: number;
  bandwidth: number;
  isOnline: boolean;
}

export default function SmartDownloads() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([
    {
      id: '1',
      title: 'Premium Movie Collection',
      size: 2048576, // 2GB
      progress: 65,
      status: 'downloading',
      priority: 'high',
      type: 'video',
      estimatedTime: 1800, // 30 minutes
      speed: 1024, // 1MB/s
      url: 'https://example.com/movie.mp4'
    },
    {
      id: '2',
      title: 'Podcast Episode 45',
      size: 51200, // 50MB
      progress: 100,
      status: 'completed',
      priority: 'normal',
      type: 'audio',
      estimatedTime: 0,
      speed: 0,
      url: 'https://example.com/podcast.mp3'
    },
    {
      id: '3',
      title: 'Documentation PDF',
      size: 10240, // 10MB
      progress: 0,
      status: 'queued',
      priority: 'low',
      type: 'document',
      estimatedTime: 300, // 5 minutes
      speed: 0,
      url: 'https://example.com/docs.pdf'
    }
  ]);

  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'iPhone 15 Pro',
      type: 'mobile',
      storage: 128000, // 128GB
      usedStorage: 85000, // 85GB
      bandwidth: 1024, // 1MB/s
      isOnline: true
    },
    {
      id: '2',
      name: 'MacBook Pro',
      type: 'desktop',
      storage: 512000, // 512GB
      usedStorage: 320000, // 320GB
      bandwidth: 5120, // 5MB/s
      isOnline: true
    }
  ]);

  const [settings, setSettings] = useState({
    autoDownload: true,
    smartQueue: true,
    bandwidthLimit: 80,
    storageThreshold: 90,
    downloadQuality: 'auto',
    scheduleDownloads: false,
    downloadTime: '02:00',
    maxConcurrent: 3
  });

  const [stats, setStats] = useState({
    totalDownloads: 156,
    completedDownloads: 142,
    failedDownloads: 8,
    totalBandwidth: 45.2, // GB
    averageSpeed: 2.1, // MB/s
    storageUsed: 68.5 // GB
  });

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (seconds: number) => {
    if (seconds === 0) return 'Completed';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'downloading':
        return <Download className="h-4 w-4 text-blue-500" />;
      case 'paused':
        return <Pause className="h-4 w-4 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'normal':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleDownload = (id: string) => {
    setDownloads(prev => prev.map(download => 
      download.id === id 
        ? { ...download, status: download.status === 'downloading' ? 'paused' : 'downloading' }
        : download
    ));
  };

  const removeDownload = (id: string) => {
    setDownloads(prev => prev.filter(download => download.id !== id));
  };

  const changePriority = (id: string, priority: 'high' | 'normal' | 'low') => {
    setDownloads(prev => prev.map(download => 
      download.id === id ? { ...download, priority } : download
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Smart Downloads</h1>
          <p className="text-muted-foreground">
            Intelligent download management with queue optimization and bandwidth control
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Add Download
        </Button>
      </div>

      <Tabs defaultValue="downloads" className="space-y-4">
        <TabsList>
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="downloads" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Downloads</CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {downloads.filter(d => d.status === 'downloading').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {downloads.filter(d => d.status === 'queued').length} in queue
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bandwidth Usage</CardTitle>
                <Wifi className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{settings.bandwidthLimit}%</div>
                <p className="text-xs text-muted-foreground">
                  {formatBytes(downloads.reduce((acc, d) => acc + d.speed, 0))}/s
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                <HardDrive className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.storageUsed} GB</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((stats.storageUsed / 100) * 100)}% of available
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round((stats.completedDownloads / stats.totalDownloads) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {stats.completedDownloads} of {stats.totalDownloads}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Download Queue</CardTitle>
              <CardDescription>
                Manage your downloads with smart queue optimization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {downloads.map((download) => (
                  <div key={download.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(download.status)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{download.title}</h4>
                          <Badge className={getPriorityColor(download.priority)}>
                            {download.priority}
                          </Badge>
                          <Badge variant="outline">{download.type}</Badge>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                          <span>{formatBytes(download.size)}</span>
                          <span>{download.speed > 0 ? `${formatBytes(download.speed)}/s` : 'Queued'}</span>
                          <span>{formatTime(download.estimatedTime)}</span>
                        </div>
                        <Progress value={download.progress} className="mt-2" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleDownload(download.id)}
                      >
                        {download.status === 'downloading' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeDownload(download.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connected Devices</CardTitle>
              <CardDescription>
                Manage downloads across your devices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {devices.map((device) => (
                  <div key={device.id} className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {device.type === 'mobile' ? (
                        <Smartphone className="h-6 w-6 text-blue-500" />
                      ) : device.type === 'desktop' ? (
                        <Monitor className="h-6 w-6 text-green-500" />
                      ) : (
                        <Monitor className="h-6 w-6 text-purple-500" />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium">{device.name}</h4>
                        <p className="text-sm text-muted-foreground capitalize">{device.type}</p>
                      </div>
                      <Badge variant={device.isOnline ? "default" : "secondary"}>
                        {device.isOnline ? 'Online' : 'Offline'}
                      </Badge>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Storage</span>
                        <span>{formatBytes(device.usedStorage)} / {formatBytes(device.storage)}</span>
                      </div>
                      <Progress 
                        value={(device.usedStorage / device.storage) * 100} 
                        className="h-2" 
                      />
                      <div className="flex justify-between text-sm">
                        <span>Bandwidth</span>
                        <span>{formatBytes(device.bandwidth)}/s</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Download Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Total Downloads</span>
                  <span className="font-medium">{stats.totalDownloads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Completed</span>
                  <span className="font-medium text-green-600">{stats.completedDownloads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Failed</span>
                  <span className="font-medium text-red-600">{stats.failedDownloads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Success Rate</span>
                  <span className="font-medium">
                    {Math.round((stats.completedDownloads / stats.totalDownloads) * 100)}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Bandwidth Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Total Used</span>
                  <span className="font-medium">{stats.totalBandwidth} GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Average Speed</span>
                  <span className="font-medium">{stats.averageSpeed} MB/s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Peak Speed</span>
                  <span className="font-medium">5.2 MB/s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Efficiency</span>
                  <span className="font-medium text-green-600">94%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Storage Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Used Storage</span>
                  <span className="font-medium">{stats.storageUsed} GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Available</span>
                  <span className="font-medium">31.5 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Usage</span>
                  <span className="font-medium">68.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Cleanup Needed</span>
                  <span className="font-medium text-yellow-600">12.3 GB</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Download Settings</CardTitle>
              <CardDescription>
                Configure smart download preferences and optimization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Auto Download</label>
                    <p className="text-xs text-muted-foreground">
                      Automatically download recommended content
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoDownload}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoDownload: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Smart Queue</label>
                    <p className="text-xs text-muted-foreground">
                      Optimize download order based on priority and bandwidth
                    </p>
                  </div>
                  <Switch
                    checked={settings.smartQueue}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, smartQueue: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Schedule Downloads</label>
                    <p className="text-xs text-muted-foreground">
                      Download during off-peak hours
                    </p>
                  </div>
                  <Switch
                    checked={settings.scheduleDownloads}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, scheduleDownloads: checked }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Bandwidth Limit</label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Slider
                      value={[settings.bandwidthLimit]}
                      onValueChange={(value) => setSettings(prev => ({ ...prev, bandwidthLimit: value[0] }))}
                      max={100}
                      step={5}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-12">{settings.bandwidthLimit}%</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Storage Threshold</label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Slider
                      value={[settings.storageThreshold]}
                      onValueChange={(value) => setSettings(prev => ({ ...prev, storageThreshold: value[0] }))}
                      max={100}
                      step={5}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-12">{settings.storageThreshold}%</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Max Concurrent Downloads</label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Slider
                      value={[settings.maxConcurrent]}
                      onValueChange={(value) => setSettings(prev => ({ ...prev, maxConcurrent: value[0] }))}
                      max={10}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-12">{settings.maxConcurrent}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Download Quality</label>
                  <select 
                    className="mt-2 w-full p-2 border rounded-md"
                    value={settings.downloadQuality}
                    onChange={(e) => setSettings(prev => ({ ...prev, downloadQuality: e.target.value }))}
                  >
                    <option value="auto">Auto (Recommended)</option>
                    <option value="high">High Quality</option>
                    <option value="medium">Medium Quality</option>
                    <option value="low">Low Quality</option>
                  </select>
                </div>

                {settings.scheduleDownloads && (
                  <div>
                    <label className="text-sm font-medium">Download Time</label>
                    <input
                      type="time"
                      className="mt-2 w-full p-2 border rounded-md"
                      value={settings.downloadTime}
                      onChange={(e) => setSettings(prev => ({ ...prev, downloadTime: e.target.value }))}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}