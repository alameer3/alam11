import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'
import { getConfig, SCHEMA_PATH, SEED_DATA_PATH } from './config'

class DatabaseConnection {
  private static instance: DatabaseConnection
  private db: Database.Database | null = null
  private config = getConfig()
  private queryCache = new Map<string, any>()
  private isInitialized = false

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection()
    }
    return DatabaseConnection.instance
  }

  /**
   * إنشاء اتصال بقاعدة البيانات
   */
  public async connect(): Promise<Database.Database> {
    if (this.db && this.isInitialized) {
      return this.db
    }

    try {
      // إنشاء المجلدات المطلوبة
      if (this.config.INITIALIZATION.createDirectories) {
        await this.createDirectories()
      }

      // إنشاء اتصال قاعدة البيانات
      this.db = new Database(this.config.DATABASE_PATH, {
        verbose: this.config.ADVANCED.verboseLogging ? undefined : undefined,
      })

      // تطبيق إعدادات الأداء
      await this.applyPerformanceSettings()

      // إنشاء الجداول
      if (this.config.INITIALIZATION.createTablesIfNotExists) {
        await this.createTables()
      }

      // إضافة البيانات التجريبية
      if (this.config.INITIALIZATION.seedData) {
        await this.seedDatabase()
      }

      this.isInitialized = true
      
      if (this.config.ADVANCED.verboseLogging) {
        // // console.log('✅ تم الاتصال بقاعدة البيانات بنجاح')
      }

      return this.db
    } catch (error) {
      // // console.error('❌ خطأ في الاتصال بقاعدة البيانات:', error)
      throw error
    }
  }

  /**
   * إنشاء المجلدات المطلوبة
   */
  private async createDirectories(): Promise<void> {
    const directories = [
      path.dirname(this.config.DATABASE_PATH),
      this.config.BACKUP.backupDirectory,
    ]

    for (const dir of directories) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
        if (this.config.ADVANCED.verboseLogging) {
          // // console.log(`📁 تم إنشاء المجلد: ${dir}`)
        }
      }
    }
  }

  /**
   * تطبيق إعدادات الأداء
   */
  private async applyPerformanceSettings(): Promise<void> {
    if (!this.db) return

    try {
      // تفعيل foreign keys
      if (this.config.DATABASE_OPTIONS.enableForeignKeys) {
        this.db.pragma('foreign_keys = ON')
      }

      // تفعيل WAL mode
      if (this.config.DATABASE_OPTIONS.enableWAL) {
        this.db.pragma('journal_mode = WAL')
      }

      // إعدادات الذاكرة
      this.db.pragma(`cache_size = ${this.config.DATABASE_OPTIONS.cacheSize}`)
      
      // إعدادات synchronous
      this.db.pragma(`synchronous = ${this.config.DATABASE_OPTIONS.synchronous}`)

      // إعدادات أخرى لتحسين الأداء
      this.db.pragma('temp_store = memory')
      this.db.pragma('mmap_size = 268435456') // 256MB

      if (this.config.ADVANCED.verboseLogging) {
        // // console.log('⚡ تم تطبيق إعدادات الأداء')
      }
    } catch (error) {
      // // console.error('❌ خطأ في تطبيق إعدادات الأداء:', error)
    }
  }

  /**
   * إنشاء الجداول من ملف schema.sql
   */
  private async createTables(): Promise<void> {
    if (!this.db) return

    try {
      if (fs.existsSync(SCHEMA_PATH)) {
        const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8')
        this.db.exec(schema)
        
        if (this.config.ADVANCED.verboseLogging) {
          // // console.log('📊 تم إنشاء الجداول من ملف Schema')
        }
      } else {
        // // console.warn('⚠️ ملف Schema غير موجود:', SCHEMA_PATH)
      }
    } catch (error) {
      // // console.error('❌ خطأ في إنشاء الجداول:', error)
      throw error
    }
  }

  /**
   * إضافة البيانات التجريبية
   */
  private async seedDatabase(): Promise<void> {
    if (!this.db) return

    try {
      // التحقق من وجود بيانات
      const tablesWithData = this.db.prepare(`
        SELECT name FROM sqlite_master 
        WHERE type='table' 
        AND name IN ('movies', 'series', 'users')
      `).all()

      if (tablesWithData.length === 0) return

      // التحقق من وجود بيانات تجريبية مسبقاً
      const movieCount = this.db.prepare('SELECT COUNT(*) as count FROM movies').get() as { count: number }
      
      if (movieCount.count === 0) {
        if (fs.existsSync(SEED_DATA_PATH)) {
          const seedData = fs.readFileSync(SEED_DATA_PATH, 'utf-8')
          this.db.exec(seedData)
          
          if (this.config.ADVANCED.verboseLogging) {
            // // console.log('🌱 تم إضافة البيانات التجريبية')
          }
        } else {
          // إضافة بيانات أساسية إذا لم يوجد ملف seed
          await this.addBasicSeedData()
        }
      }
    } catch (error) {
      // // console.error('❌ خطأ في إضافة البيانات التجريبية:', error)
    }
  }

  /**
   * إضافة بيانات أساسية
   */
  private async addBasicSeedData(): Promise<void> {
    if (!this.db) return

    try {
      const insertSiteSettings = this.db.prepare(`
        INSERT OR IGNORE INTO site_settings (site_name) VALUES (?)
      `)
      insertSiteSettings.run('𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗')

      if (this.config.ADVANCED.verboseLogging) {
        // // console.log('🔧 تم إضافة الإعدادات الأساسية')
      }
    } catch (error) {
      // // console.error('❌ خطأ في إضافة البيانات الأساسية:', error)
    }
  }

  /**
   * تنفيذ استعلام مع cache
   */
  public query<T = any>(sql: string, params: any[] = []): T[] {
    if (!this.db) {
      throw new Error('قاعدة البيانات غير متصلة')
    }

    const startTime = new Date("2025-07-21T14:00:00Z").getTime()
    
    try {
      // التحقق من cache
      const cacheKey = `${sql}:${JSON.stringify(params)}`
      if (this.config.ADVANCED.enableQueryCache && this.queryCache.has(cacheKey)) {
        return this.queryCache.get(cacheKey)
      }

      // تنفيذ الاستعلام
      const stmt = this.db.prepare(sql)
      const result = stmt.all(...params) as T[]

      // حفظ في cache
      if (this.config.ADVANCED.enableQueryCache) {
        if (this.queryCache.size >= this.config.ADVANCED.maxCacheSize) {
          const firstKey = this.queryCache.keys().next().value
          if (firstKey) {
            this.queryCache.delete(firstKey)
          }
        }
        this.queryCache.set(cacheKey, result)
      }

      // تتبع الاستعلامات البطيئة
      const duration = new Date("2025-07-21T14:00:00Z").getTime() - startTime
      if (duration > this.config.ADVANCED.slowQueryThreshold) {
        // // console.warn(`🐌 استعلام بطيء (${duration}ms):`, sql.substring(0, 100))
      }

      return result
    } catch (error) {
      // // console.error('❌ خطأ في تنفيذ الاستعلام:', error)
      throw error
    }
  }

  /**
   * تنفيذ استعلام واحد
   */
  public queryOne<T = any>(sql: string, params: any[] = []): T | null {
    const results = this.query<T>(sql, params)
    return results.length > 0 ? results[0] : null
  }

  /**
   * تنفيذ استعلام تحديث/إدراج/حذف
   */
  public execute(sql: string, params: any[] = []): Database.RunResult {
    if (!this.db) {
      throw new Error('قاعدة البيانات غير متصلة')
    }

    try {
      const stmt = this.db.prepare(sql)
      const result = stmt.run(...params)
      
      // مسح cache عند التحديث
      if (this.config.ADVANCED.enableQueryCache) {
        this.queryCache.clear()
      }

      return result
    } catch (error) {
      // // console.error('❌ خطأ في تنفيذ الاستعلام:', error)
      throw error
    }
  }

  /**
   * تنفيذ معاملة
   */
  public transaction<T>(callback: (db: Database.Database) => T): T {
    if (!this.db) {
      throw new Error('قاعدة البيانات غير متصلة')
    }

    const transaction = this.db.transaction(callback)
    return transaction(this.db)
  }

  /**
   * إنشاء نسخة احتياطية
   */
  public async backup(): Promise<string> {
    if (!this.db) {
      throw new Error('قاعدة البيانات غير متصلة')
    }

    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const backupPath = path.join(
        this.config.BACKUP.backupDirectory,
        `backup-${timestamp}.db`
      )

      await this.db.backup(backupPath)
      
      // حذف النسخ القديمة
      await this.cleanOldBackups()

      if (this.config.ADVANCED.verboseLogging) {
        // // console.log('💾 تم إنشاء نسخة احتياطية:', backupPath)
      }

      return backupPath
    } catch (error) {
      // // console.error('❌ خطأ في إنشاء النسخة الاحتياطية:', error)
      throw error
    }
  }

  /**
   * حذف النسخ الاحتياطية القديمة
   */
  private async cleanOldBackups(): Promise<void> {
    try {
      const backupDir = this.config.BACKUP.backupDirectory
      if (!fs.existsSync(backupDir)) return

      const files = fs.readdirSync(backupDir)
        .filter(file => file.startsWith('backup-') && file.endsWith('.db'))
        .map(file => ({
          name: file,
          path: path.join(backupDir, file),
          stat: fs.statSync(path.join(backupDir, file))
        }))
        .sort((a, b) => b.stat.mtime.getTime() - a.stat.mtime.getTime())

      // حذف النسخ الزائدة
      const filesToDelete = files.slice(this.config.BACKUP.maxBackups)
      for (const file of filesToDelete) {
        fs.unlinkSync(file.path)
        if (this.config.ADVANCED.verboseLogging) {
          // // console.log('🗑️ تم حذف نسخة احتياطية قديمة:', file.name)
        }
      }
    } catch (error) {
      // // console.error('❌ خطأ في حذف النسخ الاحتياطية القديمة:', error)
    }
  }

  /**
   * إغلاق الاتصال
   */
  public close(): void {
    if (this.db) {
      this.db.close()
      this.db = null
      this.isInitialized = false
      this.queryCache.clear()
      
      if (this.config.ADVANCED.verboseLogging) {
        // // console.log('🔌 تم إغلاق اتصال قاعدة البيانات')
      }
    }
  }

  /**
   * الحصول على معلومات قاعدة البيانات
   */
  public getInfo(): any {
    if (!this.db) {
      return { connected: false }
    }

    try {
      return {
        connected: true,
        path: this.config.DATABASE_PATH,
        inTransaction: this.db.inTransaction,
        memory: this.db.memory,
        readonly: this.db.readonly,
        cacheSize: this.queryCache.size,
        pragma: {
          userVersion: this.db.pragma('user_version', { simple: true }),
          journalMode: this.db.pragma('journal_mode', { simple: true }),
          synchronous: this.db.pragma('synchronous', { simple: true }),
          cacheSize: this.db.pragma('cache_size', { simple: true }),
          foreignKeys: this.db.pragma('foreign_keys', { simple: true }),
        }
      }
    } catch (error) {
      // // console.error('❌ خطأ في الحصول على معلومات قاعدة البيانات:', error)
      return { connected: false, error: error instanceof Error ? error.message : 'خطأ غير معروف' }
    }
  }
}

// إنشاء instance واحد للاستخدام في التطبيق
export const db = DatabaseConnection.getInstance()

// تصدير الدالة المساعدة للاتصال
export async function connectToDatabase(): Promise<Database.Database> {
  return await db.connect()
}

// تصدير الدوال المساعدة
export const query = async <T = any>(sql: string, params: any[] = []): Promise<T[]> => {
  await connectToDatabase()
  return db.query(sql, params) as T[]
}

export const queryOne = async <T = any>(sql: string, params: any[] = []): Promise<T | null> => {
  await connectToDatabase()
  return db.queryOne(sql, params) as T | null
}
export const execute = (sql: string, params: any[] = []) => db.execute(sql, params)
export const transaction = <T>(callback: (db: Database.Database) => T) => db.transaction(callback)

// تصدير الكلاس والمثيل
export { DatabaseConnection }
export default db