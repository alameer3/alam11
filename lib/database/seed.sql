-- البيانات التجريبية لموقع اكوام

-- إعدادات الموقع
INSERT OR REPLACE INTO site_settings (
    id, site_name, site_logo, site_description, site_keywords,
    social_facebook, social_twitter, social_instagram, social_telegram,
    contact_email, ads_enabled, maintenance_mode, allow_registration
) VALUES (
    1, 'اكوام', '/images/logo.png', 'موقع التحميل والمشاهدة العربي الأول',
    'أفلام, مسلسلات, اكوام, مشاهدة, تحميل, عربي',
    'https://facebook.com/akwam', 'https://twitter.com/akwam',
    'https://instagram.com/akwam', 'https://t.me/akwam',
    'contact@akwam.com', true, false, true
);

-- الأقسام الرئيسية
INSERT OR REPLACE INTO sections (id, name, slug, description, icon, sort_order) VALUES
(1, 'أفلام', 'movies', 'قسم الأفلام العربية والأجنبية', 'movie', 1),
(2, 'مسلسلات', 'series', 'قسم المسلسلات العربية والأجنبية', 'tv', 2),
(3, 'تلفزيون', 'shows', 'قسم البرامج التلفزيونية', 'broadcast', 3),
(4, 'منوعات', 'mix', 'قسم المحتوى المتنوع', 'variety', 4);

-- التصنيفات/الأنواع
INSERT OR REPLACE INTO categories (id, name, slug, description, color, sort_order) VALUES
(1, 'اكشن', 'action', 'أفلام ومسلسلات الأكشن والإثارة', '#e74c3c', 1),
(2, 'كوميدي', 'comedy', 'الأفلام والمسلسلات الكوميدية', '#f39c12', 2),
(3, 'دراما', 'drama', 'الأفلام والمسلسلات الدرامية', '#3498db', 3),
(4, 'رومانسي', 'romance', 'أفلام ومسلسلات الرومانسية', '#e91e63', 4),
(5, 'خيال علمي', 'sci-fi', 'أفلام الخيال العلمي والفانتازيا', '#9c27b0', 5),
(6, 'رعب', 'horror', 'أفلام ومسلسلات الرعب والإثارة', '#795548', 6),
(7, 'مغامرات', 'adventure', 'أفلام ومسلسلات المغامرات', '#4caf50', 7),
(8, 'جريمة', 'crime', 'أفلام ومسلسلات الجريمة والتشويق', '#607d8b', 8),
(9, 'وثائقي', 'documentary', 'الأفلام الوثائقية التعليمية', '#ff9800', 9),
(10, 'انمي', 'anime', 'الأنمي والرسوم المتحركة', '#2196f3', 10),
(11, 'رمضان', 'ramadan', 'محتوى شهر رمضان المبارك', '#ffc107', 11),
(12, 'مدبلج', 'dubbed', 'المحتوى المدبلج بالعربية', '#8bc34a', 12),
(13, 'NETFLIX', 'netflix', 'محتوى من منصة نتفليكس', '#e50914', 13);

-- البلدان
INSERT OR REPLACE INTO countries (id, name, code, flag) VALUES
(1, 'مصر', 'EG', '🇪🇬'),
(2, 'الإمارات', 'AE', '🇦🇪'),
(3, 'السعودية', 'SA', '🇸🇦'),
(4, 'لبنان', 'LB', '🇱🇧'),
(5, 'سوريا', 'SY', '🇸🇾'),
(6, 'الأردن', 'JO', '🇯🇴'),
(7, 'المغرب', 'MA', '🇲🇦'),
(8, 'الجزائر', 'DZ', '🇩🇿'),
(9, 'تونس', 'TN', '🇹🇳'),
(10, 'العراق', 'IQ', '🇮🇶'),
(11, 'الكويت', 'KW', '🇰🇼'),
(12, 'قطر', 'QA', '🇶🇦'),
(13, 'البحرين', 'BH', '🇧🇭'),
(14, 'عمان', 'OM', '🇴🇲'),
(15, 'فلسطين', 'PS', '🇵🇸'),
(16, 'اليمن', 'YE', '🇾🇪'),
(17, 'ليبيا', 'LY', '🇱🇾'),
(18, 'السودان', 'SD', '🇸🇩'),
(19, 'الولايات المتحدة', 'US', '🇺🇸'),
(20, 'المملكة المتحدة', 'GB', '🇬🇧'),
(21, 'فرنسا', 'FR', '🇫🇷'),
(22, 'ألمانيا', 'DE', '🇩🇪'),
(23, 'إيطاليا', 'IT', '🇮🇹'),
(24, 'إسبانيا', 'ES', '🇪🇸'),
(25, 'روسيا', 'RU', '🇷🇺'),
(26, 'الصين', 'CN', '🇨🇳'),
(27, 'اليابان', 'JP', '🇯🇵'),
(28, 'كوريا الجنوبية', 'KR', '🇰🇷'),
(29, 'الهند', 'IN', '🇮🇳'),
(30, 'تركيا', 'TR', '🇹🇷');

-- اللغات
INSERT OR REPLACE INTO languages (id, name, code) VALUES
(1, 'العربية', 'ar'),
(2, 'الإنجليزية', 'en'),
(3, 'الفرنسية', 'fr'),
(4, 'الألمانية', 'de'),
(5, 'الإسبانية', 'es'),
(6, 'الإيطالية', 'it'),
(7, 'الروسية', 'ru'),
(8, 'الصينية', 'zh'),
(9, 'اليابانية', 'ja'),
(10, 'الكورية', 'ko'),
(11, 'الهندية', 'hi'),
(12, 'التركية', 'tr'),
(13, 'الفارسية', 'fa'),
(14, 'الأردية', 'ur');

-- الجودات
INSERT OR REPLACE INTO qualities (id, name, resolution, sort_order) VALUES
(1, 'SD', '480p', 1),
(2, 'HD', '720p', 2),
(3, 'Full HD', '1080p', 3),
(4, '4K', '2160p', 4),
(5, 'WEB-DL', '1080p', 5),
(6, 'BluRay', '1080p', 6),
(7, 'HDTV', '720p', 7),
(8, 'CAM', '360p', 8);

-- الأشخاص (ممثلين، مخرجين، كتاب)
INSERT OR REPLACE INTO people (id, name, original_name, slug, biography, profile_photo, birth_date, nationality, popularity) VALUES
(1, 'أحمد حلمي', 'Ahmed Helmy', 'ahmed-helmy', 'ممثل كوميدي مصري شهير', '/images/people/ahmed-helmy.jpg', '1969-11-18', 'مصري', 95.5),
(2, 'هند صبري', 'Hend Sabry', 'hend-sabry', 'ممثلة تونسية مصرية مشهورة', '/images/people/hend-sabry.jpg', '1979-11-20', 'تونسية', 92.3),
(3, 'محمد هنيدي', 'Mohamed Henedy', 'mohamed-henedy', 'ممثل كوميدي مصري', '/images/people/mohamed-henedy.jpg', '1965-02-01', 'مصري', 89.7),
(4, 'ياسر جلال', 'Yasser Galal', 'yasser-galal', 'ممثل مصري متميز', '/images/people/yasser-galal.jpg', '1973-04-01', 'مصري', 87.1),
(5, 'غادة عبد الرازق', 'Ghada Abdel Razek', 'ghada-abdel-razek', 'ممثلة مصرية شهيرة', '/images/people/ghada-abdel-razek.jpg', '1965-09-03', 'مصرية', 85.9),
(6, 'محمد رمضان', 'Mohamed Ramadan', 'mohamed-ramadan', 'ممثل ومطرب مصري', '/images/people/mohamed-ramadan.jpg', '1988-05-23', 'مصري', 94.2),
(7, 'أمير كرارة', 'Amir Karara', 'amir-karara', 'ممثل مصري', '/images/people/amir-karara.jpg', '1977-10-10', 'مصري', 91.8),
(8, 'يسرا اللوزي', 'Yousra El Lozy', 'yousra-el-lozy', 'ممثلة مصرية', '/images/people/yousra-el-lozy.jpg', '1985-04-06', 'مصرية', 83.4),
(9, 'محمد ممدوح', 'Mohamed Mamdouh', 'mohamed-mamdouh', 'ممثل مصري موهوب', '/images/people/mohamed-mamdouh.jpg', '1984-12-23', 'مصري', 88.6),
(10, 'مي عز الدين', 'Mai Ezz El Din', 'mai-ezz-el-din', 'ممثلة مصرية', '/images/people/mai-ezz-el-din.jpg', '1980-05-15', 'مصرية', 82.3);

-- الأدوار/المهن
INSERT OR REPLACE INTO roles (id, name, slug) VALUES
(1, 'ممثل', 'actor'),
(2, 'ممثلة', 'actress'),
(3, 'مخرج', 'director'),
(4, 'منتج', 'producer'),
(5, 'كاتب سيناريو', 'writer'),
(6, 'مؤلف موسيقى', 'composer'),
(7, 'مصور سينمائي', 'cinematographer'),
(8, 'مونتير', 'editor'),
(9, 'مصمم إنتاج', 'production-designer'),
(10, 'مصمم أزياء', 'costume-designer');

-- الأفلام
INSERT OR REPLACE INTO movies (
    id, title, original_title, slug, description, poster, backdrop, trailer_url,
    release_date, runtime, imdb_id, imdb_rating, tmdb_rating, local_rating,
    views_count, downloads_count, section_id, country_id, language_id, quality_id,
    is_featured, is_trending
) VALUES
(1, 'الفيل الأزرق 2', 'The Blue Elephant 2', 'blue-elephant-2', 
 'فيلم رعب مصري من إخراج مروان حامد، يحكي قصة الطبيب النفسي يحيى الذي يواجه حالات غريبة ومرعبة', 
 '/images/movies/blue-elephant-2.jpg', '/images/movies/blue-elephant-2-bg.jpg', 
 'https://www.youtube.com/watch?v=xyz123', '2019-07-25', 170, 'tt8721424', 7.2, 7.8, 8.1, 
 125000, 45000, 1, 1, 1, 3, true, true),

(2, 'الممر', 'The Passage', 'the-passage', 
 'فيلم حرب مصري يحكي قصة بطولة الجيش المصري في حرب أكتوبر 1973', 
 '/images/movies/the-passage.jpg', '/images/movies/the-passage-bg.jpg', 
 'https://www.youtube.com/watch?v=abc456', '2019-01-09', 100, 'tt9012345', 8.1, 8.5, 8.9, 
 200000, 80000, 1, 1, 1, 3, true, true),

(3, 'كيرة والجن', 'Kira and the Jinn', 'kira-and-jinn', 
 'فيلم كوميدي رعب مصري من بطولة كريم محمود عبد العزيز', 
 '/images/movies/kira-jinn.jpg', '/images/movies/kira-jinn-bg.jpg', 
 'https://www.youtube.com/watch?v=def789', '2023-01-25', 95, 'tt1234567', 6.8, 7.1, 7.5, 
 95000, 35000, 1, 1, 1, 2, false, true),

(4, 'البدلة', 'The Suit', 'the-suit', 
 'فيلم كوميدي مصري من بطولة تامر حسني', 
 '/images/movies/the-suit.jpg', '/images/movies/the-suit-bg.jpg', 
 'https://www.youtube.com/watch?v=ghi012', '2018-08-15', 110, 'tt8765432', 6.5, 6.9, 7.2, 
 78000, 28000, 1, 1, 1, 2, false, false),

(5, '122', '122', '122-movie', 
 'فيلم تشويق مصري من بطولة أحمد داش', 
 '/images/movies/122.jpg', '/images/movies/122-bg.jpg', 
 'https://www.youtube.com/watch?v=jkl345', '2019-01-02', 95, 'tt5678901', 7.3, 7.6, 7.9, 
 110000, 42000, 1, 1, 1, 2, false, true),

(6, 'صندوق الدنيا', 'World Box', 'world-box', 
 'فيلم دراما كوميدي مصري', 
 '/images/movies/world-box.jpg', '/images/movies/world-box-bg.jpg', 
 'https://www.youtube.com/watch?v=mno678', '2020-12-09', 105, 'tt2345678', 7.0, 7.3, 7.7, 
 65000, 25000, 1, 1, 1, 2, false, false),

(7, 'الغربة', 'The Exile', 'the-exile', 
 'فيلم دراما اجتماعية مصري', 
 '/images/movies/the-exile.jpg', '/images/movies/the-exile-bg.jpg', 
 'https://www.youtube.com/watch?v=pqr901', '2021-03-18', 118, 'tt3456789', 6.9, 7.2, 7.4, 
 58000, 22000, 1, 1, 1, 2, false, false),

(8, 'أبو شنب', 'Abu Shanab', 'abu-shanab', 
 'فيلم كوميدي مصري من بطولة ياسر جلال', 
 '/images/movies/abu-shanab.jpg', '/images/movies/abu-shanab-bg.jpg', 
 'https://www.youtube.com/watch?v=stu234', '2016-07-13', 88, 'tt4567890', 6.2, 6.5, 6.8, 
 45000, 18000, 1, 1, 1, 2, false, false),

(9, 'ولاد رزق 2', 'Sons of Rizk 2', 'sons-of-rizk-2', 
 'فيلم أكشن كوميدي مصري، الجزء الثاني من سلسلة ولاد رزق', 
 '/images/movies/sons-rizk-2.jpg', '/images/movies/sons-rizk-2-bg.jpg', 
 'https://www.youtube.com/watch?v=vwx567', '2019-08-21', 103, 'tt6789012', 7.1, 7.4, 7.8, 
 135000, 52000, 1, 1, 1, 3, true, false),

(10, 'الكنز', 'The Treasure', 'the-treasure', 
 'فيلم مغامرات تاريخي مصري من بطولة محمد سعد', 
 '/images/movies/the-treasure.jpg', '/images/movies/the-treasure-bg.jpg', 
 'https://www.youtube.com/watch?v=yza890', '2017-08-02', 112, 'tt7890123', 6.7, 7.0, 7.3, 
 72000, 28000, 1, 1, 1, 2, false, false);

-- المسلسلات
INSERT OR REPLACE INTO series (
    id, title, original_title, slug, description, poster, backdrop, trailer_url,
    first_air_date, last_air_date, total_seasons, total_episodes, episode_runtime, status,
    imdb_id, imdb_rating, tmdb_rating, local_rating, views_count, section_id, country_id, language_id, quality_id,
    is_featured, is_trending
) VALUES
(1, 'لعبة نيوتن', 'Newton Game', 'newton-game', 
 'مسلسل تشويق وإثارة من بطولة محمد ممدوح ومونا زكي', 
 '/images/series/newton-game.jpg', '/images/series/newton-game-bg.jpg', 
 'https://www.youtube.com/watch?v=series1', '2021-04-13', '2021-05-27', 1, 30, 45, 'completed',
 'tt12345678', 8.2, 8.5, 8.8, 2500000, 2, 1, 1, 3, true, true),

(2, 'الاختيار', 'The Choice', 'the-choice', 
 'مسلسل درامي يحكي قصة الشهيد أحمد المنسي وبطولات الجيش المصري', 
 '/images/series/the-choice.jpg', '/images/series/the-choice-bg.jpg', 
 'https://www.youtube.com/watch?v=series2', '2020-04-15', '2020-05-29', 1, 30, 50, 'completed',
 'tt23456789', 9.1, 9.3, 9.5, 3200000, 2, 1, 1, 3, true, true),

(3, 'ملوك الجدعنة', 'Kings of Toughness', 'kings-toughness', 
 'مسلسل كوميدي اجتماعي من بطولة محمد هنيدي', 
 '/images/series/kings-toughness.jpg', '/images/series/kings-toughness-bg.jpg', 
 'https://www.youtube.com/watch?v=series3', '2021-04-13', '2021-05-27', 1, 30, 35, 'completed',
 'tt34567890', 7.5, 7.8, 8.1, 1800000, 2, 1, 1, 2, false, true),

(4, 'موسى', 'Moses', 'moses', 
 'مسلسل درامي تاريخي من بطولة محمد رمضان', 
 '/images/series/moses.jpg', '/images/series/moses-bg.jpg', 
 'https://www.youtube.com/watch?v=series4', '2021-04-13', '2021-05-27', 1, 30, 40, 'completed',
 'tt45678901', 6.8, 7.1, 7.4, 1600000, 2, 1, 1, 2, false, false),

(5, 'نسل الأغراب', 'Offspring of Strangers', 'offspring-strangers', 
 'مسلسل أكشن وتشويق من بطولة أحمد السقا', 
 '/images/series/offspring-strangers.jpg', '/images/series/offspring-strangers-bg.jpg', 
 'https://www.youtube.com/watch?v=series5', '2019-05-06', '2019-06-19', 1, 30, 45, 'completed',
 'tt56789012', 8.0, 8.2, 8.4, 2100000, 2, 1, 1, 3, true, false),

(6, 'البرنس', 'The Prince', 'the-prince', 
 'مسلسل درامي من بطولة محمد رمضان', 
 '/images/series/the-prince.jpg', '/images/series/the-prince-bg.jpg', 
 'https://www.youtube.com/watch?v=series6', '2020-04-24', '2020-06-07', 1, 30, 42, 'completed',
 'tt67890123', 7.2, 7.5, 7.8, 1900000, 2, 1, 1, 2, false, true),

(7, 'أمانة في رقبتي', 'Trust in My Neck', 'trust-my-neck', 
 'مسلسل اجتماعي درامي من بطولة يسرا', 
 '/images/series/trust-my-neck.jpg', '/images/series/trust-my-neck-bg.jpg', 
 'https://www.youtube.com/watch?v=series7', '2022-04-02', '2022-05-16', 1, 30, 38, 'completed',
 'tt78901234', 7.8, 8.0, 8.2, 1700000, 2, 1, 1, 2, false, false),

(8, 'فيرتيجو', 'Vertigo', 'vertigo', 
 'مسلسل تشويق نفسي من بطولة أحمد حاتم', 
 '/images/series/vertigo.jpg', '/images/series/vertigo-bg.jpg', 
 'https://www.youtube.com/watch?v=series8', '2022-04-02', '2022-05-16', 1, 30, 40, 'completed',
 'tt89012345', 7.6, 7.9, 8.0, 1500000, 2, 1, 1, 2, false, false),

(9, 'كوفيد 25', 'Covid 25', 'covid-25', 
 'مسلسل خيال علمي من بطولة يوسف الشريف', 
 '/images/series/covid-25.jpg', '/images/series/covid-25-bg.jpg', 
 'https://www.youtube.com/watch?v=series9', '2021-04-13', '2021-05-27', 1, 30, 43, 'completed',
 'tt90123456', 6.9, 7.2, 7.5, 1300000, 2, 1, 1, 2, false, false),

(10, 'هجمة مرتدة', 'Counter Attack', 'counter-attack', 
 'مسلسل أكشن وإثارة من بطولة أحمد العوضي', 
 '/images/series/counter-attack.jpg', '/images/series/counter-attack-bg.jpg', 
 'https://www.youtube.com/watch?v=series10', '2023-04-10', '2023-05-24', 1, 30, 47, 'completed',
 'tt01234567', 8.3, 8.6, 8.9, 2800000, 2, 1, 1, 3, true, true);

-- المواسم للمسلسلات
INSERT OR REPLACE INTO seasons (id, series_id, season_number, title, description, poster, air_date, episode_count) VALUES
(1, 1, 1, 'الموسم الأول', 'الموسم الأول من لعبة نيوتن', '/images/series/newton-game-s1.jpg', '2021-04-13', 30),
(2, 2, 1, 'الموسم الأول', 'الموسم الأول من الاختيار', '/images/series/the-choice-s1.jpg', '2020-04-15', 30),
(3, 3, 1, 'الموسم الأول', 'الموسم الأول من ملوك الجدعنة', '/images/series/kings-toughness-s1.jpg', '2021-04-13', 30),
(4, 4, 1, 'الموسم الأول', 'الموسم الأول من موسى', '/images/series/moses-s1.jpg', '2021-04-13', 30),
(5, 5, 1, 'الموسم الأول', 'الموسم الأول من نسل الأغراب', '/images/series/offspring-strangers-s1.jpg', '2019-05-06', 30),
(6, 6, 1, 'الموسم الأول', 'الموسم الأول من البرنس', '/images/series/the-prince-s1.jpg', '2020-04-24', 30),
(7, 7, 1, 'الموسم الأول', 'الموسم الأول من أمانة في رقبتي', '/images/series/trust-my-neck-s1.jpg', '2022-04-02', 30),
(8, 8, 1, 'الموسم الأول', 'الموسم الأول من فيرتيجو', '/images/series/vertigo-s1.jpg', '2022-04-02', 30),
(9, 9, 1, 'الموسم الأول', 'الموسم الأول من كوفيد 25', '/images/series/covid-25-s1.jpg', '2021-04-13', 30),
(10, 10, 1, 'الموسم الأول', 'الموسم الأول من هجمة مرتدة', '/images/series/counter-attack-s1.jpg', '2023-04-10', 30);

-- حلقات قليلة للعينة (5 حلقات لكل مسلسل)
INSERT OR REPLACE INTO episodes (id, series_id, season_id, episode_number, title, description, air_date, runtime, views_count) VALUES
-- لعبة نيوتن
(1, 1, 1, 1, 'البداية', 'الحلقة الأولى من لعبة نيوتن', '2021-04-13', 45, 150000),
(2, 1, 1, 2, 'اللغز الأول', 'الحلقة الثانية من لعبة نيوتن', '2021-04-14', 45, 145000),
(3, 1, 1, 3, 'الكشف', 'الحلقة الثالثة من لعبة نيوتن', '2021-04-15', 45, 140000),
(4, 1, 1, 4, 'المواجهة', 'الحلقة الرابعة من لعبة نيوتن', '2021-04-16', 45, 142000),
(5, 1, 1, 5, 'التطور', 'الحلقة الخامسة من لعبة نيوتن', '2021-04-17', 45, 138000),

-- الاختيار
(6, 2, 2, 1, 'البطل', 'الحلقة الأولى من الاختيار', '2020-04-15', 50, 200000),
(7, 2, 2, 2, 'التضحية', 'الحلقة الثانية من الاختيار', '2020-04-16', 50, 195000),
(8, 2, 2, 3, 'الشهادة', 'الحلقة الثالثة من الاختيار', '2020-04-17', 50, 198000),
(9, 2, 2, 4, 'العزم', 'الحلقة الرابعة من الاختيار', '2020-04-18', 50, 192000),
(10, 2, 2, 5, 'الإيمان', 'الحلقة الخامسة من الاختيار', '2020-04-19', 50, 190000),

-- ملوك الجدعنة
(11, 3, 3, 1, 'الجدعان', 'الحلقة الأولى من ملوك الجدعنة', '2021-04-13', 35, 120000),
(12, 3, 3, 2, 'المشاكل', 'الحلقة الثانية من ملوك الجدعنة', '2021-04-14', 35, 118000),
(13, 3, 3, 3, 'الحلول', 'الحلقة الثالثة من ملوك الجدعنة', '2021-04-15', 35, 115000),
(14, 3, 3, 4, 'الصداقة', 'الحلقة الرابعة من ملوك الجدعنة', '2021-04-16', 35, 117000),
(15, 3, 3, 5, 'المغامرة', 'الحلقة الخامسة من ملوك الجدعنة', '2021-04-17', 35, 113000);

-- المستخدمين (مع كلمات مرور مُشفرة)
INSERT OR REPLACE INTO users (
    id, username, email, password_hash, full_name, avatar, bio, role, is_active, is_verified
) VALUES
(1, 'admin', 'admin@akwam.com', '$2b$10$9VZJyM8PpqJ5G5G8g8g8gu.SRwJ1IePFsPF25xIyQ8gQgQpQsO6lS', 
 'مدير الموقع', '/images/avatars/admin.jpg', 'مدير موقع اكوام', 'admin', true, true),
(2, 'moderator', 'mod@akwam.com', '$2b$10$8UYIxL7OoqI4F4F7f7f7fu.QRvI0HdOEqOE24wHxP7fPfPoOqN5kQ', 
 'مشرف الموقع', '/images/avatars/mod.jpg', 'مشرف محتوى الموقع', 'moderator', true, true),
(3, 'user1', 'user1@example.com', '$2b$10$7TXHwK6NnqH3E3E6e6e6eu.PRuH/GcNDpND23vGwO6eOeOnNpM4jP', 
 'أحمد محمد', '/images/avatars/user1.jpg', 'محب للأفلام والمسلسلات', 'user', true, true),
(4, 'user2', 'user2@example.com', '$2b$10$6SWGvJ5MmqG2D2D5d5d5du.OQuG.FbMCnMC12uFvN5dNdNmMoL3iO', 
 'فاطمة علي', '/images/avatars/user2.jpg', 'عاشقة الدراما التركية', 'user', true, true),
(5, 'user3', 'user3@example.com', '$2b$10$5RVFuI4LlpF1C1C4c4c4cu.NNtF/EaLBmLB01tEuM4cMcMlLoK2hN', 
 'محمد حسن', '/images/avatars/user3.jpg', 'متابع للأفلام الأجنبية', 'user', true, false);

-- تصنيفات الأفلام
INSERT OR REPLACE INTO movie_categories (movie_id, category_id) VALUES
(1, 6), (1, 3), -- الفيل الأزرق 2: رعب، دراما
(2, 1), (2, 3), -- الممر: أكشن، دراما
(3, 2), (3, 6), -- كيرة والجن: كوميدي، رعب
(4, 2), -- البدلة: كوميدي
(5, 8), (5, 1), -- 122: جريمة، أكشن
(6, 2), (6, 3), -- صندوق الدنيا: كوميدي، دراما
(7, 3), -- الغربة: دراما
(8, 2), -- أبو شنب: كوميدي
(9, 1), (9, 2), -- ولاد رزق 2: أكشن، كوميدي
(10, 7), (10, 3); -- الكنز: مغامرات، دراما

-- تصنيفات المسلسلات
INSERT OR REPLACE INTO series_categories (series_id, category_id) VALUES
(1, 8), (1, 3), -- لعبة نيوتن: جريمة، دراما
(2, 1), (2, 3), -- الاختيار: أكشن، دراما
(3, 2), -- ملوك الجدعنة: كوميدي
(4, 3), -- موسى: دراما
(5, 1), (5, 8), -- نسل الأغراب: أكشن، جريمة
(6, 3), -- البرنس: دراما
(7, 3), -- أمانة في رقبتي: دراما
(8, 8), (8, 3), -- فيرتيجو: جريمة، دراما
(9, 5), -- كوفيد 25: خيال علمي
(10, 1), (10, 8); -- هجمة مرتدة: أكشن، جريمة

-- طاقم الأفلام
INSERT OR REPLACE INTO movie_cast (movie_id, person_id, role_id, character_name, sort_order) VALUES
(1, 4, 1, 'د. يحيى', 1), -- ياسر جلال في الفيل الأزرق 2
(2, 7, 1, 'النقيب أحمد', 1), -- أمير كرارة في الممر
(3, 9, 1, 'كيرة', 1), -- محمد ممدوح في كيرة والجن
(4, 6, 1, 'البطل', 1), -- محمد رمضان في البدلة
(8, 4, 1, 'أبو شنب', 1); -- ياسر جلال في أبو شنب

-- طاقم المسلسلات
INSERT OR REPLACE INTO series_cast (series_id, person_id, role_id, character_name, sort_order) VALUES
(1, 9, 1, 'د. ياسين', 1), -- محمد ممدوح في لعبة نيوتن
(2, 7, 1, 'أحمد المنسي', 1), -- أمير كرارة في الاختيار
(3, 3, 1, 'حمادة', 1), -- محمد هنيدي في ملوك الجدعنة
(4, 6, 1, 'موسى', 1), -- محمد رمضان في موسى
(10, 7, 1, 'المقدم أحمد', 1); -- أمير كرارة في هجمة مرتدة

-- روابط المشاهدة والتحميل للأفلام
INSERT OR REPLACE INTO movie_links (movie_id, quality_id, server_name, url, type, size_mb, sort_order) VALUES
-- الفيل الأزرق 2
(1, 3, 'سيرفر 1', 'https://example.com/watch/blue-elephant-2-1080p', 'watch', 0, 1),
(1, 2, 'سيرفر 2', 'https://example.com/watch/blue-elephant-2-720p', 'watch', 0, 2),
(1, 3, 'تحميل مباشر', 'https://example.com/download/blue-elephant-2-1080p.mp4', 'download', 2500, 3),

-- الممر
(2, 3, 'سيرفر 1', 'https://example.com/watch/the-passage-1080p', 'watch', 0, 1),
(2, 2, 'سيرفر 2', 'https://example.com/watch/the-passage-720p', 'watch', 0, 2),
(2, 3, 'تحميل مباشر', 'https://example.com/download/the-passage-1080p.mp4', 'download', 2200, 3);

-- روابط المشاهدة والتحميل للحلقات
INSERT OR REPLACE INTO episode_links (episode_id, quality_id, server_name, url, type, size_mb, sort_order) VALUES
-- لعبة نيوتن - الحلقة 1
(1, 3, 'سيرفر 1', 'https://example.com/watch/newton-game-e01-1080p', 'watch', 0, 1),
(1, 2, 'سيرفر 2', 'https://example.com/watch/newton-game-e01-720p', 'watch', 0, 2),
(1, 3, 'تحميل مباشر', 'https://example.com/download/newton-game-e01-1080p.mp4', 'download', 800, 3),

-- الاختيار - الحلقة 1
(6, 3, 'سيرفر 1', 'https://example.com/watch/the-choice-e01-1080p', 'watch', 0, 1),
(6, 2, 'سيرفر 2', 'https://example.com/watch/the-choice-e01-720p', 'watch', 0, 2),
(6, 3, 'تحميل مباشر', 'https://example.com/download/the-choice-e01-1080p.mp4', 'download', 900, 3);

-- التقييمات
INSERT OR REPLACE INTO ratings (user_id, content_type, content_id, rating, review) VALUES
(3, 'movie', 1, 8, 'فيلم رائع جداً، التمثيل والإخراج في القمة'),
(4, 'movie', 1, 9, 'من أفضل أفلام الرعب العربية'),
(5, 'movie', 2, 10, 'فيلم وطني رائع يستحق المشاهدة'),
(3, 'series', 1, 9, 'مسلسل مشوق جداً، أحداث متسارعة'),
(4, 'series', 2, 10, 'مسلسل تاريخي رائع عن بطولات الجيش'),
(5, 'series', 1, 8, 'قصة جميلة وتمثيل ممتاز');

-- التعليقات
INSERT OR REPLACE INTO comments (user_id, content_type, content_id, comment, likes_count) VALUES
(3, 'movie', 1, 'فيلم مميز جداً، ياسر جلال أبدع في التمثيل', 15),
(4, 'movie', 2, 'فيلم وطني رائع يجعلك فخور ببلدك', 22),
(5, 'series', 1, 'من أجمل المسلسلات التي شاهدتها هذا العام', 18),
(3, 'series', 2, 'مسلسل يحكي تاريخ حقيقي بطريقة مشوقة', 25),
(4, 'episode', 1, 'حلقة ممتازة، بداية قوية للمسلسل', 8),
(5, 'episode', 6, 'حلقة مؤثرة جداً، التمثيل رائع', 12);

-- المفضلة
INSERT OR REPLACE INTO favorites (user_id, content_type, content_id) VALUES
(3, 'movie', 1),
(3, 'movie', 2),
(3, 'series', 1),
(4, 'movie', 1),
(4, 'series', 2),
(5, 'movie', 2),
(5, 'series', 1),
(5, 'series', 2);

-- قوائم المشاهدة
INSERT OR REPLACE INTO watchlists (id, user_id, name, description, is_public) VALUES
(1, 3, 'أفلامي المفضلة', 'قائمة أفلامي المفضلة لهذا العام', true),
(2, 4, 'مسلسلات رمضان', 'مسلسلات رمضان المميزة', false),
(3, 5, 'للمشاهدة لاحقاً', 'قائمة المحتوى للمشاهدة لاحقاً', false);

-- عناصر قوائم المشاهدة
INSERT OR REPLACE INTO watchlist_items (watchlist_id, content_type, content_id) VALUES
(1, 'movie', 1),
(1, 'movie', 2),
(2, 'series', 1),
(2, 'series', 2),
(3, 'movie', 3),
(3, 'series', 3);

-- سجل المشاهدة
INSERT OR REPLACE INTO watch_history (user_id, content_type, content_id, watch_duration, total_duration, progress, is_completed) VALUES
(3, 'movie', 1, 8100, 10200, 79.4, false),
(3, 'episode', 1, 2700, 2700, 100.0, true),
(4, 'movie', 2, 6000, 6000, 100.0, true),
(4, 'episode', 6, 3000, 3000, 100.0, true),
(5, 'episode', 1, 1800, 2700, 66.7, false);

-- الإشعارات
INSERT OR REPLACE INTO notifications (user_id, title, message, type, is_read) VALUES
(3, 'حلقة جديدة', 'تم إضافة حلقة جديدة من مسلسل لعبة نيوتن', 'info', false),
(4, 'فيلم جديد', 'تم إضافة فيلم جديد في قسم الأفلام', 'success', true),
(5, 'تحديث الموقع', 'تم تحديث واجهة الموقع بميزات جديدة', 'info', false);

-- الإعلانات
INSERT OR REPLACE INTO ads (
    title, type, position, content, image_url, click_url, 
    impression_count, click_count, start_date, end_date, priority
) VALUES
('إعلان البانر العلوي', 'banner', 'header', 
 '<div>محتوى الإعلان</div>', '/images/ads/header-banner.jpg', 
 'https://example.com/ad1', 1500, 45, '2024-01-01', '2024-12-31', 1),
 
('إعلان الشريط الجانبي', 'banner', 'sidebar', 
 '<div>إعلان جانبي</div>', '/images/ads/sidebar-banner.jpg', 
 'https://example.com/ad2', 1200, 32, '2024-01-01', '2024-12-31', 2),
 
('إعلان فيديو', 'video', 'content', 
 '', '', 'https://example.com/ad3', 800, 28, '2024-01-01', '2024-12-31', 3);

-- الصفحات الثابتة
INSERT OR REPLACE INTO pages (title, slug, content, meta_description) VALUES
('من نحن', 'about', 
 '<h1>من نحن</h1><p>موقع اكوام هو الموقع العربي الأول للأفلام والمسلسلات...</p>',
 'تعرف على موقع اكوام ورسالتنا في تقديم أفضل محتوى عربي'),
 
('سياسة الخصوصية', 'privacy', 
 '<h1>سياسة الخصوصية</h1><p>نحن في اكوام نحترم خصوصيتك...</p>',
 'سياسة الخصوصية لموقع اكوام'),
 
('شروط الاستخدام', 'terms', 
 '<h1>شروط الاستخدام</h1><p>باستخدامك لموقع اكوام فإنك توافق على...</p>',
 'شروط الاستخدام لموقع اكوام'),
 
('اتصل بنا', 'contact', 
 '<h1>اتصل بنا</h1><p>للتواصل معنا يمكنك استخدام الطرق التالية...</p>',
 'تواصل معنا في موقع اكوام');

-- القوائم
INSERT OR REPLACE INTO menus (id, name, location) VALUES
(1, 'القائمة الرئيسية', 'header'),
(2, 'قائمة التذييل', 'footer'),
(3, 'القائمة الجانبية', 'sidebar');

-- عناصر القوائم
INSERT OR REPLACE INTO menu_items (menu_id, title, url, icon, sort_order) VALUES
-- القائمة الرئيسية
(1, 'الرئيسية', '/', 'home', 1),
(1, 'أفلام', '/movies', 'movie', 2),
(1, 'مسلسلات', '/series', 'tv', 3),
(1, 'تلفزيون', '/shows', 'broadcast', 4),
(1, 'منوعات', '/mix', 'variety', 5),

-- قائمة التذييل
(2, 'من نحن', '/about', '', 1),
(2, 'سياسة الخصوصية', '/privacy', '', 2),
(2, 'شروط الاستخدام', '/terms', '', 3),
(2, 'اتصل بنا', '/contact', '', 4),

-- القائمة الجانبية
(3, 'أحدث الإضافات', '/recent', 'recent', 1),
(3, 'الأكثر مشاهدة', '/trending', 'trending', 2),
(3, 'المفضلة', '/favorites', 'favorite', 3),
(3, 'قوائم المشاهدة', '/watchlists', 'watchlist', 4);