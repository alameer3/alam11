// مكتبة الصور الحقيقية
export const IMAGES = {
  // صور الخلفية الرئيسية
  hero: {
    movie: 'https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=1920&h=1080&fit=crop',
    series: 'https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=1920&h=1080&fit=crop',
    show: 'https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=1920&h=1080&fit=crop',
  },
  
  // صور الأفلام المميزة
  featured: {
    movie1: 'https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=400&h=600&fit=crop',
    movie2: 'https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=400&h=600&fit=crop',
    movie3: 'https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=400&h=600&fit=crop',
    movie4: 'https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=400&h=600&fit=crop',
  },
  
  // صور الأقسام
  sections: {
    movies: 'https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=800&h=400&fit=crop',
    series: 'https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=800&h=400&fit=crop',
    shows: 'https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=800&h=400&fit=crop',
    mix: 'https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=800&h=400&fit=crop',
  },
  
  // صور الممثلين
  actors: {
    actor1: 'https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=200&h=200&fit=crop',
    actor2: 'https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=200&h=200&fit=crop',
    actor3: 'https://images.unsplash.com/photo-1489599835388-9c1b8b0b0b0b?w=200&h=200&fit=crop',
  },
  
  // صور الخلفيات
  backgrounds: {
    gradient1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    gradient2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    gradient3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    gradient4: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
}

// دالة للحصول على صورة عشوائية
export const getRandomImage = (category: keyof typeof IMAGES) => {
  const images = IMAGES[category]
  const keys = Object.keys(images) as Array<keyof typeof images>
  const randomKey = keys[Math.floor(Math.random() * keys.length)]
  return images[randomKey]
}

// دالة لتحسين الصور
export const optimizeImage = (url: string, width: number, height: number) => {
  return `${url}?w=${width}&h=${height}&fit=crop&auto=format&q=80`
}

// دالة للحصول على صورة placeholder محسنة
export const getPlaceholderImage = (width: number, height: number, text?: string) => {
  const encodedText = text ? encodeURIComponent(text) : 'Placeholder'
  return `https://via.placeholder.com/${width}x${height}/1f2937/ffffff?text=${encodedText}`
}