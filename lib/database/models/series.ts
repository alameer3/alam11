import { BaseModel, PaginationResult } from './base'
import { query, queryOne } from '../connection'

export interface Series {
  id: number
  title: string
  original_title?: string
  slug: string
  description?: string
  poster?: string
  backdrop?: string
  trailer_url?: string
  first_air_date?: string
  last_air_date?: string
  total_seasons?: number
  total_episodes?: number
  episode_runtime?: number
  status?: string
  imdb_id?: string
  imdb_rating?: number
  tmdb_id?: number
  tmdb_rating?: number
  local_rating?: number
  votes_count?: number
  views_count?: number
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

export interface Season {
  id: number
  series_id: number
  season_number: number
  title?: string
  description?: string
  poster?: string
  air_date?: string
  episode_count?: number
  is_active?: boolean
  created_at?: string
}

export interface Episode {
  id: number
  series_id: number
  season_id: number
  episode_number: number
  title?: string
  description?: string
  poster?: string
  air_date?: string
  runtime?: number
  views_count?: number
  downloads_count?: number
  is_active?: boolean
  created_at?: string
  updated_at?: string
}

export interface SeriesWithDetails extends Series {
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
  seasons?: Season[]
  recent_episodes?: EpisodeWithDetails[]
  ratings?: {
    average: number
    count: number
    user_rating?: number
  }
}

export interface EpisodeWithDetails extends Episode {
  series?: { id: number; title: string; slug: string; poster: string }
  season?: { id: number; season_number: number; title: string }
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

export class SeriesModel extends BaseModel {
  protected static tableName = 'series'

  /**
   * البحث عن مسلسل بالـ slug
   */
  static async findBySlug(slug: string): Promise<SeriesWithDetails | null> {
    const sql = `
      SELECT 
        s.*,
        sec.name as section_name, sec.slug as section_slug,
        c.name as country_name, c.code as country_code, c.flag as country_flag,
        l.name as language_name, l.code as language_code,
        q.name as quality_name, q.resolution as quality_resolution
      FROM series s
      LEFT JOIN sections sec ON s.section_id = sec.id
      LEFT JOIN countries c ON s.country_id = c.id
      LEFT JOIN languages l ON s.language_id = l.id
      LEFT JOIN qualities q ON s.quality_id = q.id
      WHERE s.slug = ? AND s.is_active = 1
    `
    
    const series = await queryOne<any>(sql, [slug])
    if (!series) return null

    // تحويل البيانات إلى الشكل المطلوب
    const seriesWithDetails: SeriesWithDetails = {
      ...series,
      section: series.section_name ? {
        id: series.section_id,
        name: series.section_name,
        slug: series.section_slug
      } : undefined,
      country: series.country_name ? {
        id: series.country_id,
        name: series.country_name,
        code: series.country_code,
        flag: series.country_flag
      } : undefined,
      language: series.language_name ? {
        id: series.language_id,
        name: series.language_name,
        code: series.language_code
      } : undefined,
      quality: series.quality_name ? {
        id: series.quality_id,
        name: series.quality_name,
        resolution: series.quality_resolution
      } : undefined
    }

    // الحصول على التصنيفات
    seriesWithDetails.categories = await this.getSeriesCategories(series.id)
    
    // الحصول على طاقم التمثيل
    seriesWithDetails.cast = await this.getSeriesCast(series.id)
    
    // الحصول على المواسم
    seriesWithDetails.seasons = await this.getSeriesSeasons(series.id)
    
    // الحصول على أحدث الحلقات
    seriesWithDetails.recent_episodes = await this.getRecentEpisodes(series.id, 5)
    
    // الحصول على التقييمات
    seriesWithDetails.ratings = await this.getSeriesRatings(series.id)

    return seriesWithDetails
  }

  /**
   * البحث عن مسلسلات حسب القسم
   */
  static async findBySection(
    sectionId: number,
    page: number = 1,
    perPage: number = 20,
    filters: SeriesFilters = {}
  ): Promise<PaginationResult<SeriesWithDetails>> {
    let sql = `
      SELECT DISTINCT
        s.*,
        sec.name as section_name, sec.slug as section_slug,
        c.name as country_name, c.code as country_code, c.flag as country_flag,
        l.name as language_name, l.code as language_code,
        q.name as quality_name, q.resolution as quality_resolution
      FROM series s
      LEFT JOIN sections sec ON s.section_id = sec.id
      LEFT JOIN countries c ON s.country_id = c.id
      LEFT JOIN languages l ON s.language_id = l.id
      LEFT JOIN qualities q ON s.quality_id = q.id
    `

    // Join مع التصنيفات إذا كان مطلوب فلترة حسب التصنيف
    if (filters.category_id) {
      sql += ` LEFT JOIN series_categories sc ON s.id = sc.series_id`
    }

    sql += ` WHERE s.section_id = ? AND s.is_active = 1`
    const params: any[] = [sectionId]

    // إضافة شروط الفلترة
    if (filters.category_id) {
      sql += ` AND sc.category_id = ?`
      params.push(filters.category_id)
    }
    if (filters.country_id) {
      sql += ` AND s.country_id = ?`
      params.push(filters.country_id)
    }
    if (filters.language_id) {
      sql += ` AND s.language_id = ?`
      params.push(filters.language_id)
    }
    if (filters.quality_id) {
      sql += ` AND s.quality_id = ?`
      params.push(filters.quality_id)
    }
    if (filters.year) {
      sql += ` AND strftime("%Y", s.first_air_date) = ?`
      params.push(filters.year.toString())
    }
    if (filters.status) {
      sql += ` AND s.status = ?`
      params.push(filters.status)
    }
    if (filters.rating_min) {
      sql += ` AND s.imdb_rating >= ?`
      params.push(filters.rating_min)
    }

    // ترتيب النتائج
    const orderBy = filters.sort || 'created_at'
    const order = filters.order || 'DESC'
    sql += ` ORDER BY s.${orderBy} ${order}`

    // عد النتائج
    const countSql = sql.replace(/SELECT DISTINCT[\s\S]*?FROM/, 'SELECT COUNT(DISTINCT s.id) as count FROM')
    const countResult = await queryOne<{ count: number }>(countSql, params)
    const total = countResult?.count || 0

    // الحصول على البيانات مع pagination
    const offset = (page - 1) * perPage
    sql += ` LIMIT ? OFFSET ?`
    params.push(perPage, offset)

    const series = await query<any>(sql, params)

    // تحويل البيانات وإضافة التفاصيل
    const seriesWithDetails: SeriesWithDetails[] = []
    for (const seriesItem of series) {
      const seriesWithDetail: SeriesWithDetails = {
        ...seriesItem,
        section: seriesItem.section_name ? {
          id: seriesItem.section_id,
          name: seriesItem.section_name,
          slug: seriesItem.section_slug
        } : undefined,
        country: seriesItem.country_name ? {
          id: seriesItem.country_id,
          name: seriesItem.country_name,
          code: seriesItem.country_code,
          flag: seriesItem.country_flag
        } : undefined,
        language: seriesItem.language_name ? {
          id: seriesItem.language_id,
          name: seriesItem.language_name,
          code: seriesItem.language_code
        } : undefined,
        quality: seriesItem.quality_name ? {
          id: seriesItem.quality_id,
          name: seriesItem.quality_name,
          resolution: seriesItem.quality_resolution
        } : undefined
      }

      seriesWithDetail.categories = await this.getSeriesCategories(seriesItem.id)
      seriesWithDetails.push(seriesWithDetail)
    }

    return {
      data: seriesWithDetails,
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
   * البحث في المسلسلات
   */
  static async search(
    searchTerm: string,
    page: number = 1,
    perPage: number = 20
  ): Promise<PaginationResult<SeriesWithDetails>> {
    const sql = `
      SELECT 
        s.*,
        sec.name as section_name, sec.slug as section_slug,
        c.name as country_name, c.code as country_code, c.flag as country_flag,
        l.name as language_name, l.code as language_code,
        q.name as quality_name, q.resolution as quality_resolution
      FROM series s
      LEFT JOIN sections sec ON s.section_id = sec.id
      LEFT JOIN countries c ON s.country_id = c.id
      LEFT JOIN languages l ON s.language_id = l.id
      LEFT JOIN qualities q ON s.quality_id = q.id
      WHERE s.is_active = 1 
      AND (s.title LIKE ? OR s.original_title LIKE ? OR s.description LIKE ?)
      ORDER BY s.views_count DESC
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
    const series = await query<any>(dataSql, [...params, perPage, offset])

    // تحويل البيانات
    const seriesWithDetails: SeriesWithDetails[] = []
    for (const seriesItem of series) {
      const seriesWithDetail: SeriesWithDetails = {
        ...seriesItem,
        section: seriesItem.section_name ? {
          id: seriesItem.section_id,
          name: seriesItem.section_name,
          slug: seriesItem.section_slug
        } : undefined,
        country: seriesItem.country_name ? {
          id: seriesItem.country_id,
          name: seriesItem.country_name,
          code: seriesItem.country_code,
          flag: seriesItem.country_flag
        } : undefined,
        language: seriesItem.language_name ? {
          id: seriesItem.language_id,
          name: seriesItem.language_name,
          code: seriesItem.language_code
        } : undefined,
        quality: seriesItem.quality_name ? {
          id: seriesItem.quality_id,
          name: seriesItem.quality_name,
          resolution: seriesItem.quality_resolution
        } : undefined
      }

      seriesWithDetail.categories = await this.getSeriesCategories(seriesItem.id)
      seriesWithDetails.push(seriesWithDetail)
    }

    return {
      data: seriesWithDetails,
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
   * الحصول على المسلسلات المميزة
   */
  static async getFeatured(limit: number = 10): Promise<SeriesWithDetails[]> {
    const sql = `
      SELECT 
        s.*,
        sec.name as section_name, sec.slug as section_slug,
        c.name as country_name, c.code as country_code, c.flag as country_flag,
        l.name as language_name, l.code as language_code,
        q.name as quality_name, q.resolution as quality_resolution
      FROM series s
      LEFT JOIN sections sec ON s.section_id = sec.id
      LEFT JOIN countries c ON s.country_id = c.id
      LEFT JOIN languages l ON s.language_id = l.id
      LEFT JOIN qualities q ON s.quality_id = q.id
      WHERE s.is_active = 1 AND s.is_featured = 1
      ORDER BY s.imdb_rating DESC, s.views_count DESC
      LIMIT ?
    `

    const series = await query<any>(sql, [limit])
    
    const seriesWithDetails: SeriesWithDetails[] = []
    for (const seriesItem of series) {
      const seriesWithDetail: SeriesWithDetails = {
        ...seriesItem,
        section: seriesItem.section_name ? {
          id: seriesItem.section_id,
          name: seriesItem.section_name,
          slug: seriesItem.section_slug
        } : undefined,
        country: seriesItem.country_name ? {
          id: seriesItem.country_id,
          name: seriesItem.country_name,
          code: seriesItem.country_code,
          flag: seriesItem.country_flag
        } : undefined,
        language: seriesItem.language_name ? {
          id: seriesItem.language_id,
          name: seriesItem.language_name,
          code: seriesItem.language_code
        } : undefined,
        quality: seriesItem.quality_name ? {
          id: seriesItem.quality_id,
          name: seriesItem.quality_name,
          resolution: seriesItem.quality_resolution
        } : undefined
      }

      seriesWithDetail.categories = await this.getSeriesCategories(seriesItem.id)
      seriesWithDetails.push(seriesWithDetail)
    }

    return seriesWithDetails
  }

  /**
   * الحصول على تصنيفات المسلسل
   */
  private static async getSeriesCategories(seriesId: number) {
    const sql = `
      SELECT c.id, c.name, c.slug, c.color
      FROM categories c
      JOIN series_categories sc ON c.id = sc.category_id
      WHERE sc.series_id = ? AND c.is_active = 1
      ORDER BY c.sort_order, c.name
    `
    return await query(sql, [seriesId])
  }

  /**
   * الحصول على طاقم تمثيل المسلسل
   */
  private static async getSeriesCast(seriesId: number) {
    const sql = `
      SELECT 
        p.id, p.name, p.profile_photo,
        r.name as role,
        sc.character_name
      FROM people p
      JOIN series_cast sc ON p.id = sc.person_id
      JOIN roles r ON sc.role_id = r.id
      WHERE sc.series_id = ? AND p.is_active = 1
      ORDER BY sc.sort_order, r.name
    `
    return await query(sql, [seriesId])
  }

  /**
   * الحصول على مواسم المسلسل
   */
  private static async getSeriesSeasons(seriesId: number): Promise<Season[]> {
    const sql = `
      SELECT *
      FROM seasons
      WHERE series_id = ? AND is_active = 1
      ORDER BY season_number
    `
    return await query<Season>(sql, [seriesId])
  }

  /**
   * الحصول على أحدث حلقات المسلسل
   */
  private static async getRecentEpisodes(seriesId: number, limit: number = 5): Promise<EpisodeWithDetails[]> {
    const sql = `
      SELECT 
        e.*,
        s.id as season_id, s.season_number, s.title as season_title
      FROM episodes e
      JOIN seasons s ON e.season_id = s.id
      WHERE e.series_id = ? AND e.is_active = 1
      ORDER BY e.air_date DESC, e.episode_number DESC
      LIMIT ?
    `

    const episodes = await query<any>(sql, [seriesId, limit])
    
    const episodesWithDetails: EpisodeWithDetails[] = []
    for (const episode of episodes) {
      const episodeWithDetails: EpisodeWithDetails = {
        ...episode,
        season: {
          id: episode.season_id,
          season_number: episode.season_number,
          title: episode.season_title
        }
      }

      episodeWithDetails.links = await this.getEpisodeLinks(episode.id)
      episodesWithDetails.push(episodeWithDetails)
    }

    return episodesWithDetails
  }

  /**
   * الحصول على تقييمات المسلسل
   */
  private static async getSeriesRatings(seriesId: number, userId?: number) {
    const sql = `
      SELECT 
        AVG(rating) as average,
        COUNT(*) as count
      FROM ratings
      WHERE content_type = 'series' AND content_id = ?
    `
    const result = await queryOne<{ average: number; count: number }>(sql, [seriesId])
    
    let userRating = undefined
    if (userId) {
      const userRatingSql = `
        SELECT rating
        FROM ratings
        WHERE content_type = 'series' AND content_id = ? AND user_id = ?
      `
      const userResult = await queryOne<{ rating: number }>(userRatingSql, [seriesId, userId])
      userRating = userResult?.rating
    }

    return {
      average: result?.average || 0,
      count: result?.count || 0,
      user_rating: userRating
    }
  }

  /**
   * الحصول على روابط مشاهدة وتحميل الحلقة
   */
  private static async getEpisodeLinks(episodeId: number) {
    const sql = `
      SELECT 
        el.id, el.server_name, el.url, el.type, el.size_mb,
        q.name as quality, q.resolution
      FROM episode_links el
      LEFT JOIN qualities q ON el.quality_id = q.id
      WHERE el.episode_id = ? AND el.is_active = 1
      ORDER BY el.sort_order, el.type
    `
    return await query(sql, [episodeId])
  }

  /**
   * زيادة عدد المشاهدات
   */
  static async incrementViews(seriesId: number): Promise<void> {
    const sql = `
      UPDATE series 
      SET views_count = views_count + 1, updated_at = ?
      WHERE id = ?
    `
    await query(sql, [new Date().toISOString(), seriesId])
  }
}

export class EpisodeModel extends BaseModel {
  protected static tableName = 'episodes'

  /**
   * البحث عن حلقة بالـ ID مع التفاصيل
   */
  static async findByIdWithDetails(episodeId: number): Promise<EpisodeWithDetails | null> {
    const sql = `
      SELECT 
        e.*,
        s.title as series_title, s.slug as series_slug, s.poster as series_poster,
        se.season_number, se.title as season_title
      FROM episodes e
      JOIN series s ON e.series_id = s.id
      JOIN seasons se ON e.season_id = se.id
      WHERE e.id = ? AND e.is_active = 1
    `

    const episode = await queryOne<any>(sql, [episodeId])
    if (!episode) return null

    const episodeWithDetails: EpisodeWithDetails = {
      ...episode,
      series: {
        id: episode.series_id,
        title: episode.series_title,
        slug: episode.series_slug,
        poster: episode.series_poster
      },
      season: {
        id: episode.season_id,
        season_number: episode.season_number,
        title: episode.season_title
      }
    }

    // الحصول على روابط المشاهدة والتحميل
    episodeWithDetails.links = await this.getEpisodeLinks(episode.id)
    
    // الحصول على التقييمات
    episodeWithDetails.ratings = await this.getEpisodeRatings(episode.id)

    return episodeWithDetails
  }

  /**
   * الحصول على حلقات الموسم
   */
  static async getSeasonEpisodes(seasonId: number): Promise<Episode[]> {
    const sql = `
      SELECT *
      FROM episodes
      WHERE season_id = ? AND is_active = 1
      ORDER BY episode_number
    `
    return await query<Episode>(sql, [seasonId])
  }

  /**
   * الحصول على الحلقة التالية
   */
  static async getNextEpisode(currentEpisodeId: number): Promise<EpisodeWithDetails | null> {
    const sql = `
      SELECT 
        e2.*,
        s.title as series_title, s.slug as series_slug, s.poster as series_poster,
        se.season_number, se.title as season_title
      FROM episodes e1
      JOIN episodes e2 ON (
        (e1.season_id = e2.season_id AND e2.episode_number = e1.episode_number + 1)
        OR 
        (e1.series_id = e2.series_id AND e2.season_id > e1.season_id AND e2.episode_number = 1)
      )
      JOIN series s ON e2.series_id = s.id
      JOIN seasons se ON e2.season_id = se.id
      WHERE e1.id = ? AND e2.is_active = 1
      ORDER BY e2.season_id, e2.episode_number
      LIMIT 1
    `

    const episode = await queryOne<any>(sql, [currentEpisodeId])
    if (!episode) return null

    return {
      ...episode,
      series: {
        id: episode.series_id,
        title: episode.series_title,
        slug: episode.series_slug,
        poster: episode.series_poster
      },
      season: {
        id: episode.season_id,
        season_number: episode.season_number,
        title: episode.season_title
      }
    }
  }

  /**
   * الحصول على الحلقة السابقة
   */
  static async getPreviousEpisode(currentEpisodeId: number): Promise<EpisodeWithDetails | null> {
    const sql = `
      SELECT 
        e2.*,
        s.title as series_title, s.slug as series_slug, s.poster as series_poster,
        se.season_number, se.title as season_title
      FROM episodes e1
      JOIN episodes e2 ON (
        (e1.season_id = e2.season_id AND e2.episode_number = e1.episode_number - 1)
        OR 
        (e1.series_id = e2.series_id AND e2.season_id < e1.season_id AND e2.episode_number = (
          SELECT MAX(episode_number) FROM episodes WHERE season_id = e2.season_id
        ))
      )
      JOIN series s ON e2.series_id = s.id
      JOIN seasons se ON e2.season_id = se.id
      WHERE e1.id = ? AND e2.is_active = 1
      ORDER BY e2.season_id DESC, e2.episode_number DESC
      LIMIT 1
    `

    const episode = await queryOne<any>(sql, [currentEpisodeId])
    if (!episode) return null

    return {
      ...episode,
      series: {
        id: episode.series_id,
        title: episode.series_title,
        slug: episode.series_slug,
        poster: episode.series_poster
      },
      season: {
        id: episode.season_id,
        season_number: episode.season_number,
        title: episode.season_title
      }
    }
  }

  /**
   * الحصول على روابط مشاهدة وتحميل الحلقة
   */
  private static async getEpisodeLinks(episodeId: number) {
    const sql = `
      SELECT 
        el.id, el.server_name, el.url, el.type, el.size_mb,
        q.name as quality, q.resolution
      FROM episode_links el
      LEFT JOIN qualities q ON el.quality_id = q.id
      WHERE el.episode_id = ? AND el.is_active = 1
      ORDER BY el.sort_order, el.type
    `
    return await query(sql, [episodeId])
  }

  /**
   * الحصول على تقييمات الحلقة
   */
  private static async getEpisodeRatings(episodeId: number, userId?: number) {
    const sql = `
      SELECT 
        AVG(rating) as average,
        COUNT(*) as count
      FROM ratings
      WHERE content_type = 'episode' AND content_id = ?
    `
    const result = await queryOne<{ average: number; count: number }>(sql, [episodeId])
    
    let userRating = undefined
    if (userId) {
      const userRatingSql = `
        SELECT rating
        FROM ratings
        WHERE content_type = 'episode' AND content_id = ? AND user_id = ?
      `
      const userResult = await queryOne<{ rating: number }>(userRatingSql, [episodeId, userId])
      userRating = userResult?.rating
    }

    return {
      average: result?.average || 0,
      count: result?.count || 0,
      user_rating: userRating
    }
  }

  /**
   * زيادة عدد المشاهدات للحلقة
   */
  static async incrementViews(episodeId: number): Promise<void> {
    const sql = `
      UPDATE episodes 
      SET views_count = views_count + 1, updated_at = ?
      WHERE id = ?
    `
    await query(sql, [new Date().toISOString(), episodeId])
  }

  /**
   * زيادة عدد التحميلات للحلقة
   */
  static async incrementDownloads(episodeId: number): Promise<void> {
    const sql = `
      UPDATE episodes 
      SET downloads_count = downloads_count + 1, updated_at = ?
      WHERE id = ?
    `
    await query(sql, [new Date().toISOString(), episodeId])
  }
}

export interface SeriesFilters {
  category_id?: number
  country_id?: number
  language_id?: number
  quality_id?: number
  year?: number
  status?: string
  rating_min?: number
  sort?: string
  order?: 'ASC' | 'DESC'
}