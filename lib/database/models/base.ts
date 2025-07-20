import { connectToDatabase, query, queryOne, execute, transaction } from '../connection'

export abstract class BaseModel {
  protected static tableName: string

  /**
   * البحث عن سجل واحد باستخدام ID
   */
  static async findById<T = any>(id: number): Promise<T | null> {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = ? AND is_active = 1`
    return await queryOne<T>(sql, [id])
  }

  /**
   * البحث عن سجل واحد باستخدام شروط مخصصة
   */
  static async findOne<T = any>(conditions: Record<string, any> = {}): Promise<T | null> {
    const whereClause = this.buildWhereClause(conditions)
    const sql = `SELECT * FROM ${this.tableName} ${whereClause.sql} LIMIT 1`
    return await queryOne<T>(sql, whereClause.params)
  }

  /**
   * البحث عن جميع السجلات مع إمكانية الفلترة
   */
  static async findAll<T = any>(
    conditions: Record<string, any> = {},
    options: QueryOptions = {}
  ): Promise<T[]> {
    const whereClause = this.buildWhereClause(conditions)
    const orderClause = this.buildOrderClause(options.orderBy, options.order)
    const limitClause = this.buildLimitClause(options.limit, options.offset)
    
    const sql = `SELECT * FROM ${this.tableName} ${whereClause.sql} ${orderClause} ${limitClause}`
    return await query<T>(sql, whereClause.params)
  }

  /**
   * عد السجلات مع إمكانية الفلترة
   */
  static async count(conditions: Record<string, any> = {}): Promise<number> {
    const whereClause = this.buildWhereClause(conditions)
    const sql = `SELECT COUNT(*) as count FROM ${this.tableName} ${whereClause.sql}`
    const result = await queryOne<{ count: number }>(sql, whereClause.params)
    return result?.count || 0
  }

  /**
   * إنشاء سجل جديد
   */
  static async create<T = any>(data: Record<string, any>): Promise<T | null> {
    // إضافة التاريخ الحالي للسجل
    data.created_at = new Date().toISOString()
    if (!data.hasOwnProperty('updated_at')) {
      data.updated_at = data.created_at
    }

    const columns = Object.keys(data)
    const placeholders = columns.map(() => '?').join(', ')
    const values = Object.values(data)

    const sql = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (${placeholders})`
    
    try {
      const result = execute(sql, values)
      if (result.lastInsertRowid) {
        return await this.findById<T>(result.lastInsertRowid as number)
      }
      return null
    } catch (error) {
      console.error(`خطأ في إنشاء سجل في ${this.tableName}:`, error)
      throw error
    }
  }

  /**
   * تحديث سجل
   */
  static async update<T = any>(id: number, data: Record<string, any>): Promise<T | null> {
    // إضافة تاريخ التحديث
    data.updated_at = new Date().toISOString()

    const columns = Object.keys(data)
    const setClause = columns.map(col => `${col} = ?`).join(', ')
    const values = [...Object.values(data), id]

    const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`
    
    try {
      const result = execute(sql, values)
      if (result.changes > 0) {
        return await this.findById<T>(id)
      }
      return null
    } catch (error) {
      console.error(`خطأ في تحديث سجل في ${this.tableName}:`, error)
      throw error
    }
  }

  /**
   * حذف سجل (حذف منطقي)
   */
  static async delete(id: number): Promise<boolean> {
    const sql = `UPDATE ${this.tableName} SET is_active = 0, updated_at = ? WHERE id = ?`
    
    try {
      const result = execute(sql, [new Date().toISOString(), id])
      return result.changes > 0
    } catch (error) {
      console.error(`خطأ في حذف سجل من ${this.tableName}:`, error)
      throw error
    }
  }

  /**
   * حذف سجل نهائياً
   */
  static async destroy(id: number): Promise<boolean> {
    const sql = `DELETE FROM ${this.tableName} WHERE id = ?`
    
    try {
      const result = execute(sql, [id])
      return result.changes > 0
    } catch (error) {
      console.error(`خطأ في حذف سجل نهائياً من ${this.tableName}:`, error)
      throw error
    }
  }

  /**
   * البحث مع pagination
   */
  static async paginate<T = any>(
    conditions: Record<string, any> = {},
    page: number = 1,
    perPage: number = 20,
    options: QueryOptions = {}
  ): Promise<PaginationResult<T>> {
    const offset = (page - 1) * perPage
    const whereClause = this.buildWhereClause(conditions)
    const orderClause = this.buildOrderClause(options.orderBy, options.order)
    
    // الحصول على العدد الكلي
    const countSql = `SELECT COUNT(*) as count FROM ${this.tableName} ${whereClause.sql}`
    const countResult = await queryOne<{ count: number }>(countSql, whereClause.params)
    const total = countResult?.count || 0

    // الحصول على البيانات
    const dataSql = `SELECT * FROM ${this.tableName} ${whereClause.sql} ${orderClause} LIMIT ? OFFSET ?`
    const data = await query<T>(dataSql, [...whereClause.params, perPage, offset])

    return {
      data,
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
   * بناء جملة WHERE
   */
  protected static buildWhereClause(conditions: Record<string, any>): { sql: string; params: any[] } {
    if (Object.keys(conditions).length === 0) {
      return { sql: 'WHERE is_active = 1', params: [] }
    }

    const whereParts: string[] = []
    const params: any[] = []

    // إضافة is_active تلقائياً إذا لم يتم تحديدها
    if (!conditions.hasOwnProperty('is_active')) {
      conditions.is_active = 1
    }

    for (const [key, value] of Object.entries(conditions)) {
      if (value === null) {
        whereParts.push(`${key} IS NULL`)
      } else if (Array.isArray(value)) {
        const placeholders = value.map(() => '?').join(', ')
        whereParts.push(`${key} IN (${placeholders})`)
        params.push(...value)
      } else if (typeof value === 'string' && value.includes('%')) {
        whereParts.push(`${key} LIKE ?`)
        params.push(value)
      } else {
        whereParts.push(`${key} = ?`)
        params.push(value)
      }
    }

    return {
      sql: `WHERE ${whereParts.join(' AND ')}`,
      params
    }
  }

  /**
   * بناء جملة ORDER BY
   */
  protected static buildOrderClause(orderBy?: string, order: 'ASC' | 'DESC' = 'DESC'): string {
    if (!orderBy) {
      return 'ORDER BY created_at DESC'
    }
    return `ORDER BY ${orderBy} ${order}`
  }

  /**
   * بناء جملة LIMIT
   */
  protected static buildLimitClause(limit?: number, offset?: number): string {
    let clause = ''
    if (limit) {
      clause += `LIMIT ${limit}`
      if (offset) {
        clause += ` OFFSET ${offset}`
      }
    }
    return clause
  }

  /**
   * تنفيذ استعلام SQL مخصص
   */
  static async raw<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    return await query<T>(sql, params)
  }

  /**
   * تنفيذ استعلام SQL مخصص للحصول على سجل واحد
   */
  static async rawOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
    return await queryOne<T>(sql, params)
  }

  /**
   * تنفيذ معاملة
   */
  static async transaction<T>(callback: () => Promise<T>): Promise<T> {
    return await transaction(async () => {
      return await callback()
    })
  }

  /**
   * البحث المتقدم بالنص
   */
  static async search<T = any>(
    searchTerm: string,
    searchFields: string[],
    conditions: Record<string, any> = {},
    options: QueryOptions = {}
  ): Promise<T[]> {
    const whereClause = this.buildWhereClause(conditions)
    const searchClause = searchFields.map(field => `${field} LIKE ?`).join(' OR ')
    const searchParams = searchFields.map(() => `%${searchTerm}%`)
    
    const orderClause = this.buildOrderClause(options.orderBy, options.order)
    const limitClause = this.buildLimitClause(options.limit, options.offset)
    
    const sql = `
      SELECT * FROM ${this.tableName} 
      ${whereClause.sql} AND (${searchClause})
      ${orderClause} ${limitClause}
    `
    
    return await query<T>(sql, [...whereClause.params, ...searchParams])
  }

  /**
   * الحصول على آخر السجلات المضافة
   */
  static async getRecent<T = any>(limit: number = 10): Promise<T[]> {
    const sql = `
      SELECT * FROM ${this.tableName} 
      WHERE is_active = 1 
      ORDER BY created_at DESC 
      LIMIT ?
    `
    return await query<T>(sql, [limit])
  }

  /**
   * الحصول على السجلات الشائعة (الأكثر مشاهدة)
   */
  static async getTrending<T = any>(limit: number = 10): Promise<T[]> {
    const sql = `
      SELECT * FROM ${this.tableName} 
      WHERE is_active = 1 AND views_count > 0
      ORDER BY views_count DESC 
      LIMIT ?
    `
    return await query<T>(sql, [limit])
  }
}

// أنواع البيانات المساعدة
export interface QueryOptions {
  orderBy?: string
  order?: 'ASC' | 'DESC'
  limit?: number
  offset?: number
}

export interface PaginationResult<T> {
  data: T[]
  pagination: {
    page: number
    perPage: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// تهيئة قاعدة البيانات عند استيراد الملف
connectToDatabase().catch(console.error)