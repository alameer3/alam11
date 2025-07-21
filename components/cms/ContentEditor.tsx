'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  Save, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Image,
  Video,
  FileText,
  Settings
} from 'lucide-react';

interface ContentData {
  id?: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail: string;
  videoUrl: string;
  duration: string;
  quality: string;
  language: string;
  ageRating: string;
  isPublished: boolean;
  isFeatured: boolean;
  releaseDate: string;
  director: string;
  cast: string[];
  genre: string[];
}

export default function ContentEditor({ initialData }: { initialData?: ContentData }) {
  const [content, setContent] = useState<ContentData>(initialData || {
    title: '',
    description: '',
    category: '',
    tags: [],
    thumbnail: '',
    videoUrl: '',
    duration: '',
    quality: '',
    language: 'ar',
    ageRating: 'G',
    isPublished: false,
    isFeatured: false,
    releaseDate: '',
    director: '',
    cast: [],
    genre: []
  });

  const [newTag, setNewTag] = useState('');
  const [newCast, setNewCast] = useState('');
  const [newGenre, setNewGenre] = useState('');

  const handleSave = () => {
    // // // console.log('Saving content:', content);
    // API call to save content
  };

  const handlePublish = () => {
    setContent(prev => ({ ...prev, isPublished: true }));
    handleSave();
  };

  const addTag = () => {
    if (newTag.trim() && !content.tags.includes(newTag.trim())) {
      setContent(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setContent(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const addCast = () => {
    if (newCast.trim() && !content.cast.includes(newCast.trim())) {
      setContent(prev => ({ ...prev, cast: [...prev.cast, newCast.trim()] }));
      setNewCast('');
    }
  };

  const removeCast = (member: string) => {
    setContent(prev => ({ ...prev, cast: prev.cast.filter(c => c !== member) }));
  };

  const addGenre = () => {
    if (newGenre.trim() && !content.genre.includes(newGenre.trim())) {
      setContent(prev => ({ ...prev, genre: [...prev.genre, newGenre.trim()] }));
      setNewGenre('');
    }
  };

  const removeGenre = (genre: string) => {
    setContent(prev => ({ ...prev, genre: prev.genre.filter(g => g !== genre) }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">محرر المحتوى</h1>
          <p className="text-gray-600">إنشاء وتحرير المحتوى</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            معاينة
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            حفظ
          </Button>
          <Button onClick={handlePublish} disabled={content.isPublished}>
            <Upload className="h-4 w-4 mr-2" />
            نشر
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">معلومات أساسية</TabsTrigger>
          <TabsTrigger value="media">الوسائط</TabsTrigger>
          <TabsTrigger value="details">تفاصيل إضافية</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        {/* Basic Information */}
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>المعلومات الأساسية</CardTitle>
              <CardDescription>العنوان والوصف والفئة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">العنوان</Label>
                <Input
                  id="title"
                  value={content.title}
                  onChange={(e) => setContent(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="أدخل عنوان المحتوى"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">الوصف</Label>
                <Textarea
                  id="description"
                  value={content.description}
                  onChange={(e) => setContent(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="أدخل وصف المحتوى"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">الفئة</Label>
                  <Select value={content.category} onValueChange={(value) => setContent(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="movies">أفلام</SelectItem>
                      <SelectItem value="series">مسلسلات</SelectItem>
                      <SelectItem value="documentaries">وثائقيات</SelectItem>
                      <SelectItem value="shows">برامج</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">اللغة</Label>
                  <Select value={content.language} onValueChange={(value) => setContent(prev => ({ ...prev, language: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="en">الإنجليزية</SelectItem>
                      <SelectItem value="fr">الفرنسية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>العلامات</Label>
                <div className="flex space-x-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="أدخل علامة جديدة"
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button onClick={addTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {content.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media */}
        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>الوسائط</CardTitle>
              <CardDescription>الصورة المصغرة وملف الفيديو</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="thumbnail">الصورة المصغرة</Label>
                <div className="flex space-x-2">
                  <Input
                    id="thumbnail"
                    value={content.thumbnail}
                    onChange={(e) => setContent(prev => ({ ...prev, thumbnail: e.target.value }))}
                    placeholder="رابط الصورة المصغرة"
                  />
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    رفع
                  </Button>
                </div>
                {content.thumbnail && (
                  <img src={content.thumbnail} alt="Thumbnail" className="w-32 h-20 object-cover rounded" />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="videoUrl">رابط الفيديو</Label>
                <div className="flex space-x-2">
                  <Input
                    id="videoUrl"
                    value={content.videoUrl}
                    onChange={(e) => setContent(prev => ({ ...prev, videoUrl: e.target.value }))}
                    placeholder="رابط الفيديو"
                  />
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    رفع
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">المدة</Label>
                  <Input
                    id="duration"
                    value={content.duration}
                    onChange={(e) => setContent(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="00:00:00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quality">الجودة</Label>
                  <Select value={content.quality} onValueChange={(value) => setContent(prev => ({ ...prev, quality: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الجودة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="480p">480p</SelectItem>
                      <SelectItem value="720p">720p</SelectItem>
                      <SelectItem value="1080p">1080p</SelectItem>
                      <SelectItem value="4K">4K</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Additional Details */}
        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تفاصيل إضافية</CardTitle>
              <CardDescription>معلومات المخرج والطاقم والنوع</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="director">المخرج</Label>
                <Input
                  id="director"
                  value={content.director}
                  onChange={(e) => setContent(prev => ({ ...prev, director: e.target.value }))}
                  placeholder="اسم المخرج"
                />
              </div>

              <div className="space-y-2">
                <Label>طاقم التمثيل</Label>
                <div className="flex space-x-2">
                  <Input
                    value={newCast}
                    onChange={(e) => setNewCast(e.target.value)}
                    placeholder="أدخل اسم الممثل"
                    onKeyPress={(e) => e.key === 'Enter' && addCast()}
                  />
                  <Button onClick={addCast} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {content.cast.map((member) => (
                    <Badge key={member} variant="secondary" className="cursor-pointer" onClick={() => removeCast(member)}>
                      {member} ×
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>النوع</Label>
                <div className="flex space-x-2">
                  <Input
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    placeholder="أدخل النوع"
                    onKeyPress={(e) => e.key === 'Enter' && addGenre()}
                  />
                  <Button onClick={addGenre} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {content.genre.map((genre) => (
                    <Badge key={genre} variant="secondary" className="cursor-pointer" onClick={() => removeGenre(genre)}>
                      {genre} ×
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="releaseDate">تاريخ الإصدار</Label>
                  <Input
                    id="releaseDate"
                    type="date"
                    value={content.releaseDate}
                    onChange={(e) => setContent(prev => ({ ...prev, releaseDate: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ageRating">التصنيف العمري</Label>
                  <Select value={content.ageRating} onValueChange={(value) => setContent(prev => ({ ...prev, ageRating: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="G">G - للجميع</SelectItem>
                      <SelectItem value="PG">PG - تحت إشراف الوالدين</SelectItem>
                      <SelectItem value="PG-13">PG-13 - تحت إشراف الوالدين للأطفال فوق 13</SelectItem>
                      <SelectItem value="R">R - للكبار فقط</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تحسين محركات البحث</CardTitle>
              <CardDescription>إعدادات SEO للمحتوى</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seoTitle">عنوان SEO</Label>
                <Input
                  id="seoTitle"
                  placeholder="عنوان محسن لمحركات البحث"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoDescription">وصف SEO</Label>
                <Textarea
                  id="seoDescription"
                  placeholder="وصف محسن لمحركات البحث"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoKeywords">كلمات مفتاحية</Label>
                <Input
                  id="seoKeywords"
                  placeholder="كلمات مفتاحية مفصولة بفواصل"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات النشر</CardTitle>
              <CardDescription>خيارات النشر والعرض</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>نشر المحتوى</Label>
                  <p className="text-sm text-muted-foreground">إتاحة المحتوى للمشاهدين</p>
                </div>
                <Switch
                  checked={content.isPublished}
                  onCheckedChange={(checked) => setContent(prev => ({ ...prev, isPublished: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>محتوى مميز</Label>
                  <p className="text-sm text-muted-foreground">عرض المحتوى في القسم المميز</p>
                </div>
                <Switch
                  checked={content.isFeatured}
                  onCheckedChange={(checked) => setContent(prev => ({ ...prev, isFeatured: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>التعليقات</Label>
                  <p className="text-sm text-muted-foreground">السماح بالتعليقات على المحتوى</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>التقييمات</Label>
                  <p className="text-sm text-muted-foreground">السماح بتقييم المحتوى</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}