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
  Wifi, 
  Signal, 
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
  BarChart3,
  TrendingUp,
  AlertCircle,
  Database,
  Globe,
  Monitor,
  Gauge,
  Thermometer,
  Battery,
  Wrench,
  Users,
  Heart,
  Star,
  BookOpen,
  Video,
  Music,
  Gamepad2,
  Palette,
  Lightbulb,
  Moon,
  Sun,
  Router,
  Network,
  HardDrive,
  Cpu,
  MemoryStick,
  RefreshCw
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

interface QoSRule {
  id: string;
  name: string;
  priority: 'high' | 'medium' | 'low' | 'critical';
  type: 'bandwidth' | 'latency' | 'packet_loss' | 'jitter';
  source: string;
  destination: string;
  protocol: 'tcp' | 'udp' | 'icmp' | 'all';
  port: string;
  bandwidth: {
    upload: number;
    download: number;
    unit: 'Mbps' | 'Kbps' | 'Gbps';
  };
  isActive: boolean;
  lastModified: string;
}

interface NetworkTraffic {
  id: string;
  application: string;
  protocol: string;
  source: string;
  destination: string;
  bandwidth: number;
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'blocked' | 'throttled';
  timestamp: string;
}

interface NetworkMetrics {
  totalBandwidth: number;
  usedBandwidth: number;
  availableBandwidth: number;
  latency: number;
  packetLoss: number;
  jitter: number;
  activeConnections: number;
  totalConnections: number;
}

interface DeviceQoS {
  id: string;
  name: string;
  type: 'router' | 'switch' | 'server' | 'client';
  ip: string;
  mac: string;
  bandwidth: {
    current: number;
    limit: number;
    unit: string;
  };
  priority: 'high' | 'medium' | 'low';
  status: 'online' | 'offline' | 'warning';
  lastSeen: string;
}

export default function QoS() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const [networkMetrics, setNetworkMetrics] = useState<NetworkMetrics>({
    totalBandwidth: 1000,
    usedBandwidth: 650,
    availableBandwidth: 350,
    latency: 25,
    packetLoss: 0.5,
    jitter: 5,
    activeConnections: 1250,
    totalConnections: 1500
  });

  const [qosRules, setQosRules] = useState<QoSRule[]>([
    {
      id: '1',
      name: 'Video Streaming Priority',
      priority: 'high',
      type: 'bandwidth',
      source: 'any',
      destination: 'video-streaming-services',
      protocol: 'tcp',
      port: '80,443',
      bandwidth: {
        upload: 50,
        download: 100,
        unit: 'Mbps'
      },
      isActive: true,
      lastModified: '2024-01-15 15:30'
    },
    {
      id: '2',
      name: 'Gaming Traffic',
      priority: 'critical',
      type: 'latency',
      source: 'gaming-consoles',
      destination: 'gaming-servers',
      protocol: 'udp',
      port: '3074,3478,4379',
      bandwidth: {
        upload: 10,
        download: 20,
        unit: 'Mbps'
      },
      isActive: true,
      lastModified: '2024-01-15 14:45'
    },
    {
      id: '3',
      name: 'VoIP Calls',
      priority: 'critical',
      type: 'jitter',
      source: 'voip-applications',
      destination: 'voip-servers',
      protocol: 'udp',
      port: '5060,5061',
      bandwidth: {
        upload: 5,
        download: 5,
        unit: 'Mbps'
      },
      isActive: true,
      lastModified: '2024-01-15 13:20'
    },
    {
      id: '4',
      name: 'File Downloads',
      priority: 'low',
      type: 'bandwidth',
      source: 'any',
      destination: 'file-servers',
      protocol: 'tcp',
      port: '21,22,80,443',
      bandwidth: {
        upload: 20,
        download: 50,
        unit: 'Mbps'
      },
      isActive: false,
      lastModified: '2024-01-15 12:15'
    }
  ]);

  const [networkTraffic, setNetworkTraffic] = useState<NetworkTraffic[]>([
    {
      id: '1',
      application: 'Netflix',
      protocol: 'TCP',
      source: '192.168.1.100',
      destination: 'netflix.com',
      bandwidth: 25.5,
      priority: 'high',
      status: 'active',
      timestamp: '2024-01-15 15:30'
    },
    {
      id: '2',
      application: 'Call of Duty',
      protocol: 'UDP',
      source: '192.168.1.101',
      destination: 'activision.com',
      bandwidth: 8.2,
      priority: 'high',
      status: 'active',
      timestamp: '2024-01-15 15:29'
    },
    {
      id: '3',
      application: 'Zoom Meeting',
      protocol: 'UDP',
      source: '192.168.1.102',
      destination: 'zoom.us',
      bandwidth: 12.8,
      priority: 'high',
      status: 'active',
      timestamp: '2024-01-15 15:28'
    },
    {
      id: '4',
      application: 'BitTorrent',
      protocol: 'TCP',
      source: '192.168.1.103',
      destination: 'tracker.example.com',
      bandwidth: 45.3,
      priority: 'low',
      status: 'throttled',
      timestamp: '2024-01-15 15:27'
    }
  ]);

  const [devices, setDevices] = useState<DeviceQoS[]>([
    {
      id: '1',
      name: 'Gaming PC',
      type: 'client',
      ip: '192.168.1.100',
      mac: 'AA:BB:CC:DD:EE:FF',
      bandwidth: {
        current: 35.2,
        limit: 100,
        unit: 'Mbps'
      },
      priority: 'high',
      status: 'online',
      lastSeen: '2024-01-15 15:30'
    },
    {
      id: '2',
      name: 'Smart TV',
      type: 'client',
      ip: '192.168.1.101',
      mac: '11:22:33:44:55:66',
      bandwidth: {
        current: 28.7,
        limit: 50,
        unit: 'Mbps'
      },
      priority: 'medium',
      status: 'online',
      lastSeen: '2024-01-15 15:29'
    },
    {
      id: '3',
      name: 'Work Laptop',
      type: 'client',
      ip: '192.168.1.102',
      mac: '77:88:99:AA:BB:CC',
      bandwidth: {
        current: 15.3,
        limit: 75,
        unit: 'Mbps'
      },
      priority: 'medium',
      status: 'online',
      lastSeen: '2024-01-15 15:28'
    },
    {
      id: '4',
      name: 'Mobile Phone',
      type: 'client',
      ip: '192.168.1.103',
      mac: 'DD:EE:FF:11:22:33',
      bandwidth: {
        current: 8.9,
        limit: 25,
        unit: 'Mbps'
      },
      priority: 'low',
      status: 'warning',
      lastSeen: '2024-01-15 15:25'
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'offline':
      case 'blocked':
        return 'bg-red-100 text-red-800';
      case 'warning':
      case 'throttled':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'bandwidth': return 'bg-blue-100 text-blue-800';
      case 'latency': return 'bg-purple-100 text-purple-800';
      case 'packet_loss': return 'bg-red-100 text-red-800';
      case 'jitter': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateBandwidthUsage = () => {
    return (networkMetrics.usedBandwidth / networkMetrics.totalBandwidth) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quality of Service (QoS)</h1>
          <p className="text-muted-foreground">Network traffic management and optimization</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Activity className="w-4 h-4 mr-2" />
            View Logs
          </Button>
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            Configure QoS
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rules">Rules</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Network Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bandwidth Usage</CardTitle>
                <Network className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{calculateBandwidthUsage().toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  {networkMetrics.usedBandwidth} / {networkMetrics.totalBandwidth} Mbps
                </p>
                <Progress value={calculateBandwidthUsage()} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Latency</CardTitle>
                <Signal className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{networkMetrics.latency}ms</div>
                <p className="text-xs text-muted-foreground">
                  Average response time
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Packet Loss</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{networkMetrics.packetLoss}%</div>
                <p className="text-xs text-muted-foreground">
                  Lost packets
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{networkMetrics.activeConnections}</div>
                <p className="text-xs text-muted-foreground">
                  Out of {networkMetrics.totalConnections} total
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Network Health */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Network Health</CardTitle>
                <CardDescription>Current network performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Overall Status</span>
                  </div>
                  <Badge variant="default">Healthy</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Signal className="w-4 h-4 text-blue-500" />
                    <span>Latency</span>
                  </div>
                  <span className="font-medium">{networkMetrics.latency}ms</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-orange-500" />
                    <span>Jitter</span>
                  </div>
                  <span className="font-medium">{networkMetrics.jitter}ms</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-purple-500" />
                    <span>Available Bandwidth</span>
                  </div>
                  <span className="font-medium">{networkMetrics.availableBandwidth} Mbps</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>QoS Rules Status</CardTitle>
                <CardDescription>Active QoS rules and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-green-50">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">Video Streaming Priority</span>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 rounded-lg bg-green-50">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">Gaming Traffic</span>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 rounded-lg bg-green-50">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">VoIP Calls</span>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">File Downloads</span>
                    </div>
                    <Badge variant="secondary">Inactive</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>QoS Rules</CardTitle>
                  <CardDescription>Manage traffic prioritization and bandwidth allocation</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Rule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rule Name</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Bandwidth</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {qosRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{rule.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {rule.source} → {rule.destination}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(rule.priority)}>
                          {rule.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(rule.type)}>
                          {rule.type.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>↑ {rule.bandwidth.upload} {rule.bandwidth.unit}</div>
                          <div>↓ {rule.bandwidth.download} {rule.bandwidth.unit}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={rule.isActive ? "default" : "secondary"}>
                          {rule.isActive ? "Active" : "Inactive"}
                        </Badge>
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
                              View Traffic
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              {rule.isActive ? (
                                <>
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Disable
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Enable
                                </>
                              )}
                            </DropdownMenuItem>
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

        <TabsContent value="traffic" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Network Traffic</CardTitle>
                  <CardDescription>Real-time network traffic monitoring</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application</TableHead>
                    <TableHead>Protocol</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Bandwidth</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {networkTraffic.map((traffic) => (
                    <TableRow key={traffic.id}>
                      <TableCell>
                        <div className="font-medium">{traffic.application}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{traffic.protocol}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {traffic.source}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {traffic.destination}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{traffic.bandwidth} Mbps</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(traffic.priority)}>
                          {traffic.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(traffic.status)}>
                          {traffic.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Network Devices</CardTitle>
                  <CardDescription>Manage QoS settings for individual devices</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Device
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {devices.map((device) => (
                  <Card key={device.id} className="relative">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{device.name}</CardTitle>
                          <CardDescription>{device.type}</CardDescription>
                        </div>
                        <Badge className={getStatusColor(device.status)}>
                          {device.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-xs">IP Address</Label>
                          <div className="font-medium font-mono">{device.ip}</div>
                        </div>
                        <div>
                          <Label className="text-xs">MAC Address</Label>
                          <div className="font-medium font-mono">{device.mac}</div>
                        </div>
                        <div>
                          <Label className="text-xs">Bandwidth</Label>
                          <div className="font-medium">
                            {device.bandwidth.current} / {device.bandwidth.limit} {device.bandwidth.unit}
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs">Priority</Label>
                          <Badge className={getPriorityColor(device.priority)}>
                            {device.priority}
                          </Badge>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Bandwidth Usage</span>
                          <span>{((device.bandwidth.current / device.bandwidth.limit) * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={(device.bandwidth.current / device.bandwidth.limit) * 100} className="h-2" />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm">
                          <Activity className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>QoS Settings</CardTitle>
                <CardDescription>Configure QoS behavior and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-QoS</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically optimize traffic based on application type
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Traffic shaping</Label>
                    <p className="text-sm text-muted-foreground">
                      Smooth traffic flow to prevent congestion
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Bandwidth monitoring</Label>
                    <p className="text-sm text-muted-foreground">
                      Monitor bandwidth usage in real-time
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Automatic rule creation</Label>
                    <p className="text-sm text-muted-foreground">
                      Create QoS rules automatically for new applications
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bandwidth Management</CardTitle>
                <CardDescription>Configure bandwidth allocation and limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Total bandwidth (Mbps)</Label>
                  <Input type="number" placeholder="1000" />
                </div>
                
                <div className="space-y-2">
                  <Label>Reserved bandwidth (%)</Label>
                  <Input type="number" placeholder="20" />
                </div>
                
                <div className="space-y-2">
                  <Label>Default priority</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label>Traffic classes</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>4 classes</option>
                    <option>8 classes</option>
                    <option>16 classes</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}