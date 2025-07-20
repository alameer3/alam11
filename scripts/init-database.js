const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sampleMovies = [
  {
    title: "Spider-Man: No Way Home",
    titleAr: "سبايدر مان: لا توجد طريقة للوطن",
    slug: "spider-man-no-way-home",
    description: "Peter Parker seeks Doctor Strange's help to make people forget Spider-Man's identity, but the spell goes wrong.",
    descriptionAr: "يطلب بيتر باركر مساعدة الدكتور سترينج لجعل الناس ينسون هوية سبايدر مان، لكن التعويذة تسوء.",
    poster: "/uploads/posters/spider-man.jpg",
    backdrop: "/uploads/backdrops/spider-man.jpg",
    rating: 8.5,
    imdbRating: 8.4,
    year: 2021,
    duration: 148,
    quality: "4K",
    country: "الولايات المتحدة",
    language: "الإنجليزية",
    director: "Jon Watts",
    cast: "Tom Holland, Zendaya, Benedict Cumberbatch",
    status: "published",
    featured: true,
    trending: true
  },
  {
    title: "Dune",
    titleAr: "الكثبان",
    slug: "dune-2021",
    description: "A mythic and emotionally charged hero's journey that tells the story of Paul Atreides.",
    descriptionAr: "رحلة بطولية أسطورية ومشحونة عاطفياً تحكي قصة بول أتريديس.",
    poster: "/uploads/posters/dune.jpg",
    backdrop: "/uploads/backdrops/dune.jpg",
    rating: 8.2,
    imdbRating: 8.0,
    year: 2021,
    duration: 155,
    quality: "4K",
    country: "الولايات المتحدة",
    language: "الإنجليزية",
    director: "Denis Villeneuve",
    cast: "Timothée Chalamet, Rebecca Ferguson, Oscar Isaac",
    status: "published",
    featured: true,
    trending: false
  },
  {
    title: "The Batman",
    titleAr: "الرجل الوطواط",
    slug: "the-batman-2022",
    description: "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues.",
    descriptionAr: "يخوض باتمان في عالم جوثام السفلي عندما يترك قاتل ساديستي وراءه مسارًا من الأدلة الغامضة.",
    poster: "/uploads/posters/batman.jpg",
    backdrop: "/uploads/backdrops/batman.jpg",
    rating: 8.3,
    imdbRating: 7.8,
    year: 2022,
    duration: 176,
    quality: "4K",
    country: "الولايات المتحدة",
    language: "الإنجليزية",
    director: "Matt Reeves",
    cast: "Robert Pattinson, Zoë Kravitz, Jeffrey Wright",
    status: "published",
    featured: false,
    trending: true
  }
];

const sampleSeries = [
  {
    title: "Stranger Things",
    titleAr: "أشياء غريبة",
    slug: "stranger-things",
    description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.",
    descriptionAr: "عندما يختفي صبي صغير، يجب على والدته ورئيس الشرطة وأصدقائه مواجهة قوى خارقة مرعبة.",
    poster: "/uploads/posters/stranger-things.jpg",
    backdrop: "/uploads/backdrops/stranger-things.jpg",
    rating: 8.7,
    imdbRating: 8.7,
    year: 2016,
    totalSeasons: 4,
    totalEpisodes: 34,
    status: "ongoing",
    country: "الولايات المتحدة",
    language: "الإنجليزية",
    director: "The Duffer Brothers",
    cast: "Millie Bobby Brown, Finn Wolfhard, David Harbour",
    featured: true,
    trending: true
  },
  {
    title: "The Crown",
    titleAr: "التاج",
    slug: "the-crown",
    description: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
    descriptionAr: "يتبع التنافسات السياسية والرومانسية لعهد الملكة إليزابيث الثانية والأحداث التي شكلت النصف الثاني من القرن العشرين.",
    poster: "/uploads/posters/the-crown.jpg",
    backdrop: "/uploads/backdrops/the-crown.jpg",
    rating: 8.6,
    imdbRating: 8.6,
    year: 2016,
    totalSeasons: 6,
    totalEpisodes: 60,
    status: "completed",
    country: "المملكة المتحدة",
    language: "الإنجليزية",
    director: "Peter Morgan",
    cast: "Claire Foy, Olivia Colman, Imelda Staunton",
    featured: true,
    trending: false
  }
];

const sampleGenres = [
  { name: "Action", nameAr: "أكشن", slug: "action" },
  { name: "Adventure", nameAr: "مغامرة", slug: "adventure" },
  { name: "Comedy", nameAr: "كوميديا", slug: "comedy" },
  { name: "Drama", nameAr: "دراما", slug: "drama" },
  { name: "Horror", nameAr: "رعب", slug: "horror" },
  { name: "Sci-Fi", nameAr: "خيال علمي", slug: "sci-fi" },
  { name: "Thriller", nameAr: "إثارة", slug: "thriller" },
  { name: "Romance", nameAr: "رومانسي", slug: "romance" }
];

async function initDatabase() {
  try {
    console.log('🚀 بدء تهيئة قاعدة البيانات...');

    // إنشاء الأنواع
    console.log('📝 إنشاء أنواع الأفلام والمسلسلات...');
    for (const genre of sampleGenres) {
      await prisma.genre.upsert({
        where: { name: genre.name },
        update: {},
        create: genre
      });
    }

    // إنشاء الأفلام
    console.log('🎬 إنشاء الأفلام النموذجية...');
    for (const movie of sampleMovies) {
      await prisma.movie.upsert({
        where: { slug: movie.slug },
        update: {},
        create: movie
      });
    }

    // إنشاء المسلسلات
    console.log('📺 إنشاء المسلسلات النموذجية...');
    for (const series of sampleSeries) {
      await prisma.series.upsert({
        where: { slug: series.slug },
        update: {},
        create: series
      });
    }

    // إنشاء مستخدم المدير
    console.log('👤 إنشاء حساب المدير...');
    await prisma.user.upsert({
      where: { email: 'admin@akwam.com' },
      update: {},
      create: {
        name: 'مدير الموقع',
        email: 'admin@akwam.com',
        role: 'admin'
      }
    });

    console.log('✅ تم تهيئة قاعدة البيانات بنجاح!');
    console.log('📊 تم إنشاء:');
    console.log(`   • ${sampleGenres.length} نوع`);
    console.log(`   • ${sampleMovies.length} فيلم`);
    console.log(`   • ${sampleSeries.length} مسلسل`);
    console.log('   • 1 مستخدم مدير');

  } catch (error) {
    console.error('❌ خطأ في تهيئة قاعدة البيانات:', error);
  } finally {
    await prisma.$disconnect();
  }
}

initDatabase();