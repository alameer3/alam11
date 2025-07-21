'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MovieCardProps {
  title: string;
  slug: string;
  poster: string;
  rating?: number;
  year?: number;
  quality?: string;
  genre?: string;
  description?: string;
  type?: 'movie' | 'series' | 'episode';
}

export function MovieCard({
  title,
  slug,
  poster,
  rating = 0,
  year,
  quality = 'HD',
  genre,
  description,
  type = 'movie'
}: MovieCardProps) {
  return (
    <Link href={`/${type}/${slug}`} className="akwam-card group">
      <div className="akwam-card-image">
        <Image
          src={poster}
          alt={title}
          width={300}
          height={450}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          priority={false}
        />
        
        {/* Quality Badge */}
        {quality && (
          <div className="akwam-quality">
            {quality}
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className="akwam-card-overlay">
          <div className="flex flex-col items-center gap-3">
            <button className="akwam-btn akwam-btn-primary">
              <i className="icon-play ml-2"></i>
              مشاهدة
            </button>
            <button className="akwam-btn akwam-btn-secondary">
              <i className="icon-download ml-2"></i>
              تحميل
            </button>
          </div>
        </div>
      </div>
      
      <div className="akwam-card-info">
        <h3 className="akwam-card-title" title={title}>
          {title}
        </h3>
        
        {description && (
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
            {description}
          </p>
        )}
        
        <div className="akwam-card-meta">
          {rating > 0 && (
            <div className="akwam-rating">
              <i className="icon-star"></i>
              <span>{rating.toFixed(1)}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-xs">
            {year && (
              <span className="akwam-year">{year}</span>
            )}
            {genre && (
              <span className="text-gray-500">• {genre}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

// Enhanced Grid Component for displaying movie cards
interface MovieGridProps {
  title: string;
  movies: MovieCardProps[];
  viewAllLink?: string;
  columns?: 2 | 3 | 4 | 5 | 6;
}

export function MovieGrid({ 
  title, 
  movies, 
  viewAllLink,
  columns = 6 
}: MovieGridProps) {
  return (
    <section className="mb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <span className="w-1 h-8 bg-gradient-to-b from-orange-400 to-orange-600 ml-3"></span>
            {title}
          </h2>
          
          {viewAllLink && (
            <Link 
              href={viewAllLink}
              className="akwam-btn akwam-btn-ghost text-sm"
            >
              عرض الكل
              <i className="icon-arrow-left mr-2"></i>
            </Link>
          )}
        </div>
        
        <div className={`akwam-grid akwam-grid-${columns}`}>
          {movies.map((movie, index) => (
            <MovieCard key={`${movie.slug}-${index}`} {...movie} />
          ))}
        </div>
      </div>
    </section>
  );
}