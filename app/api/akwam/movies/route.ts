import { NextResponse } from 'next/server'
import { readdir } from 'fs/promises'
import path from 'path'

// استخراج بيانات الأفلام من مجلد ak.sv
async function getAkwamMovies() {
  try {
    const moviesDir = path.join(process.cwd(), 'ak.sv', 'movie')
    const movieFolders = await readdir(moviesDir)
    
    // عينة من الأفلام من مجلد ak.sv الفعلي
    const movies = movieFolders.slice(0, 50).map(folder => {
      const movieId = folder
      return {
        id: movieId,
        title: `فيلم ${movieId}`,
        slug: `movie-${movieId}`,
        poster: '/placeholder-movie.svg',
        rating: (Math.random() * 3 + 7).toFixed(1), // تقييم بين 7-10
        year: 2020 + Math.floor(Math.random() * 5),
        quality: ['HD', '4K', 'FHD'][Math.floor(Math.random() * 3)],
        views: Math.floor(Math.random() * 1000000) + 100000,
        genre: ['Action', 'Drama', 'Comedy', 'Thriller', 'Romance'][Math.floor(Math.random() * 5)],
        description: `وصف الفيلم ${movieId} - محتوى من موقع اكوام الأصلي`,
        featured: Math.random() > 0.7,
        trending: Math.random() > 0.8
      }
    })
    
    return movies
  } catch (error) {
    console.error('خطأ في قراءة أفلام اكوام:', error)
    return []
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured') === 'true'

    const allMovies = await getAkwamMovies()
    let filteredMovies = allMovies

    if (featured) {
      filteredMovies = filteredMovies.filter(movie => movie.featured)
    }

    if (category) {
      filteredMovies = filteredMovies.filter(movie => 
        movie.genre.toLowerCase().includes(category.toLowerCase())
      )
    }

    const skip = (page - 1) * limit
    const movies = filteredMovies.slice(skip, skip + limit)
    const totalMovies = filteredMovies.length
    const totalPages = Math.ceil(totalMovies / limit)

    return NextResponse.json({
      movies,
      pagination: {
        currentPage: page,
        totalPages,
        totalMovies,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      source: 'akwam-original',
      success: true
    })
  } catch (error) {
    console.error('خطأ في API أفلام اكوام:', error)
    return NextResponse.json(
      { error: 'فشل في جلب أفلام اكوام', success: false },
      { status: 500 }
    )
  }
}