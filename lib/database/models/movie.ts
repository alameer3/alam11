import { BaseModel, QueryOptions, PaginationResult } from './base'
import { query, queryOne } from '../connection'

export interface Movie {
  id: number
  title: string
  original_title?: string
  slug: string
  description?: string
  poster?: string
  backdrop?: string
  trailer_url?: string
  release_date?: string
  runtime?: number
  imdb_id?: string
  imdb_rating?: number
  tmdb_id?: number
  tmdb_rating?: number
  local_rating?: number
  votes_count?: number
  views_count?: number
  downloads_count?: number
  section_id: number
  country_id?: number
  language_id?: number
  quality_id?: number
  is_featured?: boolean
  is_trending?: boolean
  is_active?: boolean
  created_at?: string
  updated_at?: string
}

export interface MovieWithDetails extends Movie {
  section?: { id: number; name: string; slug: string }
  country?: { id: number; name: string; code: string; flag: string }
  language?: { id: number; name: string; code: string }
  quality?: { id: number; name: string; resolution: string }
  categories?: Array<{ id: number; name: string; slug: string; color: string }>
  cast?: Array<{
    id: number
    name: string
    role: string
    character_name?: string
    profile_photo?: string
  }>
  links?: Array<{
    id: number
    server_name: string
    url: string
    type: string
    quality?: string
    size_mb?: number
  }>
  ratings?: {
    average: number
    count: number
    user_rating?: number
  }
}

export class MovieModel extends BaseModel {
  protected static tableName = 'movies'

  /**
   * البحث عن فيلم بالـ slug
   */
  static async findBySlug(slug: string): Promise<MovieWithDetails | null> {
    const sql = `
      SELECT 
        m.*,
        s.name as section_name, s.slug as section_slug,
        c.name as country_name, c.code as country_code, c.flag as country_flag,
        l.name as language_name, l.code as language_code,
        q.name as quality_name, q.resolution as quality_resolution
      FROM movies m
      LEFT JOIN sections s ON m.section_id = s.id
      LEFT JOIN countries c ON m.country_id = c.id
      LEFT JOIN languages l ON m.language_id = l.id
      LEFT JOIN qualities q ON m.quality_id = q.id
      WHERE m.slug = ? AND m.is_active = 1
    `
    
    const movie = await queryOne<any>(sql, [slug])
    if (!movie) return null

    // تحويل البيانات إلى الشكل المطلوب
    const movieWithDetails: MovieWithDetails = {
      ...movie,
      section: movie.section_name ? {
        id: movie.section_id,
        name: movie.section_name,
        slug: movie.section_slug
      } : undefined,
      country: movie.country_name ? {
        id: movie.country_id,
        name: movie.country_name,
        code: movie.country_code,
        flag: movie.country_flag
      } : undefined,
      language: movie.language_name ? {
        id: movie.language_id,
        name: movie.language_name,
        code: movie.language_code
      } : undefined,
      quality: movie.quality_name ? {
        id: movie.quality_id,
        name: movie.quality_name,
        resolution: movie.quality_resolution
      } : undefined
    }

    // الحصول على التصنيفات
    movieWithDetails.categories = await this.getMovieCategories(movie.id)
    
    // الحصول على طاقم التمثيل
    movieWithDetails.cast = await this.getMovieCast(movie.id)
    
    // الحصول على روابط المشاهدة والتحميل
    movieWithDetails.links = await this.getMovieLinks(movie.id)
    
    // الحصول على التقييمات
    movieWithDetails.ratings = await this.getMovieRatings(movie.id)

    return movieWithDetails
  }

  /**
   * البحث عن أفلام حسب القسم
   */
  static async findBySection(
    sectionId: number,
    page: number = 1,
    perPage: number = 20,
    filters: MovieFilters = {}
  ): Promise<PaginationResult<MovieWithDetails>> {
    let conditions: Record<string, any> = { section_id: sectionId }
    
    // تطبيق الفلاتر
    if (filters.category_id) conditions['mc.category_id'] = filters.category_id
    if (filters.country_id) conditions.country_id = filters.country_id
    if (filters.language_id) conditions.language_id = filters.language_id
    if (filters.quality_id) conditions.quality_id = filters.quality_id
    if (filters.year) {
      conditions['strftime("%Y", release_date)'] = filters.year.toString()
    }
    if (filters.rating_min) {
      // سيتم التعامل معه في الاستعلام
    }

    let sql = `
      SELECT DISTINCT
        m.*,
        s.name as section_name, s.slug as section_slug,
        c.name as country_name, c.code as country_code, c.flag as country_flag,
        l.name as language_name, l.code as language_code,
        q.name as quality_name, q.resolution as quality_resolution
      FROM movies m
      LEFT JOIN sections s ON m.section_id = s.id
      LEFT JOIN countries c ON m.country_id = c.id
      LEFT JOIN languages l ON m.language_id = l.id
      LEFT JOIN qualities q ON m.quality_id = q.id
    `

    // Join مع التصنيفات إذا كان مطلوب فلترة حسب التصنيف
    if (filters.category_id) {
      sql += ` LEFT JOIN movie_categories mc ON m.id = mc.movie_id`
    }

    sql += ` WHERE m.section_id = ? AND m.is_active = 1`
    const params: any[] = [sectionId]

    // إضافة شروط الفلترة
    if (filters.category_id) {
      sql += ` AND mc.category_id = ?`
      params.push(filters.category_id)
    }
    if (filters.country_id) {
      sql += ` AND m.country_id = ?`
      params.push(filters.country_id)
    }
    if (filters.language_id) {
      sql += ` AND m.language_id = ?`
      params.push(filters.language_id)
    }
    if (filters.quality_id) {
      sql += ` AND m.quality_id = ?`
      params.push(filters.quality_id)
    }
    if (filters.year) {
      sql += ` AND strftime("%Y", m.release_date) = ?`
      params.push(filters.year.toString())
    }
    if (filters.rating_min) {
      sql += ` AND m.imdb_rating >= ?`
      params.push(filters.rating_min)
    }

    // ترتيب النتائج
    const orderBy = filters.sort || 'created_at'
    const order = filters.order || 'DESC'
    sql += ` ORDER BY m.${orderBy} ${order}`

    // عد النتائج
    const countSql = sql.replace(/SELECT DISTINCT[\s\S]*?FROM/, 'SELECT COUNT(DISTINCT m.id) as count FROM')
    const countResult = await queryOne<{ count: number }>(countSql, params)
    const total = countResult?.count || 0

    // الحصول على البيانات مع pagination
    const offset = (page - 1) * perPage
    sql += ` LIMIT ? OFFSET ?`
    params.push(perPage, offset)

    const movies = await query<any>(sql, params)

    // تحويل البيانات وإضافة التفاصيل
    const moviesWithDetails: MovieWithDetails[] = []
    for (const movie of movies) {
      const movieWithDetails: MovieWithDetails = {
        ...movie,
        section: movie.section_name ? {
          id: movie.section_id,
          name: movie.section_name,
          slug: movie.section_slug
        } : undefined,
        country: movie.country_name ? {
          id: movie.country_id,
          name: movie.country_name,
          code: movie.country_code,
          flag: movie.country_flag
        } : undefined,
        language: movie.language_name ? {
          id: movie.language_id,
          name: movie.language_name,
          code: movie.language_code
        } : undefined,
        quality: movie.quality_name ? {
          id: movie.quality_id,
          name: movie.quality_name,
          resolution: movie.quality_resolution
        } : undefined
      }

      movieWithDetails.categories = await this.getMovieCategories(movie.id)
      moviesWithDetails.push(movieWithDetails)
    }

    return {
      data: moviesWithDetails,
      pagination: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
        hasNext: page < Math.ceil(total / perPage),
        hasPrev: page > 1
      }
    }
  }

  /**
   * البحث في الأفلام
   */
  static async searchMovies(
    searchTerm: string,
    page: number = 1,
    perPage: number = 20
  ): Promise<PaginationResult<MovieWithDetails>> {
    const sql = `
      SELECT 
        m.*,
        s.name as section_name, s.slug as section_slug,
        c.name as country_name, c.code as country_code, c.flag as country_flag,
        l.name as language_name, l.code as language_code,
        q.name as quality_name, q.resolution as quality_resolution
      FROM movies m
      LEFT JOIN sections s ON m.section_id = s.id
      LEFT JOIN countries c ON m.country_id = c.id
      LEFT JOIN languages l ON m.language_id = l.id
      LEFT JOIN qualities q ON m.quality_id = q.id
      WHERE m.is_active = 1 
      AND (m.title LIKE ? OR m.original_title LIKE ? OR m.description LIKE ?)
      ORDER BY m.views_count DESC
    `

    const searchPattern = `%${searchTerm}%`
    const params = [searchPattern, searchPattern, searchPattern]

    // عد النتائج
    const countSql = sql.replace(/SELECT[\s\S]*?FROM/, 'SELECT COUNT(*) as count FROM')
    const countResult = await queryOne<{ count: number }>(countSql, params)
    const total = countResult?.count || 0

    // الحصول على البيانات مع pagination
    const offset = (page - 1) * perPage
    const dataSql = sql + ` LIMIT ? OFFSET ?`
    const movies = await query<any>(dataSql, [...params, perPage, offset])

    // تحويل البيانات
    const moviesWithDetails: MovieWithDetails[] = []
    for (const movie of movies) {
      const movieWithDetails: MovieWithDetails = {
        ...movie,
        section: movie.section_name ? {
          id: movie.section_id,
          name: movie.section_name,
          slug: movie.section_slug
        } : undefined,
        country: movie.country_name ? {
          id: movie.country_id,
          name: movie.country_name,
          code: movie.country_code,
          flag: movie.country_flag
        } : undefined,
        language: movie.language_name ? {
          id: movie.language_id,
          name: movie.language_name,
          code: movie.language_code
        } : undefined,
        quality: movie.quality_name ? {
          id: movie.quality_id,
          name: movie.quality_name,
          resolution: movie.quality_resolution
        } : undefined
      }

      movieWithDetails.categories = await this.getMovieCategories(movie.id)
      moviesWithDetails.push(movieWithDetails)
    }

    return {
      data: moviesWithDetails,
      pagination: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
        hasNext: page < Math.ceil(total / perPage),
        hasPrev: page > 1
      }
    }
  }

  /**
   * الحصول على الأفلام المميزة
   */
  static async getFeatured(limit: number = 10): Promise<MovieWithDetails[]> {
    const sql = `
      SELECT 
        m.*,
        s.name as section_name, s.slug as section_slug,
        c.name as country_name, c.code as country_code, c.flag as country_flag,
        l.name as language_name, l.code as language_code,
        q.name as quality_name, q.resolution as quality_resolution
      FROM movies m
      LEFT JOIN sections s ON m.section_id = s.id
      LEFT JOIN countries c ON m.country_id = c.id
      LEFT JOIN languages l ON m.language_id = l.id
      LEFT JOIN qualities q ON m.quality_id = q.id
      WHERE m.is_active = 1 AND m.is_featured = 1
      ORDER BY m.imdb_rating DESC, m.views_count DESC
      LIMIT ?
    `

    const movies = await query<any>(sql, [limit])
    
    const moviesWithDetails: MovieWithDetails[] = []
    for (const movie of movies) {
      const movieWithDetails: MovieWithDetails = {
        ...movie,
        section: movie.section_name ? {
          id: movie.section_id,
          name: movie.section_name,
          slug: movie.section_slug
        } : undefined,
        country: movie.country_name ? {
          id: movie.country_id,
          name: movie.country_name,
          code: movie.country_code,
          flag: movie.country_flag
        } : undefined,
        language: movie.language_name ? {
          id: movie.language_id,
          name: movie.language_name,
          code: movie.language_code
        } : undefined,
        quality: movie.quality_name ? {
          id: movie.quality_id,
          name: movie.quality_name,
          resolution: movie.quality_resolution
        } : undefined
      }

      movieWithDetails.categories = await this.getMovieCategories(movie.id)
      moviesWithDetails.push(movieWithDetails)
    }

    return moviesWithDetails
  }

  /**
   * الحصول على أحدث الأفلام
   */
  static async getLatest(limit: number = 10): Promise<MovieWithDetails[]> {
    const sql = `
      SELECT 
        m.*,
        s.name as section_name, s.slug as section_slug,
        c.name as country_name, c.code as country_code, c.flag as country_flag,
        l.name as language_name, l.code as language_code,
        q.name as quality_name, q.resolution as quality_resolution
      FROM movies m
      LEFT JOIN sections s ON m.section_id = s.id
      LEFT JOIN countries c ON m.country_id = c.id
      LEFT JOIN languages l ON m.language_id = l.id
      LEFT JOIN qualities q ON m.quality_id = q.id
      WHERE m.is_active = 1
      ORDER BY m.created_at DESC, m.id DESC
      LIMIT ?
    `

    const movies = await query<any>(sql, [limit])
    
    const moviesWithDetails: MovieWithDetails[] = []
    for (const movie of movies) {
      const movieWithDetails: MovieWithDetails = {
        ...movie,
        section: movie.section_name ? {
          id: movie.section_id,
          name: movie.section_name,
          slug: movie.section_slug
        } : undefined,
        country: movie.country_name ? {
          id: movie.country_id,
          name: movie.country_name,
          code: movie.country_code,
          flag: movie.country_flag
        } : undefined,
        language: movie.language_name ? {
          id: movie.language_id,
          name: movie.language_name,
          code: movie.language_code
        } : undefined,
        quality: movie.quality_name ? {
          id: movie.quality_id,
          name: movie.quality_name,
          resolution: movie.quality_resolution
        } : undefined
      }

      movieWithDetails.categories = await this.getMovieCategories(movie.id)
      moviesWithDetails.push(movieWithDetails)
    }

    return moviesWithDetails
  }

  /**
   * الحصول على تصنيفات الفيلم
   */
  private static async getMovieCategories(movieId: number) {
    const sql = `
      SELECT c.id, c.name, c.slug, c.color
      FROM categories c
      JOIN movie_categories mc ON c.id = mc.category_id
      WHERE mc.movie_id = ? AND c.is_active = 1
      ORDER BY c.sort_order, c.name
    `
    return await query(sql, [movieId])
  }

  /**
   * الحصول على طاقم تمثيل الفيلم
   */
  private static async getMovieCast(movieId: number) {
    const sql = `
      SELECT 
        p.id, p.name, p.profile_photo,
        r.name as role,
        mc.character_name
      FROM people p
      JOIN movie_cast mc ON p.id = mc.person_id
      JOIN roles r ON mc.role_id = r.id
      WHERE mc.movie_id = ? AND p.is_active = 1
      ORDER BY mc.sort_order, r.name
    `
    return await query(sql, [movieId])
  }

  /**
   * الحصول على روابط مشاهدة وتحميل الفيلم
   */
  private static async getMovieLinks(movieId: number) {
    const sql = `
      SELECT 
        ml.id, ml.server_name, ml.url, ml.type, ml.size_mb,
        q.name as quality, q.resolution
      FROM movie_links ml
      LEFT JOIN qualities q ON ml.quality_id = q.id
      WHERE ml.movie_id = ? AND ml.is_active = 1
      ORDER BY ml.sort_order, ml.type
    `
    return await query(sql, [movieId])
  }

  /**
   * الحصول على تقييمات الفيلم
   */
  private static async getMovieRatings(movieId: number, userId?: number) {
    const sql = `
      SELECT 
        AVG(rating) as average,
        COUNT(*) as count
      FROM ratings
      WHERE content_type = 'movie' AND content_id = ?
    `
    const result = await queryOne<{ average: number; count: number }>(sql, [movieId])
    
    let userRating = undefined
    if (userId) {
      const userRatingSql = `
        SELECT rating
        FROM ratings
        WHERE content_type = 'movie' AND content_id = ? AND user_id = ?
      `
      const userResult = await queryOne<{ rating: number }>(userRatingSql, [movieId, userId])
      userRating = userResult?.rating
    }

    return {
      average: result?.average || 0,
      count: result?.count || 0,
      user_rating: userRating
    }
  }

  /**
   * زيادة عدد المشاهدات
   */
  static async incrementViews(movieId: number): Promise<void> {
    const sql = `
      UPDATE movies 
      SET views_count = views_count + 1, updated_at = ?
      WHERE id = ?
    `
    await query(sql, [new Date().toISOString(), movieId])
  }

  /**
   * زيادة عدد التحميلات
   */
  static async incrementDownloads(movieId: number): Promise<void> {
    const sql = `
      UPDATE movies 
      SET downloads_count = downloads_count + 1, updated_at = ?
      WHERE id = ?
    `
    await query(sql, [new Date().toISOString(), movieId])
  }

  /**
   * الحصول على أفلام مشابهة
   */
  static async getSimilar(movieId: number, limit: number = 6): Promise<MovieWithDetails[]> {
    const sql = `
      SELECT DISTINCT
        m2.*,
        s.name as section_name, s.slug as section_slug,
        c.name as country_name, c.code as country_code, c.flag as country_flag,
        l.name as language_name, l.code as language_code,
        q.name as quality_name, q.resolution as quality_resolution
      FROM movies m1
      JOIN movie_categories mc1 ON m1.id = mc1.movie_id
      JOIN movie_categories mc2 ON mc1.category_id = mc2.category_id
      JOIN movies m2 ON mc2.movie_id = m2.id
      LEFT JOIN sections s ON m2.section_id = s.id
      LEFT JOIN countries c ON m2.country_id = c.id
      LEFT JOIN languages l ON m2.language_id = l.id
      LEFT JOIN qualities q ON m2.quality_id = q.id
      WHERE m1.id = ? AND m2.id != ? AND m2.is_active = 1
      ORDER BY m2.imdb_rating DESC, m2.views_count DESC
      LIMIT ?
    `

    const movies = await query<any>(sql, [movieId, movieId, limit])
    
    const moviesWithDetails: MovieWithDetails[] = []
    for (const movie of movies) {
      const movieWithDetails: MovieWithDetails = {
        ...movie,
        section: movie.section_name ? {
          id: movie.section_id,
          name: movie.section_name,
          slug: movie.section_slug
        } : undefined,
        country: movie.country_name ? {
          id: movie.country_id,
          name: movie.country_name,
          code: movie.country_code,
          flag: movie.country_flag
        } : undefined,
        language: movie.language_name ? {
          id: movie.language_id,
          name: movie.language_name,
          code: movie.language_code
        } : undefined,
        quality: movie.quality_name ? {
          id: movie.quality_id,
          name: movie.quality_name,
          resolution: movie.quality_resolution
        } : undefined
      }

      movieWithDetails.categories = await this.getMovieCategories(movie.id)
      moviesWithDetails.push(movieWithDetails)
    }

    return moviesWithDetails
  }
}

export interface MovieFilters {
  category_id?: number
  country_id?: number
  language_id?: number
  quality_id?: number
  year?: number
  rating_min?: number
  sort?: string
  order?: 'ASC' | 'DESC'
}