import { BaseModel } from './base'
import { query, queryOne } from '../connection'

// تصدير النماذج الأساسية
export { BaseModel } from './base'
export { MovieModel, type Movie, type MovieWithDetails, type MovieFilters } from './movie'
export { SeriesModel, EpisodeModel, type Series, type Episode, type SeriesWithDetails, type EpisodeWithDetails, type Season, type SeriesFilters } from './series'

// نموذج الأقسام
export interface Section {
  id: number
  name: string
  slug: string
  description?: string
  icon?: string
  sort_order?: number
  is_active?: boolean
  created_at?: string
}

export class SectionModel extends BaseModel {
  protected static tableName = 'sections'

  static async getAll(): Promise<Section[]> {
    const sql = `
      SELECT * FROM sections 
      WHERE is_active = 1 
      ORDER BY sort_order, name
    `
    return await query<Section>(sql)
  }

  static async findBySlug(slug: string): Promise<Section | null> {
    const sql = `
      SELECT * FROM sections 
      WHERE slug = ? AND is_active = 1
    `
    return await queryOne<Section>(sql, [slug])
  }

  static async getWithCounts(): Promise<Array<Section & { movies_count: number; series_count: number }>> {
    const sql = `
      SELECT 
        s.*,
        (SELECT COUNT(*) FROM movies m WHERE m.section_id = s.id AND m.is_active = 1) as movies_count,
        (SELECT COUNT(*) FROM series sr WHERE sr.section_id = s.id AND sr.is_active = 1) as series_count
      FROM sections s
      WHERE s.is_active = 1
      ORDER BY s.sort_order, s.name
    `
    return await query(sql)
  }
}

// نموذج التصنيفات
export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  color?: string
  icon?: string
  parent_id?: number
  sort_order?: number
  is_active?: boolean
  created_at?: string
}

export class CategoryModel extends BaseModel {
  protected static tableName = 'categories'

  static async getAll(): Promise<Category[]> {
    const sql = `
      SELECT * FROM categories 
      WHERE is_active = 1 
      ORDER BY sort_order, name
    `
    return await query<Category>(sql)
  }

  static async getParentCategories(): Promise<Category[]> {
    const sql = `
      SELECT * FROM categories 
      WHERE is_active = 1 AND parent_id IS NULL
      ORDER BY sort_order, name
    `
    return await query<Category>(sql)
  }

  static async getSubCategories(parentId: number): Promise<Category[]> {
    const sql = `
      SELECT * FROM categories 
      WHERE is_active = 1 AND parent_id = ?
      ORDER BY sort_order, name
    `
    return await query<Category>(sql, [parentId])
  }

  static async findBySlug(slug: string): Promise<Category | null> {
    const sql = `
      SELECT * FROM categories 
      WHERE slug = ? AND is_active = 1
    `
    return await queryOne<Category>(sql, [slug])
  }

  static async getWithCounts(): Promise<Array<Category & { movies_count: number; series_count: number }>> {
    const sql = `
      SELECT 
        c.*,
        (SELECT COUNT(*) FROM movie_categories mc JOIN movies m ON mc.movie_id = m.id 
         WHERE mc.category_id = c.id AND m.is_active = 1) as movies_count,
        (SELECT COUNT(*) FROM series_categories sc JOIN series s ON sc.series_id = s.id 
         WHERE sc.category_id = c.id AND s.is_active = 1) as series_count
      FROM categories c
      WHERE c.is_active = 1
      ORDER BY c.sort_order, c.name
    `
    return await query(sql)
  }

  static async getMostPopular(limit: number = 10): Promise<Array<Category & { total_count: number }>> {
    const sql = `
      SELECT 
        c.*,
        (
          (SELECT COUNT(*) FROM movie_categories mc JOIN movies m ON mc.movie_id = m.id 
           WHERE mc.category_id = c.id AND m.is_active = 1) +
          (SELECT COUNT(*) FROM series_categories sc JOIN series s ON sc.series_id = s.id 
           WHERE sc.category_id = c.id AND s.is_active = 1)
        ) as total_count
      FROM categories c
      WHERE c.is_active = 1
      HAVING total_count > 0
      ORDER BY total_count DESC, c.name
      LIMIT ?
    `
    return await query(sql, [limit])
  }
}

// نموذج البلدان
export interface Country {
  id: number
  name: string
  code: string
  flag?: string
  is_active?: boolean
}

export class CountryModel extends BaseModel {
  protected static tableName = 'countries'

  static async getAll(): Promise<Country[]> {
    const sql = `
      SELECT * FROM countries 
      WHERE is_active = 1 
      ORDER BY name
    `
    return await query<Country>(sql)
  }

  static async getWithCounts(): Promise<Array<Country & { movies_count: number; series_count: number }>> {
    const sql = `
      SELECT 
        c.*,
        (SELECT COUNT(*) FROM movies m WHERE m.country_id = c.id AND m.is_active = 1) as movies_count,
        (SELECT COUNT(*) FROM series s WHERE s.country_id = c.id AND s.is_active = 1) as series_count
      FROM countries c
      WHERE c.is_active = 1
      ORDER BY c.name
    `
    return await query(sql)
  }

  static async findByCode(code: string): Promise<Country | null> {
    const sql = `
      SELECT * FROM countries 
      WHERE code = ? AND is_active = 1
    `
    return await queryOne<Country>(sql, [code])
  }
}

// نموذج اللغات
export interface Language {
  id: number
  name: string
  code: string
  is_active?: boolean
}

export class LanguageModel extends BaseModel {
  protected static tableName = 'languages'

  static async getAll(): Promise<Language[]> {
    const sql = `
      SELECT * FROM languages 
      WHERE is_active = 1 
      ORDER BY name
    `
    return await query<Language>(sql)
  }

  static async getWithCounts(): Promise<Array<Language & { movies_count: number; series_count: number }>> {
    const sql = `
      SELECT 
        l.*,
        (SELECT COUNT(*) FROM movies m WHERE m.language_id = l.id AND m.is_active = 1) as movies_count,
        (SELECT COUNT(*) FROM series s WHERE s.language_id = l.id AND s.is_active = 1) as series_count
      FROM languages l
      WHERE l.is_active = 1
      ORDER BY l.name
    `
    return await query(sql)
  }

  static async findByCode(code: string): Promise<Language | null> {
    const sql = `
      SELECT * FROM languages 
      WHERE code = ? AND is_active = 1
    `
    return await queryOne<Language>(sql, [code])
  }
}

// نموذج الجودات
export interface Quality {
  id: number
  name: string
  resolution?: string
  sort_order?: number
  is_active?: boolean
}

export class QualityModel extends BaseModel {
  protected static tableName = 'qualities'

  static async getAll(): Promise<Quality[]> {
    const sql = `
      SELECT * FROM qualities 
      WHERE is_active = 1 
      ORDER BY sort_order, name
    `
    return await query<Quality>(sql)
  }

  static async getWithCounts(): Promise<Array<Quality & { movies_count: number; series_count: number }>> {
    const sql = `
      SELECT 
        q.*,
        (SELECT COUNT(*) FROM movies m WHERE m.quality_id = q.id AND m.is_active = 1) as movies_count,
        (SELECT COUNT(*) FROM series s WHERE s.quality_id = q.id AND s.is_active = 1) as series_count
      FROM qualities q
      WHERE q.is_active = 1
      ORDER BY q.sort_order, q.name
    `
    return await query(sql)
  }
}

// نموذج الأشخاص
export interface Person {
  id: number
  name: string
  original_name?: string
  slug: string
  biography?: string
  profile_photo?: string
  birth_date?: string
  death_date?: string
  birth_place?: string
  nationality?: string
  imdb_id?: string
  tmdb_id?: number
  popularity?: number
  is_active?: boolean
  created_at?: string
  updated_at?: string
}

export class PersonModel extends BaseModel {
  protected static tableName = 'people'

  static async findBySlug(slug: string): Promise<Person | null> {
    const sql = `
      SELECT * FROM people 
      WHERE slug = ? AND is_active = 1
    `
    return await queryOne<Person>(sql, [slug])
  }

  static async getPopular(limit: number = 20): Promise<Person[]> {
    const sql = `
      SELECT * FROM people 
      WHERE is_active = 1 
      ORDER BY popularity DESC, name
      LIMIT ?
    `
    return await query<Person>(sql, [limit])
  }

  static async search(searchTerm: string, limit: number = 20): Promise<Person[]> {
    const sql = `
      SELECT * FROM people 
      WHERE is_active = 1 
      AND (name LIKE ? OR original_name LIKE ? OR biography LIKE ?)
      ORDER BY popularity DESC, name
      LIMIT ?
    `
    const searchPattern = `%${searchTerm}%`
    return await query<Person>(sql, [searchPattern, searchPattern, searchPattern, limit])
  }

  static async getMovies(personId: number): Promise<any[]> {
    const sql = `
      SELECT 
        m.id, m.title, m.slug, m.poster, m.release_date, m.imdb_rating,
        mc.character_name,
        r.name as role
      FROM movies m
      JOIN movie_cast mc ON m.id = mc.movie_id
      JOIN roles r ON mc.role_id = r.id
      WHERE mc.person_id = ? AND m.is_active = 1
      ORDER BY m.release_date DESC, m.title
    `
    return await query(sql, [personId])
  }

  static async getSeries(personId: number): Promise<any[]> {
    const sql = `
      SELECT 
        s.id, s.title, s.slug, s.poster, s.first_air_date, s.imdb_rating,
        sc.character_name,
        r.name as role
      FROM series s
      JOIN series_cast sc ON s.id = sc.series_id
      JOIN roles r ON sc.role_id = r.id
      WHERE sc.person_id = ? AND s.is_active = 1
      ORDER BY s.first_air_date DESC, s.title
    `
    return await query(sql, [personId])
  }
}

// نموذج المستخدمين
export interface User {
  id: number
  username: string
  email: string
  password_hash: string
  full_name?: string
  avatar?: string
  bio?: string
  birth_date?: string
  gender?: string
  country_id?: number
  role?: string
  is_active?: boolean
  is_verified?: boolean
  last_login?: string
  created_at?: string
  updated_at?: string
}

export class UserModel extends BaseModel {
  protected static tableName = 'users'

  static async findByUsername(username: string): Promise<User | null> {
    const sql = `
      SELECT * FROM users 
      WHERE username = ? AND is_active = 1
    `
    return await queryOne<User>(sql, [username])
  }

  static async findByEmail(email: string): Promise<User | null> {
    const sql = `
      SELECT * FROM users 
      WHERE email = ? AND is_active = 1
    `
    return await queryOne<User>(sql, [email])
  }

  static async updateLastLogin(userId: number): Promise<void> {
    const sql = `
      UPDATE users 
      SET last_login = ?, updated_at = ?
      WHERE id = ?
    `
    const now = new Date().toISOString()
    await query(sql, [now, now, userId])
  }

  static async getFavorites(userId: number, contentType?: string): Promise<any[]> {
    let sql = `
      SELECT 
        f.*,
        CASE 
          WHEN f.content_type = 'movie' THEN m.title
          WHEN f.content_type = 'series' THEN s.title
        END as title,
        CASE 
          WHEN f.content_type = 'movie' THEN m.slug
          WHEN f.content_type = 'series' THEN s.slug
        END as slug,
        CASE 
          WHEN f.content_type = 'movie' THEN m.poster
          WHEN f.content_type = 'series' THEN s.poster
        END as poster
      FROM favorites f
      LEFT JOIN movies m ON f.content_type = 'movie' AND f.content_id = m.id
      LEFT JOIN series s ON f.content_type = 'series' AND f.content_id = s.id
      WHERE f.user_id = ?
    `

    const params: any[] = [userId]

    if (contentType) {
      sql += ` AND f.content_type = ?`
      params.push(contentType)
    }

    sql += ` ORDER BY f.created_at DESC`

    return await query(sql, params)
  }

  static async getWatchHistory(userId: number, limit: number = 20): Promise<any[]> {
    const sql = `
      SELECT 
        wh.*,
        CASE 
          WHEN wh.content_type = 'movie' THEN m.title
          WHEN wh.content_type = 'episode' THEN s.title
        END as title,
        CASE 
          WHEN wh.content_type = 'movie' THEN m.slug
          WHEN wh.content_type = 'episode' THEN s.slug
        END as slug,
        CASE 
          WHEN wh.content_type = 'movie' THEN m.poster
          WHEN wh.content_type = 'episode' THEN s.poster
        END as poster,
        CASE 
          WHEN wh.content_type = 'episode' THEN e.title
        END as episode_title,
        CASE 
          WHEN wh.content_type = 'episode' THEN e.episode_number
        END as episode_number
      FROM watch_history wh
      LEFT JOIN movies m ON wh.content_type = 'movie' AND wh.content_id = m.id
      LEFT JOIN episodes e ON wh.content_type = 'episode' AND wh.content_id = e.id
      LEFT JOIN series s ON wh.content_type = 'episode' AND e.series_id = s.id
      WHERE wh.user_id = ?
      ORDER BY wh.watched_at DESC
      LIMIT ?
    `
    return await query(sql, [userId, limit])
  }
}

// نموذج إعدادات الموقع
export interface SiteSettings {
  id: number
  site_name?: string
  site_logo?: string
  site_description?: string
  site_keywords?: string
  social_facebook?: string
  social_twitter?: string
  social_instagram?: string
  social_telegram?: string
  contact_email?: string
  ads_enabled?: boolean
  maintenance_mode?: boolean
  allow_registration?: boolean
  max_users?: number
  created_at?: string
  updated_at?: string
}

export class SiteSettingsModel extends BaseModel {
  protected static tableName = 'site_settings'

  static async getSettings(): Promise<SiteSettings | null> {
    const sql = `SELECT * FROM site_settings ORDER BY id DESC LIMIT 1`
    return await queryOne<SiteSettings>(sql)
  }

  static async updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings | null> {
    const currentSettings = await this.getSettings()
    
    if (currentSettings) {
      return await this.update(currentSettings.id, settings)
    } else {
      return await this.create(settings)
    }
  }
}

// نموذج البحث العام
export class SearchModel {
  static async globalSearch(searchTerm: string, limit: number = 20): Promise<{
    movies: any[]
    series: any[]
    people: any[]
  }> {
    const searchPattern = `%${searchTerm}%`

    const [movies, series, people] = await Promise.all([
      // البحث في الأفلام
      query(`
        SELECT 
          'movie' as type, id, title as name, slug, poster as image,
          imdb_rating as rating, release_date as date
        FROM movies 
        WHERE is_active = 1 
        AND (title LIKE ? OR original_title LIKE ? OR description LIKE ?)
        ORDER BY views_count DESC, imdb_rating DESC
        LIMIT ?
      `, [searchPattern, searchPattern, searchPattern, Math.floor(limit * 0.4)]),

      // البحث في المسلسلات
      query(`
        SELECT 
          'series' as type, id, title as name, slug, poster as image,
          imdb_rating as rating, first_air_date as date
        FROM series 
        WHERE is_active = 1 
        AND (title LIKE ? OR original_title LIKE ? OR description LIKE ?)
        ORDER BY views_count DESC, imdb_rating DESC
        LIMIT ?
      `, [searchPattern, searchPattern, searchPattern, Math.floor(limit * 0.4)]),

      // البحث في الأشخاص
      query(`
        SELECT 
          'person' as type, id, name, slug, profile_photo as image,
          popularity as rating, birth_date as date
        FROM people 
        WHERE is_active = 1 
        AND (name LIKE ? OR original_name LIKE ?)
        ORDER BY popularity DESC
        LIMIT ?
      `, [searchPattern, searchPattern, Math.floor(limit * 0.2)])
    ])

    return { movies, series, people }
  }

  static async getPopularSearches(limit: number = 10): Promise<string[]> {
    // يمكن تطبيق هذا لاحقاً مع إضافة جدول search_logs
    return [
      'أفلام أكشن',
      'مسلسلات رمضان',
      'أفلام كوميدية',
      'مسلسلات تركية',
      'أفلام رعب',
      'مسلسلات أمريكية',
      'أفلام عربية',
      'أنمي',
      'أفلام Netflix',
      'مسلسلات كورية'
    ].slice(0, limit)
  }
}

// نموذج الإحصائيات
export class StatsModel {
  static async getDashboardStats(): Promise<{
    movies_count: number
    series_count: number
    episodes_count: number
    users_count: number
    total_views: number
    popular_movies: any[]
    popular_series: any[]
    recent_activity: any[]
  }> {
    const [
      moviesCount,
      seriesCount,
      episodesCount,
      usersCount,
      totalViews,
      popularMovies,
      popularSeries
    ] = await Promise.all([
      queryOne<{ count: number }>(`SELECT COUNT(*) as count FROM movies WHERE is_active = 1`),
      queryOne<{ count: number }>(`SELECT COUNT(*) as count FROM series WHERE is_active = 1`),
      queryOne<{ count: number }>(`SELECT COUNT(*) as count FROM episodes WHERE is_active = 1`),
      queryOne<{ count: number }>(`SELECT COUNT(*) as count FROM users WHERE is_active = 1`),
      queryOne<{ total: number }>(`
        SELECT 
          (SELECT COALESCE(SUM(views_count), 0) FROM movies WHERE is_active = 1) +
          (SELECT COALESCE(SUM(views_count), 0) FROM series WHERE is_active = 1) +
          (SELECT COALESCE(SUM(views_count), 0) FROM episodes WHERE is_active = 1)
        as total
      `),
      query(`
        SELECT id, title, slug, poster, views_count, imdb_rating
        FROM movies 
        WHERE is_active = 1 
        ORDER BY views_count DESC 
        LIMIT 5
      `),
      query(`
        SELECT id, title, slug, poster, views_count, imdb_rating
        FROM series 
        WHERE is_active = 1 
        ORDER BY views_count DESC 
        LIMIT 5
      `)
    ])

    return {
      movies_count: moviesCount?.count || 0,
      series_count: seriesCount?.count || 0,
      episodes_count: episodesCount?.count || 0,
      users_count: usersCount?.count || 0,
      total_views: totalViews?.total || 0,
      popular_movies: popularMovies,
      popular_series: popularSeries,
      recent_activity: [] // يمكن إضافة النشاط الحديث لاحقاً
    }
  }

  static async getContentStats(): Promise<{
    by_section: any[]
    by_category: any[]
    by_country: any[]
    by_year: any[]
  }> {
    const [bySections, byCategories, byCountries, byYears] = await Promise.all([
      // إحصائيات حسب القسم
      query(`
        SELECT 
          s.name,
          (SELECT COUNT(*) FROM movies m WHERE m.section_id = s.id AND m.is_active = 1) as movies_count,
          (SELECT COUNT(*) FROM series sr WHERE sr.section_id = s.id AND sr.is_active = 1) as series_count
        FROM sections s
        WHERE s.is_active = 1
        ORDER BY s.sort_order
      `),

      // إحصائيات حسب التصنيف
      query(`
        SELECT 
          c.name,
          (SELECT COUNT(*) FROM movie_categories mc JOIN movies m ON mc.movie_id = m.id 
           WHERE mc.category_id = c.id AND m.is_active = 1) +
          (SELECT COUNT(*) FROM series_categories sc JOIN series s ON sc.series_id = s.id 
           WHERE sc.category_id = c.id AND s.is_active = 1) as total_count
        FROM categories c
        WHERE c.is_active = 1
        ORDER BY total_count DESC
        LIMIT 10
      `),

      // إحصائيات حسب البلد
      query(`
        SELECT 
          c.name, c.flag,
          (SELECT COUNT(*) FROM movies m WHERE m.country_id = c.id AND m.is_active = 1) as movies_count,
          (SELECT COUNT(*) FROM series s WHERE s.country_id = c.id AND s.is_active = 1) as series_count
        FROM countries c
        WHERE c.is_active = 1
        HAVING movies_count > 0 OR series_count > 0
        ORDER BY (movies_count + series_count) DESC
        LIMIT 10
      `),

      // إحصائيات حسب السنة
      query(`
        SELECT 
          strftime('%Y', release_date) as year,
          COUNT(*) as count
        FROM movies 
        WHERE is_active = 1 AND release_date IS NOT NULL
        GROUP BY year
        ORDER BY year DESC
        LIMIT 10
      `)
    ])

    return {
      by_section: bySections,
      by_category: byCategories,
      by_country: byCountries,
      by_year: byYears
    }
  }
}

// النماذج مُصدرة بالفعل كـ classes أعلاه
// لا حاجة لتصدير إضافي