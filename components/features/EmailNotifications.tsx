'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mail, 
  Send, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Settings,
  Users,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Copy,
  Download,
  Upload,
  Calendar,
  Bell,
  MessageSquare,
  TrendingUp,
  BarChart3,
  Filter,
  Search,
  Plus,
  Archive,
  Star,
  Tag
} from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  category: 'welcome' | 'notification' | 'marketing' | 'system' | 'custom';
  isActive: boolean;
  variables: string[];
  createdAt: Date;
  lastUsed: Date;
  usageCount: number;
}

interface EmailCampaign {
  id: string;
  name: string;
  template: string;
  status: 'draft' | 'scheduled' | 'sending' | 'completed' | 'paused' | 'cancelled';
  recipients: number;
  sent: number;
  opened: number;
  clicked: number;
  bounced: number;
  scheduledAt?: Date;
  sentAt?: Date;
  createdAt: Date;
  subject: string;
  category: string;
}

interface EmailStats {
  totalSent: number;
  totalOpened: number;
  totalClicked: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  averageDeliveryTime: number;
  topTemplates: Array<{ name: string; count: number }>;
}

interface NotificationSettings {
  welcomeEmails: boolean;
  passwordReset: boolean;
  accountUpdates: boolean;
  contentNotifications: boolean;
  marketingEmails: boolean;
  systemAlerts: boolean;
  digestFrequency: 'daily' | 'weekly' | 'monthly' | 'never';
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
  language: string;
  timezone: string;
}

export default function EmailNotifications() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'Welcome Email',
      subject: 'Welcome to {platform_name}!',
      content: 'Hi {user_name}, welcome to {platform_name}! We\'re excited to have you on board.',
      category: 'welcome',
      isActive: true,
      variables: ['user_name', 'platform_name'],
      createdAt: new Date('2024-01-10'),
      lastUsed: new Date('2024-01-20'),
      usageCount: 1250
    },
    {
      id: '2',
      name: 'Password Reset',
      subject: 'Reset your password',
      content: 'Click the link below to reset your password: {reset_link}',
      category: 'system',
      isActive: true,
      variables: ['reset_link'],
      createdAt: new Date('2024-01-12'),
      lastUsed: new Date('2024-01-19'),
      usageCount: 89
    },
    {
      id: '3',
      name: 'New Content Alert',
      subject: 'New {content_type} available: {content_title}',
      content: 'Check out the latest {content_type}: {content_title}. Click here to watch: {content_link}',
      category: 'notification',
      isActive: true,
      variables: ['content_type', 'content_title', 'content_link'],
      createdAt: new Date('2024-01-15'),
      lastUsed: new Date('2024-01-21'),
      usageCount: 567
    }
  ]);

  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([
    {
      id: '1',
      name: 'Welcome Series',
      template: 'Welcome Email',
      status: 'completed',
      recipients: 1250,
      sent: 1250,
      opened: 987,
      clicked: 234,
      bounced: 12,
      sentAt: new Date('2024-01-20T10:00:00'),
      createdAt: new Date('2024-01-19'),
      subject: 'Welcome to our platform!',
      category: 'welcome'
    },
    {
      id: '2',
      name: 'Weekly Digest',
      template: 'Content Digest',
      status: 'sending',
      recipients: 5000,
      sent: 3200,
      opened: 0,
      clicked: 0,
      bounced: 45,
      createdAt: new Date('2024-01-21T08:00:00'),
      subject: 'Your weekly content digest',
      category: 'notification'
    },
    {
      id: '3',
      name: 'Product Update',
      template: 'System Update',
      status: 'scheduled',
      recipients: 8000,
      sent: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
      scheduledAt: new Date('2024-01-22T14:00:00'),
      createdAt: new Date('2024-01-21T16:00:00'),
      subject: 'Important platform updates',
      category: 'system'
    }
  ]);

  const [settings, setSettings] = useState<NotificationSettings>({
    welcomeEmails: true,
    passwordReset: true,
    accountUpdates: true,
    contentNotifications: true,
    marketingEmails: false,
    systemAlerts: true,
    digestFrequency: 'weekly',
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '08:00'
    },
    language: 'en',
    timezone: 'UTC'
  });

  const [stats, setStats] = useState<EmailStats>({
    totalSent: 15678,
    totalOpened: 12345,
    totalClicked: 3456,
    openRate: 78.7,
    clickRate: 28.0,
    bounceRate: 2.1,
    averageDeliveryTime: 1.2,
    topTemplates: [
      { name: 'Welcome Email', count: 1250 },
      { name: 'Content Alert', count: 567 },
      { name: 'Password Reset', count: 89 }
    ]
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'sending':
        return <Send className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'scheduled':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'draft':
        return <Edit className="h-4 w-4 text-gray-500" />;
      case 'paused':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'sending':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'paused':
        return 'bg-orange-100 text-orange-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleTemplateStatus = (id: string) => {
    setTemplates(prev => prev.map(template => 
      template.id === id ? { ...template, isActive: !template.isActive } : template
    ));
  };

  const duplicateTemplate = (id: string) => {
    const template = templates.find(t => t.id === id);
    if (template) {
      const newTemplate: EmailTemplate = {
        ...template,
        id: new Date("2025-07-21T14:00:00Z").getTime().toString(),
        name: `${template.name} (Copy)`,
        createdAt: new Date(),
        lastUsed: new Date(),
        usageCount: 0
      };
      setTemplates(prev => [...prev, newTemplate]);
    }
  };

  const deleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
  };

  const pauseCampaign = (id: string) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === id ? { ...campaign, status: 'paused' as any } : campaign
    ));
  };

  const cancelCampaign = (id: string) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === id ? { ...campaign, status: 'cancelled' as any } : campaign
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Email Notifications</h1>
          <p className="text-muted-foreground">
            Manage email templates, campaigns, and notification settings
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import Templates
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Template
          </Button>
        </div>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{templates.length}</div>
                <p className="text-xs text-muted-foreground">
                  {templates.filter(t => t.isActive).length} active
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
                <Send className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalSent.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.totalOpened.toLocaleString()} opened
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.openRate}%</div>
                <p className="text-xs text-muted-foreground">
                  {stats.clickRate}% click rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.bounceRate}%</div>
                <p className="text-xs text-muted-foreground">
                  {stats.averageDeliveryTime}s avg delivery
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>
                Manage and customize email templates for different notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates.map((template) => (
                  <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${
                        template.isActive ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <Mail className={`h-4 w-4 ${template.isActive ? 'text-green-600' : 'text-gray-500'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{template.name}</h4>
                          <Badge variant="outline">{template.category}</Badge>
                          {template.isActive && <Badge className="bg-green-100 text-green-800">Active</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{template.subject}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                          <span>{template.usageCount} uses</span>
                          <span>Last used: {template.lastUsed.toLocaleDateString()}</span>
                          <span>{template.variables.length} variables</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleTemplateStatus(template.id)}
                      >
                        {template.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => duplicateTemplate(template.id)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteTemplate(template.id)}
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

        <TabsContent value="campaigns" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                <Send className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {campaigns.filter(c => c.status === 'sending').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {campaigns.filter(c => c.status === 'scheduled').length} scheduled
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Recipients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {campaigns.reduce((acc, c) => acc + c.recipients, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across all campaigns
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {campaigns.reduce((acc, c) => acc + c.sent, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Successfully delivered
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Open Rate</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(campaigns.reduce((acc, c) => acc + (c.opened / c.sent * 100), 0) / campaigns.length)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Across campaigns
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Email Campaigns</CardTitle>
              <CardDescription>
                Monitor and manage email campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(campaign.status)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{campaign.name}</h4>
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status}
                          </Badge>
                          <Badge variant="outline">{campaign.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{campaign.subject}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                          <span>{campaign.sent} / {campaign.recipients} sent</span>
                          <span>{campaign.opened} opened</span>
                          <span>{campaign.clicked} clicked</span>
                          <span>{campaign.bounced} bounced</span>
                        </div>
                        {campaign.status === 'sending' && (
                          <Progress 
                            value={(campaign.sent / campaign.recipients) * 100} 
                            className="mt-2" 
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {campaign.status === 'sending' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => pauseCampaign(campaign.id)}
                        >
                          Pause
                        </Button>
                      )}
                      {campaign.status === 'scheduled' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => cancelCampaign(campaign.id)}
                        >
                          Cancel
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
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
                <CardTitle className="text-sm font-medium">Email Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Total Sent</span>
                  <span className="font-medium">{stats.totalSent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total Opened</span>
                  <span className="font-medium">{stats.totalOpened.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total Clicked</span>
                  <span className="font-medium">{stats.totalClicked.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Open Rate</span>
                  <span className="font-medium text-green-600">{stats.openRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Click Rate</span>
                  <span className="font-medium text-blue-600">{stats.clickRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Bounce Rate</span>
                  <span className="font-medium text-red-600">{stats.bounceRate}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Top Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {stats.topTemplates.map((template, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-sm">{template.name}</span>
                    <span className="font-medium">{template.count.toLocaleString()}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Delivery Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Avg Delivery Time</span>
                  <span className="font-medium">{stats.averageDeliveryTime}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Success Rate</span>
                  <span className="font-medium text-green-600">97.9%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Spam Complaints</span>
                  <span className="font-medium text-yellow-600">0.1%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Unsubscribe Rate</span>
                  <span className="font-medium text-red-600">0.5%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure email notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Welcome Emails</label>
                    <p className="text-xs text-muted-foreground">
                      Send welcome emails to new users
                    </p>
                  </div>
                  <Switch
                    checked={settings.welcomeEmails}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, welcomeEmails: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Password Reset</label>
                    <p className="text-xs text-muted-foreground">
                      Send password reset emails
                    </p>
                  </div>
                  <Switch
                    checked={settings.passwordReset}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, passwordReset: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Account Updates</label>
                    <p className="text-xs text-muted-foreground">
                      Notify about account changes
                    </p>
                  </div>
                  <Switch
                    checked={settings.accountUpdates}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, accountUpdates: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Content Notifications</label>
                    <p className="text-xs text-muted-foreground">
                      Notify about new content
                    </p>
                  </div>
                  <Switch
                    checked={settings.contentNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, contentNotifications: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Marketing Emails</label>
                    <p className="text-xs text-muted-foreground">
                      Receive promotional emails
                    </p>
                  </div>
                  <Switch
                    checked={settings.marketingEmails}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, marketingEmails: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">System Alerts</label>
                    <p className="text-xs text-muted-foreground">
                      Receive system notifications
                    </p>
                  </div>
                  <Switch
                    checked={settings.systemAlerts}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, systemAlerts: checked }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Digest Frequency</label>
                  <select 
                    className="mt-2 w-full p-2 border rounded-md"
                    value={settings.digestFrequency}
                    onChange={(e) => setSettings(prev => ({ ...prev, digestFrequency: e.target.value as any }))}
                  >
                    <option value="never">Never</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Quiet Hours</label>
                    <p className="text-xs text-muted-foreground">
                      Don't send emails during quiet hours
                    </p>
                  </div>
                  <Switch
                    checked={settings.quietHours.enabled}
                    onCheckedChange={(checked) => setSettings(prev => ({ 
                      ...prev, 
                      quietHours: { ...prev.quietHours, enabled: checked }
                    }))}
                  />
                </div>

                {settings.quietHours.enabled && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Start Time</label>
                      <input
                        type="time"
                        className="mt-2 w-full p-2 border rounded-md"
                        value={settings.quietHours.start}
                        onChange={(e) => setSettings(prev => ({ 
                          ...prev, 
                          quietHours: { ...prev.quietHours, start: e.target.value }
                        }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">End Time</label>
                      <input
                        type="time"
                        className="mt-2 w-full p-2 border rounded-md"
                        value={settings.quietHours.end}
                        onChange={(e) => setSettings(prev => ({ 
                          ...prev, 
                          quietHours: { ...prev.quietHours, end: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Language</label>
                    <select 
                      className="mt-2 w-full p-2 border rounded-md"
                      value={settings.language}
                      onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="ar">Arabic</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Timezone</label>
                    <select 
                      className="mt-2 w-full p-2 border rounded-md"
                      value={settings.timezone}
                      onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
                    >
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time</option>
                      <option value="PST">Pacific Time</option>
                      <option value="GMT">GMT</option>
                      <option value="CET">Central European Time</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}