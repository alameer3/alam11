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
  Globe, 
  Languages, 
  Languages as Translate, 
  FileText, 
  Download, 
  Upload,
  Check,
  X,
  AlertTriangle,
  Settings,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  MoreVertical,
  Globe2,
  Clock,
  Users,
  Activity,
  Flag,
  BookOpen
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

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  isActive: boolean;
  isDefault: boolean;
  completion: number;
  lastUpdated: string;
  translator: string;
}

interface TranslationKey {
  key: string;
  namespace: string;
  translations: Record<string, string>;
  status: 'translated' | 'pending' | 'missing' | 'needs_review';
  context: string;
  lastModified: string;
  modifiedBy: string;
}

interface CulturalAdaptation {
  language: string;
  dateFormat: string;
  timeFormat: string;
  currency: string;
  numberFormat: string;
  direction: 'ltr' | 'rtl';
  timezone: string;
}

export default function MultiLanguageSupport() {
  const [activeTab, setActiveTab] = useState('languages');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  
  const [languages, setLanguages] = useState<Language[]>([
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      isActive: true,
      isDefault: true,
      completion: 100,
      lastUpdated: '2024-01-15',
      translator: 'System'
    },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
      isActive: true,
      isDefault: false,
      completion: 85,
      lastUpdated: '2024-01-14',
      translator: 'Maria Garcia'
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷',
      isActive: true,
      isDefault: false,
      completion: 72,
      lastUpdated: '2024-01-13',
      translator: 'Jean Dubois'
    },
    {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
      isActive: true,
      isDefault: false,
      completion: 68,
      lastUpdated: '2024-01-12',
      translator: 'Hans Mueller'
    },
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      flag: '🇸🇦',
      isActive: true,
      isDefault: false,
      completion: 45,
      lastUpdated: '2024-01-11',
      translator: 'Ahmed Hassan'
    },
    {
      code: 'zh',
      name: 'Chinese',
      nativeName: '中文',
      flag: '🇨🇳',
      isActive: false,
      isDefault: false,
      completion: 30,
      lastUpdated: '2024-01-10',
      translator: 'Li Wei'
    }
  ]);

  const [translationKeys, setTranslationKeys] = useState<TranslationKey[]>([
    {
      key: 'welcome_message',
      namespace: 'common',
      translations: {
        en: 'Welcome to our platform',
        es: 'Bienvenido a nuestra plataforma',
        fr: 'Bienvenue sur notre plateforme',
        de: 'Willkommen auf unserer Plattform',
        ar: 'مرحباً بكم في منصتنا'
      },
      status: 'translated',
      context: 'Main welcome message shown to users',
      lastModified: '2024-01-15',
      modifiedBy: 'System'
    },
    {
      key: 'upload_video',
      namespace: 'actions',
      translations: {
        en: 'Upload Video',
        es: 'Subir Video',
        fr: 'Télécharger Vidéo',
        de: 'Video hochladen',
        ar: 'رفع فيديو'
      },
      status: 'translated',
      context: 'Button text for video upload',
      lastModified: '2024-01-14',
      modifiedBy: 'Maria Garcia'
    },
    {
      key: 'search_placeholder',
      namespace: 'search',
      translations: {
        en: 'Search videos...',
        es: 'Buscar videos...',
        fr: 'Rechercher des vidéos...',
        de: 'Videos suchen...',
        ar: 'البحث عن الفيديوهات...'
      },
      status: 'translated',
      context: 'Search input placeholder text',
      lastModified: '2024-01-13',
      modifiedBy: 'Jean Dubois'
    },
    {
      key: 'new_feature',
      namespace: 'notifications',
      translations: {
        en: 'New feature available!',
        es: '¡Nueva función disponible!',
        fr: 'Nouvelle fonctionnalité disponible !',
        de: 'Neue Funktion verfügbar!',
        ar: 'ميزة جديدة متاحة!'
      },
      status: 'pending',
      context: 'Notification for new features',
      lastModified: '2024-01-12',
      modifiedBy: 'System'
    }
  ]);

  const [culturalAdaptations, setCulturalAdaptations] = useState<CulturalAdaptation[]>([
    {
      language: 'en',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12-hour',
      currency: 'USD',
      numberFormat: '1,234.56',
      direction: 'ltr',
      timezone: 'UTC'
    },
    {
      language: 'es',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24-hour',
      currency: 'EUR',
      numberFormat: '1.234,56',
      direction: 'ltr',
      timezone: 'Europe/Madrid'
    },
    {
      language: 'ar',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24-hour',
      currency: 'SAR',
      numberFormat: '١٬٢٣٤٫٥٦',
      direction: 'rtl',
      timezone: 'Asia/Riyadh'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'translated': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'missing': return 'bg-red-100 text-red-800';
      case 'needs_review': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCompletionColor = (completion: number) => {
    if (completion >= 80) return 'text-green-600';
    if (completion >= 60) return 'text-yellow-600';
    if (completion >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Multi-Language Support</h1>
          <p className="text-muted-foreground">Manage translations and cultural adaptations</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Translations
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Language
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="languages">Languages</TabsTrigger>
          <TabsTrigger value="translations">Translations</TabsTrigger>
          <TabsTrigger value="cultural">Cultural</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="languages" className="space-y-6">
          {/* Language Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Languages</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {languages.filter(l => l.isActive).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Out of {languages.length} total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
                <Check className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(languages.reduce((sum, l) => sum + l.completion, 0) / languages.length)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Translation completion
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Translators</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Set(languages.map(l => l.translator)).size}
                </div>
                <p className="text-xs text-muted-foreground">
                  Active translators
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2 days</div>
                <p className="text-xs text-muted-foreground">
                  Ago
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Languages Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Supported Languages</CardTitle>
                  <CardDescription>Manage language availability and translations</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Language
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Language</TableHead>
                    <TableHead>Native Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Completion</TableHead>
                    <TableHead>Translator</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {languages.map((language) => (
                    <TableRow key={language.code}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{language.flag}</span>
                          <div>
                            <div className="font-medium">{language.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {language.code.toUpperCase()}
                              {language.isDefault && (
                                <Badge variant="secondary" className="ml-2">Default</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{language.nativeName}</TableCell>
                      <TableCell>
                        <Badge variant={language.isActive ? "default" : "secondary"}>
                          {language.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={language.completion} className="w-16" />
                          <span className={`text-sm font-medium ${getCompletionColor(language.completion)}`}>
                            {language.completion}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{language.translator}</TableCell>
                      <TableCell>{language.lastUpdated}</TableCell>
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
                              <Translate className="w-4 h-4 mr-2" />
                              Translate
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Export
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

        <TabsContent value="translations" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Translation Keys</CardTitle>
                  <CardDescription>Manage translation keys and their values</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Key
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Key</TableHead>
                    <TableHead>Namespace</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Translations</TableHead>
                    <TableHead>Context</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {translationKeys.map((key) => (
                    <TableRow key={key.key}>
                      <TableCell>
                        <div className="font-medium">{key.key}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{key.namespace}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(key.status)}>
                          {key.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {Object.entries(key.translations).map(([lang, text]) => (
                            <div key={lang} className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {lang.toUpperCase()}
                              </Badge>
                              <span className="text-sm truncate max-w-32">
                                {text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="text-sm text-muted-foreground truncate">
                          {key.context}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{key.lastModified}</div>
                          <div className="text-muted-foreground">by {key.modifiedBy}</div>
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
                              <Translate className="w-4 h-4 mr-2" />
                              Translate
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Export
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

        <TabsContent value="cultural" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cultural Adaptations</CardTitle>
                <CardDescription>Configure cultural settings for each language</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {culturalAdaptations.map((adaptation) => (
                    <div key={adaptation.language} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">
                          {languages.find(l => l.code === adaptation.language)?.name || adaptation.language}
                        </h3>
                        <Badge variant="outline">{adaptation.language.toUpperCase()}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-xs">Date Format</Label>
                          <div className="font-medium">{adaptation.dateFormat}</div>
                        </div>
                        <div>
                          <Label className="text-xs">Time Format</Label>
                          <div className="font-medium">{adaptation.timeFormat}</div>
                        </div>
                        <div>
                          <Label className="text-xs">Currency</Label>
                          <div className="font-medium">{adaptation.currency}</div>
                        </div>
                        <div>
                          <Label className="text-xs">Number Format</Label>
                          <div className="font-medium">{adaptation.numberFormat}</div>
                        </div>
                        <div>
                          <Label className="text-xs">Direction</Label>
                          <div className="font-medium">{adaptation.direction.toUpperCase()}</div>
                        </div>
                        <div>
                          <Label className="text-xs">Timezone</Label>
                          <div className="font-medium">{adaptation.timezone}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Translation Statistics</CardTitle>
                <CardDescription>Overview of translation progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {languages.map((language) => (
                    <div key={language.code} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{language.flag}</span>
                        <div>
                          <div className="font-medium">{language.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {language.completion}% complete
                          </div>
                        </div>
                      </div>
                      <Progress value={language.completion} className="w-24" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Language Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                  <div className="text-center">
                    <Globe2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Language usage chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Translation Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                  <div className="text-center">
                    <Activity className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Translation activity</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                  <div className="text-center">
                    <Flag className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Regional data</p>
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
                <CardTitle>Translation Settings</CardTitle>
                <CardDescription>Configure translation preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-translation</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically translate missing keys
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Translation memory</Label>
                    <p className="text-sm text-muted-foreground">
                      Use translation memory for consistency
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Quality checks</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable automatic quality validation
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cultural Settings</CardTitle>
                <CardDescription>Configure cultural adaptation preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-detection</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically detect user language
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Cultural adaptation</Label>
                    <p className="text-sm text-muted-foreground">
                      Adapt content for cultural differences
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>RTL support</Label>
                    <p className="text-sm text-muted-foreground">
                      Support right-to-left languages
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