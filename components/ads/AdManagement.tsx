'use client';

import React, { useState } from 'react';
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
  DollarSign, 
  TrendingUp, 
  Eye, 
  MousePointer, 
  Users, 
  Target, 
  Calendar,
  BarChart3,
  Settings,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  MoreVertical,
  Filter,
  Download,
  Upload,
  PieChart,
  Activity,
  Globe,
  Clock,
  Zap
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

interface AdCampaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft' | 'completed';
  type: 'video' | 'banner' | 'overlay' | 'sponsored';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpm: number;
  startDate: string;
  endDate: string;
  targetAudience: string[];
  adCreative: string;
}

interface AdRevenue {
  totalRevenue: number;
  monthlyRevenue: number;
  dailyRevenue: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpm: number;
  topAdvertisers: Array<{
    name: string;
    spend: number;
    impressions: number;
  }>;
}

interface AdTargeting {
  demographics: {
    ageRanges: string[];
    genders: string[];
    locations: string[];
    interests: string[];
  };
  behavior: {
    watchHistory: boolean;
    searchHistory: boolean;
    deviceType: string[];
  };
  content: {
    categories: string[];
    keywords: string[];
    excludeCategories: string[];
  };
}

export default function AdManagement() {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [selectedCampaign, setSelectedCampaign] = useState<AdCampaign | null>(null);
  
  const [adRevenue, setAdRevenue] = useState<AdRevenue>({
    totalRevenue: 45000,
    monthlyRevenue: 8500,
    dailyRevenue: 280,
    impressions: 2500000,
    clicks: 125000,
    ctr: 5.0,
    cpm: 18.0,
    topAdvertisers: [
      { name: 'TechCorp', spend: 8500, impressions: 450000 },
      { name: 'FashionBrand', spend: 7200, impressions: 380000 },
      { name: 'FoodDelivery', spend: 6500, impressions: 320000 },
    ]
  });

  const [campaigns, setCampaigns] = useState<AdCampaign[]>([
    {
      id: '1',
      name: 'Summer Tech Sale',
      status: 'active',
      type: 'video',
      budget: 5000,
      spent: 3200,
      impressions: 150000,
      clicks: 8500,
      ctr: 5.7,
      cpm: 21.3,
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      targetAudience: ['Tech enthusiasts', 'Young professionals'],
      adCreative: 'summer_tech_ad.mp4'
    },
    {
      id: '2',
      name: 'Fashion Collection Launch',
      status: 'paused',
      type: 'banner',
      budget: 3000,
      spent: 1800,
      impressions: 95000,
      clicks: 4200,
      ctr: 4.4,
      cpm: 18.9,
      startDate: '2024-07-01',
      endDate: '2024-09-30',
      targetAudience: ['Fashion lovers', 'Women 18-35'],
      adCreative: 'fashion_banner.jpg'
    },
    {
      id: '3',
      name: 'Food Delivery Promo',
      status: 'active',
      type: 'overlay',
      budget: 2000,
      spent: 1200,
      impressions: 75000,
      clicks: 3800,
      ctr: 5.1,
      cpm: 16.0,
      startDate: '2024-06-15',
      endDate: '2024-08-15',
      targetAudience: ['Food lovers', 'Busy professionals'],
      adCreative: 'food_delivery_overlay.png'
    }
  ]);

  const [targeting, setTargeting] = useState<AdTargeting>({
    demographics: {
      ageRanges: ['18-24', '25-34', '35-44'],
      genders: ['All'],
      locations: ['United States', 'Canada', 'United Kingdom'],
      interests: ['Technology', 'Fashion', 'Food', 'Travel']
    },
    behavior: {
      watchHistory: true,
      searchHistory: true,
      deviceType: ['Desktop', 'Mobile', 'Tablet']
    },
    content: {
      categories: ['Technology', 'Entertainment', 'Lifestyle'],
      keywords: ['tech', 'fashion', 'food', 'travel'],
      excludeCategories: ['Sensitive content']
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-purple-100 text-purple-800';
      case 'banner': return 'bg-blue-100 text-blue-800';
      case 'overlay': return 'bg-orange-100 text-orange-800';
      case 'sponsored': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateBudgetUsage = (spent: number, budget: number) => {
    return (spent / budget) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Ad Management</h1>
          <p className="text-muted-foreground">Manage advertising campaigns and revenue</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="targeting">Targeting</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          {/* Campaign Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                <Play className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {campaigns.filter(c => c.status === 'active').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Out of {campaigns.length} total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${campaigns.reduce((sum, c) => sum + c.spent, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {campaigns.reduce((sum, c) => sum + c.impressions, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across all campaigns
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg CTR</CardTitle>
                <MousePointer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(campaigns.reduce((sum, c) => sum + c.ctr, 0) / campaigns.length).toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Click-through rate
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Campaigns Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Campaigns</CardTitle>
                  <CardDescription>Manage your advertising campaigns</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    New Campaign
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Spent</TableHead>
                    <TableHead>Impressions</TableHead>
                    <TableHead>CTR</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{campaign.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {campaign.startDate} - {campaign.endDate}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(campaign.type)}>
                          {campaign.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>${campaign.budget.toLocaleString()}</TableCell>
                      <TableCell>
                        <div>
                          <div>${campaign.spent.toLocaleString()}</div>
                          <Progress 
                            value={calculateBudgetUsage(campaign.spent, campaign.budget)} 
                            className="h-1 mt-1" 
                          />
                        </div>
                      </TableCell>
                      <TableCell>{campaign.impressions.toLocaleString()}</TableCell>
                      <TableCell>{campaign.ctr}%</TableCell>
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
                              <BarChart3 className="w-4 h-4 mr-2" />
                              View Analytics
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              {campaign.status === 'active' ? (
                                <>
                                  <Pause className="w-4 h-4 mr-2" />
                                  Pause
                                </>
                              ) : (
                                <>
                                  <Play className="w-4 h-4 mr-2" />
                                  Activate
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

        <TabsContent value="revenue" className="space-y-6">
          {/* Revenue Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${adRevenue.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +12.5% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${adRevenue.monthlyRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Current month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Revenue</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${adRevenue.dailyRevenue}</div>
                <p className="text-xs text-muted-foreground">
                  Today's earnings
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg CPM</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${adRevenue.cpm}</div>
                <p className="text-xs text-muted-foreground">
                  Cost per 1000 impressions
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Revenue chart visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Advertisers</CardTitle>
                <CardDescription>Highest spending advertisers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adRevenue.topAdvertisers.map((advertiser, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{advertiser.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {advertiser.impressions.toLocaleString()} impressions
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${advertiser.spend.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">spent</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="targeting" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Demographic Targeting</CardTitle>
                <CardDescription>Configure audience demographics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Age Ranges</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {targeting.demographics.ageRanges.map((age, index) => (
                      <Badge key={index} variant="secondary">{age}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label>Genders</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {targeting.demographics.genders.map((gender, index) => (
                      <Badge key={index} variant="secondary">{gender}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label>Locations</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {targeting.demographics.locations.map((location, index) => (
                      <Badge key={index} variant="secondary">{location}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label>Interests</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {targeting.demographics.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary">{interest}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Behavioral Targeting</CardTitle>
                <CardDescription>Target based on user behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Watch History</Label>
                    <p className="text-sm text-muted-foreground">
                      Target based on viewing patterns
                    </p>
                  </div>
                  <Switch checked={targeting.behavior.watchHistory} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Search History</Label>
                    <p className="text-sm text-muted-foreground">
                      Target based on search queries
                    </p>
                  </div>
                  <Switch checked={targeting.behavior.searchHistory} />
                </div>
                
                <div>
                  <Label>Device Types</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {targeting.behavior.deviceType.map((device, index) => (
                      <Badge key={index} variant="secondary">{device}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Targeting</CardTitle>
                <CardDescription>Target specific content categories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Include Categories</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {targeting.content.categories.map((category, index) => (
                      <Badge key={index} variant="secondary">{category}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label>Keywords</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {targeting.content.keywords.map((keyword, index) => (
                      <Badge key={index} variant="outline">{keyword}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label>Exclude Categories</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {targeting.content.excludeCategories.map((category, index) => (
                      <Badge key={index} variant="destructive">{category}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>Fine-tune targeting parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Bid Strategy</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Manual CPC</option>
                    <option>Target CPA</option>
                    <option>Target ROAS</option>
                    <option>Maximize Clicks</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label>Budget Type</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Daily Budget</option>
                    <option>Lifetime Budget</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label>Ad Schedule</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">Set Schedule</Button>
                    <Button variant="outline" size="sm">Time Zones</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                  <div className="text-center">
                    <Activity className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Performance charts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audience Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                  <div className="text-center">
                    <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Audience data</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                  <div className="text-center">
                    <Globe className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Geographic data</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ad Settings</CardTitle>
                <CardDescription>Configure advertising preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-optimization</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically optimize ad performance
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Frequency capping</Label>
                    <p className="text-sm text-muted-foreground">
                      Limit ad frequency per user
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Brand safety</Label>
                    <p className="text-sm text-muted-foreground">
                      Ensure brand-safe content placement
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Settings</CardTitle>
                <CardDescription>Configure revenue and payment settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>PayPal</option>
                    <option>Bank Transfer</option>
                    <option>Check</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label>Payout Threshold</Label>
                  <Input type="number" placeholder="100" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-payout</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatic monthly payouts
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}