import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class DatabaseManager {
  private db: Database.Database | null = null;
  private dbPath: string;

  constructor() {
    this.dbPath = path.join(__dirname, '../../database/ak-sv.db');
  }

  async initialize(): Promise<void> {
    try {
      this.db = new Database(this.dbPath);
      this.db.pragma('journal_mode = WAL');
      this.db.pragma('synchronous = NORMAL');
      this.db.pragma('cache_size = 1000');
      this.db.pragma('foreign_keys = ON');
      
      await this.createTables();
      await this.seedInitialData();
      
      console.log('✅ Database initialized successfully');
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    const sql = `
      -- Users table
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        displayName TEXT,
        role TEXT NOT NULL DEFAULT 'user',
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      -- Categories table
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        icon TEXT,
        orderNum INTEGER NOT NULL DEFAULT 0,
        isActive BOOLEAN NOT NULL DEFAULT 1
      );

      -- Genres table
      CREATE TABLE IF NOT EXISTS genres (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        color TEXT
      );

      -- Content table
      CREATE TABLE IF NOT EXISTS content (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        poster TEXT,
        backdrop TEXT,
        releaseYear INTEGER,
        duration INTEGER,
        rating REAL,
        imdbRating REAL,
        tmdbId TEXT,
        type TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'active',
        categoryId TEXT NOT NULL,
        genreIds TEXT NOT NULL DEFAULT '[]',
        quality TEXT,
        language TEXT,
        country TEXT,
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        viewCount INTEGER NOT NULL DEFAULT 0,
        downloadCount INTEGER NOT NULL DEFAULT 0,
        isFeatured BOOLEAN NOT NULL DEFAULT 0,
        isRecommended BOOLEAN NOT NULL DEFAULT 0,
        FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE CASCADE
      );

      -- Episodes table
      CREATE TABLE IF NOT EXISTS episodes (
        id TEXT PRIMARY KEY,
        contentId TEXT NOT NULL,
        title TEXT NOT NULL,
        slug TEXT NOT NULL,
        description TEXT,
        seasonNumber INTEGER,
        episodeNumber INTEGER NOT NULL,
        duration INTEGER,
        poster TEXT,
        backdrop TEXT,
        releaseDate TEXT,
        status TEXT NOT NULL DEFAULT 'active',
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        viewCount INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (contentId) REFERENCES content(id) ON DELETE CASCADE
      );

      -- Download links table
      CREATE TABLE IF NOT EXISTS download_links (
        id TEXT PRIMARY KEY,
        contentId TEXT,
        episodeId TEXT,
        title TEXT NOT NULL,
        url TEXT NOT NULL,
        quality TEXT NOT NULL,
        size TEXT,
        format TEXT,
        server TEXT,
        isActive BOOLEAN NOT NULL DEFAULT 1,
        orderNum INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (contentId) REFERENCES content(id) ON DELETE CASCADE,
        FOREIGN KEY (episodeId) REFERENCES episodes(id) ON DELETE CASCADE
      );

      -- Watch links table
      CREATE TABLE IF NOT EXISTS watch_links (
        id TEXT PRIMARY KEY,
        contentId TEXT,
        episodeId TEXT,
        title TEXT NOT NULL,
        url TEXT NOT NULL,
        server TEXT NOT NULL,
        quality TEXT,
        isActive BOOLEAN NOT NULL DEFAULT 1,
        orderNum INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (contentId) REFERENCES content(id) ON DELETE CASCADE,
        FOREIGN KEY (episodeId) REFERENCES episodes(id) ON DELETE CASCADE
      );

      -- Site settings table
      CREATE TABLE IF NOT EXISTS site_settings (
        id TEXT PRIMARY KEY DEFAULT 'main',
        siteName TEXT NOT NULL DEFAULT 'اكوام',
        siteDescription TEXT NOT NULL DEFAULT 'موقع التحميل والمشاهدة العربي الأول',
        siteUrl TEXT NOT NULL DEFAULT 'https://ak.sv',
        logoUrl TEXT,
        faviconUrl TEXT,
        primaryColor TEXT NOT NULL DEFAULT '#f97316',
        secondaryColor TEXT NOT NULL DEFAULT '#ea580c',
        socialLinks TEXT NOT NULL DEFAULT '{}',
        enableRegistration BOOLEAN NOT NULL DEFAULT 1,
        enableComments BOOLEAN NOT NULL DEFAULT 1,
        enableRatings BOOLEAN NOT NULL DEFAULT 1,
        maintenanceMode BOOLEAN NOT NULL DEFAULT 0,
        analyticsCode TEXT,
        customCss TEXT,
        customJs TEXT,
        updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      -- Create indexes
      CREATE INDEX IF NOT EXISTS idx_content_category ON content(categoryId);
      CREATE INDEX IF NOT EXISTS idx_content_type ON content(type);
      CREATE INDEX IF NOT EXISTS idx_content_status ON content(status);
      CREATE INDEX IF NOT EXISTS idx_content_featured ON content(isFeatured);
      CREATE INDEX IF NOT EXISTS idx_content_recommended ON content(isRecommended);
      CREATE INDEX IF NOT EXISTS idx_episodes_content ON episodes(contentId);
      CREATE INDEX IF NOT EXISTS idx_download_links_content ON download_links(contentId);
      CREATE INDEX IF NOT EXISTS idx_download_links_episode ON download_links(episodeId);
      CREATE INDEX IF NOT EXISTS idx_watch_links_content ON watch_links(contentId);
      CREATE INDEX IF NOT EXISTS idx_watch_links_episode ON watch_links(episodeId);
    `;

    this.db?.exec(sql);
  }

  private async seedInitialData(): Promise<void> {
    if (!this.db) return;

    // Check if data already exists
    const categoryCount = this.db.prepare('SELECT COUNT(*) as count FROM categories').get() as { count: number };
    if (categoryCount.count > 0) return;

    const categories = [
      { id: 'movies', name: 'أفلام', slug: 'movies', icon: 'video-camera', orderNum: 1 },
      { id: 'series', name: 'مسلسلات', slug: 'series', icon: 'monitor', orderNum: 2 },
      { id: 'programs', name: 'برامج', slug: 'programs', icon: 'tv', orderNum: 3 },
      { id: 'games', name: 'ألعاب', slug: 'games', icon: 'game-controller', orderNum: 4 },
      { id: 'apps', name: 'تطبيقات', slug: 'apps', icon: 'smartphone', orderNum: 5 },
      { id: 'plays', name: 'مسرحيات', slug: 'plays', icon: 'theater', orderNum: 6 },
      { id: 'wrestling', name: 'مصارعة', slug: 'wrestling', icon: 'fight', orderNum: 7 },
      { id: 'sports', name: 'رياضة', slug: 'sports', icon: 'ball', orderNum: 8 },
    ];

    const genres = [
      { id: 'action', name: 'أكشن', slug: 'action', color: '#dc2626' },
      { id: 'comedy', name: 'كوميديا', slug: 'comedy', color: '#16a34a' },
      { id: 'drama', name: 'دراما', slug: 'drama', color: '#2563eb' },
      { id: 'thriller', name: 'إثارة', slug: 'thriller', color: '#7c3aed' },
      { id: 'horror', name: 'رعب', slug: 'horror', color: '#dc2626' },
      { id: 'romance', name: 'رومانسية', slug: 'romance', color: '#ec4899' },
      { id: 'adventure', name: 'مغامرة', slug: 'adventure', color: '#059669' },
      { id: 'animation', name: 'رسوم متحركة', slug: 'animation', color: '#0891b2' },
      { id: 'documentary', name: 'وثائقي', slug: 'documentary', color: '#65a30d' },
      { id: 'fantasy', name: 'خيال علمي', slug: 'fantasy', color: '#7c2d12' },
    ];

    const insertCategory = this.db.prepare(`
      INSERT INTO categories (id, name, slug, icon, orderNum, isActive)
      VALUES (?, ?, ?, ?, ?, 1)
    `);

    const insertGenre = this.db.prepare(`
      INSERT INTO genres (id, name, slug, color)
      VALUES (?, ?, ?, ?)
    `);

    const insertSettings = this.db.prepare(`
      INSERT INTO site_settings (id, siteName, siteDescription, siteUrl, primaryColor, secondaryColor, socialLinks)
      VALUES ('main', 'اكوام', 'شمس المواقع، الموقع العربي الاول لتحميل و مشاهدة الافلام, المسلسلات, الالعاب, البرامج و التطبيقات', 'https://ak.sv', '#f97316', '#ea580c', '{}')
    `);

    const insertAdmin = this.db.prepare(`
      INSERT INTO users (id, email, username, password, displayName, role)
      VALUES ('admin', 'admin@ak.sv', 'admin', '$2b$10$rQY8YjZ8QxZ8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8', 'المدير', 'admin')
    `);

    try {
      categories.forEach(category => {
        insertCategory.run(category.id, category.name, category.slug, category.icon, category.orderNum);
      });

      genres.forEach(genre => {
        insertGenre.run(genre.id, genre.name, genre.slug, genre.color);
      });

      insertSettings.run();
      insertAdmin.run();

      console.log('✅ Initial data seeded successfully');
    } catch (error) {
      console.error('❌ Error seeding initial data:', error);
    }
  }

  getDatabase(): Database.Database {
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    return this.db;
  }

  async close(): Promise<void> {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}