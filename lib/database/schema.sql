-- قاعدة بيانات اكوام - Schema شامل

-- جدول إعدادات الموقع
CREATE TABLE IF NOT EXISTS site_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    site_name TEXT DEFAULT 'اكوام',
    site_logo TEXT DEFAULT '/images/logo.png',
    site_description TEXT DEFAULT 'موقع التحميل والمشاهدة العربي الأول',
    site_keywords TEXT DEFAULT 'أفلام, مسلسلات, اكوام, مشاهدة',
    social_facebook TEXT,
    social_twitter TEXT,
    social_instagram TEXT,
    social_telegram TEXT,
    contact_email TEXT,
    ads_enabled BOOLEAN DEFAULT true,
    maintenance_mode BOOLEAN DEFAULT false,
    allow_registration BOOLEAN DEFAULT true,
    max_users INTEGER DEFAULT 10000,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- جدول الأقسام الرئيسية
CREATE TABLE IF NOT EXISTS sections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- جدول التصنيفات/الأنواع
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#007bff',
    icon TEXT,
    parent_id INTEGER,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories (id)
);

-- جدول البلدان
CREATE TABLE IF NOT EXISTS countries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    flag TEXT,
    is_active BOOLEAN DEFAULT true
);

-- جدول اللغات
CREATE TABLE IF NOT EXISTS languages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true
);

-- جدول الجودات
CREATE TABLE IF NOT EXISTS qualities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    resolution TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

-- جدول الأفلام
CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    original_title TEXT,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    poster TEXT,
    backdrop TEXT,
    trailer_url TEXT,
    release_date DATE,
    runtime INTEGER, -- بالدقائق
    imdb_id TEXT,
    imdb_rating REAL DEFAULT 0,
    tmdb_id INTEGER,
    tmdb_rating REAL DEFAULT 0,
    local_rating REAL DEFAULT 0,
    votes_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    downloads_count INTEGER DEFAULT 0,
    section_id INTEGER NOT NULL,
    country_id INTEGER,
    language_id INTEGER,
    quality_id INTEGER,
    is_featured BOOLEAN DEFAULT false,
    is_trending BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (section_id) REFERENCES sections (id),
    FOREIGN KEY (country_id) REFERENCES countries (id),
    FOREIGN KEY (language_id) REFERENCES languages (id),
    FOREIGN KEY (quality_id) REFERENCES qualities (id)
);

-- جدول المسلسلات
CREATE TABLE IF NOT EXISTS series (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    original_title TEXT,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    poster TEXT,
    backdrop TEXT,
    trailer_url TEXT,
    first_air_date DATE,
    last_air_date DATE,
    total_seasons INTEGER DEFAULT 1,
    total_episodes INTEGER DEFAULT 0,
    episode_runtime INTEGER, -- متوسط مدة الحلقة بالدقائق
    status TEXT DEFAULT 'ongoing', -- ongoing, completed, cancelled
    imdb_id TEXT,
    imdb_rating REAL DEFAULT 0,
    tmdb_id INTEGER,
    tmdb_rating REAL DEFAULT 0,
    local_rating REAL DEFAULT 0,
    votes_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    section_id INTEGER NOT NULL,
    country_id INTEGER,
    language_id INTEGER,
    quality_id INTEGER,
    is_featured BOOLEAN DEFAULT false,
    is_trending BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (section_id) REFERENCES sections (id),
    FOREIGN KEY (country_id) REFERENCES countries (id),
    FOREIGN KEY (language_id) REFERENCES languages (id),
    FOREIGN KEY (quality_id) REFERENCES qualities (id)
);

-- جدول المواسم
CREATE TABLE IF NOT EXISTS seasons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    series_id INTEGER NOT NULL,
    season_number INTEGER NOT NULL,
    title TEXT,
    description TEXT,
    poster TEXT,
    air_date DATE,
    episode_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (series_id) REFERENCES series (id) ON DELETE CASCADE,
    UNIQUE(series_id, season_number)
);

-- جدول الحلقات
CREATE TABLE IF NOT EXISTS episodes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    series_id INTEGER NOT NULL,
    season_id INTEGER NOT NULL,
    episode_number INTEGER NOT NULL,
    title TEXT,
    description TEXT,
    poster TEXT,
    air_date DATE,
    runtime INTEGER, -- بالدقائق
    views_count INTEGER DEFAULT 0,
    downloads_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (series_id) REFERENCES series (id) ON DELETE CASCADE,
    FOREIGN KEY (season_id) REFERENCES seasons (id) ON DELETE CASCADE,
    UNIQUE(series_id, season_id, episode_number)
);

-- جدول الأشخاص (ممثلين، مخرجين، كتاب)
CREATE TABLE IF NOT EXISTS people (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    original_name TEXT,
    slug TEXT UNIQUE NOT NULL,
    biography TEXT,
    profile_photo TEXT,
    birth_date DATE,
    death_date DATE,
    birth_place TEXT,
    nationality TEXT,
    imdb_id TEXT,
    tmdb_id INTEGER,
    popularity REAL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- جدول الأدوار/المهن
CREATE TABLE IF NOT EXISTS roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true
);

-- جدول طاقم الأفلام
CREATE TABLE IF NOT EXISTS movie_cast (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    movie_id INTEGER NOT NULL,
    person_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL,
    character_name TEXT,
    sort_order INTEGER DEFAULT 0,
    FOREIGN KEY (movie_id) REFERENCES movies (id) ON DELETE CASCADE,
    FOREIGN KEY (person_id) REFERENCES people (id),
    FOREIGN KEY (role_id) REFERENCES roles (id)
);

-- جدول طاقم المسلسلات
CREATE TABLE IF NOT EXISTS series_cast (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    series_id INTEGER NOT NULL,
    person_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL,
    character_name TEXT,
    sort_order INTEGER DEFAULT 0,
    FOREIGN KEY (series_id) REFERENCES series (id) ON DELETE CASCADE,
    FOREIGN KEY (person_id) REFERENCES people (id),
    FOREIGN KEY (role_id) REFERENCES roles (id)
);

-- جدول تصنيفات الأفلام
CREATE TABLE IF NOT EXISTS movie_categories (
    movie_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (movie_id, category_id),
    FOREIGN KEY (movie_id) REFERENCES movies (id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories (id)
);

-- جدول تصنيفات المسلسلات
CREATE TABLE IF NOT EXISTS series_categories (
    series_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (series_id, category_id),
    FOREIGN KEY (series_id) REFERENCES series (id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories (id)
);

-- جدول روابط التحميل والمشاهدة للأفلام
CREATE TABLE IF NOT EXISTS movie_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    movie_id INTEGER NOT NULL,
    quality_id INTEGER,
    server_name TEXT NOT NULL,
    url TEXT NOT NULL,
    type TEXT NOT NULL, -- watch, download
    size_mb INTEGER,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies (id) ON DELETE CASCADE,
    FOREIGN KEY (quality_id) REFERENCES qualities (id)
);

-- جدول روابط التحميل والمشاهدة للحلقات
CREATE TABLE IF NOT EXISTS episode_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    episode_id INTEGER NOT NULL,
    quality_id INTEGER,
    server_name TEXT NOT NULL,
    url TEXT NOT NULL,
    type TEXT NOT NULL, -- watch, download
    size_mb INTEGER,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (episode_id) REFERENCES episodes (id) ON DELETE CASCADE,
    FOREIGN KEY (quality_id) REFERENCES qualities (id)
);

-- جدول المستخدمين
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT,
    avatar TEXT,
    bio TEXT,
    birth_date DATE,
    gender TEXT,
    country_id INTEGER,
    role TEXT DEFAULT 'user', -- admin, moderator, user
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    last_login DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (country_id) REFERENCES countries (id)
);

-- جدول التقييمات
CREATE TABLE IF NOT EXISTS ratings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    content_type TEXT NOT NULL, -- movie, series, episode
    content_id INTEGER NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 10),
    review TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    UNIQUE(user_id, content_type, content_id)
);

-- جدول التعليقات
CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    content_type TEXT NOT NULL, -- movie, series, episode
    content_id INTEGER NOT NULL,
    parent_id INTEGER, -- للردود على التعليقات
    comment TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT true,
    likes_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (parent_id) REFERENCES comments (id)
);

-- جدول المفضلة
CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    content_type TEXT NOT NULL, -- movie, series
    content_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    UNIQUE(user_id, content_type, content_id)
);

-- جدول قوائم المشاهدة
CREATE TABLE IF NOT EXISTS watchlists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- جدول عناصر قوائم المشاهدة
CREATE TABLE IF NOT EXISTS watchlist_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    watchlist_id INTEGER NOT NULL,
    content_type TEXT NOT NULL, -- movie, series
    content_id INTEGER NOT NULL,
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (watchlist_id) REFERENCES watchlists (id) ON DELETE CASCADE,
    UNIQUE(watchlist_id, content_type, content_id)
);

-- جدول سجل المشاهدة
CREATE TABLE IF NOT EXISTS watch_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    content_type TEXT NOT NULL, -- movie, episode
    content_id INTEGER NOT NULL,
    watch_duration INTEGER DEFAULT 0, -- بالثواني
    total_duration INTEGER DEFAULT 0, -- بالثواني
    progress REAL DEFAULT 0, -- نسبة المشاهدة 0-100
    is_completed BOOLEAN DEFAULT false,
    watched_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- جدول الإشعارات
CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info', -- info, success, warning, error
    is_read BOOLEAN DEFAULT false,
    action_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- جدول الإعلانات
CREATE TABLE IF NOT EXISTS ads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    type TEXT NOT NULL, -- banner, video, popup, interstitial
    position TEXT NOT NULL, -- header, sidebar, content, footer
    content TEXT, -- HTML content أو كود الإعلان
    image_url TEXT,
    video_url TEXT,
    click_url TEXT,
    impression_count INTEGER DEFAULT 0,
    click_count INTEGER DEFAULT 0,
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT true,
    priority INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- جدول الصفحات الثابتة
CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- جدول القوائم (للقائمة الرئيسية والتذييل)
CREATE TABLE IF NOT EXISTS menus (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT NOT NULL, -- header, footer, sidebar
    is_active BOOLEAN DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- جدول عناصر القوائم
CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    menu_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    icon TEXT,
    parent_id INTEGER,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    FOREIGN KEY (menu_id) REFERENCES menus (id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES menu_items (id)
);

-- جدول التقارير
CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    content_type TEXT NOT NULL, -- movie, series, episode, comment, user
    content_id INTEGER NOT NULL,
    reason TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending', -- pending, resolved, rejected
    resolved_by INTEGER,
    resolved_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (resolved_by) REFERENCES users (id)
);

-- جدول الاشتراكات (للميزات المدفوعة مستقبلاً)
CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    plan_name TEXT NOT NULL,
    price REAL NOT NULL,
    currency TEXT DEFAULT 'USD',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    auto_renew BOOLEAN DEFAULT false,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- إنشاء الفهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_movies_section ON movies(section_id);
CREATE INDEX IF NOT EXISTS idx_movies_imdb_rating ON movies(imdb_rating DESC);
CREATE INDEX IF NOT EXISTS idx_movies_release_date ON movies(release_date DESC);
CREATE INDEX IF NOT EXISTS idx_movies_views ON movies(views_count DESC);
CREATE INDEX IF NOT EXISTS idx_movies_featured ON movies(is_featured);
CREATE INDEX IF NOT EXISTS idx_movies_trending ON movies(is_trending);

CREATE INDEX IF NOT EXISTS idx_series_section ON series(section_id);
CREATE INDEX IF NOT EXISTS idx_series_imdb_rating ON series(imdb_rating DESC);
CREATE INDEX IF NOT EXISTS idx_series_first_air_date ON series(first_air_date DESC);
CREATE INDEX IF NOT EXISTS idx_series_views ON series(views_count DESC);
CREATE INDEX IF NOT EXISTS idx_series_featured ON series(is_featured);
CREATE INDEX IF NOT EXISTS idx_series_trending ON series(is_trending);

CREATE INDEX IF NOT EXISTS idx_episodes_series ON episodes(series_id);
CREATE INDEX IF NOT EXISTS idx_episodes_season ON episodes(season_id);
CREATE INDEX IF NOT EXISTS idx_episodes_air_date ON episodes(air_date DESC);

CREATE INDEX IF NOT EXISTS idx_ratings_content ON ratings(content_type, content_id);
CREATE INDEX IF NOT EXISTS idx_ratings_user ON ratings(user_id);

CREATE INDEX IF NOT EXISTS idx_comments_content ON comments(content_type, content_id);
CREATE INDEX IF NOT EXISTS idx_comments_user ON comments(user_id);

CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_watch_history_user ON watch_history(user_id);

-- إضافة triggers لتحديث updated_at تلقائياً
CREATE TRIGGER IF NOT EXISTS update_movies_timestamp 
AFTER UPDATE ON movies
FOR EACH ROW
BEGIN
    UPDATE movies SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_series_timestamp 
AFTER UPDATE ON series
FOR EACH ROW
BEGIN
    UPDATE series SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_episodes_timestamp 
AFTER UPDATE ON episodes
FOR EACH ROW
BEGIN
    UPDATE episodes SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;