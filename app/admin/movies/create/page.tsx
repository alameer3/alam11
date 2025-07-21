'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { 
  ArrowRightIcon,
  FilmIcon,
  PhotoIcon,
  CalendarDaysIcon,
  ClockIcon,
  StarIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

interface Section {
  id: number
  name: string
}

interface Country {
  id: number
  name: string
  code: string
}

interface Language {
  id: number
  name: string
  code: string
}

interface Quality {
  id: number
  name: string
  resolution: string
}

interface Category {
  id: number
  name: string
  slug: string
}

export default function CreateMoviePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [sections, setSections] = useState<Section[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [languages, setLanguages] = useState<Language[]>([])
  const [qualities, setQualities] = useState<Quality[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])

  const [formData, setFormData] = useState({
    title: '',
    original_title: '',
    description: '',
    poster: '',
    backdrop: '',
    trailer_url: '',
    release_date: '',
    runtime: '',
    imdb_id: '',
    imdb_rating: '',
    tmdb_id: '',
    tmdb_rating: '',
    section_id: '',
    country_id: '',
    language_id: '',
    quality_id: '',
    is_featured: false,
    is_trending: false,
    is_active: true
  })

  const fetchOptions = async () => {
    try {
      const [sectionsRes, countriesRes, languagesRes, qualitiesRes, categoriesRes] = await Promise.all([
        fetch('/api/sections'),
        fetch('/api/countries'),
        fetch('/api/languages'),
        fetch('/api/qualities'),
        fetch('/api/categories')
      ])

      if (sectionsRes.ok) setSections(await sectionsRes.json())
      if (countriesRes.ok) setCountries(await countriesRes.json())
      if (languagesRes.ok) setLanguages(await languagesRes.json())
      if (qualitiesRes.ok) setQualities(await qualitiesRes.json())
      if (categoriesRes.ok) setCategories(await categoriesRes.json())
    } catch (error) {
      // console.error('خطأ في جلب الخيارات:', error)
    }
  }

  useEffect(() => {
    fetchOptions()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\u0600-\u06FF\w\s-]/g, '') // Keep Arabic, English, numbers, spaces, hyphens
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      alert('يرجى إدخال عنوان الفيلم')
      return
    }

    try {
      setLoading(true)

      const movieData = {
        ...formData,
        slug: generateSlug(formData.title),
        runtime: formData.runtime ? parseInt(formData.runtime) : null,
        imdb_rating: formData.imdb_rating ? parseFloat(formData.imdb_rating) : null,
        tmdb_rating: formData.tmdb_rating ? parseFloat(formData.tmdb_rating) : null,
        tmdb_id: formData.tmdb_id ? parseInt(formData.tmdb_id) : null,
        section_id: formData.section_id ? parseInt(formData.section_id) : null,
        country_id: formData.country_id ? parseInt(formData.country_id) : null,
        language_id: formData.language_id ? parseInt(formData.language_id) : null,
        quality_id: formData.quality_id ? parseInt(formData.quality_id) : null,
        categories: selectedCategories
      }

      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieData)
      })

      if (response.ok) {
        const movie = await response.json()
        router.push(`/admin/movies/${movie.id}/edit`)
      } else {
        const error = await response.json()
        alert(`فشل في إضافة الفيلم: ${error.message || 'خطأ غير معروف'}`)
      }
    } catch (error) {
      // console.error('خطأ في إضافة الفيلم:', error)
      alert('خطأ في إضافة الفيلم')
    } finally {
      setLoading(false)
    }
  }

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <div className="container mx-auto p-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/movies">
          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </Link>
        
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <FilmIcon className="w-8 h-8 text-blue-500" />
            إضافة فيلم جديد
          </h1>
          <p className="text-gray-400 mt-1">
            أضف فيلم جديد إلى مكتبة الأفلام
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">المعلومات الأساسية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">عنوان الفيلم *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="أدخل عنوان الفيلم"
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="original_title" className="text-white">العنوان الأصلي</Label>
                    <Input
                      id="original_title"
                      name="original_title"
                      value={formData.original_title}
                      onChange={handleInputChange}
                      placeholder="العنوان الأصلي (إنجليزي)"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">الوصف</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="اكتب وصف مختصر للفيلم..."
                    rows={4}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="release_date" className="text-white flex items-center gap-2">
                      <CalendarDaysIcon className="w-4 h-4" />
                      تاريخ الإصدار
                    </Label>
                    <Input
                      id="release_date"
                      name="release_date"
                      type="date"
                      value={formData.release_date}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="runtime" className="text-white flex items-center gap-2">
                      <ClockIcon className="w-4 h-4" />
                      المدة (بالدقائق)
                    </Label>
                    <Input
                      id="runtime"
                      name="runtime"
                      type="number"
                      value={formData.runtime}
                      onChange={handleInputChange}
                      placeholder="120"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* External Links */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">الروابط والمعرفات الخارجية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="imdb_id" className="text-white">معرف IMDB</Label>
                    <Input
                      id="imdb_id"
                      name="imdb_id"
                      value={formData.imdb_id}
                      onChange={handleInputChange}
                      placeholder="tt1234567"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tmdb_id" className="text-white">معرف TMDB</Label>
                    <Input
                      id="tmdb_id"
                      name="tmdb_id"
                      type="number"
                      value={formData.tmdb_id}
                      onChange={handleInputChange}
                      placeholder="123456"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="imdb_rating" className="text-white flex items-center gap-2">
                      <StarIcon className="w-4 h-4" />
                      تقييم IMDB
                    </Label>
                    <Input
                      id="imdb_rating"
                      name="imdb_rating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={formData.imdb_rating}
                      onChange={handleInputChange}
                      placeholder="8.5"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tmdb_rating" className="text-white flex items-center gap-2">
                      <StarIcon className="w-4 h-4" />
                      تقييم TMDB
                    </Label>
                    <Input
                      id="tmdb_rating"
                      name="tmdb_rating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={formData.tmdb_rating}
                      onChange={handleInputChange}
                      placeholder="8.2"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trailer_url" className="text-white flex items-center gap-2">
                    <EyeIcon className="w-4 h-4" />
                    رابط الإعلان التشويقي
                  </Label>
                  <Input
                    id="trailer_url"
                    name="trailer_url"
                    value={formData.trailer_url}
                    onChange={handleInputChange}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <PhotoIcon className="w-5 h-5" />
                  الصور
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="poster" className="text-white">رابط البوستر</Label>
                  <Input
                    id="poster"
                    name="poster"
                    value={formData.poster}
                    onChange={handleInputChange}
                    placeholder="https://example.com/poster.jpg"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="backdrop" className="text-white">رابط الخلفية</Label>
                  <Input
                    id="backdrop"
                    name="backdrop"
                    value={formData.backdrop}
                    onChange={handleInputChange}
                    placeholder="https://example.com/backdrop.jpg"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Classifications */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">التصنيفات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="section_id" className="text-white">القسم</Label>
                  <select
                    id="section_id"
                    name="section_id"
                    value={formData.section_id}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  >
                    <option value="">اختر القسم</option>
                    {sections.map(section => (
                      <option key={section.id} value={section.id}>
                        {section.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country_id" className="text-white">الدولة</Label>
                  <select
                    id="country_id"
                    name="country_id"
                    value={formData.country_id}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  >
                    <option value="">اختر الدولة</option>
                    {countries.map(country => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language_id" className="text-white">اللغة</Label>
                  <select
                    id="language_id"
                    name="language_id"
                    value={formData.language_id}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  >
                    <option value="">اختر اللغة</option>
                    {languages.map(language => (
                      <option key={language.id} value={language.id}>
                        {language.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quality_id" className="text-white">الجودة</Label>
                  <select
                    id="quality_id"
                    name="quality_id"
                    value={formData.quality_id}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  >
                    <option value="">اختر الجودة</option>
                    {qualities.map(quality => (
                      <option key={quality.id} value={quality.id}>
                        {quality.name} - {quality.resolution}
                      </option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">الأنواع</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {categories.map(category => (
                    <label
                      key={category.id}
                      className="flex items-center space-x-2 space-x-reverse p-2 rounded hover:bg-gray-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => toggleCategory(category.id)}
                        className="form-checkbox text-blue-600"
                      />
                      <span className="text-white text-sm">{category.name}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">الحالة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="is_featured" className="text-white">مميز</Label>
                  <Switch
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => handleSwitchChange('is_featured', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="is_trending" className="text-white">رائج</Label>
                  <Switch
                    id="is_trending"
                    checked={formData.is_trending}
                    onCheckedChange={(checked) => handleSwitchChange('is_trending', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="is_active" className="text-white">نشط</Label>
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => handleSwitchChange('is_active', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-2">
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? 'جاري الحفظ...' : 'حفظ الفيلم'}
              </Button>
              
              <Link href="/admin/movies" className="block">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  إلغاء
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}