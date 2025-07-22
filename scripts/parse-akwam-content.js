const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// استخراج البيانات من ملفات HTML الخاصة بموقع اكوام
class AkwamContentParser {
  constructor() {
    this.akwamDir = path.join(process.cwd(), 'ak.sv');
    this.moviesData = [];
    this.seriesData = [];
  }

  // استخراج بيانات الفيلم من ملف HTML
  parseMovieFile(filePath) {
    try {
      const html = fs.readFileSync(filePath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      // استخراج البيانات من meta tags
      const title = doc.querySelector('meta[property="og:title"]')?.getAttribute('content')?.replace(' | اكوام', '');
      const description = doc.querySelector('meta[property="og:description"]')?.getAttribute('content');
      const image = doc.querySelector('meta[property="og:image"]')?.getAttribute('content');
      const url = doc.querySelector('meta[property="og:url"]')?.getAttribute('content');
      
      // استخراج البيانات من JSON-LD
      const jsonLdScript = doc.querySelector('script[type="application/ld+json"]');
      let movieData = {};
      
      if (jsonLdScript) {
        try {
          const jsonData = JSON.parse(jsonLdScript.textContent);
          if (Array.isArray(jsonData)) {
            const movieInfo = jsonData.find(item => item['@type'] === 'Movie');
            if (movieInfo) {
              movieData = {
                name: movieInfo.name,
                rating: movieInfo.AggregateRating?.ratingValue,
                ratingCount: movieInfo.AggregateRating?.ratingCount,
                datePublished: movieInfo.datePublished,
                director: movieInfo.director?.name,
                images: movieInfo.image
              };
            }
          }
        } catch (e) {
          console.log('خطأ في تحليل JSON-LD:', e.message);
        }
      }

      // استخراج معرف الفيلم من المسار
      const movieId = filePath.split('/movie/')[1]?.split('/')[0];
      const slug = path.basename(filePath, '.html');

      return {
        id: movieId,
        title: title || movieData.name,
        slug: slug,
        description: description,
        poster: image,
        url: url,
        rating: parseFloat(movieData.rating) || 0,
        ratingCount: parseInt(movieData.ratingCount) || 0,
        year: movieData.datePublished ? new Date(movieData.datePublished).getFullYear() : null,
        director: movieData.director,
        images: movieData.images,
        source: 'akwam-original'
      };
    } catch (error) {
      console.error(`خطأ في تحليل الفيلم ${filePath}:`, error.message);
      return null;
    }
  }

  // استخراج بيانات المسلسل من ملف HTML
  parseSeriesFile(filePath) {
    try {
      const html = fs.readFileSync(filePath, 'utf8');
      const dom = new JSDOM(html);
      const doc = dom.window.document;

      const title = doc.querySelector('meta[property="og:title"]')?.getAttribute('content')?.replace(' | اكوام', '');
      const description = doc.querySelector('meta[property="og:description"]')?.getAttribute('content');
      const image = doc.querySelector('meta[property="og:image"]')?.getAttribute('content');
      const url = doc.querySelector('meta[property="og:url"]')?.getAttribute('content');

      // استخراج معلومات الحلقة
      const episodeId = filePath.split('/episode/')[1]?.split('/')[0];
      const pathParts = filePath.split('/');
      const seriesName = decodeURIComponent(pathParts[pathParts.length - 2]);
      const episodeFile = pathParts[pathParts.length - 1];
      
      // استخراج رقم الحلقة
      const episodeMatch = episodeFile.match(/الحلقة-(\d+)/);
      const episodeNumber = episodeMatch ? parseInt(episodeMatch[1]) : 1;

      const jsonLdScript = doc.querySelector('script[type="application/ld+json"]');
      let seriesData = {};
      
      if (jsonLdScript) {
        try {
          const jsonData = JSON.parse(jsonLdScript.textContent);
          if (Array.isArray(jsonData)) {
            const seriesInfo = jsonData.find(item => item['@type'] === 'Movie' && item.numberOfEpisodes);
            if (seriesInfo) {
              seriesData = {
                name: seriesInfo.name || seriesInfo.headline,
                rating: seriesInfo.AggregateRating?.ratingValue,
                ratingCount: seriesInfo.AggregateRating?.ratingCount,
                numberOfEpisodes: seriesInfo.numberOfEpisodes,
                datePublished: seriesInfo.datePublished
              };
            }
          }
        } catch (e) {
          console.log('خطأ في تحليل JSON-LD للمسلسل:', e.message);
        }
      }

      return {
        episodeId: episodeId,
        seriesTitle: seriesName,
        episodeNumber: episodeNumber,
        title: title,
        description: description,
        poster: image,
        url: url,
        rating: parseFloat(seriesData.rating) || 0,
        ratingCount: parseInt(seriesData.ratingCount) || 0,
        totalEpisodes: seriesData.numberOfEpisodes || null,
        year: seriesData.datePublished ? new Date(seriesData.datePublished).getFullYear() : null,
        source: 'akwam-original'
      };
    } catch (error) {
      console.error(`خطأ في تحليل المسلسل ${filePath}:`, error.message);
      return null;
    }
  }

  // قراءة جميع الأفلام
  async parseAllMovies(limit = 100) {
    const moviesDir = path.join(this.akwamDir, 'movie');
    if (!fs.existsSync(moviesDir)) return [];

    const movieFolders = fs.readdirSync(moviesDir).slice(0, limit);
    const movies = [];

    for (const folder of movieFolders) {
      const folderPath = path.join(moviesDir, folder);
      if (fs.statSync(folderPath).isDirectory()) {
        const files = fs.readdirSync(folderPath);
        const htmlFile = files.find(file => file.endsWith('.html'));
        
        if (htmlFile) {
          const filePath = path.join(folderPath, htmlFile);
          const movieData = this.parseMovieFile(filePath);
          if (movieData) {
            movies.push(movieData);
          }
        }
      }
    }

    return movies;
  }

  // قراءة جميع المسلسلات
  async parseAllSeries(limit = 50) {
    const episodesDir = path.join(this.akwamDir, 'episode');
    if (!fs.existsSync(episodesDir)) return [];

    const episodeFolders = fs.readdirSync(episodesDir).slice(0, limit);
    const episodes = [];

    for (const folder of episodeFolders) {
      const folderPath = path.join(episodesDir, folder);
      if (fs.statSync(folderPath).isDirectory()) {
        // البحث عن ملفات HTML في المجلدات الفرعية
        const subDirs = fs.readdirSync(folderPath);
        for (const subDir of subDirs) {
          const subDirPath = path.join(folderPath, subDir);
          if (fs.statSync(subDirPath).isDirectory()) {
            const files = fs.readdirSync(subDirPath);
            const htmlFile = files.find(file => file.endsWith('.html'));
            
            if (htmlFile) {
              const filePath = path.join(subDirPath, htmlFile);
              const episodeData = this.parseSeriesFile(filePath);
              if (episodeData) {
                episodes.push(episodeData);
              }
            }
          }
        }
      }
    }

    return episodes;
  }

  // حفظ البيانات المستخرجة
  async saveToJSON() {
    console.log('استخراج بيانات الأفلام...');
    const movies = await this.parseAllMovies(50);
    
    console.log('استخراج بيانات المسلسلات...');
    const series = await this.parseAllSeries(30);

    const outputDir = path.join(process.cwd(), 'serverdata');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // حفظ بيانات الأفلام
    fs.writeFileSync(
      path.join(outputDir, 'akwam-movies.json'),
      JSON.stringify(movies, null, 2),
      'utf8'
    );

    // حفظ بيانات المسلسلات
    fs.writeFileSync(
      path.join(outputDir, 'akwam-series.json'),
      JSON.stringify(series, null, 2),
      'utf8'
    );

    console.log(`تم استخراج ${movies.length} فيلم و ${series.length} حلقة مسلسل`);
    console.log('تم حفظ البيانات في مجلد serverdata/');

    return { movies, series };
  }
}

// تشغيل المحلل إذا تم استدعاؤه مباشرة
if (require.main === module) {
  const parser = new AkwamContentParser();
  parser.saveToJSON().catch(console.error);
}

module.exports = AkwamContentParser;