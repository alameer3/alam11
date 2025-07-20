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
    ]);
    console.log('✅ تم إنشاء المحتوى المختلط التجريبي');

    // ربط الأفلام بالتصنيفات
    console.log('🔗 ربط الأفلام بالتصنيفات...');
    await Promise.all([
      prisma.movieCategory.createMany({
        data: [
          { movieId: movies[0].id, categoryId: categories[0].id }, // Matrix - Action
          { movieId: movies[0].id, categoryId: categories[1].id }, // Matrix - Drama
          { movieId: movies[1].id, categoryId: categories[0].id }, // Inception - Action
          { movieId: movies[1].id, categoryId: categories[1].id }, // Inception - Drama
        ],
      }),
    ]);

    // ربط المسلسلات بالتصنيفات
    await Promise.all([
      prisma.seriesCategory.createMany({
        data: [
          { seriesId: series[0].id, categoryId: categories[1].id }, // Breaking Bad - Drama
          { seriesId: series[0].id, categoryId: categories[4].id }, // Breaking Bad - Thriller
        ],
      }),
    ]);

    // ربط البرامج بالتصنيفات
    await Promise.all([
      prisma.showCategory.createMany({
        data: [
          { showId: shows[0].id, categoryId: categories[2].id }, // Oprah - Comedy
        ],
      }),
    ]);

    // ربط المحتوى المختلط بالتصنيفات
    await Promise.all([
      prisma.mixCategory.createMany({
        data: [
          { mixId: mixes[0].id, categoryId: categories[3].id }, // Bohemian Rhapsody - Romance
        ],
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