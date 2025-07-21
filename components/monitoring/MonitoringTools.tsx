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
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Cpu, 
  HardDrive, 
  MemoryStick,
  Network,
  Server,
  Shield,
  Settings,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  MoreVertical,
  Zap,
  BarChart3,
  TrendingUp,
  AlertCircle,
  Wifi,
  WifiOff,
  Database,
  Globe,
  Monitor,
  Gauge,
  RefreshCcw,
  Thermometer,
  Battery,
  Wrench
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

interface SystemMetrics {
  cpu: {
    usage: number;
    temperature: number;
    cores: number;
  };
  memory: {
    total: number;
    used: number;
    available: number;
    usage: number;
  };
  disk: {
    total: number;
    used: number;
    available: number;
    usage: number;
  };
  network: {
    upload: number;
    download: number;
    connections: number;
  };
  uptime: number;
  loadAverage: number[];
}

interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'acknowledged' | 'resolved';
  source: string;
}

interface Service {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'error' | 'maintenance';
  uptime: number;
  responseTime: number;
  lastCheck: string;
  port: number;
  processId: number;
  memoryUsage: number;
  cpuUsage: number;
}

interface Infrastructure {
  servers: Array<{
    id: string;
    name: string;
    status: 'online' | 'offline' | 'maintenance';
    ip: string;
    location: string;
    cpu: number;
    memory: number;
    disk: number;
    network: number;
  }>;
  databases: Array<{
    id: string;
    name: string;
    type: 'mysql' | 'postgresql' | 'mongodb' | 'redis';
    status: 'connected' | 'disconnected' | 'error';
    connections: number;
    size: number;
    performance: number;
  }>;
  loadBalancers: Array<{
    id: string;
    name: string;
    status: 'active' | 'inactive' | 'error';
    requests: number;
    responseTime: number;
    health: number;
  }>;
}

export default function MonitoringTools() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    cpu: {
      usage: 45.2,
      temperature: 65,
      cores: 8
    },
    memory: {
      total: 16384,
      used: 8192,
      available: 8192,
      usage: 50.0
    },
    disk: {
      total: 1000000,
      used: 350000,
      available: 650000,
      usage: 35.0
    },
    network: {
      upload: 2.5,
      download: 8.7,
      connections: 1250
    },
    uptime: 720,
    loadAverage: [1.2, 1.1, 0.9]
  });

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'High CPU Usage',
      message: 'CPU usage has exceeded 80% for the last 5 minutes',
      timestamp: '2024-01-15 15:30',
      severity: 'medium',
      status: 'active',
      source: 'server-01'
    },
    {
      id: '2',
      type: 'error',
      title: 'Database Connection Failed',
      message: 'Unable to connect to primary database server',
      timestamp: '2024-01-15 15:25',
      severity: 'high',
      status: 'acknowledged',
      source: 'db-01'
    },
    {
      id: '3',
      type: 'info',
      title: 'Backup Completed',
      message: 'Daily backup completed successfully',
      timestamp: '2024-01-15 15:00',
      severity: 'low',
      status: 'resolved',
      source: 'backup-service'
    },
    {
      id: '4',
      type: 'error',
      title: 'Disk Space Critical',
      message: 'Disk usage has reached 95% on /var/log',
      timestamp: '2024-01-15 14:45',
      severity: 'critical',
      status: 'active',
      source: 'server-02'
    }
  ]);

  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'nginx',
      status: 'running',
      uptime: 720,
      responseTime: 15,
      lastCheck: '2024-01-15 15:30',
      port: 80,
      processId: 1234,
      memoryUsage: 45.2,
      cpuUsage: 12.8
    },
    {
      id: '2',
      name: 'mysql',
      status: 'running',
      uptime: 720,
      responseTime: 25,
      lastCheck: '2024-01-15 15:30',
      port: 3306,
      processId: 1235,
      memoryUsage: 68.5,
      cpuUsage: 8.3
    },
    {
      id: '3',
      name: 'redis',
      status: 'running',
      uptime: 720,
      responseTime: 5,
      lastCheck: '2024-01-15 15:30',
      port: 6379,
      processId: 1236,
      memoryUsage: 23.1,
      cpuUsage: 5.2
    },
    {
      id: '4',
      name: 'node-app',
      status: 'error',
      uptime: 0,
      responseTime: 0,
      lastCheck: '2024-01-15 15:25',
      port: 3000,
      processId: 0,
      memoryUsage: 0,
      cpuUsage: 0
    }
  ]);

  const [infrastructure, setInfrastructure] = useState<Infrastructure>({
    servers: [
      {
        id: '1',
        name: 'Web Server 01',
        status: 'online',
        ip: '192.168.1.10',
        location: 'US-East',
        cpu: 45.2,
        memory: 50.0,
        disk: 35.0,
        network: 65.8
      },
      {
        id: '2',
        name: 'Database Server 01',
        status: 'online',
        ip: '192.168.1.11',
        location: 'US-East',
        cpu: 68.5,
        memory: 75.2,
        disk: 45.8,
        network: 32.1
      },
      {
        id: '3',
        name: 'Cache Server 01',
        status: 'maintenance',
        ip: '192.168.1.12',
        location: 'US-East',
        cpu: 12.3,
        memory: 28.7,
        disk: 15.4,
        network: 18.9
      }
    ],
    databases: [
      {
        id: '1',
        name: 'Primary MySQL',
        type: 'mysql',
        status: 'connected',
        connections: 125,
        size: 2.5,
        performance: 95.2
      },
      {
        id: '2',
        name: 'Redis Cache',
        type: 'redis',
        status: 'connected',
        connections: 45,
        size: 0.8,
        performance: 98.7
      },
      {
        id: '3',
        name: 'Analytics DB',
        type: 'postgresql',
        status: 'error',
        connections: 0,
        size: 15.2,
        performance: 0
      }
    ],
    loadBalancers: [
      {
        id: '1',
        name: 'Primary Load Balancer',
        status: 'active',
        requests: 12500,
        responseTime: 45,
        health: 98.5
      },
      {
        id: '2',
        name: 'Backup Load Balancer',
        status: 'inactive',
        requests: 0,
        responseTime: 0,
        health: 0
      }
    ]
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
      case 'running':
      case 'connected':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'offline':
      case 'stopped':
      case 'disconnected':
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'error': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'success': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Monitoring Tools</h1>
          <p className="text-muted-foreground">System health and performance monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* System Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
                <Cpu className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemMetrics.cpu.usage}%</div>
                <p className="text-xs text-muted-foreground">
                  {systemMetrics.cpu.temperature}°C • {systemMetrics.cpu.cores} cores
                </p>
                <Progress value={systemMetrics.cpu.usage} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
                <MemoryStick className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemMetrics.memory.usage}%</div>
                <p className="text-xs text-muted-foreground">
                  {systemMetrics.memory.used}GB / {systemMetrics.memory.total}GB
                </p>
                <Progress value={systemMetrics.memory.usage} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Disk Usage</CardTitle>
                <HardDrive className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemMetrics.disk.usage}%</div>
                <p className="text-xs text-muted-foreground">
                  {systemMetrics.disk.used}GB / {systemMetrics.disk.total}GB
                </p>
                <Progress value={systemMetrics.disk.usage} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Network</CardTitle>
                <Network className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemMetrics.network.connections}</div>
                <p className="text-xs text-muted-foreground">
                  ↑ {systemMetrics.network.upload}MB/s ↓ {systemMetrics.network.download}MB/s
                </p>
              </CardContent>
            </Card>
          </div>

          {/* System Health */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Current system status and metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>System Status</span>
                  </div>
                  <Badge variant="default">Healthy</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>Uptime</span>
                  </div>
                  <span className="font-medium">{Math.floor(systemMetrics.uptime / 60)} hours</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-orange-500" />
                    <span>Load Average</span>
                  </div>
                  <span className="font-medium">
                    {systemMetrics.loadAverage.map((load, index) => 
                      `${load.toFixed(2)}${index < 2 ? ', ' : ''}`
                    )}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-red-500" />
                    <span>Temperature</span>
                  </div>
                  <span className="font-medium">{systemMetrics.cpu.temperature}°C</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system events and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-green-50">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Backup completed successfully</div>
                      <div className="text-xs text-muted-foreground">2 minutes ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-yellow-50">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">High memory usage detected</div>
                      <div className="text-xs text-muted-foreground">5 minutes ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-blue-50">
                    <Activity className="w-4 h-4 text-blue-500" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Service restart completed</div>
                      <div className="text-xs text-muted-foreground">10 minutes ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>System Alerts</CardTitle>
                  <CardDescription>Monitor and manage system alerts</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    New Alert
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alert</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{alert.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {alert.message}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getAlertTypeColor(alert.type)}>
                          {alert.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getSeverityColor(alert.severity)}`} />
                          <span className="capitalize">{alert.severity}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={alert.status === 'resolved' ? 'default' : 'secondary'}>
                          {alert.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{alert.source}</TableCell>
                      <TableCell>{alert.timestamp}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Acknowledge</DropdownMenuItem>
                            <DropdownMenuItem>Resolve</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
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

        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>System Services</CardTitle>
                  <CardDescription>Monitor and manage running services</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Service
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Uptime</TableHead>
                    <TableHead>Response Time</TableHead>
                    <TableHead>CPU</TableHead>
                    <TableHead>Memory</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{service.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Port {service.port} • PID {service.processId}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(service.status)}>
                          {service.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {service.uptime > 0 ? `${Math.floor(service.uptime / 60)}h ${service.uptime % 60}m` : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {service.responseTime > 0 ? `${service.responseTime}ms` : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={service.cpuUsage} className="w-16" />
                          <span className="text-sm">{service.cpuUsage}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={service.memoryUsage} className="w-16" />
                          <span className="text-sm">{service.memoryUsage}%</span>
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
                            <DropdownMenuItem>Restart</DropdownMenuItem>
                            <DropdownMenuItem>Stop</DropdownMenuItem>
                            <DropdownMenuItem>View Logs</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Configure</DropdownMenuItem>
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

        <TabsContent value="infrastructure" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Servers</CardTitle>
                <CardDescription>Server infrastructure status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {infrastructure.servers.map((server) => (
                    <div key={server.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-medium">{server.name}</div>
                          <div className="text-sm text-muted-foreground">{server.ip}</div>
                        </div>
                        <Badge className={getStatusColor(server.status)}>
                          {server.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-xs">CPU</Label>
                          <div className="font-medium">{server.cpu}%</div>
                        </div>
                        <div>
                          <Label className="text-xs">Memory</Label>
                          <div className="font-medium">{server.memory}%</div>
                        </div>
                        <div>
                          <Label className="text-xs">Disk</Label>
                          <div className="font-medium">{server.disk}%</div>
                        </div>
                        <div>
                          <Label className="text-xs">Network</Label>
                          <div className="font-medium">{server.network}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Databases</CardTitle>
                <CardDescription>Database connections and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {infrastructure.databases.map((db) => (
                    <div key={db.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-medium">{db.name}</div>
                          <div className="text-sm text-muted-foreground capitalize">{db.type}</div>
                        </div>
                        <Badge className={getStatusColor(db.status)}>
                          {db.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-xs">Connections</Label>
                          <div className="font-medium">{db.connections}</div>
                        </div>
                        <div>
                          <Label className="text-xs">Size</Label>
                          <div className="font-medium">{db.size}GB</div>
                        </div>
                        <div>
                          <Label className="text-xs">Performance</Label>
                          <div className="font-medium">{db.performance}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Load Balancers</CardTitle>
                <CardDescription>Load balancer status and metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {infrastructure.loadBalancers.map((lb) => (
                    <div key={lb.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-medium">{lb.name}</div>
                        </div>
                        <Badge className={getStatusColor(lb.status)}>
                          {lb.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-xs">Requests</Label>
                          <div className="font-medium">{lb.requests.toLocaleString()}</div>
                        </div>
                        <div>
                          <Label className="text-xs">Response Time</Label>
                          <div className="font-medium">{lb.responseTime}ms</div>
                        </div>
                        <div>
                          <Label className="text-xs">Health</Label>
                          <div className="font-medium">{lb.health}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monitoring Settings</CardTitle>
                <CardDescription>Configure monitoring preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Real-time monitoring</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable real-time system monitoring
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Alert notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send notifications for system alerts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Performance logging</Label>
                    <p className="text-sm text-muted-foreground">
                      Log performance metrics for analysis
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-recovery</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically restart failed services
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Threshold Settings</CardTitle>
                <CardDescription>Configure alert thresholds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>CPU Usage Threshold</Label>
                  <Input type="number" placeholder="80" />
                </div>
                
                <div className="space-y-2">
                  <Label>Memory Usage Threshold</Label>
                  <Input type="number" placeholder="85" />
                </div>
                
                <div className="space-y-2">
                  <Label>Disk Usage Threshold</Label>
                  <Input type="number" placeholder="90" />
                </div>
                
                <div className="space-y-2">
                  <Label>Response Time Threshold</Label>
                  <Input type="number" placeholder="1000" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}