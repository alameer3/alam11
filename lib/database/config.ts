import path from 'path'

export const DATABASE_CONFIG = {
  // مسار قاعدة البيانات
  DATABASE_PATH: process.env.DATABASE_PATH || path.join(process.cwd(), 'serverdata', 'database.db'),
  
  // إعدادات قاعدة البيانات
  DATABASE_OPTIONS: {
    // تفعيل WAL mode لتحسين الأداء
    enableWAL: true,
    
    // إعدادات الاتصال
    connectionLimit: 10,
    
    // مهلة زمنية للاستعلامات
    queryTimeout: 30000,
    
    // تفعيل foreign keys
    enableForeignKeys: true,
    
    // إعدادات الأمان
    readOnly: false,
    
    // تحسين الأداء
    cacheSize: 2000,
    
    // إعدادات synchronous
    synchronous: 'NORMAL' as const,
  },
  
  // إعدادات التهيئة الأولية
  INITIALIZATION: {
    // إنشاء الجداول تلقائياً عند عدم وجودها
    createTablesIfNotExists: true,
    
    // إضافة البيانات التجريبية
    seedData: true,
    
    // إنشاء المجلدات المطلوبة
    createDirectories: true,
  },
  
  // إعدادات النسخ الاحتياطي
  BACKUP: {
    // تفعيل النسخ الاحتياطي التلقائي
    autoBackup: true,
    
    // مجلد النسخ الاحتياطية
    backupDirectory: path.join(process.cwd(), 'serverdata', 'backups'),
    
    // عدد النسخ الاحتياطية المحتفظ بها
    maxBackups: 10,
    
    // فترة النسخ الاحتياطي (بالساعات)
    backupInterval: 24,
  },
  
  // إعدادات متقدمة
  ADVANCED: {
    // تفعيل السجلات التفصيلية
    verboseLogging: process.env.NODE_ENV === 'development',
    
    // تتبع الاستعلامات البطيئة
    slowQueryThreshold: 1000, // milliseconds
    
    // إعدادات pool الاتصالات
    poolSize: 5,
    
    // إعدادات cache
    enableQueryCache: true,
    maxCacheSize: 100,
  }
}

export const SCHEMA_PATH = path.join(process.cwd(), 'lib', 'database', 'schema.sql')
export const SEED_DATA_PATH = path.join(process.cwd(), 'lib', 'database', 'seed.sql')

// بيئات مختلفة
export const ENV_CONFIG = {
  development: {
    ...DATABASE_CONFIG,
    ADVANCED: {
      ...DATABASE_CONFIG.ADVANCED,
      verboseLogging: true,
    }
  },
  
  production: {
    ...DATABASE_CONFIG,
    DATABASE_PATH: process.env.DATABASE_PATH || path.join(process.cwd(), 'serverdata', 'database.db'),
    ADVANCED: {
      ...DATABASE_CONFIG.ADVANCED,
      verboseLogging: false,
      slowQueryThreshold: 500,
    }
  },
  
  test: {
    ...DATABASE_CONFIG,
    DATABASE_PATH: ':memory:', // قاعدة بيانات في الذاكرة للاختبارات
    INITIALIZATION: {
      ...DATABASE_CONFIG.INITIALIZATION,
      seedData: false,
    }
  }
}

// الحصول على الإعدادات حسب البيئة
export function getConfig() {
  const env = process.env.NODE_ENV || 'development'
  return ENV_CONFIG[env as keyof typeof ENV_CONFIG] || ENV_CONFIG.development
}