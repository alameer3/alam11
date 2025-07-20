'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Code, 
  Database, 
  Globe, 
  Shield, 
  Activity, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Settings,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  MoreVertical,
  Zap,
  Key,
  Lock,
  Unlock,
  RefreshCw,
  BarChart3,
  TrendingUp,
  AlertCircle,
  Wifi,
  WifiOff
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface APIEndpoint {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  status: 'active' | 'inactive' | 'error' | 'maintenance';
  responseTime: number;
  successRate: number;
  lastChecked: string;
  rateLimit: {
    requests: number;
    period: string;
    remaining: number;
  };
  authentication: 'none' | 'api_key' | 'oauth' | 'bearer';
  description: string;
}

interface APIIntegration {
  id: string;
  name: string;
  provider: string;
  category: 'payment' | 'social' | 'analytics' | 'storage' | 'ai' | 'other';
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  apiKey: string;
  secretKey: string;
  webhookUrl: string;
  lastSync: string;
  syncInterval: string;
  dataTransferred: number;
  errorCount: number;
}

interface APIMonitoring {
  totalRequests: number;
  averageResponseTime: number;
  errorRate: number;
  uptime: number;
  activeEndpoints: number;
  totalEndpoints: number;
  recentErrors: Array<{
    id: string;
    endpoint: string;
    error: string;
    timestamp: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
  }>;
}

export default function ExternalAPI() {
  const [activeTab, setActiveTab] = useState('endpoints');
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint | null>(null);
  
  const [apiMonitoring, setApiMonitoring] = useState<APIMonitoring>({
    totalRequests: 125000,
    averageResponseTime: 245,
    errorRate: 2.3,
    uptime: 99.8,
    activeEndpoints: 12,
    totalEndpoints: 15,
    recentErrors: [
      {
        id: '1',
        endpoint: '/api/payments/process',
        error: 'Rate limit exceeded',
        timestamp: '2024-01-15 14:30',
        severity: 'medium'
      },
      {
        id: '2',
        endpoint: '/api/users/sync',
        error: 'Authentication failed',
        timestamp: '2024-01-15 13:45',
        severity: 'high'
      },
      {
        id: '3',
        endpoint: '/api/analytics/track',
        error: 'Timeout after 30s',
        timestamp: '2024-01-15 12:20',
        severity: 'low'
      }
    ]
  });

  const [endpoints, setEndpoints] = useState<APIEndpoint[]>([
    {
      id: '1',
      name: 'Payment Processing',
      url: 'https://api.stripe.com/v1/payment_intents',
      method: 'POST',
      status: 'active',
      responseTime: 180,
      successRate: 99.5,
      lastChecked: '2024-01-15 15:00',
      rateLimit: {
        requests: 1000,
        period: 'per minute',
        remaining: 850
      },
      authentication: 'bearer',
      description: 'Process payment transactions'
    },
    {
      id: '2',
      name: 'User Authentication',
      url: 'https://api.auth0.com/userinfo',
      method: 'GET',
      status: 'active',
      responseTime: 120,
      successRate: 99.8,
      lastChecked: '2024-01-15 14:55',
      rateLimit: {
        requests: 500,
        period: 'per minute',
        remaining: 420
      },
      authentication: 'bearer',
      description: 'Get user profile information'
    },
    {
      id: '3',
      name: 'File Storage',
      url: 'https://api.cloudinary.com/v1_1/upload',
      method: 'POST',
      status: 'active',
      responseTime: 350,
      successRate: 98.2,
      lastChecked: '2024-01-15 14:50',
      rateLimit: {
        requests: 100,
        period: 'per hour',
        remaining: 75
      },
      authentication: 'api_key',
      description: 'Upload and manage files'
    },
    {
      id: '4',
      name: 'AI Recommendations',
      url: 'https://api.openai.com/v1/chat/completions',
      method: 'POST',
      status: 'error',
      responseTime: 0,
      successRate: 0,
      lastChecked: '2024-01-15 14:30',
      rateLimit: {
        requests: 50,
        period: 'per minute',
        remaining: 0
      },
      authentication: 'bearer',
      description: 'Generate AI-powered recommendations'
    }
  ]);

  const [integrations, setIntegrations] = useState<APIIntegration[]>([
    {
      id: '1',
      name: 'Stripe Payments',
      provider: 'Stripe',
      category: 'payment',
      status: 'connected',
      apiKey: 'sk_test_...',
      secretKey: 'sk_live_...',
      webhookUrl: 'https://yourdomain.com/webhooks/stripe',
      lastSync: '2024-01-15 15:00',
      syncInterval: '5 minutes',
      dataTransferred: 2.5,
      errorCount: 3
    },
    {
      id: '2',
      name: 'Google Analytics',
      provider: 'Google',
      category: 'analytics',
      status: 'connected',
      apiKey: 'AIzaSy...',
      secretKey: 'client_secret.json',
      webhookUrl: '',
      lastSync: '2024-01-15 14:30',
      syncInterval: '1 hour',
      dataTransferred: 15.2,
      errorCount: 0
    },
    {
      id: '3',
      name: 'Cloudinary Storage',
      provider: 'Cloudinary',
      category: 'storage',
      status: 'connected',
      apiKey: '123456789012345',
      secretKey: 'abcdefghijklmnop',
      webhookUrl: 'https://yourdomain.com/webhooks/cloudinary',
      lastSync: '2024-01-15 14:15',
      syncInterval: 'Real-time',
      dataTransferred: 8.7,
      errorCount: 1
    },
    {
      id: '4',
      name: 'OpenAI AI',
      provider: 'OpenAI',
      category: 'ai',
      status: 'error',
      apiKey: 'sk-...',
      secretKey: '',
      webhookUrl: '',
      lastSync: '2024-01-15 13:45',
      syncInterval: 'On-demand',
      dataTransferred: 0.5,
      errorCount: 12
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'connected':
        return 'bg-green-100 text-green-800';
      case 'inactive':
      case 'disconnected':
        return 'bg-gray-100 text-gray-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800';
      case 'POST': return 'bg-blue-100 text-blue-800';
      case 'PUT': return 'bg-orange-100 text-orange-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      case 'PATCH': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">External API Management</h1>
          <p className="text-muted-foreground">Manage external API integrations and monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Status
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Integration
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints" className="space-y-6">
          {/* API Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Endpoints</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{apiMonitoring.activeEndpoints}</div>
                <p className="text-xs text-muted-foreground">
                  Out of {apiMonitoring.totalEndpoints} total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{apiMonitoring.averageResponseTime}ms</div>
                <p className="text-xs text-muted-foreground">
                  Across all endpoints
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{apiMonitoring.errorRate}%</div>
                <p className="text-xs text-muted-foreground">
                  Last 24 hours
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{apiMonitoring.uptime}%</div>
                <p className="text-xs text-muted-foreground">
                  System availability
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Endpoints Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>API Endpoints</CardTitle>
                  <CardDescription>Monitor and manage external API endpoints</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Endpoint
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Response Time</TableHead>
                    <TableHead>Success Rate</TableHead>
                    <TableHead>Rate Limit</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {endpoints.map((endpoint) => (
                    <TableRow key={endpoint.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{endpoint.name}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-xs">
                            {endpoint.url}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getMethodColor(endpoint.method)}>
                          {endpoint.method}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(endpoint.status)}>
                          {endpoint.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{endpoint.responseTime}ms</span>
                          {endpoint.responseTime > 300 && (
                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={endpoint.successRate} className="w-16" />
                          <span className="text-sm font-medium">{endpoint.successRate}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{endpoint.rateLimit.remaining}/{endpoint.rateLimit.requests}</div>
                          <div className="text-muted-foreground">{endpoint.rateLimit.period}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Activity className="w-4 h-4 mr-2" />
                              View Logs
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Test
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>API Integrations</CardTitle>
                  <CardDescription>Manage third-party service integrations</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Integration
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {integrations.map((integration) => (
                  <Card key={integration.id} className="relative">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <CardDescription>{integration.provider}</CardDescription>
                        </div>
                        <Badge className={getStatusColor(integration.status)}>
                          {integration.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-xs">Category</Label>
                          <div className="font-medium capitalize">{integration.category}</div>
                        </div>
                        <div>
                          <Label className="text-xs">Last Sync</Label>
                          <div className="font-medium">{integration.lastSync}</div>
                        </div>
                        <div>
                          <Label className="text-xs">Data Transferred</Label>
                          <div className="font-medium">{integration.dataTransferred} MB</div>
                        </div>
                        <div>
                          <Label className="text-xs">Errors</Label>
                          <div className="font-medium">{integration.errorCount}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Errors</CardTitle>
                <CardDescription>Latest API errors and issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiMonitoring.recentErrors.map((error) => (
                    <div key={error.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className={`w-3 h-3 rounded-full mt-1 ${getSeverityColor(error.severity)}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{error.endpoint}</div>
                          <Badge variant="outline" className="text-xs">
                            {error.severity}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {error.error}
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          {error.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>API performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Response Time</span>
                      <span>{apiMonitoring.averageResponseTime}ms</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Success Rate</span>
                      <span>{100 - apiMonitoring.errorRate}%</span>
                    </div>
                    <Progress value={100 - apiMonitoring.errorRate} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Uptime</span>
                      <span>{apiMonitoring.uptime}%</span>
                    </div>
                    <Progress value={apiMonitoring.uptime} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Total Requests</span>
                      <span>{apiMonitoring.totalRequests.toLocaleString()}</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>API Security</CardTitle>
                <CardDescription>Manage API keys and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>API Key Rotation</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically rotate API keys
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Rate Limiting</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable rate limiting for all endpoints
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>IP Whitelisting</Label>
                    <p className="text-sm text-muted-foreground">
                      Restrict API access to specific IPs
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SSL/TLS Only</Label>
                    <p className="text-sm text-muted-foreground">
                      Require secure connections
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Authentication</CardTitle>
                <CardDescription>Configure authentication methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Auth Method</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>API Key</option>
                    <option>Bearer Token</option>
                    <option>OAuth 2.0</option>
                    <option>Basic Auth</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label>Token Expiration</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>1 hour</option>
                    <option>24 hours</option>
                    <option>7 days</option>
                    <option>30 days</option>
                    <option>Never</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Auth</Label>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for API access
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>API Settings</CardTitle>
                <CardDescription>Configure API behavior and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-retry failed requests</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically retry failed API calls
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Request logging</Label>
                    <p className="text-sm text-muted-foreground">
                      Log all API requests for debugging
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Performance monitoring</Label>
                    <p className="text-sm text-muted-foreground">
                      Monitor API performance metrics
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Error notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send notifications for API errors
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Webhook Settings</CardTitle>
                <CardDescription>Configure webhook endpoints and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Webhook URL</Label>
                  <Input placeholder="https://yourdomain.com/webhooks" />
                </div>
                
                <div className="space-y-2">
                  <Label>Webhook Secret</Label>
                  <Input type="password" placeholder="Enter webhook secret" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Verify webhook signatures</Label>
                    <p className="text-sm text-muted-foreground">
                      Verify webhook authenticity
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Retry failed webhooks</Label>
                    <p className="text-sm text-muted-foreground">
                      Retry failed webhook deliveries
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}