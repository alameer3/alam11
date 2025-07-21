// API Type Definitions for better type safety

export interface SeriesFilters {
  category_id?: number;
  country_id?: number;
  language_id?: number;
  quality_id?: number;
  year?: number;
  status?: string;
  rating_min?: number;
  sort?: string;
  order?: 'ASC' | 'DESC';
}

export interface SeriesConditions {
  'sc.category_id'?: number;
  country_id?: number;
  language_id?: number;
  quality_id?: number;
  'strftime("%Y", first_air_date)'?: string;
  status?: string;
  'imdb_rating >='?: number;
  is_trending?: boolean;
}

export interface UserFilters {
  search?: string;
  role?: string;
  status?: string;
}

export interface MovieFilters {
  genre?: string;
  year?: number;
  country?: string;
  quality?: string;
  featured?: boolean;
  search?: string;
}

export interface LogContext {
  userId?: string;
  ip?: string;
  userAgent?: string;
  url?: string;
  method?: string;
  [key: string]: any;
}

export interface NotificationData {
  title: string;
  body: string;
  icon?: string;
  clickAction?: string;
  data?: Record<string, string>;
}

export interface RouteParams {
  slug?: string;
  id?: string;
}

export type Locale = 'ar' | 'en';