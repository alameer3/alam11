import { z } from 'zod'

// نماذج البيانات
export const MovieSchema = z.object({
  id: z.string(),
  title: z.string(),
  originalTitle: z.string().optional(),
  year: z.string(),
  rating: z.string().optional(),
  duration: z.string().optional(),
  genre: z.array(z.string()),
  country: z.string().optional(),
  language: z.string().optional(),
  quality: z.string().optional(),
  size: z.string().optional(),
  director: z.string().optional(),
  cast: z.array(z.string()).optional(),
  plot: z.string().optional(),
  poster: z.string().optional(),
  trailer: z.string().optional(),
  downloadLinks: z.array(z.object({
    quality: z.string(),
    size: z.string(),
    link: z.string()
  })).optional(),
  watchLinks: z.array(z.object({
    server: z.string(),
    link: z.string()
  })).optional(),
  featured: z.boolean().default(false),
  releaseDate: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date())
})

export const SeriesSchema = z.object({
  id: z.string(),
  title: z.string(),
  originalTitle: z.string().optional(),
  year: z.string(),
  rating: z.string().optional(),
  genre: z.array(z.string()),
  country: z.string().optional(),
  language: z.string().optional(),
  seasons: z.number().default(1),
  episodes: z.number().optional(),
  status: z.enum(['مكتمل', 'مستمر', 'متوقف']).default('مكتمل'),
  director: z.string().optional(),
  cast: z.array(z.string()).optional(),
  plot: z.string().optional(),
  poster: z.string().optional(),
  trailer: z.string().optional(),
  featured: z.boolean().default(false),
  releaseDate: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date())
})

export const ShowSchema = z.object({
  id: z.string(),
  title: z.string(),
  originalTitle: z.string().optional(),
  year: z.string(),
  rating: z.string().optional(),
  genre: z.array(z.string()),
  country: z.string().optional(),
  language: z.string().optional(),
  duration: z.string().optional(),
  channel: z.string().optional(),
  director: z.string().optional(),
  cast: z.array(z.string()).optional(),
  plot: z.string().optional(),
  poster: z.string().optional(),
  watchLinks: z.array(z.object({
    server: z.string(),
    link: z.string()
  })).optional(),
  featured: z.boolean().default(false),
  airDate: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date())
})

export const MixSchema = z.object({
  id: z.string(),
  title: z.string(),
  originalTitle: z.string().optional(),
  year: z.string(),
  type: z.enum(['أغنية', 'كليب', 'حفلة', 'وثائقي', 'أخرى']),
  artist: z.string().optional(),
  duration: z.string().optional(),
  genre: z.array(z.string()),
  language: z.string().optional(),
  quality: z.string().optional(),
  plot: z.string().optional(),
  poster: z.string().optional(),
  downloadLinks: z.array(z.object({
    quality: z.string(),
    size: z.string(),
    link: z.string()
  })).optional(),
  watchLinks: z.array(z.object({
    server: z.string(),
    link: z.string()
  })).optional(),
  featured: z.boolean().default(false),
  releaseDate: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date())
})

export type Movie = z.infer<typeof MovieSchema>
export type Series = z.infer<typeof SeriesSchema>
export type Show = z.infer<typeof ShowSchema>
export type Mix = z.infer<typeof MixSchema>

// نظام إدارة المحتوى
export class ContentManager {
  private movies: Movie[] = []
  private series: Series[] = []
  private shows: Show[] = []
  private mix: Mix[] = []
  
  // إدارة الأفلام
  async addMovie(movieData: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>): Promise<Movie> {
    const movie: Movie = {
      ...movieData,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    this.movies.push(movie)
    await this.saveToDatabase('movies', movie)
    return movie
  }
  
  async updateMovie(id: string, updates: Partial<Movie>): Promise<Movie | null> {
    const index = this.movies.findIndex(m => m.id === id)
    if (index === -1) return null
    
    this.movies[index] = {
      ...this.movies[index],
      ...updates,
      updatedAt: new Date()
    }
    
    await this.saveToDatabase('movies', this.movies[index])
    return this.movies[index]
  }
  
  async deleteMovie(id: string): Promise<boolean> {
    const index = this.movies.findIndex(m => m.id === id)
    if (index === -1) return false
    
    this.movies.splice(index, 1)
    await this.deleteFromDatabase('movies', id)
    return true
  }
  
  getMovies(filter?: {
    genre?: string
    year?: string
    country?: string
    quality?: string
    featured?: boolean
    search?: string
  }): Movie[] {
    let filtered = [...this.movies]
    
    if (filter) {
      if (filter.genre) {
        filtered = filtered.filter(m => m.genre.includes(filter.genre!))
      }
      if (filter.year) {
        filtered = filtered.filter(m => m.year === filter.year)
      }
      if (filter.country) {
        filtered = filtered.filter(m => m.country === filter.country)
      }
      if (filter.quality) {
        filtered = filtered.filter(m => m.quality === filter.quality)
      }
      if (filter.featured !== undefined) {
        filtered = filtered.filter(m => m.featured === filter.featured)
      }
      if (filter.search) {
        const search = filter.search.toLowerCase()
        filtered = filtered.filter(m => 
          m.title.toLowerCase().includes(search) ||
          m.originalTitle?.toLowerCase().includes(search) ||
          m.plot?.toLowerCase().includes(search)
        )
      }
    }
    
    return filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }
  
  getMovie(id: string): Movie | null {
    return this.movies.find(m => m.id === id) || null
  }
  
  // إدارة المسلسلات (نفس النمط)
  async addSeries(seriesData: Omit<Series, 'id' | 'createdAt' | 'updatedAt'>): Promise<Series> {
    const series: Series = {
      ...seriesData,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    this.series.push(series)
    await this.saveToDatabase('series', series)
    return series
  }
  
  getSeries(filter?: {
    genre?: string
    year?: string
    status?: string
    featured?: boolean
    search?: string
  }): Series[] {
    let filtered = [...this.series]
    
    if (filter) {
      if (filter.genre) {
        filtered = filtered.filter(s => s.genre.includes(filter.genre!))
      }
      if (filter.year) {
        filtered = filtered.filter(s => s.year === filter.year)
      }
      if (filter.status) {
        filtered = filtered.filter(s => s.status === filter.status)
      }
      if (filter.featured !== undefined) {
        filtered = filtered.filter(s => s.featured === filter.featured)
      }
      if (filter.search) {
        const search = filter.search.toLowerCase()
        filtered = filtered.filter(s => 
          s.title.toLowerCase().includes(search) ||
          s.originalTitle?.toLowerCase().includes(search) ||
          s.plot?.toLowerCase().includes(search)
        )
      }
    }
    
    return filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }
  
  // إدارة التلفزيون والمنوعات (نفس النمط)
  
  // تحليلات ومتابعة
  getAnalytics() {
    return {
      totalMovies: this.movies.length,
      totalSeries: this.series.length,
      totalShows: this.shows.length,
      totalMix: this.mix.length,
      featuredContent: {
        movies: this.movies.filter(m => m.featured).length,
        series: this.series.filter(s => s.featured).length,
        shows: this.shows.filter(s => s.featured).length,
        mix: this.mix.filter(m => m.featured).length
      },
      recentlyAdded: {
        movies: this.movies.slice(0, 10),
        series: this.series.slice(0, 10),
        shows: this.shows.slice(0, 10),
        mix: this.mix.slice(0, 10)
      }
    }
  }
  
  // إدارة النسخ الاحتياطي
  async createBackup(): Promise<string> {
    const backup = {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      data: {
        movies: this.movies,
        series: this.series,
        shows: this.shows,
        mix: this.mix
      }
    }
    
    const backupString = JSON.stringify(backup, null, 2)
    const filename = `akwam-backup-${Date.now()}.json`
    
    // حفظ النسخة الاحتياطية
    await this.saveBackupFile(filename, backupString)
    
    return filename
  }
  
  async restoreBackup(backupData: string): Promise<boolean> {
    try {
      const backup = JSON.parse(backupData)
      
      if (backup.data) {
        this.movies = backup.data.movies || []
        this.series = backup.data.series || []
        this.shows = backup.data.shows || []
        this.mix = backup.data.mix || []
        
        // إعادة حفظ البيانات في قاعدة البيانات
        await this.saveAllToDatabase()
        
        return true
      }
    } catch (error) {
      console.error('خطأ في استعادة النسخة الاحتياطية:', error)
    }
    
    return false
  }
  
  // مساعدات خاصة
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
  }
  
  private async saveToDatabase(collection: string, data: any): Promise<void> {
    // هنا سيتم الحفظ في قاعدة البيانات الفعلية
    // يمكن استخدام Prisma أو MongoDB أو أي قاعدة بيانات أخرى
    console.log(`حفظ في ${collection}:`, data.id)
  }
  
  private async deleteFromDatabase(collection: string, id: string): Promise<void> {
    console.log(`حذف من ${collection}:`, id)
  }
  
  private async saveAllToDatabase(): Promise<void> {
    // حفظ جميع البيانات
    for (const movie of this.movies) {
      await this.saveToDatabase('movies', movie)
    }
    for (const series of this.series) {
      await this.saveToDatabase('series', series)
    }
    // ... إلخ
  }
  
  private async saveBackupFile(filename: string, content: string): Promise<void> {
    // حفظ ملف النسخة الاحتياطية
    console.log(`حفظ نسخة احتياطية: ${filename}`)
  }
}

// إنشاء مدير المحتوى العام
export const contentManager = new ContentManager()

// بيانات تجريبية للبداية
export const initializeSampleData = async () => {
  // أفلام تجريبية
  await contentManager.addMovie({
    title: "Spider-Man: No Way Home",
    originalTitle: "Spider-Man: No Way Home (2021)",
    year: "2021",
    rating: "8.4",
    duration: "148 دقيقة",
    genre: ["أكشن", "مغامرات", "خيال علمي"],
    country: "أمريكا",
    language: "إنجليزي",
    quality: "4K",
    size: "4.2 GB",
    director: "Jon Watts",
    cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch"],
    plot: "مع كشف هوية سبايدر مان، لم يعد بيتر باركر قادرًا على فصل حياته الطبيعية عن الرهانات العالية لكونه بطلاً خارقًا.",
    poster: "/images/movies/spiderman-no-way-home.jpg",
    featured: true,
    releaseDate: "2021-12-17"
  })
  
  await contentManager.addMovie({
    title: "The Batman",
    originalTitle: "The Batman (2022)",
    year: "2022",
    rating: "7.8",
    duration: "176 دقيقة",
    genre: ["أكشن", "جريمة", "دراما"],
    country: "أمريكا",
    language: "إنجليزي",
    quality: "4K",
    size: "5.1 GB",
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"],
    plot: "عندما يستهدف قاتل متسلسل النخبة السياسية في جوثام، يجب على باتمان أن يستكشف الفساد المخفي في المدينة.",
    poster: "/images/movies/the-batman.jpg",
    featured: true,
    releaseDate: "2022-03-04"
  })
  
  // مسلسلات تجريبية
  await contentManager.addSeries({
    title: "House of the Dragon",
    originalTitle: "House of the Dragon (2022)",
    year: "2022",
    rating: "8.5",
    genre: ["دراما", "فانتازيا", "أكشن"],
    country: "أمريكا",
    language: "إنجليزي",
    seasons: 2,
    episodes: 20,
    status: "مستمر",
    director: "Ryan Condal",
    cast: ["Paddy Considine", "Emma D'Arcy", "Olivia Cooke"],
    plot: "قصة آل تارغيريان قبل أحداث Game of Thrones بـ 200 عام.",
    poster: "/images/series/house-of-dragon.jpg",
    featured: true,
    releaseDate: "2022-08-21"
  })
  
  console.log('تم تحميل البيانات التجريبية')
}