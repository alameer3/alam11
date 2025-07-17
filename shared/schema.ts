import { z } from 'zod';

// Database schema using Zod for validation
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string().min(3).max(30),
  displayName: z.string().optional(),
  role: z.enum(['admin', 'user']).default('user'),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const categorySchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  description: z.string().optional(),
  icon: z.string().optional(),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const genreSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  description: z.string().optional(),
  color: z.string().optional(),
});

export const contentSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  description: z.string().optional(),
  poster: z.string().optional(),
  backdrop: z.string().optional(),
  releaseYear: z.number().int().min(1900).max(2030).optional(),
  duration: z.number().int().min(1).optional(),
  rating: z.number().min(0).max(10).optional(),
  imdbRating: z.number().min(0).max(10).optional(),
  tmdbId: z.string().optional(),
  type: z.enum(['movie', 'series', 'program', 'game', 'app', 'play', 'wrestling', 'sport']),
  status: z.enum(['active', 'draft', 'archived']).default('active'),
  categoryId: z.string(),
  genreIds: z.array(z.string()).default([]),
  quality: z.string().optional(),
  language: z.string().optional(),
  country: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  viewCount: z.number().int().min(0).default(0),
  downloadCount: z.number().int().min(0).default(0),
  isFeatured: z.boolean().default(false),
  isRecommended: z.boolean().default(false),
});

export const episodeSchema = z.object({
  id: z.string(),
  contentId: z.string(),
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  description: z.string().optional(),
  seasonNumber: z.number().int().min(1).optional(),
  episodeNumber: z.number().int().min(1),
  duration: z.number().int().min(1).optional(),
  poster: z.string().optional(),
  backdrop: z.string().optional(),
  releaseDate: z.string().optional(),
  status: z.enum(['active', 'draft', 'archived']).default('active'),
  createdAt: z.string(),
  updatedAt: z.string(),
  viewCount: z.number().int().min(0).default(0),
});

export const downloadLinkSchema = z.object({
  id: z.string(),
  contentId: z.string().optional(),
  episodeId: z.string().optional(),
  title: z.string().min(1).max(200),
  url: z.string().url(),
  quality: z.string().min(1).max(50),
  size: z.string().optional(),
  format: z.string().optional(),
  server: z.string().optional(),
  isActive: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
  createdAt: z.string(),
});

export const watchLinkSchema = z.object({
  id: z.string(),
  contentId: z.string().optional(),
  episodeId: z.string().optional(),
  title: z.string().min(1).max(200),
  url: z.string().url(),
  server: z.string().min(1).max(100),
  quality: z.string().optional(),
  isActive: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
  createdAt: z.string(),
});

export const searchFiltersSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  genre: z.string().optional(),
  year: z.number().int().min(1900).max(2030).optional(),
  quality: z.string().optional(),
  language: z.string().optional(),
  country: z.string().optional(),
  type: z.string().optional(),
  sortBy: z.enum(['newest', 'oldest', 'rating', 'views', 'title']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export const siteSettingsSchema = z.object({
  siteName: z.string().min(1).max(100),
  siteDescription: z.string().min(1).max(500),
  siteUrl: z.string().url(),
  logoUrl: z.string().optional(),
  faviconUrl: z.string().optional(),
  primaryColor: z.string().min(4).max(7),
  secondaryColor: z.string().min(4).max(7),
  socialLinks: z.object({
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    youtube: z.string().optional(),
    instagram: z.string().optional(),
    telegram: z.string().optional(),
  }).optional(),
  enableRegistration: z.boolean().default(true),
  enableComments: z.boolean().default(true),
  enableRatings: z.boolean().default(true),
  maintenanceMode: z.boolean().default(false),
  analyticsCode: z.string().optional(),
  customCss: z.string().optional(),
  customJs: z.string().optional(),
});

// Insert schemas (without auto-generated fields)
export const insertUserSchema = userSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const insertCategorySchema = categorySchema.omit({ id: true });
export const insertGenreSchema = genreSchema.omit({ id: true });
export const insertContentSchema = contentSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const insertEpisodeSchema = episodeSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const insertDownloadLinkSchema = downloadLinkSchema.omit({ id: true, createdAt: true });
export const insertWatchLinkSchema = watchLinkSchema.omit({ id: true, createdAt: true });

// Types
export type User = z.infer<typeof userSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Genre = z.infer<typeof genreSchema>;
export type Content = z.infer<typeof contentSchema>;
export type Episode = z.infer<typeof episodeSchema>;
export type DownloadLink = z.infer<typeof downloadLinkSchema>;
export type WatchLink = z.infer<typeof watchLinkSchema>;
export type SearchFilters = z.infer<typeof searchFiltersSchema>;
export type SiteSettings = z.infer<typeof siteSettingsSchema>;

// Insert types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type InsertGenre = z.infer<typeof insertGenreSchema>;
export type InsertContent = z.infer<typeof insertContentSchema>;
export type InsertEpisode = z.infer<typeof insertEpisodeSchema>;
export type InsertDownloadLink = z.infer<typeof insertDownloadLinkSchema>;
export type InsertWatchLink = z.infer<typeof insertWatchLinkSchema>;

// API response types
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