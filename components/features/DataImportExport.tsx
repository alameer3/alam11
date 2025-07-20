'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  Download, 
  FileText, 
  Database, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings,
  RefreshCw,
  Archive,
  Users,
  Video,
  Music,
  Image,
  Document,
  Cloud,
  HardDrive,
  Zap,
  History,
  Trash2,
  Eye,
  Lock,
  Globe
} from 'lucide-react';

interface ImportJob {
  id: string;
  name: string;
  type: 'import' | 'export';
  format: 'json' | 'csv' | 'xml' | 'excel' | 'zip';
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  totalItems: number;
  processedItems: number;
  createdAt: Date;
  completedAt?: Date;
  size: number;
  description: string;
  source: string;
  destination: string;
}

interface DataCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  size: number;
  lastUpdated: Date;
  isSelected: boolean;
}

interface ExportTemplate {
  id: string;
  name: string;
  description: string;
  format: string;
  categories: string[];
  isDefault: boolean;
  createdAt: Date;
}

export default function DataImportExport() {
  const [importJobs, setImportJobs] = useState<ImportJob[]>([
    {
      id: '1',
      name: 'User Data Import',
      type: 'import',
      format: 'json',
      status: 'completed',
      progress: 100,
      totalItems: 1250,
      processedItems: 1250,
      createdAt: new Date('2024-01-15T10:30:00'),
      completedAt: new Date('2024-01-15T10:35:00'),
      size: 45.2,
      description: 'Import user profiles and preferences',
      source: 'backup_2024_01_15.json',
      destination: 'users'
    },
    {
      id: '2',
      name: 'Content Export',
      type: 'export',
      format: 'csv',
      status: 'running',
      progress: 65,
      totalItems: 3200,
      processedItems: 2080,
      createdAt: new Date('2024-01-20T14:20:00'),
      size: 128.5,
      description: 'Export video metadata and analytics',
      source: 'content',
      destination: 'content_export_2024_01_20.csv'
    },
    {
      id: '3',
      name: 'Analytics Data Export',
      type: 'export',
      format: 'excel',
      status: 'pending',
      progress: 0,
      totalItems: 850,
      processedItems: 0,
      createdAt: new Date('2024-01-21T09:15:00'),
      size: 67.8,
      description: 'Export analytics and reporting data',
      source: 'analytics',
      destination: 'analytics_report_2024_01_21.xlsx'
    }
  ]);

  const [dataCategories, setDataCategories] = useState<DataCategory[]>([
    {
      id: 'users',
      name: 'User Data',
      icon: <Users className="h-4 w-4" />,
      count: 1250,
      size: 45.2,
      lastUpdated: new Date('2024-01-15'),
      isSelected: true
    },
    {
      id: 'videos',
      name: 'Video Content',
      icon: <Video className="h-4 w-4" />,
      count: 3200,
      size: 128.5,
      lastUpdated: new Date('2024-01-20'),
      isSelected: true
    },
    {
      id: 'audio',
      name: 'Audio Content',
      icon: <Music className="h-4 w-4" />,
      count: 850,
      size: 67.8,
      lastUpdated: new Date('2024-01-18'),
      isSelected: false
    },
    {
      id: 'images',
      name: 'Images',
      icon: <Image className="h-4 w-4" />,
      count: 2100,
      size: 89.3,
      lastUpdated: new Date('2024-01-19'),
      isSelected: false
    },
    {
      id: 'documents',
      name: 'Documents',
      icon: <Document className="h-4 w-4" />,
      count: 450,
      size: 23.1,
      lastUpdated: new Date('2024-01-16'),
      isSelected: false
    }
  ]);

  const [exportTemplates, setExportTemplates] = useState<ExportTemplate[]>([
    {
      id: '1',
      name: 'Full Backup',
      description: 'Complete system backup including all data',
      format: 'zip',
      categories: ['users', 'videos', 'audio', 'images', 'documents'],
      isDefault: true,
      createdAt: new Date('2024-01-10')
    },
    {
      id: '2',
      name: 'User Analytics',
      description: 'User data and analytics for reporting',
      format: 'excel',
      categories: ['users'],
      isDefault: false,
      createdAt: new Date('2024-01-12')
    },
    {
      id: '3',
      name: 'Content Summary',
      description: 'Content metadata and statistics',
      format: 'csv',
      categories: ['videos', 'audio', 'images'],
      isDefault: false,
      createdAt: new Date('2024-01-14')
    }
  ]);

  const [settings, setSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    backupTime: '02:00',
    compressionLevel: 'medium',
    encryption: true,
    cloudBackup: true,
    retentionDays: 30,
    maxFileSize: 1000, // MB
    parallelProcessing: true,
    validateData: true
  });

  const [stats, setStats] = useState({
    totalExports: 156,
    totalImports: 89,
    totalSize: 456.7, // GB
    lastBackup: new Date('2024-01-20T02:00:00'),
    nextBackup: new Date('2024-01-21T02:00:00'),
    successRate: 98.5,
    averageProcessingTime: 4.2 // minutes
  });

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'running':
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'running':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleCategorySelection = (id: string) => {
    setDataCategories(prev => prev.map(category => 
      category.id === id ? { ...category, isSelected: !category.isSelected } : category
    ));
  };

  const startExport = () => {
    const selectedCategories = dataCategories.filter(cat => cat.isSelected);
    if (selectedCategories.length === 0) {
      alert('Please select at least one category to export');
      return;
    }

    const newJob: ImportJob = {
      id: Date.now().toString(),
      name: `Export ${selectedCategories.map(cat => cat.name).join(', ')}`,
      type: 'export',
      format: 'zip',
      status: 'pending',
      progress: 0,
      totalItems: selectedCategories.reduce((acc, cat) => acc + cat.count, 0),
      processedItems: 0,
      createdAt: new Date(),
      size: selectedCategories.reduce((acc, cat) => acc + cat.size, 0),
      description: `Export of ${selectedCategories.length} categories`,
      source: selectedCategories.map(cat => cat.id).join(','),
      destination: `export_${Date.now()}.zip`
    };

    setImportJobs(prev => [newJob, ...prev]);
  };

  const cancelJob = (id: string) => {
    setImportJobs(prev => prev.map(job => 
      job.id === id ? { ...job, status: 'cancelled' } : job
    ));
  };

  const deleteJob = (id: string) => {
    setImportJobs(prev => prev.filter(job => job.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Data Import/Export</h1>
          <p className="text-muted-foreground">
            Manage data import and export operations with advanced scheduling and monitoring
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button className="flex items-center gap-2" onClick={startExport}>
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="jobs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                <RefreshCw className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {importJobs.filter(job => job.status === 'running').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {importJobs.filter(job => job.status === 'pending').length} pending
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Data</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalSize} GB</div>
                <p className="text-xs text-muted-foreground">
                  Across all categories
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.successRate}%</div>
                <p className="text-xs text-muted-foreground">
                  {stats.totalExports + stats.totalImports} total operations
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.averageProcessingTime}m</div>
                <p className="text-xs text-muted-foreground">
                  Per operation
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Import/Export Jobs</CardTitle>
              <CardDescription>
                Monitor and manage data import/export operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {importJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(job.status)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{job.name}</h4>
                          <Badge className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                          <Badge variant="outline">{job.format.toUpperCase()}</Badge>
                          <Badge variant="outline">{job.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{job.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                          <span>{job.processedItems} / {job.totalItems} items</span>
                          <span>{formatBytes(job.size * 1024 * 1024)}</span>
                          <span>{job.createdAt.toLocaleDateString()}</span>
                        </div>
                        {job.status === 'running' && (
                          <Progress value={job.progress} className="mt-2" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {job.status === 'running' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => cancelJob(job.id)}
                        >
                          Cancel
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteJob(job.id)}
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

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Categories</CardTitle>
              <CardDescription>
                Select categories for import/export operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {dataCategories.map((category) => (
                  <div 
                    key={category.id} 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      category.isSelected ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => toggleCategorySelection(category.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        category.isSelected ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        {category.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{category.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {category.count.toLocaleString()} items
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatBytes(category.size * 1024 * 1024)}</div>
                        <div className="text-xs text-muted-foreground">
                          {category.lastUpdated.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Export Templates</h3>
            <Button>Create Template</Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {exportTemplates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{template.name}</h4>
                    {template.isDefault && (
                      <Badge variant="default">Default</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge variant="outline">{template.format.toUpperCase()}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {template.categories.length} categories
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Created {template.createdAt.toLocaleDateString()}</span>
                    <Button variant="outline" size="sm">
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Operation History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Total Exports</span>
                  <span className="font-medium">{stats.totalExports}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total Imports</span>
                  <span className="font-medium">{stats.totalImports}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Success Rate</span>
                  <span className="font-medium text-green-600">{stats.successRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Avg Time</span>
                  <span className="font-medium">{stats.averageProcessingTime}m</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Data Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Video Content</span>
                  <span className="font-medium">28.1%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">User Data</span>
                  <span className="font-medium">9.9%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Audio Content</span>
                  <span className="font-medium">14.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Images</span>
                  <span className="font-medium">19.6%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Documents</span>
                  <span className="font-medium">5.1%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Other</span>
                  <span className="font-medium">22.5%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Backup Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Last Backup</span>
                  <span className="font-medium">{stats.lastBackup.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Next Backup</span>
                  <span className="font-medium">{stats.nextBackup.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Frequency</span>
                  <span className="font-medium">Daily</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Retention</span>
                  <span className="font-medium">30 days</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Import/Export Settings</CardTitle>
              <CardDescription>
                Configure data import and export preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Auto Backup</label>
                    <p className="text-xs text-muted-foreground">
                      Automatically backup data on schedule
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoBackup}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoBackup: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Data Encryption</label>
                    <p className="text-xs text-muted-foreground">
                      Encrypt exported data for security
                    </p>
                  </div>
                  <Switch
                    checked={settings.encryption}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, encryption: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Cloud Backup</label>
                    <p className="text-xs text-muted-foreground">
                      Store backups in cloud storage
                    </p>
                  </div>
                  <Switch
                    checked={settings.cloudBackup}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, cloudBackup: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Parallel Processing</label>
                    <p className="text-xs text-muted-foreground">
                      Process multiple operations simultaneously
                    </p>
                  </div>
                  <Switch
                    checked={settings.parallelProcessing}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, parallelProcessing: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Data Validation</label>
                    <p className="text-xs text-muted-foreground">
                      Validate data integrity during operations
                    </p>
                  </div>
                  <Switch
                    checked={settings.validateData}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, validateData: checked }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Backup Frequency</label>
                  <select 
                    className="mt-2 w-full p-2 border rounded-md"
                    value={settings.backupFrequency}
                    onChange={(e) => setSettings(prev => ({ ...prev, backupFrequency: e.target.value }))}
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Backup Time</label>
                  <input
                    type="time"
                    className="mt-2 w-full p-2 border rounded-md"
                    value={settings.backupTime}
                    onChange={(e) => setSettings(prev => ({ ...prev, backupTime: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Compression Level</label>
                  <select 
                    className="mt-2 w-full p-2 border rounded-md"
                    value={settings.compressionLevel}
                    onChange={(e) => setSettings(prev => ({ ...prev, compressionLevel: e.target.value }))}
                  >
                    <option value="low">Low (Fast)</option>
                    <option value="medium">Medium (Balanced)</option>
                    <option value="high">High (Small Size)</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Retention Period (Days)</label>
                  <input
                    type="number"
                    className="mt-2 w-full p-2 border rounded-md"
                    value={settings.retentionDays}
                    onChange={(e) => setSettings(prev => ({ ...prev, retentionDays: parseInt(e.target.value) }))}
                    min="1"
                    max="365"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Max File Size (MB)</label>
                  <input
                    type="number"
                    className="mt-2 w-full p-2 border rounded-md"
                    value={settings.maxFileSize}
                    onChange={(e) => setSettings(prev => ({ ...prev, maxFileSize: parseInt(e.target.value) }))}
                    min="1"
                    max="10000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}