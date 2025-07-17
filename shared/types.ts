// Shared types for the AK.SV application

export interface User {
  id: string;
  email: string;
  username: string;
  displayName?: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order: number;
  isActive: boolean;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface Content {
  id: string;
  title: string;
  slug: string;
  description?: string;
  poster?: string;
  backdrop?: string;
  releaseYear?: number;
  duration?: number;
  rating?: number;
  imdbRating?: number;
  tmdbId?: string;
  type: 'movie' | 'series' | 'program' | 'game' | 'app' | 'play' | 'wrestling' | 'sport';
  status: 'active' | 'draft' | 'archived';
  categoryId: string;
  genreIds: string[];
  quality?: string;
  language?: string;
  country?: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  downloadCount: number;
  isFeatured: boolean;
  isRecommended: boolean;
}

export interface Episode {
  id: string;
  contentId: string;
  title: string;
  slug: string;
  description?: string;
  seasonNumber?: number;
  episodeNumber: number;
  duration?: number;
  poster?: string;
  backdrop?: string;
  releaseDate?: string;
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
  viewCount: number;
}

export interface DownloadLink {
  id: string;
  contentId?: string;
  episodeId?: string;
  title: string;
  url: string;
  quality: string;
  size?: string;
  format?: string;
  server?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
}

export interface WatchLink {
  id: string;
  contentId?: string;
  episodeId?: string;
  title: string;
  url: string;
  server: string;
  quality?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  genre?: string;
  year?: number;
  quality?: string;
  language?: string;
  country?: string;
  type?: string;
  sortBy?: 'newest' | 'oldest' | 'rating' | 'views' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
    telegram?: string;
  };
  enableRegistration: boolean;
  enableComments: boolean;
  enableRatings: boolean;
  maintenanceMode: boolean;
  analyticsCode?: string;
  customCss?: string;
  customJs?: string;
}