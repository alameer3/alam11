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
  Baby, 
  Shield, 
  Clock, 
  Eye, 
  Lock, 
  Unlock, 
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
  Sun
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

interface ChildProfile {
  id: string;
  name: string;
  age: number;
  avatar: string;
  isActive: boolean;
  timeLimit: number;
  timeUsed: number;
  contentLevel: 'toddler' | 'preschool' | 'school' | 'teen';
  restrictions: string[];
  favorites: string[];
  lastActive: string;
}

interface ContentFilter {
  id: string;
  category: string;
  isBlocked: boolean;
  reason: string;
  ageRestriction: number;
  keywords: string[];
  autoBlock: boolean;
}

interface TimeLimit {
  id: string;
  childId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  maxHours: number;
  isActive: boolean;
}

interface EducationalContent {
  id: string;
  title: string;
  category: 'learning' | 'entertainment' | 'creative' | 'physical';
  ageRange: string;
  duration: number;
  rating: number;
  isApproved: boolean;
  tags: string[];
}

export default function KidsMode() {
  const [activeTab, setActiveTab] = useState('profiles');
  const [isKidsModeActive, setIsKidsModeActive] = useState(false);
  
  const [childProfiles, setChildProfiles] = useState<ChildProfile[]>([
    {
      id: '1',
      name: 'Emma',
      age: 8,
      avatar: '/avatars/emma.jpg',
      isActive: true,
      timeLimit: 120,
      timeUsed: 45,
      contentLevel: 'school',
      restrictions: ['violence', 'inappropriate language'],
      favorites: ['educational videos', 'crafts', 'music'],
      lastActive: '2024-01-15 15:30'
    },
    {
      id: '2',
      name: 'Liam',
      age: 5,
      avatar: '/avatars/liam.jpg',
      isActive: false,
      timeLimit: 60,
      timeUsed: 0,
      contentLevel: 'preschool',
      restrictions: ['violence', 'scary content', 'inappropriate language'],
      favorites: ['cartoons', 'puzzles', 'stories'],
      lastActive: '2024-01-15 14:00'
    },
    {
      id: '3',
      name: 'Sophia',
      age: 12,
      avatar: '/avatars/sophia.jpg',
      isActive: true,
      timeLimit: 180,
      timeUsed: 120,
      contentLevel: 'teen',
      restrictions: ['explicit content'],
      favorites: ['science videos', 'art tutorials', 'music'],
      lastActive: '2024-01-15 15:45'
    }
  ]);

  const [contentFilters, setContentFilters] = useState<ContentFilter[]>([
    {
      id: '1',
      category: 'Violence',
      isBlocked: true,
      reason: 'Inappropriate for children',
      ageRestriction: 13,
      keywords: ['fight', 'violence', 'weapon', 'blood'],
      autoBlock: true
    },
    {
      id: '2',
      category: 'Inappropriate Language',
      isBlocked: true,
      reason: 'Contains profanity',
      ageRestriction: 13,
      keywords: ['curse', 'profanity', 'swear'],
      autoBlock: true
    },
    {
      id: '3',
      category: 'Scary Content',
      isBlocked: true,
      reason: 'May frighten young children',
      ageRestriction: 10,
      keywords: ['horror', 'scary', 'monster', 'ghost'],
      autoBlock: true
    },
    {
      id: '4',
      category: 'Adult Content',
      isBlocked: true,
      reason: 'Not suitable for children',
      ageRestriction: 18,
      keywords: ['adult', 'mature', 'explicit'],
      autoBlock: true
    }
  ]);

  const [timeLimits, setTimeLimits] = useState<TimeLimit[]>([
    {
      id: '1',
      childId: '1',
      dayOfWeek: 'Monday',
      startTime: '08:00',
      endTime: '20:00',
      maxHours: 2,
      isActive: true
    },
    {
      id: '2',
      childId: '1',
      dayOfWeek: 'Tuesday',
      startTime: '08:00',
      endTime: '20:00',
      maxHours: 2,
      isActive: true
    },
    {
      id: '3',
      childId: '2',
      dayOfWeek: 'Weekend',
      startTime: '09:00',
      endTime: '18:00',
      maxHours: 1,
      isActive: true
    }
  ]);

  const [educationalContent, setEducationalContent] = useState<EducationalContent[]>([
    {
      id: '1',
      title: 'Learn Colors with Fun',
      category: 'learning',
      ageRange: '3-6',
      duration: 15,
      rating: 4.8,
      isApproved: true,
      tags: ['colors', 'education', 'preschool']
    },
    {
      id: '2',
      title: 'Science Experiments for Kids',
      category: 'learning',
      ageRange: '7-12',
      duration: 25,
      rating: 4.9,
      isApproved: true,
      tags: ['science', 'experiments', 'education']
    },
    {
      id: '3',
      title: 'Creative Art Projects',
      category: 'creative',
      ageRange: '5-10',
      duration: 30,
      rating: 4.7,
      isApproved: true,
      tags: ['art', 'creative', 'crafts']
    },
    {
      id: '4',
      title: 'Fun Exercise Games',
      category: 'physical',
      ageRange: '4-8',
      duration: 20,
      rating: 4.6,
      isApproved: true,
      tags: ['exercise', 'games', 'physical']
    }
  ]);

  const getContentLevelColor = (level: string) => {
    switch (level) {
      case 'toddler': return 'bg-blue-100 text-blue-800';
      case 'preschool': return 'bg-green-100 text-green-800';
      case 'school': return 'bg-yellow-100 text-yellow-800';
      case 'teen': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'learning': return 'bg-blue-100 text-blue-800';
      case 'entertainment': return 'bg-purple-100 text-purple-800';
      case 'creative': return 'bg-green-100 text-green-800';
      case 'physical': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateTimeRemaining = (limit: number, used: number) => {
    return Math.max(0, limit - used);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Kids Mode</h1>
          <p className="text-muted-foreground">Safe and educational content for children</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Parental Controls
          </Button>
          <Button 
            onClick={() => setIsKidsModeActive(!isKidsModeActive)}
            variant={isKidsModeActive ? "default" : "outline"}
          >
            <Baby className="w-4 h-4 mr-2" />
            {isKidsModeActive ? "Exit Kids Mode" : "Enter Kids Mode"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profiles">Profiles</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="limits">Time Limits</TabsTrigger>
          <TabsTrigger value="educational">Educational</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profiles" className="space-y-6">
          {/* Kids Mode Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Profiles</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {childProfiles.filter(p => p.isActive).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Out of {childProfiles.length} total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Time Used</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {childProfiles.reduce((sum, p) => sum + p.timeUsed, 0)} min
                </div>
                <p className="text-xs text-muted-foreground">
                  Today
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Content Blocked</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {contentFilters.filter(f => f.isBlocked).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Categories blocked
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Educational Content</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {educationalContent.filter(c => c.isApproved).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Approved videos
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Child Profiles */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Child Profiles</CardTitle>
                  <CardDescription>Manage individual child profiles and settings</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Child
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {childProfiles.map((child) => (
                  <Card key={child.id} className="relative">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                            {child.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{child.name}</div>
                            <div className="text-sm text-muted-foreground">{child.age} years old</div>
                          </div>
                        </div>
                        <Badge variant={child.isActive ? "default" : "secondary"}>
                          {child.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Time Used</span>
                          <span>{child.timeUsed}/{child.timeLimit} min</span>
                        </div>
                        <Progress value={(child.timeUsed / child.timeLimit) * 100} className="h-2" />
                      </div>
                      
                      <div>
                        <Badge className={getContentLevelColor(child.contentLevel)}>
                          {child.contentLevel}
                        </Badge>
                      </div>
                      
                      <div className="text-sm">
                        <div className="font-medium">Restrictions:</div>
                        <div className="text-muted-foreground">
                          {child.restrictions.join(', ')}
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <div className="font-medium">Favorites:</div>
                        <div className="text-muted-foreground">
                          {child.favorites.join(', ')}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Content Filtering</CardTitle>
                  <CardDescription>Manage content restrictions and filters</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Age Restriction</TableHead>
                    <TableHead>Keywords</TableHead>
                    <TableHead>Auto Block</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contentFilters.map((filter) => (
                    <TableRow key={filter.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{filter.category}</div>
                          <div className="text-sm text-muted-foreground">
                            {filter.reason}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={filter.isBlocked ? "destructive" : "secondary"}>
                          {filter.isBlocked ? "Blocked" : "Allowed"}
                        </Badge>
                      </TableCell>
                      <TableCell>{filter.ageRestriction}+</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {filter.keywords.slice(0, 3).map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                          {filter.keywords.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{filter.keywords.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Switch checked={filter.autoBlock} />
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
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
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

        <TabsContent value="limits" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Time Limits</CardTitle>
                  <CardDescription>Set screen time limits for each child</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Time Limit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Child</TableHead>
                    <TableHead>Day</TableHead>
                    <TableHead>Time Window</TableHead>
                    <TableHead>Max Hours</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeLimits.map((limit) => {
                    const child = childProfiles.find(c => c.id === limit.childId);
                    return (
                      <TableRow key={limit.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {child?.name.charAt(0)}
                            </div>
                            <span className="font-medium">{child?.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{limit.dayOfWeek}</TableCell>
                        <TableCell>
                          {limit.startTime} - {limit.endTime}
                        </TableCell>
                        <TableCell>{limit.maxHours} hours</TableCell>
                        <TableCell>
                          <Badge variant={limit.isActive ? "default" : "secondary"}>
                            {limit.isActive ? "Active" : "Inactive"}
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
                                <Clock className="w-4 h-4 mr-2" />
                                View Usage
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
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="educational" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Educational Content</CardTitle>
                <CardDescription>Curated educational videos and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {educationalContent.map((content) => (
                    <div key={content.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-medium">{content.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {content.ageRange} • {content.duration} min
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getCategoryColor(content.category)}>
                            {content.category}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{content.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {content.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Video className="w-4 h-4 mr-2" />
                          Watch
                        </Button>
                        <Button variant="outline" size="sm">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity Categories</CardTitle>
                <CardDescription>Different types of educational activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Learning</div>
                      <div className="text-sm text-muted-foreground">
                        Educational videos and lessons
                      </div>
                    </div>
                    <Badge variant="outline">12 videos</Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Video className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Entertainment</div>
                      <div className="text-sm text-muted-foreground">
                        Fun and engaging content
                      </div>
                    </div>
                    <Badge variant="outline">8 videos</Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Palette className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Creative</div>
                      <div className="text-sm text-muted-foreground">
                        Art, crafts, and creative projects
                      </div>
                    </div>
                    <Badge variant="outline">15 videos</Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Gamepad2 className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Physical</div>
                      <div className="text-sm text-muted-foreground">
                        Exercise and movement activities
                      </div>
                    </div>
                    <Badge variant="outline">6 videos</Badge>
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
                <CardTitle>Kids Mode Settings</CardTitle>
                <CardDescription>Configure kids mode preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-activate kids mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically enable kids mode for child profiles
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Content filtering</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically filter inappropriate content
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Time limit enforcement</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically enforce screen time limits
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Educational recommendations</Label>
                    <p className="text-sm text-muted-foreground">
                      Show educational content suggestions
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Parental Controls</CardTitle>
                <CardDescription>Advanced parental control settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default age restriction</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>3+ (Toddler)</option>
                    <option>5+ (Preschool)</option>
                    <option>7+ (School)</option>
                    <option>13+ (Teen)</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label>Default time limit (hours)</Label>
                  <Input type="number" placeholder="2" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require parent approval</Label>
                    <p className="text-sm text-muted-foreground">
                      Require approval for new content
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Safe search only</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable safe search for all queries
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