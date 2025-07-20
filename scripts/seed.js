const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 بدء إضافة البيانات التجريبية...');

  try {
    // إنشاء حساب الإدارة
    console.log('👤 إنشاء حساب الإدارة...');
    const adminPassword = await bcrypt.hash('admin123456', 10);
    const admin = await prisma.user.upsert({
      where: { email: 'admin@akwam.com' },
      update: {},
      create: {
        email: 'admin@akwam.com',
        username: 'admin',
        name: 'مدير الموقع',
        role: 'ADMIN',
        isActive: true,
      },
    });
    console.log('✅ تم إنشاء حساب الإدارة');

    // إنشاء الأقسام
    console.log('📂 إنشاء الأقسام...');
    const sections = await Promise.all([
      prisma.section.upsert({
        where: { slug: 'movies' },
        update: {},
        create: {
          name: 'الأفلام',
          slug: 'movies',
          description: 'أفضل الأفلام العربية والأجنبية',
          icon: '🎬',
          color: '#ff6b6b',
          order: 1,
        },
      }),
      prisma.section.upsert({
        where: { slug: 'series' },
        update: {},
        create: {
          name: 'المسلسلات',
          slug: 'series',
          description: 'أحدث المسلسلات العربية والأجنبية',
          icon: '📺',
          color: '#4ecdc4',
          order: 2,
        },
      }),
      prisma.section.upsert({
        where: { slug: 'shows' },
        update: {},
        create: {
          name: 'البرامج',
          slug: 'shows',
          description: 'برامج تلفزيونية متنوعة',
          icon: '🎭',
          color: '#45b7d1',
          order: 3,
        },
      }),
      prisma.section.upsert({
        where: { slug: 'mix' },
        update: {},
        create: {
          name: 'المحتوى المختلط',
          slug: 'mix',
          description: 'محتوى متنوع من موسيقى وألعاب وغيرها',
          icon: '🎵',
          color: '#96ceb4',
          order: 4,
        },
      }),
    ]);
    console.log('✅ تم إنشاء الأقسام');

    // إنشاء التصنيفات
    console.log('🏷️ إنشاء التصنيفات...');
    const categories = await Promise.all([
      prisma.category.upsert({
        where: { slug: 'action' },
        update: {},
        create: {
          name: 'أكشن',
          slug: 'action',
          description: 'أفلام ومسلسلات أكشن',
          icon: '💥',
          color: '#ff6b6b',
          order: 1,
        },
      }),
      prisma.category.upsert({
        where: { slug: 'drama' },
        update: {},
        create: {
          name: 'دراما',
          slug: 'drama',
          description: 'أفلام ومسلسلات درامية',
          icon: '🎭',
          color: '#4ecdc4',
          order: 2,
        },
      }),
      prisma.category.upsert({
        where: { slug: 'comedy' },
        update: {},
        create: {
          name: 'كوميدي',
          slug: 'comedy',
          description: 'أفلام ومسلسلات كوميدية',
          icon: '😂',
          color: '#45b7d1',
          order: 3,
        },
      }),
      prisma.category.upsert({
        where: { slug: 'romance' },
        update: {},
        create: {
          name: 'رومانسي',
          slug: 'romance',
          description: 'أفلام ومسلسلات رومانسية',
          icon: '💕',
          color: '#96ceb4',
          order: 4,
        },
      }),
      prisma.category.upsert({
        where: { slug: 'thriller' },
        update: {},
        create: {
          name: 'إثارة',
          slug: 'thriller',
          description: 'أفلام ومسلسلات إثارة',
          icon: '😱',
          color: '#f39c12',
          order: 5,
        },
      }),
    ]);
    console.log('✅ تم إنشاء التصنيفات');

    // إنشاء أفلام تجريبية
    console.log('🎬 إنشاء أفلام تجريبية...');
    const movies = await Promise.all([
      prisma.movie.upsert({
        where: { slug: 'the-matrix' },
        update: {},
        create: {
          title: 'المصفوفة',
          originalTitle: 'The Matrix',
          slug: 'the-matrix',
          description: 'فيلم خيال علمي من إخراج الأخوة واتشوسكي',
          poster: '/images/movies/matrix.jpg',
          backdrop: '/images/movies/matrix-backdrop.jpg',
          rating: 8.7,
          imdbRating: 8.7,
          year: 1999,
          duration: 136,
          releaseDate: new Date('1999-03-31'),
          country: 'الولايات المتحدة',
          language: 'الإنجليزية',
          director: 'الأخوة واتشوسكي',
          cast: JSON.stringify(['كيانو ريفز', 'لورنس فيشبورن', 'كاري آن موس']),
          awards: JSON.stringify(['أوسكار أفضل مونتاج', 'أوسكار أفضل صوت']),
          quality: 'HD',
          size: '2.5 GB',
          views: 15000,
          downloads: 8500,
          likes: 1200,
          dislikes: 50,
          isActive: true,
          isFeatured: true,
          sectionId: sections[0].id, // movies section
        },
      }),
      prisma.movie.upsert({
        where: { slug: 'inception' },
        update: {},
        create: {
          title: 'البداية',
          originalTitle: 'Inception',
          slug: 'inception',
          description: 'فيلم خيال علمي من إخراج كريستوفر نولان',
          poster: '/images/movies/inception.jpg',
          backdrop: '/images/movies/inception-backdrop.jpg',
          rating: 8.8,
          imdbRating: 8.8,
          year: 2010,
          duration: 148,
          releaseDate: new Date('2010-07-16'),
          country: 'الولايات المتحدة',
          language: 'الإنجليزية',
          director: 'كريستوفر نولان',
          cast: JSON.stringify(['ليوناردو دي كابريو', 'جوزيف غوردون ليفيت', 'إلين بيج']),
          awards: JSON.stringify(['أوسكار أفضل تصوير سينمائي', 'أوسكار أفضل مونتاج صوتي']),
          quality: 'FHD',
          size: '3.2 GB',
          views: 22000,
          downloads: 12000,
          likes: 1800,
          dislikes: 80,
          isActive: true,
          isFeatured: true,
          sectionId: sections[0].id, // movies section
        },
      }),
    ]);
    console.log('✅ تم إنشاء الأفلام التجريبية');

    // إنشاء مسلسلات تجريبية
    console.log('📺 إنشاء مسلسلات تجريبية...');
    const series = await Promise.all([
      prisma.series.upsert({
        where: { slug: 'breaking-bad' },
        update: {},
        create: {
          title: 'بريكينغ باد',
          originalTitle: 'Breaking Bad',
          slug: 'breaking-bad',
          description: 'مسلسل درامي أمريكي من إنتاج AMC',
          poster: '/images/series/breaking-bad.jpg',
          backdrop: '/images/series/breaking-bad-backdrop.jpg',
          rating: 9.5,
          imdbRating: 9.5,
          year: 2008,
          startYear: 2008,
          endYear: 2013,
          country: 'الولايات المتحدة',
          language: 'الإنجليزية',
          director: 'فينس غيليغان',
          cast: JSON.stringify(['براين كرانستون', 'آرون بول', 'آنا غان']),
          awards: JSON.stringify(['إيمي أفضل مسلسل درامي', 'إيمي أفضل ممثل']),
          quality: 'HD',
          seasons: 5,
          totalEpisodes: 62,
          status: 'COMPLETED',
          views: 35000,
          downloads: 18000,
          likes: 2500,
          dislikes: 100,
          isActive: true,
          isFeatured: true,
          sectionId: sections[1].id, // series section
        },
      }),
      prisma.series.upsert({
        where: { slug: 'game-of-thrones' },
        update: {},
        create: {
          title: 'لعبة العرش',
          originalTitle: 'Game of Thrones',
          slug: 'game-of-thrones',
          description: 'مسلسل خيال ملحمي من إنتاج HBO',
          poster: '/images/series/game-of-thrones.jpg',
          backdrop: '/images/series/game-of-thrones-backdrop.jpg',
          rating: 9.3,
          imdbRating: 9.3,
          year: 2011,
          startYear: 2011,
          endYear: 2019,
          country: 'الولايات المتحدة',
          language: 'الإنجليزية',
          director: 'ديفيد بينيوف',
          cast: JSON.stringify(['إيميليا كلارك', 'كيت هارينغتون', 'بيتر دينكليج']),
          awards: JSON.stringify(['إيمي أفضل مسلسل درامي', 'إيمي أفضل ممثل مساعد']),
          quality: 'FHD',
          seasons: 8,
          totalEpisodes: 73,
          status: 'COMPLETED',
          views: 45000,
          downloads: 22000,
          likes: 3200,
          dislikes: 150,
          isActive: true,
          isFeatured: true,
          sectionId: sections[1].id, // series section
        },
      }),
    ]);
    console.log('✅ تم إنشاء المسلسلات التجريبية');

    // إنشاء برامج تجريبية
    console.log('🎭 إنشاء برامج تجريبية...');
    const shows = await Promise.all([
      prisma.show.upsert({
        where: { slug: 'the-oprah-show' },
        update: {},
        create: {
          title: 'برنامج أوبرا',
          originalTitle: 'The Oprah Winfrey Show',
          slug: 'the-oprah-show',
          description: 'برنامج حواري أمريكي شهير',
          poster: '/images/shows/oprah.jpg',
          backdrop: '/images/shows/oprah-backdrop.jpg',
          rating: 8.2,
          year: 1986,
          duration: 60,
          host: 'أوبرا وينفري',
          network: 'ABC',
          episodes: 4561,
          quality: 'HD',
          type: 'TALK_SHOW',
          views: 12000,
          downloads: 6000,
          likes: 800,
          dislikes: 30,
          isActive: true,
          isFeatured: true,
          sectionId: sections[2].id, // shows section
        },
      }),
      prisma.show.upsert({
        where: { slug: 'american-idol' },
        update: {},
        create: {
          title: 'أمريكان أيدول',
          originalTitle: 'American Idol',
          slug: 'american-idol',
          description: 'برنامج مواهب غنائية أمريكي',
          poster: '/images/shows/american-idol.jpg',
          backdrop: '/images/shows/american-idol-backdrop.jpg',
          rating: 7.8,
          year: 2002,
          duration: 120,
          host: 'سايمون كويل',
          network: 'FOX',
          episodes: 18,
          quality: 'HD',
          type: 'TALENT_SHOW',
          views: 18000,
          downloads: 9000,
          likes: 1200,
          dislikes: 50,
          isActive: true,
          isFeatured: true,
          sectionId: sections[2].id, // shows section
        },
      }),
    ]);
    console.log('✅ تم إنشاء البرامج التجريبية');

    // إنشاء محتوى مختلط تجريبي
    console.log('🎵 إنشاء محتوى مختلط تجريبي...');
    const mixes = await Promise.all([
      prisma.mix.upsert({
        where: { slug: 'bohemian-rhapsody' },
        update: {},
        create: {
          title: 'Bohemian Rhapsody',
          slug: 'bohemian-rhapsody',
          description: 'أغنية كلاسيكية من فرقة كوين',
          poster: '/images/mixes/bohemian-rhapsody.jpg',
          rating: 9.1,
          year: 1975,
          duration: 354,
          artist: 'Queen',
          size: '8.5 MB',
          format: 'MP3',
          quality: 'HD',
          type: 'SONG',
          views: 8500,
          downloads: 4200,
          likes: 650,
          dislikes: 25,
          isActive: true,
          isFeatured: true,
          sectionId: sections[3].id, // mix section
        },
      }),
      prisma.mix.upsert({
        where: { slug: 'stairway-to-heaven' },
        update: {},
        create: {
          title: 'Stairway to Heaven',
          slug: 'stairway-to-heaven',
          description: 'أغنية كلاسيكية من فرقة ليد زيبلين',
          poster: '/images/mixes/stairway-to-heaven.jpg',
          rating: 9.3,
          year: 1971,
          duration: 482,
          artist: 'Led Zeppelin',
          size: '12.3 MB',
          format: 'MP3',
          quality: 'HD',
          type: 'SONG',
          views: 12000,
          downloads: 6800,
          likes: 950,
          dislikes: 35,
          isActive: true,
          isFeatured: true,
          sectionId: sections[3].id, // mix section
        },
      }),
    ]);
    console.log('✅ تم إنشاء المحتوى المختلط التجريبي');

    // ربط الأفلام بالتصنيفات
    console.log('🔗 ربط الأفلام بالتصنيفات...');
    await Promise.all([
      // فيلم المصفوفة - أكشن وإثارة
      prisma.movieCategory.upsert({
        where: { 
          movieId_categoryId: { 
            movieId: movies[0].id, 
            categoryId: categories[0].id 
          } 
        },
        update: {},
        create: {
          movieId: movies[0].id,
          categoryId: categories[0].id,
        },
      }),
      prisma.movieCategory.upsert({
        where: { 
          movieId_categoryId: { 
            movieId: movies[0].id, 
            categoryId: categories[4].id 
          } 
        },
        update: {},
        create: {
          movieId: movies[0].id,
          categoryId: categories[4].id,
        },
      }),
      
      // فيلم البداية - إثارة وخيال علمي
      prisma.movieCategory.upsert({
        where: { 
          movieId_categoryId: { 
            movieId: movies[1].id, 
            categoryId: categories[4].id 
          } 
        },
        update: {},
        create: {
          movieId: movies[1].id,
          categoryId: categories[4].id,
        },
      }),
    ]);

    // ربط المسلسلات بالتصنيفات
    console.log('🔗 ربط المسلسلات بالتصنيفات...');
    await Promise.all([
      // مسلسل بريكينغ باد - إثارة ودراما
      prisma.seriesCategory.upsert({
        where: { 
          seriesId_categoryId: { 
            seriesId: series[0].id, 
            categoryId: categories[4].id 
          } 
        },
        update: {},
        create: {
          seriesId: series[0].id,
          categoryId: categories[4].id,
        },
      }),
      prisma.seriesCategory.upsert({
        where: { 
          seriesId_categoryId: { 
            seriesId: series[0].id, 
            categoryId: categories[1].id 
          } 
        },
        update: {},
        create: {
          seriesId: series[0].id,
          categoryId: categories[1].id,
        },
      }),
      
      // مسلسل جيم أوف ثرونز - خيال ودراما
      prisma.seriesCategory.upsert({
        where: { 
          seriesId_categoryId: { 
            seriesId: series[1].id, 
            categoryId: categories[1].id 
          } 
        },
        update: {},
        create: {
          seriesId: series[1].id,
          categoryId: categories[1].id,
        },
      }),
    ]);

    // ربط البرامج بالتصنيفات
    console.log('🔗 ربط البرامج بالتصنيفات...');
    await Promise.all([
      // برنامج كوميدي
      prisma.showCategory.upsert({
        where: { 
          showId_categoryId: { 
            showId: shows[0].id, 
            categoryId: categories[2].id 
          } 
        },
        update: {},
        create: {
          showId: shows[0].id,
          categoryId: categories[2].id,
        },
      }),
      
      // برنامج موسيقي
      prisma.showCategory.upsert({
        where: { 
          showId_categoryId: { 
            showId: shows[1].id, 
            categoryId: categories[3].id 
          } 
        },
        update: {},
        create: {
          showId: shows[1].id,
          categoryId: categories[3].id,
        },
      }),
    ]);

    // ربط المحتوى المختلط بالتصنيفات
    console.log('🔗 ربط المحتوى المختلط بالتصنيفات...');
    await Promise.all([
      // محتوى متنوع
      prisma.mixCategory.upsert({
        where: { 
          mixId_categoryId: { 
            mixId: mixes[0].id, 
            categoryId: categories[0].id 
          } 
        },
        update: {},
        create: {
          mixId: mixes[0].id,
          categoryId: categories[0].id,
        },
      }),
      prisma.mixCategory.upsert({
        where: { 
          mixId_categoryId: { 
            mixId: mixes[1].id, 
            categoryId: categories[0].id 
          } 
        },
        update: {},
        create: {
          mixId: mixes[1].id,
          categoryId: categories[0].id,
        },
      }),
    ]);
    console.log('✅ تم ربط المحتوى بالتصنيفات');

    console.log('🎉 تم إضافة جميع البيانات التجريبية بنجاح!');
    console.log('');
    console.log('📊 ملخص البيانات المضافة:');
    console.log(`   👤 حساب إدارة: 1`);
    console.log(`   📂 أقسام: ${sections.length}`);
    console.log(`   🏷️ تصنيفات: ${categories.length}`);
    console.log(`   🎬 أفلام: ${movies.length}`);
    console.log(`   📺 مسلسلات: ${series.length}`);
    console.log(`   🎭 برامج: ${shows.length}`);
    console.log(`   🎵 محتوى مختلط: ${mixes.length}`);
    console.log('');
    console.log('🔑 بيانات تسجيل الدخول:');
    console.log('   البريد الإلكتروني: admin@akwam.com');
    console.log('   كلمة المرور: admin123456');

  } catch (error) {
    console.error('❌ خطأ في إضافة البيانات التجريبية:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => {
    console.log('✅ تم إكمال إضافة البيانات التجريبية');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ فشل في إضافة البيانات التجريبية:', error);
    process.exit(1);
  });